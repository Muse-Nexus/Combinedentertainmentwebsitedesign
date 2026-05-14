import { Layout } from '../components/Layout';
import { useForm } from 'react-hook-form';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const AIRTABLE_PAT = import.meta.env.VITE_AIRTABLE_PAT as string;
const AIRTABLE_BASE_ID = 'appNVP7Dg4vkNxKql';
const AIRTABLE_TABLE_ID = 'tbl3pJLojwWLX9bRF'; // Leads / Inquiries

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
  message: string;
  location: string;
}

const EVENT_TYPES = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Private Party',
  'Luau / Resort Event',
  'School / Nonprofit',
  'Festival / Public Event',
  'Other',
];

async function submitToAirtable(data: FormData): Promise<void> {
  const fields: Record<string, unknown> = {
    'Client / Contact Name': data.name,
    'Email': data.email,
    'Source / Found Us Through': 'Website',
    'Lead Status': 'New',
  };

  if (data.phone) fields['Phone'] = data.phone;
  if (data.message) fields['Message / Inquiry Notes'] = data.message;
  if (data.location) fields['Event Location'] = data.location;
  if (data.type) fields['Type of Event'] = data.type;
  if (data.date) fields['Event Date'] = new Date(data.date).toISOString();
  if (data.guests && !isNaN(Number(data.guests))) {
    fields['Estimated Guest Count / PAX'] = Number(data.guests);
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message || 'Submission failed');
  }
}

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      await submitToAirtable(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or call us directly.'
      );
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

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-coral focus:ring-1 focus:ring-coral outline-none transition-all';
  const errorInputClass =
    'w-full px-4 py-3 rounded-xl bg-slate-800 border border-red-500 text-white placeholder-slate-500 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-all';

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
                    <h2 className="text-2xl font-display font-bold text-white mb-2">
                      Request a Quote
                    </h2>
                    <p className="text-slate-400 mb-8">
                      Tell us about your event and we'll put together a custom entertainment package.
                    </p>

                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl bg-green-900/30 border border-green-500/40 text-green-300"
                      >
                        🎉 Thanks for reaching out! We'll be in touch within 24 hours.
                      </motion.div>
                    )}

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-500/40 text-red-300"
                      >
                        ⚠️ {submitError}
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* Name + Email */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Name *</label>
                          <input
                            {...register('name', { required: 'Name is required' })}
                            className={errors.name ? errorInputClass : inputClass}
                            placeholder="Your name"
                          />
                          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Email *</label>
                          <input
                            type="email"
                            {...register('email', {
                              required: 'Email is required',
                              pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
                            })}
                            className={errors.email ? errorInputClass : inputClass}
                            placeholder="you@example.com"
                          />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                      </div>

                      {/* Phone + Date */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Phone</label>
                          <input
                            type="tel"
                            {...register('phone')}
                            className={inputClass}
                            placeholder="(808) 555-1234"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Event Date</label>
                          <input
                            type="date"
                            {...register('date')}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      {/* Event Type + Guests */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Type of Event</label>
                          <select {...register('type')} className={inputClass}>
                            <option value="">Select event type…</option>
                            {EVENT_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-300">Guest Count</label>
                          <input
                            type="number"
                            min="1"
                            {...register('guests')}
                            className={inputClass}
                            placeholder="Approx. number of guests"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Event Location / Venue</label>
                        <input
                          {...register('location')}
                          className={inputClass}
                          placeholder="Venue name or area (e.g. Wailea, Maui)"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Tell Us About Your Event</label>
                        <textarea
                          {...register('message')}
                          rows={5}
                          className={inputClass}
                          placeholder="What kind of entertainment are you looking for? Any special requests?"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-8 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-lg shadow-lg"
                      >
                        {isSubmitting ? 'Sending…' : 'Send My Request'}
                      </button>

                      <p className="text-xs text-slate-500 text-center">
                        We'll never share your info. Expect a reply within 24 hours.
                      </p>
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
