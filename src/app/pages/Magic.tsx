import React from 'react';
import { Layout } from '../components/Layout';
import { Wand2, Sparkles, Users, Star, Heart, Zap } from 'lucide-react';
import magicRestaurantCloseup from 'figma:asset/e0f73f1c7e09adb9aad2a1a7e370cd40a7d05cf6.png';
import magicOutdoorRubiks from 'figma:asset/07a24c8f01419bb9c73f6eb4d7f6f3b20db1e5b8.png';
import magicPoolsideKids from 'figma:asset/f4f25cb66ec0fa15fc7a03d5f3a2ad62d62ec2cb.png';
import mulligansMagicShow from 'figma:asset/592c1eb7bbea166d4e336c48db97868dfc44eae7.png';
import outdoorPavilionMagic from 'figma:asset/11eb2d154c61354729f27728a608faf4b7b54548.png';
import halloweenMagicSetup from 'figma:asset/12f79540f03897b0c93675277235b1a83fe70f29.png';
import restaurantPatioMagic from 'figma:asset/163e6aaba5b8850420545dedfd2a252ea8f9321d.png';
import outdoorLawnMagic from 'figma:asset/1a4ddf8b59f374e4e6c31772d8fb75af1ef03354.png';
import restaurantBarMagic from 'figma:asset/07aa9fba389c4f516df8d93488dd80add55bd242.png';
import outdoorMagicBooth from 'figma:asset/85b322f97bd062077545a58b9dd84abae9d810a2.png';
import luxuryHomeMagic from 'figma:asset/4df0031d524a794aa6c2097056f4f573bff41120.png';
import festivalMagicCrowd from 'figma:asset/b5912e6823c2f49f988589f5af389913f54e2c8f.png';
import festivalKidsMagic from 'figma:asset/04b42f6368dcc9ae7bea965680abe8d03fbbb0b9.png';

export function Magic() {
  return (
    <Layout title="Magic">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-sage via-teal-400 to-cyan-500 bg-clip-text text-transparent">
            Magic Brent
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Award-winning magic that amazes audiences of all ages. From intimate close-up magic 
            to full stage illusions, every performance is designed to create wonder.
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={magicOutdoorRubiks} alt="Outdoor magic show with Rubik's cubes for kids" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={magicPoolsideKids} alt="Poolside magic show for kids" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={magicRestaurantCloseup} alt="Restaurant magic with table performance" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={mulligansMagicShow} alt="Mulligan's Magic Show" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={outdoorPavilionMagic} alt="Outdoor Pavilion Magic Show" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={halloweenMagicSetup} alt="Halloween Magic Setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={restaurantPatioMagic} alt="Restaurant Patio Magic Show" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={outdoorLawnMagic} alt="Outdoor Lawn Magic Show" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={restaurantBarMagic} alt="Restaurant Bar Magic Show" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={outdoorMagicBooth} alt="Outdoor Magic Booth" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={luxuryHomeMagic} alt="Luxury Home Magic Show" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={festivalMagicCrowd} alt="Festival Magic Crowd" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={festivalKidsMagic} alt="Festival Kids Magic" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Performance Types */}
        <h2 className="text-4xl font-bold text-center mb-12 text-sage">Performance Styles</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-sage/10 to-teal-500/10 rounded-2xl p-8 border border-sage/20 hover:shadow-xl transition-all">
            <Wand2 className="w-12 h-12 mb-4 text-sage" />
            <h3 className="text-2xl font-bold mb-3">Close-Up Magic</h3>
            <p className="text-gray-300">
              Intimate magic performed right under your guests' noses. Cards, coins, and 
              mind-reading that happens in their hands!
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-sage/10 to-teal-500/10 rounded-2xl p-8 border border-sage/20 hover:shadow-xl transition-all">
            <Star className="w-12 h-12 mb-4 text-teal-400" />
            <h3 className="text-2xl font-bold mb-3">Stage Shows</h3>
            <p className="text-gray-300">
              Full theatrical productions with music, lighting, and illusions that captivate 
              audiences from 50 to 500+ people.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-sage/10 to-teal-500/10 rounded-2xl p-8 border border-sage/20 hover:shadow-xl transition-all">
            <Users className="w-12 h-12 mb-4 text-cyan-400" />
            <h3 className="text-2xl font-bold mb-3">Strolling Magic</h3>
            <p className="text-gray-300">
              Roaming entertainment perfect for cocktail hours, trade shows, and events where 
              guests are mingling.
            </p>
          </div>
        </div>

        {/* Specialties */}
        <div className="bg-gradient-to-br from-sage/20 to-teal-500/20 rounded-3xl p-12 mb-16 border border-sage/30">
          <h2 className="text-4xl font-bold text-center mb-10">Signature Acts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-3 text-teal-400">Comedy Magic</h3>
              <p className="text-gray-300 mb-4">
                Laughter and amazement go hand-in-hand! Interactive routines that get your 
                audience laughing as hard as they're gasping.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  Perfect for corporate events
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  Family-friendly material
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-3 text-cyan-400">Mentalism & Mind Reading</h3>
              <p className="text-gray-300 mb-4">
                Psychological illusions that seem impossible. Predict choices, read minds, 
                and leave audiences questioning reality.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Interactive audience participation
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Creates unforgettable moments
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-3 text-sage">Kids' Magic Shows</h3>
              <p className="text-gray-300 mb-4">
                High-energy, colorful magic designed specifically for young audiences. 
                Includes balloon twisting and comedy!
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-sage" />
                  Age-appropriate material
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-sage" />
                  Birthday party specials
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-3 text-teal-400">Corporate Entertainment</h3>
              <p className="text-gray-300 mb-4">
                Customizable magic that incorporates your brand, products, or company 
                messages seamlessly into the performance.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-400" />
                  Product reveals and launches
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-400" />
                  Trade show traffic builders
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Perfect For */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-8">Perfect For</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Birthday Parties',
              'Corporate Events',
              'Holiday Parties',
              'Trade Shows',
              'Weddings',
              'Fundraisers',
              'School Assemblies',
              'Grand Openings',
              'Private Parties',
              'Bar/Bat Mitzvahs',
              'Company Picnics',
              'Conference Entertainment'
            ].map((event, i) => (
              <span 
                key={i}
                className="bg-sage/20 border border-sage/30 px-6 py-3 rounded-full text-gray-200 font-semibold hover:bg-sage/30 hover:scale-105 transition-all duration-200"
              >
                {event}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-sage via-teal-500 to-cyan-500 text-white rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Book Magic Brent</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every show is custom-tailored to your event. Whether you need 15 minutes of 
            strolling magic or a full 60-minute stage spectacular, we'll create the perfect experience.
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