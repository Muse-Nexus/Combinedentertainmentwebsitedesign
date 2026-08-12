import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { ScrollToTop } from './components/ScrollToTop';
import { RouteHead } from './seo/RouteHead';

const BalloonTwisting = lazy(() => import('./pages/BalloonTwisting'));
const BalloonDecor = lazy(() => import('./pages/BalloonDecor'));
const StrollingEntertainment = lazy(() => import('./pages/StrollingEntertainment'));
const LEDPerformers = lazy(() => import('./pages/LEDPerformers'));
const Magic = lazy(() => import('./pages/Magic'));
const CasinoGameshow = lazy(() => import('./pages/CasinoGameshow'));
const Casino = lazy(() => import('./pages/Casino'));
const GameShow = lazy(() => import('./pages/GameShow'));
const Corporate = lazy(() => import('./pages/Corporate'));
const FacePainting = lazy(() => import('./pages/FacePainting'));
const CirqueJolie = lazy(() => import('./pages/CirqueJolie'));
const MulligansMagicShow = lazy(() => import('./pages/MulligansMagicShow'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UpcomingShows = lazy(() =>
  import('./pages/UpcomingShows').then((module) => ({ default: module.UpcomingShows })),
);
const About = lazy(() =>
  import('./pages/About').then((module) => ({ default: module.About })),
);
const Contact = lazy(() =>
  import('./pages/Contact').then((module) => ({ default: module.Contact })),
);

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-slate-950 text-white"
    >
      <div className="text-center">
        <div
          aria-hidden="true"
          className="mx-auto mb-4 h-10 w-10 animate-spin motion-reduce:animate-none rounded-full border-2 border-white/20 border-t-coral"
        />
        <p className="font-semibold">Opening the umbrella…</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <RouteHead />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Service pages */}
          <Route path="/balloon-twisting" element={<BalloonTwisting />} />
          <Route path="/balloon-decor" element={<BalloonDecor />} />
          <Route path="/strolling" element={<StrollingEntertainment />} />
          <Route path="/led-performers" element={<LEDPerformers />} />
          <Route path="/magic" element={<Magic />} />
          <Route path="/casino-gameshow" element={<CasinoGameshow />} />
          <Route path="/casino" element={<Casino />} />
          <Route path="/game-show" element={<GameShow />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/face-painting" element={<FacePainting />} />
          <Route path="/cirque-jolie" element={<CirqueJolie />} />

          {/* Information and public show pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/upcoming-shows" element={<UpcomingShows />} />
          <Route path="/shows/mulligans-magic-show" element={<MulligansMagicShow />} />

          {/* Known internal aliases only. Unknown paths must remain true 404s. */}
          <Route path="/magic-brent" element={<Navigate to="/magic" replace />} />
          <Route path="/gameshow-fanatics" element={<Navigate to="/game-show" replace />} />
          <Route
            path="/mulligans-magic-show"
            element={<Navigate to="/shows/mulligans-magic-show" replace />}
          />
          <Route path="/service/magic" element={<Navigate to="/magic" replace />} />
          <Route path="/service/gameshow" element={<Navigate to="/game-show" replace />} />
          <Route path="/service/casino" element={<Navigate to="/casino" replace />} />
          <Route path="/service/kids-circus" element={<Navigate to="/cirque-jolie" replace />} />
          <Route path="/service/corporate" element={<Navigate to="/corporate" replace />} />
          <Route path="/additional-services" element={<Navigate to="/contact" replace />} />

          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
