'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { SHIPS, DESTINATIONS } from '@/src/constants';
import { Calendar, Users, MapPin, ArrowRight, Ship } from 'lucide-react';
import { PremiumButton, PremiumInput, PremiumSelect } from '@/src/components/PremiumUI';
import { SuiteAvailability } from '@/src/types';
import { getActiveSuiteAvailabilities } from '@/src/lib/suite-availability';
import { getShipDetails } from '@/src/ship-details';

type HomeSuite = {
  slug: string;
  title: string;
  priceLabel: string;
  ship: string;
  shipId: string;
  image?: { src: string };
};

function formatDateRangeLabel(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startLabel = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const endLabel = end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  return `${startLabel} - ${endLabel}`;
}

export default function Home() {
  const containerRef = useRef(null);
  const [suites, setSuites] = useState<HomeSuite[]>([]);
  const [suiteAvailabilities, setSuiteAvailabilities] = useState<SuiteAvailability[]>([]);
  const [destinationId, setDestinationId] = useState('');
  const [selectedSuiteKey, setSelectedSuiteKey] = useState('');
  const [selectedDateRangeId, setSelectedDateRangeId] = useState('');

  useEffect(() => {
    const homeSuites = SHIPS.flatMap((ship) => {
      const details = getShipDetails(ship.id);
      return details?.suites.map((suite) => ({
        slug: suite.slug,
        title: suite.title,
        priceLabel: suite.priceLabel,
        ship: ship.name,
        shipId: ship.id,
        image: suite.image?.type === 'image' ? { src: suite.image.src } : undefined,
      })) ?? [];
    });

    setSuites(homeSuites);
  }, []);

  useEffect(() => {
    let isMounted = true;

    getActiveSuiteAvailabilities()
      .then((ranges) => {
        if (isMounted) {
          setSuiteAvailabilities(ranges);
        }
      })
      .catch((error) => {
        console.error('Failed to load suite availability:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const revealViewport = { once: true, amount: 0.25 };

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const services = [
    { title: 'Adventure Tours', icon: MapPin, desc: 'Thrilling experiences' },
    { title: 'Sea Cruises', icon: Ship, desc: 'Luxury at sea' },
    { title: 'Private Charters', icon: Users, desc: 'Exclusive journeys' },
    { title: 'Global Explore', icon: Calendar, desc: 'Infinite horizons' }
  ];

  const selectedSuite = suites.find((suite) => `${suite.shipId}::${suite.slug}` === selectedSuiteKey);

  const dateRangeOptions = selectedSuite
    ? suiteAvailabilities.filter((item) => item.shipId === selectedSuite.shipId)
    : [];

  const selectedDateRange = dateRangeOptions.find((item) => item.id === selectedDateRangeId);

  const bookingHref = selectedSuite && selectedDateRange
    ? `/booking?${new URLSearchParams({
        destinationId,
        destinationName: DESTINATIONS.find((destination) => destination.id === destinationId)?.name || '',
        shipId: selectedSuite.shipId,
        shipName: selectedSuite.ship,
        suiteSlug: selectedSuite.slug,
        suiteTitle: selectedSuite.title,
        dateRangeId: selectedDateRange.id,
      }).toString()}`
    : '/booking';

  const isBookNowDisabled = !selectedSuite || !selectedDateRange;

  const handleSuiteChange = (suiteKey: string) => {
    setSelectedSuiteKey(suiteKey);
    setSelectedDateRangeId('');
  };

  return (
    <div className="relative space-y-0 text-slate-300 bg-slate-950 overflow-x-hidden" ref={containerRef}>
      {/* Hero Section with Parallax */}
      <section className="relative h-[95vh] flex items-center overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=60&w=1200" 
            alt="Luxury Cruise Hero" 
            className="w-full h-full object-cover scale-110 will-change-transform"
            decoding="async"
            loading="eager"
            style={{ transform: 'translateZ(0)' }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        <div className="relative z-10 w-full luxury-container">
          <div className="max-w-4xl space-y-10">
            <motion.div
              style={{ opacity }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <motion.span 
                initial={{ opacity: 0, letterSpacing: '0.2em' }}
                animate={{ opacity: 1, letterSpacing: '0.5em' }}
                transition={{ delay: 0.5, duration: 1 }}
                className="editorial-label hidden sm:block text-gold"
              >
                World Class Travel Experience
              </motion.span>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-heading text-white leading-[0.95]">
                Book Your Next <br /><span className="italic-accent text-gold">Memorable</span> Trip.
              </h1>
              <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                We provide the most exclusive maritime journeys across the Bay of Bengal and beyond. Luxury redefined at sea.
              </p>
            </motion.div>

            {/* LuxeTide Inspired Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="bg-slate-900/60 backdrop-blur-3xl p-3 sm:p-4 md:p-8 border border-white/10 shadow-3xl rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-end"
            >
              <div className="space-y-2">
                <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-gold font-bold">Destination</label>
                <PremiumSelect
                  value={destinationId}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDestinationId(e.target.value)}
                  className="h-10 sm:h-12 bg-white/5 border-white/10 w-full text-white text-sm sm:text-base"
                >
                  <option value="" className="bg-slate-900">Where to go?</option>
                  {DESTINATIONS.map((destination) => (
                    <option key={destination.id} value={destination.id} className="bg-slate-900">
                      {destination.name}
                    </option>
                  ))}
                </PremiumSelect>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-gold font-bold">Suite</label>
                <PremiumSelect
                  value={selectedSuiteKey}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSuiteChange(e.target.value)}
                  className="h-10 sm:h-12 bg-white/5 border-white/10 w-full text-white text-sm sm:text-base"
                >
                  <option value="" className="bg-slate-900">Select Suite</option>
                  {suites.map((suite) => (
                    <option key={`${suite.shipId}-${suite.slug}`} value={`${suite.shipId}::${suite.slug}`} className="bg-slate-900">
                      {suite.title} - {suite.ship}
                    </option>
                  ))}
                </PremiumSelect>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] sm:text-[10px] uppercase tracking-widest text-gold font-bold">Date Range</label>
                <PremiumSelect
                  value={selectedDateRangeId}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDateRangeId(e.target.value)}
                  disabled={!selectedSuite}
                  className="h-10 sm:h-12 bg-white/5 border-white/10 w-full text-white text-sm sm:text-base disabled:opacity-60"
                >
                  <option value="" className="bg-slate-900">
                    {selectedSuite ? 'Select date range' : 'Choose suite first'}
                  </option>
                  {dateRangeOptions.map((range) => (
                    <option key={range.id} value={range.id} className="bg-slate-900">
                      {formatDateRangeLabel(range.startDate, range.endDate)}
                    </option>
                  ))}
                </PremiumSelect>
              </div>
              {isBookNowDisabled ? (
                <PremiumButton
                  disabled
                  className="h-10 sm:h-12 w-full flex items-center justify-center gap-2 group text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  BOOK NOW <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </PremiumButton>
              ) : (
                <Link
                  href={bookingHref}
                  className="gold-button h-10 sm:h-12 w-full inline-flex items-center justify-center gap-2 group text-xs sm:text-sm"
                >
                  BOOK NOW <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-midnight border-b border-white/5 relative">
        <div className="luxury-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {services.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ delay: i * 0.1 }}
                className="p-8 luxury-card flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <h4 className="text-xl font-heading text-white mb-2">{item.title}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-slate-950">
        <div className="luxury-container grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
                viewport={revealViewport}
            className="relative"
          >
            <div className="p-4 border border-white/5 bg-white/5 backdrop-blur-3xl shadow-3xl">
              <img 
                    src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=70&w=1200" 
                alt="About" 
                    loading="lazy"
                    decoding="async"
                className="w-full h-48 sm:h-80 md:h-150 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 md:-bottom-10 md:-right-10 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gold flex flex-col items-center justify-center text-slate-950 p-4 sm:p-6 text-center rounded-sm shadow-3xl">
              <span className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold italic">25+</span>
              <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest mt-2">Years of Experience</span>
            </div>
          </motion.div>

          <div className="space-y-10">
            <div className="space-y-6">
              <span className="editorial-label text-gold">About LuxeTide</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white leading-tight">World Best Travel <br /><span className="italic-accent font-normal text-gold">Agency</span> Since 2000</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 font-light leading-relaxed">
                We believe that travel is not just about reaching a destination, but about the unique memories and stories created along the way.
              </p>
            </div>
            <div className="space-y-6">
              {[
                'Professional Tour Guides',
                'Custom Travel Packages',
                'Luxury Accommodation Only',
                'Exclusive Maritime Access'
              ].map((point) => (
                <div key={point} className="flex items-center gap-4 text-white/80 font-medium tracking-wide">
                  <div className="w-2 h-2 bg-gold rotate-45" /> {point}
                </div>
              ))}
            </div>
            <PremiumButton variant="outline" className="h-16 px-12">Learn More</PremiumButton>
          </div>
        </div>
      </section>

      {/* Cruise Fleet Showcase */}
      <section className="py-32 bg-deep-space border-y border-white/5">
        <div className="luxury-container space-y-12 sm:space-y-16 md:space-y-20">
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-4 sm:px-0">
            <span className="editorial-label text-gold">Our Cruise Fleet</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white leading-tight">Sail Aboard The <span className="italic-accent font-normal text-gold">Finest Ships</span></h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 font-light leading-relaxed">
              Discover our signature vessels, each crafted for comfort, elegance, and unforgettable sea journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {SHIPS.map((ship, i) => (
              <motion.div
                key={ship.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="luxury-card overflow-hidden group"
              >
                <div className="h-56 md:h-72 lg:h-90 overflow-hidden relative">
                  <img
                    src={ship.image}
                    alt={ship.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute top-5 left-5 bg-gold text-slate-950 px-3 py-1 font-bold text-[10px] rounded-sm uppercase tracking-widest">
                    {ship.capacity}
                  </div>
                </div>

                <div className="p-8 space-y-6 bg-midnight/90 backdrop-blur-xl">
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-heading text-white group-hover:text-gold transition-colors">{ship.name}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-slate-400 font-light leading-relaxed line-clamp-3">{ship.description}</p>
                  </div>

                  <div className="space-y-3 border-t border-white/10 pt-5">
                    <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Onboard Highlights</p>
                    <div className="grid grid-cols-2 gap-2">
                      {ship.amenities.slice(0, 4).map((amenity) => (
                        <div key={amenity} className="text-[11px] text-slate-300 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/ships/${ship.id}`}
                    className="outline-button w-full h-12 inline-flex items-center justify-center gap-2 group"
                  >
                    Explore Ship <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tours Section */}
      <section className="py-32 bg-deep-space">
        <div className="luxury-container">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0">
            <span className="editorial-label">Accommodations</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white">Our Popular Suites</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-9 md:gap-12">
            {/* Display first 3 suites */}
            {suites.slice(0, 3).map((suite, i) => (
              <motion.div
                key={`suite-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ delay: i * 0.1 }}
                className="luxury-card group overflow-hidden"
              >
                <div className="h-48 sm:h-60 md:h-72 overflow-hidden relative bg-slate-800">
                  {suite.image?.src ? (
                    <img src={suite.image.src} alt={suite.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-gold/20 to-slate-800 flex items-center justify-center">
                      <span className="text-slate-400">Suite Image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-gold text-slate-950 px-3 py-1 font-bold text-[10px] rounded-sm uppercase tracking-widest">
                    Suite
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-900 border border-white/10 text-white px-3 py-1 font-heading text-lg rounded-sm shadow-xl">
                    {suite.priceLabel}
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2 text-gold"><Ship size={12} /> {suite.ship}</span>
                    <span className="flex items-center gap-2"><Users size={12} /> 2+ Guests</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading text-white group-hover:text-gold transition-colors">{suite.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light line-clamp-2">Premium accommodation with elegant furnishings and modern amenities.</p>
                  <Link
                    href={`/ships/${suite.shipId}/suites/${suite.slug}`}
                    className="outline-button w-full h-12 inline-flex items-center justify-center gap-2 group"
                  >
                    View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 md:py-32 bg-slate-950">
        <div className="luxury-container grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 md:gap-24 items-center">
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <span className="editorial-label">Core Values</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading text-white leading-tight">Why Choose This <br /><span className="italic-accent font-normal text-gold">Agency</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {[
                { title: 'Best Guide', icon: Users },
                { title: 'Easy Booking', icon: ArrowRight },
                { title: 'Premium Trip', icon: Ship },
                { title: 'Safe Journey', icon: MapPin }
              ].map((v, i) => (
                <div key={i} className="p-4 sm:p-6 md:p-8 bg-white/5 border border-white/10 space-y-3 sm:space-y-4 hover:border-gold/50 transition-colors">
                  <v.icon size={24} className="text-gold sm:size-28 md:size-15" />
                  <h4 className="text-base sm:text-lg font-heading text-white tracking-wide">{v.title}</h4>
                  <p className="text-[8px] sm:text-[10px] text-slate-600 uppercase tracking-widest">Guaranteed Quality</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=70&w=1200" alt="Why Choose Us" className="w-full h-64 sm:h-96 md:h-175 object-cover grayscale opacity-60 will-change-transform" loading="lazy" decoding="async" style={{ transform: 'translateZ(0)' }} />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Featured Destinations (Editorial Pattern) */}
      <section className="py-16 sm:py-24 md:py-32 bg-bg-secondary border-t border-white/5">
        <div className="luxury-container flex flex-col lg:flex-row">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex-1 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 p-6 sm:p-8 lg:p-20"
          >
            <span className="editorial-label mb-2 sm:mb-3">Top Region</span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl text-slate-100 font-heading">Saint Martin&apos;s</h3>
            <p className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold mt-3">The Blue Lagoon • Coral Paradise</p>
          </motion.div>
          
          <div className="flex-2 grid grid-cols-1 md:grid-cols-3 gap-0 min-h-64 md:min-h-80">
            {DESTINATIONS.slice(0, 3).map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={revealViewport}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="group relative overflow-hidden h-64 md:h-80 lg:h-full border-r border-white/5 last:border-r-0"
              >
                <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[1.5s]" />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/10 transition-colors" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-10 lg:left-10">
                  <p className="text-[8px] sm:text-[10px] text-gold font-bold uppercase tracking-widest mb-1 sm:mb-2">Destination</p>
                  <p className="text-sm sm:text-base lg:text-lg font-heading text-white tracking-widest uppercase">{item.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Newsletter */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden bg-midnight border-t border-white/5">
         <div className="absolute inset-0 opacity-10 pointer-events-none scale-110">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa" 
            alt="Waves Background" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"></div>
        </div>
        <div className="luxury-container relative z-10 text-center max-w-4xl space-y-8 sm:space-y-10 md:space-y-12 px-4 sm:px-0">
          <span className="editorial-label text-gold text-[8px] sm:text-[10px]">Join The Newsletter</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-heading text-white leading-tight">Get Special Discount</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter to receive invitation-only deals and early access to new fleet launches.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12 max-w-2xl mx-auto">
            <PremiumInput 
              placeholder="Your email address" 
              className="flex-1 h-12 sm:h-14 md:h-16 rounded-none text-sm sm:text-base md:text-lg"
            />
            <PremiumButton className="h-12 sm:h-14 md:h-16 whitespace-nowrap px-8 sm:px-10 md:px-12 text-xs sm:text-sm md:text-base">Subscribe</PremiumButton>
          </div>
        </div>
      </section>
    </div>
  );
}
