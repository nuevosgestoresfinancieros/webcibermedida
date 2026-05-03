import React, { useState } from 'react';
import { ScrollText, Shield, Cookie, FileCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const SITE = {
  titular: 'Francisco Javier Flor González',
  dni: '30.602.373-E',
  address: '[Dirección fiscal pendiente de completar]',
  email: 'jfloradmin@cibermedida.es',
  phone: '+34 687 216 537',
  domain: 'cibermedida.es',
  dpo: 'Francisco Javier Flor González',
  hosting: 'https://docencia.cibermedida.es/',
  activity: 'prestación de servicios de formación técnica, ciberseguridad e inteligencia artificial',
};

const TABS = [
  { id: 'aviso', label: 'Aviso Legal', icon: ScrollText },
  { id: 'privacidad', label: 'Privacidad', icon: Shield },
  { id: 'cookies', label: 'Cookies', icon: Cookie },
  { id: 'condiciones', label: 'Condiciones', icon: FileCheck },
];

export default function PoliticasPage() {
  const [tab, setTab] = useState('aviso');
  return (
    <>
      <PageHeader
        tag="Políticas"
        title="Información legal y protección de datos"
        subtitle="Aviso legal, política de privacidad, cookies y condiciones de uso conforme a la normativa española y RGPD."
      />
      <section className="bg-slate-900 py-16">
        <div className="max-w-[900px] mx-auto px-4 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 mb-8 sticky top-[96px] bg-slate-900 z-10 py-2">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                    active ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon size={16} /> {t.label}
                </button>
              );
            })}
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-5">
            {tab === 'aviso' && <AvisoLegal />}
            {tab === 'privacidad' && <Privacidad />}
            {tab === 'cookies' && <Cookies />}
            {tab === 'condiciones' && <Condiciones />}
          </div>

          <p className="text-xs text-slate-500 mt-10 pt-4 border-t border-slate-800">
            Última actualización: mayo 2026
          </p>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-white text-2xl font-bold mt-8 mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function AvisoLegal() {
  return (
    <>
      <h2 className="text-white text-3xl font-bold">Aviso Legal</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
        Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa a los usuarios
        sobre los datos identificativos del titular de este sitio web.
      </p>

      <Section title="1. Datos del titular">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Titular:</strong> {SITE.titular} (profesional autónomo)</li>
          <li><strong>DNI:</strong> {SITE.dni}</li>
          <li><strong>Dirección fiscal:</strong> {SITE.address}</li>
          <li><strong>Email:</strong> <a className="text-cyan-400 hover:text-cyan-300" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          <li><strong>Teléfono:</strong> <a className="text-cyan-400 hover:text-cyan-300" href={`tel:${SITE.phone.replace(/\s/g,'')}`}>{SITE.phone}</a></li>
          <li><strong>Sitio web:</strong> {SITE.domain}</li>
          <li><strong>Actividad:</strong> {SITE.activity}</li>
        </ul>
      </Section>

      <Section title="2. Objeto">
        <p>
          El presente aviso legal regula el uso del sitio web {SITE.domain} (en adelante, "el Sitio"),
          del que es titular {SITE.titular}. La navegación por el Sitio atribuye la condición de
          usuario e implica la aceptación plena de las disposiciones incluidas en este aviso legal.
        </p>
      </Section>

      <Section title="3. Propiedad intelectual e industrial">
        <p>
          Todos los contenidos del Sitio (textos, fotografías, gráficos, imágenes, iconos, tecnología,
          software, así como su diseño gráfico y códigos fuente) son propiedad del titular o de
          terceros con los que se han alcanzado los acuerdos correspondientes. Queda expresamente
          prohibida la reproducción, distribución o transformación de los contenidos sin autorización
          expresa del titular.
        </p>
        <p>
          Las marcas, nombres comerciales y signos distintivos mostrados son propiedad del titular o
          de sus respectivos propietarios, sin que su uso en el Sitio implique cesión alguna.
        </p>
      </Section>

      <Section title="4. Condiciones de uso">
        <p>
          El usuario se compromete a hacer un uso adecuado y lícito del Sitio, absteniéndose de
          utilizarlo con fines ilícitos, lesivos de derechos de terceros, o que impidan el normal
          funcionamiento del mismo. En particular, queda prohibido:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Introducir virus, troyanos, gusanos o cualquier elemento capaz de dañar los sistemas.</li>
          <li>Realizar accesos no autorizados, extracciones masivas de información o ataques de denegación de servicio.</li>
          <li>Utilizar identidades falsas o suplantar a terceros.</li>
          <li>Reproducir o copiar los contenidos sin autorización.</li>
        </ul>
      </Section>

      <Section title="5. Responsabilidad">
        <p>
          El titular no se hace responsable de las interrupciones temporales del servicio, errores
          técnicos o cualquier otro tipo de incidencia de naturaleza análoga. Asimismo, no asume
          responsabilidad por los contenidos de sitios web de terceros a los que se acceda mediante
          enlaces publicados en el Sitio.
        </p>
      </Section>

      <Section title="6. Legislación aplicable y jurisdicción">
        <p>
          El presente aviso legal se rige por la legislación española. Para la resolución de cualquier
          controversia, las partes se someten a los Juzgados y Tribunales del domicilio del usuario,
          cuando este tenga la consideración de consumidor.
        </p>
      </Section>
    </>
  );
}

