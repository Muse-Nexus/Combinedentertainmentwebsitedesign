import { motion } from 'motion/react';
import { Hero } from '../components/Hero';
import { CloudReveal } from '../components/CloudReveal';
import { ServiceCards } from '../components/ServiceCards';
import { UpcomingShowBanner } from '../components/UpcomingShowBanner';
import { Testimonials } from '../components/Testimonials';
import { Layout } from '../components/Layout';
import { CursorMagicLens } from '../components/CursorMagicLens';
import { DualProfileReveal } from '../components/DualProfileReveal';

export function Home() {
  return (
    <Layout>
      {/* Cursor magic-lens reveal — shows a clear/colorful peek of the umbrella scene
          under the cursor. Disabled on touch devices. */}
      <CursorMagicLens imageUrl="/media/magic/brent-umbrella-beach.jpg" size={260} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Hero />
        <CloudReveal />

        {/* Brenton & Jolie dual portrait — CodePen-inspired, original motion */}
        <DualProfileReveal
          leftImage="/media/magic/brent-pose.avif"
          rightImage="/media/cirque-jolie-2.jpg"
          leftName="Brenton"
          rightName="Jolie"
          caption="The act that makes the storm look like it was in on it."
        />

        <ServiceCards />
        <UpcomingShowBanner />
        <Testimonials />

        {/* Final CTA */}
        <div className="bg-orange-500 py-24 text-center text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to make it rain?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Book Raining Entertainment for your next event and let us handle the forecast.
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-white text-orange-600 font-bold rounded-full text-xl hover:bg-slate-100 transition-colors shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
