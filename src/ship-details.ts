import { SHIPS } from "@/src/constants";
import type { SuitePricing } from "@/src/types";
import type {
  BookingInfo,
  MediaItem,
  MediaSection,
  ShipDetails,
  ShipMeta,
  ShipSuite,
  ShipSuiteDetails,
} from "@/src/ship-types";

type SuiteSeed = {
  title: string;
  priceLabel: string;
  capacityLabel: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  gallery?: Array<{ src: string; title: string }>;
};

type VideoSeed = {
  src: string;
  title: string;
};

type ShipGallerySeed = {
  section: string;
  title: string;
  src: string;
};

const HERO_VIDEO_BY_SLUG: Record<string, string> = {
  "the-wave-2": "https://res.cloudinary.com/doxxexlxe/video/upload/q_auto,vc_auto/v1778941081/The_Wave_2_Child_Zone_u1dfci.mp4",
  "the-wave": "https://res.cloudinary.com/doxxexlxe/video/upload/q_auto,vc_auto/v1778942043/The_Wave_Optimized._pmhf08.mp4",
  "the-river-cruise": "https://res.cloudinary.com/doxxexlxe/video/upload/q_auto,vc_auto/v1778942477/River_Cruise_Ovc_4K_2023_okwngh.mp4",
};

const EXTRA_VIDEOS_BY_SLUG: Record<string, VideoSeed[]> = {
  "the-river-cruise": [
    {
      src: "https://res.cloudinary.com/doxxexlxe/video/upload/v1779445376/WhatsApp_Video_2025-10-18_at_17.17.17_7e3f64fd_sqlud5.mp4",
      title: "River Cruise Walkthrough",
    },
  ],
};

const SHIP_CONTENT: Record<string, Pick<ShipMeta, "tagline" | "about" | "highlights">> = {
  "the-wave-2": {
    tagline: "Flagship Floating Resort",
    about: [
      "M.V. The Wave 2 delivers a full-scale cruise experience with dedicated zones for play, wellness, and relaxation.",
      "From panoramic suites to curated dining and open social decks, every detail is arranged for comfort on long journeys.",
    ],
    highlights: [
      "Infinity Royal Suite collection",
      "Dedicated play and interaction zones",
      "Panorama suite selections",
      "Family-first onboard layouts",
    ],
  },
  "the-wave": {
    tagline: "Signature Bay Cruise",
    about: [
      "M.V. The Wave is built for effortless cruising with generous social spaces, serene cabins, and scenic observation decks.",
      "Its balanced layout blends leisure, dining, and relaxation areas for families and premium group travel.",
    ],
    highlights: [
      "Multi-zone dining and food spaces",
      "Open deck pool views",
      "Family-friendly play areas",
      "Private balcony scenes",
    ],
  },
  "the-river-cruise": {
    tagline: "Classic River Escape",
    about: [
      "The River Cruise offers a calm, cinematic river journey with comfortable cabins and curated communal spaces.",
      "Designed for scenic travel, it pairs open decks with cozy interiors for a complete experience on the water.",
    ],
    highlights: [
      "Spacious cabin layouts",
      "Open deck river views",
      "Onboard facilities and services",
      "Documentary-ready travel routes",
    ],
  },
};

const BOOKING_INFO: Record<string, BookingInfo> = {
  "the-wave-2": {
    pricePerPerson: "From ?85,000 / person",
    inclusions: ["Luxury suite stay", "Dining access", "Onboard recreation", "Concierge support"],
    notes: ["Rates vary by suite category and travel date.", "Menus and special requests are available on the Dining page."],
  },
  "the-wave": {
    pricePerPerson: "B2B ৳16,000 / person — B2C ৳18,000 / person",
    inclusions: ["Premium cabin stay", "Dining access", "Family amenities", "Concierge support"],
    notes: [
      "Rates vary by cabin type and travel date.",
      "Menus and special requests are available on the Dining page.",
      "For foreign guests: government revenue ৳10,500 per person.",
      "Child policy (food & government fees): ৳7,000 per person; bed sharing with parents.",
    ],
  },
  "the-river-cruise": {
    pricePerPerson: "B2B ৳16,000 / person — B2C ৳18,000 / person",
    inclusions: ["Boutique cabin stay", "River dining", "Sightseeing deck access", "Concierge support"],
    notes: [
      "Rates vary by cabin type and route.",
      "Menus and special requests are available on the Dining page.",
      "For foreign guests: government revenue ৳10,500 per person.",
      "Child policy (food & government fees): ৳7,000 per person; bed sharing with parents.",
    ],
  },
};

