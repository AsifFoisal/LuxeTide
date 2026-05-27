'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { getAvailableSchedules } from '@/src/lib/schedules';
import type { Schedule } from '@/src/types';

export default function AvailableSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setLoadError(null);

    getAvailableSchedules()
      .then((data) => {
        if (isMounted) {
          setSchedules(data);
        }
      })
      .catch((error) => {
        console.error('Failed to load schedules:', error);
        if (isMounted) {
          setLoadError('Unable to load schedules right now.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p className="text-lg">Loading schedules...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="text-center py-12 text-rose-300">
        <p className="text-lg">{loadError}</p>
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p className="text-lg">No available schedules at the moment</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {schedules.map((schedule) => {
        const occupancyPercent = (schedule.bookedSeats / schedule.totalCapacity) * 100;
        const availableSeats = schedule.totalCapacity - schedule.bookedSeats;

        return (
          <motion.div
            key={schedule.id}
            variants={item}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-white/10 hover:border-gold/50 transition-all backdrop-blur-sm p-6"
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.15)' }}
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-300 capitalize">
                {schedule.status}
              </span>
            </div>

            {/* Ship & Destination */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors mb-1">
                {schedule.shipName}
              </h3>
              <div className="flex items-center gap-2 text-gold">
                <MapPin size={16} />
                <p className="text-sm font-semibold">{schedule.destination}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-2 text-slate-300 mb-4 text-sm">
              <Calendar size={16} className="text-blue-400" />
              <span>{schedule.departureDate} to {schedule.returnDate}</span>
            </div>

            {/* Price */}
            <div className="mb-4 p-3 bg-gold/10 border border-gold/30 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Price Per Person</p>
              <p className="text-2xl font-bold text-gold">{schedule.pricePerPerson}</p>
            </div>

            {/* Availability */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Users size={16} className="text-emerald-400" />
                  <span className="text-sm font-semibold">{availableSeats} seats left</span>
                </div>
                <span className="text-xs text-slate-500">{schedule.bookedSeats}/{schedule.totalCapacity}</span>
              </div>
              
              {/* Occupancy Bar */}
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${occupancyPercent}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`h-full ${occupancyPercent > 80 ? 'bg-red-500' : occupancyPercent > 50 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                />
              </div>
            </div>

            {/* Amenities Preview */}
            {schedule.amenities.length > 0 && (
              <div className="mb-4 flex gap-2 flex-wrap">
                {schedule.amenities.slice(0, 2).map((amenity, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-slate-300">
                    {amenity}
                  </span>
                ))}
                {schedule.amenities.length > 2 && (
                  <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-slate-300">
                    +{schedule.amenities.length - 2} more
                  </span>
                )}
              </div>
            )}

            {/* Book Button */}
            <a
              href={`/booking?${new URLSearchParams({ shipName: schedule.shipName, destinationName: schedule.destination }).toString()}`}
              className="gold-button w-full h-10 text-xs inline-flex items-center justify-center gap-2 group/btn"
            >
              Book Now
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
