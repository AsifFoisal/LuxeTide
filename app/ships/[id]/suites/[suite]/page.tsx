import type { Metadata } from "next";
import Link from "next/link";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import ShipBookingDialog from "@/src/components/ShipBookingDialog";
import InfinityRoyalSuiteSection from "@/src/components/InfinityRoyalSuiteSection";
import PanoramaDeluxeSuiteSection from "@/src/components/PanoramaDeluxeSuiteSection";
import PanoramaKingSuiteSection from "@/src/components/PanoramaKingSuiteSection";
import PanoramaTripleSuiteSection from "@/src/components/PanoramaTripleSuiteSection";
import VipPanoramaTripleSuiteSection from "@/src/components/VipPanoramaTripleSuiteSection";
import ShipMediaCarousel from "@/src/components/ShipMediaCarousel";
import { getShipDetails, getShipSuiteDetails, getShipSuiteParams } from "@/src/ship-details";
import { getPublicSuitePricing } from "@/src/lib/suite-pricing-server";

export function generateStaticParams() {
  return getShipSuiteParams();
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; suite: string }> }): Promise<Metadata> {
  const { id, suite } = await params;
  const details = getShipSuiteDetails(id, suite);
  if (!details) {
    return { title: "Suite Not Found" };
  }

  return {
    title: `${details.suite.title} | ${details.ship.name} | LuxeTide`,
    description: details.suite.description
  };
}

