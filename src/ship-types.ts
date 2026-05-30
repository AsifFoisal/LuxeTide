export type MediaType = "image" | "video" | "pdf";

export interface MediaItem {
  src: string;
  title: string;
  type: MediaType;
  caption?: string;
  thumbnailSrc?: string;
}


export interface MediaSection {
  id: string;
  title: string;
  description?: string;
  items: MediaItem[];
}

export interface BookingInfo {
  pricePerPerson: string;
  inclusions: string[];
  notes: string[];
}

export interface ShipSuite {
  slug: string;
  title: string;
  priceLabel: string;
  capacityLabel: string;
  description: string;
  highlights: string[];
  image?: MediaItem;
  gallery: MediaItem[];
}

export interface ShipMeta {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  capacityLabel: string;
  amenities: string[];
  about: string[];
  highlights: string[];
}

export interface ShipDetails {
  meta: ShipMeta;
  hero: {
    video?: MediaItem;
    image?: MediaItem;
  };
  gallerySections: MediaSection[];
  suiteSections: MediaSection[];
  suites: ShipSuite[];
  foodSections: MediaSection[];
  docs: MediaSection[];
  booking: BookingInfo;
  videos: MediaItem[];
}

export interface ShipSuiteDetails {
  ship: ShipMeta;
  booking: BookingInfo;
  suite: ShipSuite;
}
