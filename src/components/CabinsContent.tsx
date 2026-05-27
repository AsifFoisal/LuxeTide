'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ChevronRight, Users, DollarSign } from 'lucide-react';

interface Suite {
  slug: string;
  title: string;
  priceLabel: string;
  capacityLabel: string;
  description: string;
  highlights: string[];
  image?: {
    src: string;
    title: string;
    type: 'image' | 'video' | 'pdf';
    caption?: string;
  };
}

interface SuiteData {
  shipId: string;
  shipName: string;
  capacity: string;
  suites: Suite[];
}

interface CabinsContentProps {
  suites: SuiteData[];
}

export default function CabinsContent({ suites }: CabinsContentProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-y-1/2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <p className="editorial-label mb-4">Accommodations</p>
          <h1 className="text-5xl md:text-6xl font-heading text-white mb-6">
            Explore Our Cabins & Suites
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Discover our collection of luxurious cabins and suites across all ships, each designed for your ultimate comfort and relaxation.
          </p>
        </motion.div>
      </section>

      {/* Ships and Suites */}
      <section className="luxury-container py-16 md:py-24 space-y-20">
        {suites.map((item, shipIndex) => (
          <motion.div
            key={item.shipId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: shipIndex * 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-8"
          >
            {/* Ship Header */}
            <div className="border-b border-gold/20 pb-6">
              <h2 className="text-3xl md:text-4xl font-heading text-white mb-2">
                {item.shipName}
              </h2>
              <p className="text-slate-400">{item.capacity}</p>
            </div>

            {/* Suites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item.suites.map((suite, suiteIndex) => (
                <motion.div
                  key={suite.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: suiteIndex * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className="luxury-card overflow-hidden hover:border-gold/40 transition-all group"
                >
                  {/* Suite Image */}
                  {suite.image && (
                    <div className="relative h-56 overflow-hidden bg-slate-800">
                      <img
                        src={suite.image.src}
                        alt={suite.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Suite Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-heading text-white mb-2">
                        {suite.title}
                      </h3>
                      <p className="text-sm text-slate-400">{suite.description}</p>
                    </div>

                    {/* Highlights */}
                    {suite.highlights.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Highlights</p>
                        <ul className="space-y-1">
                          {suite.highlights.slice(0, 2).map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                              <span className="text-gold mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pricing & Capacity */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400">
                          <DollarSign size={16} className="text-gold" />
                          <span className="text-sm">{suite.priceLabel}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Users size={16} className="text-gold" />
                        <span className="text-sm">{suite.capacityLabel}</span>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <Link
                      href={`/ships/${item.shipId}/suites/${suite.slug}`}
                      className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors text-sm font-medium mt-4"
                    >
                      View Details
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="luxury-container py-16 md:py-24">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 bg-gradient-to-r from-gold/10 to-slate-800/50 border border-gold/20 rounded-lg p-12"
        >
          <h3 className="text-3xl md:text-4xl font-heading text-white">
            Ready to Book Your Cabin?
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto">
            Select your preferred cabin and ship, then proceed to our booking system to reserve your luxury voyage.
          </p>
          <Link href="/booking" className="concierge-button mt-6">
            Book Your Cabin Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
