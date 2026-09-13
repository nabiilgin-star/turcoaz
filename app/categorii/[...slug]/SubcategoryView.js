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

  const hasContent = (products && products.length > 0) || (filteredSubcategories.length > 0);
  const hasDescriptionOrDetail = subcategory?.description || subcategory?.detailImage || (subcategory?.gallery && subcategory.gallery.length > 0);

  return (
    <section className={styles["subcategory-products-section"]}>
      <div className="container-max" style={{ width: "100%" }}>
        <div className={styles["subcategory-header"]}>
          <h1 className={styles["subcategory-title"]}>
            {subcategory?.name || category?.name || ""}{" "}
            {products && products.length > 0 && (
              <span style={{ color: "#667085", fontWeight: "300", fontSize: "1.5rem" }}>
                ({products.length})
              </span>
            )}
          </h1>
        </div>

        {/* DİĞER ALT KATEGORİLER (Menü Elemanları) */}
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
                  />
                </div>
                <span className={catStyles["subcategory-name"]}>
                  {sub.name}
                </span>
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

        {/* EĞER ÜRÜN YOKSA FAKAT AÇIKLAMA / DETAY GÖRSELİ / GALERİ VARSA (Örn: Glafuri din Aluminiu) */}
        {!hasContent && hasDescriptionOrDetail && (
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            padding: "32px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            marginTop: "20px"
          }}>
            {subcategory?.detailImage && (
              <div style={{ width: "100%", maxHeight: "380px", overflow: "hidden", borderRadius: "12px", marginBottom: "24px", backgroundColor: "#f8fafc", position: "relative" }}>
                <img src={subcategory.detailImage} alt={subcategory.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            )}
            
            {subcategory?.description && (
              <div style={{ fontSize: "15px", color: "#334155", lineHeight: "1.7", marginBottom: "30px" }} dangerouslySetInnerHTML={{ __html: subcategory.description }} />
            )}

            {/* Galeri Resimleri */}
            {subcategory?.gallery && subcategory.gallery.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginTop: "24px" }}>
                {subcategory.gallery.map((galleryImg, gIdx) => (
                  <div key={gIdx} style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", overflow: "hidden", padding: "10px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
                    <img src={galleryImg} alt={`${subcategory.name} galeri ${gIdx + 1}`} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EĞER TAMAMEN BOMBOŞSA GÖSTERİLECEK ALAN */}
        {!hasContent && !hasDescriptionOrDetail && (
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