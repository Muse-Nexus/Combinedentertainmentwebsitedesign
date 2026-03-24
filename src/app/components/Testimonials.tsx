import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Event Coordinator",
    text: "Raining Entertainment saved our outdoor festival! When the weather turned, their team didn't miss a beat. The umbrella theme isn't just a gimmick, it's a promise.",
    rating: 5
  },
  {
    id: 2,
    name: "Mike Ross",
    role: "Corporate Client",
    text: "Magic Brent and Cirque Jolie combined is a powerhouse. We got the structure of a corporate event with the soul of a circus.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Parent",
    text: "The kids were absolutely mesmerized. The transition from the magic show to the stilts was seamless. Highly recommended!",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">What They Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-6">"{t.text}"</p>
              <div>
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
