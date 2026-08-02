import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "../../components/FaqAccordion";

// 1. Factual Service Database matching home page specifications
interface ServiceInfo {
  title: string;
  slug: string;
  desc: string;
  image: string;
}

const SERVICES_DATA: Record<string, ServiceInfo> = {
  landscaping: {
    title: "Landscaping",
    slug: "landscaping",
    desc: "Design-forward planting, beds & garden architecture.",
    image: "/gallery/fresh-sod-install.png"
  },
  hardscaping: {
    title: "Hardscaping",
    slug: "hardscaping",
    desc: "Custom pavers, patios, walkways & retaining walls.",
    image: "/gallery/firepit-courtyard.png"
  },
  "landscape-lighting": {
    title: "Landscape Lighting",
    slug: "landscape-lighting",
    desc: "Low-voltage systems that make the yard glow.",
    image: "/gallery/palm-uplighting.png"
  },
  drainage: {
    title: "Drainage",
    slug: "drainage",
    desc: "French drains & grading that solve standing water.",
    image: "/gallery/fresh-sod-install.png"
  },
  irrigation: {
    title: "Irrigation",
    slug: "irrigation",
    desc: "Smart, water-efficient sprinkler systems.",
    image: "/gallery/fresh-sod-install.png"
  },
  grading: {
    title: "Grading",
    slug: "grading",
    desc: "Precision site prep for a permanent foundation.",
    image: "/gallery/fresh-sod-install.png"
  },
  "sod-installation": {
    title: "Sod Installation",
    slug: "sod-installation",
    desc: "Premium sod, lush from day one.",
    image: "/gallery/fresh-sod-install.png"
  },
  "artificial-turf": {
    title: "Artificial Turf",
    slug: "artificial-turf",
    desc: "Year-round green, zero landscaping/lawn maintenance.",
    image: "/gallery/firepit-courtyard.png"
  },
  "landscaping-lawn-maintenance": {
    title: "Landscaping/Lawn Maintenance",
    slug: "landscaping-lawn-maintenance",
    desc: "Seasonal programs to keep it magazine-ready.",
    image: "/gallery/fresh-sod-install.png"
  },
  pavers: {
    title: "Pavers",
    slug: "pavers",
    desc: "Driveways, pool decks, entry walks & more.",
    image: "/gallery/firepit-courtyard.png"
  }
};

// General factual FAQs from homepage (Licensed, Estimates, Warranty)
const GENERAL_FAQS = [
  {
    q: "Are you licensed and insured?",
    a: "Yes — fully licensed for landscaping and hardscape work in Louisiana, and carry general liability plus workers' comp."
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes. Every project starts with a free on-site consultation and written proposal."
  },
  {
    q: "Do you warranty your work?",
    a: "Yes — installation is warrantied, and manufacturer warranties pass through on materials."
  }
];

