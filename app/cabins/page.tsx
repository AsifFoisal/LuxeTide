import { SHIPS } from '@/src/constants';
import { getShipDetails } from '@/src/ship-details';
import CabinsContent from '@/src/components/CabinsContent';
import { getPublicSuitePricing } from '@/src/lib/suite-pricing-server';

interface SuiteData {
  shipId: string;
  shipName: string;
  capacity: string;
  suites: Array<{
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
  }>;
}

export default async function CabinsPage() {
  const suitePricing = await getPublicSuitePricing();
  const allSuites: SuiteData[] = SHIPS.map((ship) => {
    const details = getShipDetails(ship.id, suitePricing);
    return {
      shipId: ship.id,
      shipName: ship.name,
      capacity: ship.capacity,
      suites: details?.suites || [],
    };
  }).filter((item) => item.suites.length > 0);

  return <CabinsContent suites={allSuites} />;

}
