import React from 'react';
import { Layout } from '../components/Layout';
import { Users, Sparkles, Music, Star, Heart, Zap, PartyPopper } from 'lucide-react';
import stiltWalkerCollage from 'figma:asset/35d65760ac3a7ffa03321a683389583e4197f4b6.png';
import stiltWalkerSolo from 'figma:asset/f028ba06300060b5f2a71f01abda5fce757973e8.png';
import stiltWalkerDaytime from 'figma:asset/db1d29b07070c16e16aa9e82d76568a842d27c4c.png';
import firePerformer from 'figma:asset/81c4aaa862a5688598c847fa40efc3019af7e58d.png';
import patrioticStiltWalker from 'figma:asset/6e012150a67ad4a2681226abf617e9e3c931dfbb.png';
import outdoorFestival from 'figma:asset/9352dfdd37c063abb955a63c099a9245d759b98e.png';
import restaurantPatioMagic from 'figma:asset/163e6aaba5b8850420545dedfd2a252ea8f9321d.png';
import outdoorLawnMagic from 'figma:asset/1a4ddf8b59f374e4e6c31772d8fb75af1ef03354.png';
import restaurantBarMagic from 'figma:asset/07aa9fba389c4f516df8d93488dd80add55bd242.png';
import patrioticStiltDuo from 'figma:asset/0801f3853014d9927a1caf75df7c7f4202cc7d54.png';
import festivalMagicCrowd from 'figma:asset/b5912e6823c2f49f988589f5af389913f54e2c8f.png';
import festivalKidsMagic from 'figma:asset/04b42f6368dcc9ae7bea965680abe8d03fbbb0b9.png';

import balloonTwisterAction from 'figma:asset/e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8.png';
import characterPerformer from 'figma:asset/f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0.png';
import facepainterWork from 'figma:asset/a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2.png';
import partyEntertainment from 'figma:asset/b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4.png';
import giantBubbles from 'figma:asset/fb56bc0e8b61ae69d7293dcd2b0aa2da8e3dca18.png';
import strawberryCostume from 'figma:asset/f7c45be859cd61f02e26b2bc06ddf04af24dd4d7.png';
import peacockCostume from 'figma:asset/0a1a654e9bf5c313d0dc26e6e9758a6354b00652.png';
import unicornCostume from 'figma:asset/4c6e8b4b4a72a68f5b5bc0b00b8f6b8af7f31f1e.png';
import fireDancer from 'figma:asset/e0f2c7d4f9f6bf92e92f9e41485bf0f7ad2e17a8.png';
import ledHooping from 'figma:asset/dbeb5c48c37f2de6f8a15569da1e6be5a51f37c2.png';
import ledWings from 'figma:asset/0c5f5d5e24aba2a1f16c24f83f4fa44c8e4c4de9.png';
import entertainmentSetup from 'figma:asset/b5f6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4.png';
import stiltsButterfly from 'figma:asset/d756de43c9075944e5878a787709d539b828a265.png';

