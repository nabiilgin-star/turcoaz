'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PvcProfilView() {
  return (
    <div className="pvc-container">
      {/* SAYFAYA ÖZEL CSS */}
      <style>{`
        .pvc-container { display: flex; flex-direction: column; gap: 40px; width: 100%; color: #334155; fontFamily: 'Poppins', sans-serif; }
        .pvc-section-title { font-size: 24px; font-weight: 800; color: #0F172A; border-bottom: 2px solid #E2E8F0; padding-bottom: 10px; margin-bottom: 24px; }
        
        /* Hero Section */
        .pvc-hero { display: flex; gap: 32px; background: #FFFFFF; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); align-items: center; border: 1px solid #E2E8F0; }
        .pvc-hero-text { flex: 1; }
        .pvc-hero-img { flex: 1; display: flex; justify-content: center; position: relative; width: 100%; min-height: 320px; }
        .btn-primary { background: #00A8CC; color: white; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; transition: 0.2s; }
        .btn-pdf { background: #c5a491; color: white; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; transition: 0.2s; box-shadow: 0 2px 8px rgba(197, 164, 145, 0.35); }
        
        /* Grid Layouts */
        .pvc-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .pvc-feature-card { background: #FFFFFF; padding: 24px; border-radius: 12px; border: 1px solid #E2E8F0; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .pvc-feature-icon { font-size: 32px; margin-bottom: 16px; color: #00A8CC; }
        
        /* Tech Specs */
        .pvc-tech-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; background: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid #E2E8F0; }
        .pvc-table { width: 100%; border-collapse: collapse; }
        .pvc-table th, .pvc-table td { padding: 14px 16px; border-bottom: 1px solid #E2E8F0; text-align: left; }
        .pvc-table th { background: #F8FAFC; font-weight: 700; color: #475569; width: 40%; }
        
        /* Profiles Grid */
        .pvc-profiles-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .pvc-profile-card { display: flex; align-items: center; gap: 16px; background: #FFFFFF; padding: 16px; border-radius: 12px; border: 1px solid #E2E8F0; }
        
        /* Colors */
        .pvc-colors-flex { display: flex; flex-wrap: wrap; gap: 24px; }
        .pvc-color-item { display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; }
        .pvc-color-box { width: 60px; height: 60px; border-radius: 50%; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); border: 1px solid #E2E8F0; }

        @media (max-width: 900px) {
          .pvc-hero { flex-direction: column; padding: 24px; }
          .pvc-features-grid { grid-template-columns: 1fr 1fr; }
          .pvc-tech-grid { grid-template-columns: 1fr; }
          .pvc-profiles-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .pvc-features-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1. HERO BÖLÜMÜ */}
      <section className="pvc-hero">
        <div className="pvc-hero-text">
          {/* SEO Uyumlu H1 */}
          <h1 style={{ fontSize: "30px", fontWeight: "800", color: "#0F172A", marginBottom: "16px", lineHeight: "1.2" }}>
            Profile PVC Fără Plumb EXEN 6040A <br/>
            <span style={{ color: "#00A8CC", fontSize: "22px" }}>Sistem Premium Tâmplărie PVC</span>
          </h1>
          
          {/* SEO Paragrafı (Anahtar Kelimeler Entegre Edildi) */}
          <p style={{ fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "20px", color: "#475569" }}>
            La Turcoaz Aluminiu găsiți <strong>profile PVC fără plumb</strong> din seria ecologică EXEN 6040A (4 camere, lățime 60 mm). 
            Soluții de înaltă calitate pentru <strong>tâmplărie PVC</strong> cu izolație termică și fonică excelentă. 
            Verificați oferta de <strong>profile PVC preț</strong> avantajos direct din depozitele noastre din Popești-Leordeni și Iași.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <a href="/catalog-exen.pdf" target="_blank" rel="noopener noreferrer" className="btn-pdf">
              Catalog PDF
            </a>
            <Link href="/contact" className="btn-primary">
              Solicită Ofertă de Preț
            </Link>
          </div>
        </div>

        <div className="pvc-hero-img">
          {/* Next.js Image Yapısı */}
          <Image 
            src="https://res.cloudinary.com/oivvupgw/image/upload/v1789256461/PVC_Main_Image.jpg" 
            alt="profile PVC fara plumb EXEN 6040A sectiune 3D si schita tehnica" 
            fill
            style={{ objectFit: "contain", borderRadius: "12px" }}
            priority
          />
        </div>
      </section>

      {/* 2. ÖNE ÇIKAN ÖZELLİKLER */}
      <section>
        <h2 className="pvc-section-title">Avantaje și Performanțe Tehnice Profile PVC</h2>
        <div className="pvc-features-grid">
          {[
            { icon: "🔲", title: "4 Camere & 60 mm", desc: "Structură optimă pentru izolație termică ridicată." },
            { icon: "🌡️", title: "Eficiență Energetică", desc: "Coeficient de transfer termic Uf = 1.432 W/m²K." },
            { icon: "🍃", title: "Ecologic (Lead-Free)", desc: "Formula 100% fără plumb protejează mediul." },
            { icon: "🔇", title: "Izolare Fonică", desc: "Protecție acustică de până la 58 dB." },
            { icon: "🏗️", title: "Armătură Unificată", desc: "Oțel unificat pentru toc, aripă și teu." },
            { icon: "⚙️", title: "Sistem 'Dublu Click'", desc: "Montaj rapid al baghetelor (5 mm - 24 mm)." }
          ].map((feat, i) => (
            <div key={i} className="pvc-feature-card">
              <div className="pvc-feature-icon">{feat.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#0F172A" }}>{feat.title}</h3>
              <p style={{ fontSize: "14px", color: "#64748B", lineHeight: "1.5" }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TEKNİK ÖZELLİKLER */}
      <section className="pvc-tech-grid">
        <div style={{ position: "relative", width: "100%", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Image 
            src="https://res.cloudinary.com/oivvupgw/image/upload/v1789256461/PVC_Technical_Drawing.jpg" 
            alt="schita tehnica tamplarie si profile PVC EXEN 6040A" 
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "20px", color: "#0F172A" }}>Specificații Tehnice Sistem EXEN 6040A</h2>
          <table className="pvc-table">
            <tbody>
              <tr><th>Lățime Profil</th><td>60 mm</td></tr>
              <tr><th>Număr Camere</th><td>4 Camere</td></tr>
              <tr><th>Grosime Perete</th><td>2.4 mm (Toleranță)</td></tr>
              <tr><th>Vitrare (Geam)</th><td>5 mm – 24 mm</td></tr>
              <tr><th>Izolație Termică</th><td>Uf = 1.432 W/m²K</td></tr>
              <tr><th>Izolare Acustică</th><td>Până la 58 dB</td></tr>
              <tr><th>Sistem Etanșare</th><td>Garnituri TPV, pantă evacuare 10°</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. PROFİL KATALOĞU */}
      <section>
        <h2 className="pvc-section-title">Catalog Profile PVC Sistem 6040A</h2>
        <div className="pvc-profiles-grid">
          {[
            { name: "Profil Toc 60 mm", code: "6040A-10", weight: "1.024 gr/m" },
            { name: "Profil Aripă 60 mm", code: "6040A-20", weight: "1.237 gr/m" },
            { name: "Profil Teu 60 mm", code: "6040A-30", weight: "1.151 gr/m" },
            { name: "Profil Ușă Interior", code: "6040A-50", weight: "1.638 gr/m" },
            { name: "Baghetă Geam 24mm", code: "6040A-80", weight: "284 gr/m" },
            { name: "Profile Auxiliare", code: "6040A-100/110", weight: "Diverse" }
          ].map((prof, i) => (
            <div key={prof.code || i} className="pvc-profile-card">
              <div style={{ width: "60px", height: "60px", background: "#F1F5F9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#94A3B8" }}>Desen</div>
              <div>
                <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A", margin: "0 0 4px 0" }}>{prof.name}</h4>
                <div style={{ fontSize: "13px", color: "#64748B" }}>
                  <span style={{ background: "#E2E8F0", padding: "2px 6px", borderRadius: "4px", marginRight: "8px" }}>Cod: {prof.code}</span>
                  Greutate: {prof.weight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. RENK SEÇENEKLERİ */}
      <section>
        <h2 className="pvc-section-title">Gamă de Culori și Finisaje Laminate</h2>
        <div className="pvc-colors-flex">
          {[
            { name: "Alb Standard", color: "#FFFFFF" },
            { name: "Gri Antracit", color: "#374151" },
            { name: "Stejar Auriu", color: "#B48356" },
            { name: "Mahon", color: "#4A1A17" },
            { name: "Nuc (Stejar Închis)", color: "#3E2723" }
          ].map((c, i) => (
            <div key={i} className="pvc-color-item">
              <div className="pvc-color-box" style={{ background: c.color }}></div>
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}