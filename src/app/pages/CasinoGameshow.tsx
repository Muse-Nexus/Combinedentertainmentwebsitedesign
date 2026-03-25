import React from 'react';
import { Layout } from '../components/Layout';
import { Dices, Trophy, Users, Sparkles, Star, Zap } from 'lucide-react';
import ballroomCasino from 'figma:asset/24ad8c66a3cfd04cd61f0c44c0c2bb6dc14fc2a0.png';
import corporateGameshow from 'figma:asset/c1b98de9fbd82c23f32614cc9cd89c3e039c62fb.png';
import outdoorSetup from 'figma:asset/8d5c6c9f74b6c65b9fec8b2d7c13e4a25f8f3b1a.png';
import dealerAction from 'figma:asset/5f6e8c9d74b6c65b9fec8b2d7c13e4a25f8f3b1b.png';
import intimateParty from 'figma:asset/7e9d8c6f74b6c65b9fec8b2d7c13e4a25f8f3b1c.png';
import casinoWheelAction from 'figma:asset/e2d3c4f74b6c65b9fec8b2d7c13e4a25f8f3b1d.png';
import rouletteTableGuests from 'figma:asset/f4d5e6a74b6c65b9fec8b2d7c13e4a25f8f3b1e.png';
import blackjackTableSetup from 'figma:asset/a6b7c8d74b6c65b9fec8b2d7c13e4a25f8f3b1f.png';
import gameshowHost from 'figma:asset/b8c9d0e74b6c65b9fec8b2d7c13e4a25f8f3b20.png';
import tropicalGameshow from 'figma:asset/c0d1e2f74b6c65b9fec8b2d7c13e4a25f8f3b21.png';
import outdoorTrex from 'figma:asset/d2e3f4a74b6c65b9fec8b2d7c13e4a25f8f3b22.png';
import casinoTableGuests from 'figma:asset/e4f5a6b74b6c65b9fec8b2d7c13e4a25f8f3b23.png';
import blackjackDealer from 'figma:asset/f6a7b8c74b6c65b9fec8b2d7c13e4a25f8f3b24.png';
import crapsTableAction from 'figma:asset/a8b9c0d74b6c65b9fec8b2d7c13e4a25f8f3b25.png';
import rouletteSpinAction from 'figma:asset/b0c1d2e74b6c65b9fec8b2d7c13e4a25f8f3b26.png';
import tropicalTableSetup from 'figma:asset/c2d3e4f74b6c65b9fec8b2d7c13e4a25f8f3b27.png';
import gameshowPrizes from 'figma:asset/d4e5f6a74b6c65b9fec8b2d7c13e4a25f8f3b28.png';
import outdoorCasinoNight from 'figma:asset/e6f7a8b74b6c65b9fec8b2d7c13e4a25f8f3b29.png';
import elegantCasinoSetup from 'figma:asset/f8a9b0c74b6c65b9fec8b2d7c13e4a25f8f3b30.png';
import wheelOfFortuneAction from 'figma:asset/a0b1c2d74b6c65b9fec8b2d7c13e4a25f8f3b31.png';
import corporateCasinoNight from 'figma:asset/b2c3d4e74b6c65b9fec8b2d7c13e4a25f8f3b32.png';
import pokerTablePlayers from 'figma:asset/c4d5e6f74b6c65b9fec8b2d7c13e4a25f8f3b33.png';
import themeCasinoSetup from 'figma:asset/d6e7f8a74b6c65b9fec8b2d7c13e4a25f8f3b34.png';
import collegePartyGames from 'figma:asset/14e812112ff360281f02c5046f64c7606efdd378.png';
import massiveCorporateGameshow from 'figma:asset/7f634e7ebf4efb018feeae726711b40a0472a721.png';
import neonCasinoDealer from 'figma:asset/5e37cc4d8d4b5396467bb847a2d9f5de82dc6969.png';
import holidayPartyGameshow from 'figma:asset/7067297d09123351e23a8bf7ad950d57d4cf7564.png';
import graduationCrapsTable from 'figma:asset/fd51049a18badf7e9e95f1823a82b44940de77b1.png';
import outdoorEveningGameshow from 'figma:asset/d0c4a766c53348b81a2388194820651e40c05be5.png';

