import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ChatWidget from './components/ChatWidget';
import {
  CibermedidaPage, SolucionesPage, RecursosPage, IAPage,
  PreguntanosPage, NoticiasPage, PoliticasPage, ContactoPage,
} from './components/Pages';
import ProyectosPage from './components/ProyectosPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AdminAuthProvider } from './contexts/AdminAuthContext';

const TITLES = {
  '/': 'Cibermedida | Servicios de Ciberseguridad',
  '/soluciones': 'Soluciones | Cibermedida',
  '/recursos': 'Recursos | Cibermedida',
  '/proyectos': 'Proyectos | Cibermedida',
  '/inteligencia-artificial': 'Inteligencia Artificial | Cibermedida',
  '/preguntanos': 'Pregúntanos | Cibermedida',
  '/noticias': 'Noticias | Cibermedida',
  '/politicas': 'Políticas | Cibermedida',
  '/contacto': 'Contacto | Cibermedida',
};

function RouteSideEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = TITLES[pathname] || 'Cibermedida';
    // Toggle admin class to hide the Emergent badge on admin screens
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
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTopButton />
      <ChatWidget />
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
            {/* Admin routes (no public layout) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Public routes with layout */}
            <Route path="/*" element={
              <PublicLayout>
                <Routes>
                  <Route path="/" element={<CibermedidaPage />} />
                  <Route path="/soluciones" element={<SolucionesPage />} />
                  <Route path="/recursos" element={<RecursosPage />} />
                  <Route path="/proyectos" element={<ProyectosPage />} />
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
