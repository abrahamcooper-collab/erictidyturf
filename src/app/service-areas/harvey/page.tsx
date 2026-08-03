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
  title: "Landscaping in Harvey, LA | Eric's Tidy Turf",
  description: "Professional landscaping and outdoor installations in Harvey, LA. High-quality services across Greater New Orleans."
};

export default function HarveyPage() {
  const otherAreas = [
    { title: "Gretna", slug: "gretna" },
    { title: "Metairie", slug: "metairie" },
    { title: "New Orleans", slug: "new-orleans" },
    { title: "Kenner", slug: "kenner" },
    { title: "Marrero", slug: "marrero" }
  ];

  return (
    <>


      {/* Hero Section */}
      <section className="process-section" style={{ background: "radial-gradient(circle at 80% 20%, #1c451e 0%, var(--color-dark) 100%)", color: "#ffffff", padding: "9rem 2rem 5.5rem 2rem" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }} className="animate-fade-in-up">
          <div className="process-tag" style={{ color: "var(--color-gold)", border: "none", padding: 0 }}>
            <span className="process-tag-line" style={{ backgroundColor: "var(--color-gold)" }} />
            SERVICE COVERAGE
          </div>
          <h1 className="process-heading" style={{ color: "#ffffff", fontSize: "4.5rem", maxWidth: "800px", margin: "1rem 0", lineHeight: "1.1" }}>
            Serving Harvey, LA
          </h1>
          <p style={{ fontSize: "1.25rem", color: "rgba(255, 255, 255, 0.8)", maxWidth: "700px", lineHeight: "1.6", marginBottom: "2.5rem" }}>
            Professional landscaping and outdoor installations in Harvey, LA. Contact <a href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}>Eric’s Tidy Turf Landscaping</a> for professional outdoor services.
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
              title="Erics Tidy Turf Harvey Service Area Map"
              src="https://www.google.com/maps?q=Harvey,+LA&z=12&output=embed"
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
              Professional layouts in Harvey.
            </h2>
            <p className="area-desc" style={{ marginBottom: "2rem", fontSize: "1rem" }}>
              At <a href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}>Eric’s Tidy Turf</a>, we offer our full range of design-forward yard work, custom paving, low-voltage lights, and storm water French drain solutions in Harvey, Louisiana.
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
            <h2 className="faq-heading" style={{ fontSize: "3rem" }}>Services Available in Harvey</h2>
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
