"use client";

import Link from "next/link";
import NextImage from "next/image";
import { motion } from "motion/react";
import type { ShipSuite } from "@/src/ship-types";

interface ShipSuiteGridProps {
  shipSlug: string;
  suites: ShipSuite[];
}

const revealViewport = { once: true, amount: 0.2 };

export default function ShipSuiteGrid({ shipSlug, suites }: ShipSuiteGridProps) {
  if (suites.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {suites.map((suite, index) => {
        const imageSrc = suite.image?.src ?? suite.gallery[0]?.src;

        return (
          <motion.div
            key={suite.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="h-full"
          >
            <Link
              href={`/ships/${shipSlug}/suites/${suite.slug}`}
              className="group flex h-full min-h-[30rem] flex-col overflow-hidden border border-white/10 bg-white/5 transition-all duration-300 hover:translate-y-0.5 hover:border-gold/40 hover:bg-white/[0.04]"
            >
              <div className="relative h-60 shrink-0 overflow-hidden">
                {imageSrc ? (
                  <NextImage
                    src={imageSrc}
                    alt={suite.title}
                    fill
                    unoptimized={typeof imageSrc === 'string' && imageSrc.startsWith('http')}
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-black" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
                  <div className="space-y-2">
                    <span className="editorial-label text-gold">Suite</span>
                    <h3 className="text-lg font-heading text-white">{suite.title}</h3>
                    <p className="max-w-xl text-xs text-slate-300">
                      {suite.description}
                    </p>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-2 text-right">
                    <span className="bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-950">
                      {suite.capacityLabel}
                    </span>
                    <span className="text-sm uppercase tracking-[0.2em] text-white/80">
                      {suite.priceLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col space-y-5 p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/60">
                  <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-gold">
                    {suite.capacityLabel}
                  </span>
                  <span>{suite.priceLabel}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {suite.highlights.slice(0, 3).map((highlight) => (
                    <span
                      key={highlight}
                      className="border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <span className="text-sm uppercase tracking-[0.24em] text-gold/80">
                    View Details
                  </span>
                  <span className="inline-flex h-11 items-center justify-center border border-gold/30 px-5 text-sm font-semibold text-white transition-colors group-hover:border-gold/60 group-hover:bg-gold group-hover:text-slate-950">
                    Open Suite
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
