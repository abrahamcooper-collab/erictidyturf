/**
 * Cloudinary image URL utility.
 * Provides optimized Cloudinary URLs with automatic format and quality selection.
 */

const CLOUD_NAME = "dcylaqbxa";
const BASE_FOLDER = "erictidyturf";

/**
 * Generate an optimized Cloudinary URL for an image.
 * @param publicId - The Cloudinary public ID (without cloud name prefix)
 * @param options - Optional transformation parameters
 * @returns Optimized Cloudinary URL
 */
export function cloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  }
): string {
  const transforms: string[] = [];
  
  // Auto format and quality for optimal delivery
  transforms.push(options?.format ? `f_${options.format}` : "f_auto");
  transforms.push(options?.quality ? `q_${options.quality}` : "q_auto");
  
  if (options?.width) transforms.push(`w_${options.width}`);
  if (options?.height) transforms.push(`h_${options.height}`);
  
  // Add crop mode if dimensions are specified
  if (options?.width || options?.height) transforms.push("c_fill");
  
  const transformStr = transforms.join(",");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}/${publicId}`;
}

// Pre-built Cloudinary public IDs for common images
export const CLOUDINARY_IMAGES = {
  hero: `${BASE_FOLDER}/hero-image`,
  logo: `${BASE_FOLDER}/logo`,
  beforeAfterBefore: `${BASE_FOLDER}/beforeandafter/before`,
  beforeAfterAfter: `${BASE_FOLDER}/beforeandafter/after`,
} as const;

/**
 * Convert a local image path (e.g. /images/landscaping/IMG_5091.jpg)
 * to a Cloudinary public ID.
 */
export function localPathToCloudinaryId(localPath: string): string {
  // Remove leading slash and file extension
  const withoutSlash = localPath.replace(/^\//, "");
  const withoutExt = withoutSlash.replace(/\.[^.]+$/, "");
  
  // Map local folder structure to Cloudinary folder structure
  // /images/category/filename -> erictidyturf/category/filename
  // /beforeandafter/filename -> erictidyturf/beforeandafter/filename
  const parts = withoutExt.split("/");
  
  if (parts[0] === "images" && parts.length >= 3) {
    // /images/category/filename -> erictidyturf/category/filename
    return `${BASE_FOLDER}/${parts.slice(1).join("/")}`;
  } else {
    // /beforeandafter/filename or /hero-image -> erictidyturf/...
    return `${BASE_FOLDER}/${withoutExt}`;
  }
}

/**
 * Convert a local image path to an optimized Cloudinary URL.
 */
export function optimizedImageUrl(
  localPath: string,
  options?: { width?: number; height?: number }
): string {
  const pubId = localPathToCloudinaryId(localPath);
  return cloudinaryUrl(pubId, options);
}
