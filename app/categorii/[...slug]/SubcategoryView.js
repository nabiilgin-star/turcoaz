import React from "react";

export default function SubcategoryView({ category, subcategory, products, subcategories }) {
  // 1. Öncelik: Doğrudan alt kategorinin kendi ürünleri
  const displayProducts = subcategory?.products || products || [];
  
  // 2. Öncelik: Eğer alt kategorinin de altında başka alt kırılımlar varsa (örn: Balustradă de sticlă altındaki M115, M125 vb.)
  const childSubcategories = subcategory?.subcategories || [];

  return (
    <div style={{ width: "100%" }}>
      {/* Üst Başlık ve Model/Öğe Sayısı */}
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
          {subcategory?.name || category?.name}
        </h1>
        <span style={{
          backgroundColor: "#E6F7FA",
          color: "#0088A5",
          padding: "6px 14px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "700"
        }}>
          {displayProducts.length > 0 ? `${displayProducts.length} model` : childSubcategories.length > 0 ? `${childSubcategories.length} element` : "Detalii sistem"}
        </span>
      </div>

      {/* DURUM A: Eğer ürünler varsa ürünleri grid olarak listele */}
      {displayProducts.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {displayProducts.map((prod) => (
            <div key={prod.slug || prod.id} style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ width: "100%", height: "200px", backgroundColor: "#F1F5F9", position: "relative", overflow: "hidden" }}>
                <img
                  src={prod.detailImage || prod.image || subcategory?.image || category?.image}
                  alt={prod.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>
                    {prod.name}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {prod.description}
                  </p>
                </div>

                <a
                  href={`/categorii/${category.slug}/${subcategory.slug}/${prod.slug}`}
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0088A5",
                    color: "#FFFFFF",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  Vezi detalii →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : childSubcategories.length > 0 ? (
        /* DURUM B: Eğer alt kategorinin altında başka alt kırılımlar varsa onları kart olarak listele */
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {childSubcategories.map((subItem) => (
            <div key={subItem.slug || subItem.id} style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ width: "100%", height: "200px", backgroundColor: "#F1F5F9", position: "relative", overflow: "hidden" }}>
                <img
                  src={subItem.image || subItem.detailImage || category?.image}
                  alt={subItem.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>
                    {subItem.name}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {subItem.description || "Sistem sau profil arhitectural dedicat."}
                  </p>
                </div>

                <a
                  href={`/categorii/${category.slug}/${subcategory.slug}/${subItem.slug}`}
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0088A5",
                    color: "#FFFFFF",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  Vezi detalii →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* DURUM C: Eğer ürün veya alt kırılım yoksa fakat detay/açıklama varsa (Örn: Glafuri din Aluminiu) onları göster */
        <div style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          padding: "32px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
        }}>
          {subcategory?.detailImage && (
            <div style={{ width: "100%", maxHeight: "350px", overflow: "hidden", borderRadius: "12px", marginBottom: "24px", backgroundColor: "#f8fafc" }}>
              <img src={subcategory.detailImage} alt={subcategory.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          )}
          <div style={{ fontSize: "15px", color: "#334155", lineHeight: "1.7" }} dangerouslySetInnerHTML={{ __html: subcategory?.description || "Informații detaliate despre acest sistem." }} />
        </div>
      )}
    </div>
  );
}