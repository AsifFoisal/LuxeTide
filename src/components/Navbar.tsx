'use client';

import { Menu, X, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', id: 'nav-home-link' },
    { name: 'Ships', path: '/ships', id: 'nav-ships-link' },
    { name: 'Sundarbans', path: '/destinations', id: 'nav-destinations-link' },
    { name: 'Cabins', path: '/cabins', id: 'nav-cabins-link' },
    { name: 'Dining', path: '/dining', id: 'nav-dining-link' },
    { name: 'Services', path: '/services', id: 'nav-services-link' },
    { name: 'Layout', path: '/layouts', id: 'nav-layout-link' },
    { name: 'Our Policy', path: '/policy', id: 'nav-policy-link' },
    { name: 'Contact', path: '/contact', id: 'nav-contact-link' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 py-2 hidden md:block">
        <div className="luxury-container flex justify-between items-center text-[10px] tracking-[0.2em] font-medium text-slate-400">
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><Phone size={12} className="text-gold" /> +880 1234 567 890</span>
            <span className="flex items-center gap-2"><Mail size={12} className="text-gold" /> info@luxetide.com</span>
          </div>
          <div className="flex gap-6 uppercase">
            {/* removed login/register links as requested */}
          </div>
        </div>
      </div>

      <div className="luxury-glass h-20">
        <div className="luxury-container h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
              <div className="w-10 h-10 bg-gold flex items-center justify-center font-bold text-slate-950 rounded-sm italic text-xl">L</div>
              <span className="text-2xl font-heading text-white tracking-[0.2em] font-bold uppercase">Luxe<span className="text-gold">tide</span></span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-300 hover:text-gold transition-all"
                  data-testid={link.id}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-4 w-px bg-white/10 mx-2" />
              <Link href="/booking" className="concierge-button" data-testid="book-now-button">
                Book Now
              </Link>
            </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm uppercase tracking-widest text-slate-300 hover:text-gold"
                  data-testid={`mobile-${link.id}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {/* login/register removed from mobile menu */}
              </div>
              <Link href="/booking" className="gold-button w-full" data-testid="mobile-book-now-button">
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
