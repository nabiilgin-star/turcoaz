import Navbar from "./components/Navbar/Navbar";
import HeroHeader from "./components/HeroHeader/HeroHeader";
import CategoriesSection from "./components/Categories/CategoriesSection";
import TrustSection from "./components/TrustSection/TrustSection";
import FAQSection from "./components/FAQ/FAQ";
import ContactForm from "./components/Contact/ContactForm";
import Footer from "./components/Footer/Footer";

import "./page.css";

import { getNavbarData, getHeroSettings } from "@/app/lib/get-nav-data";
import { buildMetadata } from "@/app/lib/utils"; // Yolun projenizdeki yerine gÃ¶re gÃ¼ncelleyin

// 1. GEO/SEO MÃ¼kemmelliÄŸi: TÃ¼m hreflang, canonical ve OG etiketleri buradan basÄ±lÄ±r
export const metadata = buildMetadata({
  title: "Profile Aluminiu, Glafuri È™i Sisteme din SticlÄƒ | Turcoaz",
  description:
    "DescoperÄƒ profile din aluminiu, glafuri exterioare, balustrade din sticlÄƒ È™i sisteme pentru construcÈ›ii. Turcoaz Aluminiu â€” BucureÈ™ti, PopeÈ™ti-Leordeni È™i IaÈ™i.",
  path: "/",
});

export default async function Home() {
  const [navData, heroSettings] = await Promise.all([
    getNavbarData(),
    getHeroSettings(),
  ]);

  const { categories, announcement, topProducts } = navData;

  // settings tablosu mevcut olmadığı için şimdilik varsayılan değer
  const contactImage = null;

  return (
    <main className="page">
      <Navbar
        categories={categories}
        announcement={announcement}
      />

      <div id="hero">
        <HeroHeader heroSettings={heroSettings} />
      </div>

      <div id="categories">
        <CategoriesSection categories={categories} />
      </div>

      <div id="despre-noi">
        <TrustSection />
      </div>

      <FAQSection />

      <ContactForm contactImage={contactImage} />

      <Footer />
    </main>
  );
}