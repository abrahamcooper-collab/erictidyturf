import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "../../components/FaqAccordion";

// 10 Factual Services List
const SERVICES_LIST = [
  { title: "Landscaping", slug: "landscaping" },
  { title: "Hardscaping", slug: "hardscaping" },
  { title: "Landscape Lighting", slug: "landscape-lighting" },
  { title: "Drainage", slug: "drainage" },
  { title: "Irrigation", slug: "irrigation" },
  { title: "Grading", slug: "grading" },
  { title: "Sod Installation", slug: "sod-installation" },
  { title: "Artificial Turf", slug: "artificial-turf" },
  { title: "Landscaping/Lawn Maintenance", slug: "landscaping-lawn-maintenance" },
  { title: "Pavers", slug: "pavers" }
];

// Factual general FAQs from homepage (Licensed, Estimates, Warranty)
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

export const metadata = {
  title: "Landscaping in Kenner, LA | Eric's Tidy Turf",
  description: "Professional landscaping and outdoor installations in Kenner, LA. High-quality services across Greater New Orleans."
};

export default function KennerPage() {
  const otherAreas = [
    { title: "Gretna", slug: "gretna" },
    { title: "Metairie", slug: "metairie" },
    { title: "New Orleans", slug: "new-orleans" },
    { title: "Harvey", slug: "harvey" },
    { title: "Marrero", slug: "marrero" }
  ];

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
              <span className="nav-link dropdown-trigger">
                Services
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="dropdown-caret">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
              <ul className="dropdown-menu">
                {SERVICES_LIST.map(s => (
                  <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>
                ))}
              </ul>
            </li>
            <li className="dropdown-container">
              <span className="nav-link dropdown-trigger active">
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
            SERVICE COVERAGE
          </div>
          <h1 className="process-heading" style={{ color: "#ffffff", fontSize: "4.5rem", maxWidth: "800px", margin: "1rem 0", lineHeight: "1.1" }}>
            Serving Kenner, LA
          </h1>
          <p style={{ fontSize: "1.25rem", color: "rgba(255, 255, 255, 0.8)", maxWidth: "700px", lineHeight: "1.6", marginBottom: "2.5rem" }}>
            Professional landscaping and outdoor installations in Kenner, LA. Contact <a href="https://share.google/Hkuf9AIgf7jVN6dC9" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}>Eric’s Tidy Turf Landscaping</a> for professional outdoor services.
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

      {/* Two-Column Details and Google Map */}
      <section className="area-section">
        <div className="area-container animate-fade-in-up">
          {/* Left Column: Google Map Embed */}
          <div className="area-map-wrapper" style={{ boxShadow: "0 25px 50px rgba(25, 61, 27, 0.08)" }}>
            <iframe
              title="Erics Tidy Turf Kenner Service Area Map"
              src="https://www.google.com/maps?q=Kenner,+LA&z=12&output=embed"
              className="area-map-iframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Right Column: Factual Specifications Card */}
          <div className="glass-card">
            <div className="area-tag" style={{ marginBottom: "1rem" }}>
              <span className="area-tag-line" />
              Coverage Details
            </div>
            <h2 className="area-heading" style={{ fontSize: "2.75rem", marginBottom: "1.25rem", lineHeight: "1.2" }}>
              Professional layouts in Kenner.
            </h2>
            <p className="area-desc" style={{ marginBottom: "2rem", fontSize: "1rem" }}>
              At <a href="https://share.google/Hkuf9AIgf7jVN6dC9" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}>Eric’s Tidy Turf</a>, we offer our full range of design-forward yard work, custom paving, low-voltage lights, and storm water French drain solutions in Kenner, Louisiana.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", borderTop: "1px solid rgba(25, 61, 27, 0.08)", paddingTop: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.95rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>Office: <strong>102 S Randall Ct, Gretna, LA 70053</strong></span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.95rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span>Hours: <strong>Mon–Fri 7am–6pm, Sat 8am–2pm</strong></span>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.95rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <span>Licensed &amp; Insured for Louisiana Landscape Work</span>
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

      {/* Services Grid Section */}
      <section className="faq-section" style={{ backgroundColor: "#faf9f6" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 2rem" }}>
          <div className="faq-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="faq-tag" style={{ justifyContent: "center" }}>
              <span className="faq-tag-line" />
              What We Offer
            </div>
            <h2 className="faq-heading" style={{ fontSize: "3rem" }}>Services Available in Kenner</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>
            {SERVICES_LIST.map((s, idx) => (
              <Link key={idx} href={`/services/${s.slug}`} style={{ background: "#ffffff", padding: "2rem", borderRadius: "20px", border: "1px solid rgba(25, 61, 27, 0.05)", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.01)", display: "flex", alignItems: "flex-start", gap: "1rem", textDecoration: "none" }}>
                <div style={{ backgroundColor: "rgba(25, 61, 27, 0.05)", borderRadius: "50%", padding: "0.4rem", display: "inline-flex", color: "var(--color-emerald)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--color-forest)", fontWeight: 700, marginBottom: "0.5rem" }}>
                    {s.title}
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "#606c64", lineHeight: "1.5" }}>
                    Professional design and installation by <span style={{ textDecoration: "underline", fontWeight: "bold" }}>Eric’s Tidy Turf</span> expert crew.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* General FAQs Accordion Section */}
      <section className="faq-section" style={{ background: "#ffffff" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 2rem" }}>
          <div className="faq-header" style={{ textAlign: "center" }}>
            <div className="faq-tag" style={{ justifyContent: "center" }}>
              <span className="faq-tag-line" />
              Frequently Asked
            </div>
            <h2 className="faq-heading" style={{ fontSize: "3rem" }}>General Service FAQs</h2>
          </div>

          <div className="faq-container">
            <FaqAccordion faqs={GENERAL_FAQS} />
          </div>
        </div>
      </section>

      {/* Explore Other Areas Section */}
      <section className="faq-section" style={{ background: "#faf9f6" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 2rem" }}>
          <div className="faq-header" style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div className="faq-tag" style={{ justifyContent: "center" }}>
              <span className="faq-tag-line" />
              Other Coverage
            </div>
            <h2 className="faq-heading" style={{ fontSize: "3rem" }}>Explore Other Locations</h2>
          </div>

          <div className="explore-grid">
            {otherAreas.map(a => (
              <Link key={a.title} href={`/service-areas/${a.slug}`} className="explore-card">
                <div className="explore-icon-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="explore-title">{a.title}</span>
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
                <a href="https://share.google/Hkuf9AIgf7jVN6dC9" target="_blank" rel="noopener noreferrer" className="footer-brand-name">
                  Eric&apos;s Tidy Turf
                </a>
                <span className="footer-brand-sub">N.O.L.A.</span>
              </div>
            </div>
            <p className="footer-desc">
              Outdoor living, elevated. Design-forward landscaping across Greater New Orleans.
            </p>
          </div>

          {/* Column 2: Services Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              {SERVICES_LIST.slice(0, 6).map(s => (
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
            &copy; 2026 <a href="https://share.google/Hkuf9AIgf7jVN6dC9" target="_blank" rel="noopener noreferrer">Eric&apos;s Tidy Turf</a>. All rights reserved.
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
