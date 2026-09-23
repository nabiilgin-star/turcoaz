import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import { getNavbarData } from "@/app/lib/get-nav-data";

// ----------------------------------------------------------------------
// 1. REGIONAL B2B SEO METADATA - IAȘI / ALUFAB
// ----------------------------------------------------------------------
export const metadata = {
  title: "Depozit Profile Aluminiu Iași — Filiala Regională Alufab | Turcoaz",
  description:
    "Filiala regională Alufab Iași: depozit de profile din aluminiu AKPA, glafuri exterioare, panouri compozite ACP Bond și accesorii tâmplărie în Iași și regiunea Moldova.",
  alternates: {
    canonical: "https://turcoaz.com/depozit-aluminiu-iasi",
  },
  openGraph: {
    title: "Depozit Profile Aluminiu Iași — Filiala Regională Alufab | Turcoaz",
    description:
      "Distribuitor de profile din aluminiu, glafuri, accesorii ferestre și panouri compozite ACP în Iași. Stoc permanent și livrare rapidă în toată regiunea Moldova.",
    url: "https://turcoaz.com/depozit-aluminiu-iasi",
    siteName: "Turcoaz Aluminiu",
    locale: "ro_RO",
    type: "website",
  },
};

// ----------------------------------------------------------------------
// 2. LOCAL BUSINESS & WAREHOUSE JSON-LD SCHEMA - IAȘI
// ----------------------------------------------------------------------
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "WholesaleStore",
  "name": "Turcoaz Aluminiu - Filiala Regională Alufab Iași",
  "image": "https://res.cloudinary.com/oivvupgw/image/upload/v1784416492/Turcoaz_fatade_s7zdev.jpg",
  "@id": "https://turcoaz.com/depozit-aluminiu-iasi#warehouse",
  "url": "https://turcoaz.com/depozit-aluminiu-iasi",
  "telephone": "+40700000000", // Telefon numaranızla güncelleyebilirsiniz
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Iași",
    "addressLocality": "Iași",
    "addressRegion": "Iași",
    "postalCode": "700000",
    "addressCountry": "RO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.1585,
    "longitude": 27.6014
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "08:30",
    "closes": "17:30"
  }
};