export default function CasinoGameshow() {
  const casinoGames = [
    { name: 'Blackjack', icon: Dices, description: 'Classic 21 with professional dealers' },
    { name: 'Poker', icon: Sparkles, description: 'Texas Hold\'em tournaments' },
    { name: 'Roulette', icon: Star, description: 'Spin the wheel and feel the excitement' },
    { name: 'Craps', icon: Dices, description: 'High-energy dice rolling action' }
  ];

  const gameShowFormats = [
    { 
      name: 'Trivia Challenge', 
      icon: Trophy, 
      description: 'Buzzers, podiums, and customizable questions',
      popular: true 
    },
    { 
      name: 'Survey Says!', 
      icon: Users, 
      description: 'Family Feud style audience participation' 
    },
    { 
      name: 'Minute to Win It', 
      icon: Zap, 
      description: 'Fast-paced physical challenges' 
    },
    { 
      name: 'Price is Right', 
      icon: Star, 
      description: 'Guess the prices, win the prizes' 
    }
  ];

  return (
    <Layout title="Casino & Gameshow">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-lavender via-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
            Casino & Gameshow Entertainment
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bring the excitement of Vegas to your event! Professional casino tables and 
            interactive gameshow experiences that turn any gathering into an unforgettable night.
          </p>
        </div>

        {/* Photo Gallery - Real Events */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={ballroomCasino} alt="Ballroom casino setup with guests" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={corporateGameshow} alt="Corporate gameshow setup with guests" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={outdoorSetup} alt="Outdoor casino setup with guests" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={dealerAction} alt="Casino dealer in action" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={intimateParty} alt="Intimate casino party setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={casinoWheelAction} alt="Casino wheel in action" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={rouletteTableGuests} alt="Roulette table with guests" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={blackjackTableSetup} alt="Blackjack table setup with guests" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={gameshowHost} alt="Game show host in action" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={tropicalGameshow} alt="Tropical gameshow setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={outdoorTrex} alt="Outdoor Trex gameshow setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={casinoTableGuests} alt="Casino table with guests" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={blackjackDealer} alt="Blackjack dealer in action" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={crapsTableAction} alt="Craps table action with guests" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={rouletteSpinAction} alt="Roulette spin action" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={tropicalTableSetup} alt="Tropical table setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={gameshowPrizes} alt="Game show prizes" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={outdoorCasinoNight} alt="Outdoor casino night setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={elegantCasinoSetup} alt="Elegant casino setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={wheelOfFortuneAction} alt="Wheel of fortune action" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={corporateCasinoNight} alt="Corporate casino night setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={pokerTablePlayers} alt="Poker table with players" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={themeCasinoSetup} alt="Themed casino setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={collegePartyGames} alt="College party games setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={massiveCorporateGameshow} alt="Massive corporate gameshow setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={neonCasinoDealer} alt="Neon casino dealer" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={holidayPartyGameshow} alt="Holiday party gameshow setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={graduationCrapsTable} alt="Graduation craps table setup" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={outdoorEveningGameshow} alt="Outdoor evening gameshow setup" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Two Column Split */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Casino Side */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-6">
              <Dices className="w-12 h-12 text-red-500" />
              <h2 className="text-4xl font-bold text-red-600">Casino Night</h2>
            </div>
            <p className="text-lg text-gray-700 mb-8">
              Bring the excitement of Las Vegas to your event! Professional dealers, authentic casino 
              equipment, and all the glamour of a night on the Strip—without the risk.
            </p>
            
            <h3 className="text-2xl font-bold mb-4">Popular Games</h3>
            <div className="space-y-4 mb-8">
              {casinoGames.map((game, index) => {
                const Icon = game.icon;
                return (
                  <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-md">
                    <Icon className="w-6 h-6 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">{game.name}</h4>
                      <p className="text-gray-600">{game.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold text-lg mb-2">What's Included:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-red-500" />
                  Professional dealers in casino attire
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-red-500" />
                  Authentic casino-grade tables and equipment
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-red-500" />
                  Play money and chips for guests
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-red-500" />
                  Prize packages for top winners
                </li>
              </ul>
            </div>
          </div>

          {/* Game Show Side */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-12 h-12 text-orange-500" />
              <h2 className="text-4xl font-bold text-orange-600">Game Show</h2>
            </div>
            <p className="text-lg text-gray-700 mb-8">
              Your guests become the contestants! Interactive game show entertainment with authentic 
              equipment, professional hosting, and non-stop excitement that gets everyone involved.
            </p>
            
            <h3 className="text-2xl font-bold mb-4">Game Show Formats</h3>
            <div className="space-y-4 mb-8">
              {gameShowFormats.map((format, index) => {
                const Icon = format.icon;
                return (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 bg-white rounded-xl p-4 shadow-md ${
                      format.popular ? 'ring-2 ring-orange-500' : ''
                    }`}
                  >
                    <Icon className="w-6 h-6 text-orange-500 mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg">{format.name}</h4>
                        {format.popular && (
                          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">POPULAR</span>
                        )}
                      </div>
                      <p className="text-gray-600">{format.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold text-lg mb-2">What's Included:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-500" />
                  Professional game show host
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-500" />
                  Authentic podiums, buzzers, and equipment
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-500" />
                  Sound effects and lighting
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-500" />
                  Customizable content for your audience
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Perfect For Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Perfect For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Corporate Events', desc: 'Team building, holiday parties, conferences' },
              { title: 'Fundraisers', desc: 'Casino nights that raise money for your cause' },
              { title: 'Private Parties', desc: 'Milestone birthdays, bachelor/bachelorette parties' },
              { title: 'Trade Shows', desc: 'Attract crowds and engage attendees' },
              { title: 'Company Picnics', desc: 'Add excitement to your annual gathering' },
              { title: 'Grad Nights', desc: 'Safe, supervised fun for students' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-xl mb-2 text-red-600">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Combination Package */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white rounded-3xl p-12 text-center mb-16">
          <Sparkles className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Ultimate Entertainment Package</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Why choose? Combine Casino and Game Show entertainment for the ultimate event experience! 
            Perfect for larger events or multi-room venues.
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-bold mb-2">Full Production</h3>
              <p className="text-sm opacity-90">Sound, lighting, and MC services</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-bold mb-2">Professional Staff</h3>
              <p className="text-sm opacity-90">Dealers, hosts, and support crew</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-bold mb-2">Prize Coordination</h3>
              <p className="text-sm opacity-90">We can help source and manage prizes</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">Investment</h2>
          <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl p-10 max-w-2xl mx-auto shadow-lg">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-10 py-8">
              <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">Pricing</div>
              <div className="text-4xl font-black text-gray-800 mb-3">Contact for Quote</div>
              <p className="text-gray-600 text-lg">
                Casino nights, game shows, and custom packages available
              </p>
            </div>
          </div>
          <p className="text-gray-500 mt-8 max-w-2xl mx-auto">
            Contact us for custom packages combining both services, multi-day events, or special requests. 
            We work with all budgets and can create the perfect entertainment solution for your needs.
          </p>
        </div>
      </div>
    </Layout>
  );
}