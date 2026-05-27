import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShipDetailsView from "@/src/components/ShipDetailsView";
import { getShipDetails, getShipSlugs } from "@/src/ship-details";
import { getPublicSuitePricing } from "@/src/lib/suite-pricing-server";

export function generateStaticParams() {
  return getShipSlugs().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const details = getShipDetails(id);
  if (!details) {
    return { title: "Ship Not Found" };
  }

  return {
    title: `${details.meta.name} | LuxeTide`,
    description: details.meta.description
  };
}

export default async function ShipDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const suitePricing = await getPublicSuitePricing({ shipId: id });
  const details = getShipDetails(id, suitePricing);
  if (!details) {
    notFound();
  }

  return <ShipDetailsView details={details} />;
}
