import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { getNavbarData } from "@/app/lib/get-nav-data";
import "../components/LegalLayout.css";

export const metadata = {
  title: "Termeni și Condiții - Kahe",
  description:
    "Citește regulile și condițiile de utilizare ale site-ului Kahe.",
};

export default async function TermsAndConditionsPage() {
  const { categories, products, announcement, topProducts } =
    await getNavbarData();

  return (
    <main className="page">
      <Navbar
        categories={categories}
        products={products}
        announcement={announcement}
      />

      <div className="legal-page">
        <div className="legal-container">
          <header className="legal-header">
            <h1 className="legal-title">Termeni și Condiții</h1>
            <p className="legal-last-updated">
              Ultima actualizare: 9 Martie 2026
            </p>
          </header>

          <div className="legal-content">
            <p>
              Bine ați venit pe site-ul Kahe. Prin accesarea și utilizarea
              acestui site, sunteți de acord să respectați următorii termeni și
              condiții. Vă rugăm să îi citiți cu atenție.
            </p>

            <h2>1. Informații Generale</h2>
            <p>
              Site-ul Kahe (kahe.ro) este deținut și administrat de Kahe, o
              companie specializată în soluții de feronerie pentru sticlă. Toate
              produsele prezentate sunt oferite în limita stocului și a
              disponibilității furnizorilor noștri.
            </p>

            <h2>2. Proprietate Intelectuală</h2>
            <p>
              Întregul conținut al acestui site, incluzând imagini, texte,
              logo-uri și elemente grafice, reprezintă proprietatea intelectuală
              a Kahe sau a partenerilor săi și este protejat de legislația
              privind drepturile de autor. Orice utilizare neautorizată este
              strict interzisă.
            </p>

            <h2>3. Utilizarea Site-ului</h2>
            <p>
              Vă angajați să utilizați site-ul nostru doar în scopuri legale și
              într-un mod care să nu încalce drepturile sau să restricționeze
              utilizarea site-ului de către alte persoane. Solicitările de
              ofertă trebuie să fie reale și cu intenții de colaborare.
            </p>

            <h2>4. Limitarea Răspunderii</h2>
            <p>
              Depunem eforturi constante pentru ca informațiile de pe site
              (prețuri, specificații tehnice, imagini) să fie corecte. Cu toate
              acestea, Kahe nu își asumă răspunderea pentru erori tipografice
              sau modificări neanunțate ale producătorilor. Imaginile produselor
              au caracter informativ.
            </p>

            <h2>5. Link-uri către terți</h2>
            <p>
              Site-ul nostru poate conține link-uri către site-uri externe. Nu
              ne asumăm responsabilitatea pentru conținutul sau politicile de
              confidențialitate ale acelor site-uri.
            </p>

            <h2>6. Modificări ale Termenilor</h2>
            <p>
              Ne rezervăm dreptul de a modifica acești termeni și condiții în
              orice moment. Versiunea actualizată va fi publicată pe această
              pagină și va intra în vigoare imediat.
            </p>

            <h2>7. Contact</h2>
            <p>
              Dacă aveți întrebări referitoare la acești termeni, vă rugăm să ne
              contactați la: contact@kahe.ro.
            </p>
          </div>
        </div>
      </div>

      <Footer categories={categories} topProducts={topProducts} />
    </main>
  );
}
