import { CLOUDINARY_MAP } from "./cloudinary-mapping";

const CLOUD_NAME = "dcylaqbxa";
const BASE_FOLDER = "erictidyturf";

const CATEGORY_NAMES: Record<string, string> = {
  "landscaping": "Landscaping",
  "hardscaping": "Hardscaping",
  "landscape-lighting": "Landscape Lighting",
  "drainage": "Drainage",
  "irrigation": "Irrigation",
  "grading": "Grading",
  "sod-installation": "Sod Installation",
  "artificial-turf": "Artificial Turf",
  "landscaping-lawn-maintenance": "Lawn Maintenance",
  "pavers": "Pavers",
};

export interface GalleryItemData {
  src: string;
  categorySlug: string;
  categoryTitle: string;
  filename: string;
}

export interface CategoryOptionData {
  slug: string;
  title: string;
  count: number;
}

/**
 * Returns all gallery items and category stats extracted directly from CLOUDINARY_MAP.
 * Does not depend on filesystem readdirSync at runtime or in production builds.
 */
export function getGalleryData(): { items: GalleryItemData[]; categories: CategoryOptionData[] } {
  const items: GalleryItemData[] = [];
  const categoryCounts: Record<string, number> = {};

  for (const [path, url] of Object.entries(CLOUDINARY_MAP)) {
    const parts = path.replace(/^\//, "").split("/");
    
    if (parts[0] === "images" && parts.length >= 3) {
      const categorySlug = parts[1];
      const filename = parts.slice(2).join("/");
      
      if (CATEGORY_NAMES[categorySlug] && !filename.toLowerCase().endsWith(".mov")) {
        categoryCounts[categorySlug] = (categoryCounts[categorySlug] || 0) + 1;
        items.push({
          src: url,
          categorySlug,
          categoryTitle: CATEGORY_NAMES[categorySlug],
          filename
        });
      }
    } else if (parts[0] === "beforeandafter") {
      const filename = parts.slice(1).join("/");
      categoryCounts["beforeandafter"] = (categoryCounts["beforeandafter"] || 0) + 1;
      items.unshift({
        src: url,
        categorySlug: "beforeandafter",
        categoryTitle: "Before & After",
        filename
      });
    }
  }

  const categories: CategoryOptionData[] = [
    { slug: "all", title: "All Photos", count: items.length },
    ...Object.entries(CATEGORY_NAMES).map(([slug, title]) => ({
      slug,
      title,
      count: categoryCounts[slug] || 0
    })).filter(c => c.count > 0)
  ];

  if (categoryCounts["beforeandafter"]) {
    categories.push({
      slug: "beforeandafter",
      title: "Before & After",
      count: categoryCounts["beforeandafter"]
    });
  }

  return { items, categories };
}

// Fallback mappings for services whose images were deduplicated into a related category
const SERVICE_FALLBACKS: Record<string, string> = {
  "hardscaping": "pavers",
  "landscaping-lawn-maintenance": "landscaping",
};

/**
 * Returns image filenames for a specific service slug extracted directly from CLOUDINARY_MAP.
 * If a service has no images of its own, falls back to a related category.
 */
export function getServiceImages(serviceSlug: string): string[] {
  const filenames: string[] = [];
  const prefix = `/images/${serviceSlug}/`;
  
  for (const path of Object.keys(CLOUDINARY_MAP)) {
    if (path.startsWith(prefix) && !path.toLowerCase().endsWith(".mov")) {
      const fname = path.substring(prefix.length);
      filenames.push(fname);
    }
  }

  // If no images found, try the fallback category
  if (filenames.length === 0 && SERVICE_FALLBACKS[serviceSlug]) {
    return getServiceImages(SERVICE_FALLBACKS[serviceSlug]);
  }

  return filenames;
}

/**
 * Returns the exact, verified Cloudinary URL for a given local image path.
 */
export function optimizedImageUrl(localPath: string, _options?: { width?: number; height?: number }): string {
  if (localPath.startsWith("http://") || localPath.startsWith("https://")) {
    return localPath;
  }
  const normalized = localPath.startsWith("/") ? localPath : `/${localPath}`;
  
  if (CLOUDINARY_MAP[normalized]) {
    return CLOUDINARY_MAP[normalized];
  }
  
  const decoded = decodeURIComponent(normalized);
  if (CLOUDINARY_MAP[decoded]) {
    return CLOUDINARY_MAP[decoded];
  }

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
