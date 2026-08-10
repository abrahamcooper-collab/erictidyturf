"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export interface GalleryItem {
  src: string;
  categorySlug: string;
  categoryTitle: string;
  filename: string;
}

export interface CategoryOption {
  slug: string;
  title: string;
  count: number;
}

interface GalleryClientProps {
  items: GalleryItem[];
  categories: CategoryOption[];
}

export default function GalleryClient({ items, categories }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(16);

  // Filter items based on active tab
  const filteredItems = activeCategory === "all"
    ? items
    : items.filter(item => item.categorySlug === activeCategory);

  // Reset pagination when category changes
  useEffect(() => {
    setDisplayCount(16);
    setSelectedIndex(null);
  }, [activeCategory]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((selectedIndex + 1) % filteredItems.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

  const visibleItems = filteredItems.slice(0, displayCount);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredItems.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const currentItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <>
      {/* Hero Header */}
      <section
        style={{
          background: "radial-gradient(circle at 80% 20%, #1c451e 0%, var(--color-dark) 100%)",
          color: "#ffffff",
          padding: "9rem 2rem 5rem 2rem",
          textAlign: "center"
        }}
      >
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div
            className="process-tag"
            style={{ color: "var(--color-gold)", border: "none", padding: 0, justifyContent: "center", marginBottom: "1rem" }}
          >
            <span className="process-tag-line" style={{ backgroundColor: "var(--color-gold)" }} />
            OUR WORKMANSHIP
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "3.75rem",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: "1.1",
              marginBottom: "1.25rem"
            }}
          >
            Project Photo Gallery
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "rgba(255, 255, 255, 0.85)",
              maxWidth: "720px",
              margin: "0 auto 2.5rem auto",
              lineHeight: "1.6"
            }}
          >
            Explore real job site photos showcasing 26+ years of craftsmanship across Landscaping, Hardscaping, Sod Installation, Lighting, and Drainage in Greater New Orleans.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/#quote" className="btn btn-primary" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
              Request Free Estimate
            </Link>
            <a
              href="tel:5049091424"
              className="btn"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff",
                padding: "0.85rem 2rem",
                borderRadius: "99px",
                fontSize: "1rem",
                textDecoration: "none"
              }}
            >
              Call (504) 909-1424
            </a>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section style={{ backgroundColor: "#faf9f6", padding: "4rem 2rem 6rem 2rem", minHeight: "60vh" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>

          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              justifyContent: "center",
              marginBottom: "3.5rem"
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  style={{
                    padding: "0.65rem 1.35rem",
                    borderRadius: "99px",
                    border: isActive ? "2px solid var(--color-forest)" : "1px solid rgba(20, 54, 38, 0.15)",
                    backgroundColor: isActive ? "var(--color-forest)" : "#ffffff",
                    color: isActive ? "#ffffff" : "var(--color-forest)",
                    fontSize: "0.925rem",
                    fontWeight: isActive ? 600 : 500,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: isActive ? "0 4px 15px rgba(20, 54, 38, 0.2)" : "0 2px 6px rgba(0,0,0,0.03)"
                  }}
                >
                  <span>{cat.title}</span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.15rem 0.55rem",
                      borderRadius: "99px",
                      backgroundColor: isActive ? "rgba(255,255,255,0.25)" : "rgba(20, 54, 38, 0.08)",
                      color: isActive ? "#ffffff" : "var(--color-forest)"
                    }}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result Counter Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
            <span style={{ color: "#526056", fontSize: "1rem", fontWeight: 500 }}>
              Showing {Math.min(visibleItems.length, filteredItems.length)} of {filteredItems.length} photos
              {activeCategory !== "all" && ` in ${categories.find(c => c.slug === activeCategory)?.title}`}
            </span>
          </div>

          {/* Grid Layout */}
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 2rem", backgroundColor: "#ffffff", borderRadius: "16px" }}>
              <p style={{ fontSize: "1.2rem", color: "#606c64" }}>No images found in this category.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem"
              }}
            >
              {visibleItems.map((item, idx) => (
                <div
                  key={`${item.categorySlug}-${item.filename}-${idx}`}
                  onClick={() => openLightbox(idx)}
                  className="gallery-card"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
                    height: "270px",
                    position: "relative",
                    backgroundColor: "#e2ebd8",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                  }}
                >
                  <img
                    src={item.src}
                    alt={`${item.categoryTitle} project ${idx + 1}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease"
                    }}
                  />
                  {/* Category Tag Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.85rem",
                      left: "0.85rem",
                      backgroundColor: "rgba(10, 25, 12, 0.75)",
                      backdropFilter: "blur(6px)",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "0.35rem 0.75rem",
                      borderRadius: "99px",
                      letterSpacing: "0.3px",
                      zIndex: 2
                    }}
                  >
                    {item.categoryTitle}
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className="gallery-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(10, 25, 12, 0.85) 0%, transparent 60%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "1.25rem",
                      color: "#ffffff"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", fontWeight: 600 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span>Expand Photo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {displayCount < filteredItems.length && (
            <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
              <button
                onClick={() => setDisplayCount((prev) => Math.min(prev + 16, filteredItems.length))}
                className="btn btn-primary"
                style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "99px" }}
              >
                Load More Photos ({filteredItems.length - displayCount} Remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Free Estimate CTA Bar */}
      <section style={{ backgroundColor: "var(--color-dark)", color: "#ffffff", padding: "4.5rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.75rem", marginBottom: "1rem", color: "#ffffff" }}>
            Ready to Transform Your Outdoor Space?
          </h2>
          <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.85)", marginBottom: "2rem", lineHeight: "1.6" }}>
            Get in touch with Eric's Tidy Turf today for your free, no-obligation estimate on any landscaping, hardscaping, sod, or drainage project.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/#quote" className="btn btn-primary" style={{ padding: "1rem 2.25rem", fontSize: "1rem" }}>
              Get Free Estimate
            </Link>
            <a
              href="tel:5049091424"
              className="btn"
              style={{
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff",
                padding: "1rem 2.25rem",
                borderRadius: "99px",
                fontSize: "1rem",
                textDecoration: "none"
              }}
            >
              Call (504) 909-1424
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && currentItem && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(10, 25, 12, 0.96)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem"
          }}
        >
          {/* Lightbox Header Bar */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              left: "2rem",
              right: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#ffffff",
              zIndex: 10001
            }}
          >
            <div>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.5px" }}>
                {currentItem.categoryTitle}
              </span>
              <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", marginLeft: "0.75rem" }}>
                Photo {selectedIndex + 1} of {filteredItems.length}
              </span>
            </div>
            <button
              onClick={closeLightbox}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "none",
                color: "#ffffff",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s ease"
              }}
              title="Close (Esc)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Main Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src={currentItem.src}
              alt={`${currentItem.categoryTitle} view ${selectedIndex + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)"
              }}
            />

            {/* Left Nav Button */}
            {filteredItems.length > 1 && (
              <button
                onClick={showPrev}
                style={{
                  position: "absolute",
                  left: "-4rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                title="Previous photo (Left Arrow)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Right Nav Button */}
            {filteredItems.length > 1 && (
              <button
                onClick={showNext}
                style={{
                  position: "absolute",
                  right: "-4rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                title="Next photo (Right Arrow)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
