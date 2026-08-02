"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-accordion">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
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
  );
}