export default async function ShipSuitePage({ params }: { params: Promise<{ id: string; suite: string }> }) {
  const { id, suite } = await params;
  const suitePricing = await getPublicSuitePricing({ shipId: id });
  const details = getShipSuiteDetails(id, suite, suitePricing);
  if (!details) {
    notFound();
  }

  const ship = getShipDetails(id, suitePricing);
  const suiteImage = details.suite.image?.src ?? details.suite.gallery[0]?.src ?? ship?.hero.image?.src;

  return (
    <div className="bg-slate-950 text-slate-200">
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        {suiteImage ? (
          <NextImage
            src={suiteImage}
            alt={details.suite.title}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-black" />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/75 via-slate-950/35 to-slate-950" />

        <div className="relative z-10 w-full px-6 pb-20 pt-32 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-6 text-left">
            <span className="editorial-label text-gold">Suite Detail</span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading text-white leading-tight">
              {details.suite.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
              {details.suite.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-gold text-slate-950 text-[10px] font-bold px-4 py-1 uppercase tracking-[0.2em]">
                {details.suite.capacityLabel}
              </span>
              <span className="border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                {details.suite.priceLabel}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <ShipBookingDialog shipName={ship?.meta.name ?? details.ship.name} triggerLabel="Book This Suite" />
              <Link href={`/ships/${id}`} className="outline-button inline-flex items-center justify-center h-12 px-8">
                Back to Ship
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-midnight border-b border-white/5">
        <div className="luxury-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <span className="editorial-label">About This Suite</span>
            <h2 className="text-3xl sm:text-4xl font-heading text-white">Premium space, curated for the route</h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {details.suite.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {details.suite.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-2 h-2 bg-gold rotate-45" />
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-none border border-white/10 bg-white/5 p-6 space-y-4">
              <p className="editorial-label">Suite Summary</p>
              <div className="space-y-2 text-sm text-slate-400">
                <p>{details.suite.priceLabel}</p>
                <p>{details.suite.capacityLabel}</p>
                {details.booking.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.booking.inclusions.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-none border border-white/5 bg-slate-900/40 px-4 py-3 text-sm text-white/80">
                  <span className="h-2 w-2 rotate-45 bg-gold" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="luxury-container space-y-12">
          <ShipMediaCarousel
            items={details.suite.gallery}
            title="Suite Gallery"
            description="Browse only the images that belong to this suite."
          />
        </div>
      </section>

      {details.suite.slug === "infinity-royal-suite" && (
        <InfinityRoyalSuiteSection
          shipName={ship?.meta.name ?? details.ship.name}
          suiteTitle={details.suite.title}
          description={details.suite.description}
          highlights={[
            "Spacious rooms with modern interior design.",
            "Panoramic river views from all rooms.",
            "Private balcony with open shower.",
            "Individually controlled air conditioning.",
            "Comfortable beds and premium linen.",
            "Smart satellite TV.",
            "Bedside table, mirror, and cabinet.",
            "Mini refrigerator and reading table.",
            "Luggage storage.",
            "Attached bathrooms with separate wet/dry zones.",
            "Instant geyser.",
            "Central sound system for announcements.",
            "24-hour room service."
          ]}
          bookingInclusions={details.booking.inclusions}
          bookingNotes={details.booking.notes}
        />
      )}

      {details.suite.slug === "panorama-deluxe-suite" && (
        <PanoramaDeluxeSuiteSection
          shipName={ship?.meta.name ?? details.ship.name}
          suiteTitle={details.suite.title}
          description={details.suite.description}
          highlights={[
            "Spacious rooms with modern interior design.",
            "Panoramic river views from all rooms.",
            "Private balcony with open shower.",
            "Individually controlled air conditioning.",
            "Comfortable beds and premium linen.",
            "Smart satellite TV.",
            "Bedside table, mirror, and cabinet.",
            "Mini refrigerator and reading table.",
            "Luggage storage.",
            "Attached bathrooms with separate wet/dry zones.",
            "Instant geyser.",
            "Central sound system for announcements.",
            "24-hour room service."
          ]}
          bookingInclusions={details.booking.inclusions}
          bookingNotes={details.booking.notes}
        />
      )}

      {details.suite.slug === "panorama-king-suite" && (
        <PanoramaKingSuiteSection
          shipName={ship?.meta.name ?? details.ship.name}
          suiteTitle={details.suite.title}
          description={details.suite.description}
          highlights={[
            "Spacious rooms with modern interior design.",
            "Panoramic river views from all rooms.",
            "Private balcony with open shower.",
            "Individually controlled air conditioning.",
            "Comfortable beds and premium linen.",
            "Smart satellite TV.",
            "Bedside table, mirror, and cabinet.",
            "Mini refrigerator and reading table.",
            "Luggage storage.",
            "Attached bathrooms with separate wet/dry zones.",
            "Instant geyser.",
            "Central sound system for announcements.",
            "24-hour room service."
          ]}
          bookingInclusions={details.booking.inclusions}
          bookingNotes={details.booking.notes}
        />
      )}

      {details.suite.slug === "panorama-triple-suite" && (
        <PanoramaTripleSuiteSection
          shipName={ship?.meta.name ?? details.ship.name}
          suiteTitle={details.suite.title}
          description={details.suite.description}
          highlights={[
            "Spacious rooms with modern interior design.",
            "Panoramic river views from all rooms.",
            "Private balcony with open shower.",
            "Individually controlled air conditioning.",
            "Comfortable beds and premium linen.",
            "Smart satellite TV.",
            "Bedside table, mirror, and cabinet.",
            "Mini refrigerator and reading table.",
            "Luggage storage.",
            "Attached bathrooms with separate wet/dry zones.",
            "Instant geyser.",
            "Central sound system for announcements.",
            "24-hour room service."
          ]}
          bookingInclusions={details.booking.inclusions}
          bookingNotes={details.booking.notes}
        />
      )}

      {details.suite.slug === "vip-panorama-triple-suite" && (
        <VipPanoramaTripleSuiteSection
          shipName={ship?.meta.name ?? details.ship.name}
          suiteTitle={details.suite.title}
          description={details.suite.description}
          highlights={[
            "Spacious rooms with modern interior design.",
            "Panoramic river views from all rooms.",
            "Private balcony with open shower.",
            "Individually controlled air conditioning.",
            "Comfortable beds and premium linen.",
            "Smart satellite TV.",
            "Bedside table, mirror, and cabinet.",
            "Mini refrigerator and reading table.",
            "Luggage storage.",
            "Attached bathrooms with separate wet/dry zones.",
            "Instant geyser.",
            "Central sound system for announcements.",
            "24-hour room service."
          ]}
          bookingInclusions={details.booking.inclusions}
          bookingNotes={details.booking.notes}
        />
      )}

    </div>
  );
}