export default function StrollingEntertainment() {
  const characters = [
    {
      icon: Sparkles,
      name: 'Magical Characters',
      description: 'Princesses, superheroes, and fantasy favorites'
    },
    {
      icon: PartyPopper,
      name: 'Classic Clowns',
      description: 'Family-friendly comedy and balloon twisting'
    },
    {
      icon: Music,
      name: 'Musical Performers',
      description: 'Strolling musicians and interactive entertainment'
    },
    {
      icon: Zap,
      name: 'Stilt Walkers',
      description: 'Tall, entertaining performers with a unique twist'
    }
  ];

  const eventTypes = [
    {
      icon: Users,
      title: 'Community Festivals',
      description: 'Street fairs, farmers markets, holiday celebrations, and town events'
    },
    {
      icon: Heart,
      title: 'Private Parties',
      description: 'Birthdays, weddings, reunions, and special celebrations'
    },
    {
      icon: Star,
      title: 'Photo Opportunities',
      description: 'Mall events, store promotions, product launches, and branded activations'
    }
  ];

  return (
    <Layout title="Strolling Entertainment">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-cream via-orange-400 to-coral bg-clip-text text-transparent">
            Strolling Entertainment
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Bring the magic directly to your guests! Our roaming entertainers create unforgettable 
            moments as they mingle, interact, and delight crowds of all ages.
          </p>
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-cream/20 to-coral/20 px-8 py-4 rounded-full border border-coral/30">
            <Users className="w-8 h-8 text-coral" />
            <span className="text-lg font-semibold text-gray-200">Perfect for events where guests are moving around</span>
          </div>
        </div>

        {/* Stilt Walker Photos */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={patrioticStiltWalker} alt="Patriotic stilt walker in red white and blue Uncle Sam costume" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={outdoorFestival} alt="Large outdoor festival with stage and crowd of kids" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={stiltWalkerCollage} alt="Stilt walker in striped costume at outdoor mall event" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={stiltWalkerSolo} alt="Stilt walker in red and white striped costume at night" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={stiltWalkerDaytime} alt="Stilt walker in rainbow pants during daytime with kids watching" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={firePerformer} alt="Fire performer with flaming hoop at night" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={restaurantPatioMagic} alt="Magic performer at restaurant patio" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={outdoorLawnMagic} alt="Magic performer on outdoor lawn" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={restaurantBarMagic} alt="Magic performer at restaurant bar" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={patrioticStiltDuo} alt="Patriotic stilt walker duo in red white and blue Uncle Sam costumes" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={festivalMagicCrowd} alt="Magic performer entertaining a crowd at a festival" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={festivalKidsMagic} alt="Magic performer entertaining kids at a festival" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* What We Do */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-coral/10 to-cream/10 rounded-3xl p-10 border border-coral/20">
            <h2 className="text-4xl font-bold mb-6 text-coral">What We Do</h2>
            <ul className="space-y-4 text-lg text-gray-300">
              <li className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-coral mt-1 flex-shrink-0" />
                <span>Roam freely throughout your event space, engaging guests one-on-one</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-coral mt-1 flex-shrink-0" />
                <span>Create personalized moments with balloon twisting, magic tricks, or character interactions</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-coral mt-1 flex-shrink-0" />
                <span>Pose for photos and create shareable memories</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-coral mt-1 flex-shrink-0" />
                <span>Keep energy high and guests entertained throughout the event</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10">
            <h2 className="text-4xl font-bold mb-6 text-purple-600">Why It Works</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <span>No need to gather everyone in one place—we come to them!</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <span>Perfect for events with multiple activity areas or long durations</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <span>Creates intimate, memorable interactions that guests love</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <span>Adds atmosphere and excitement without requiring stage setup</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Character Options */}
        <h2 className="text-4xl font-bold text-center mb-12">Our Strolling Characters</h2>
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {characters.map((character, index) => {
            const Icon = character.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center"
              >
                <Icon className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                <p className="text-gray-600">{character.description}</p>
              </div>
            );
          })}
        </div>

        {/* Event Types */}
        <h2 className="text-4xl font-bold text-center mb-12">Perfect For These Events</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {eventTypes.map((event, index) => {
            const Icon = event.icon;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Icon className="w-12 h-12 mb-4 text-orange-500" />
                <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                <p className="text-gray-600 text-lg">{event.description}</p>
              </div>
            );
          })}
        </div>

        {/* Team Highlight */}
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white rounded-3xl p-12 text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">A Dynamic Duo</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Our strolling entertainment is performed by both our talented entertainers! 
            With combined expertise in magic, balloon artistry, character performance, and audience engagement, 
            we create versatile entertainment that adapts to your event's unique needs.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-2">Her Specialties</h3>
              <p className="text-white/90">Balloon twisting, face painting, princess characters</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-2">His Specialties</h3>
              <p className="text-white/90">Magic tricks, comedy, interactive games</p>
            </div>
          </div>
        </div>

        {/* Corporate Focus Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 mb-16">
          <div className="flex items-center gap-4 mb-6 justify-center">
            <Users className="w-12 h-12 text-blue-600" />
            <h2 className="text-4xl font-bold text-blue-600">Corporate Entertainment Solutions</h2>
          </div>
          <p className="text-xl text-gray-600 text-center mb-10 max-w-3xl mx-auto">
            Elevate your brand with professional, scalable entertainment. We specialize in making corporate 
            events memorable—from product launches to holiday parties and team building retreats.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Brand Integration</h3>
              <p className="text-gray-600">
                Custom performances that align with your brand values and messaging. 
                We can incorporate your products, colors, and themes seamlessly.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Scalable Packages</h3>
              <p className="text-gray-600">
                From intimate executive gatherings to large-scale conferences. 
                We adapt our entertainment to fit any venue size or budget.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Professional Production</h3>
              <p className="text-gray-600">
                Seamless production management, keynote speaker intros, and transitions. 
                We work with your event coordinator to ensure flawless execution.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">Popular Corporate Services</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Trade Show Booth Traffic Builders',
                'Employee Appreciation Events',
                'Holiday Party Entertainment',
                'Team Building Activities',
                'Product Launch Activations',
                'Client Appreciation Events',
                'Conference Entertainment',
                'Networking Event Ice Breakers'
              ].map((service, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Info */}
        <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Booking Information</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Available for solo or duo performance. We bring all props, supplies, and costumes. 
            Perfect for events lasting 2-6 hours.
          </p>
          <div className="bg-white rounded-xl px-10 py-6 shadow-lg inline-block">
            <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">Pricing</div>
            <div className="text-3xl font-bold text-gray-800 mb-2">Contact for Quote</div>
            <div className="text-sm text-gray-600">Solo or duo packages available</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}