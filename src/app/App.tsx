import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { ServicePage } from './components/ServicePage';
import BalloonTwisting from './pages/BalloonTwisting';
import BalloonDecor from './pages/BalloonDecor';
import StrollingEntertainment from './pages/StrollingEntertainment';
import { Magic } from './pages/Magic';
import CasinoGameshow from './pages/CasinoGameshow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* New Service Pages */}
        <Route path="/balloon-twisting" element={<BalloonTwisting />} />
        <Route path="/balloon-decor" element={<BalloonDecor />} />
        <Route path="/strolling" element={<StrollingEntertainment />} />
        <Route path="/magic" element={<Magic />} />
        <Route path="/casino-gameshow" element={<CasinoGameshow />} />
        
        {/* Legacy routes for backward compatibility */}
        <Route path="/service/:serviceId" element={<ServicePage />} />
        <Route path="/:serviceId" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;