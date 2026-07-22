"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "./FAQ.css";

export default function FAQ({ faqs: propFaqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = propFaqs || [];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container-max">
        <h2 className="section-title">Intrebari frecvente</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div
              key={faq.id || index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <button className="faq-trigger">
                <span className="faq-question">{faq.question}</span>
                <div className="faq-icon">
                  {openIndex === index ? (
                    <Minus size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </div>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-content">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
