import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import { getNavbarData } from "@/app/lib/get-nav-data";

// ----------------------------------------------------------------------
// 1. REGIONAL B2B SEO METADATA
// ----------------------------------------------------------------------
export const metadata = {
  title: "Depozit Profile Aluminiu București & Popești-Leordeni | Turcoaz",
  description:
    "Depozit central de profile din aluminiu, glafuri exterioare, panouri compozite ACP Bond și sisteme PVC în Popești-Leordeni (Ilfov / București). Stoc permanent și livrare rapidă.",
  alternates: {
    canonical: "https://turcoaz.com/depozit-aluminiu-bucuresti",
  },
  openGraph: {
    title: "Depozit Profile Aluminiu București & Popești-Leordeni | Turcoaz",
    description:
      "Furnizor și distribuitor de sisteme din aluminiu extrudat AKPA, glafuri, feronerie și panouri compozite. Livrare din depozitul central Popești-Leordeni.",
    url: "https://turcoaz.com/depozit-aluminiu-bucuresti",
    siteName: "Turcoaz Aluminiu",
    locale: "ro_RO",
    type: "website",
  },
};

// ----------------------------------------------------------------------
// 2. LOCAL BUSINESS & WAREHOUSE JSON-LD SCHEMA
// ----------------------------------------------------------------------
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "WholesaleStore",
  "name": "Turcoaz Aluminiu - Depozit Central București & Ilfov",
  "image": "https://res.cloudinary.com/oivvupgw/image/upload/v1784416492/Turcoaz_fatade_s7zdev.jpg",
  "@id": "https://turcoaz.com/depozit-aluminiu-bucuresti#warehouse",
  "url": "https://turcoaz.com/depozit-aluminiu-bucuresti",
  "telephone": "+40700000000", // Şirket telefon numaranızla güncelleyin
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Şos. Olteniței / Popești-Leordeni",
    "addressLocality": "Popești-Leordeni",
    "addressRegion": "Ilfov",
    "postalCode": "077160",
    "addressCountry": "RO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 44.375, // Tam koordinatlarınızla güncelleyebilirsiniz
    "longitude": 26.145
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

export default async function DepozitBucurestiPage() {
  const navData = await getNavbarData();

  const breadcrumbItems = [
    { label: "Acasă", href: "/" },
    { label: "Depozit București & Ilfov", href: "#" },
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
            Hub Lojistic & Depozit Central
          </span>
          <h1 style={{ fontSize: "36px", fontWeight: "800", marginTop: "16px", marginBottom: "16px", lineHeight: "1.2" }}>
            Depozit Profile Aluminiu, Glafuri & Panouri ACP Bond — București / Popești-Leordeni
          </h1>
          <p style={{ fontSize: "16px", color: "#94A3B8", maxWidth: "800px", lineHeight: "1.6" }}>
            S.C. Turcoaz Aluminiu S.R.L. oferă soluții complete de aprovizionare B2B pentru producători de tâmplărie, dezvoltatori imobiliari și firme de construcții din regiunea București - Ilfov și la nivel național.
          </p>
          
          <div style={{ display: "flex", gap: "16px", marginTop: "28px", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/40700000000?text=Buna%20ziua,%20doresc%20o%20oferta%20pentru%20depozitul%20din%20Bucuresti"
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
              💬 Solicită Ofertă Rapidă pe WhatsApp
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

      {/* PRODUSE ÎN STOC LA DEPOZITUL CENTRAL */}
      <section style={{ maxWidth: "1320px", margin: "40px auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", marginBottom: "24px" }}>
          Categorii Disponibile cu Livrare Imediată din Depozitul Popești-Leordeni
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          
          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00A8CC" }}>Glafuri din Aluminiu Extrudat</h3>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "8px" }}>
              Dimensiuni de la 75mm la 380mm. Culori pe stoc: Alb (RAL 9016), Maro, Antracit (RAL 7016), Stejar Auriu și Nuc.
            </p>
            <a href="/categorii/glafuri-din-aluminiu" style={{ display: "inline-block", marginTop: "12px", color: "#0F172A", fontWeight: "700", fontSize: "14px" }}>
              Detalii Glafuri →
            </a>
          </div>

          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00A8CC" }}>Sisteme Aluminiu AKPA</h3>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "8px" }}>
              Profile de tâmplărie cu și fără barieră termică (S28, WD37, WD50T, WD70T), uși glisante și perete cortină.
            </p>
            <a href="/categorii/sisteme-aluminiu-akpa" style={{ display: "inline-block", marginTop: "12px", color: "#0F172A", fontWeight: "700", fontSize: "14px" }}>
              Detalii Sisteme AKPA →
            </a>
          </div>

          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00A8CC" }}>Panouri Compozite ACP Bond</h3>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "8px" }}>
              PrimeBond, DURA BOND și RallBond pentru fațade ventilate și amenajări arhitecturale exterioare.
            </p>
            <a href="/categorii/acp-aluminiu-compozit-panel-bond" style={{ display: "inline-block", marginTop: "12px", color: "#0F172A", fontWeight: "700", fontSize: "14px" }}>
              Detalii ACP Bond →
            </a>
          </div>

          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00A8CC" }}>Balustrade din Sticlă & Aluminiu</h3>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "8px" }}>
              Sisteme M115, M90, profile bază, mână curentă și accesorii de fixare pentru balustrade modulare.
            </p>
            <a href="/categorii/sisteme-balustrada" style={{ display: "inline-block", marginTop: "12px", color: "#0F172A", fontWeight: "700", fontSize: "14px" }}>
              Detalii Balustrade →
            </a>
          </div>

        </div>
      </section>

      {/* AVANTAJE PARTENERIAT B2B */}
      <section style={{ maxWidth: "1320px", margin: "40px auto", padding: "0 24px" }}>
        <div style={{ background: "#FFFFFF", padding: "36px", borderRadius: "20px", border: "1px solid #E2E8F0" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginBottom: "16px" }}>
            De ce să alegi Turcoaz Aluminiu ca furnizor B2B în București și Ilfov?
          </h2>
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            <li style={{ fontSize: "15px", color: "#475569", lineHeight: "1.5" }}>
              ✔️ <strong>Capacitate de stoc masivă:</strong> Peste 150 tone de profile și accesorii pregătite pentru ridicare sau livrare.
            </li>
            <li style={{ fontSize: "15px", color: "#475569", lineHeight: "1.5" }}>
              ✔️ <strong>Livrare rapidă în București și Ilfov:</strong> Flotă proprie de transport pentru șantiere și ateliere de producție.
            </li>
            <li style={{ fontSize: "15px", color: "#475569", lineHeight: "1.5" }}>
              ✔️ <strong>Prețuri direct de importator:</strong> Condiții comerciale avantajoase pentru comenzi de volum și clienți fideli.
            </li>
            <li style={{ fontSize: "15px", color: "#475569", lineHeight: "1.5" }}>
              ✔️ <strong>Consultanță tehnică dedicată:</strong> Asistență în alegerea profilelor și calculul de consum pentru proiecte.
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