import Navbar from "./components/Navbar/Navbar";
import HeroHeader from "./components/HeroHeader/HeroHeader";
import CategoriesSection from "./components/Categories/CategoriesSection";
import TrustSection from "./components/TrustSection/TrustSection";
import ContactForm from "./components/Contact/ContactForm";
import Footer from "./components/Footer/Footer";
import styles from "./page.css";
import { getNavbarData, getHeroSettings } from "@/app/lib/get-nav-data";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function Home() {
  const [navData, contactImageResult, heroSettings] = await Promise.all([
    getNavbarData(),
    supabaseAdmin
      .from("settings")
      .select("value")
      .eq("key", "contact_image")
      .single(),
    getHeroSettings(),
  ]);

  const { categories, announcement, topProducts } = navData;
  const contactImage = contactImageResult.data?.value || null;

  return (
    <main className="page">
      <Navbar categories={categories} announcement={announcement} />

      <div id="hero">
        <HeroHeader heroSettings={heroSettings} />
      </div>

      <div id="categories">
        <CategoriesSection categories={categories} />
      </div>

      <div id="despre-noi">
        <TrustSection />
      </div>

      {/* id="contact" ContactForm.js içindeki <section>'da */}
      <ContactForm contactImage={contactImage} />

      <Footer categories={categories} topProducts={topProducts} />
    </main>
  );
}