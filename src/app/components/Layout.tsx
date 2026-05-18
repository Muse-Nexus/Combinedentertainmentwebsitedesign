import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen text-white font-sans">
      <Navbar />
      {/* Transparent spacer so persistent umbrella has clear air at top */}
      <div className="pt-48" aria-hidden="true" />
      <main className="flex-grow bg-slate-900">
        {children}
      </main>
      <Footer />
    </div>
  );
}