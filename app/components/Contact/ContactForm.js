"use client";

import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";
import "./Contact.css";

export default function ContactForm({ className = "", contactImage }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mesaj trimis! (Simulare)");
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
      email: "turcoaztrading@yahoo.com"
    },
    {
      title: "Șos. Giurgiului (Magazin)",
      company: "Turcoaz Aluminiu SRL",
      address: "Str. Orăștie, Sector 4, București",
      phone: "+40 720 097 224",
      phoneRaw: "+40720097224",
      email: "turcoaztrading@yahoo.com"
    },
    {
      title: "Iași (Depozit)",
      company: "Alufab SRL",
      address: "Str. Trei Fântâni, Iași",
      phone: "+40 746 921 162",
      phoneRaw: "+40746921162",
      email: "alufab.iasi@gmail.com"
    }
  ];

  return (
    <section id="contact" className={`contact-section ${className}`}>
      <div className="container-max">
        <div className="contact-container">
          <h2 className="contact-title">Contactați-ne</h2>

          {/* Üst Kısım: 3 Depo/Lokasyon Kartları */}
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

          {/* Alt Kısım: Görsel ve Form Layout (Orijinal Yapı) */}
          <div className="contact-split-layout">
            
            {/* Sol Sütun: Görsel ve Çalışma Saatleri */}
            <div className="contact-left-col">
              <div className="contact-image-col">
                <Image
                  src={imageUrl}
                  alt="Contact Support"
                  fill
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

            {/* Sağ Sütun: Form Kutusu */}
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
                        placeholder="Scrie mesajul tău aici..."
                        className="form-textarea"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn-submit">
                    <Send size={18} />
                    Trimite mesajul
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}