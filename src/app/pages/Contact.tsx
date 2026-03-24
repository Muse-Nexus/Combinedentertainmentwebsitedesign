import { Layout } from '../components/Layout';
import { useForm } from 'react-hook-form';

export function Contact() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    alert("Thanks for your inquiry! (Demo only)");
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">Plan Your Covered Event</h1>
            <p className="text-xl text-slate-600">
              Tell us about your event, and we'll create the perfect entertainment package.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="font-bold text-slate-700">Name</label>
                        <input {...register("name")} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="font-bold text-slate-700">Email</label>
                        <input {...register("email")} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="jane@example.com" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="font-bold text-slate-700">Event Date</label>
                        <input type="date" {...register("date")} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="font-bold text-slate-700">Event Type</label>
                        <select {...register("type")} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all">
                            <option value="">Select a vibe...</option>
                            <option value="magic">Magic Show</option>
                            <option value="gameshow">Game Show</option>
                            <option value="circus">Kids & Circus</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="combo">Combo Package</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="font-bold text-slate-700">Message</label>
                    <textarea {...register("message")} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="Tell us more about your event..." />
                </div>

                <button type="submit" className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xl transition-colors shadow-lg">
                    Send Inquiry
                </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
