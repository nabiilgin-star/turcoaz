import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; 
import { FileText, Download } from "lucide-react";
import TrackView from "../../../../components/TrackView";
import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import ProductCard from "../../../../components/BestSellers/ProductCard";
import RecommendedSlider from "../../../../components/RecommendedSlider/RecommendedSlider";
import Button from "../../../../components/Button/Button";
import ProductTabs from "../../../../components/ProductTabs/ProductTabs";
import ProductGallery from "../../../../components/ProductGallery/ProductGallery";
import styles from "./product-page.module.css";
import { getNavbarData, getProductBySlug } from "@/app/lib/get-nav-data";

import { getAllSlugsForStaticGeneration } from "@/app/lib/get-nav-data";
import { supabase } from "@/lib/supabase"; 

export async function generateStaticParams() {
  const { productSlugs } = await getAllSlugsForStaticGeneration();
  return productSlugs;
}

export default async function ProductPage({ params }) {
  const { slug, subslug, productSlug } = await params;

  const [navData, product] = await Promise.all([
    getNavbarData(),
    getProductBySlug(productSlug),
  ]);

  if (!product) {
    notFound();
  }

  const { subcategory, category } = product;

  
  if (!subcategory || !category) {
    notFound();
  }

  
  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  
  const documents = product.product_documents || [];

  
  let recommendedProductsList = [];
  if (product.recommended_products && product.recommended_products.length > 0) {
    const { data: recs } = await supabase
      .from("products")
      .select(
        `
        *,
        subcategory:subcategories(
          slug,
          category:categories(slug)
        )
      `,
      )
      .in("id", product.recommended_products);

    if (recs) {
      recommendedProductsList = recs;
    }
  }

  return (
    <main className="page">
      <TrackView table="products" id={product.id} />
      <Navbar
        categories={navData.categories}
        products={navData.products}
        announcement={navData.announcement}
      />

      <section className={styles["product-page-section"]}>
        <div className="container-max">
          {}
          <Breadcrumb
            items={[
              { label: "Categorii", href: "/categorii" },
              { label: category.name, href: `/categorii/${category.slug}` },
              {
                label: subcategory.name,
                href: `/categorii/${category.slug}/${subcategory.slug}`,
              },
              { label: product.title, href: "#" },
            ]}
          />

          {}
          <div className={styles["product-main-container"]}>
            {}
            <div className={styles["product-gallery-section"]}>
              <ProductGallery images={gallery} />
            </div>

            {}
            <div className={styles["product-info-col"]}>
              <h1 className={styles["product-page-title"]}>{product.title}</h1>

              {}
              {product.description ? (
                <div
                  className={styles["product-short-desc"]}
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  style={{
                    maxHeight: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                />
              ) : (
                <p className={styles["product-short-desc"]}>
                  Acest produs este fabricat din materiale de înaltă calitate,
                  asigurând durabilitate și performanță excelentă în timp. Ideal
                  pentru proiecte moderne, oferind un echilibru perfect între
                  estetică și funcționalitate.
                </p>
              )}

              <div className={styles["product-actions"]}>
                <Link
                  href="/contact"
                  style={{ textDecoration: "none", flex: 1 }}
                >
                  <Button variant="primary" style={{ width: "100%" }}>
                    Solicită Ofertă
                  </Button>
                </Link>
                <div style={{ flex: 1 }}></div>
              </div>
            </div>
          </div>

          <ProductTabs
            description={product.description}
            technical_specifications={product.technical_specifications}
            documents={documents}
          />

          {}
          {recommendedProductsList.length > 0 && (
            <div className={styles["recommended-section"]}>
              <h2 className={styles["recommended-title"]}>
                Produse Recomandate
              </h2>
              <RecommendedSlider
                products={recommendedProductsList}
                baseUrl={`/categorii`}
              />
            </div>
          )}
        </div>
      </section>

      <Footer categories={navData.categories} />
    </main>
  );
}
