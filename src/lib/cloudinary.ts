import { CLOUDINARY_MAP } from "./cloudinary-mapping";

const CLOUD_NAME = "dcylaqbxa";
const BASE_FOLDER = "erictidyturf";

/**
 * Returns the exact, verified Cloudinary URL for a given local image path.
 */
export function optimizedImageUrl(localPath: string, _options?: { width?: number; height?: number }): string {
  // Normalize leading slash
  const normalized = localPath.startsWith("/") ? localPath : `/${localPath}`;
  
  // 1. Check exact mapped Cloudinary URL first
  if (CLOUDINARY_MAP[normalized]) {
    return CLOUDINARY_MAP[normalized];
  }
  
  // 2. Decode URL encoding if present and check again
  const decoded = decodeURIComponent(normalized);
  if (CLOUDINARY_MAP[decoded]) {
    return CLOUDINARY_MAP[decoded];
  }

  // 3. Fallback: Construct direct Cloudinary URL
  const withoutSlash = normalized.replace(/^\//, "");
  const parts = withoutSlash.split("/");
  let publicPath: string;
  if (parts[0] === "images" && parts.length >= 3) {
    publicPath = parts.slice(1).join("/");
  } else {
    publicPath = withoutSlash;
  }
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${BASE_FOLDER}/${publicPath}`;
}

export function cloudinaryUrl(publicId: string, _options?: { width?: number; height?: number; quality?: string; format?: string }): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}.jpg`;
}

export const CLOUDINARY_IMAGES = {
  hero: `${BASE_FOLDER}/hero-image`,
  logo: `${BASE_FOLDER}/logo`,
  beforeAfterBefore: `${BASE_FOLDER}/beforeandafter/before`,
  beforeAfterAfter: `${BASE_FOLDER}/beforeandafter/after`,
} as const;
