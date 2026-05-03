from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
import jwt
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security config
JWT_SECRET = os.environ.get('JWT_SECRET', 'cibermedida-dev-secret-change-me')
JWT_ALGORITHM = 'HS256'
JWT_EXP_HOURS = 24

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
security = HTTPBearer(auto_error=False)

DEFAULT_ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
DEFAULT_ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'cibermedida2026')
ADMIN_SETTINGS_ID = 'admin-settings'
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

CHATBOT_SYSTEM_PROMPT = (
    "Eres el asistente virtual de Cibermedida, una empresa especializada en "
    "ciberseguridad, formación técnica e inteligencia artificial para empresas, "
    "centros formativos y administraciones públicas en España. "
    "Responde siempre en español, de forma clara, profesional y concisa. "
    "Ayudas a los usuarios con dudas sobre: ciberseguridad (phishing, malware, ransomware, "
    "RGPD, buenas prácticas, formación), servicios de Cibermedida (aula virtual, "
    "marketplace, firma digital, auditorías), e inteligencia artificial aplicada. "
    "Si la pregunta queda fuera de tu ámbito, redirige amablemente al usuario a "
    "jfloradmin@cibermedida.es o +34 687 216 537. "
    "Mantén las respuestas cortas (2-4 párrafos máximo) salvo que pidan más detalle."
)


# ==================== Models ====================

def utcnow():
    return datetime.now(timezone.utc)


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    company: Optional[str] = Field(None, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=40)
    message: str = Field(..., min_length=1, max_length=5000)


class ContactMessage(BaseModel):
    id: str
    name: str
    company: Optional[str] = None
    email: str
    phone: Optional[str] = None
    message: str
    read: bool = False
    created_at: datetime


class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterSubscriber(BaseModel):
    id: str
    email: str
    created_at: datetime


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    token: str
    username: str


class UpdateSettingsRequest(BaseModel):
    current_password: str
    new_password: Optional[str] = Field(None, min_length=6)
    openai_api_key: Optional[str] = None


class SettingsResponse(BaseModel):
    username: str
    openai_api_key_set: bool
    openai_api_key_masked: Optional[str] = None
    updated_at: Optional[datetime] = None


class MessagePatch(BaseModel):
    read: Optional[bool] = None


# ---------- Client user models ----------

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=200)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    openai_api_key_set: bool = False
    openai_api_key_masked: Optional[str] = None
    created_at: datetime


class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=120)
    phone: Optional[str] = Field(None, max_length=40)
    company: Optional[str] = Field(None, max_length=120)
    openai_api_key: Optional[str] = None


class PasswordChange(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=6, max_length=200)


class AuthResponse(BaseModel):
    token: str
    user: UserPublic


# ---------- Chat models ----------

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    session_id: str
    reply: str


# ==================== Helpers ====================

def create_token(username: str) -> str:
    payload = {
        'sub': username,
        'exp': utcnow() + timedelta(hours=JWT_EXP_HOURS),
        'iat': utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='No token provided')
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token')
    username = payload.get('sub')
    settings = await db.admin_settings.find_one({'_id': ADMIN_SETTINGS_ID})
    if not settings or settings.get('username') != username:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Admin not found')
    return {'username': username}


def mask_key(key: Optional[str]) -> Optional[str]:
    if not key:
        return None
    if len(key) <= 8:
        return '*' * len(key)
    return key[:4] + '*' * (len(key) - 8) + key[-4:]


def create_user_token(user_id: str) -> str:
    payload = {
        'sub': user_id,
        'type': 'user',
        'exp': utcnow() + timedelta(days=30),
        'iat': utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=401, detail='No token provided')
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid token')
    if payload.get('type') != 'user':
        raise HTTPException(status_code=401, detail='Invalid token type')
    user = await db.users.find_one({'id': payload.get('sub')})
    if not user:
        raise HTTPException(status_code=401, detail='User not found')
    return user


async def get_optional_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    if credentials is None:
        return None
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get('type') != 'user':
            return None
        return await db.users.find_one({'id': payload.get('sub')})
    except Exception:
        return None


def user_to_public(u: dict) -> UserPublic:
    key = u.get('openai_api_key')
    return UserPublic(
        id=u['id'], name=u['name'], email=u['email'],
        phone=u.get('phone'), company=u.get('company'),
        openai_api_key_set=bool(key),
        openai_api_key_masked=mask_key(key),
        created_at=u['created_at'],
    )


# ==================== App + Router ====================

