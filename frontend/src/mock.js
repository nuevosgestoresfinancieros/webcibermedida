// Mock data for Cibermedida clone

export const navLinks = [
  { label: 'Cibermedida', to: '/' },
  { label: 'Sobre nosotros', to: '/sobre-nosotros' },
  { label: 'Soluciones', to: '/soluciones' },
  { label: 'Recursos', to: '/recursos' },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Casos éxito', to: '/casos-exito' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Inteligencia Artificial', to: '/inteligencia-artificial' },
  { label: 'Políticas', to: '/politicas' },
  { label: 'Contacto', to: '/contacto' },
];

export const stats = [
  { label: 'Empresas formadas', value: 50, suffix: '+' },
  { label: 'Alumnos capacitados', value: 1000, suffix: '+' },
  { label: 'Cursos impartidos', value: 50, suffix: '+' },
  { label: 'Años de experiencia', value: 5, suffix: '+' },
];

export const team = [
  { name: 'Javier Flor', role: 'CEO & Fundador', bio: 'Más de 15 años en ciberseguridad y transformación digital. Diseña los programas formativos estratégicos.', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80' },
  { name: 'Laura Martínez', role: 'Directora Técnica', bio: 'Especialista en auditoría, respuesta a incidentes y cumplimiento normativo RGPD.', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80' },
  { name: 'Carlos Ruiz', role: 'Lead IA & Analítica', bio: 'Experto en aplicación práctica de IA generativa y automatización en entornos empresariales.', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80' },
  { name: 'Ana Serrano', role: 'Formación & Marketing', bio: 'Coordina la experiencia formativa y estrategia de contenidos para alumnos y clientes.', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80' },
];

export const testimonials = [
  { id: 1, name: 'Marta Jiménez', role: 'CISO', company: 'Grupo Textil Norte', quote: 'La formación en ciberseguridad de Cibermedida transformó la cultura de seguridad de toda nuestra plantilla. Redujimos los incidentes por phishing un 70% en 6 meses.', rating: 5 },
  { id: 2, name: 'David Puig', role: 'Director IT', company: 'Ayuntamiento de Valencia', quote: 'Programa excelente, muy práctico y adaptado a nuestra realidad. El equipo demostró un conocimiento técnico excepcional.', rating: 5 },
  { id: 3, name: 'Elena Castro', role: 'HR Manager', company: 'TechStart Madrid', quote: 'Nuestros equipos ahora aplican buenas prácticas de IA sin exponer datos sensibles. Formación clara y aplicable desde el primer día.', rating: 5 },
  { id: 4, name: 'Roberto Álvarez', role: 'Director', company: 'Centro FP Digital', quote: 'El aula virtual y los materiales SCORM son de altísima calidad. Nuestros alumnos están muy satisfechos con la experiencia.', rating: 4 },
];

export const partners = [
  { name: 'INCIBE' }, { name: 'AEPD' }, { name: 'CNMC' }, { name: 'IEEE' },
  { name: 'Google Cloud' }, { name: 'AWS' }, { name: 'Microsoft' }, { name: 'Cisco' },
];

export const faqCategories = ['Todas', 'Servicios', 'Formación', 'Precios', 'Técnico'];
export const faqs = [
  { id: 1, category: 'Servicios', question: '¿Qué servicios ofrece Cibermedida?', answer: 'Ofrecemos formación en ciberseguridad, inteligencia artificial aplicada, marketing digital, auditorías de seguridad, gestión de cumplimiento RGPD y desarrollo de plataformas formativas personalizadas.' },
  { id: 2, category: 'Formación', question: '¿Vuestros cursos están certificados?', answer: 'Sí, emitimos certificados digitales verificables tras la finalización de cada curso. Algunos programas están homologados por entidades oficiales y permiten obtener créditos ECTS.' },
  { id: 3, category: 'Formación', question: '¿Puedo acceder a los contenidos desde móvil?', answer: 'Absolutamente. Nuestra aula virtual (aula.cibermedida.es) es responsive y funciona perfectamente en móvil, tablet y ordenador. Los contenidos SCORM también son compatibles con los principales LMS.' },
  { id: 4, category: 'Precios', question: '¿Cómo se calculan los precios de los cursos?', answer: 'Depende del programa, número de alumnos y modalidad (online, presencial, mixta). Contáctanos y te enviamos una propuesta personalizada adaptada a tus necesidades.' },
  { id: 5, category: 'Servicios', question: '¿Trabajáis con administraciones públicas?', answer: 'Sí, tenemos amplia experiencia con ayuntamientos, diputaciones y consejerías. Cumplimos todos los requisitos de contratación pública y licitaciones.' },
  { id: 6, category: 'Técnico', question: '¿Cómo integráis vuestro contenido con mi LMS?', answer: 'Generamos paquetes SCORM estándar que son compatibles con Moodle, Canvas, Blackboard y cualquier LMS moderno. También ofrecemos integración vía API si tu plataforma lo permite.' },
  { id: 7, category: 'Técnico', question: '¿Qué medidas de protección de datos aplicáis?', answer: 'Cumplimos estrictamente con el RGPD. Los datos se almacenan en servidores en la UE, usamos cifrado en tránsito y en reposo, y contamos con políticas de retención claras y un DPO designado.' },
  { id: 8, category: 'Formación', question: '¿Ofrecéis cursos personalizados para mi empresa?', answer: 'Sí, diseñamos programas a medida adaptados al sector, tamaño y madurez digital de cada organización. Realizamos un diagnóstico previo gratuito para entender tus necesidades.' },
];

export const successCases = [
  { id: 1, title: 'Transformación de ciberseguridad en cadena textil', sector: 'Retail', image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=800&q=80',
    description: 'Diseñamos un programa de formación y concienciación para 450 empleados de una cadena textil nacional, complementado con simulacros de phishing trimestrales y auditoría inicial.',
    metrics: [{ icon: 'TrendingUp', value: '-70%', label: 'Incidentes phishing' }, { icon: 'Users', value: '450', label: 'Empleados formados' }, { icon: 'Clock', value: '6 meses', label: 'Duración' }] },
  { id: 2, title: 'Digitalización formativa en administración pública', sector: 'Sector público', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: 'Implantamos una aula virtual completa con 12 cursos SCORM para la formación continua de 1.200 funcionarios en ciberseguridad, IA y protección de datos.',
    metrics: [{ icon: 'Users', value: '1.200', label: 'Funcionarios' }, { icon: 'Shield', value: '12', label: 'Cursos SCORM' }, { icon: 'TrendingUp', value: '92%', label: 'Finalización' }] },
  { id: 3, title: 'Cultura de IA responsable en startup tecnológica', sector: 'Tecnología', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    description: 'Programa intensivo de uso seguro de IA generativa (ChatGPT, Copilot) para un equipo de 80 ingenieros, con guidelines internas y políticas de protección de datos.',
    metrics: [{ icon: 'Users', value: '80', label: 'Ingenieros' }, { icon: 'Clock', value: '4 semanas', label: 'Programa' }, { icon: 'Shield', value: '100%', label: 'Cumplimiento' }] },
];

export const blogCategories = ['Todos', 'Ciberseguridad', 'Inteligencia Artificial', 'Formación', 'RGPD'];
export const blogPosts = [
  { id: 1, slug: 'phishing-2026-tendencias', title: 'Phishing en 2026: nuevas tácticas y cómo defenderse', excerpt: 'Analizamos las últimas tendencias en ataques de suplantación que se apoyan en IA generativa para imitar perfectamente el estilo de la víctima.', category: 'Ciberseguridad', date: '01 May 2026', readTime: '6 min', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80', tags: ['phishing', 'ia', 'formación'],
    content: [
      { type: 'p', text: 'Los ataques de phishing han evolucionado drásticamente en los últimos meses gracias a la IA generativa. Los modelos de lenguaje permiten redactar correos hiperrealistas adaptados al estilo exacto del remitente suplantado.' },
      { type: 'h2', text: 'Las 3 técnicas que más han crecido' },
      { type: 'list', items: ['Spear-phishing personalizado con scraping previo de LinkedIn', 'Deepfakes de voz en llamadas de CEO-fraud', 'Páginas clonadas generadas automáticamente en minutos'] },
      { type: 'h2', text: '¿Cómo proteger a tu organización?' },
      { type: 'p', text: 'La formación continua sigue siendo la mejor defensa. Combínala con verificación MFA, DMARC/DKIM/SPF en el dominio, y simulacros periódicos de phishing para medir la madurez de tu plantilla.' },
    ] },
  { id: 2, slug: 'uso-seguro-ia-generativa', title: 'Guía práctica: uso seguro de IA generativa en la empresa', excerpt: 'Políticas, herramientas y buenas prácticas para que tu equipo aproveche ChatGPT y Copilot sin exponer datos sensibles.', category: 'Inteligencia Artificial', date: '20 Abr 2026', readTime: '8 min', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80', tags: ['ia', 'chatgpt', 'rgpd'],
    content: [
      { type: 'p', text: 'La IA generativa es una herramienta de productividad extraordinaria, pero su uso sin control puede provocar fugas de datos sensibles y problemas de cumplimiento.' },
      { type: 'h2', text: 'Políticas internas mínimas' },
      { type: 'list', items: ['Clasificación de datos: qué NO se puede pegar en un chat', 'Uso de versiones enterprise con aislamiento de datos', 'Formación periódica del equipo'] },
    ] },
  { id: 3, slug: 'rgpd-auditoria-express', title: 'Auditoría RGPD express: 10 puntos que debes revisar ya', excerpt: 'Un checklist práctico para verificar el estado de cumplimiento RGPD de tu organización en menos de una semana.', category: 'RGPD', date: '10 Abr 2026', readTime: '5 min', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80', tags: ['rgpd', 'cumplimiento'],
    content: [
      { type: 'p', text: 'Mantener el cumplimiento RGPD es una obligación legal, pero también una oportunidad para generar confianza con tus clientes.' },
      { type: 'h2', text: 'Los 10 puntos críticos' },
      { type: 'list', items: ['Registro de actividades de tratamiento', 'Base legal para cada tratamiento', 'Análisis de riesgos', 'Contratos con encargados', 'Derechos de interesados', 'Brechas de seguridad', 'DPO designado', 'Política de privacidad', 'Cifrado en reposo', 'Plan de respuesta'] },
    ] },
  { id: 4, slug: 'formacion-ciberseguridad-empleados', title: 'Formación en ciberseguridad: por qué no basta con un curso al año', excerpt: 'La concienciación en seguridad debe ser continua. Explicamos cómo estructurar un programa eficaz durante todo el año.', category: 'Formación', date: '01 Abr 2026', readTime: '7 min', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80', tags: ['formación', 'ciberseguridad'],
    content: [
      { type: 'p', text: 'Un único curso anual de ciberseguridad no cambia comportamientos. La literatura científica es clara: la repetición espaciada y el aprendizaje contextual son la clave.' },
      { type: 'h2', text: 'Componentes de un programa eficaz' },
      { type: 'list', items: ['Microlearning mensual (5-10 min)', 'Simulacros trimestrales de phishing', 'Onboarding específico para nuevas incorporaciones', 'Workshops anuales para roles críticos'] },
    ] },
  { id: 5, slug: 'ransomware-recuperacion', title: 'Recuperarse de un ransomware: guía paso a paso', excerpt: 'Qué hacer en las primeras 72 horas tras detectar un ataque de ransomware y cómo minimizar el impacto.', category: 'Ciberseguridad', date: '22 Mar 2026', readTime: '10 min', image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80', tags: ['ransomware', 'incidentes'],
    content: [
      { type: 'p', text: 'Un incidente de ransomware es una emergencia. Las primeras decisiones determinan el alcance del daño.' },
      { type: 'h2', text: 'Las primeras horas' },
      { type: 'list', items: ['Aislar sistemas afectados sin apagarlos', 'Convocar al comité de crisis', 'Notificar a autoridades si aplica (INCIBE-CERT)', 'Preservar evidencias digitales'] },
    ] },
  { id: 6, slug: 'nis2-empresas', title: 'NIS2: qué cambia y a quién afecta', excerpt: 'La nueva directiva europea amplía enormemente el número de empresas obligadas. Analizamos los puntos clave.', category: 'RGPD', date: '15 Mar 2026', readTime: '6 min', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80', tags: ['nis2', 'normativa'],
    content: [
      { type: 'p', text: 'NIS2 entra en vigor y supone un salto cualitativo respecto a su predecesora. Se amplían sectores y obligaciones.' },
      { type: 'h2', text: 'Puntos clave' },
      { type: 'list', items: ['Nuevos sectores obligados', 'Obligaciones de gestión de riesgos', 'Notificación de incidentes en 24h', 'Sanciones hasta el 2% de facturación'] },
    ] },
];

export const projects = [
  {
    id: 1,
    title: 'Cibermedida.es',
    description: 'Web corporativa oficial de Cibermedida con información sobre servicios de ciberseguridad, formación, inteligencia artificial y soluciones de transformación digital.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    tags: ['Web', 'Corporativa', 'Ciberseguridad'],
    category: 'Web',
    appUrl: 'https://cibermedida.es',
  },
  {
    id: 2,
    title: 'API Cibermedida',
    description: 'API central de servicios de Cibermedida. Expone endpoints seguros para autenticación, integración entre plataformas y consumo de datos por parte de los distintos módulos.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['REST API', 'Backend', 'Integraciones'],
    category: 'Infraestructura',
    appUrl: 'https://api.cibermedida.es',
  },
  {
    id: 3,
    title: 'Aula Virtual',
    description: 'Aula virtual de Cibermedida para la impartición de cursos online. Incluye gestión de alumnos, contenidos multimedia, evaluaciones y seguimiento del progreso formativo.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    tags: ['LMS', 'Formación online', 'E-learning'],
    category: 'Formación',
    appUrl: 'https://aula.cibermedida.es',
  },
  {
    id: 4,
    title: 'Entrenamiento Comunicativo',
    description: 'Plataforma de entrenamiento en competencias comunicativas con ejercicios prácticos, simulaciones interactivas y evaluación guiada para mejorar habilidades profesionales.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    tags: ['Formación', 'Comunicación', 'Interactivo'],
    category: 'Formación',
    appUrl: 'https://entrenamiento.comunicativo.cibermedida.es',
  },
  {
    id: 5,
    title: 'Gestión Cibermedida',
    description: 'Panel de gestión interna para la administración de usuarios, cursos, proyectos y recursos corporativos de Cibermedida desde un único entorno centralizado.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['Panel', 'Administración', 'Interno'],
    category: 'Gestión',
    appUrl: 'https://gestion.cibermedida.es',
  },
  {
    id: 6,
    title: 'Markitplace',
    description: 'Marketplace de Cibermedida con catálogo de servicios, cursos y productos digitales disponibles para empresas, instituciones educativas y administraciones públicas.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    tags: ['Marketplace', 'E-commerce', 'Catálogo'],
    category: 'Marketplace',
    appUrl: 'https://markitplace.cibermedida.es',
  },
  {
    id: 7,
    title: 'SCORM Cibermedida',
    description: 'Plataforma SCORM para la distribución y ejecución de contenidos formativos estandarizados, compatible con los principales LMS y herramientas de autoría.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    tags: ['SCORM', 'E-learning', 'Estándar'],
    category: 'Formación',
    appUrl: 'https://scorm.cibermedida.es',
  },
  {
    id: 8,
    title: 'Signados',
    description: 'Solución de firma digital y certificación de documentos para procesos electrónicos seguros. Integra verificación, trazabilidad y cumplimiento normativo.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    tags: ['Firma digital', 'Certificación', 'Legal'],
    category: 'Seguridad',
    appUrl: 'https://signados.cibermedida.es',
  },
];

export const projectCategories = ['Todos', 'Web', 'Infraestructura', 'Formación', 'Gestión', 'Marketplace', 'Seguridad'];

export const heroSlides = [
  {
    id: 1,
    tag: 'CIBERMEDIDA',
    title: 'Formación estructurada para la transformación digital de organizaciones',
    description:
      'Programas especializados en Ciberseguridad, Inteligencia Artificial, Marketing Digital y competencias tecnológicas aplicadas a empresas, centros formativos y administraciones públicas.',
    cta: 'Solicitar información',
    image:
      'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=1600&q=80',
  },
  {
    id: 2,
    tag: 'CIBERMEDIDA',
    title: 'Servicios avanzados de ciberseguridad para tu empresa',
    description:
      'Protección integral, análisis de amenazas y respuesta a incidentes para mantener tu organización segura frente a los ciberataques modernos.',
    cta: 'Solicitar información',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80',
  },
];

export const specializationAreas = [
  'Ciberseguridad y cultura digital',
  'Inteligencia Artificial aplicada',
  'Marketing Digital y estrategia online',
  'Productividad y entornos digitales de trabajo',
  'Competencias TIC para el empleo',
  'Protección de datos y cumplimiento normativo en entornos empresariales.',
];

export const whyPoints = [
  'Formación basada en experiencia técnica real y casos prácticos.',
  'Metodología estructurada orientada a resultados y aplicabilidad inmediata.',
];

export const aboutImages = [
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
];

export const services = [
  {
    title: 'Prevención de pérdida de datos (DLP)',
    desc: 'Prevención de Pérdida de Datos (DLP): Protege tu información más valiosa. ¿Te preocupa que información confidencial de tu empresa, como datos de clientes o secretos comerciales, pueda filtrarse accidentalmente o ser robada?',
    icon: 'ShieldAlert',
  },
  {
    title: 'Gestión de identidad y acceso.',
    desc: 'Controlar quién puede acceder a los recursos TI de las empresas y cómo cada vez es más crítico en las políticas de seguridad. Para planificar bien la estrategia de ciberseguridad es fundamental conocer las diferencias entre gestión de accesos e identidades.',
    icon: 'KeyRound',
  },
  {
    title: 'Seguridad de la red',
    desc: 'Los sistemas de seguridad de la red operan en el perímetro y dentro de la red. En el perímetro, los controles de seguridad intentan impedir que las ciberamenazas entren en la red. Pero los atacantes a veces la traspasan.',
    icon: 'Network',
  },
  {
    title: 'Seguridad de aplicaciones',
    desc: 'Las aplicaciones web y las API modernas son tecnologías esenciales para el negocio que permiten prácticamente todas las interacciones online. Cuanto más depende su organización de estos activos de TI, más importante es protegerlos.',
    icon: 'AppWindow',
  },
  {
    title: 'Gestión de amenazas',
    desc: 'El monitoreo de amenazas es una práctica crítica de ciberseguridad que implica la observación y el análisis continuo de entornos de red y puntos finales para detectar, identificar y responder a posibles amenazas a la seguridad.',
    icon: 'Radar',
  },
  {
    title: 'Gestión de vulnerabilidades',
    desc: 'Las vulnerabilidades informáticas en las aplicaciones son fallos de seguridad que pueden ser aprovechados por atacantes. Detectar estas vulnerabilidades es crucial para proteger la información y los sistemas de una empresa.',
    icon: 'Bug',
  },
  {
    title: 'Auditorías de seguridad',
    desc: 'La auditoría de seguridad informática es la herramienta principal para poder conocer el estado de seguridad en que se encuentra una empresa en relación con sus sistemas informáticos, de comunicación y acceso a internet.',
    icon: 'FileSearch',
  },
  {
    title: 'Análisis de seguridad',
    desc: 'Un análisis de seguridad consiste en la combinación de herramientas utilizadas para identificar, proteger y solucionar eventos de seguridad que amenazan a su sistema de TI mediante datos en tiempo real e históricos.',
    icon: 'ScanSearch',
  },
  {
    title: 'Seguridad en la nube',
    desc: '¿Qué es una nube pública? Las nubes públicas son el tipo más común de implementación de informática en la nube. Los recursos en la nube son propiedad de un proveedor de servicios en la nube que los administra.',
    icon: 'CloudLock',
  },
  {
    title: 'Respuesta a incidentes',
    desc: 'La respuesta a incidentes suele hacerse pensando no sólo en crear un modelo que permita a la entidad estar en capacidad de responder, sino también en la forma como pueden ser detectados, evaluados y gestionados.',
    icon: 'Siren',
  },
  {
    title: 'Gestión de cumplimiento',
    desc: 'Se realiza una evaluación de la infraestructura para identificar los sistemas que no cumplen con las normativas debido a los cambios en los estándares, las políticas o las normas; a los errores de configuración, entre otras razones.',
    icon: 'BadgeCheck',
  },
  {
    title: 'Educación y concienciación',
    desc: 'Para las empresas, los riesgos de estar en línea son cada vez más graves. En los dos últimos años, el 77% de las empresas sufrió al menos un ciberincidente. Por lo tanto, es comprensible que las organizaciones quieran capacitarse.',
    icon: 'GraduationCap',
  },
];

export const onlineSolutions = [
  {
    title: 'Anti-adware',
    desc: 'La lucha anti-adware en ciberseguridad se refiere a las técnicas y herramientas utilizadas para protegerse del software publicitario intrusivo.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80',
  },
  {
    title: 'Anti-rats',
    desc: 'Los RATs (Remote Access Trojans) son un tipo específico de malware que, una vez instalado, permite al atacante tomar control remoto.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
  },
  {
    title: 'Anti-botnets',
    desc: 'Los anti-botnets se refiere a las técnicas y herramientas empleadas para protegerse de redes de dispositivos comprometidos.',
    image: 'https://images.unsplash.com/photo-1526374870839-e155464bb9b2?w=500&q=80',
  },
  {
    title: 'Anti·Trojan',
    desc: 'La lucha anti-troyanos se centra en las estrategias y herramientas utilizadas para defenderse de este tipo de software malicioso.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80',
  },
  {
    title: 'Anti-ransomware',
    desc: 'En el mundo de la ciberseguridad, la lucha contra el ransomware se refiere a las estrategias para prevenir el cifrado hostil de datos.',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&q=80',
  },
  {
    title: 'Anti·Spoofing',
    desc: 'El anti-spoofing se refiere a un conjunto de técnicas y herramientas utilizadas para prevenir el fraude de identidad digital.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80',
  },
];

export const cyberAttacks = [
  {
    title: 'Inyección SQL',
    percent: 40,
    desc: 'Inyección de código malicioso en bases de datos para robar o modificar información (afecta principalmente a sitios web y aplicaciones web).',
    icon: 'Database',
  },
  {
    title: 'Ataque DDoS',
    percent: 30,
    desc: 'Inundación de un sistema con tráfico falso para hacerlo inoperable (sitios web, servicios online). Afecta principalmente a empresas y organizaciones.',
    icon: 'ServerCrash',
  },
  {
    title: 'Ingeniería social',
    percent: 90,
    desc: 'Manipulación psicológica para que las personas revelen información confidencial o realicen acciones perjudiciales (phishing, suplantación).',
    icon: 'Users',
  },
  {
    title: 'Malware',
    percent: 30,
    desc: 'Software malicioso (virus, troyanos, ransomware) que infecta dispositivos para robar información o causar daños.',
    icon: 'Bug',
  },
  {
    title: 'Phishing',
    percent: 65,
    desc: 'Engaño online que roba información personal (contraseñas, tarjetas de crédito) mediante correos electrónicos o sitios web falsos.',
    icon: 'Fish',
  },
  {
    title: 'Ransomware',
    percent: 65,
    desc: 'Malware que secuestra tus archivos y exige un pago para liberarlos. Protégete con copias de seguridad y antivirus actualizado.',
    icon: 'Lock',
  },
];

export const guideSteps = [
  'Identificación del incidente. Clasificar correctamente el tipo de ataque permite activar las medidas adecuadas.',
  'Contención inmediata. Aislar sistemas afectados para evitar propagación.',
  'Notificación y registro. Documentar el incidente y comunicarlo según la normativa aplicable.',
  'Recuperación y análisis posterior. Restaurar sistemas y evaluar causas para prevenir recurrencias.',
];
