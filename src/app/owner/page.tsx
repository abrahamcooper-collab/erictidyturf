"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { optimizedImageUrl } from "../../lib/cloudinary";
import "./owner.css";

const GMB_LINK =
  "https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D";

const STANDARDS = [
  {
    num: "01",
    title: "PRECISION FIRST",
    desc: "Every landscape is measured, planned, and built to exact specifications. If it isn't right, we redo it — no cutting corners, no compromises.",
  },
  {
    num: "02",
    title: "RESPECT FOR YOUR PROPERTY",
    desc: "Drop cloths down, equipment organized, debris hauled away, and everything cleaned up before we leave. Your property is treated like our own.",
  },
  {
    num: "03",
    title: "CLEAN, LASTING FINISH",
    desc: "Crisp edges, seamless transitions, proper drainage — just a finish that looks like it was always meant to be there.",
  },
  {
    num: "04",
    title: "I SHOW UP MYSELF",
    desc: "When you book Eric's TidyTurf, you get me — not a rotating crew of subcontractors. The person who quotes the job is the person who does it.",
  },
  {
    num: "05",
    title: "HONEST PRICING",
    desc: "Straight quotes, no surprise fees, no upsell pressure. You know exactly what you're paying before a single shovel hits the ground.",
  },
  {
    num: "06",
    title: "BUILT ON REFERRALS",
    desc: "Nearly 9 out of 10 jobs come from a neighbor, friend, or past client. That trust is earned one clean project at a time.",
  },
];

const GALLERY_IMAGES = [
  { src: "/images/landscaping/IMG_6002.jpg", alt: "Landscaping project" },
  { src: "/images/pavers/IMG_6262.jpg", alt: "Paver installation" },
  { src: "/images/landscape-lighting/IMG_3517.jpg", alt: "Landscape lighting" },
  { src: "/images/pavers/IMG_6146.jpg", alt: "Hardscaping project" },
  { src: "/images/sod-installation/IMG_7142.jpg", alt: "Sod installation" },
  { src: "/images/landscaping/IMG_7284.jpg", alt: "Landscaping detail" },
];

// Real Google Reviews from the main site
const REVIEWS = [
  {
    stars: 5,
    text: "Eric and his crew did an awesome job on our landscape. We wrote the vision and they made it come to fruition. My husband and I are very happy with the outcome of their work and will recommend them 100 times over. Thanks for making our landscape come to life.",
    name: "Jane Smothers",
    meta: "3 months ago",
    avatar: "JS",
  },
  {
    stars: 5,
    text: "Had Eric's Tidy Turf update our front yard landscape. Awesome job!! Definitely the company to get the work done.",
    name: "Keith Savoie",
    meta: "1 review · 2 photos · 2 months ago",
    avatar: "KS",
  },
  {
    stars: 5,
    text: "Eric did an outstanding job on our landscaping! From start to finish, he was professional, reliable, and easy to work with. He really took the time to understand what we wanted and brought great ideas to the table to make everything look even better than we imagined. The attention to detail was impressive — everything was done neatly and with care, and the final result completely transformed our yard.",
    name: "Amy Danos",
    meta: "4 months ago",
    avatar: "AD",
  },
];

/* ── Intersection Observer hook for fade-up animations ── */
function useFadeUp() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const els = document.querySelectorAll(".fade-up");
    els.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);
}