const SUITES_BY_SLUG: Record<string, SuiteSeed[]> = {
  "the-wave-2": [
    {
      title: "VIP Panorama Triple Suite",
      priceLabel: "From ৳40,000 / person",
      capacityLabel: "Up to 3 guests",
      description: "VIP triple suite with the most elevated presentation in the panorama collection.",
      highlights: ["VIP treatment", "Panorama styling", "Best-in-class comfort"],
      imageSrc: "/ships/the-wave-2/VIP%20Panorama%20Triple%20Suite/DSC04936.jpg",
      gallery: [
        {
          src: "/ships/the-wave-2/VIP%20Panorama%20Triple%20Suite/DSC04936.jpg",
          title: "VIP Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/VIP%20Panorama%20Triple%20Suite/DSC04940.jpg",
          title: "VIP Panorama Triple Suite",
        },
      ],
    },
    {
      title: "Infinity Royal Suite",
      priceLabel: "From ৳32,000 / person",
      capacityLabel: "Up to 2 guests",
      description: "Luxury suite with a private panoramic view and a polished, high-comfort finish.",
      highlights: ["Panoramic views", "Private lounge feel", "Signature luxury finish"],
      imageSrc: "/ships/the-wave-2/Infinity%20Royal%20Suite/Infinity%20Royal%20Suite%20B.jpg",
      gallery: [
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/Infinity%20Royal%20Suite%20B.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC05162.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC05158.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC05161.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC05159.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC05157.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC05160.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC05155.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC05156.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC03589.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC05154.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC03586.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC03594.jpg",
          title: "Infinity Royal Suite",
        },
        {
          src: "/ships/the-wave-2/Infinity%20Royal%20Suite/DSC03580.jpg",
          title: "Infinity Royal Suite",
        },
      ],
    },
    {
      title: "Panorama Deluxe Suite",
      priceLabel: "From ৳30,000 / person",
      capacityLabel: "Up to 2 guests",
      description: "Deluxe suite with a bright layout designed for relaxed cruising and wide-angle views.",
      highlights: ["Wide balcony feel", "Relaxed layout", "Premium suite finish"],
      imageSrc: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/Panorama%20Deluxe%20Suites%20B.jpg",
      gallery: [
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/Panorama%20Deluxe%20Suites%20B.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03453.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03450.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC05171.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC05173.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03442.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03439.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03434.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03424.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03447.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03433.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03436.jpg",
          title: "Panorama Deluxe Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC05175.jpg",
          title: "Panorama Deluxe Suite",
        },
      ],
    },
    {
      title: "Panorama King Suite",
      priceLabel: "From ৳30,000 / person",
      capacityLabel: "Up to 2 guests",
      description: "King suite with a spacious interior and a refined setting for premium travelers.",
      highlights: ["Spacious interior", "Premium privacy", "Elegant finish"],
      imageSrc: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03406.jpg",
      gallery: [
        {
          src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03406.jpg",
          title: "Panorama King Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03402.jpg",
          title: "Panorama King Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03408.jpg",
          title: "Panorama King Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03421.jpg",
          title: "Panorama King Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03416.jpg",
          title: "Panorama King Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03394.jpg",
          title: "Panorama King Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03398.jpg",
          title: "Panorama King Suite",
        },
      ],
    },
    {
      title: "Panorama Triple Suite",
      priceLabel: "From ৳30,000 / person",
      capacityLabel: "Up to 3 guests",
      description: "Triple suite made for small groups with an open layout and broad exterior views.",
      highlights: ["Group-friendly layout", "Broad views", "Comfort for three"],
      imageSrc: "/ships/the-wave-2/Panorama%20Triple%20Suite/Panorama%20Triple%20Suites.jpg",
      gallery: [
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/Panorama%20Triple%20Suites.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03556.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03477.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05182.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03475.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03465.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03460.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03467.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03458.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05214.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05189.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05218.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05188.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05217.jpg",
          title: "Panorama Triple Suite",
        },
        {
          src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05185.jpg",
          title: "Panorama Triple Suite",
        },
      ],
    },
  ],
  "the-wave": [
    {
      title: "Couple Bed Cabin",
      priceLabel: "From ৳16,000 / person",
      capacityLabel: "Up to 2 guests",
      description: "A cozy premium cabin setup for couples and short scenic journeys.",
      highlights: ["Couple-friendly", "Comfort cabin", "Elegant interior"],
      imageSrc: "/ships/the-wave/The%20Wave%20Picture/Couple%20Bed%20The%20Wave.jpg",
      gallery: [
        {
          src: "/ships/the-wave/The%20Wave%20Picture/Couple%20Bed%20The%20Wave.jpg",
          title: "Couple Bed Cabin",
        },
        {
          src: "/ships/the-wave/The%20Wave%20Picture/Couple%20Bed%20The%20Wave%20(2).jpg",
          title: "Couple Bed Cabin",
        },
        {
          src: "/ships/the-wave/The%20Wave%20Picture/Couple%20Bed2%20The%20Wave.jpg",
          title: "Couple Bed Cabin",
        },
        {
          src: "/ships/the-wave/The%20Wave%20Picture/Bathroom%20The%20Wave.jpg",
          title: "Bathroom",
        },
        {
          src: "/ships/the-wave/The%20Wave%20Picture/Wash%20Zone%20The%20Wave.jpg",
          title: "Wash Zone",
        },
      ],
    },
    {
      title: "Family Cabin",
      priceLabel: "From ৳18,000 / person",
      capacityLabel: "Up to 4 guests",
      description: "Family-focused cabin with practical space and easy access to common amenities.",
      highlights: ["Family layout", "Extra space", "Balanced comfort"],
      imageSrc: "/ships/the-wave/The%20Wave%20Picture/4%20Bed%20The%20Wave.jpg",
      gallery: [
        {
          src: "/ships/the-wave/The%20Wave%20Picture/4%20Bed%20The%20Wave.jpg",
          title: "Family Cabin",
        },
        {
          src: "/ships/the-wave/The%20Wave%20Picture/3%20Bed%20The%20Wave.jpg",
          title: "3 Bed Cabin",
        },
      ],
    },
    {
      title: "Single Bed Cabin",
      priceLabel: "From ৳12,000 / person",
      capacityLabel: "Up to 1 guest",
      description: "Compact private cabin ideal for solo guests on shorter trips.",
      highlights: ["Private cabin", "Solo traveler", "Efficient comfort"],
      imageSrc: "/ships/the-wave/The%20Wave%20Picture/Singel%20Bed%20The%20Wave.jpg",
      gallery: [
        {
          src: "/ships/the-wave/The%20Wave%20Picture/Singel%20Bed%20The%20Wave.jpg",
          title: "Single Bed Cabin",
        },
      ],
    },
  ],
  "the-river-cruise": [
    {
      title: "River View Cabin",
      priceLabel: "From ৳16,000 / person",
      capacityLabel: "Up to 2 guests",
      description: "A calm river-facing cabin made for scenic routes and restful nights.",
      highlights: ["River-facing", "Comfort bedding", "Quiet atmosphere"],
      imageSrc: "/ships/the-river-cruise/River%20Cruise%20Photo/2%2B2.JPG",
      gallery: [
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00457.jpg",
          title: "River View Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00447.jpg",
          title: "River View Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00504.jpg",
          title: "River View Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/2%2B2.JPG",
          title: "River View Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00977.JPG",
          title: "River View Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00412.jpg",
          title: "River View Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00508.jpg",
          title: "River View Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00587.jpg",
          title: "River View Cabin",
        },
      ],
    },
    {
      title: "Vip Couple Cabin",
      priceLabel: "From ৳16,000 / person",
      capacityLabel: "Up to 2 guests",
      description: "Premium couple cabin with upgraded furnishings and private comfort.",
      highlights: ["VIP furnishing", "Couple-focused", "Premium comfort"],
      imageSrc: "/ships/the-river-cruise/River%20Cruise%20Photo/Couple%20bed%2001.jpg",
      gallery: [
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/Couple%20bed%2001.jpg",
          title: "VIP Couple Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/2.JPG",
          title: "VIP Couple Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/VIP%20Couple%20bed.jpg",
          title: "VIP Couple Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/02.JPG",
          title: "VIP Couple Cabin",
        },
      ],
    },
    {
      title: "Bunk Bed Cabin",
      priceLabel: "From ৳16,000 / person",
      capacityLabel: "Up to 3 guests",
      description: "Practical multi-guest cabin ideal for group or family river travel.",
      highlights: ["Group-friendly", "Practical layout", "Value comfort"],
      imageSrc: "/ships/the-river-cruise/River%20Cruise%20Photo/2%2B1%20bed%20bank.jpg",
      gallery: [
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/2%2B1%20bed%20bank.jpg",
          title: "Bunk Bed Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/2%2B1%20bed%20bank%2001.jpg",
          title: "Bunk Bed Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/2%2B1%20bed%20bank%2001.jpg",
          title: "Bunk Bed Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00472.jpg",
          title: "Bunk Bed Cabin",
        },
        {
          src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00464.jpg",
          title: "Bunk Bed Cabin",
        },
      ],
    },
  ],
};

