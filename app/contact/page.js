import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ContactForm from "../components/Contact/ContactForm";
import { getNavbarData } from "@/app/lib/get-nav-data";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const metadata = {
  title: "Contact | Turcoaz Aluminiu – București, Popești-Leordeni, Iași",
  description:
    "Solicită ofertă pentru profile aluminiu, glafuri, balustrade și sisteme din sticlă. Depozit în Popești-Leordeni, magazin în București, depozit în Iași.",
  alternates: { canonical: "https://turcoaz.com/contact" },
  openGraph: {
    title: "Contact | Turcoaz Aluminiu",
    description:
      "Solicită ofertă pentru profile aluminiu, glafuri, balustrade și sisteme din sticlă.",
    url: "https://turcoaz.com/contact",
    type: "website",
  },
};

export default async function ContactPage() {
  const [navData, contactImageResult] = await Promise.all([
    getNavbarData(),
    supabaseAdmin
      .from("settings")
      .select("value")
      .eq("key", "contact_image")
      .single(),
  ]);

  const { categories, announcement, topProducts } = navData;
  const contactImage = contactImageResult.data?.value || null;

  return (
    <main className="page">
      <Navbar categories={categories} announcement={announcement} />
      <ContactForm className="reduced-padding" contactImage={contactImage} />
      <Footer categories={categories} topProducts={topProducts} />
    </main>
  );
}