'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Box, DollarSign, BarChart3, Users, Settings, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin', id: 'dashboard' },
    { icon: Box, label: 'Suites', href: '/admin/suites', id: 'suites' },
    { icon: Calendar, label: 'Schedules', href: '/admin/schedules', id: 'schedules' },
    { icon: Users, label: 'Bookings', href: '/admin/bookings', id: 'bookings' },
    { icon: DollarSign, label: 'Pricing', href: '/admin/pricing', id: 'pricing' },
    { icon: Settings, label: 'Settings', href: '/admin/settings', id: 'settings' },
  ];

  return (
    <div className="flex h-[100vh] w-full bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-slate-900/80 border-r border-white/5 backdrop-blur-md flex flex-col fixed md:relative h-[100vh] z-40 flex-shrink-0"
          >
            {/* Logo */}
            <div className="p-6 border-b border-white/5 flex-shrink-0">
              <Link href="/admin" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gold flex items-center justify-center font-bold text-slate-950 rounded-sm italic text-lg">
                  L
                </div>
                <span className="text-lg font-heading text-white tracking-[0.1em] font-bold uppercase">
                  Admin<span className="text-gold">Panel</span>
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-gold transition-all"
                >
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 text-xs text-slate-500 flex-shrink-0">
              <p>LuxeTide Admin v1.0</p>
              <p className="mt-2">© 2026. All rights reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900/50 border-b border-white/5 backdrop-blur-md px-6 py-4 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-gold transition-colors md:hidden"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="text-slate-400 text-sm">
            Welcome back, Admin
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
