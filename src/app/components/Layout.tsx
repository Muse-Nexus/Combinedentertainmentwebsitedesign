import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white font-sans">
      <Navbar />
      <main className="flex-grow pt-48">
        {children}
      </main>
      <Footer />
    </div>
  );
}