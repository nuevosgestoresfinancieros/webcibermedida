import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ChatWidget from './components/ChatWidget';
import CustomCursor from './components/CustomCursor';
import {
  CibermedidaPage, SolucionesPage, RecursosPage, IAPage,
  PreguntanosPage, NoticiasPage, PoliticasPage, ContactoPage,
} from './components/Pages';
import ProyectosPage from './components/ProyectosPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import CasosExitoPage from './pages/CasosExitoPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import { AdminAuthProvider } from './contexts/AdminAuthContext';

const TITLES = {
  '/': 'Cibermedida | Servicios de Ciberseguridad',
  '/sobre-nosotros': 'Sobre nosotros | Cibermedida',
  '/soluciones': 'Soluciones | Cibermedida',
  '/recursos': 'Recursos | Cibermedida',
  '/proyectos': 'Proyectos | Cibermedida',
  '/casos-exito': 'Casos de éxito | Cibermedida',
  '/blog': 'Blog | Cibermedida',
  '/faq': 'FAQ | Cibermedida',
  '/inteligencia-artificial': 'Inteligencia Artificial | Cibermedida',
  '/politicas': 'Políticas | Cibermedida',
  '/contacto': 'Contacto | Cibermedida',
};

function RouteSideEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = TITLES[pathname] || 'Cibermedida';
    if (pathname.startsWith('/admin')) {
      document.body.classList.add('is-admin-route');
    } else {
      document.body.classList.remove('is-admin-route');
    }
  }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col app-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-400 focus:text-slate-900 focus:font-bold focus:rounded-md focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
      <Footer />
      <ScrollToTopButton />
      <ChatWidget />
      <CustomCursor />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AdminAuthProvider>
          <RouteSideEffects />
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/*" element={
              <PublicLayout>
                <Routes>
                  <Route path="/" element={<CibermedidaPage />} />
                  <Route path="/sobre-nosotros" element={<AboutPage />} />
                  <Route path="/soluciones" element={<SolucionesPage />} />
                  <Route path="/recursos" element={<RecursosPage />} />
                  <Route path="/proyectos" element={<ProyectosPage />} />
                  <Route path="/casos-exito" element={<CasosExitoPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogDetailPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/inteligencia-artificial" element={<IAPage />} />
                  <Route path="/preguntanos" element={<PreguntanosPage />} />
                  <Route path="/noticias" element={<NoticiasPage />} />
                  <Route path="/politicas" element={<PoliticasPage />} />
                  <Route path="/contacto" element={<ContactoPage />} />
                  <Route path="*" element={<CibermedidaPage />} />
                </Routes>
              </PublicLayout>
            } />
          </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
