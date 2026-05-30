const SHIP_ASSET_ROOT = "/ships";
const SHIP_THUMB_ROOT = "/ships/thumbs";
const SHIP_FULL_ROOT = "/ships/full";

type ShipAssetVariant = "thumb" | "full";

function normalizeShipAssetPath(src: string, variant: ShipAssetVariant) {
  if (!src.startsWith(SHIP_ASSET_ROOT + "/")) {
    return src;
  }

  if (src.endsWith("/the-wave-2/ship.jpg")) {
    return src;
  }

  if (/^\/ships\/[^/]+\.(?:jpg|jpeg|JPG|JPEG)$/.test(src)) {
    return src;
  }

  const assetRoot = variant === "thumb" ? SHIP_THUMB_ROOT : SHIP_FULL_ROOT;
  if (src.startsWith(assetRoot + "/")) {
    return src;
  }

  const strippedPath = src
    .replace(SHIP_THUMB_ROOT, SHIP_ASSET_ROOT)
    .replace(SHIP_FULL_ROOT, SHIP_ASSET_ROOT);
  const assetPath = strippedPath.slice(SHIP_ASSET_ROOT.length).replace(/\.[^.\/\?#]+$/, ".webp");
  return `${assetRoot}${assetPath}`;
}

export function getShipThumbAssetPath(src: string) {
  return normalizeShipAssetPath(src, "thumb");
}

export function getShipFullAssetPath(src: string) {
  return normalizeShipAssetPath(src, "full");
}
