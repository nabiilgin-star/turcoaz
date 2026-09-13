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
        
        {/* DİĞER ALT KATEGORİLER (Eğer varsa) */}
        {filteredSubcategories.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
              marginBottom: "3rem"
            }}
          >
            {filteredSubcategories.map((sub, index) => (
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
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{ width: "100%", height: "200px", background: "#F8FAFC", overflow: "hidden", position: "relative", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", lineHeight: "1.4", marginBottom: "20px" }}>
                    {sub.name}
                  </span>

                  <span style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "12px",
                    background: "#00A8CC",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    fontWeight: "700",
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    VEZI DETALII →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ÜRÜNLERİN LİSTELENDİĞİ YER (Örn: S28, WD37 vb.) */}
        {products && products.length > 0 && (
          <>
            <div style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              padding: "24px 32px",
              marginBottom: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
                {subcategory?.name || category?.name || ""}
              </h1>
              <span style={{
                backgroundColor: "#E6F7FA",
                color: "#0088A5",
                padding: "6px 14px",
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
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <div style={{ width: "100%", height: "200px", background: "#F8FAFC", overflow: "hidden", position: "relative", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>
                          {product.name || product.title}
                        </h3>
                        {product.description && (
                          <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "15px" }}>
                            {product.description}
                          </p>
                        )}
                      </div>

                      <span style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        width: "100%",
                        padding: "12px",
                        background: "#00A8CC",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        fontWeight: "700",
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginTop: "16px"
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

        {/* BİLGİ / AÇIKLAMA SAYFALARI (S28 Stili: Solda Yazı, Sağda Büyük Görsel) */}
        {!hasContent && hasDescriptionOrDetail && (
          <div style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            padding: "40px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "32px"
          }}>
            {/* Sayfa Başlığı */}
            <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", margin: 0, lineHeight: "1.2" }}>
              {subcategory?.name || category?.name || ""}
            </h1>

            {/* S28 Benzeri İki Sütunlu Yapı: Sol Açıklama, Sağ Büyük Görsel */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 420px",
              gap: "40px",
              alignItems: "start"
            }} className="s28-layout-grid">
              
              {/* Sol Sütun: Açıklama / Avantajlar / Teknik Özellikler */}
              {subcategory?.description && (
                <div style={{ fontSize: "15px", color: "#334155", lineHeight: "1.7" }} dangerouslySetInnerHTML={{ __html: subcategory.description }} />
              )}

              {/* Sağ Sütun: Büyük Detay Görseli (S28 Stili Sabit Kutu) */}
              {subcategory?.detailImage && (
                <div style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  padding: "24px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "sticky",
                  top: "100px",
                  minHeight: "350px"
                }}>
                  <img src={subcategory.detailImage} alt={subcategory.name} style={{ width: "100%", maxHeight: "380px", objectFit: "contain" }} />
                </div>
              )}
            </div>

            {/* Alt Kısım: Galeri Fotoğrafları (Tam Genişlik Alt Alta) */}
            {subcategory?.gallery && subcategory.gallery.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "20px", borderTop: "1px solid #E2E8F0", paddingTop: "32px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                  Galerie Foto & Detalii Tehnice
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {subcategory.gallery.map((galleryImg, gIdx) => (
                    <div key={gIdx} style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", overflow: "hidden", padding: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <img src={galleryImg} alt={`${subcategory.name} galeri ${gIdx + 1}`} style={{ width: "100%", maxHeight: "480px", objectFit: "contain", borderRadius: "8px", backgroundColor: "#f8fafc" }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* EĞER TAMAMEN BOMBOŞSA */}
        {!hasContent && !hasDescriptionOrDetail && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#667085" }}>
            Nu există produse sau subcategorii în această secțiune.
          </div>
        )}
      </div>
    </section>
  );
}