const SHIP_GALLERY_SEEDS: Record<string, ShipGallerySeed[]> = {
  "the-wave-2": [
    {
      section: "Balcony",
      title: "Balcony",
      src: "/ships/the-wave-2/Belcony/DSC05233.jpg",
    },
    {
      section: "Balcony",
      title: "Balcony",
      src: "/ships/the-wave-2/Belcony/DSC05229.jpg",
    },
    {
      section: "Changing Room",
      title: "Changing Room",
      src: "/ships/the-wave-2/Changing%20Zone/DSC05225.jpg",
    },
    {
      section: "Inner Corridor",
      title: "Inner Corridor",
      src: "/ships/the-wave-2/INNER%20CORRIDOR/DSC03566.jpg",
    },
    {
      section: "Inner Corridor",
      title: "Inner Corridor",
      src: "/ships/the-wave-2/INNER%20CORRIDOR/DSC03559.jpg",
    },
    {
      section: "Inner Corridor",
      title: "Inner Corridor",
      src: "/ships/the-wave-2/INNER%20CORRIDOR/DSC03483.jpg",
    },
    {
      section: "Inner Corridor",
      title: "Inner Corridor",
      src: "/ships/the-wave-2/INNER%20CORRIDOR/DSC05103.jpg",
    },
    {
      section: "Inner Corridor",
      title: "Inner Corridor",
      src: "/ships/the-wave-2/INNER%20CORRIDOR/DSC05105.jpg",
    },
    {
      section: "Interaction Space",
      title: "Interaction Space",
      src: "/ships/the-wave-2/INTERACTION%20SPACE/DSC03647.jpg",
    },
    {
      section: "Interaction Space",
      title: "Interaction Space",
      src: "/ships/the-wave-2/INTERACTION%20SPACE/DSC05101.jpg",
    },
    {
      section: "Interaction Space",
      title: "Interaction Space",
      src: "/ships/the-wave-2/INTERACTION%20SPACE/DSC05097.jpg",
    },
    {
      section: "Interaction Space",
      title: "Interaction Space",
      src: "/ships/the-wave-2/INTERACTION%20SPACE/DSC05098.jpg",
    },
    {
      section: "Interaction Space",
      title: "Interaction Space",
      src: "/ships/the-wave-2/INTERACTION%20SPACE/DSC05095.jpg",
    },
    {
      section: "Master Bridge",
      title: "Master Bridge",
      src: "/ships/the-wave-2/MASTER%20BRIDGE/DSC03625.jpg",
    },
    {
      section: "Medical Room",
      title: "Medical Room",
      src: "/ships/the-wave-2/Medical%20Room/Medical%20Room.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/Panorama%20Deluxe%20Suites%20B.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03453.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03450.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC05171.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC05173.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03442.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03439.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03434.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03424.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03447.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03433.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC03436.jpg",
    },
    {
      section: "Panorama Deluxe Suite",
      title: "Panorama Deluxe Suite",
      src: "/ships/the-wave-2/Panorama%20Deluxe%20Suite/DSC05175.jpg",
    },
    {
      section: "Panorama King Suite",
      title: "Panorama King Suite",
      src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03406.jpg",
    },
    {
      section: "Panorama King Suite",
      title: "Panorama King Suite",
      src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03402.jpg",
    },
    {
      section: "Panorama King Suite",
      title: "Panorama King Suite",
      src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03408.jpg",
    },
    {
      section: "Panorama King Suite",
      title: "Panorama King Suite",
      src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03421.jpg",
    },
    {
      section: "Panorama King Suite",
      title: "Panorama King Suite",
      src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03416.jpg",
    },
    {
      section: "Panorama King Suite",
      title: "Panorama King Suite",
      src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03394.jpg",
    },
    {
      section: "Panorama King Suite",
      title: "Panorama King Suite",
      src: "/ships/the-wave-2/Panorama%20King%20Suite/DSC03398.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/Panorama%20Triple%20Suites.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03556.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03477.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05182.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03475.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03465.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03460.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03467.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC03458.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05214.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05189.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05218.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05188.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05217.jpg",
    },
    {
      section: "Panorama Triple Suite",
      title: "Panorama Triple Suite",
      src: "/ships/the-wave-2/Panorama%20Triple%20Suite/DSC05185.jpg",
    },
    {
      section: "Passenger Lift",
      title: "Passenger Lift",
      src: "/ships/the-wave-2/PASSENGER%20LIFT/DSC03630.jpg",
    },
    {
      section: "Passenger Lift",
      title: "Passenger Lift",
      src: "/ships/the-wave-2/PASSENGER%20LIFT/DSC03635.jpg",
    },
    {
      section: "Play Zone",
      title: "Play Zone",
      src: "/ships/the-wave-2/PLAY%20ZONE/DSC03932.jpg",
    },
    {
      section: "Play Zone",
      title: "Play Zone",
      src: "/ships/the-wave-2/PLAY%20ZONE/DSC03946.jpg",
    },
    {
      section: "Play Zone",
      title: "Play Zone",
      src: "/ships/the-wave-2/PLAY%20ZONE/DSC03920.jpg",
    },
    {
      section: "Play Zone",
      title: "Play Zone",
      src: "/ships/the-wave-2/PLAY%20ZONE/DSC03936.jpg",
    },
    {
      section: "Play Zone",
      title: "Play Zone",
      src: "/ships/the-wave-2/PLAY%20ZONE/DSC03931.jpg",
    },
    {
      section: "Play Zone",
      title: "Play Zone",
      src: "/ships/the-wave-2/PLAY%20ZONE/DSC03939.jpg",
    },
    {
      section: "Play Zone",
      title: "Play Zone",
      src: "/ships/the-wave-2/PLAY%20ZONE/DSC03926.jpg",
    },
    {
      section: "Play Zone",
      title: "Play Zone",
      src: "/ships/the-wave-2/PLAY%20ZONE/DSC05093.jpg",
    },
    {
      section: "Play Zone",
      title: "Play Zone",
      src: "/ships/the-wave-2/PLAY%20ZONE/DSC05086.jpg",
    },
    {
      section: "Prayer Room",
      title: "Prayer Room",
      src: "/ships/the-wave-2/PRAYER%20ROOM/Prayer%20Room.jpg",
    },
    {
      section: "Reception",
      title: "Reception",
      src: "/ships/the-wave-2/RECEPTION/DSC05243.jpg",
    },
    {
      section: "Reception",
      title: "Reception",
      src: "/ships/the-wave-2/RECEPTION/DSC05245.jpg",
    },
    {
      section: "Reception",
      title: "Reception",
      src: "/ships/the-wave-2/RECEPTION/DSC05240.jpg",
    },
    {
      section: "Ship Stairs",
      title: "Ship Stairs",
      src: "/ships/the-wave-2/SHIP%20STAIRS/DSC03650.jpg",
    },
    {
      section: "Ship Stairs",
      title: "Ship Stairs",
      src: "/ships/the-wave-2/SHIP%20STAIRS/DSC03638.jpg",
    },
    {
      section: "Ship Stairs",
      title: "Ship Stairs",
      src: "/ships/the-wave-2/SHIP%20STAIRS/DSC03641.jpg",
    },
    {
      section: "Ship Stairs",
      title: "Ship Stairs",
      src: "/ships/the-wave-2/SHIP%20STAIRS/DSC05235.jpg",
    },
    {
      section: "Spa Area",
      title: "Spa Area",
      src: "/ships/the-wave-2/SPA%20AREA/01.jpg",
    },
    {
      section: "Spa Area",
      title: "Spa Area",
      src: "/ships/the-wave-2/SPA%20AREA/03.jpg",
    },
    {
      section: "Spa Area",
      title: "Spa Area",
      src: "/ships/the-wave-2/SPA%20AREA/02.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-wave-2/Swimming%20Pool/DSC05148.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-wave-2/Swimming%20Pool/DSC03812.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-wave-2/Swimming%20Pool/DSC05195.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-wave-2/Swimming%20Pool/DSC03831.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-wave-2/Swimming%20Pool/DSC05194.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-wave-2/Swimming%20Pool/DSC05151.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-wave-2/Swimming%20Pool/DSC03901-Enhanced-NR.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-wave-2/Swimming%20Pool/DSC03912-Enhanced-NR.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-wave-2/Swimming%20Pool/DSC03807.jpg",
    },
    {
      section: "Vip Panorama Triple Suite",
      title: "Vip Panorama Triple Suite",
      src: "/ships/the-wave-2/VIP%20Panorama%20Triple%20Suite/DSC04936.jpg",
    },
    {
      section: "Vip Panorama Triple Suite",
      title: "Vip Panorama Triple Suite",
      src: "/ships/the-wave-2/VIP%20Panorama%20Triple%20Suite/DSC04940.jpg",
    },
    {
      section: "Zipline Skyvista",
      title: "Zipline Skyvista",
      src: "/ships/the-wave-2/Zipline%20Skyvista/DSC03872-Enhanced-NR.jpg",
    },
  ],
  "the-wave": [
    {
      section: "Bedrooms & Suites",
      title: "Wash Zone",
      src: "/ships/the-wave/The%20Wave%20Picture/Wash%20Zone%20The%20Wave.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-wave/The%20Wave%20Picture/Suming%20Pool%20The%20Wave.jpg",
    },
    {
      section: "Exterior Views",
      title: "The Wave Exterior",
      src: "/ships/the-wave/The%20Wave%20Picture/The%20Wave3.jpg",
    },
    {
      section: "Exterior Views",
      title: "The Wave Panorama",
      src: "/ships/the-wave/The%20Wave%20Picture/The%20Wave%20pp.jpg",
    },
    {
      section: "Exterior Views",
      title: "The Wave Bow",
      src: "/ships/the-wave/The%20Wave%20Picture/The%20Wave%20Big%20Head.jpg",
    },
    {
      section: "Play Zone",
      title: "Play Ground",
      src: "/ships/the-wave/The%20Wave%20Picture/Play%20Ground%20The%20Wave.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool Top View",
      src: "/ships/the-wave/The%20Wave%20Picture/Suming%20Pool%20Top%20View%20The%20Wave.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "Single Bed Cabin",
      src: "/ships/the-wave/The%20Wave%20Picture/Singel%20Bed%20The%20Wave.jpg",
    },
    {
      section: "Play Zone",
      title: "Movie Zone and Conference",
      src: "/ships/the-wave/The%20Wave%20Picture/Movie%20Zone%20and%20Conference%20The%20Wave.jpg",
    },
    {
      section: "Food Zone",
      title: "Food Zone",
      src: "/ships/the-wave/The%20Wave%20Picture/Food%20Zone%20The%20Wave2.jpg",
    },
    {
      section: "Food Zone",
      title: "Conference and Dining",
      src: "/ships/the-wave/The%20Wave%20Picture/Conference%20and%20Dining%20The%20Wave2.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "Couple Bed Cabin",
      src: "/ships/the-wave/The%20Wave%20Picture/Couple%20Bed2%20The%20Wave.jpg",
    },
    {
      section: "Food Zone",
      title: "Food Zone",
      src: "/ships/the-wave/The%20Wave%20Picture/Food%20Zone%20The%20Wave1.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "Family Cabin",
      src: "/ships/the-wave/The%20Wave%20Picture/4%20Bed%20The%20Wave.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "Couple Bed Cabin",
      src: "/ships/the-wave/The%20Wave%20Picture/Couple%20Bed%20The%20Wave%20(2).jpg",
    },
    {
      section: "Corridor",
      title: "Corridor",
      src: "/ships/the-wave/The%20Wave%20Picture/Corridor%20The%20Wave.jpg",
    },
    {
      section: "Exterior Views",
      title: "The Wave Back View",
      src: "/ships/the-wave/The%20Wave%20Picture/Back%20Side%20The%20Wave.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "Couple Bed Cabin",
      src: "/ships/the-wave/The%20Wave%20Picture/Couple%20Bed%20The%20Wave.jpg",
    },
    {
      section: "Food Zone",
      title: "Conference and Dining",
      src: "/ships/the-wave/The%20Wave%20Picture/Conference%20and%20Dining%20The%20Wave1.jpg",
    },
    {
      section: "Corridor",
      title: "Stairs",
      src: "/ships/the-wave/The%20Wave%20Picture/Stears%20The%20Wave.jpg",
    },
    {
      section: "Balcony",
      title: "Balcony",
      src: "/ships/the-wave/The%20Wave%20Picture/Balcony%20The%20Wave.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "Bathroom",
      src: "/ships/the-wave/The%20Wave%20Picture/Bathroom%20The%20Wave.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "3 Bed Cabin",
      src: "/ships/the-wave/The%20Wave%20Picture/3%20Bed%20The%20Wave.jpg",
    },
    {
      section: "Exterior Views",
      title: "The Wave Exterior View 1",
      src: "/ships/the-wave/The%20Wave%20Picture/WhatsApp%20Image%202023-11-07%20at%2018.57.52_0661e98b.jpg",
    },
    {
      section: "Exterior Views",
      title: "The Wave Exterior View 2",
      src: "/ships/the-wave/The%20Wave%20Picture/WhatsApp%20Image%202023-11-07%20at%2018.57.51_86f19d81.jpg",
    },
    {
      section: "Exterior Views",
      title: "The Wave Exterior View 3",
      src: "/ships/the-wave/The%20Wave%20Picture/WhatsApp%20Image%202023-11-07%20at%2018.57.51_7737f289.jpg",
    },
  ],
  "the-river-cruise": [
    {
      section: "Food Zone",
      title: "Food Zone",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00540.jpg",
    },
    {
      section: "Food Zone",
      title: "Food Zone",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00528.jpg",
    },
    {
      section: "Food Zone",
      title: "Food Zone",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00994.JPG",
    },
    {
      section: "Food Zone",
      title: "Food Zone",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/WhatsApp%20Image%202025-10-18%20at%2017.17.33_9f0fe121.jpg",
    },
    {
      section: "Food Zone",
      title: "Food Zone",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/WhatsApp%20Image%202025-10-18%20at%2017.17.34_7ba6ebb3.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/WhatsApp%20Image%202025-10-18%20at%2017.17.35_2a5ec885.jpg",
    },
    {
      section: "Swimming Pool",
      title: "Swimming Pool",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/WhatsApp%20Image%202025-10-18%20at%2017.17.34_cf175208.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "VIP Couple Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/Couple%20bed%2001.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "VIP Couple Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/2.JPG",
    },
    {
      section: "Bedrooms & Suites",
      title: "VIP Couple Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/VIP%20Couple%20bed.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "VIP Couple Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/02.JPG",
    },
    {
      section: "Bedrooms & Suites",
      title: "Bunk Bed Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/2%2B1%20bed%20bank.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "Bunk Bed Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/2%2B1%20bed%20bank%2001.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "Bunk Bed Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/2%2B1%20bed%20bank%2001.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "Bunk Bed Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00472.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "Bunk Bed Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00464.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "River View Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00457.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "River View Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00447.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "River View Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00504.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "River View Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/2%2B2.JPG",
    },
    {
      section: "Bedrooms & Suites",
      title: "River View Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00977.JPG",
    },
    {
      section: "Bedrooms & Suites",
      title: "River View Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00412.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "River View Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00508.jpg",
    },
    {
      section: "Bedrooms & Suites",
      title: "River View Cabin",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/DSC00587.jpg",
    },
    {
      section: "Exterior Views",
      title: "Exterior",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/WhatsApp%20Image%202025-10-18%20at%2017.17.35_3bc72f52.jpg",
    },
    {
      section: "Exterior Views",
      title: "Exterior",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/WhatsApp%20Image%202025-10-18%20at%2017.17.33_5cd38f11.jpg",
    },
    {
      section: "Exterior Views",
      title: "Exterior",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/WhatsApp%20Image%202025-10-18%20at%2017.17.34_14d530e3.jpg",
    },
    {
      section: "Exterior Views",
      title: "River Cruise Exterior",
      src: "/ships/the-river-cruise/River%20Cruise%20Photo/RiverCruise.jpg",
    },
  ],
};