export default function OwnerPage() {
  useFadeUp();

  return (
    <main className="owner-page">
      {/* ===================== HERO SECTION ===================== */}
      <section className="owner-hero">
        {/* Grid background overlay */}
        <div className="owner-hero-grid" />
        <div className="owner-hero-gradient" />

        <div className="owner-hero-inner">
          {/* Left: Text */}
          <div className="owner-hero-text">
            <span className="owner-hero-label fade-up">ABOUT THE OWNER</span>
            <h1 className="owner-hero-name fade-up">
              ERIC
              <br />
              <span className="owner-hero-name-accent">SCHWEDA.</span>
            </h1>
            <p className="owner-hero-role fade-up">
              OWNER &amp; OPERATOR — N.O.L.A.
            </p>
            <p className="owner-hero-desc fade-up">
              The hands behind every{" "}
              <a href={GMB_LINK} target="_blank" rel="noopener noreferrer">
                <strong>Eric&apos;s TidyTurf</strong>
              </a>{" "}
              project. Eric built this company on a single idea — that a lawn, a
              patio, or a landscape should look flawless and last for years. No
              shortcuts, no subcontractors, no excuses.
            </p>
            <div className="owner-hero-buttons fade-up">
              <a href="#story" className="owner-btn-primary">
                READ HIS STORY
              </a>
              <Link href="/gallery" className="owner-btn-outline">
                SEE HIS WORK »
              </Link>
            </div>
          </div>

          {/* Right: Portrait */}
          <div className="owner-hero-portrait fade-up">
            <div className="owner-portrait-frame">
              <div className="portrait-corner portrait-corner-tl" />
              <div className="portrait-corner portrait-corner-tr" />
              <div className="portrait-corner portrait-corner-bl" />
              <div className="portrait-corner portrait-corner-br" />
              <img
                src="/owner-portrait.png"
                alt="Eric Schweda — Owner of Eric's TidyTurf"
                className="portrait-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STORY SECTION ===================== */}
      <section id="story" className="owner-story">
        <div className="owner-story-inner">
          {/* Left: Headline */}
          <div className="owner-story-left">
            <span className="owner-story-label fade-up">THE STORY</span>
            <h2 className="owner-story-heading fade-up">
              CRAFT BEFORE
              <br />
              <span className="owner-story-heading-accent">EVERYTHING.</span>
            </h2>
            <p className="owner-story-subtitle fade-up">
              FROM A KID WHO MOWED EVERY LAWN ON THE
              BLOCK TO N.O.L.A.&apos;S MOST-REFERRED LANDSCAPER.
            </p>
          </div>

          {/* Right: Paragraphs */}
          <div className="owner-story-right">
            <p className="fade-up">
              My journey began at just 12 years old, walking door to door asking
              neighbors if I could cut their yards. What started as a young kid
              with a willingness to work soon grew into a lifelong passion and a
              business built on hard work, integrity, quality, and pride.
            </p>
            <p className="fade-up">
              As the years went on, lawn care led me to discover an artistic and
              creative side of myself. I developed a passion for designing and
              creating beautiful landscapes and outdoor living spaces that
              transform properties and bring my customers&apos; visions to life.
              What began with simply cutting grass evolved into something much
              greater — creating outdoor spaces where families can live, relax,
              entertain, and make lasting memories.
            </p>
            <p className="fade-up">
              Now, more than 32 years later, I&apos;m humbled and grateful for how
              far this journey has taken me. This business has given me
              opportunities I never could have imagined as that 12-year-old kid
              knocking on doors. It has allowed me to provide for my family,
              serve my community, build lasting relationships, and make a living
              doing something I genuinely love.
            </p>

            {/* Blockquote */}
            <blockquote className="owner-quote fade-up">
              <p>
                &ldquo;I&apos;m blessed beyond measure, humbled, grateful, and
                thankful for every customer, friend, family member, and person
                who has supported me throughout this journey. I never take for
                granted where I came from, and I&apos;m excited about where
                we&apos;re going.&rdquo;
              </p>
              <cite>— ERIC SCHWEDA</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ===================== STANDARDS SECTION ===================== */}
      <section className="owner-standards">
        <div className="owner-standards-header">
          <span className="owner-standards-label fade-up">HOW ERIC WORKS</span>
          <h2 className="owner-standards-heading fade-up">
            THE NON-NEGOTIABLE{" "}
            <span className="owner-standards-heading-accent">STANDARDS.</span>
          </h2>
        </div>

        <div className="owner-standards-grid">
          {STANDARDS.map((s) => (
            <div key={s.num} className="standard-card fade-up">
              <span className="standard-num">{s.num}</span>
              <h3 className="standard-title">{s.title}</h3>
              <p className="standard-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== WORK GALLERY SECTION ===================== */}
      <section className="owner-work">
        <div className="owner-work-header">
          <span className="owner-work-label fade-up">HIS WORK</span>
          <h2 className="owner-work-heading fade-up">
            THE RESULTS SPEAK{" "}
            <span className="owner-work-heading-accent">FOR THEMSELVES.</span>
          </h2>
        </div>

        <div className="owner-work-grid">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className={`work-grid-item work-grid-item-${i + 1} fade-up`}>
              <img
                src={optimizedImageUrl(img.src)}
                alt={img.alt}
                className="work-grid-img"
                loading="lazy"
              />
              {i === 2 && (
                <Link href="/gallery" className="work-grid-overlay-btn">
                  VIEW GALLERY
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="owner-work-buttons fade-up">
          <Link href="/gallery" className="owner-btn-primary">
            VIEW THE FULL GALLERY »
          </Link>
          <a
            href={GMB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="owner-btn-outline"
          >
            FIND HIM ON GOOGLE »
          </a>
        </div>
      </section>

      {/* ===================== CTA BANNER ===================== */}
      <section className="owner-cta">
        <div className="owner-cta-inner">
          <div className="owner-cta-text fade-up">
            <h2 className="owner-cta-heading">
              WANT ERIC ON
              <br />
              <span className="owner-cta-heading-accent">YOUR PROJECT?</span>
            </h2>
            <p className="owner-cta-sub">
              FREE ESTIMATES — HANDLED PERSONALLY, START TO FINISH.
            </p>
          </div>
          <Link href="/#quote" className="owner-btn-primary owner-cta-btn fade-up">
            GET A FREE ESTIMATE
          </Link>
        </div>
      </section>

      {/* ===================== REVIEWS SECTION ===================== */}
      <section className="owner-reviews">
        <div className="owner-reviews-header">
          <div className="owner-reviews-badge fade-up">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="owner-reviews-badge-text">
              5.0 ON GOOGLE — VERIFIED REVIEWS
            </span>
          </div>
          <h2 className="owner-reviews-heading fade-up">
            WHAT CLIENTS{" "}
            <span className="owner-reviews-heading-accent">SAY.</span>
          </h2>
          <p className="owner-reviews-sub fade-up">
            Real reviews from real homeowners across Greater New Orleans.
          </p>
        </div>

        <div className="owner-reviews-grid">
          {REVIEWS.map((r, i) => (
            <div key={i} className="owner-review-card fade-up">
              <div className="owner-review-stars">★★★★★</div>
              <p className="owner-review-text">&ldquo;{r.text}&rdquo;</p>
              <div className="owner-review-author">
                <div className="owner-review-avatar">
                  {r.avatar}
                </div>
                <div className="owner-review-info">
                  <span className="owner-review-name">{r.name}</span>
                  <span className="owner-review-meta">{r.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SITE-WIDE FOOTER (same as homepage) ===================== */}
      <footer className="footer">
        <div className="footer-top">
          {/* Column 1: Brand Info */}
          <div className="footer-col">
            <div className="footer-brand">
              <img src="/logo.png" alt="Eric's Tidy Turf Logo" className="footer-logo" />
              <div className="footer-brand-text">
                <a href={GMB_LINK} target="_blank" rel="noopener noreferrer" className="footer-brand-name">
                  Eric&apos;s Tidy Turf
                </a>
                <span className="footer-brand-sub">N.O.L.A.</span>
              </div>
            </div>
            <p className="footer-desc">
              Outdoor living, elevated. Professional landscaping across Greater New Orleans and surrounding areas.
            </p>
            <div className="footer-social-links" style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <a href="https://www.facebook.com/EricsTidyTurfLLC" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.instagram.com/eric.schweda/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://www.pinterest.com/ericstidyturfllc/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /><circle cx="12" cy="12" r="10" /></svg>
              </a>
              <a href="https://www.tiktok.com/@ericstidyturfllc" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
              <a href="https://x.com/EricsTidyTurf" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M20 4l-6.768 6.768" /></svg>
              </a>
              <a href="https://www.youtube.com/@EricsTidyTurfLLC" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96C5.12 19.08 12 19.08 12 19.08s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z" /><polyline points="9.75 15.02 15.5 11.54 9.75 8.06 9.75 15.02" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li className="footer-link-item"><Link href="/services/landscaping">Landscaping</Link></li>
              <li className="footer-link-item"><Link href="/services/hardscaping">Hardscaping</Link></li>
              <li className="footer-link-item"><Link href="/services/landscape-lighting">Landscape Lighting</Link></li>
              <li className="footer-link-item"><Link href="/services/drainage">Drainage</Link></li>
              <li className="footer-link-item"><Link href="/services/irrigation">Irrigation</Link></li>
              <li className="footer-link-item"><Link href="/services/grading">Grading</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-col">
            <h4 className="footer-title">Contact</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  102 S Randall Ct<br />
                  Gretna, LA 70053
                </span>
              </div>
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+15049091424">(504) 909-1424</a>
              </div>
              <div className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
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
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
                <span>Mon–Fri · 7am – 6pm</span>
              </div>
              <div className="footer-hours-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
                <span>Sat · 8am – 2pm</span>
              </div>
              <div className="footer-hours-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-icon">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
                <span>Sun · Closed</span>
              </div>
            </div>
            <Link href="/#quote" className="footer-btn">
              Free Estimate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.25rem" }}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom">
          <p>
            &copy; 2026 <a href={GMB_LINK} target="_blank" rel="noopener noreferrer">Eric&apos;s Tidy Turf</a>. All rights reserved.
          </p>
          <div className="footer-bottom-right">
            <span>Licensed &amp; Insured</span>
            <span>·</span>
            <span>Gretna, LA</span>
            <span>·</span>
            <a href="https://www.upscalers.us" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
              <strong>Designed by Upscalers</strong>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
