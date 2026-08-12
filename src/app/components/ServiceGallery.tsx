"use client";

import { useState } from "react";
import { optimizedImageUrl } from "../../lib/cloudinary";

interface ServiceGalleryProps {
  images: string[];
  serviceTitle: string;
  serviceSlug: string;
}

export default function ServiceGallery({ images, serviceTitle, serviceSlug }: ServiceGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(12);

  if (!images || images.length === 0) {
    return null;
  }

  const visibleImages = images.slice(0, displayCount);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="faq-section" style={{ backgroundColor: "#faf9f6", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        {/* Section Header */}
        <div className="faq-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="faq-tag" style={{ justifyContent: "center" }}>
            <span className="faq-tag-line" />
            VERIFIED PROJECTS
          </div>
          <h2 className="faq-heading" style={{ fontSize: "3rem" }}>
            {serviceTitle} Photo Gallery
          </h2>
          <p style={{ color: "#606c64", fontSize: "1.1rem", marginTop: "0.5rem" }}>
            Real job site photos showcasing our {serviceTitle.toLowerCase()} craftsmanship across Greater New Orleans.
          </p>
        </div>

        {/* Responsive Image Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {visibleImages.map((imgName, idx) => (
            <div
              key={imgName}
              onClick={() => openLightbox(idx)}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
                height: "260px",
                position: "relative",
                backgroundColor: "#e2ebd8",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              className="gallery-card"
            >
              <img
                src={optimizedImageUrl(`/images/${serviceSlug}/${imgName}`, { width: 600 })}
                alt={`${serviceTitle} project ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.25rem",
                  color: "#ffffff"
                }}
                className="gallery-overlay"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", fontWeight: 600 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>View Full Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayCount < images.length && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button
              onClick={() => setDisplayCount(prev => Math.min(prev + 12, images.length))}
              className="btn btn-primary"
              style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "99px" }}
            >
              View More {serviceTitle} Photos ({images.length - displayCount} Remaining)
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(10, 25, 12, 0.95)",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem"
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              left: "2rem",
              right: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#ffffff"
            }}
          >
            <span style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "0.5px" }}>
              {serviceTitle} · Photo {selectedIndex + 1} of {images.length}
            </span>
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
                justifyContent: "center"
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Main Image View */}
          <div
            onClick={e => e.stopPropagation()}
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
              src={optimizedImageUrl(`/images/${serviceSlug}/${images[selectedIndex]}`, { width: 1400 })}
              alt={`${serviceTitle} expanded view ${selectedIndex + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)"
              }}
            />

            {/* Left Nav Button */}
            {images.length > 1 && (
              <button
                onClick={showPrev}
                style={{
                  position: "absolute",
                  left: "-3rem",
                  background: "rgba(255, 255, 255, 0.2)",
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
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Right Nav Button */}
            {images.length > 1 && (
              <button
                onClick={showNext}
                style={{
                  position: "absolute",
                  right: "-3rem",
                  background: "rgba(255, 255, 255, 0.2)",
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
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(25, 61, 27, 0.15) !important;
        }
        .gallery-card:hover img {
          transform: scale(1.05);
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