function Privacidad() {
  return (
    <>
      <h2 className="text-white text-3xl font-bold">Política de Privacidad</h2>
      <p>
        En virtud del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de
        Datos Personales y Garantía de los Derechos Digitales (LOPDGDD), se informa al usuario sobre
        el tratamiento de sus datos personales.
      </p>

      <Section title="1. Responsable del tratamiento">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Responsable:</strong> {SITE.titular}</li>
          <li><strong>DNI:</strong> {SITE.dni}</li>
          <li><strong>Email:</strong> <a className="text-cyan-400 hover:text-cyan-300" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          <li><strong>Delegado de Protección de Datos (DPO):</strong> {SITE.dpo}</li>
        </ul>
      </Section>

      <Section title="2. Finalidad del tratamiento">
        <p>Los datos personales recogidos en este sitio web se tratan con las siguientes finalidades:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Formulario de contacto:</strong> atender consultas, solicitudes de información y gestionar la relación con el usuario.</li>
          <li><strong>Newsletter:</strong> envío de comunicaciones comerciales y novedades sobre servicios, siempre que el usuario haya dado su consentimiento expreso.</li>
          <li><strong>Chatbot de asistencia:</strong> resolver dudas del usuario mediante un asistente de IA.</li>
          <li><strong>Panel de administración:</strong> gestión interna del sitio por parte del titular.</li>
        </ul>
      </Section>

      <Section title="3. Base legitimadora">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Consentimiento del usuario</strong> (art. 6.1.a RGPD) para el envío de newsletter y para el uso del chatbot.</li>
          <li><strong>Interés legítimo</strong> (art. 6.1.f RGPD) para responder a consultas planteadas a través del formulario de contacto.</li>
          <li><strong>Ejecución de un contrato</strong> (art. 6.1.b RGPD) cuando exista relación contractual con el usuario.</li>
        </ul>
      </Section>

      <Section title="4. Plazo de conservación">
        <p>
          Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la
          que fueron recogidos y, en su caso, durante los plazos establecidos por las obligaciones
          legales aplicables. Los datos de newsletter se conservarán hasta que el usuario retire su
          consentimiento.
        </p>
      </Section>

      <Section title="5. Destinatarios">
        <p>
          Los datos personales <strong>no se cederán a terceros</strong>, salvo obligación legal. El
          responsable no realiza transferencias internacionales de datos.
        </p>
        <p>
          Los datos se alojan en servidores ubicados en {SITE.hosting} con las medidas técnicas y
          organizativas apropiadas para garantizar la seguridad, integridad y confidencialidad de la
          información.
        </p>
      </Section>

      <Section title="6. Derechos del usuario">
        <p>El usuario puede ejercer los siguientes derechos en cualquier momento:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Acceso:</strong> conocer qué datos tratamos.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
          <li><strong>Supresión (derecho al olvido):</strong> eliminar los datos cuando no sean necesarios.</li>
          <li><strong>Oposición:</strong> oponerse al tratamiento de los datos.</li>
          <li><strong>Limitación:</strong> restringir el tratamiento.</li>
          <li><strong>Portabilidad:</strong> recibir sus datos en formato estructurado.</li>
          <li><strong>Retirar el consentimiento:</strong> en cualquier momento.</li>
        </ul>
        <p>
          Para ejercer estos derechos, envíe una solicitud a <a className="text-cyan-400" href={`mailto:${SITE.email}`}>{SITE.email}</a>,
          acompañada de copia de su DNI o documento equivalente. También puede presentar una
          reclamación ante la Agencia Española de Protección de Datos (
          <a className="text-cyan-400" href="https://www.aepd.es" target="_blank" rel="noreferrer">www.aepd.es</a>).
        </p>
      </Section>

      <Section title="7. Medidas de seguridad">
        <p>
          El responsable aplica las medidas técnicas y organizativas apropiadas para garantizar la
          seguridad de los datos personales: cifrado en tránsito (HTTPS/TLS), cifrado de contraseñas
          (bcrypt), control de acceso por tokens JWT, copias de seguridad periódicas y registro de
          actividades.
        </p>
      </Section>
    </>
  );
}

