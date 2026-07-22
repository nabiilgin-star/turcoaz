import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CategoriesSection from "../components/Categories/CategoriesSection";
import { getNavbarData } from "@/app/lib/get-nav-data";

export default async function CategoriesPage() {
  const { categories, products, announcement } = await getNavbarData();

  return (
    <main className="page">
      <Navbar
        categories={categories}
        products={products}
        announcement={announcement}
      />
      {}
      <div style={{ paddingTop: "0" }}>
        <CategoriesSection className="gray-bg" categories={categories} />
      </div>
      <Footer categories={categories} />
    </main>
  );
}
