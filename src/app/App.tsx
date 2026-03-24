import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { ServicePage } from './components/ServicePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/service/:serviceId" element={<ServicePage />} />
        <Route path="/:serviceId" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