function Cookies() {
  return (
    <>
      <h2 className="text-white text-3xl font-bold">Política de Cookies</h2>
      <p>
        Este sitio web utiliza cookies propias y técnicas de almacenamiento local estrictamente
        necesarias para su correcto funcionamiento, conforme al artículo 22.2 de la LSSI-CE y las
        Directrices de la AEPD sobre el uso de cookies.
      </p>

      <Section title="1. ¿Qué son las cookies?">
        <p>
          Una cookie es un pequeño archivo de texto que un sitio web almacena en el dispositivo del
          usuario al visitarlo. Permiten recordar preferencias o facilitar la navegación.
        </p>
      </Section>

      <Section title="2. Cookies y almacenamiento utilizados">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-3 py-2 text-left">Nombre</th>
                <th className="px-3 py-2 text-left">Tipo</th>
                <th className="px-3 py-2 text-left">Finalidad</th>
                <th className="px-3 py-2 text-left">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-700">
                <td className="px-3 py-2 font-mono text-xs">cibermedida-admin-token</td>
                <td className="px-3 py-2">localStorage</td>
                <td className="px-3 py-2">Sesión del administrador</td>
                <td className="px-3 py-2">24 horas</td>
              </tr>
              <tr className="border-t border-slate-700">
                <td className="px-3 py-2 font-mono text-xs">cibermedida-theme</td>
                <td className="px-3 py-2">localStorage</td>
                <td className="px-3 py-2">Preferencia modo claro/oscuro</td>
                <td className="px-3 py-2">Persistente</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm">
          Actualmente <strong>no utilizamos cookies de análisis, publicidad o de terceros</strong>.
          Si en el futuro se incorporan, se actualizará esta política y se solicitará consentimiento.
        </p>
      </Section>

      <Section title="3. Cómo gestionar cookies">
        <p>
          El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo
          mediante la configuración de su navegador:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><a className="text-cyan-400" target="_blank" rel="noreferrer" href="https://support.google.com/chrome/answer/95647">Google Chrome</a></li>
          <li><a className="text-cyan-400" target="_blank" rel="noreferrer" href="https://support.mozilla.org/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias">Mozilla Firefox</a></li>
          <li><a className="text-cyan-400" target="_blank" rel="noreferrer" href="https://support.apple.com/es-es/guide/safari/sfri11471">Safari</a></li>
          <li><a className="text-cyan-400" target="_blank" rel="noreferrer" href="https://support.microsoft.com/es-es/microsoft-edge">Microsoft Edge</a></li>
        </ul>
      </Section>
    </>
  );
}

function Condiciones() {
  return (
    <>
      <h2 className="text-white text-3xl font-bold">Condiciones Generales de Uso</h2>
      <p>
        Las presentes condiciones regulan el uso del sitio web {SITE.domain} y los servicios
        ofrecidos por {SITE.titular}.
      </p>

      <Section title="1. Aceptación">
        <p>
          El acceso y uso del Sitio implica la aceptación plena de estas condiciones. Si el usuario
          no está de acuerdo, debe abstenerse de utilizar el Sitio.
        </p>
      </Section>

      <Section title="2. Servicios ofrecidos">
        <p>
          Cibermedida ofrece {SITE.activity}. Los detalles de cada servicio, su precio y condiciones
          específicas se acordarán de forma individual entre las partes mediante contrato o
          propuesta escrita.
        </p>
      </Section>

      <Section title="3. Uso del chatbot de IA">
        <p>
          El asistente virtual del sitio utiliza tecnología de inteligencia artificial para responder
          consultas generales. <strong>No sustituye a un asesoramiento profesional</strong>. Las
          respuestas pueden contener imprecisiones y deben verificarse antes de tomar decisiones.
          El titular no se responsabiliza de las decisiones tomadas basándose únicamente en las
          respuestas del chatbot.
        </p>
      </Section>

      <Section title="4. Registro y cuentas">
        <p>
          El uso de ciertas áreas del Sitio puede requerir registro. El usuario es responsable de
          mantener la confidencialidad de sus credenciales y de toda actividad realizada desde su
          cuenta.
        </p>
      </Section>

      <Section title="5. Limitación de responsabilidad">
        <p>
          El titular no se responsabiliza de daños derivados del uso del Sitio, incluyendo pérdida
          de datos, lucro cesante o cualquier daño indirecto, salvo en caso de dolo o negligencia
          grave.
        </p>
      </Section>

      <Section title="6. Modificaciones">
        <p>
          El titular se reserva el derecho a modificar estas condiciones en cualquier momento. Las
          modificaciones entrarán en vigor desde su publicación en el Sitio.
        </p>
      </Section>

      <Section title="7. Contacto">
        <p>
          Para cualquier consulta relacionada con estas condiciones, puede contactar en
          {' '}<a className="text-cyan-400" href={`mailto:${SITE.email}`}>{SITE.email}</a> o
          {' '}<a className="text-cyan-400" href={`tel:${SITE.phone.replace(/\s/g,'')}`}>{SITE.phone}</a>.
        </p>
      </Section>
    </>
  );
}
