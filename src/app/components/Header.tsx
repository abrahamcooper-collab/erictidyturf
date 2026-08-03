"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const AREAS_LIST = [
  { title: "Gretna", slug: "gretna" },
  { title: "Metairie", slug: "metairie" },
  { title: "New Orleans", slug: "new-orleans" },
  { title: "Kenner", slug: "kenner" },
  { title: "Harvey", slug: "harvey" },
  { title: "Marrero", slug: "marrero" }
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close menu when window resizes beyond mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleDropdownClick = (name: string, e: React.MouseEvent) => {
    if (window.innerWidth <= 991) {
      e.preventDefault();
      e.stopPropagation();
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  const isServicesActive = pathname.startsWith("/services/");
  const isAreasActive = pathname.startsWith("/service-areas/");

  const headerClass = isHome
    ? "header-wrapper"
    : "header-wrapper header-fixed";

  const headerStyle = isHome
    ? undefined
    : { position: "sticky" as const, top: 0, zIndex: 1100 };

  return (
    <header className={headerClass} style={headerStyle}>
      <nav className={`navbar ${isMenuOpen ? "mobile-open" : ""}`}>
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
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li className={`dropdown-container ${activeDropdown === "services" ? "open" : ""}`}>
            <span
              className={`nav-link dropdown-trigger ${isServicesActive ? "active" : ""}`}
              onClick={(e) => handleDropdownClick("services", e)}
            >
              Services
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="dropdown-caret">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
            <ul className="dropdown-menu">
              {SERVICES_LIST.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} onClick={() => setIsMenuOpen(false)}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className={`dropdown-container ${activeDropdown === "areas" ? "open" : ""}`}>
            <span
              className={`nav-link dropdown-trigger ${isAreasActive ? "active" : ""}`}
              onClick={(e) => handleDropdownClick("areas", e)}
            >
              Service Areas
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="dropdown-caret">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
            <ul className="dropdown-menu">
              {AREAS_LIST.map((area) => (
                <li key={area.slug}>
                  <Link href={`/service-areas/${area.slug}`} onClick={() => setIsMenuOpen(false)}>
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link href="/#work" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Work
            </Link>
          </li>
          <li>
            <Link href="/#process" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Process
            </Link>
          </li>
          <li>
            <Link href="/#reviews" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Reviews
            </Link>
          </li>
          <li>
            <Link href="/#faq" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/#quote" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>

          {/* Mobile-only action buttons inside drawer */}
          <li className="mobile-nav-actions">
            <a href="tel:504-909-1424" className="btn btn-nav-phone" onClick={() => setIsMenuOpen(false)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="phone-icon"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (504) 909-1424
            </a>
            <Link href="/#quote" className="btn btn-primary btn-estimate" onClick={() => setIsMenuOpen(false)}>
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
                className="arrow-icon"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </li>
        </ul>

        {/* Desktop-only Action Buttons */}
        <div className="nav-actions desktop-only">
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
              className="phone-icon"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="phone-text">(504) 909-1424</span>
          </a>
          <Link href="/#quote" className="btn btn-primary btn-estimate" onClick={() => setIsMenuOpen(false)}>
            <span>Free Estimate</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="arrow-icon"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {/* Hamburger Toggle Button */}
        <button
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>
      </nav>
    </header>
  );
}
