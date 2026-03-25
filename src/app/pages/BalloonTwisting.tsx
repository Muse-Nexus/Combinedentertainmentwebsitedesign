import React from 'react';
import { Layout } from '../components/Layout';
import { PartyPopper, Heart, Star, Sparkles, Users, Zap } from 'lucide-react';
import balloonDogProgress from 'figma:asset/fb1ebbf50f47fa6b088f6f3ed5da3ae0fa9a9b46.png';
import balloonFlowerHat from 'figma:asset/efc57f37ee80130d6e1dfa4d2ae34dcbb82a5ab6.png';
import balloonCrownGirl from 'figma:asset/ded7aef06ce25cfc18ba621dd35d00c34bfaf7c0.png';
import balloonCreationsCollage from 'figma:asset/20db05c30d4e86821f4abc07f6e7bb696e40a59f.png';
import luxuryHomeMagic from 'figma:asset/4df0031d524a794aa6c2097056f4f573bff41120.png';
import minecraftBalloons from 'figma:asset/d3d8507140584e73d68ae6a028809919546d2892.png';
import facePaintingKids from 'figma:asset/d054e91c672567338884e40d756bc206ce87b4db.png';
import dragonFacePaint from 'figma:asset/25703605805d4ca7b44fa122e97e3064385cabaf.png';
import pandaBalloonFacePaint from 'figma:asset/c2277d433baf079d8c32190c0e228485e3b83152.png';
import octopusBalloon from 'figma:asset/dd84290466707aeeba8d254a8ffbf53ce4e41ee5.png';
import catFacePaint from 'figma:asset/b069b32879e7f6b77ccba151ecc2199ad44fb385.png';
import frozenBalloonWand from 'figma:asset/7d75aff22c26de6a453df895bdef026cdbfe9336.png';
import princessBalloonFrame from 'figma:asset/c117f457f672dcea347ac85186925743927f40a8.png';
import rainbowButterflyDuo from 'figma:asset/f0b5279ca3d5a0c0c4bdc34ff27cdd453528b236.png';
import pikachuBalloon from 'figma:asset/c397137cd8ed7c8667afec41b2fe7555a9c2266c.png';
import superheroDuo from 'figma:asset/29a5e33c505a55517fc754291fd4a0823f649044.png';
import orangeCatFacePaint from 'figma:asset/e84e1b07b9076b72ed9cfc6ff20962b8645cc9d5.png';
import sugarSkullFacePaint from 'figma:asset/6a904f81a91afc5c2cb4ec9389ff9e1e2662cbda.png';
import turquoiseCatFacePaint from 'figma:asset/55f1fe1868bd3ccc07f40d3fa047fa268c549997.png';
import customCharacterCenterpiece from 'figma:asset/554101518f1ebe9442aeb8fb54535aa5c9f4c9e3.png';

export default function BalloonTwisting() {
  const creations = [
    { icon: Star, name: 'Animals', description: 'Puppies, giraffes, monkeys, and more!' },
    { icon: Zap, name: 'Swords & Shields', description: 'Perfect for little knights and warriors' },
    { icon: Heart, name: 'Crowns & Tiaras', description: 'Make every child feel like royalty' },
    { icon: Sparkles, name: 'Hearts & Flowers', description: 'Sweet designs for special moments' },
    { icon: Users, name: 'Custom Requests', description: 'We love a creative challenge!' },
    { icon: PartyPopper, name: 'Party Favors', description: 'Every guest leaves with a smile' }
  ];

  const circusSkills = [
    { icon: Star, name: 'Stilt Walking', description: 'Towering characters that wow your guests' },
    { icon: Zap, name: 'Juggling', description: 'Mesmerizing skill displays' },
    { icon: Sparkles, name: 'Comedy Magic', description: 'Interactive tricks that get kids laughing' }
  ];

  return (
    <Layout title="Balloon Twisting & Face Painting">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-burgundy via-pink-500 to-lavender bg-clip-text text-transparent">
            Kids & Circus Entertainment
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Whimsical characters, breathtaking circus skills, and vibrant balloon creations 
            that bring magic to every celebration
          </p>
        </div>

        {/* Photo Gallery - Real Work */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={balloonDogProgress} alt="Orange and white balloon fish creations" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={balloonCreationsCollage} alt="Group party with balloon animals and face painting" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-burgundy">Balloon Twisting</h2>
            <p className="text-lg text-gray-300 mb-6">
              Watch in amazement as ordinary balloons transform into extraordinary creations! 
              From adorable animals to superhero accessories, each twist brings smiles and wonder 
              to children of all ages.
            </p>
            <p className="text-lg text-gray-300">
              Perfect for birthday parties, festivals, corporate family days, and any event 
              where you want to add a splash of colorful fun.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6 text-pink-600">Face Painting</h2>
            <p className="text-lg text-gray-700 mb-6">
              Professional face painting that transforms kids into their favorite characters! 
              Using only skin-safe, hypoallergenic paints, we create stunning designs from 
              fierce tigers to magical fairies.
            </p>
            <p className="text-lg text-gray-700">
              Each design is customized to make your little one feel special, with options 
              ranging from quick cheek art to full-face masterpieces. Glitter tattoos also available!
            </p>
          </div>
        </div>

        {/* Circus Skills Section */}
        <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl p-12 mb-16">
          <h2 className="text-4xl font-bold text-center mb-4 text-orange-600">Circus Skills & Characters</h2>
          <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Add wow factor with our professional circus entertainers! From elegant stilt walkers 
            to skilled jugglers, we bring the wonder of the circus to your event.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {circusSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Icon className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                  <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                  <p className="text-gray-600">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Creations Grid */}
        <h2 className="text-4xl font-bold text-center mb-12">Popular Balloon Creations</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {creations.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Icon className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Face Painting Gallery */}
        <h2 className="text-4xl font-bold text-center mb-12 text-pink-600">Face Painting Gallery</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={balloonFlowerHat} alt="Child with colorful flower face painting design" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={balloonCrownGirl} alt="Adults with full face designs at party" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={luxuryHomeMagic} alt="Cherry blossom tree body art on shoulder" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={facePaintingKids} alt="Kids with face painting designs" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={dragonFacePaint} alt="Dragon face painting" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={pandaBalloonFacePaint} alt="Panda balloon face painting" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={octopusBalloon} alt="Octopus balloon" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={catFacePaint} alt="Cat face painting" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={frozenBalloonWand} alt="Frozen balloon wand" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={princessBalloonFrame} alt="Princess balloon frame" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={rainbowButterflyDuo} alt="Rainbow butterfly duo" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={pikachuBalloon} alt="Pikachu balloon" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={superheroDuo} alt="Superhero duo" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={orangeCatFacePaint} alt="Orange cat face painting" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={sugarSkullFacePaint} alt="Sugar skull face painting" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={turquoiseCatFacePaint} alt="Turquoise cat face painting" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={customCharacterCenterpiece} alt="Custom character centerpiece" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Perfect For Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'Birthday Parties',
              'School Events & Carnivals',
              'Corporate Family Days',
              'Community Festivals',
              'Holiday Parties',
              'Grand Openings',
              'Daycare & Preschool Events',
              'Church & Charity Functions'
            ].map((event, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-md">
                <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="font-semibold text-gray-700">{event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Info */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Book Your Party Entertainment</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Available for parties of all sizes! We bring all supplies and can entertain 
            for as long as you need. Packages can include balloon twisting only, face painting 
            only, circus skills, or any combination!
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