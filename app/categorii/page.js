import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CategoriesSection from "../components/Categories/CategoriesSection";
import { getNavbarData } from "@/app/lib/get-nav-data";


import { buildMetadata } from "@/app/lib/utils";

export const metadata = buildMetadata({
  title: "Profile Aluminiu, Balustrade Sticlă și Compozit Panel (Bond) | Turcoaz",
  description:
    "Gama completă de profile din aluminiu, sisteme pentru balustrade din sticlă securizată și panouri compozite (bond) pentru fațade. Depozit Popești-Leordeni.",
  path: "/categorii",
});


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