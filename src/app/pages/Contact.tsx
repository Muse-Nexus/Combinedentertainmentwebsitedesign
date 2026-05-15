import { Layout } from '../components/Layout';
import { useForm } from 'react-hook-form';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Loader2 } from 'lucide-react';

function FadeInSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
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

  const contactInfo = [
    { icon: Phone, label: 'Call or Text', value: '(808) 283-7469', href: 'tel:+18082837469' },
    { icon: Mail, label: 'Email', value: 'info@rainingentertainment.com', href: 'mailto:info@rainingentertainment.com' },
    { icon: MapPin, label: 'Based In', value: 'Maui, Hawai\u02BBi', href: null },
  ];

  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/magicbrent/', label: 'Magic Brent' },
    { icon: Instagram, href: 'https://www.instagram.com/cirquejolie/', label: 'Cirque Jolie' },
    { icon: Facebook, href: 'https://www.facebook.com/MagicBrent/', label: 'Facebook' },
    { icon: Youtube, href: 'https://www.youtube.com/@magicbrent', label: 'YouTube' },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/20 via-slate-950 to-slate-950" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <FadeInSection>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Let's Plan Your Event
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                From intimate birthday parties to large corporate galas, we'll create
                the perfect entertainment experience for your Maui event.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-5 gap-12">

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-8">
                <FadeInSection>
                  <div className="space-y-6">
                    {contactInfo.map((item) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-coral" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-white font-semibold hover:text-coral transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-white font-semibold">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeInSection>

                <FadeInSection>
                  <div className="border-t border-slate-800 pt-8">
                    <h3 className="text-white font-bold mb-4">Follow Us</h3>
                    <div className="flex flex-wrap gap-3">
                      {socials.map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-sm">
                          <s.icon className="w-4 h-4" />
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </FadeInSection>

                <FadeInSection>
                  <div className="border-t border-slate-800 pt-8">
                    <h3 className="text-white font-bold mb-3">Service Areas</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Based on Maui, we serve all Hawaiian Islands and are available
                      for mainland travel. Corporate & destination event packages include
                      travel coordination.
                    </p>
                  </div>
                </FadeInSection>

                <FadeInSection>
                  <div className="border-t border-slate-800 pt-8">
                    <h3 className="text-white font-bold mb-3">Response Time</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      We typically respond within 24 hours. For events within 48 hours,
                      please call or text directly.
                    </p>
                  </div>
                </FadeInSection>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <FadeInSection>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10">
                    <h2 className="text-2xl font-display font-bold text-white mb-2">Request a Quote</h2>
                    <p className="text-slate-400 mb-8">
                      Tell us about your event and we'll put together a custom entertainment package.
                    </p>

                    {status === 'success' && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/40 text-green-400">
                        ✅ Thanks! We'll get back to you within 24 hours.
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400">
                        ❌ Something went wrong. Please call or text us directly.
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Name *</label>
                          <input {...register('name', { required: true })}
                            className={`w-full px-4 py-3 rounded-xl bg-slate-800 border ${
                              errors.name ? 'border-red-500' : 'border-slate-700'
                            } text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all`}
                            placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Email *</label>
                          <input type="email" {...register('email', { required: true })}
                            className={`w-full px-4 py-3 rounded-xl bg-slate-800 border ${
                              errors.email ? 'border-red-500' : 'border-slate-700'
                            } text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all`}
                            placeholder="you@example.com" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Phone</label>
                          <input type="tel" {...register('phone')}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all"
                            placeholder="(808) 555-1234" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Event Date</label>
                          <input type="date" {...register('date')}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Event Type</label>
                          <select {...register('type')}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all">
                            <option value="">Select type...</option>
                            <option value="kids-party">Kids Birthday Party</option>
                            <option value="magic">Magic Show</option>
                            <option value="gameshow">Game Show</option>
                            <option value="casino">Casino Night</option>
                            <option value="strolling">Strolling Entertainment</option>
                            <option value="balloon-decor">Balloon Decor</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="wedding">Wedding</option>
                            <option value="combo">Custom Package</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Expected Guests</label>
                          <input {...register('guests')}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all"
                            placeholder="Approx. number" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Venue / Location</label>
                        <input {...register('venue')}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all"
                          placeholder="e.g. Andaz Maui, private residence, outdoor park" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Tell Us About Your Event</label>
                        <textarea {...register('message')} rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all resize-none"
                          placeholder="Theme, vibe, special requests, anything else we should know..." />
                      </div>

                      <button type="submit" disabled={status === 'sending'}
                        className="w-full py-4 px-8 rounded-xl bg-coral hover:bg-coral/90 disabled:opacity-60 text-white font-bold text-lg transition-all flex items-center justify-center gap-2">
                        {status === 'sending' ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                        ) : (
                          'Send My Request'
                        )}
                      </button>
                    </form>
                  </div>
                </FadeInSection>
              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
