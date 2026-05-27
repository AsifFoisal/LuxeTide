export const SUITE_CATALOG_BY_SHIP_ID: Record<string, string[]> = {
  'the-wave-2': [
    'Infinity Royal Suite',
    'Panorama Deluxe Suite',
    'Panorama King Suite',
    'Panorama Triple Suite',
    'VIP Panorama Triple Suite',
  ],
  'the-wave': [
    'Couple Bed Cabin',
    'Family Cabin',
    'Single Bed Cabin',
  ],
  'the-river-cruise': [
    'River View Cabin',
    'Vip Couple Cabin',
    'Bunk Bed Cabin',
  ],
};

export function getSuitesForShip(shipId: string): string[] {
  return SUITE_CATALOG_BY_SHIP_ID[shipId] ?? [];
}