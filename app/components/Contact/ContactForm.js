"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "./Contact.css";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactForm({ className = "", contactImage }) {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!consent) {
      setStatusMessage(
        "Vă rugăm să acceptați prelucrarea datelor personale."
      );
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS: lipsesc variabilele de mediu NEXT_PUBLIC_EMAILJS_*");
      setStatusMessage(
        "Formularul nu este configurat momentan. Vă rugăm să ne sunați sau să ne scrieți la info@turcoaz.com."
      );
      return;
    }

    setLoading(true);
    setStatusMessage("");

    const formData = {
      from_name: form.elements["name"].value,
      company: form.elements["company"].value || "Nespecificat",
      phone: form.elements["phone"].value,
      email: form.elements["email"].value,
      message: form.elements["message"].value,
      gdpr_consent: "Da",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formData,
        EMAILJS_PUBLIC_KEY
      );

      setStatusMessage("Mesajul a fost trimis cu succes!");
      form.reset();
      setConsent(false);
    } catch (error) {
      console.error("Eroare la trimitere:", error);
      setStatusMessage("A apărut o eroare. Vă rugăm să încercați din nou.");
    } finally {
      setLoading(false);
    }
  };

  const imageUrl =
    contactImage ||
    "https://res.cloudinary.com/oivvupgw/image/upload/v1784416492/Turcoaz_fatade_s7zdev.jpg";

  const locations = [
    {
      title: "Popești‑Leordeni (Depozit Central)",
      company: "Turcoaz Aluminiu SRL",
      address: "Str. Taberei nr. 6, Popești‑Leordeni, Ilfov",
      phone: "+40 730 63 00 63",
      phoneRaw: "+40730630063",
      email: "info@turcoaz.com",
    },
    {
      title: "Șos. Giurgiului (Magazin)",
      company: "Turcoaz Aluminiu SRL",
      address: "Str. Orăștie, Sector 4, București",
      phone: "+40 720 097 224",
      phoneRaw: "+40720097224",
      email: "info@turcoaz.com",
    },
    {
      title: "Iași (Depozit)",
      company: "Alufab SRL",
      address: "Str. Trei Fântâni, Iași",
      phone: "+40 746 921 162",
      phoneRaw: "+40746921162",
      email: "alufab.iasi@gmail.com",
    },
  ];

  return (
    <section id="contact" className={`contact-section ${className}`}>
      <div className="container-max">
        <div className="contact-container">
          <h2 className="contact-title">Contactați-ne</h2>

          <div className="locations-grid">
            {locations.map((loc, index) => (
              <div className="location-card" key={index}>
                <div className="loc-card-header">
                  <h3>{loc.title}</h3>
                </div>
                <p className="loc-company">{loc.company}</p>
                <ul className="loc-details">
                  <li>
                    <MapPin size={16} />
                    <span>{loc.address}</span>
                  </li>
                  <li>
                    <Phone size={16} />
                    <a href={`tel:${loc.phoneRaw}`}>{loc.phone}</a>
                  </li>
                  <li>
                    <Mail size={16} />
                    <a href={`mailto:${loc.email}`}>{loc.email}</a>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <div className="contact-split-layout">
            <div className="contact-left-col">
              <div className="contact-image-col">
                <Image
                  src={imageUrl}
                  alt="Depozit și echipa Turcoaz Aluminiu"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="contact-image"
                />
              </div>

              <div className="schedule-box">
                <div className="schedule-header">
                  <Clock size={18} />
                  <h4>Program de Lucru</h4>
                </div>
                <div className="schedule-row">
                  <span>Luni – Vineri:</span>
                  <strong>08:00 – 17:00</strong>
                </div>
                <div className="schedule-row">
                  <span>Sâmbătă – Duminică:</span>
                  <span className="closed-text">Închis</span>
                </div>
              </div>
            </div>

            <div className="contact-form-col">
              <div className="contact-card">
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Nume complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Introdu numele tău"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="company" className="form-label">
                        Companie (Opțional)
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        autoComplete="organization"
                        placeholder="Numele companiei"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        placeholder="+40 123 456 789"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="email@exemplu.com"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="message" className="form-label">
                        Mesaj *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Scrie mesajul tău aici..."
                        className="form-textarea"
                        required
                      ></textarea>
                    </div>

                    <div className="form-group full-width">
                      <label className="gdpr-consent">
                        <input
                          type="checkbox"
                          name="gdpr"
                          required
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                        />
                        <span>
                          Sunt de acord cu prelucrarea datelor personale
                          conform{" "}
                          <Link href="/politica-confidentialitate">
                            Politicii de confidențialitate
                          </Link>
                          .
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={loading}
                  >
                    <Send size={18} />
                    {loading ? "Se trimite..." : "Trimite mesajul"}
                  </button>

                  {statusMessage && (
                    <p
                      role="status"
                      aria-live="polite"
                      style={{
                        marginTop: "1rem",
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                    >
                      {statusMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}