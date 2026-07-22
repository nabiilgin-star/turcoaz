import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ContactForm from "../components/Contact/ContactForm";
import HeroHeader from "../components/HeroHeader/HeroHeader"; 
import { getNavbarData } from "@/app/lib/get-nav-data";

export const metadata = {
  title: "Contact - Kahe",
  description: "Contactează-ne pentru orice întrebare sau solicitare",
};

export default async function ContactPage() {
  const { categories, products, announcement, topProducts } =
    await getNavbarData();

  return (
    <main className="page">
      <Navbar
        categories={categories}
        products={products}
        announcement={announcement}
      />
      <div>
        <ContactForm className="reduced-padding" />
      </div>
      <Footer categories={categories} topProducts={topProducts} />
    </main>
  );
}
