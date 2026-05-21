import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { ServicePage } from './components/ServicePage';
import BalloonTwisting from './pages/BalloonTwisting';
import BalloonDecor from './pages/BalloonDecor';
import StrollingEntertainment from './pages/StrollingEntertainment';
import Magic from './pages/Magic';
import CasinoGameshow from './pages/CasinoGameshow';
import Casino from './pages/Casino';
import GameShow from './pages/GameShow';
import Corporate from './pages/Corporate';
import FacePainting from './pages/FacePainting';
import { UpcomingShows } from './pages/UpcomingShows';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Service Pages */}
        <Route path="/balloon-twisting" element={<BalloonTwisting />} />
        <Route path="/balloon-decor" element={<BalloonDecor />} />
        <Route path="/strolling" element={<StrollingEntertainment />} />
        <Route path="/magic" element={<Magic />} />
        <Route path="/casino-gameshow" element={<CasinoGameshow />} />
        <Route path="/casino" element={<Casino />} />
        <Route path="/game-show" element={<GameShow />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/face-painting" element={<FacePainting />} />
        
        {/* Info Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/upcoming-shows" element={<UpcomingShows />} />
        
        {/* Legacy routes for backward compatibility */}
        <Route path="/service/:serviceId" element={<ServicePage />} />
        <Route path="/:serviceId" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;