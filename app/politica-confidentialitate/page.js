import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { getNavbarData } from "@/app/lib/get-nav-data";
import "../components/LegalLayout.css";

export const metadata = {
  title: "Politica de Confidențialitate - Kahe",
  description: "Află cum colectăm și protejăm datele tale personale.",
};

export default async function PrivacyPolicyPage() {
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
            <h1 className="legal-title">Politica de Confidențialitate</h1>
            <p className="legal-last-updated">
              Ultima actualizare: 9 Martie 2026
            </p>
          </header>

          <div className="legal-content">
            <p>
              La Kahe, ne angajăm să protejăm și să respectăm confidențialitatea
              datelor dumneavoastră personale. Această politică explică modul în
              care colectăm, utilizăm și protejăm informațiile pe care ni le
              furnizați.
            </p>

            <h2>1. Informații pe care le colectăm</h2>
            <p>Putem colecta următoarele tipuri de date:</p>
            <ul>
              <li>
                Numele și datele de contact (e-mail, număr de telefon) furnizate
                prin formularele de contact.
              </li>
              <li>
                Informații despre modul în care utilizați site-ul nostru prin
                fișierele de tip cookie.
              </li>
              <li>
                Detalii despre solicitările dumneavoastră de ofertă sau
                interesele pentru produsele noastre.
              </li>
            </ul>

            <h2>2. Scopul procesării datelor</h2>
            <p>Utilizăm datele colectate pentru:</p>
            <ul>
              <li>
                A vă răspunde la solicitări și a vă oferi consultanță
                personalizată.
              </li>
              <li>
                A îmbunătăți funcționalitatea site-ului și experiența
                utilizatorului.
              </li>
              <li>
                A vă trimite informații relevante despre produsele și serviciile
                noastre (doar cu acordul dumneavoastră).
              </li>
            </ul>

            <h2>3. Securitatea datelor</h2>
            <p>
              Implementăm măsuri tehnice și organizatorice adecvate pentru a
              asigura un nivel de securitate corespunzător riscului, protejând
              datele dumneavoastră împotriva distrugerii, pierderii sau
              accesului neautorizat.
            </p>

            <h2>4. Drepturile dumneavoastră</h2>
            <p>
              Conform GDPR, aveți dreptul de a solicita accesul la datele
              dumneavoastră, rectificarea acestora, ștergerea sau
              restricționarea prelucrării. Pentru orice solicitare, ne puteți
              contacta la adresa de e-mail: contact@kahe.ro.
            </p>

            <h2>5. Module Cookie</h2>
            <p>
              Site-ul nostru folosește module cookie pentru a vă oferi o
              experiență mai bună. Puteți gestiona preferințele de cookie din
              setările browserului dumneavoastră.
            </p>
          </div>
        </div>
      </div>

      <Footer categories={categories} topProducts={topProducts} />
    </main>
  );
}