const DEFAULT_SHIP_AREA_LABELS = [
  "Balcony",
  "Corridor",
  "Play Zone",
  "Food Zone",
  "Swimming Pool",
  "Bedrooms & Suites",
  "Exterior Views",
];

const SHIP_AREA_LABELS_BY_SLUG: Record<string, string[]> = {
  "the-wave-2": [
    "Balcony",
    "Changing Room",
    "Inner Corridor",
    "Interaction Space",
    "Master Bridge",
    "Medical Room",
    "Passenger Lift",
    "Play Zone",
    "Prayer Room",
    "Reception",
    "Ship Stairs",
    "Spa Area",
    "Swimming Pool",
    "Zipline Skyvista",
  ],
  "the-river-cruise": [
    "Food Zone",
    "Swimming Pool",
    "Bedrooms & Suites",
    "Exterior Views",
  ],
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mediaImage(src: string, title: string): MediaItem {
  return {
    src,
    title,
    type: "image",
    caption: title,
  };
}

function mediaVideo(src: string, title: string): MediaItem {
  return {
    src,
    title,
    type: "video",
  };
}

function uniqueMediaItems(items: MediaItem[]): MediaItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.src)) {
      return false;
    }
    seen.add(item.src);
    return true;
  });
}

function buildSuites(slug: string): ShipSuite[] {
  const seeds = SUITES_BY_SLUG[slug] ?? [];
  return seeds.map((seed) => {
    const image = mediaImage(seed.imageSrc, seed.title);
    const gallery = uniqueMediaItems([
      image,
      ...(seed.gallery ?? []).map((item) => mediaImage(item.src, item.title)),
    ]);
    return {
      slug: slugify(seed.title),
      title: seed.title,
      priceLabel: seed.priceLabel,
      capacityLabel: seed.capacityLabel,
      description: seed.description,
      highlights: seed.highlights,
      image,
      gallery,
    };
  });
}

