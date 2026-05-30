"use client";

import { useRef, memo } from "react";
import { motion } from "motion/react";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaItem } from "@/src/ship-types";

interface ShipMediaCarouselProps {
  items: MediaItem[];
  title: string;
  description?: string;
}

export default function ShipMediaCarousel({ items, title, description }: ShipMediaCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const amount = track.clientWidth * 0.8;
    track.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="editorial-label">{title}</span>
          {description && <p className="text-sm text-slate-400 max-w-2xl">{description}</p>}
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-white/5 text-white transition-colors hover:border-gold/50 hover:bg-white/10"
            aria-label="Scroll carousel left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-white/5 text-white transition-colors hover:border-gold/50 hover:bg-white/10"
            aria-label="Scroll carousel right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <CarouselItem key={item.src} item={item} />
        ))}
      </div>
    </section>
  );
}

const CarouselItem = memo(function CarouselItem({ item, index }: { item: MediaItem; index?: number }) {
  return (
    <motion.article
      className="min-w-[82%] sm:min-w-[58%] lg:min-w-[42%] snap-start overflow-hidden border border-white/10 bg-slate-950/60"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index ?? 0) * 0.04 }}
    >
      <div className="relative aspect-16/10 w-full">
        {item.type === "pdf" ? (
          <iframe src={item.src} title={item.title} className="h-full w-full" />
        ) : (
          <NextImage
            src={item.thumbnailSrc ?? item.src}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 42vw, (min-width: 640px) 58vw, 82vw"
            loading="lazy"
            unoptimized={typeof (item.thumbnailSrc ?? item.src) === 'string' && (item.thumbnailSrc ?? item.src).startsWith('http')}
            className="object-cover"
          />
        )}
      </div>
    </motion.article>
  );
});