import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import ProductCard from "../../../components/BestSellers/ProductCard";
import styles from "./subcategory-products.module.css";
import {
  getNavbarData,
  getSubcategoryWithProducts,
} from "@/app/lib/get-nav-data";
import TrackView from "../../../components/TrackView";

import { getAllSlugsForStaticGeneration } from "@/app/lib/get-nav-data";

export async function generateStaticParams() {
  const { subcategorySlugs } = await getAllSlugsForStaticGeneration();
  return subcategorySlugs;
}

export default async function SubcategoryProductsPage({ params }) {
  const { slug, subslug } = await params;

  const [navData, result] = await Promise.all([
    getNavbarData(),
    getSubcategoryWithProducts(slug, subslug),
  ]);

  if (!result) notFound();

  const { category, subcategory, products } = result;

  return (
    <main className="page">
      <TrackView table="subcategories" id={subcategory.id} />
      <Navbar
        categories={navData.categories}
        products={navData.products}
        announcement={navData.announcement}
      />

      <section className={styles["subcategory-products-section"]}>
        <div className="container-max">
          <Breadcrumb
            items={[
              { label: "Categorii", href: "/categorii" },
              { label: category.name, href: `/categorii/${category.slug}` },
              {
                label: subcategory.name,
                href: `/categorii/${category.slug}/${subcategory.slug}`,
              },
            ]}
          />

          <div className={styles["subcategory-header"]}>
            <h1 className={styles["subcategory-title"]}>
              {subcategory.name}{" "}
              <span style={{ color: "#667085", fontWeight: "300" }}>
                ({products.length})
              </span>
            </h1>
          </div>

          <div className={styles["products-grid"]}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                baseUrl={`/categorii/${category.slug}/${subcategory.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer categories={navData.categories} />
    </main>
  );
}