function normalizeSuiteKey(value: string) {
  return value.trim().toLowerCase();
}

function formatMoney(value: number) {
  const rounded = Math.round(value);
  return Number.isFinite(rounded) ? rounded.toLocaleString("en-IN") : String(value);
}

function formatSuitePriceLabel(pricing: SuitePricing) {
  const hasB2B = typeof pricing.b2bPricePerNight === 'number';
  const hasB2C = typeof pricing.b2cPricePerNight === 'number';

  if (hasB2B && hasB2C) {
    return `B2B ৳${formatMoney(pricing.b2bPricePerNight!)} / Person — B2C ৳${formatMoney(pricing.b2cPricePerNight!)} / Person`;
  }

  return `From ৳${formatMoney(pricing.pricePerNight)} / Person`;
}

function formatSuiteCapacity(capacity: number) {
  if (!Number.isFinite(capacity) || capacity < 1) {
    return "";
  }

  const label = capacity === 1 ? "guest" : "guests";
  return `Up to ${capacity} ${label}`;
}

function applySuitePricing(details: ShipDetails, pricing?: SuitePricing[]): ShipDetails {
  if (!pricing || pricing.length === 0) {
    return details;
  }

  const pricingByKey = new Map<string, SuitePricing>();

  pricing
    .filter((row) => row.shipId === details.meta.id)
    .forEach((row) => {
      if (row.suiteName) {
        pricingByKey.set(normalizeSuiteKey(row.suiteName), row);
      }
      if (row.suiteSlug) {
        pricingByKey.set(normalizeSuiteKey(row.suiteSlug), row);
      }
    });

  const suites = details.suites.map((suite) => {
    const match =
      pricingByKey.get(normalizeSuiteKey(suite.title)) ??
      pricingByKey.get(normalizeSuiteKey(suite.slug));

    if (!match) {
      return suite;
    }

    const capacityLabel = formatSuiteCapacity(match.capacity);

    return {
      ...suite,
      priceLabel: formatSuitePriceLabel(match),
      capacityLabel: capacityLabel || suite.capacityLabel,
      description: match.description || suite.description,
    };
  });

  return {
    ...details,
    suites,
  };
}

