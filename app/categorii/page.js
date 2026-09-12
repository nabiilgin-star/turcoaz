import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CategoriesSection from "../components/Categories/CategoriesSection";
import { getNavbarData } from "@/app/lib/get-nav-data";

export const metadata = {
  title: "Profile Aluminiu, Balustrade Sticlă și Compozit Panel (Bond) | Turcoaz",
  description: "Gama completă de profile din aluminiu, sisteme pentru balustrade din sticlă securizată și panouri compozite (bond) pentru fațade. Depozit Popești-Leordeni.",
};

export default async function CategoriesPage() {
  const { categories, products, announcement } = await getNavbarData();

  return (
    <main className="page">
      <Navbar
        categories={categories}
        products={products}
        announcement={announcement}
      />
      <div style={{ paddingTop: "0" }}>
        <CategoriesSection className="gray-bg" categories={categories} />
      </div>
      <Footer categories={categories} />
    </main>
  );
}