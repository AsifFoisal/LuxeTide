'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Anchor,
  ArrowRight,
  Binoculars,
  Compass,
  MapPinned,
  Ship,
  Sunrise,
  Trees,
} from 'lucide-react';

type TimelineItem = {
  title: string;
  description: string;
  detail: string;
  tag: string;
  icon: typeof Ship;
  align: 'left' | 'right';
};

const sharedHighlights = [
  {
    icon: Ship,
    title: 'Khulna departure',
    detail: 'The journey starts at dawn from Khulna Jalkhanaghat and heads into the Sundarbans early in the morning.',
  },
  {
    icon: Trees,
    title: 'Mangrove corridors',
    detail: 'Andharmanik eco-tourism point and Harbaria introduce the forest canopy, saltwater channels, and wildlife habitat.',
  },
  {
    icon: Binoculars,
    title: 'Wildlife focus',
    detail: 'The route is built for tiger tracking, birdwatching, crocodile sightings, and quiet forest viewing.',
  },
  {
    icon: Anchor,
    title: 'Return to Karamjal',
    detail: 'Both itineraries close with Karamjal wildlife center before the night return toward Khulna.',
  },
];

const timelineItems: TimelineItem[] = [
  {
    title: 'Khulna',
    description: 'Start of the journey',
    detail: 'Early departure from Khulna Jalkhanaghat toward the Sundarbans mangrove channel.',
    tag: 'Day 1 - Start',
    icon: Ship,
    align: 'left',
  },
  {
    title: 'Andharmanik / Harbaria',
    description: 'Mangrove entry and wildlife corridor',
    detail: 'Forest approach, crocodile sanctuary, deer sightings, and bird watching along the mangrove route.',
    tag: 'Day 1 - Midday',
    icon: Trees,
    align: 'right',
  },
  {
    title: 'Katka',
    description: 'Boat-night stay and forest evening',
    detail: 'Arrive at Katka by night, stay on the boat, and settle into the mangrove atmosphere with dinner and entertainment.',
    tag: 'Day 1 - Overnight',
    icon: Sunrise,
    align: 'left',
  },
  {
    title: 'Jamtola / Kochikhali',
    description: 'Route 1: tiger point and sea beach',
    detail: 'A morning cruise leads to Katka sea beach and then Kochikhali, with dense forest, crocodile spots, and tiger territory.',
    tag: 'Day 2 - Route 1',
    icon: Binoculars,
    align: 'right',
  },
  {
    title: 'Hiron Point / Dublar Char',
    description: 'Route 2: sanctuary tower and island shore',
    detail: 'The alternate Day 2 branch moves to Hiron Point, Nilkamal, and finishes with the open landscape of Dublar Char.',
    tag: 'Day 2 - Route 2',
    icon: Compass,
    align: 'left',
  },
  {
    title: 'Karamjal',
    description: 'Wildlife center and breeding station',
    detail: 'The closing stop is the crocodile and deer breeding center before the return to Khulna.',
    tag: 'Day 3 - Finale',
    icon: Anchor,
    align: 'right',
  },
  {
    title: 'Khulna',
    description: 'Return to port',
    detail: 'Evening return completes the three-day Sundarbans circuit.',
    tag: 'Trip end',
    icon: Ship,
    align: 'left',
  },
];