export function getShipSlugs() {
  return SHIPS.map((ship) => ship.id);
}

export function getShipSuiteParams() {
  return SHIPS.flatMap((ship) => {
    const details = getShipDetails(ship.id);
    return details?.suites.map((suite) => ({ id: ship.id, suite: suite.slug })) ?? [];
  });
}

export function getShipDetails(slug: string, suitePricing?: SuitePricing[]): ShipDetails | null {
  const ship = SHIPS.find((item) => item.id === slug);
  if (!ship) {
    return null;
  }

  const content = SHIP_CONTENT[slug] ?? {
    tagline: "Signature Voyage",
    about: ["An elevated cruise experience designed for comfort, space, and memorable journeys."],
    highlights: ship.amenities,
  };

  const meta: ShipMeta = {
    id: ship.id,
    slug,
    name: ship.name,
    tagline: content.tagline,
    description: ship.description,
    capacityLabel: ship.capacity,
    amenities: ship.amenities,
    about: content.about,
    highlights: content.highlights,
  };

  const suites = buildSuites(slug);
  const suiteSections: MediaSection[] = suites.map((suite) => ({
    id: suite.slug,
    title: suite.title,
    items: suite.gallery,
  }));

  const shipGallerySeeds = SHIP_GALLERY_SEEDS[slug] ?? [];

  const SUITE_SECTION_NAMES = [
    "Infinity Royal Suite",
    "Panorama Deluxe Suite",
    "Panorama King Suite",
    "Panorama Triple Suite",
    "Vip Panorama Triple Suite",
  ];

  const shipGallerySeedsFiltered = shipGallerySeeds.filter((seed) => {
    if (slug === "the-wave-2" && SUITE_SECTION_NAMES.includes(seed.section)) {
      return false;
    }
    return true;
  });

  const shipAreaLabels = SHIP_AREA_LABELS_BY_SLUG[slug] ?? DEFAULT_SHIP_AREA_LABELS;
  
  const gallerySections: MediaSection[] = shipAreaLabels
    .map((label) => ({
      id: label.toLowerCase().replace(/\s+/g, "-"),
      title: label,
      items: uniqueMediaItems(
        shipGallerySeedsFiltered
          .filter((seed) => seed.section === label)
          .map((seed) => mediaImage(seed.src, seed.title))
      ),
    }))
    .filter((section) => section.items.length > 0);

  const heroVideoSrc = HERO_VIDEO_BY_SLUG[slug];
  const extraVideoSeeds = EXTRA_VIDEOS_BY_SLUG[slug] ?? [];
  const heroVideo = heroVideoSrc
    ? {
        src: heroVideoSrc,
        title: `${ship.name} Hero Video`,
        type: "video" as const,
      }
    : undefined;
  const extraVideos = extraVideoSeeds.map((video) => mediaVideo(video.src, video.title));
  const videos = heroVideo ? [heroVideo, ...extraVideos] : extraVideos;

  const details: ShipDetails = {
    meta,
    hero: {
      video: heroVideo,
      image: mediaImage(ship.image, ship.name),
    },
    gallerySections,
    suiteSections,
    suites,
    foodSections: [],
    docs: [],
    booking: BOOKING_INFO[slug] ?? {
      pricePerPerson: "Price on request / person",
      inclusions: ["Cabin stay", "Dining access", "Concierge support"],
      notes: ["Final price depends on ship, cabin category, and travel date."],
    },
    videos,
  };

  return applySuitePricing(details, suitePricing);
}

export function getShipSuiteDetails(
  shipSlug: string,
  suiteSlug: string,
  suitePricing?: SuitePricing[]
): ShipSuiteDetails | null {
  const details = getShipDetails(shipSlug, suitePricing);
  if (!details) {
    return null;
  }

  const suite = details.suites.find((item) => item.slug === suiteSlug);
  if (!suite) {
    return null;
  }

  return {
    ship: details.meta,
    booking: details.booking,
    suite,
  };
}
