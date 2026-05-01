import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import {
  CibermedidaPage, SolucionesPage, RecursosPage, IAPage,
  PreguntanosPage, NoticiasPage, PoliticasPage, ContactoPage,
} from './components/Pages';
import ProyectosPage from './components/ProyectosPage';

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
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col app-surface">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteSideEffects />
        <Layout>
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
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
