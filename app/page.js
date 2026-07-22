import Navbar from "./components/Navbar/Navbar";
import HeroHeader from "./components/HeroHeader/HeroHeader";
import CategoriesSection from "./components/Categories/CategoriesSection";
import TrustSection from "./components/TrustSection/TrustSection";
import ContactForm from "./components/Contact/ContactForm";
import Footer from "./components/Footer/Footer";
import styles from "./page.css";
import {
  getNavbarData,
  getFaqs,
  getHeroSettings,
} from "@/app/lib/get-nav-data";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function Home() {
  const [navData, faqs, contactImageResult, heroSettings] = await Promise.all([
    getNavbarData(),
    getFaqs(),
    supabaseAdmin
      .from("settings")
      .select("value")
      .eq("key", "contact_image")
      .single(),
    getHeroSettings(),
  ]);

  const { categories, products, announcement, topProducts } = navData;
  const contactImage = contactImageResult.data?.value || null;

  return (
    <main className="page">
      <Navbar
        categories={categories}
        announcement={announcement}
      />
      {/* 1. Acasă (Hero) ID'si eklendi */}
      <div id="hero">
        <HeroHeader heroSettings={heroSettings} />
      </div>

      <div id="categories">
        <CategoriesSection categories={categories} />
      </div>
      

      {/* 2. Despre Noi (Hakkımızda) için TrustSection'ı hedef aldık veya bu ID'yi buraya bağladık */}
      <div id="about">
        <TrustSection />
      </div>

      <div id="contact">
        <ContactForm contactImage={contactImage} />
      </div>
      
      <Footer categories={categories} topProducts={topProducts} />
    </main>
  );
}