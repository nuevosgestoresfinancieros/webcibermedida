import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  CibermedidaPage, SolucionesPage, RecursosPage, IAPage,
  PreguntanosPage, NoticiasPage, PoliticasPage, ContactoPage,
} from './components/Pages';

/* Scroll to top on route change for clear page navigation */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<CibermedidaPage />} />
            <Route path="/soluciones" element={<SolucionesPage />} />
            <Route path="/recursos" element={<RecursosPage />} />
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
