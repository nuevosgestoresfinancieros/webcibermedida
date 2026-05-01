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