export default function Destinations() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.14),transparent_36%),linear-gradient(180deg,#020408_0%,#05080F_52%,#0B1221_100%)] pt-28 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-10%] top-64 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[80rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/10 to-transparent blur-3xl" />
      </div>

      <div className="luxury-container relative z-10 space-y-16">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 xl:grid-cols-[1.3fr_0.9fr] xl:items-end"
        >
          <div className="max-w-4xl space-y-6">
            <span className="editorial-label text-gold">Sundarbans destination timeline</span>
            <h1 className="text-5xl md:text-7xl xl:text-8xl leading-[0.95] text-white">
              Journey through the
              <span className="block italic-accent text-gold">mangrove circuit</span>
            </h1>
            <p className="max-w-3xl text-base md:text-lg leading-8 text-slate-300">
              This destination page turns the tour itinerary into a visual timeline, showing the shared Khulna entry, the Harbaria and Katka wildlife corridor, and the two day-two branches that split between Kochikhali and Hiron Point.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/booking" className="gold-button inline-flex items-center gap-3">
                Plan this route
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/ships" className="outline-button inline-flex items-center gap-3">
                View ships
                <Compass className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="luxury-card relative overflow-hidden border-white/10 bg-slate-950/75 p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-cyan-500/10" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-3 text-gold">
                <MapPinned className="h-5 w-5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em]">Journey snapshot</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-sm border border-white/5 bg-white/[0.03] p-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Duration</span>
                  <p className="mt-3 text-3xl font-heading text-white">3 Days</p>
                </div>
                <div className="rounded-sm border border-white/5 bg-white/[0.03] p-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Mode</span>
                  <p className="mt-3 text-3xl font-heading text-white">Boat + Forest</p>
                </div>
                <div className="rounded-sm border border-white/5 bg-white/[0.03] p-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Focus</span>
                  <p className="mt-3 text-3xl font-heading text-white">Wildlife</p>
                </div>
                <div className="rounded-sm border border-white/5 bg-white/[0.03] p-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Start</span>
                  <p className="mt-3 text-3xl font-heading text-white">Khulna</p>
                </div>
              </div>
              <div className="rounded-sm border border-gold/20 bg-gold/10 p-4 text-sm leading-7 text-slate-200">
                Night stay happens on the boat at Katka in both itineraries. Day 2 is the decision point: Kochikhali in itinerary 1, or Hiron Point and Dublar Char in itinerary 2.
              </div>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {sharedHighlights.map((highlight, index) => {
            const Icon = highlight.icon;

            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.8 }}
                viewport={{ once: true, amount: 0.4 }}
                className="luxury-card h-full p-5 md:p-6"
              >
                <div className="flex items-center gap-3 text-gold">
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.35em]">Highlight</span>
                </div>
                <h2 className="mt-5 text-2xl font-heading text-white">{highlight.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">{highlight.detail}</p>
              </motion.div>
            );
          })}
        </section>

        <section className="space-y-10">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <span className="editorial-label text-gold">Destination timeline</span>
            <h2 className="text-4xl md:text-6xl text-white leading-tight">A vertical route map through the Sundarbans</h2>
            <p className="text-sm md:text-base leading-7 text-slate-400">
              The itinerary is now laid out as a centered spine with alternating cards, matching the structure of the reference design while keeping the same trip content.
            </p>
          </div>

          <div className="relative mx-auto max-w-7xl py-4 md:py-10">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-90" />

            <div className="space-y-8 md:space-y-12">
              {timelineItems.map((item, index) => {
                const Icon = item.icon;
                const isLeft = item.align === 'left';
                const slideX = isLeft ? -72 : 72;

                return (
                  <motion.div
                    key={`${item.title}-${item.tag}`}
                    initial={{ opacity: 0, x: slideX, y: 18 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.25 }}
                    className="relative grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:gap-0"
                  >
                    <div className={`${isLeft ? 'md:col-start-1 md:justify-self-end md:pr-8 md:text-right' : 'md:col-start-3 md:justify-self-start md:pl-8 md:text-left'} order-1 w-full md:max-w-[28rem]`}>
                      <div className={`${isLeft ? 'md:mr-6' : 'md:ml-6'} luxury-card bg-white text-slate-700 shadow-[0_12px_35px_rgba(15,23,42,0.12)] border border-slate-200/70 overflow-hidden transition-transform duration-500 will-change-transform hover:scale-[1.01]`}>
                        <div className={`flex items-start gap-4 p-5 md:p-6 ${isLeft ? 'md:flex-row-reverse' : 'flex-row'}`}>
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white shadow-md">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className={`min-w-0 flex-1 ${isLeft ? 'md:text-right' : 'text-left'}`}>
                            <h3 className="text-xl md:text-2xl font-semibold text-slate-800">{item.title}</h3>
                            <p className="mt-2 text-base text-slate-500">{item.description}</p>
                          </div>
                        </div>
                        <div className="border-t border-slate-100 px-5 py-4 md:px-6 md:py-5">
                          <p className="text-sm leading-7 text-slate-500">{item.detail}</p>
                          <div className={`mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                            <span className="rounded bg-blue-50 px-3 py-1 text-blue-600">{item.tag}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="order-2 flex justify-center md:col-start-2 md:row-start-1">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white border-4 border-blue-500 shadow-[0_0_0_8px_rgba(59,130,246,0.08)]">
                        <div className="h-3.5 w-3.5 rounded-full bg-blue-500" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
