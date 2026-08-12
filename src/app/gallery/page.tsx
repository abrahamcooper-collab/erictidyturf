import { Metadata } from "next";
import GalleryClient from "../components/GalleryClient";
import { getGalleryData } from "../../lib/cloudinary";

export const metadata: Metadata = {
  title: "Project Photo Gallery | Eric's Tidy Turf New Orleans",
  description: "View our full photo gallery showcasing landscaping, hardscaping, lawn maintenance, sod installation, drainage, and pavers work across Greater New Orleans.",
};

export default function GalleryPage() {
  const { items, categories } = getGalleryData();
  return <GalleryClient items={items} categories={categories} />;
}
