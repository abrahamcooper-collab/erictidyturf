import Link from "next/link";
import { notFound } from "next/navigation";
import FaqAccordion from "../../components/FaqAccordion";
import ServiceGallery from "../../components/ServiceGallery";
import { getServiceImages } from "../../../lib/cloudinary";

const SERVICES_DATA: Record<string, {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  faqs: { q: string; a: string }[];
}> = {
  "landscaping": {
    title: "Landscaping",
    tagline: "Custom landscape installations, garden bed planting, and soil preparation.",
    description: "Transform your outdoor property with professional landscaping solutions. From plant bed installation and fresh mulch to ornamental shrub planting and hedge edging, our crew delivers long-lasting outdoor quality.",
    features: [
      "Plant & Shrub Installation",
      "Mulch & River Rock Bed Edging",
      "Foundation Garden Bed Creation",
      "Property Beautification & Ground Prep"
    ],
    faqs: [
      { q: "What plants work best in South Louisiana?", a: "We select native and climate-resilient plants, shrubs, and hedges tailored for local soil and drainage." },
      { q: "Do you install bed edging?", a: "Yes, we install stone, paver, metal, and brick edging to keep garden beds clean and contained." }
    ]
  },
  "hardscaping": {
    title: "Hardscaping",
    tagline: "Durable retaining walls, stone borders, and solid outdoor structures.",
    description: "Elevate your outdoor property with custom hardscaping installations. We build strong retaining walls, stone borders, patio steps, and decorative masonry built for Louisiana soil conditions.",
    features: [
      "Retaining Wall Construction",
      "Decorative Stone & Rock Borders",
      "Patio & Walkway Masonry",
      "Structural Slope Stabilization"
    ],
    faqs: [
      { q: "How do you prepare the base for hardscaping?", a: "We excavate, compact aggregate stone base material, and install proper base leveling to prevent settling." },
      { q: "Can hardscaping assist with erosion?", a: "Yes, properly engineered retaining walls and rock barriers prevent soil washout." }
    ]
  },
  "landscape-lighting": {
    title: "Landscape Lighting",
    tagline: "Low-voltage architectural outdoor lighting and pathway illumination.",
    description: "Enhance safety and nighttime curb appeal with custom low-voltage LED landscape lighting. We install energy-efficient path lights, spotlighting for foliage, and outdoor architectural accent illumination.",
    features: [
      "Low-Voltage Brass & Aluminum Fixtures",
      "Path & Walkway Safety Illumination",
      "Tree & Shrub Up-lighting",
      "Automated Timers & Smart Control Systems"
    ],
    faqs: [
      { q: "Are low-voltage systems energy efficient?", a: "Yes, modern low-voltage LED fixtures consume up to 80% less power than standard fixtures." },
      { q: "Can lighting be added to existing landscapes?", a: "Absolutely. We cleanly bury low-voltage wiring with minimal disruption to lawns and garden beds." }
    ]
  },
  "drainage": {
    title: "Drainage",
    tagline: "French drains, catch basins, surface grading, and heavy rain mitigation.",
    description: "Protect your foundation and prevent yard flooding with custom drainage solutions. We install French drains, catch basins, downspout extensions, and sub-surface piping designed for Greater New Orleans rainfall.",
    features: [
      "Perforated French Drain Systems",
      "Catch Basin & Surface Grate Installation",
      "Sub-Surface Downspout Runoff Piping",
      "Standing Water & Sump Pump Solutions"
    ],
    faqs: [
      { q: "How do I know if I need a French drain?", a: "If water pools against your foundation or stays standing in your yard hours after heavy rain, sub-surface drainage is recommended." },
      { q: "Where does the collected water discharge?", a: "We pipe water safely to pop-up emitters at the street, curb, or proper municipal discharge points." }
    ]
  },
  "irrigation": {
    title: "Irrigation",
    tagline: "Automatic sprinkler systems, drip irrigation, and water management.",
    description: "Keep your grass and garden beds healthy year-round with automated irrigation systems. We install spray heads, drip lines, zone valves, and rain sensors optimized for lawn health.",
    features: [
      "Automated Lawn Sprinkler Zones",
      "Drip Irrigation for Plant Beds",
      "Smart Controllers & Rain Sensors",
      "System Maintenance & Head Repair"
    ],
    faqs: [
      { q: "Do you install smart irrigation controllers?", a: "Yes, Wi-Fi smart controllers automatically adjust watering schedules based on local rainfall." },
      { q: "Can drip irrigation save water?", a: "Drip irrigation delivers water directly to plant root zones, minimizing evaporation and runoff." }
    ]
  },
  "grading": {
    title: "Grading",
    tagline: "Laser ground leveling, dirt pad prep, and slope correction.",
    description: "Achieve proper property elevation with precision land grading. We prepare dirt pads, smooth uneven lawns, clear debris, and grade slopes to ensure correct water flow away from structures.",
    features: [
      "Skid Steer & Bobcat Excavation",
      "Sub-Base & Topsoil Leveling",
      "Foundation Slope & Swale Shaping",
      "Preparation for Sod & Paver Projects"
    ],
    faqs: [
      { q: "Why is property grading important before sod?", a: "Proper grading removes high spots, fills low pockets, and ensures a smooth root layer for healthy sod." },
      { q: "Do you handle heavy excavation equipment?", a: "Yes, our team operates skid steers and compact loaders to handle all scale grading jobs." }
    ]
  },
  "sod-installation": {
    title: "Sod Installation",
    tagline: "Fresh Palmetto St. Augustine, Zoysia, and Bermuda grass turf installation.",
    description: "Upgrade your yard with immediate green lawn coverage. We remove existing weeds, grade fresh topsoil, lay high-grade sod pallets, and rolling-press for instant root establishment.",
    features: [
      "Palmetto St. Augustine, Zoysia & Bermuda Sod",
      "Old Lawn Stripping & Dirt Tilling",
      "Fresh Topsoil & Fertilizer Base Layer",
      "Turf Rolling & Initial Watering Setup"
    ],
    faqs: [
      { q: "How long until new sod takes root?", a: "With proper daily watering, fresh sod establishes roots within 10 to 14 days." },
      { q: "When can I perform the first lawn clip on fresh sod?", a: "Usually after 2 to 3 weeks once turf roots are firmly anchored." }
    ]
  },
  "artificial-turf": {
    title: "Artificial Turf",
    tagline: "Low-maintenance synthetic grass, pet turf, and backyard putting greens.",
    description: "Enjoy a pristine, green lawn year-round with premium synthetic turf installation. Complete with crushed aggregate sub-base, weed barriers, and antimicrobial infill for pets and recreation.",
    features: [
      "Premium Commercial & Residential Synthetic Grass",
      "Crushed Aggregate Sub-Base & Compaction",
      "Pet-Friendly Drainage & Infill Systems",
      "Custom Golf Putting Greens & Play Areas"
    ],
    faqs: [
      { q: "Does artificial turf drain properly?", a: "Yes, synthetic turf features perforated backing and crushed stone sub-base that drains faster than natural soil." },
      { q: "Is artificial turf safe for pets?", a: "Yes, we use non-toxic, antimicrobial infill designed specifically for dogs and pets." }
    ]
  },
  "landscaping-lawn-maintenance": {
    title: "Landscaping/Lawn Maintenance",
    tagline: "Routine lawn care, hedge trimming, seasonal mulching, and property cleanups.",
    description: "Keep your property looking sharp all year with reliable maintenance. Our crew provides turf mowing, string trimming, edging, hedge pruning, weed control, and bed cleanups.",
    features: [
      "Lawn Mowing, Edging & String Trimming",
      "Hedge & Ornamental Tree Pruning",
      "Seasonal Mulch Top-Dressing",
      "Garden Bed Weeding & Property Cleanups"
    ],
    faqs: [
      { q: "What schedules do you offer for lawn care?", a: "We offer weekly and bi-weekly recurring maintenance packages customized to your lawn growth." },
      { q: "Do you clear clippings and debris?", a: "Yes, all walkways, driveways, and patios are blown clean after every visit." }
    ]
  },
  "pavers": {
    title: "Pavers",
    tagline: "Custom paver driveways, stone patios, outdoor walkways, and pool decks.",
    description: "Upgrade your driveway, patio, or walkway with custom concrete and stone pavers. Installed over engineered crushed aggregate base with polymeric sand joint locking for maximum longevity.",
    features: [
      "Custom Concrete, Brick & Stone Pavers",
      "Driveways, Walkways & Patio Construction",
      "Excavation & Aggregate Base Compaction",
      "Polymeric Sand Joint Sealing"
    ],
    faqs: [
      { q: "Why use polymeric sand for paver joints?", a: "Polymeric sand hardens between pavers to lock pavers together and prevent weed growth and insect tunneling." },
      { q: "How long do paver driveways last?", a: "When installed over proper aggregate base, paver installations last decades without cracking." }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = SERVICES_DATA[resolvedParams.slug];
  if (!service) return { title: "Service | Eric's Tidy Turf" };
  return {
    title: `${service.title} Services | Eric's Tidy Turf Landscaping`,
    description: `${service.description} Serving Plaquemines Parish, St. Bernard Parish, Orleans Parish, Jefferson Parish, St. Charles Parish, St. John Parish, St. Tammany Parish, and surrounding areas.`
  };
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const serviceSlug = resolvedParams.slug;
  const service = SERVICES_DATA[serviceSlug];

  if (!service) {
    notFound();
  }

  // Load service images from Cloudinary mapping
  const images = getServiceImages(serviceSlug);

  return (
    <>
      {/* Hero Section */}
      <section className="process-section" style={{ background: "radial-gradient(circle at 80% 20%, #1c451e 0%, var(--color-dark) 100%)", color: "#ffffff", padding: "9rem 2rem 5.5rem 2rem" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }} className="animate-fade-in-up">
          <div className="process-tag" style={{ color: "var(--color-gold)", border: "none", padding: 0 }}>
            <span className="process-tag-line" style={{ backgroundColor: "var(--color-gold)" }} />
            OUR SERVICES
          </div>
          <h1 className="process-heading" style={{ color: "#ffffff", fontSize: "4.5rem", maxWidth: "800px", margin: "1rem 0", lineHeight: "1.1" }}>
            {service.title}
          </h1>
          <p style={{ fontSize: "1.25rem", color: "rgba(255, 255, 255, 0.85)", maxWidth: "700px", lineHeight: "1.6", marginBottom: "2.5rem" }}>
            {service.tagline}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/#quote" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1rem" }}>
              Request A Free Estimate
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.5rem" }}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a href="tel:+15049091424" className="btn btn-nav-phone" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", padding: "1rem 2rem", fontSize: "1rem", borderRadius: "99px" }}>
              Call (504) 909-1424
            </a>
          </div>
        </div>
      </section>

      {/* Service Overview & Features */}
      <section className="area-section">
        <div className="area-container animate-fade-in-up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem" }}>
          <div>
            <div className="area-tag" style={{ marginBottom: "1rem" }}>
              <span className="area-tag-line" />
              Service Overview
            </div>
            <h2 className="area-heading" style={{ fontSize: "2.75rem", marginBottom: "1.25rem", lineHeight: "1.2" }}>
              High Quality {service.title} Installations
            </h2>
            <p className="area-desc" style={{ marginBottom: "2rem", fontSize: "1.1rem", lineHeight: "1.7" }}>
              {service.description}
            </p>
            <p className="area-desc" style={{ fontSize: "1rem", color: "#606c64" }}>
              Serving Plaquemines Parish, St. Bernard Parish, Orleans Parish, Jefferson Parish, St. Charles Parish, St. John Parish, St. Tammany Parish, and surrounding areas.
            </p>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: "1.5rem", color: "var(--color-forest)", marginBottom: "1.5rem", fontWeight: 700 }}>
              What&apos;s Included
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {service.features.map((feat, idx) => (
                <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ backgroundColor: "rgba(25, 61, 27, 0.08)", borderRadius: "50%", padding: "0.5rem", display: "inline-flex", color: "var(--color-emerald)", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--color-dark)" }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Image Gallery */}
      <ServiceGallery images={images} serviceTitle={service.title} serviceSlug={serviceSlug} />

      {/* Service FAQs */}
      <section className="faq-section" style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 2rem" }}>
          <div className="faq-header" style={{ textAlign: "center" }}>
            <div className="faq-tag" style={{ justifyContent: "center" }}>
              <span className="faq-tag-line" />
              Frequently Asked
            </div>
            <h2 className="faq-heading" style={{ fontSize: "3rem" }}>{service.title} Questions</h2>
          </div>

          <div className="faq-container">
            <FaqAccordion faqs={service.faqs} />
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <footer className="footer">
        <div className="footer-top">
          {/* Column 1: Brand Info */}
          <div className="footer-col">
            <div className="footer-brand">
              <img src="/logo.png" alt="Eric's Tidy Turf Logo" className="footer-logo" />
              <div className="footer-brand-text">
                <a href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="footer-brand-name">
                  Eric&apos;s Tidy Turf
                </a>
                <span className="footer-brand-sub">N.O.L.A.</span>
              </div>
            </div>
            <p className="footer-desc">
              Outdoor living, elevated. Professional landscaping across Greater New Orleans and surrounding areas.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">All Services</h4>
            <ul className="footer-links">
              {Object.entries(SERVICES_DATA).slice(0, 6).map(([slug, s]) => (
                <li key={slug} className="footer-link-item"><Link href={`/services/${slug}`}>{s.title}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-col">
            <h4 className="footer-title">Contact</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>102 S Randall Ct<br />Gretna, LA 70053</span>
              </div>
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+15049091424">(504) 909-1424</a>
              </div>
            </div>
          </div>

          {/* Column 4: CTA */}
          <div className="footer-col">
            <h4 className="footer-title">Ready to Start?</h4>
            <Link href="/#quote" className="footer-btn">
              Free Estimate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.25rem" }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Eric&apos;s Tidy Turf. All rights reserved.</p>
          <div className="footer-bottom-right">
            <span>Licensed &amp; Insured</span>
            <span>·</span>
            <span>Gretna, LA</span>
            <span>·</span>
            <a href="https://businessupscalers.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
              <strong>Designed by Upscalers</strong>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