app = FastAPI(title='Cibermedida API')
api_router = APIRouter(prefix='/api')


@app.on_event('startup')
async def startup():
    # Bootstrap admin if not exists
    existing = await db.admin_settings.find_one({'_id': ADMIN_SETTINGS_ID})
    if not existing:
        await db.admin_settings.insert_one({
            '_id': ADMIN_SETTINGS_ID,
            'username': DEFAULT_ADMIN_USERNAME,
            'password_hash': pwd_context.hash(DEFAULT_ADMIN_PASSWORD),
            'openai_api_key': None,
            'updated_at': utcnow(),
        })
        logging.info(f'Bootstrapped admin user: {DEFAULT_ADMIN_USERNAME}')
    # Indexes
    await db.contact_messages.create_index('created_at')
    await db.newsletter_subscribers.create_index('email', unique=True)
    await db.users.create_index('email', unique=True)
    await db.users.create_index('id', unique=True)


# ---------- Public endpoints ----------

@api_router.get('/')
async def root():
    return {'message': 'Cibermedida API', 'version': '1.0'}


@api_router.post('/contact', response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    doc = {
        'id': str(uuid.uuid4()),
        'name': payload.name.strip(),
        'company': payload.company.strip() if payload.company else None,
        'email': payload.email.lower(),
        'phone': payload.phone.strip() if payload.phone else None,
        'message': payload.message.strip(),
        'read': False,
        'created_at': utcnow(),
    }
    await db.contact_messages.insert_one(doc)
    doc.pop('_id', None)
    return ContactMessage(**doc)


@api_router.post('/newsletter', response_model=NewsletterSubscriber)
async def subscribe_newsletter(payload: NewsletterCreate):
    email = payload.email.lower()
    existing = await db.newsletter_subscribers.find_one({'email': email})
    if existing:
        existing.pop('_id', None)
        return NewsletterSubscriber(**existing)
    doc = {
        'id': str(uuid.uuid4()),
        'email': email,
        'created_at': utcnow(),
    }
    await db.newsletter_subscribers.insert_one(doc)
    doc.pop('_id', None)
    return NewsletterSubscriber(**doc)


# ---------- Admin auth ----------

@api_router.post('/admin/login', response_model=LoginResponse)
async def admin_login(payload: LoginRequest):
    settings = await db.admin_settings.find_one({'_id': ADMIN_SETTINGS_ID})
    if not settings:
        raise HTTPException(status_code=500, detail='Admin not configured')
    if payload.username != settings.get('username'):
        raise HTTPException(status_code=401, detail='Credenciales incorrectas')
    if not pwd_context.verify(payload.password, settings.get('password_hash', '')):
        raise HTTPException(status_code=401, detail='Credenciales incorrectas')
    token = create_token(payload.username)
    return LoginResponse(token=token, username=payload.username)


@api_router.get('/admin/me')
async def admin_me(admin=Depends(get_current_admin)):
    return admin


# ---------- Admin: messages ----------

@api_router.get('/admin/messages', response_model=List[ContactMessage])
async def list_messages(admin=Depends(get_current_admin)):
    cursor = db.contact_messages.find().sort('created_at', -1).limit(500)
    items = []
    async for doc in cursor:
        doc.pop('_id', None)
        items.append(ContactMessage(**doc))
    return items


@api_router.patch('/admin/messages/{msg_id}', response_model=ContactMessage)
async def patch_message(msg_id: str, patch: MessagePatch, admin=Depends(get_current_admin)):
    update = {}
    if patch.read is not None:
        update['read'] = patch.read
    if not update:
        raise HTTPException(status_code=400, detail='Nothing to update')
    result = await db.contact_messages.find_one_and_update(
        {'id': msg_id}, {'$set': update}, return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail='Not found')
    result.pop('_id', None)
    return ContactMessage(**result)


@api_router.delete('/admin/messages/{msg_id}')
async def delete_message(msg_id: str, admin=Depends(get_current_admin)):
    res = await db.contact_messages.delete_one({'id': msg_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail='Not found')
    return {'ok': True}


# ---------- Admin: newsletter ----------

@api_router.get('/admin/newsletter', response_model=List[NewsletterSubscriber])
async def list_subscribers(admin=Depends(get_current_admin)):
    cursor = db.newsletter_subscribers.find().sort('created_at', -1).limit(1000)
    items = []
    async for doc in cursor:
        doc.pop('_id', None)
        items.append(NewsletterSubscriber(**doc))
    return items


@api_router.delete('/admin/newsletter/{sub_id}')
async def delete_subscriber(sub_id: str, admin=Depends(get_current_admin)):
    res = await db.newsletter_subscribers.delete_one({'id': sub_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail='Not found')
    return {'ok': True}


# ---------- Admin: settings ----------

@api_router.get('/admin/settings', response_model=SettingsResponse)
async def get_settings(admin=Depends(get_current_admin)):
    doc = await db.admin_settings.find_one({'_id': ADMIN_SETTINGS_ID})
    key = doc.get('openai_api_key') if doc else None
    return SettingsResponse(
        username=doc.get('username'),
        openai_api_key_set=bool(key),
        openai_api_key_masked=mask_key(key),
        updated_at=doc.get('updated_at'),
    )


@api_router.patch('/admin/settings', response_model=SettingsResponse)
async def update_settings(payload: UpdateSettingsRequest, admin=Depends(get_current_admin)):
    doc = await db.admin_settings.find_one({'_id': ADMIN_SETTINGS_ID})
    if not doc:
        raise HTTPException(status_code=500, detail='Settings missing')
    if not pwd_context.verify(payload.current_password, doc.get('password_hash', '')):
        raise HTTPException(status_code=401, detail='Contraseña actual incorrecta')
    update = {'updated_at': utcnow()}
    if payload.new_password:
        update['password_hash'] = pwd_context.hash(payload.new_password)
    if payload.openai_api_key is not None:
        # Empty string clears the key
        update['openai_api_key'] = payload.openai_api_key.strip() or None
    await db.admin_settings.update_one({'_id': ADMIN_SETTINGS_ID}, {'$set': update})
    new_doc = await db.admin_settings.find_one({'_id': ADMIN_SETTINGS_ID})
    key = new_doc.get('openai_api_key')
    return SettingsResponse(
        username=new_doc.get('username'),
        openai_api_key_set=bool(key),
        openai_api_key_masked=mask_key(key),
        updated_at=new_doc.get('updated_at'),
    )


# ==================== Mount ====================

# ---------- Client auth ----------

@api_router.post('/auth/register', response_model=AuthResponse)
async def register(payload: UserRegister):
    email = payload.email.lower()
    existing = await db.users.find_one({'email': email})
    if existing:
        raise HTTPException(status_code=400, detail='Ya existe una cuenta con este email')
    user_id = str(uuid.uuid4())
    doc = {
        'id': user_id,
        'name': payload.name.strip(),
        'email': email,
        'password_hash': pwd_context.hash(payload.password),
        'phone': None,
        'company': None,
        'openai_api_key': None,
        'created_at': utcnow(),
    }
    await db.users.insert_one(doc)
    token = create_user_token(user_id)
    return AuthResponse(token=token, user=user_to_public(doc))


@api_router.post('/auth/login', response_model=AuthResponse)
async def login_user(payload: UserLogin):
    user = await db.users.find_one({'email': payload.email.lower()})
    if not user or not pwd_context.verify(payload.password, user.get('password_hash', '')):
        raise HTTPException(status_code=401, detail='Email o contraseña incorrectos')
    token = create_user_token(user['id'])
    return AuthResponse(token=token, user=user_to_public(user))


@api_router.get('/auth/me', response_model=UserPublic)
async def me(user=Depends(get_current_user)):
    return user_to_public(user)


@api_router.patch('/auth/me', response_model=UserPublic)
async def update_me(payload: UserUpdate, user=Depends(get_current_user)):
    update = {}
    if payload.name is not None:
        update['name'] = payload.name.strip()
    if payload.phone is not None:
        update['phone'] = payload.phone.strip() or None
    if payload.company is not None:
        update['company'] = payload.company.strip() or None
    if payload.openai_api_key is not None:
        update['openai_api_key'] = payload.openai_api_key.strip() or None
    if update:
        await db.users.update_one({'id': user['id']}, {'$set': update})
    new_user = await db.users.find_one({'id': user['id']})
    return user_to_public(new_user)


@api_router.post('/auth/change-password')
async def change_password(payload: PasswordChange, user=Depends(get_current_user)):
    if not pwd_context.verify(payload.current_password, user.get('password_hash', '')):
        raise HTTPException(status_code=401, detail='Contraseña actual incorrecta')
    await db.users.update_one(
        {'id': user['id']},
        {'$set': {'password_hash': pwd_context.hash(payload.new_password)}}
    )
    return {'ok': True}


# ---------- Chat (public + optional user) ----------

async def _resolve_api_key(user: Optional[dict]) -> tuple[str, str]:
    """Returns (api_key, source). Priority: user's own > admin configured > Emergent."""
    if user and user.get('openai_api_key'):
        return user['openai_api_key'], 'user'
    settings = await db.admin_settings.find_one({'_id': ADMIN_SETTINGS_ID})
    if settings and settings.get('openai_api_key'):
        return settings['openai_api_key'], 'admin'
    if EMERGENT_LLM_KEY:
        return EMERGENT_LLM_KEY, 'emergent'
    raise HTTPException(status_code=500, detail='No hay ninguna API key configurada')


@api_router.post('/chat/message', response_model=ChatResponse)
async def chat_message(payload: ChatRequest, user=Depends(get_optional_user)):
    session_id = payload.session_id or str(uuid.uuid4())
    api_key, source = await _resolve_api_key(user)
    try:
        chat = LlmChat(
            api_key=api_key,
            session_id=session_id,
            system_message=CHATBOT_SYSTEM_PROMPT,
        ).with_model('openai', 'gpt-4o-mini')
        reply = await chat.send_message(UserMessage(text=payload.message))
    except Exception as e:
        logging.exception('Chat error')
        raise HTTPException(status_code=500, detail=f'Error del chatbot: {str(e)[:200]}')

    # Persist for history (anonymous or per-user)
    await db.chat_messages.insert_many([
        {'id': str(uuid.uuid4()), 'session_id': session_id, 'user_id': user['id'] if user else None,
         'role': 'user', 'text': payload.message, 'created_at': utcnow()},
        {'id': str(uuid.uuid4()), 'session_id': session_id, 'user_id': user['id'] if user else None,
         'role': 'assistant', 'text': reply, 'source': source, 'created_at': utcnow()},
    ])
    return ChatResponse(session_id=session_id, reply=reply)


# ==================== Mount ====================

# ---------- Admin: generic content CRUD ----------

CONTENT_COLLECTIONS = {
    'projects': 'content_projects',
    'blog': 'content_blog',
    'testimonials': 'content_testimonials',
    'faqs': 'content_faqs',
    'services': 'content_services',
    'cases': 'content_cases',
    'team': 'content_team',
    'partners': 'content_partners',
}


def _content_coll(entity: str):
    if entity not in CONTENT_COLLECTIONS:
        raise HTTPException(status_code=404, detail=f'Unknown entity: {entity}')
    return db[CONTENT_COLLECTIONS[entity]]


@api_router.get('/admin/content/{entity}')
async def content_list(entity: str, admin=Depends(get_current_admin)):
    coll = _content_coll(entity)
    cursor = coll.find().sort('created_at', -1)
    items = []
    async for doc in cursor:
        doc.pop('_id', None)
        items.append(doc)
    return items


@api_router.post('/admin/content/{entity}')
async def content_create(entity: str, data: dict, admin=Depends(get_current_admin)):
    coll = _content_coll(entity)
    doc = dict(data)
    doc['id'] = str(uuid.uuid4())
    doc['created_at'] = utcnow()
    doc['updated_at'] = utcnow()
    await coll.insert_one(doc)
    doc.pop('_id', None)
    return doc


@api_router.patch('/admin/content/{entity}/{item_id}')
async def content_update(entity: str, item_id: str, data: dict, admin=Depends(get_current_admin)):
    coll = _content_coll(entity)
    data = {k: v for k, v in data.items() if k not in ('id', '_id', 'created_at')}
    data['updated_at'] = utcnow()
    result = await coll.find_one_and_update(
        {'id': item_id}, {'$set': data}, return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail='Not found')
    result.pop('_id', None)
    return result


@api_router.delete('/admin/content/{entity}/{item_id}')
async def content_delete(entity: str, item_id: str, admin=Depends(get_current_admin)):
    coll = _content_coll(entity)
    res = await coll.delete_one({'id': item_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail='Not found')
    return {'ok': True}


# Public content endpoint (no auth) - used by frontend to fetch latest data
@api_router.get('/content/{entity}')
async def content_public_list(entity: str):
    coll = _content_coll(entity)
    cursor = coll.find({'published': {'$ne': False}}).sort('order', 1).limit(500)
    items = []
    async for doc in cursor:
        doc.pop('_id', None)
        items.append(doc)
    return items


# ==================== Mount ====================

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event('shutdown')
async def shutdown_db_client():
    client.close()
