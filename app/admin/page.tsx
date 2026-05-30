'use client';

import { motion } from 'motion/react';
import {
  Calendar,
  Users,
  Ship,
  MapPin,
  Briefcase,
  Image as ImageIcon,
  Tag,
  DollarSign,
} from 'lucide-react';
import { PremiumButton, PremiumInput, PremiumSelect } from '@/src/components/PremiumUI';
import { SHIPS, DESTINATIONS, PACKAGES } from '@/src/constants';

const bookingRows = [
  {
    id: 'BK-2041',
    customer: 'Aisha Khan',
    email: 'aisha.khan@luxetide.com',
    packageName: 'Emerald Expedition',
    shipName: 'M.V. Bay Crown',
    dates: 'Jun 12 - Jun 16, 2026',
    passengers: 2,
    status: 'confirmed',
    payment: 'paid',
    total: 'BDT 170,000',
  },
  {
    id: 'BK-2077',
    customer: 'Rafi Islam',
    email: 'rafi.islam@luxetide.com',
    packageName: 'Sundarbans Delta Luxury',
    shipName: 'Pearl of Bengal',
    dates: 'Jul 02 - Jul 08, 2026',
    passengers: 4,
    status: 'pending',
    payment: 'partial',
    total: 'BDT 320,000',
  },
  {
    id: 'BK-2099',
    customer: 'Nusrat Farah',
    email: 'nusrat.farah@luxetide.com',
    packageName: 'Custom Journey',
    shipName: 'Sundarban Majestic',
    dates: 'Aug 18 - Aug 22, 2026',
    passengers: 3,
    status: 'completed',
    payment: 'paid',
    total: 'BDT 210,000',
  },
];

const userRows = [
  {
    id: 'USR-1104',
    name: 'Aisha Khan',
    email: 'aisha.khan@luxetide.com',
    role: 'customer',
    status: 'active',
    lastLogin: 'May 10, 2026',
  },
  {
    id: 'USR-1108',
    name: 'Imran Rahman',
    email: 'imran@luxetide.com',
    role: 'staff',
    status: 'active',
    lastLogin: 'May 11, 2026',
  },
  {
    id: 'USR-1116',
    name: 'Sadia Noor',
    email: 'sadia.noor@luxetide.com',
    role: 'admin',
    status: 'active',
    lastLogin: 'May 12, 2026',
  },
];

const promotions = [
  {
    code: 'GOLD15',
    title: 'Golden Season Offer',
    status: 'active',
    valid: 'May 20 - Jun 30, 2026',
    discount: '15% off',
  },
  {
    code: 'FAMILY10',
    title: 'Family Voyage Savings',
    status: 'draft',
    valid: 'Jul 01 - Aug 15, 2026',
    discount: 'BDT 10,000 off',
  },
];

const galleryItems = [
  { title: 'Sunrise Deck', status: 'public', updated: 'May 02, 2026' },
  { title: 'Emerald Dining Room', status: 'public', updated: 'Apr 26, 2026' },
  { title: 'Private Balcony Suite', status: 'private', updated: 'Apr 20, 2026' },
];

const statusStyles: Record<string, string> = {
  confirmed: 'border-emerald-400/40 text-emerald-200 bg-emerald-500/10',
  completed: 'border-sky-400/40 text-sky-200 bg-sky-500/10',
  pending: 'border-amber-400/40 text-amber-200 bg-amber-500/10',
  cancelled: 'border-rose-400/40 text-rose-200 bg-rose-500/10',
  active: 'border-emerald-400/40 text-emerald-200 bg-emerald-500/10',
  disabled: 'border-rose-400/40 text-rose-200 bg-rose-500/10',
  draft: 'border-slate-400/40 text-slate-200 bg-slate-500/10',
  public: 'border-sky-400/40 text-sky-200 bg-sky-500/10',
  private: 'border-amber-400/40 text-amber-200 bg-amber-500/10',
};

const paymentStyles: Record<string, string> = {
  paid: 'border-emerald-400/40 text-emerald-200 bg-emerald-500/10',
  partial: 'border-amber-400/40 text-amber-200 bg-amber-500/10',
  unpaid: 'border-rose-400/40 text-rose-200 bg-rose-500/10',
  refunded: 'border-slate-400/40 text-slate-200 bg-slate-500/10',
};

const formatLabel = (value: string) => value.replace(/-/g, ' ');

const StatusBadge = ({ label }: { label: string }) => (
  <span
    className={`px-3 py-1 text-[10px] uppercase tracking-[0.25em] border ${
      statusStyles[label] || 'border-white/20 text-white/70 bg-white/5'
    }`}
  >
    {formatLabel(label)}
  </span>
);

const PaymentBadge = ({ label }: { label: string }) => (
  <span
    className={`px-3 py-1 text-[10px] uppercase tracking-[0.25em] border ${
      paymentStyles[label] || 'border-white/20 text-white/70 bg-white/5'
    }`}
  >
    {formatLabel(label)}
  </span>
);

