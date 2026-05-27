import { SHIPS } from '@/src/constants';
import { getShipDetails } from '@/src/ship-details';

type HomeSuite = {
  slug: string;
  title: string;
  priceLabel: string;
  ship: string;
  shipId: string;
  image?: { src: string };
};

export async function GET() {
  try {
    const allSuites: HomeSuite[] = SHIPS.flatMap((ship) => {
      const details = getShipDetails(ship.id);
      const suites = details?.suites ?? [];

      return suites.map((suite) => ({
        slug: suite.slug,
        title: suite.title,
        priceLabel: suite.priceLabel,
        ship: ship.name,
        shipId: ship.id,
        image: suite.image?.type === 'image' ? { src: suite.image.src } : undefined,
      }));
    });

    return Response.json(allSuites);
  } catch (error) {
    console.error('Error fetching suites:', error);
    return Response.json([], { status: 500 });
  }
}
