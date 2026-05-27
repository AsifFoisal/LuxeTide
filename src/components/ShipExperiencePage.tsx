"use client";

import Link from "next/link";
import NextImage from "next/image";
import { motion } from "motion/react";
import { memo, useCallback, useState } from "react";
import ShipBookingDialog from "@/src/components/ShipBookingDialog";
import ShipMediaCarousel from "@/src/components/ShipMediaCarousel";
import type { MediaItem, MediaSection, ShipDetails } from "@/src/ship-types";

interface ShipExperiencePageProps {
  details: ShipDetails;
  pageLabel: string;
  pageTitle: string;
  pageDescription: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  carouselItems: MediaItem[];
  primarySections: MediaSection[];
  secondarySections?: MediaSection[];
}

const revealViewport = { once: true, amount: 0.2 };

export default function ShipExperiencePage({
  details,
  pageLabel,
  pageTitle,
  pageDescription,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  carouselItems,
  primarySections,
  secondarySections = []
}: ShipExperiencePageProps) {
  const { meta, hero, booking } = details;
  const heroPoster = hero.image?.src ?? carouselItems[0]?.src;

  return (
    <div className="bg-slate-950 text-slate-200">
      <section className="relative min-h-[72vh] flex items-center overflow-hidden">
        {hero.video ? (
          <video
            src={hero.video.src}
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : heroPoster ? (
          <NextImage
            src={heroPoster}
            alt={meta.name}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="absolute inset-0 object-cover"
            unoptimized={typeof heroPoster === 'string' && heroPoster.startsWith('http')}
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-black" />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/85 via-slate-950/55 to-slate-950" />

        <div className="relative z-10 luxury-container py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-6"
          >
            <span className="editorial-label text-gold">{pageLabel}</span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading text-white leading-tight">
              {pageTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
              {pageDescription}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="bg-gold text-slate-950 text-[10px] font-bold px-4 py-1 uppercase tracking-[0.2em]">
                {meta.capacityLabel}
              </span>
              <span className="border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                {booking.pricePerPerson}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ShipBookingDialog shipName={meta.name} triggerLabel="Book Now" />
              <Link href={primaryHref} className="outline-button inline-flex items-center justify-center h-12 px-8">
                {primaryLabel}
              </Link>
              <Link href={secondaryHref} className="outline-button inline-flex items-center justify-center h-12 px-8">
                {secondaryLabel}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-midnight border-b border-white/5">
        <div className="luxury-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={revealViewport}
            className="space-y-6"
          >
            <span className="editorial-label">About This Experience</span>
            <h2 className="text-3xl sm:text-4xl font-heading text-white">{meta.tagline}</h2>
            {meta.about.map((paragraph) => (
              <p key={paragraph} className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            className="space-y-6"
          >
            <div className="space-y-3 rounded-none border border-white/10 bg-white/5 p-6">
              <p className="editorial-label">Booking</p>
              <h3 className="text-2xl font-heading text-white">{booking.pricePerPerson}</h3>
              <div className="space-y-2 text-sm text-slate-400">
                {booking.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {booking.inclusions.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-none border border-white/5 bg-slate-900/40 px-4 py-3 text-sm text-white/80">
                  <span className="h-2 w-2 rotate-45 bg-gold" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="luxury-container space-y-12">
          <ShipMediaCarousel items={carouselItems} title={pageLabel} description={pageDescription} />

          <div className="space-y-10">
            {primarySections.map((section) => (
              <MediaSectionBlock key={section.id} section={section} />
            ))}
            {secondarySections.map((section) => (
              <MediaSectionBlock key={section.id} section={section} subtle />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-midnight border-t border-white/5">
        <div className="luxury-container">
          <div className="luxury-card p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-label">Plan Your Voyage</span>
              <h2 className="text-3xl sm:text-4xl font-heading text-white">Reserve {meta.name}</h2>
              <p className="text-sm sm:text-base text-slate-400">
                Use the booking form to send your preferred dates and suite or dining preferences.
              </p>
            </div>
            <ShipBookingDialog shipName={meta.name} triggerLabel="Request Booking" />
          </div>
        </div>
      </section>
    </div>
  );
}

function MediaSectionBlock({ section, subtle = false }: { section: MediaSection; subtle?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? section.items.length : 3;
  const itemsToShow = section.items.slice(0, visibleCount);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl sm:text-3xl font-heading text-white">{section.title}</h3>
        {section.description && <p className="text-sm text-slate-500">{section.description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {itemsToShow.map((item, index) => (
          <motion.article
            key={item.src}
            className={subtle ? "overflow-hidden border border-white/5 bg-white/5" : "overflow-hidden border border-white/10 bg-white/5"}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.48, delay: index * 0.03 }}
          >
            <div className="relative h-64 w-full">
              {item.type === "pdf" ? (
                <iframe src={item.src} title={item.title} className="h-full w-full" />
              ) : (
                <NextImage
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  unoptimized={typeof item.src === 'string' && item.src.startsWith('http')}
                  className="object-cover"
                />
              )}
            </div>
            <div className="space-y-2 p-5">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold/75">{item.type}</p>
              <h4 className="text-lg font-heading text-white">{item.title}</h4>
              {item.caption && <p className="text-sm text-slate-400">{item.caption}</p>}
            </div>
          </motion.article>
        ))}
      </div>

      {section.items.length > visibleCount && (
        <div className="pt-4">
          <button type="button" onClick={() => setExpanded((v) => !v)} className="outline-button">
            {expanded ? 'View less' : 'View more'}
          </button>
        </div>
      )}
    </section>
  );
}

export const MemoizedExperienceMediaSection = memo(MediaSectionBlock);