export default function AdminPage() {
  return (
    <div className="bg-slate-950 py-24">
      <div className="luxury-container space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
        >
          <div className="space-y-4">
            <p className="editorial-label">Admin Console</p>
            <h1 className="text-4xl md:text-6xl font-heading text-white">
              Control center for LuxeTide
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Oversee reservations, customer access, and curated content from a single control panel.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/admin/bookings" className="gold-button inline-flex items-center justify-center gap-2 h-14 px-8">
              Manage Bookings
            </a>
            <PremiumButton className="h-14" variant="outline">
              Invite Admin
            </PremiumButton>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { label: 'Active Bookings', value: '128', icon: Calendar },
            { label: 'Monthly Revenue', value: 'BDT 8.4M', icon: DollarSign },
            { label: 'Active Users', value: '1,482', icon: Users },
            { label: 'Ships in Fleet', value: `${SHIPS.length}`, icon: Ship },
          ].map((stat) => (
            <div
              key={stat.label}
              className="luxury-card p-6 flex items-center justify-between"
            >
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="text-3xl text-white font-heading">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-gold/70" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 luxury-card p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="editorial-label">Bookings</p>
                <h2 className="text-2xl text-white font-heading">Latest reservations</h2>
              </div>
              <a href="/admin/bookings" className="gold-button inline-flex items-center justify-center gap-2 h-12 px-6">
                View All Bookings
              </a>
            </div>

            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
                <Calendar className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-heading text-white mb-2">Advanced Booking Management</h3>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                For full booking management capabilities including create, edit, delete, and advanced filtering,
                please visit the dedicated bookings page.
              </p>
              <a href="/admin/bookings" className="gold-button inline-flex items-center justify-center gap-2 h-12 px-6">
                Manage Bookings
              </a>
            </div>
          </div>

          <div className="luxury-card p-8 space-y-6">
            <div>
              <p className="editorial-label">Users</p>
              <h2 className="text-2xl text-white font-heading">Access control</h2>
            </div>
            <div className="space-y-4">
              {userRows.map((user) => (
                <div key={user.id} className="border border-white/5 p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <StatusBadge label={user.status} />
                  </div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                    <span>{user.role}</span>
                    <span>Last login: {user.lastLogin}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="text-xs uppercase tracking-[0.3em] text-gold hover:text-white">Manage</button>
                    <button className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-white">Disable</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="luxury-card p-8 space-y-8">
          <div>
            <p className="editorial-label">Content</p>
            <h2 className="text-2xl text-white font-heading">Manage core offerings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="border border-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Ship className="w-6 h-6 text-gold" />
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{SHIPS.length} ships</span>
              </div>
              <p className="text-white font-heading text-xl">Fleet</p>
              <p className="text-sm text-slate-500">Update vessel details, capacity, and amenities.</p>
              <button className="text-xs uppercase tracking-[0.3em] text-gold hover:text-white">Manage ships</button>
            </div>

            <div className="border border-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <MapPin className="w-6 h-6 text-gold" />
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{DESTINATIONS.length === 1 ? '1 destination' : `${DESTINATIONS.length} destinations`}</span>
              </div>
              <p className="text-white font-heading text-xl">Destinations</p>
              <p className="text-sm text-slate-500">Curate stops, highlights, and image galleries.</p>
              <button className="text-xs uppercase tracking-[0.3em] text-gold hover:text-white">Manage destinations</button>
            </div>

            <div className="border border-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Briefcase className="w-6 h-6 text-gold" />
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{PACKAGES.length} packages</span>
              </div>
              <p className="text-white font-heading text-xl">Packages</p>
              <p className="text-sm text-slate-500">Adjust pricing, duration, and inclusions.</p>
              <button className="text-xs uppercase tracking-[0.3em] text-gold hover:text-white">Manage packages</button>
            </div>

            <div className="border border-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <ImageIcon className="w-6 h-6 text-gold" />
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{galleryItems.length} items</span>
              </div>
              <p className="text-white font-heading text-xl">Gallery</p>
              <p className="text-sm text-slate-500">Control hero visuals and featured shots.</p>
              <button className="text-xs uppercase tracking-[0.3em] text-gold hover:text-white">Manage gallery</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="luxury-card p-8 space-y-6">
            <div>
              <p className="editorial-label">Promotions</p>
              <h2 className="text-2xl text-white font-heading">Campaign control</h2>
            </div>
            <div className="space-y-4">
              {promotions.map((promo) => (
                <div key={promo.code} className="border border-white/5 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{promo.title}</p>
                      <p className="text-xs text-slate-500">Code: {promo.code}</p>
                    </div>
                    <StatusBadge label={promo.status} />
                  </div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                    <span>{promo.discount}</span>
                    <span>{promo.valid}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="text-xs uppercase tracking-[0.3em] text-gold hover:text-white">Edit</button>
                    <button className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-white">Archive</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="luxury-card p-8 space-y-6">
            <div>
              <p className="editorial-label">Gallery Queue</p>
              <h2 className="text-2xl text-white font-heading">Publishing status</h2>
            </div>
            <div className="space-y-4">
              {galleryItems.map((item) => (
                <div key={item.title} className="border border-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-xs text-slate-500">Updated {item.updated}</p>
                    </div>
                    <StatusBadge label={item.status} />
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button className="text-xs uppercase tracking-[0.3em] text-gold hover:text-white">Review</button>
                    <button className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-white">Archive</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="luxury-card p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <p className="editorial-label">Operations</p>
            <h2 className="text-2xl text-white font-heading">Ready for deeper analytics?</h2>
            <p className="text-slate-400">Connect Supabase data sources to unlock live KPIs, forecasting, and alerts.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <PremiumButton className="h-14">Connect Supabase</PremiumButton>
            <PremiumButton className="h-14" variant="outline">
              View audit log
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>
  );
}
