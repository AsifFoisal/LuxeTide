'use client';

import Link from 'next/link';
import { Ship, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-tertiary border-t border-white/10 pt-24 pb-12 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa" 
          alt="Waves" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="luxury-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gold flex items-center justify-center font-bold text-slate-950 rounded-sm">L</div>
              <span className="text-xl font-heading text-white tracking-[0.3em] font-light uppercase">LuxeTide</span>
            </Link>
            <p className="text-slate-400 text-xs tracking-wider leading-relaxed">
              We are a premium travel agency specializing in luxury cruises and unforgettable expeditions across Bangladesh and beyond.
            </p>
            <div className="flex space-x-6 opacity-50">
              <Facebook className="w-4 h-4 text-slate-500 hover:text-gold cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 text-slate-500 hover:text-gold cursor-pointer transition-colors" />
              <Instagram className="w-4 h-4 text-slate-500 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="editorial-label mb-8">Navigation</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest text-slate-400">
              <li><Link href="/ships" className="hover:text-gold transition-colors">Our Fleet</Link></li>
              <li><Link href="/destinations" className="hover:text-gold transition-colors">Sundarbans Route</Link></li>
              <li><Link href="/packages" className="hover:text-gold transition-colors">Expeditions</Link></li>
              <li><Link href="/gallery" className="hover:text-gold transition-colors">Visual Archive</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="editorial-label mb-8">The Hub</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest text-slate-400">
              <li><Link href="/about" className="hover:text-gold transition-colors">Our Roots</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Concierge</Link></li>
              <li><Link href="/faq" className="hover:text-gold transition-colors">Passage FAQ</Link></li>
              <li><Link href="/careers" className="hover:text-gold transition-colors">Join Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="editorial-label mb-8">Headquarters</h4>
            <div className="space-y-4 text-[10px] uppercase tracking-widest text-slate-400 group">
              <div className="flex items-start space-x-3">
                <MapPin className="w-3 h-3 text-gold shrink-0" />
                <span>123 Elite District, Gulshan<br />Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-3 h-3 text-gold shrink-0" />
                <span>+880 1234 567 890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-3 h-3 text-gold shrink-0" />
                <span>info@luxetide.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 tracking-widest uppercase">
          <p>© 2026 LuxeTide. All Rights Reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
