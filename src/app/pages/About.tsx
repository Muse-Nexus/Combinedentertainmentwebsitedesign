import { Layout } from '../components/Layout';

export function About() {
  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">The Duo Behind the Magic</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Raining Entertainment is the combined force of Magic Brent and Cirque Jolie. 
              Together, we bring decades of performance experience to your event.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Brent */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
               <div className="h-96 bg-slate-200 overflow-hidden">
                  <img 
                    src="figma:asset/3d7aabbf056658c4bde6b74d860cbf784f58a458.png" 
                    alt="Magic Brent" 
                    className="w-full h-full object-cover object-top"
                  />
               </div>
               <div className="p-10">
                  <h2 className="text-3xl font-bold text-teal-600 mb-2">Magic Brent</h2>
                  <h3 className="text-xl font-medium text-slate-500 mb-6">Master Magician & Host</h3>
                  <p className="text-slate-700 leading-relaxed mb-6">
                    With a quick wit and sleight of hand, Brent has been captivating audiences for over 20 years. 
                    His unique blend of comedy and magic makes him the perfect host for game shows and corporate events. 
                    He believes that magic is about connecting people through wonder.
                  </p>
               </div>
            </div>

            {/* Jolie */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
               <div className="h-96 bg-slate-200 overflow-hidden">
                  <img 
                    src="figma:asset/b9f03d71dacd899fee1c867585b86d016190bc98.png" 
                    alt="Cirque Jolie" 
                    className="w-full h-full object-cover object-top"
                  />
               </div>
               <div className="p-10">
                  <h2 className="text-3xl font-bold text-orange-500 mb-2">Cirque Jolie</h2>
                  <h3 className="text-xl font-medium text-slate-500 mb-6">Aerialist & Performer</h3>
                  <p className="text-slate-700 leading-relaxed mb-6">
                    Jolie brings grace, height, and color to every event. From stilt walking to aerial silks, 
                    her performances are visual poetry. She specializes in creating immersive atmospheres 
                    that transport guests to another world.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
