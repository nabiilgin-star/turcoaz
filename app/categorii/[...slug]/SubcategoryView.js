import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/app/components/BestSellers/ProductCard";
import styles from "./subcategory-products.module.css";
import catStyles from "./subcategory.module.css";

export default function SubcategoryView({
  category,
  subcategory,
  products,
  subcategories,
}) {
  const categorySlug = category?.slug || "";
  const subcategorySlug = subcategory?.slug || "";

  const filteredSubcategories = (subcategories || []).filter(
    (sub) => sub.slug !== subcategorySlug
  );

  return (
    <section className={styles["subcategory-products-section"]}>
      <div className="container-max">
        <div className={styles["subcategory-header"]}>
          <h1 className={styles["subcategory-title"]}>
            {subcategory?.name || ""}{" "}
            {products && products.length > 0 && (
              <span style={{ color: "#667085", fontWeight: "300", fontSize: "1.5rem" }}>
                ({products.length})
              </span>
            )}
          </h1>
        </div>

        {/* DİĞER ALT KATEGORİLER (Butonlu Modern Kart Tasarımı) */}
        {filteredSubcategories.length > 0 && (
          <div
            className={catStyles["subcategory-grid"]}
            style={{ marginBottom: "3rem" }}
          >
            {filteredSubcategories.map((sub, index) => (
              <Link
                key={index}
                href={`/categorii/${categorySlug}/${sub.slug}`}
                className={catStyles["subcategory-card"]}
                style={{
                  background: "#ffffff",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  border: "1px solid #f3f4f6",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer"
                }}
              >
                <div className={catStyles["subcategory-image-wrapper"]}>
                  <Image
                    src={
                      sub.image ||
                      "https://images.unsplash.com/photo-1631626244439-d349340623bd?auto=format&fit=crop&w=500&q=60"
                    }
                    alt={sub.name}
                    width={500}
                    height={500}
                    className={catStyles["subcategory-image"]}
                    style={{ width: "100%", height: "220px", objectFit: "cover" }}
                  />
                </div>

                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                  <span 
                    className={catStyles["subcategory-name"]}
                    style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}
                  >
                    {sub.name}
                  </span>

                  <span 
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#0ea5e9",
                      color: "#ffffff",
                      padding: "0.6rem 1rem",
                      borderRadius: "0.5rem",
                      fontWeight: "500",
                      fontSize: "0.9rem",
                      textAlign: "center"
                    }}
                  >
                    Vezi Detalii →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ÜRÜNLERİN LİSTELENDİĞİ YER (ProductCard) */}
        {products && products.length > 0 && (
          <div className={styles["products-grid"]}>
            {products.map((product) => (
              <ProductCard
                key={product.id || product.slug}
                product={product}
                baseUrl={`/categorii/${categorySlug}/${subcategorySlug}`}
              />
            ))}
          </div>
        )}

        {(!products || products.length === 0) &&
          (filteredSubcategories.length === 0) && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 0",
                color: "#667085",
              }}
            >
              Nu există produse sau subcategorii în această secțiune.
            </div>
          )}
      </div>
    </section>
  );
}