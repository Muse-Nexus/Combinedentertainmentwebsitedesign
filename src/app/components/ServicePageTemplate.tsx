import { ReactNode } from 'react';
import { Layout } from './Layout';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  color: string; // tailwind color class prefix e.g. "teal"
  heroImage: string;
  customHeroAnimation?: ReactNode;
  features: string[];
}

export function ServicePageTemplate({
  title,
  subtitle,
  description,
  color,
  heroImage,
  customHeroAnimation,
  features
}: ServicePageTemplateProps) {
  return (
    <Layout>
      <div className={`min-h-screen bg-slate-50`}>
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden bg-slate-900 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-${color}-900/90 to-transparent`} />
            
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-4"
                >
                    {title}
                </motion.h1>
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto"
                >
                    {subtitle}
                </motion.p>
                
                {customHeroAnimation}
            </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className={`text-3xl font-bold text-${color}-600 mb-6`}>About the Experience</h2>
                    <p className="text-lg text-slate-700 leading-relaxed mb-8">
                        {description}
                    </p>
                    <ul className="space-y-4">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700">
                                <span className={`w-2 h-2 rounded-full bg-${color}-500`} />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    
                    <div className="mt-12">
                         <Link 
                            to="/contact" 
                            className={`px-8 py-3 bg-${color}-600 hover:bg-${color}-700 text-white font-bold rounded-full transition-colors shadow-lg`}
                        >
                            Book {title}
                        </Link>
                    </div>
                </div>
                
                <div className="bg-slate-200 rounded-3xl h-96 w-full flex items-center justify-center overflow-hidden shadow-inner">
                    {/* Placeholder for specific gallery or interaction */}
                    <span className="text-slate-400 font-medium">Interactive Demo / Gallery</span>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}
