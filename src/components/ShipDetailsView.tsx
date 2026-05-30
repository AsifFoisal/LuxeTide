"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useState, useCallback, memo } from "react";
import { motion } from "motion/react";
import ShipBookingDialog from "@/src/components/ShipBookingDialog";
import ShipSuiteGrid from "@/src/components/ShipSuiteGrid";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import type { MediaSection, ShipDetails } from "@/src/ship-types";

const revealViewport = { once: true, amount: 0.25 };

interface ShipDetailsViewProps {
  details: ShipDetails;
}

interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

const WAVE_2_HERO_VIDEO_URL = "https://res.cloudinary.com/doxxexlxe/video/upload/q_auto,vc_auto/v1778941081/The_Wave_2_Child_Zone_u1dfci.mp4";
const WAVE_HERO_VIDEO_URL = "https://res.cloudinary.com/doxxexlxe/video/upload/q_auto,vc_auto/v1778942043/The_Wave_Optimized._pmhf08.mp4";
const RIVER_CRUISE_HERO_VIDEO_URL = "https://res.cloudinary.com/doxxexlxe/video/upload/q_auto,vc_auto/v1778942477/River_Cruise_Ovc_4K_2023_okwngh.mp4";

export default function ShipDetailsView({ details }: ShipDetailsViewProps) {
  const { meta, hero, gallerySections, suites, videos } = details;
  const heroVideoSrc = meta.slug === "the-wave-2" ? WAVE_2_HERO_VIDEO_URL : meta.slug === "the-wave" ? WAVE_HERO_VIDEO_URL : meta.slug === "the-river-cruise" ? RIVER_CRUISE_HERO_VIDEO_URL : hero.video?.src;
  const heroPoster = hero.image?.src ?? gallerySections[0]?.items[0]?.src;
  const extraVideos = heroVideoSrc
    ? videos.filter((video) => video.src !== heroVideoSrc)
    : videos;
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [isLightboxImageLoading, setIsLightboxImageLoading] = useState(false);

  const openLightbox = useCallback((image: LightboxImage) => {
    setIsLightboxImageLoading(true);
    setLightboxImage(image);
  }, []);

  return (
    <div className="bg-slate-950 text-slate-200">
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {heroVideoSrc ? (
          <video
            ref={(el) => {
              // try to start playback if browser allows autoplay (muted)
              try {
                el?.play?.();
              } catch (e) {
                // ignore play() errors (browsers may block autoplay)
              }
            }}
            src={heroVideoSrc}
            poster={heroPoster}
            // avoid aggressive preloading of large hero videos to reduce initial load
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
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
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/50 to-slate-950" />

        <div className="relative z-10 luxury-container ml-0 mr-auto pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="max-w-3xl space-y-6"
          >
            <span className="editorial-label text-gold">{meta.tagline}</span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading text-white leading-tight">
              {meta.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              {meta.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-gold text-slate-950 text-[10px] font-bold px-4 py-1 uppercase tracking-[0.2em]">
                {meta.capacityLabel}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ShipBookingDialog shipName={meta.name} />
              <Link
                href="#gallery"
                className="outline-button inline-flex items-center justify-center gap-2 h-12 px-8"
              >
                Explore Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-midnight border-b border-white/5">
        <div className="luxury-container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={revealViewport}
            className="space-y-6"
          >
            <span className="editorial-label">About The Ship</span>
            <h2 className="text-3xl sm:text-4xl font-heading text-white">
              Designed For Elevated Journeys
            </h2>
            {meta.about.map((paragraph) => (
              <p key={paragraph} className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {meta.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-2 h-2 bg-gold rotate-45" />
                  {highlight}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            className="relative"
          >
            {heroPoster ? (
              <button
                type="button"
                onClick={() =>
                  openLightbox({
                    src: heroPoster,
                    alt: `${meta.name} interior`,
                    caption: meta.name
                  })
                }
                className="relative overflow-hidden w-full h-72 sm:h-96 text-left cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                aria-label={`Open ${meta.name} interior image`}
              >
                <NextImage
                  src={heroPoster}
                  alt={`${meta.name} interior`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  unoptimized={typeof heroPoster === 'string' && heroPoster.startsWith('http')}
                />
              </button>
            ) : (
              <div className="h-72 sm:h-96 flex items-center justify-center text-slate-500 bg-slate-900/40">
                Cruise imagery coming soon.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 border-t border-white/5">
        <div className="luxury-container space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="editorial-label">Suites</span>
            <h2 className="text-3xl sm:text-5xl font-heading text-white">Choose Your Suite</h2>
            <p className="text-sm sm:text-base text-slate-400">
              Browse the suite collection, then open any card for the full suite detail page.
            </p>
          </div>
          <ShipSuiteGrid shipSlug={meta.slug} suites={suites} />
        </div>
      </section>

      <section className="py-24 bg-midnight border-t border-white/5">
        <div className="luxury-container flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="editorial-label">Food & Dining</span>
            <h2 className="text-3xl sm:text-5xl font-heading text-white">Menus</h2>
            <p className="text-sm sm:text-base text-slate-400">
              Open the corresponding dining menu for this ship.
            </p>
          </div>
          <Link
            href={`/dining?ship=${meta.slug === "the-wave-2" ? "wave2" : "wave"}`}
            className="outline-button inline-flex items-center justify-center gap-2 h-12 px-8 whitespace-nowrap"
          >
            Open Food Menu
          </Link>
        </div>
      </section>

      <section id="gallery" className="py-24 bg-deep-space border-t border-white/5">
        <div className="luxury-container space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="editorial-label">Spaces & Experiences</span>
            <h2 className="text-3xl sm:text-5xl font-heading text-white">Onboard Gallery</h2>
            <p className="text-sm sm:text-base text-slate-400">
              Walk through every deck and zone with curated visuals from each space.
            </p>
          </div>
          {gallerySections.map((section) => (
            <MemoizedMediaSectionBlock
              key={section.id}
              section={section}
              onImageClick={openLightbox}
            />
          ))}
        </div>
      </section>

      {extraVideos.length > 0 && (
        <section className="py-24 bg-deep-space border-t border-white/5">
          <div className="luxury-container space-y-10">
            <div className="max-w-2xl space-y-3">
              <span className="editorial-label">Ship Videos</span>
              <h2 className="text-3xl sm:text-5xl font-heading text-white">Documentaries & Clips</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {extraVideos.map((video) => (
                <div key={video.src} className="luxury-card overflow-hidden">
                  <video
                    src={video.src}
                    controls
                    className="w-full h-72 object-cover"
                    preload="metadata"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-heading text-white">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="booking" className="py-24 bg-midnight border-t border-white/5">
        <div className="luxury-container">
          <div className="luxury-card p-10 sm:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="editorial-label">Booking</span>
              <h2 className="text-3xl sm:text-4xl font-heading text-white">Plan Your Voyage</h2>
              <p className="text-sm sm:text-base text-slate-400">
                Secure your preferred dates and cabin selection with our concierge team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <ShipBookingDialog shipName={meta.name} triggerLabel="Book Now" />
              <Link
                href="/contact"
                className="outline-button inline-flex items-center justify-center gap-2 h-12 px-8"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Dialog
        open={Boolean(lightboxImage)}
        onOpenChange={(open) => {
          if (!open) {
            setIsLightboxImageLoading(false);
            setLightboxImage(null);
          }
        }}
      >
        <DialogContent
          overlayClassName="bg-black/70 duration-300"
          className="bg-transparent! border-none! ring-0! rounded-none! p-0! gap-0! max-w-[98vw]! w-auto! duration-300"
          showCloseButton={true}
        >
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[85vh] flex items-center justify-center will-change-transform will-change-opacity"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                {isLightboxImageLoading && (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/20 bg-slate-950/70 text-gold shadow-[0_0_60px_rgba(217,180,102,0.15)]">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  </div>
                )}
              </div>
              <NextImage
                key={lightboxImage.src}
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                width={2400}
                height={1600}
                sizes="96vw"
                className={`relative z-10 h-auto w-auto max-w-[96vw] max-h-[85vh] object-contain transition-opacity duration-200 ${isLightboxImageLoading ? "opacity-0" : "opacity-100"}`}
                onLoadingComplete={() => setIsLightboxImageLoading(false)}
                onError={() => setIsLightboxImageLoading(false)}
              />
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MediaSectionBlock({
  section,
  onImageClick,
}: {
  section: MediaSection;
  onImageClick: (image: LightboxImage) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? section.items.length : 3;
  const itemsToShow = section.items.slice(0, visibleCount);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl sm:text-3xl font-heading text-white">{section.title}</h3>
        {section.description && (
          <p className="text-sm text-slate-500">{section.description}</p>
        )}
      </div>
      {section.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {itemsToShow.map((item, index) => (
              <motion.button
                key={`${section.id}-${item.src}-${index}`}
                type="button"
                onClick={() =>
                  onImageClick({
                    src: item.src,
                    alt: item.title,
                    caption: item.caption ?? item.title
                  })
                }
                className="overflow-hidden text-left cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                aria-label={`Open ${item.title} image`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900/40">
                  <NextImage
                    src={item.thumbnailSrc ?? item.src}
                    alt={item.title}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    unoptimized={(item.thumbnailSrc ?? item.src).startsWith("http")}
                    className="object-cover"
                  />
                </div>
              </motion.button>
            ))}
          </div>

          {section.items.length > visibleCount && (
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="outline-button"
              >
                {expanded ? 'View less' : 'View more'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export const MemoizedMediaSectionBlock = memo(MediaSectionBlock);

