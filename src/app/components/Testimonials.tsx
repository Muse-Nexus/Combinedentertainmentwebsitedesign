import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Josh Desilva",
    role: "Desilva Meeting Consultants",
    text: "Brenton is a complete natural and knows how to keep the audience on their toes and entertained! Gameshow Fanatics are fantastic to work with. Brenton really cares about the success of each event and is constantly working to create the most fun and memorable experience for the guests.",
    rating: 5
  },
  {
    id: 2,
    name: "Jennifer Rappenecker",
    role: "Regional Leader, Edward Jones",
    text: "As an event organizer, I LOVED IT \u2013 we didn\u2019t have to do anything in preparation! It was a FRESH & FUN CHANGE for a team-building social event.",
    rating: 5
  },
  {
    id: 3,
    name: "Matt Lane",
    role: "Outreach Coordinator, Community Work Day Program",
    text: "I'm not sure who had a better time, the people playing or the people watching!",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">What Our Clients Say</h2>
        <p className="text-center text-slate-500 mb-16 max-w-xl mx-auto">Real feedback from event organizers and clients across Maui and the Hawaiian Islands.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
              <Quote size={28} className="text-orange-300 mb-4" />
              <p className="text-slate-700 italic mb-6 flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
