import { Ship, Destination, Package } from './types';

export const SHIPS: Ship[] = [
  {
    id: 'the-wave-2',
    name: 'M.V. The Wave 2',
    description:
      'A floating resort crafted for immersive journeys with expansive lounges, play zones, and panoramic suites.',
    image: '/ships/the-wave-2/ship.jpg',
    capacity: 'Luxury Class',
    amenities: ['Play Zone', 'Swimming Pool', 'Infinity Royal Suite', 'Prayer Room']
  },
  {
    id: 'the-wave',
    name: 'M.V. The Wave',
    description:
      'A contemporary cruise ship with signature decks, family-friendly spaces, and refined dining areas.',
    image: '/ships/the-wave/The%20Wave%20Picture/The%20Wave3.jpg',
    capacity: 'Premium Cruise',
    amenities: ['Balcony Views', 'Food Zone', 'Play Ground', 'Conference Hall']
  },
  {
    id: 'the-river-cruise',
    name: 'The River Cruise',
    description:
      'A serene river journey with cinematic sunsets, cozy cabins, and elegant communal spaces.',
    image: '/ships/the-river-cruise/River%20Cruise%20Photo/RiverCruise.jpg',
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
    image:
      'https://images.unsplash.com/photo-1614704170756-1dedf8819001?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'saint-martins',
    name: "Saint Martin's Island",
    description:
      "Bangladesh's only coral island, featuring turquoise waters and serene coconut groves.",
    image:
      'https://images.unsplash.com/photo-1608958141441-0cc938517b18?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'coxs-bazar',
    name: "Cox's Bazar",
    description: 'The world\'s longest natural sandy beach, a gateway to the endless horizon.',
    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'kuakata',
    name: 'Kuakata',
    description: 'Known as the Daughter of the Ocean, where you can witness both sunrise and sunset.',
    image:
      'https://images.unsplash.com/photo-1621532431604-94e803fb2063?auto=format&fit=crop&q=80&w=1200'
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
    id: 'coral-luxury',
    title: 'Coral Island Luxury',
    description: "A private escape to the pristine shores of Saint Martin's.",
    price: 'From ৳120,000',
    duration: '7 Days',
    image: '/ships/the-wave/Layout.jpg'
  }
];

export default {};
