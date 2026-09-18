import Image from "next/image";
import Link from "next/link";
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
        
        {/* DİĞER ALT KATEGORİLER */}
        {filteredSubcategories.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
              marginBottom: "3rem"
            }}
          >
            {filteredSubcategories.map((sub, index) => {
              return (
                <Link
                  key={index}
                  href={`/categorii/${categorySlug}/${sub.slug}`}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    border: "1px solid #E2E8F0",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)",
                    transition: "all 0.2s ease"
                  }}
                >
                  {/* Kompakt Resim Kutusu */}
                  <div style={{ width: "100%", height: "150px", minHeight: "150px", maxHeight: "150px", background: "#FFFFFF", overflow: "hidden", position: "relative", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image
                      src={
                        sub.image ||
                        sub.detailImage ||
                        "https://images.unsplash.com/photo-1631626244439-d349340623bd?auto=format&fit=crop&w=500&q=60"
                      }
                      alt={sub.name}
                      width={400}
                      height={400}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                    <div style={{ marginBottom: "16px" }}>
                      <span style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", lineHeight: "1.4", display: "block" }}>
                        {sub.name}
                      </span>
                    </div>

                    {/* Mavi ve Bold Buton */}
                    <span style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      width: "100%",
                      padding: "12px",
                      background: "#0096B4",
                      color: "#FFFFFF",
                      borderRadius: "10px",
                      fontWeight: "800",
                      fontSize: "13px",
                      letterSpacing: "0.5px",
                      boxShadow: "0 4px 10px rgba(0, 150, 180, 0.3)"
                    }}>
                      VEZI DETALII →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        
        {/* ÜRÜNLERİN LİSTELENDİĞİ YER */}
        {products && products.length > 0 && (
          <>
            <div style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              padding: "24px 32px",
              marginBottom: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: 0, letterSpacing: "-0.5px" }}>
                {subcategory?.name || category?.name || ""}
              </h1>
              <span style={{
                backgroundColor: "#F1F5F9",
                color: "#0088A5",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "700"
              }}>
                {products.length} modele
              </span>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px"
            }}>
              {products.map((product) => {
                const productUrl = `/categorii/${categorySlug}/${subcategorySlug}/${product.slug || product.id}`;
                const prodImg = product.image || product.detailImage || subcategory?.image || category?.image;

                return (
                  <Link
                    key={product.id || product.slug}
                    href={productUrl}
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "16px",
                      border: "1px solid #E2E8F0",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {/* Kompakt Resim Kutusu */}
                    <div style={{ width: "100%", height: "150px", minHeight: "150px", maxHeight: "150px", background: "#FFFFFF", overflow: "hidden", position: "relative", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {prodImg ? (
                        <img
                          src={prodImg}
                          alt={product.name || product.title}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", backgroundColor: "#e2e8f0" }} />
                      )}
                    </div>

                    <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                      <div style={{ marginBottom: "16px" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0, lineHeight: "1.4" }}>
                          {product.name || product.title}
                        </h3>
                      </div>

                      {/* Mavi ve Bold Buton */}
                      <span style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        width: "100%",
                        padding: "12px",
                        background: "#0096B4",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        fontWeight: "800",
                        fontSize: "13px",
                        letterSpacing: "0.5px",
                        boxShadow: "0 4px 10px rgba(0, 150, 180, 0.3)"
                      }}>
                        VEZI DETALII →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* BİLGİ / DETAY SAYFALARI */}
        {!hasContent && hasDescriptionOrDetail && (
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            padding: "40px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)",
            display: "flex",
            flexDirection: "column",
            gap: "32px"
          }}>
            <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", margin: 0, lineHeight: "1.2" }}>
              {subcategory?.name || category?.name || ""}
            </h1>

            {subcategory?.detailImage && (
              <div style={{
                width: "100%",
                background: "#FFFFFF",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                padding: "20px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img
                  src={subcategory.detailImage}
                  alt={subcategory.name}
                  style={{ width: "100%", maxHeight: "500px", objectFit: "contain", borderRadius: "8px" }}
                />
              </div>
            )}
            
            {subcategory?.description && (
              <div
                style={{ fontSize: "16px", color: "#334155", lineHeight: "1.8" }}
                dangerouslySetInnerHTML={{ __html: subcategory.description }}
              />
            )}

            {subcategory?.gallery && subcategory.gallery.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "16px", borderTop: "1px solid #E2E8F0", paddingTop: "32px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
                  Galerie Foto & Detalii Tehnice
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {subcategory.gallery.map((galleryImg, gIdx) => (
                    <div key={gIdx} style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", overflow: "hidden", padding: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <img
                        src={galleryImg}
                        alt={`${subcategory.name} galeri ${gIdx + 1}`}
                        style={{ width: "100%", maxHeight: "500px", objectFit: "contain", borderRadius: "8px", backgroundColor: "#ffffff" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!hasContent && !hasDescriptionOrDetail && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#667085" }}>
            Nu există produse sau subcategorii în această secțiune.
          </div>
        )}
      </div>
    </section>
  );
}