export default async function DepozitIasiPage() {
  const navData = await getNavbarData();

  const breadcrumbItems = [
    { label: "Acasă", href: "/" },
    { label: "Depozit Regional Iași (Alufab)", href: "#" },
  ];

  return (
    <main className="page" style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      {/* Google Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Navbar
        categories={navData.categories}
        products={navData.products}
        announcement={navData.announcement}
      />

      <div style={{ maxWidth: "1320px", margin: "20px auto 0", padding: "0 24px" }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* HERO SECTION */}
      <section style={{ maxWidth: "1320px", margin: "30px auto", padding: "0 24px" }}>
        <div style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          borderRadius: "24px",
          padding: "48px 36px",
          color: "#FFFFFF",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
        }}>
          <span style={{
            backgroundColor: "#00A8CC",
            color: "#FFFFFF",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Filiala Regională Alufab Iași
          </span>
          <h1 style={{ fontSize: "36px", fontWeight: "800", marginTop: "16px", marginBottom: "16px", lineHeight: "1.2" }}>
            Depozit Profile Aluminiu, Glafuri & Panouri Compozite — Iași & Regiunea Moldova
          </h1>
          <p style={{ fontSize: "16px", color: "#94A3B8", maxWidth: "800px", lineHeight: "1.6" }}>
            Prin filiala noastră regională Alufab din Iași, S.C. Turcoaz Aluminiu S.R.L. asigură distribuția rapidă de sisteme din aluminiu, glafuri profesionale și accesorii pentru atelierele de tâmplărie și șantierele din județele Iași, Suceava, Botoșani, Neamț, Bacău și Vaslui.
          </p>
          
          <div style={{ display: "flex", gap: "16px", marginTop: "28px", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/40700000000?text=Buna%20ziua,%20doresc%20o%20oferta%20pentru%20depozitul%20Alufab%20Iasi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: "700",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              💬 Solicită Ofertă Rapidă la Iași
            </a>
            <a
              href="/categorii"
              style={{
                backgroundColor: "#00A8CC",
                color: "#FFFFFF",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: "700",
                textDecoration: "none"
              }}
            >
              📦 Vezi Catalogul de Stoc
            </a>
          </div>
        </div>
      </section>

      {/* PRODUSE DISPONIBILE ÎN DEPOZITUL IAȘI */}
      <section style={{ maxWidth: "1320px", margin: "40px auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", marginBottom: "24px" }}>
          Sisteme și Materiale Disponibile prin Filiala Alufab Iași
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          
          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00A8CC" }}>Glafuri din Aluminiu Extrudat</h3>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "8px" }}>
              Pervazuri exterioare din aluminiu rezistente la intemperii, disponibile pe stoc la Iași în nuanțe Alb, Maro, Antracit Gri, Stejar Auriu și Nuc.
            </p>
            <a href="/categorii/glafuri-din-aluminiu" style={{ display: "inline-block", marginTop: "12px", color: "#0F172A", fontWeight: "700", fontSize: "14px" }}>
              Detalii Glafuri →
            </a>
          </div>

          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00A8CC" }}>Sisteme Tâmplărie AKPA</h3>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "8px" }}>
              Profile din aluminiu AKPA pentru uși, ferestre, uși glisante și pereți cortină cu certificate de calitate și izolare termică superioară.
            </p>
            <a href="/categorii/sisteme-aluminiu-akpa" style={{ display: "inline-block", marginTop: "12px", color: "#0F172A", fontWeight: "700", fontSize: "14px" }}>
              Detalii Sisteme AKPA →
            </a>
          </div>

          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00A8CC" }}>Panouri Compozite ACP Bond</h3>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "8px" }}>
              Panouri aluminiu compozit PrimeBond, DURA BOND și RallBond pentru placări exterioare, fațade și proiecte comerciale.
            </p>
            <a href="/categorii/acp-aluminiu-compozit-panel-bond" style={{ display: "inline-block", marginTop: "12px", color: "#0F172A", fontWeight: "700", fontSize: "14px" }}>
              Detalii ACP Bond →
            </a>
          </div>

          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00A8CC" }}>Accesorii & Feronerie Tâmplărie</h3>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "8px" }}>
              Gama completă de accesorii KAHE, garnituri, colțare și elemente de fixare pentru sisteme din aluminiu și PVC.
            </p>
            <a href="/categorii" style={{ display: "inline-block", marginTop: "12px", color: "#0F172A", fontWeight: "700", fontSize: "14px" }}>
              Vezi Toate Categoriile →
            </a>
          </div>

        </div>
      </section>

      {/* AVANTAJE FILIALA IAȘI */}
      <section style={{ maxWidth: "1320px", margin: "40px auto", padding: "0 24px" }}>
        <div style={{ background: "#FFFFFF", padding: "36px", borderRadius: "20px", border: "1px solid #E2E8F0" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginBottom: "16px" }}>
            Avantajele colaborării cu Filiala Regională Alufab Iași
          </h2>
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            <li style={{ fontSize: "15px", color: "#475569", lineHeight: "1.5" }}>
              ✔️ <strong>Apropiere de clienții din Moldova:</strong> Reducem timpii de livrare pentru județele din nord-estul țării.
            </li>
            <li style={{ fontSize: "15px", color: "#475569", lineHeight: "1.5" }}>
              ✔️ <strong>Stocuri optimizate regional:</strong> Acces rapid la cele mai căutate profile, glafuri și nuanțe RAL.
            </li>
            <li style={{ fontSize: "15px", color: "#475569", lineHeight: "1.5" }}>
              ✔️ <strong>Prețuri unice de importator:</strong> Aceleași condiții comerciale avantajoase ca în depozitul central.
            </li>
            <li style={{ fontSize: "15px", color: "#475569", lineHeight: "1.5" }}>
              ✔️ <strong>Suport tehnic local:</strong> Echipa Alufab vă stă la dispoziție pentru specificații tehnice și calcule de material.
            </li>
          </ul>
        </div>
      </section>

      <Footer
        categories={navData.categories}
        topProducts={navData.topProducts}
      />
    </main>
  );
}