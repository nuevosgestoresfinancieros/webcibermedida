import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import {
  WhyCibermedida,
  About,
  Services,
  OnlineSecurity,
  CyberAttacks,
  Guide,
  Monitoring,
  CTA,
} from './components/Sections';
import Footer from './components/Footer';

function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>
        <Hero />
        <WhyCibermedida />
        <About />
        <Services />
        <OnlineSecurity />
        <CyberAttacks />
        <Guide />
        <Monitoring />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
