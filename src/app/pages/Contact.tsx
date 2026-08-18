import { Layout } from '../components/Layout';
import { useForm } from 'react-hook-form';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { trackAnalyticsEvent } from '../analytics/googleAnalytics';

const SERVICE_OPTIONS = [
  ['kids-party', 'Kids Birthday Party'],
  ['magic', 'Magic Show'],
  ['gameshow', 'Game Show NITE'],
  ['casino', 'Casino NITE'],
  ['casino-gameshow', 'Help Me Choose: Casino or Game Show'],
  ['strolling', 'Stilt Walkers'],
  ['led-performers', 'LED Performers'],
  ['balloon-decor', 'Balloon Decor'],
  ['balloon-animals', 'Balloon Twisting & Face Painting'],
  ['face-painting', 'Face Painting'],
  ['corporate', 'Corporate Event'],
  ['wedding', 'Wedding'],
  ['combo', 'Custom Package'],
] as const;

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
  kids: string;
  message: string;
  website: string;
}

export function Contact() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get('service') ?? '';
  const initialService = SERVICE_OPTIONS.some(([value]) => value === requestedService)
    ? requestedService
    : '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ defaultValues: { website: '', type: initialService } });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (data: FormData) => {
    setSubmitted(false);
    setSubmitError('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Please wait a few minutes before sending another inquiry.');
        }
        throw new Error('We could not deliver the form right now. Your details are still here below.');
      }

      setSubmitted(true);
      // The API intentionally returns 202 to acknowledge honeypot submissions
      // without writing them. Only a 201 proves a real Airtable lead was saved.
      if (response.status === 201) {
        trackAnalyticsEvent('generate_lead', {
          lead_source: 'inquiry_form',
          service: data.type || 'unspecified',
        });
      }
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'We could not deliver the form right now. Your details are still here below.',
      );
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'All Bookings',
      value: 'Brenton Keith · (808) 870-2102',
      href: 'tel:+18088702102',
      description: 'Call or text Brenton for every Raining Entertainment service',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'brentonkeith@magicbrent.com',
      href: 'mailto:brentonkeith@magicbrent.com',
      description: 'General questions and event details',
    },
    {
      icon: MapPin,
      label: 'Based In',
      value: 'Maui, Hawai\u02BBi',
      href: null,
      description: 'Available across the Hawaiian Islands and beyond',
    },
  ];

  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/magicbrent/', label: "Brenton Keith & His Bag O' Tricks" },
    { icon: Instagram, href: 'https://www.instagram.com/gameshowfanatics/', label: 'Game Show Fanatics' },
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

              {/* Contact Info Sidebar */}
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
                            <a
                              href={item.href}
                              className="text-white font-semibold hover:text-coral transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-white font-semibold">{item.value}</p>
                          )}
                          <p className="mt-1 text-xs text-slate-500">{item.description}</p>
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
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-sm"
                        >
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
                      Brenton typically responds within 24 hours. For events within 48 hours,
                      please call or text him directly.
                    </p>
                  </div>
                </FadeInSection>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <FadeInSection>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10">
                    <h2 className="text-2xl font-display font-bold text-white mb-2">
                      Request a Quote
                    </h2>
                    <p className="text-slate-400 mb-8">
                      Tell us about your event and Brenton will put together a custom entertainment package.
                    </p>

                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl bg-sage/20 border border-sage/40 text-sage"
                        role="status"
                        aria-live="polite"
                      >
                        Your inquiry was delivered to Brenton. He&rsquo;ll get back to you as soon as he can.
                      </motion.div>
                    )}

                    {submitError && (
                      <div className="mb-6 rounded-xl border border-coral/40 bg-coral/10 p-4 text-slate-100" role="alert">
                        <p className="font-semibold">{submitError}</p>
                        <p className="mt-2 text-sm text-slate-300">
                          For every Raining Entertainment booking, call or text Brenton at{' '}
                          <a className="font-bold text-white underline" href="tel:+18088702102">(808) 870-2102</a>.
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-6" noValidate>
                      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-semibold text-slate-300">Name *</label>
                          <input
                            id="name"
                            required
                            autoComplete="name"
                            aria-required="true"
                            aria-invalid={errors.name ? 'true' : 'false'}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            {...register('name', { required: 'Please enter your name.' })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all"
                            placeholder="Your name"
                          />
                          {errors.name && <p id="name-error" className="text-sm text-coral" role="alert">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-semibold text-slate-300">Email *</label>
                          <input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            aria-required="true"
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            {...register('email', {
                              required: 'Please enter your email.',
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter a valid email address.',
                              },
                            })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all"
                            placeholder="you@example.com"
                          />
                          {errors.email && <p id="email-error" className="text-sm text-coral" role="alert">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-semibold text-slate-300">Phone</label>
                          <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            {...register('phone')}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all"
                            placeholder="(808) 555-1234"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="date" className="text-sm font-semibold text-slate-300">Event Date</label>
                          <input
                            id="date"
                            type="date"
                            {...register('date')}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="type" className="text-sm font-semibold text-slate-300">Event Type</label>
                          <select
                            id="type"
                            {...register('type')}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all"
                          >
                            <option value="">Select type...</option>
                            {SERVICE_OPTIONS.map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="guests" className="text-sm font-semibold text-slate-300">Expected Guests</label>
                          <input
                            id="guests"
                            inputMode="numeric"
                            {...register('guests')}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all"
                            placeholder="Approx. number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="kids" className="text-sm font-semibold text-slate-300">Of Those, How Many Kids?</label>
                        <input
                          id="kids"
                          inputMode="numeric"
                          {...register('kids')}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all"
                          placeholder="Approx. number of children"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-semibold text-slate-300">Tell Us About Your Event</label>
                        <textarea
                          id="message"
                          {...register('message')}
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all resize-none"
                          placeholder="Date, venue, theme, entertainment ideas — the more detail, the better!"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="w-full py-4 bg-coral hover:bg-coral/85 disabled:cursor-wait disabled:opacity-60 text-slate-950 font-bold rounded-xl text-lg transition-colors shadow-lg shadow-coral/20"
                      >
                        {isSubmitting ? 'Sending…' : 'Send Inquiry'}
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
