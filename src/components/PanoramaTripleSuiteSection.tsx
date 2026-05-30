"use client";

import { motion } from "motion/react";
import ShipBookingDialog from "@/src/components/ShipBookingDialog";

interface PanoramaTripleSuiteSectionProps {
  shipName: string;
  suiteTitle: string;
  description: string;
  highlights: string[];
  bookingInclusions: string[];
  bookingNotes: string[];
}

const viewport = { once: true, amount: 0.22 };

export default function PanoramaTripleSuiteSection({
  shipName,
  suiteTitle,
  description,
  highlights,
  bookingInclusions,
  bookingNotes
}: PanoramaTripleSuiteSectionProps) {
  return (
    <section className="py-20 bg-midnight border-t border-white/5">
      <div className="luxury-container max-w-6xl grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <span className="block text-2xl sm:text-3xl font-heading text-gold">About This Suite</span>
            <h2 className="text-3xl sm:text-4xl font-heading text-white">
              Nestled in the heart of the Sundarbans, where the river bends through a tranquil mangrove canopy, CozyStay is a haven of warmth, tranquility and rejuvenation.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-4xl">
              Bathed in river mist and clear skies, it offers stunning views of mangrove channels and rich green forest edges.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="flex items-start gap-3 rounded-none border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="luxury-card border border-white/10 bg-white/5 p-6 sm:p-8 space-y-6"
        >
          <div className="space-y-2">
            <span className="editorial-label">Book This Suite</span>
            <h3 className="text-2xl font-heading text-white">Reserve {suiteTitle}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Send your travel dates and suite preference through the booking form.
            </p>
          </div>

          <div className="space-y-2 text-sm text-slate-300">
            <p>{description}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {bookingInclusions.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-none border border-white/5 bg-slate-900/40 px-4 py-3 text-sm text-white/80">
                <span className="h-2 w-2 rotate-45 bg-gold" />
                {item}
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs leading-relaxed text-slate-400">
            {bookingNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>

          <ShipBookingDialog shipName={shipName} triggerLabel="Request Booking" />
        </motion.div>
      </div>
    </section>
  );
}