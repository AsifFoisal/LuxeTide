import { Ship, Destination, Package } from './types';

export const SHIPS: Ship[] = [
  {
    id: 'the-wave-2',
    name: 'M.V. The Wave 2',
    description:
      'A floating resort crafted for immersive journeys with expansive lounges, play zones, and panoramic suites.',
    image: '/ships/full/the-wave-2/ship.jpg',
    capacity: 'Luxury Class',
    amenities: ['Play Zone', 'Swimming Pool', 'Infinity Royal Suite', 'Prayer Room']
  },
  {
    id: 'the-wave',
    name: 'M.V. The Wave',
    description:
      'A contemporary cruise ship with signature decks, family-friendly spaces, and refined dining areas.',
    image: '/ship-assets/the-wave.jpg',
    capacity: 'Premium Cruise',
    amenities: ['Balcony Views', 'Food Zone', 'Play Ground', 'Conference Hall']
  },
  {
    id: 'the-river-cruise',
    name: 'The River Cruise',
    description:
      'A serene river journey with cinematic sunsets, cozy cabins, and elegant communal spaces.',
    image: '/ship-assets/river-cruise.jpg',
    capacity: 'Boutique Cruise',
    amenities: ['Scenic Decks', 'Standard Food Menu', 'Comfort Cabins', 'Onboard Facilities']
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'sundarbans',
    name: 'The Sundarbans',
    description:
      'Explore the mystical mangrove forests, home to the majestic Royal Bengal Tiger.',
    image: '/ship-assets/Sundarban_Tiger.jpg'
  }
];

export const PACKAGES: Package[] = [
  {
    id: 'emerald-expedition',
    title: 'Emerald Expedition',
    description: '4 nights exploring the deep Sundarbans and the Bay of Bengal.',
    price: 'From ৳85,000',
    duration: '5 Days',
    image: '/ships/the-wave-2/Layout.jpg'
  },
  {
    id: 'sundarbans-luxury',
    title: 'Sundarbans Delta Luxury',
    description: 'A private escape through the Sundarbans delta with forest-edge luxury.',
    price: 'From ৳120,000',
    duration: '7 Days',
    image: '/ships/the-wave/Layout.jpg'
  }
];

export default {};