export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map(slug => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) return { title: "Service Not Found - Eric's Tidy Turf" };
  return {
    title: `${service.title} | Eric's Tidy Turf Landscaping`,
    description: `${service.desc} Professional landscaping and outdoor installations in Greater New Orleans.`
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return (
      <div className="success-screen" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h2 className="success-title">Service Not Found</h2>
        <p className="success-desc">The requested service page does not exist.</p>
        <Link href="/" className="success-call-btn" style={{ maxWidth: "200px", margin: "1rem auto 0 auto", justifyContent: "center" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const otherServices = Object.values(SERVICES_DATA).filter(s => s.slug !== slug);

  return (
    <>
      {/* Header / Floating Navigation Bar */}
      <header className="header-wrapper header-fixed" style={{ position: "sticky", top: 0, zIndex: 1100 }}>
        <nav className="navbar">
          {/* Logo & Brand Name */}
          <div className="logo-container">
            <Image
              className="logo-img"
              src="/logo.png"
              alt="Erics Tidy Turf Logo"
              width={42}
              height={42}
              priority
            />
            <div className="logo-text-wrapper">
              <Link href="/" className="logo-title">
                Erics Tidy Turf
              </Link>
              <span className="logo-subtitle">N.O.L.A.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="nav-menu">
            <li className="dropdown-container">
              <span className="nav-link dropdown-trigger active">
                Services
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="dropdown-caret">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
              <ul className="dropdown-menu">
                {Object.values(SERVICES_DATA).map(s => (
                  <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>
                ))}
              </ul>
            </li>
            <li className="dropdown-container">
              <span className="nav-link dropdown-trigger">
                Service Areas
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="dropdown-caret">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
              <ul className="dropdown-menu">
                <li><Link href="/service-areas/gretna">Gretna</Link></li>
                <li><Link href="/service-areas/metairie">Metairie</Link></li>
                <li><Link href="/service-areas/new-orleans">New Orleans</Link></li>
                <li><Link href="/service-areas/kenner">Kenner</Link></li>
                <li><Link href="/service-areas/harvey">Harvey</Link></li>
                <li><Link href="/service-areas/marrero">Marrero</Link></li>
              </ul>
            </li>
            <li><Link href="/#work" className="nav-link">Work</Link></li>
            <li><Link href="/#process" className="nav-link">Process</Link></li>
            <li><Link href="/#reviews" className="nav-link">Reviews</Link></li>
            <li><Link href="/#faq" className="nav-link">FAQ</Link></li>
            <li><Link href="/#quote" className="nav-link">Contact</Link></li>
          </ul>

          {/* Action Buttons */}
          <div className="nav-actions">
            <a href="tel:504-909-1424" className="btn btn-nav-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.25rem", verticalAlign: "middle" }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (504) 909-1424
            </a>
            <Link href="/#quote" className="btn btn-primary" style={{ padding: "0.6rem 1.4rem" }}>
              Free Estimate
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.25rem", verticalAlign: "middle" }}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="process-section" style={{ background: "radial-gradient(circle at 80% 20%, #1c451e 0%, var(--color-dark) 100%)", color: "#ffffff", padding: "9rem 2rem 5.5rem 2rem" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }} className="animate-fade-in-up">
          <div className="process-tag" style={{ color: "var(--color-gold)", border: "none", padding: 0 }}>
            <span className="process-tag-line" style={{ backgroundColor: "var(--color-gold)" }} />
            SERVICE OVERVIEW
          </div>
          <h1 className="process-heading" style={{ color: "#ffffff", fontSize: "4.5rem", maxWidth: "800px", margin: "1rem 0", lineHeight: "1.1" }}>
            {service.title}
          </h1>
          <p style={{ fontSize: "1.25rem", color: "rgba(255, 255, 255, 0.8)", maxWidth: "700px", lineHeight: "1.6", marginBottom: "2.5rem" }}>
            {service.desc} Professional yard, pavers, lighting, and lawn grading installations by <a href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}>Eric’s Tidy Turf Landscaping</a>.
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

      {/* Enhanced Core Information Section */}
      <section className="area-section">
        <div className="area-container animate-fade-in-up">
          {/* Left Column: Visual Showcase */}
          <div className="area-map-wrapper" style={{ boxShadow: "0 25px 50px rgba(25, 61, 27, 0.08)", overflow: "hidden" }}>
            <img
              src={service.image}
              alt={`${service.title} project representation`}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              className="gallery-zoom-img"
            />
          </div>

          {/* Right Column: Factual Specifications Card */}
          <div className="glass-card">
            <div className="area-tag" style={{ marginBottom: "1rem" }}>
              <span className="area-tag-line" />
              Service Specs
            </div>
            <h2 className="area-heading" style={{ fontSize: "2.75rem", marginBottom: "1.25rem", lineHeight: "1.2" }}>
              Professional layouts by <a href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}>Eric’s Tidy Turf</a>.
            </h2>
            <p className="area-desc" style={{ marginBottom: "2rem", fontSize: "1rem" }}>
              We deliver high-end {service.title.toLowerCase()} systems customized for local residential and commercial properties. Every project starts with a detailed landscape walkthrough, site drainage assessment, and a comprehensive written layout proposal.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", borderTop: "1px solid rgba(25, 61, 27, 0.08)", paddingTop: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.95rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>Based in <strong>Gretna, LA</strong> (Serving Greater New Orleans &amp; West Bank)</span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.95rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span>Working hours: <strong>Mon–Fri 7am–6pm, Sat 8am–2pm</strong></span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.95rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <span>Louisiana Fully Licensed, Insured, &amp; Workers&apos; Comp Protected</span>
              </div>
            </div>

            {/* Factual Stats Widgets */}
            <div className="stat-grid">
              <div className="stat-badge">
                <span className="stat-val">26+ Years</span>
                <span className="stat-lbl">Experience</span>
              </div>
              <div className="stat-badge">
                <span className="stat-val">800+</span>
                <span className="stat-lbl">Projects Done</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* General FAQs Accordion Section */}
      <section className="faq-section" style={{ background: "#faf9f6" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 2rem" }}>
          <div className="faq-header" style={{ textAlign: "center" }}>
            <div className="faq-tag" style={{ justifyContent: "center" }}>
              <span className="faq-tag-line" />
              Estimates &amp; Security
            </div>
            <h2 className="faq-heading" style={{ fontSize: "3rem" }}>General Service FAQs</h2>
          </div>

          <div className="faq-container">
            <FaqAccordion faqs={GENERAL_FAQS} />
          </div>
        </div>
      </section>

      {/* Explore Other Services Section */}
      <section className="faq-section" style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 2rem" }}>
          <div className="faq-header" style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div className="faq-tag" style={{ justifyContent: "center" }}>
              <span className="faq-tag-line" />
              Other Solutions
            </div>
            <h2 className="faq-heading" style={{ fontSize: "3rem" }}>Explore Other Services</h2>
          </div>

          <div className="explore-grid">
            {otherServices.map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="explore-card">
                <div className="explore-icon-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="explore-title">{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
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
              Outdoor living, elevated. Design-forward landscaping across Greater New Orleans.
            </p>
            <div className="footer-social-links" style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <a href="https://www.facebook.com/EricsTidyTurfLLC" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/eric.schweda/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.pinterest.com/ericstidyturfllc/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/><circle cx="12" cy="12" r="10"/></svg>
              </a>
              <a href="https://www.tiktok.com/@ericstidyturfllc" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a href="https://x.com/EricsTidyTurf" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M20 4l-6.768 6.768"/></svg>
              </a>
              <a href="https://www.youtube.com/@EricsTidyTurfLLC" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96C5.12 19.08 12 19.08 12 19.08s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z"/><polyline points="9.75 15.02 15.5 11.54 9.75 8.06 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              {Object.values(SERVICES_DATA).slice(0, 6).map(s => (
                <li key={s.slug} className="footer-link-item"><Link href={`/services/${s.slug}`}>{s.title}</Link></li>
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
                <span>
                  102 S Randall Ct<br />
                  Gretna, LA 70053
                </span>
              </div>
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+15049091424">(504) 909-1424</a>
              </div>
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:ericstidyturfllc@gmail.com">ericstidyturfllc@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Column 4: Hours & CTA */}
          <div className="footer-col">
            <h4 className="footer-title">Hours</h4>
            <div className="footer-hours-items">
              <div className="footer-hours-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <span>Mon–Fri · 7am – 6pm</span>
              </div>
              <div className="footer-hours-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <span>Sat · 8am – 2pm</span>
              </div>
              <div className="footer-hours-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <span>Sun · Closed</span>
              </div>
            </div>
            <Link href="/#quote" className="footer-btn">
              Free Estimate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.25rem" }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom">
          <p>
            &copy; 2026 <a href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">Eric&apos;s Tidy Turf</a>. All rights reserved.
          </p>
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
