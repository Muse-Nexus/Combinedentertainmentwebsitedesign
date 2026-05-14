import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '../components/Layout';
import { motion, useInView } from 'motion/react';
import { Phone, Mail, Instagram, Facebook, Youtube, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const FadeInSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  type: string;
  guests: string;
  venue: string;
  message: string;
}

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    setStatus('idle');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <Layout title="Book an Event">
      {/* HERO */}
      <section className="relative py-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,74,0.12),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Let's Make It Happen</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
              Book Your<br /><span className="text-coral">Covered Event</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              From Maui birthday parties to corporate galas — we bring the magic, the laughs, and the wow factor.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* FORM */}
            <div className="lg:col-span-2">
              <FadeInSection>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-slate-700/50">
                  <h2 className="text-3xl font-bold text-white mb-2">Request a Quote</h2>
                  <p className="text-slate-400 mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

                  {/* Status banners */}
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-green-500/15 border border-green-500/40 text-green-400 rounded-xl px-5 py-4 mb-6"
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">Thanks! We'll be in touch within 24 hours. 🎉</span>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-red-500/15 border border-red-500/40 text-red-400 rounded-xl px-5 py-4 mb-6"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">Something went wrong. Please call us directly or try again.</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coral transition-colors"
                          placeholder="Jane Smith"
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                        <input
                          type="email"
                          {...register('email', { required: 'Email is required' })}
                          className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coral transition-colors"
                          placeholder="jane@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          {...register('phone')}
                          className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coral transition-colors"
                          placeholder="(808) 555-0100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Event Date</label>
                        <input
                          type="date"
                          {...register('date')}
                          className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coral transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Event Type</label>
                        <select
                          {...register('type')}
                          className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-coral transition-colors"
                        >
                          <option value="">Select event type…</option>
                          <option>Kids Birthday Party</option>
                          <option>Wedding</option>
                          <option>Corporate Event</option>
                          <option>Fundraiser</option>
                          <option>Casino Night</option>
                          <option>Game Show</option>
                          <option>Luau / Hawaiian Party</option>
                          <option>School / Community Event</option>
                          <option>Magic Show</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Expected Guests</label>
                        <input
                          type="number"
                          {...register('guests')}
                          className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coral transition-colors"
                          placeholder="50"
                          min="1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Venue / Location</label>
                      <input
                        {...register('venue')}
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coral transition-colors"
                        placeholder="Four Seasons Maui, backyard, TBD…"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Tell Us About Your Event *</label>
                      <textarea
                        {...register('message', { required: 'Please tell us about your event' })}
                        rows={5}
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-coral transition-colors resize-none"
                        placeholder="What are you envisioning? Theme, vibe, special requests..."
                      />
                      {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-coral hover:bg-coral/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-coral/30 hover:shadow-xl active:scale-[0.98]"
                    >
                      {isSubmitting ? 'Sending…' : 'Send My Request 🎉'}
                    </button>
                  </form>
                </div>
              </FadeInSection>
            </div>

            {/* CONTACT INFO SIDEBAR */}
            <div className="space-y-6">
              <FadeInSection delay={0.15}>
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-white font-bold text-lg mb-4">Direct Contact</h3>
                  <div className="space-y-4">
                    <a href="tel:+18086398100" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                      <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center group-hover:bg-coral/20 transition-colors">
                        <Phone className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Call or Text</div>
                        <div className="font-medium">(808) 639-8100</div>
                      </div>
                    </a>
                    <a href="mailto:info@rainingentertainment.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                      <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center group-hover:bg-coral/20 transition-colors">
                        <Mail className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Email</div>
                        <div className="font-medium">info@rainingentertainment.com</div>
                      </div>
                    </a>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Based In</div>
                        <div className="font-medium">Maui, Hawaiʻi</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Response Time</div>
                        <div className="font-medium">Within 24 hours</div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.25}>
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-white font-bold text-lg mb-4">Follow the Magic</h3>
                  <div className="space-y-3">
                    <a href="https://www.instagram.com/magicbrent/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                      <Instagram className="w-5 h-5 text-pink-400" />
                      <span>@magicbrent</span>
                    </a>
                    <a href="https://www.instagram.com/cirquejolie/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                      <Instagram className="w-5 h-5 text-pink-400" />
                      <span>@cirquejolie</span>
                    </a>
                    <a href="https://www.facebook.com/MagicBrent/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                      <Facebook className="w-5 h-5 text-blue-400" />
                      <span>Magic Brent on Facebook</span>
                    </a>
                    <a href="https://www.youtube.com/@magicbrent" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                      <Youtube className="w-5 h-5 text-red-400" />
                      <span>YouTube: @magicbrent</span>
                    </a>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.35}>
                <div className="bg-gradient-to-br from-coral/15 to-lavender/10 rounded-2xl p-6 border border-coral/20">
                  <h3 className="text-white font-bold text-lg mb-2">Need It Fast?</h3>
                  <p className="text-slate-400 text-sm mb-4">For events within 48 hours, call or text directly — we'll do our best to make it happen.</p>
                  <a href="tel:+18086398100" className="block w-full text-center py-3 bg-coral hover:bg-coral/90 text-white font-bold rounded-xl transition-colors">
                    Call (808) 639-8100
                  </a>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
