"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const bgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [faqSearchQuery, setFaqSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const pairedRecommendations = useMemo(() => {
    const recommendedIds = new Set<string>();
    selectedServices.forEach((srvId) => {
      PAIRED_SUGGESTIONS[srvId]?.forEach((recId) => {
        if (!selectedServices.includes(recId)) {
          recommendedIds.add(recId);
        }
      });
    });
    return Array.from(recommendedIds)
      .slice(0, 3)
      .map((id) => FORM_SERVICES.find((srv) => srv.id === id))
      .filter((srv): srv is typeof FORM_SERVICES[number] => !!srv);
  }, [selectedServices]);

  const isStepValid = useMemo(() => {
    if (stepIndex === 0) return selectedServices.length > 0;
    if (stepIndex === 1) return propertyType !== null;
    if (stepIndex === 2) return timeframe !== null;
    if (stepIndex === 3) return formValues.name.trim() !== "" && formValues.phone.trim() !== "";
    return false;
  }, [stepIndex, selectedServices, propertyType, timeframe, formValues]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid) {
      setFormSubmitted(true);
    }
  };

  const progressPercent = ((stepIndex + (formSubmitted ? 1 : 0)) / 4) * 100;

  const filteredFaqs = useMemo(() => {
    return FAQS.filter(
      (faq) =>
        faq.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(faqSearchQuery.toLowerCase())
    );
  }, [faqSearchQuery]);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateZoom = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        const scale = 1 + scrollY * 0.00035;
        bgRef.current.style.transform = `scale(${scale})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateZoom);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  return (
    <>
      {/* Header / Floating Navigation Bar */}
      <header className="header-wrapper">
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
              <a
                href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="logo-title"
              >
                Erics Tidy Turf
              </a>
              <span className="logo-subtitle">N.O.I.A.</span>
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
                <li><Link href="/services/landscaping">Landscaping</Link></li>
                <li><Link href="/services/hardscaping">Hardscaping</Link></li>
                <li><Link href="/services/landscape-lighting">Landscape Lighting</Link></li>
                <li><Link href="/services/drainage">Drainage</Link></li>
                <li><Link href="/services/irrigation">Irrigation</Link></li>
                <li><Link href="/services/grading">Grading</Link></li>
                <li><Link href="/services/sod-installation">Sod Installation</Link></li>
                <li><Link href="/services/artificial-turf">Artificial Turf</Link></li>
                <li><Link href="/services/landscaping-lawn-maintenance">Landscaping/Lawn Maintenance</Link></li>
                <li><Link href="/services/pavers">Pavers</Link></li>
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
            <li>
              <a href="#work" className="nav-link">
                Work
              </a>
            </li>
            <li>
              <a href="#process" className="nav-link">
                Process
              </a>
            </li>
            <li>
              <a href="#reviews" className="nav-link">
                Reviews
              </a>
            </li>
            <li>
              <a href="#faq" className="nav-link">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="nav-actions">
            <a href="tel:504-909-1424" className="btn btn-nav-phone">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (504) 909-1424
            </a>
            <a href="#contact" className="btn btn-primary" style={{ padding: "0.6rem 1.4rem" }}>
              Free Estimate
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <Image
          ref={bgRef}
          className="hero-bg"
          src="/hero-image.jpg"
          alt="Erics Tidy Turf Luxury Landscaping Background"
          fill
          priority
          sizes="100vw"
          style={{ transition: "transform 0.1s ease-out", transformOrigin: "center center" }}
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          {/* Service Area Badge */}
          <div className="badge-serving">
            <span className="badge-dot" />
            Serving Greater New Orleans Since 2000
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            Outdoor living, <span className="italic-gold">elevated.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Landscape planning, hardscape, lighting and turf <br />
            — built to a standard the neighbors will notice.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <a href="#contact" className="btn btn-gold">
              Get My Free Estimate
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="tel:504-909-1424" className="btn btn-outline">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call (504) 909-1424
            </a>
          </div>

          {/* Trust Badges row */}
          <div className="trust-badges-row">
            <div className="trust-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              5.0 · Google Reviews
            </div>
            <div className="trust-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 11 11 13 15 9" />
              </svg>
              Licensed & Insured
            </div>
            <div className="trust-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
              26+ Years Experience
            </div>
            <div className="trust-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
              </svg>
              Satisfaction Guarantee
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">800+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">26+</span>
            <span className="stat-label">Years of Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5.0★</span>
            <span className="stat-label">Average Rating</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="services-header">
          <div className="services-title-block">
            <div className="services-tag">
              <span className="services-tag-line" />
              What We Build
            </div>
            <h2 className="services-main-heading">
              One team. Every layer of <br />the outdoor experience.
            </h2>
          </div>
          <p className="services-desc-block">
            From the first shovel to the final uplight — we handle it in-house, so nothing gets lost between crews.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <a key={index} href={`/services/${service.slug}`} className="service-card">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>
              <span className="service-card-link">
                Learn more
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Before / After Transformation Section */}
      <section id="work" className="transformation-section">
        <div className="transformation-header">
          <div className="transformation-title-block">
            <div className="transformation-tag">
              <span className="transformation-tag-line" />
              Before & After
            </div>
            <h2 className="transformation-main-heading">
              The transformation <br />speaks for itself.
            </h2>
          </div>
          <p className="transformation-desc-block">
            Drag the slider. Every project starts with a blank canvas — we finish with an outdoor room worth living in.
          </p>
        </div>

        {/* Interactive Before & After Slider */}
        <div className="slider-wrapper">
          <div
            ref={containerRef}
            className="slider-container"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* Before Image (underneath) */}
            <div className="slider-image-wrapper slider-image-before">
              <img
                className="slider-img"
                src="/beforeandafter/before.jpg"
                alt="Before landscaping work"
                draggable={false}
              />
              <span className="slider-label slider-label-before">Before</span>
            </div>

            {/* After Image (overlay, clipped from left to sliderPosition) */}
            <div
              className="slider-image-wrapper slider-image-after"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              <img
                className="slider-img"
                src="/beforeandafter/after.jpg"
                alt="After landscaping work"
                draggable={false}
              />
              <span className="slider-label slider-label-after">After</span>
            </div>

            {/* Handle Line */}
            <div
              className="slider-handle"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="slider-handle-button">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginLeft: "-4px" }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Cards Section below slider */}
        <div className="gallery-grid">
          <div className="gallery-card">
            <img
              className="gallery-card-bg"
              src="/gallery/firepit-courtyard.png"
              alt="Metairie firepit courtyard"
            />
            <div className="gallery-card-overlay" />
            <div className="gallery-card-content">
              <span className="gallery-card-tag">Hardscape</span>
              <h3 className="gallery-card-title">Metairie firepit courtyard</h3>
            </div>
          </div>

          <div className="gallery-card">
            <img
              className="gallery-card-bg"
              src="/gallery/palm-uplighting.png"
              alt="Uptown palm uplighting"
            />
            <div className="gallery-card-overlay" />
            <div className="gallery-card-content">
              <span className="gallery-card-tag">Lighting</span>
              <h3 className="gallery-card-title">Uptown palm uplighting</h3>
            </div>
          </div>

          <div className="gallery-card">
            <img
              className="gallery-card-bg"
              src="/gallery/fresh-sod-install.png"
              alt="Old Metairie fresh install"
            />
            <div className="gallery-card-overlay" />
            <div className="gallery-card-content">
              <span className="gallery-card-tag">Sod</span>
              <h3 className="gallery-card-title">Old Metairie fresh install</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Process / How It Works Section */}
      <section id="process" className="process-section">
        <div className="process-header">
          <div className="process-tag">
            <span className="process-tag-line" />
            How It Works
          </div>
          <h2 className="process-main-heading">
            A calm, predictable process — from first call to final walk-through.
          </h2>
        </div>

        <div className="process-grid">
          <div className="process-card">
            <span className="process-number">01</span>
            <h3 className="process-card-title">Consult</h3>
            <p className="process-card-desc">
              We visit, walk the property, and listen to how you want to live outside.
            </p>
          </div>
          <div className="process-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="process-card">
            <span className="process-number">02</span>
            <h3 className="process-card-title">Design</h3>
            <p className="process-card-desc">
              You get a clear plan with pricing — no vague estimates, no surprises.
            </p>
          </div>
          <div className="process-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="process-card">
            <span className="process-number">03</span>
            <h3 className="process-card-title">Build</h3>
            <p className="process-card-desc">
              Our in-house crew executes with obsessive attention to detail.
            </p>
          </div>
          <div className="process-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="process-card">
            <span className="process-number">04</span>
            <h3 className="process-card-title">Enjoy</h3>
            <p className="process-card-desc">
              We walk you through, then keep up landscaping/lawn maintenance if you'd like.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-section">
        <div className="why-header">
          <div className="why-tag">
            <span className="why-tag-line" />
            Why Choose <a href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">Eric&apos;s Tidy Turf</a>
          </div>
          <h2 className="why-main-heading">
            The difference is in the details you don't see.
          </h2>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="why-card-title">Licensed & Insured</h3>
            <p className="why-card-desc">
              Full coverage. Peace of mind on every job.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <h3 className="why-card-title">26+ Years, Local</h3>
            <p className="why-card-desc">
              Born and built in Greater New Orleans.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
              </svg>
            </div>
            <h3 className="why-card-title">Design-Led</h3>
            <p className="why-card-desc">
              We think like architects, not lawn guys.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3 className="why-card-title">In-House Crew</h3>
            <p className="why-card-desc">
              No subs vanishing mid-project.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="why-card-title">5-Star Track Record</h3>
            <p className="why-card-desc">
              Reviews that read like recommendations.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="why-card-title">Written Guarantee</h3>
            <p className="why-card-desc">
              We stand behind the work in writing.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section">
        <div className="reviews-header">
          <div className="reviews-tag">
            <span className="reviews-tag-line" />
            What Clients Say
          </div>
          <h2 className="reviews-main-heading">
            Trusted by homeowners across NOLA.
          </h2>
        </div>

        <div className="reviews-container">
          <div className="review-card">
            {/* Quote Icon Background decoration */}
            <div className="review-quote-icon">”</div>

            {/* Stars */}
            <div className="review-stars">
              {"★".repeat(REVIEWS[reviewIndex].stars)}
            </div>

            {/* Review text */}
            <div className="review-text-container">
              <div className={`review-text ${REVIEWS[reviewIndex].long ? "long" : ""}`}>
                {REVIEWS[reviewIndex].text}
              </div>
            </div>

            {/* Author Block */}
            <div className="review-author-block">
              <div className="review-avatar">
                {REVIEWS[reviewIndex].avatar}
              </div>
              <div className="review-author-info">
                <span className="review-author-name">{REVIEWS[reviewIndex].name}</span>
                <span className="review-author-meta">{REVIEWS[reviewIndex].meta}</span>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="review-indicators">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setReviewIndex(idx)}
                className={`review-dot ${idx === reviewIndex ? "active" : "inactive"}`}
                style={{ border: "none", outline: "none", padding: 0 }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Estimate Form Section */}
      <section id="quote" className="quote-section">
        <div className="quote-bg-gradient" />
        <div className="quote-container">
          {/* Left Column */}
          <div className="quote-left">
            <div className="quote-tag">
              <span className="quote-tag-line" />
              Request An Estimate
            </div>
            <h2 className="quote-heading">
              Build your project in 60 seconds.
            </h2>
            <p className="quote-desc">
              Answer a few questions, then we&apos;ll call to confirm the details. No pressure, no spam.
            </p>
            <div className="quote-bullets">
              <div className="quote-bullet-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-gold)" }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                No obligation
              </div>
              <div className="quote-bullet-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-gold)" }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Reply within 24h
              </div>
              <div className="quote-bullet-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-gold)" }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Free consult
              </div>
            </div>
          </div>

          {/* Right Column (Quote Card) */}
          <div className="quote-card">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit}>
                {/* Step Header */}
                <div className="quote-step-header">
                  <span>Step {stepIndex + 1} / 4</span>
                  <span>{["Services", "Property", "Timeline", "Contact"][stepIndex]}</span>
                </div>

                {/* Progress Bar */}
                <div className="quote-progress-bar">
                  <div className="quote-progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>

                {/* Step Content Wrapper */}
                <div style={{ minHeight: "280px" }}>
                  {stepIndex === 0 && (
                    <div>
                      <h3 className="quote-step-title">What are you dreaming up?</h3>
                      <p className="quote-step-subtitle">Pick everything that sounds right.</p>

                      <div className="options-grid">
                        {FORM_SERVICES.map(srv => {
                          const isSelected = selectedServices.includes(srv.id);
                          return (
                            <button
                              key={srv.id}
                              type="button"
                              onClick={() => {
                                setSelectedServices(prev =>
                                  prev.includes(srv.id) ? prev.filter(id => id !== srv.id) : [...prev, srv.id]
                                );
                              }}
                              className={`option-btn ${isSelected ? "selected" : ""}`}
                            >
                              <div className="option-icon" style={{ color: isSelected ? "var(--color-gold)" : "var(--color-forest)" }}>
                                {srv.icon}
                              </div>
                              <span className="option-label">{srv.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Paired suggestions */}
                      {pairedRecommendations.length > 0 && (
                        <div className="paired-container">
                          <div className="paired-title">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-emerald)", marginRight: "0.25rem" }}>
                              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Often paired with
                          </div>
                          <div className="paired-buttons">
                            {pairedRecommendations.map(rec => (
                              <button
                                key={rec.id}
                                type="button"
                                onClick={() => setSelectedServices(prev => [...prev, rec.id])}
                                className="paired-btn"
                              >
                                + Add {rec.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {stepIndex === 1 && (
                    <div>
                      <h3 className="quote-step-title">Tell us about the property.</h3>
                      <p className="quote-step-subtitle">Select your property type.</p>

                      <div className="options-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                        {["Residential", "Commercial"].map(type => {
                          const isSelected = propertyType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setPropertyType(type)}
                              className={`option-btn ${isSelected ? "selected" : ""}`}
                              style={{ padding: "2rem 1.5rem", alignItems: "center", justifyContent: "center" }}
                            >
                              <span className="option-label" style={{ fontSize: "1.1rem" }}>{type}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {stepIndex === 2 && (
                    <div>
                      <h3 className="quote-step-title">When do you want to start?</h3>
                      <p className="quote-step-subtitle">Select your ideal timeline.</p>

                      <div className="options-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                        {["ASAP", "1–2 months", "3–6 months", "Just planning"].map(time => {
                          const isSelected = timeframe === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setTimeframe(time)}
                              className={`option-btn ${isSelected ? "selected" : ""}`}
                              style={{ padding: "1.5rem 1rem", alignItems: "center", justifyContent: "center" }}
                            >
                              <span className="option-label" style={{ fontSize: "1.05rem" }}>{time}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {stepIndex === 3 && (
                    <div>
                      <h3 className="quote-step-title">Where should we send it?</h3>
                      <p className="quote-step-subtitle">Provide your contact info to get details.</p>

                      <div className="inputs-container">
                        <input
                          required
                          type="text"
                          placeholder="Full name"
                          value={formValues.name}
                          onChange={e => setFormValues(prev => ({ ...prev, name: e.target.value }))}
                          className="form-input"
                        />
                        <input
                          required
                          type="tel"
                          placeholder="Phone"
                          value={formValues.phone}
                          onChange={e => setFormValues(prev => ({ ...prev, phone: e.target.value }))}
                          className="form-input"
                        />
                        <input
                          type="email"
                          placeholder="Email (optional)"
                          value={formValues.email}
                          onChange={e => setFormValues(prev => ({ ...prev, email: e.target.value }))}
                          className="form-input"
                        />
                        <textarea
                          placeholder="Anything specific we should know?"
                          value={formValues.message}
                          onChange={e => setFormValues(prev => ({ ...prev, message: e.target.value }))}
                          className="form-textarea"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer buttons */}
                <div className="form-footer">
                  <button
                    type="button"
                    disabled={stepIndex === 0}
                    onClick={() => setStepIndex(prev => Math.max(0, prev - 1))}
                    className="form-back-btn"
                  >
                    ← Back
                  </button>

                  {stepIndex < 3 ? (
                    <button
                      type="button"
                      disabled={!isStepValid}
                      onClick={() => setStepIndex(prev => prev + 1)}
                      className="form-continue-btn"
                    >
                      Continue
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid}
                      className="form-submit-btn"
                    >
                      Get My Estimate
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>
            ) : (
              /* Success Screen */
              <div className="success-screen">
                <div className="success-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="success-title">Request received!</h3>
                <p className="success-desc">
                  Thanks {formValues.name.split(" ")[0]} — we&apos;ll reach out within 24 hours to schedule your walkthrough.
                </p>
                <a href="tel:+15049091424" className="success-call-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.25rem" }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Or call (504) 909-1424 now
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Area / Map Section */}
      <section className="area-section">
        <div className="area-container">
          {/* Left Column */}
          <div className="area-left">
            <div className="area-tag">
              <span className="area-tag-line" />
              Service Area
            </div>
            <h2 className="area-heading">
              Proudly serving Greater New Orleans.
            </h2>
            <p className="area-desc">
              Based in Gretna, working across the West Bank, Metairie, Uptown, and the North Shore.
            </p>

            <div className="area-badges-grid">
              {[
                { name: "Gretna", link: "/service-areas/gretna" },
                { name: "Metairie", link: "/service-areas/metairie" },
                { name: "New Orleans", link: "/service-areas/new-orleans" },
                { name: "Kenner", link: "/service-areas/kenner" },
                { name: "Harvey", link: "/service-areas/harvey" },
                { name: "Marrero", link: "/service-areas/marrero" },
                { name: "Algiers", link: null },
                { name: "Belle Chasse", link: null },
                { name: "Chalmette", link: null },
                { name: "River Ridge", link: null },
                { name: "Terrytown", link: null },
                { name: "Westwego", link: null }
              ].map((area, idx) => {
                const PinIcon = (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="area-pin-icon">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                );

                if (area.link) {
                  return (
                    <Link key={idx} href={area.link} className="area-badge link-badge">
                      {PinIcon}
                      {area.name}
                    </Link>
                  );
                } else {
                  return (
                    <div key={idx} className="area-badge">
                      {PinIcon}
                      {area.name}
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* Right Column (Map Embed) */}
          <div className="area-map-wrapper">
            <iframe
              title="Erics Tidy Turf Service Area Map"
              src="https://www.google.com/maps?q=Gretna,+LA+70053&z=11&output=embed"
              className="area-map-iframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="faq-header">
          <div className="faq-tag">
            <span className="faq-tag-line" />
            Frequently Asked
          </div>
          <h2 className="faq-heading">Answers before you ask.</h2>
        </div>

        <div className="faq-container">
          {/* Search Box */}
          <div className="faq-search-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="faq-search-icon">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search FAQs..."
              value={faqSearchQuery}
              onChange={e => {
                setFaqSearchQuery(e.target.value);
                setOpenFaqIndex(null);
              }}
              className="faq-search-input"
            />
          </div>

          {/* Accordion */}
          {filteredFaqs.length > 0 ? (
            <div className="faq-accordion">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="faq-trigger"
                    >
                      <span className="faq-question">{faq.q}</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="faq-chevron">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div className="faq-content">
                      <p className="faq-answer">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="faq-empty-state">
              No answers found matching &ldquo;{faqSearchQuery}&rdquo;. Try another search term!
            </div>
          )}
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
              <li className="footer-link-item"><a href="#services">Landscaping</a></li>
              <li className="footer-link-item"><a href="#services">Hardscaping</a></li>
              <li className="footer-link-item"><a href="#services">Landscape Lighting</a></li>
              <li className="footer-link-item"><a href="#services">Drainage</a></li>
              <li className="footer-link-item"><a href="#services">Irrigation</a></li>
              <li className="footer-link-item"><a href="#services">Grading</a></li>
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
            <a href="#quote" className="footer-btn">
              Free Estimate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.25rem" }}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
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

// Services Data with exact custom icons and slugs for separate pages
const SERVICES = [
  {
    title: "Landscaping",
    slug: "landscaping",
    desc: "Design-forward planting, beds & garden architecture.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-5M17 17H7a5 5 0 0 1-3.46-8.6A6 6 0 0 1 12 3a6 6 0 0 1 8.46 5.4A5 5 0 0 1 17 17z" />
      </svg>
    ),
  },
  {
    title: "Hardscaping",
    slug: "hardscaping",
    desc: "Custom pavers, patios, walkways & retaining walls.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Landscape Lighting",
    slug: "landscape-lighting",
    desc: "Low-voltage systems that make the yard glow.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5.5 5.5 0 0 0 12.5 2.5c-3 0-5.5 2.5-5.5 5.5 0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5M9 18h6M10 22h4" />
      </svg>
    ),
  },
  {
    title: "Drainage",
    slug: "drainage",
    desc: "French drains & grading that solve standing water.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 11 5 15a7 7 0 0 0 7 7z" />
      </svg>
    ),
  },
  {
    title: "Irrigation",
    slug: "irrigation",
    desc: "Smart, water-efficient sprinkler systems.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1c.6.5 1.2 1 2.5 1s1.9-.5 2.5-1c.6-.5 1.2-1 2.5-1s1.9.5 2.5 1" />
      </svg>
    ),
  },
  {
    title: "Grading",
    slug: "grading",
    desc: "Precision site prep for a permanent foundation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
        <path d="M6 7v4M10 7v3M14 7v4M18 7v3" />
      </svg>
    ),
  },
  {
    title: "Sod Installation",
    slug: "sod-installation",
    desc: "Premium sod, lush from day one.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 8.5C17 15 15 18 11 20z" />
        <path d="M19 2L9.8 13.8" />
      </svg>
    ),
  },
  {
    title: "Artificial Turf",
    slug: "artificial-turf",
    desc: "Year-round green, zero landscaping/lawn maintenance.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    ),
  },
  {
    title: "Landscaping/Lawn Maintenance",
    slug: "landscaping-lawn-maintenance",
    desc: "Seasonal programs to keep it magazine-ready.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: "Pavers",
    slug: "pavers",
    desc: "Driveways, pool decks, entry walks & more.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
      </svg>
    ),
  },
];

// 5-Star Customer Reviews
const REVIEWS = [
  {
    stars: 5,
    text: "“Eric and his crew did an awesome job on our landscape. We wrote the vision and they made it come to fruition. My husband and I are very happy with the outcome of their work and will recommend them 100 times over. Thanks for making our landscape come to life.”",
    name: "Jane Smothers",
    meta: "3 months ago",
    avatar: "JS"
  },
  {
    stars: 5,
    text: (
      <>
        “Had <a href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}>Eric's Tidy Turf</a> update our front yard landscape. Awesome job!! Definitely the company to get the work done.”
      </>
    ),
    name: "Keith Savoie",
    meta: "1 review · 2 photos · 2 months ago",
    avatar: "KS"
  },
  {
    stars: 5,
    text: (
      <>
        <strong>Reasonable price</strong>
        <br />
        “Eric did an outstanding job on our landscaping! From start to finish, he was professional, reliable, and easy to work with. He really took the time to understand what we wanted and brought great ideas to the table to make everything look even better than we imagined.
        <br /><br />
        The attention to detail was impressive—everything was done neatly and with care, and the final result completely transformed our yard. He showed up when he said he would, communicated clearly throughout the process, and made sure we were happy every step of the way.
        <br /><br />
        To be honest—we tried using someone else last year only bc of convenience, and it made us appreciate Eric even more. Lesson learned, and we won’t be making that mistake again!
        <br /><br />
        If you’re looking for someone who takes pride in their work and delivers beautiful results, I highly recommend Eric. We couldn’t be happier!”
      </>
    ),
    name: "Amy Danos",
    meta: "4 months ago",
    avatar: "AD",
    long: true
  },
  {
    stars: 5,
    text: (
      <>
        “<a href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}>Eric’s Tidy Turf Landscaping</a> delivered absolutely outstanding 5-star service from start to finish. Eric was professional, punctual, and paid attention to every detail. The quality of the work exceeded expectations, and the yard has never looked better. Communication was excellent throughout the entire process, and it’s clear they truly care about customer satisfaction and taking pride in their work. If you’re looking for reliable, high-quality landscaping services, I highly recommend <a href="https://www.google.com/maps/place/Eric+Tidy+Turf/@30.0002549,-90.0254014,10z/data=!3m1!4b1!4m6!3m5!1s0x8620a72b11144a21:0xadc1ae7cf956345e!8m2!3d30.0002549!4d-90.0254014!16s%2Fg%2F11jvmmqppm?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}>Eric’s Tidy Turf Landscaping</a>!”
      </>
    ),
    name: "Ryan Hunter",
    meta: "2 months ago",
    avatar: "RH",
    long: true
  }
];

// Options for Form Step 1
const FORM_SERVICES = [
  {
    id: "landscaping",
    label: "Landscaping",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-5M17 17H7a5 5 0 0 1-3.46-8.6A6 6 0 0 1 12 3a6 6 0 0 1 8.46 5.4A5 5 0 0 1 17 17z" />
      </svg>
    )
  },
  {
    id: "hardscape",
    label: "Hardscape / Pavers",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
      </svg>
    )
  },
  {
    id: "lighting",
    label: "Lighting",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    )
  },
  {
    id: "drainage",
    label: "Drainage",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
      </svg>
    )
  },
  {
    id: "irrigation",
    label: "Irrigation",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    id: "sod",
    label: "Sod Install",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22h20M12 2v20M2 12h20" />
      </svg>
    )
  },
  {
    id: "turf",
    label: "Artificial Turf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M9 9h6v6H9z" />
      </svg>
    )
  },
  {
    id: "maintenance",
    label: "Landscaping/Lawn Maintenance",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  }
];

// Paired recommendations lookup map
const PAIRED_SUGGESTIONS: Record<string, string[]> = {
  landscaping: ["lighting", "irrigation"],
  hardscape: ["lighting", "drainage"],
  sod: ["irrigation", "maintenance"],
  turf: ["drainage", "hardscape"],
  drainage: ["sod", "landscaping"],
  lighting: ["landscaping", "hardscape"],
  irrigation: ["sod", "maintenance"],
  maintenance: ["lighting", "landscaping"]
};

// FAQs Data
const FAQS = [
  {
    q: "Are you licensed and insured?",
    a: "Yes — fully licensed for landscaping and hardscape work in Louisiana, and carry general liability plus workers' comp."
  },
  {
    q: "What areas do you serve?",
    a: "Greater New Orleans including Gretna, Metairie, Uptown, Algiers, Kenner, Harvey, Marrero, and the North Shore."
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes. Every project starts with a free on-site consultation and written proposal."
  },
  {
    q: "How long does a typical project take?",
    a: "Most residential builds run 3–14 days depending on scope. We give you a firm schedule before we start."
  },
  {
    q: "Do you handle design as well as install?",
    a: "Absolutely — we design in-house and build in-house. One team, one point of contact."
  },
  {
    q: "What kind of pavers do you install?",
    a: "Belgard, Techo-Bloc, and natural stone. We'll help you pick the right product for your look and budget."
  },
  {
    q: "Can you fix drainage problems?",
    a: "Yes. French drains, grading, dry creek beds, catch basins — we solve it at the source."
  },
  {
    q: "Is artificial turf really landscaping/lawn maintenance-free?",
    a: "Nearly. A rinse now and then. Modern turf looks and feels remarkably real."
  },
  {
    q: "Do you offer ongoing landscaping/lawn maintenance?",
    a: "Yes — weekly, bi-weekly, or seasonal programs available."
  },
  {
    q: "How soon can you start?",
    a: "Peak season books 2–4 weeks out. Off-season we're often able to start within a week."
  },
  {
    q: "Do you pull permits?",
    a: "When required, yes. We handle it as part of the scope."
  },
  {
    q: "What financing is available?",
    a: "We can point you to trusted financing partners for larger projects."
  },
  {
    q: "Do you warranty your work?",
    a: "Yes — installation is warrantied, and manufacturer warranties pass through on materials."
  },
  {
    q: "What's the deposit structure?",
    a: "Typically a small deposit to schedule, progress payments during the build, balance at final walk-through."
  },
  {
    q: "Can I see recent projects nearby?",
    a: "Absolutely — ask during your consult and we'll share addresses in your neighborhood."
  }
];

