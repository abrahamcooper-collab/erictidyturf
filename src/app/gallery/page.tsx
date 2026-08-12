import fs from "fs";
import path from "path";
import { Metadata } from "next";
import GalleryClient, { GalleryItem, CategoryOption } from "../components/GalleryClient";
import { optimizedImageUrl } from "../../lib/cloudinary";

export const metadata: Metadata = {
  title: "Project Photo Gallery | Eric's Tidy Turf New Orleans",
  description: "View our full photo gallery showcasing landscaping, hardscaping, lawn maintenance, sod installation, drainage, and pavers work across Greater New Orleans.",
};

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

export default function GalleryPage() {
  const imagesBaseDir = path.join(process.cwd(), "public", "images");
  const items: GalleryItem[] = [];
  const categoryCounts: Record<string, number> = {};

  // Scan all category folders inside public/images
  if (fs.existsSync(imagesBaseDir)) {
    const entries = fs.readdirSync(imagesBaseDir);
    
    for (const categorySlug of entries) {
      const categoryPath = path.join(imagesBaseDir, categorySlug);
      
      if (fs.statSync(categoryPath).isDirectory() && CATEGORY_NAMES[categorySlug]) {
        const categoryTitle = CATEGORY_NAMES[categorySlug];
        const files = fs.readdirSync(categoryPath)
          .filter(f => !fs.statSync(path.join(categoryPath, f)).isDirectory() && !f.toLowerCase().endsWith(".mov"));

        categoryCounts[categorySlug] = files.length;

        for (const filename of files) {
          const localPath = `/images/${categorySlug}/${filename}`;
          items.push({
            src: optimizedImageUrl(localPath, { width: 800 }),
            categorySlug,
            categoryTitle,
            filename
          });
        }
      }
    }
  }

  // Before & After images
  const beforeAfterDir = path.join(process.cwd(), "public", "beforeandafter");
  if (fs.existsSync(beforeAfterDir)) {
    const baFiles = fs.readdirSync(beforeAfterDir).filter(f => !f.startsWith("."));
    categoryCounts["beforeandafter"] = baFiles.length;
    for (const filename of baFiles) {
      const localPath = `/beforeandafter/${filename}`;
      items.unshift({
        src: optimizedImageUrl(localPath, { width: 800 }),
        categorySlug: "beforeandafter",
        categoryTitle: "Before & After",
        filename
      });
    }
  }

  // Build categories array for tab filter
  const categories: CategoryOption[] = [
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

  return <GalleryClient items={items} categories={categories} />;
}
