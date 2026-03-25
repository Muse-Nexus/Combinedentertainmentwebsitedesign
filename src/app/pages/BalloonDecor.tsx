import React from 'react';
import { Layout } from '../components/Layout';
import { Sparkles, Heart, Star, PartyPopper, Palette, Zap, Gift, Crown } from 'lucide-react';
import garlandStaircase from 'figma:asset/cfad026c1b14df88e3d33dd5ea34e1abf0aa8c22.png';
import organicGarland from 'figma:asset/45d4b8ad97ecb436654d54b36d42aa34fdc7f1ba.png';
import elegantArch from 'figma:asset/e7aca62e80cb2e5bdc8c2d0d789dffc28b4c1f27.png';
import photoBackdrop from 'figma:asset/31f6d5d9faaa7ae3c867ee62a47ed91c2f5d76d1.png';
import tropicalArch from 'figma:asset/df5aaeaae97dde3becea43f7e9ca3f49f0f8f57a.png';
import rainbowArch from 'figma:asset/a7ec7c1e3d2a7c13c96e22afce9a46ddea37d90b.png';
import birthdayBackdrop from 'figma:asset/e8fe76ca2eba1b34ecefe40ba1f16fe74f39a23d.png';
import desertGarland from 'figma:asset/a2d6d742ce54f7e3e313a51a40e7a2e0c6edaa70.png';
import underTheSeaArch from 'figma:asset/b20cc27130218882e0937d9d06dc030cfdf0ccb8.png';
import rainbowGreenhouseArch from 'figma:asset/36aad1f671f3d081af09db68a63d89e2ce68cfbc.png';
import sageGoldBirthdayArch from 'figma:asset/ee48b5c56e382ad42c6d9663b15701b044cb5385.png';
import rockStarBackdrop from 'figma:asset/a778b0b401e25269250b27cc2814bd0f6fed7ae8.png';
import elegantBlackSilverBackdrop from 'figma:asset/4b390fe7e9c362b3219d33e791bc33bc17a123b4.png';
import patrioticResortArch from 'figma:asset/01e8a8f997ef1ea6bf9e10e9d79921ad71b63602.png';
import halloweenSpiderArch from 'figma:asset/53d9d3524104146dff3c3a3fdf5e34a4b2297974.png';
import beerBrewingGarland from 'figma:asset/336bbd8b818b3bc658eb41c106f2b39deb287867.png';
import redWhiteArch from 'figma:asset/e165c4baf96fce8072e80da0d708a8460f1a433e.png';
import stPatricksRainbowArch from 'figma:asset/2a25f16720e3727ca36cb35dc9eeb7e3350cb6dd.png';
import goldSilverFloralArch from 'figma:asset/ddf305ab228a7ed7866ccd998b68d3c753c23a91.png';
import easterBunnyArch from 'figma:asset/294dad54946a75b4a2b85d4558449cf5fc808167.png';

export default function BalloonDecor() {
  const services = [
    {
      icon: PartyPopper,
      title: 'Balloon Arches',
      description: 'Stunning entrance pieces and photo backdrops in any color scheme',
      popular: true
    },
    {
      icon: Star,
      title: 'Columns & Pillars',
      description: 'Frame your event space with elegant balloon columns',
      popular: false
    },
    {
      icon: Heart,
      title: 'Centerpieces',
      description: 'Table decorations that wow your guests',
      popular: false
    },
    {
      icon: Gift,
      title: 'Specialty Sculptures',
      description: 'Custom balloon art from numbers to characters',
      popular: true
    },
    {
      icon: Palette,
      title: 'Corporate Branding',
      description: 'Match your company colors and logo perfectly',
      popular: false
    },
    {
      icon: Sparkles,
      title: 'Full Venue Transformations',
      description: 'Complete event design from floor to ceiling',
      popular: true
    }
  ];

  return (
    <Layout title="Balloon Decor">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-coral via-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Balloon Decor & Installations
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your event space with breathtaking balloon artistry. From elegant arches 
            to immersive installations, we create unforgettable atmospheres.
          </p>
        </div>

        {/* Featured Gallery - Real Work */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={garlandStaircase} alt="Garland staircase" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={organicGarland} alt="Organic garland" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={elegantArch} alt="Elegant arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={photoBackdrop} alt="Photo backdrop" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={tropicalArch} alt="Tropical arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={rainbowArch} alt="Rainbow arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={birthdayBackdrop} alt="Birthday backdrop" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={desertGarland} alt="Desert garland" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={underTheSeaArch} alt="Under the sea arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={rainbowGreenhouseArch} alt="Rainbow greenhouse arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={sageGoldBirthdayArch} alt="Sage gold birthday arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={rockStarBackdrop} alt="Rock star backdrop" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={elegantBlackSilverBackdrop} alt="Elegant black silver backdrop" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={patrioticResortArch} alt="Patriotic resort arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={halloweenSpiderArch} alt="Halloween spider arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={beerBrewingGarland} alt="Beer brewing garland" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={redWhiteArch} alt="Red white arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={stPatricksRainbowArch} alt="St patricks rainbow arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={goldSilverFloralArch} alt="Gold silver floral arch" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={easterBunnyArch} alt="Easter bunny arch" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Services Grid */}
        <h2 className="text-4xl font-bold text-center mb-12">Our Balloon Decor Services</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 relative ${
                  service.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                    Popular
                  </div>
                )}
                <Icon className="w-12 h-12 mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Share your vision and event details' },
              { step: '02', title: 'Design', desc: 'We create a custom proposal and quote' },
              { step: '03', title: 'Setup', desc: 'Professional installation on your event day' },
              { step: '04', title: 'Wow!', desc: 'Your guests are amazed by the transformation' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-black text-purple-200 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Types */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-8">Perfect For Any Occasion</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Weddings', 'Birthday Parties', 'Baby Showers', 'Corporate Events',
              'Grand Openings', 'Graduations', 'Anniversaries', 'Holiday Parties',
              'Photo Shoots', 'Sweet 16s', 'Bar/Bat Mitzvahs', 'Quinceañeras'
            ].map((event, i) => (
              <span 
                key={i}
                className="bg-white px-6 py-3 rounded-full shadow-md text-gray-700 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                {event}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your vision! We offer free consultations and can work with any budget, 
            color scheme, or theme. Delivery, setup, and takedown included.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-10 py-6 inline-block">
            <div className="text-sm uppercase tracking-wider opacity-90 mb-2">Pricing</div>
            <div className="text-3xl font-bold mb-2">Contact for Quote</div>
            <div className="text-sm opacity-90">Custom packages available</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}