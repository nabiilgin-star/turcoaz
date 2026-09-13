import React from "react";

export default function SubcategoryView({ category, subcategory, products }) {
  // Eğer alt kategorinin kendi altındaki ürünler varsa onları kullan, 
  // yoksa boş dizi döndürerek diğer kategorilerin kart olarak karışmasını engelle.
  const displayProducts = subcategory?.products || products || [];

  return (
    <div style={{ width: "100%" }}>
      {/* Üst Başlık ve Model Sayısı */}
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
          {displayProducts.length} model
        </span>
      </div>

      {/* SADECE GERÇEK ÜRÜNLERİN LİSTELENDİĞİ IZGARA (GRID) ALANI */}
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
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}>
              {/* Ürün Görseli */}
              <div style={{ width: "100%", height: "200px", backgroundColor: "#F1F5F9", position: "relative", overflow: "hidden" }}>
                <img
                  src={prod.detailImage || prod.image || category?.image}
                  alt={prod.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Ürün İçeriği ve Detay Butonu */}
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
                    fontWeight: "600",
                    transition: "background-color 0.2s"
                  }}
                >
                  Vezi detalii →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          padding: "40px",
          textAlign: "center",
          color: "#64748B"
        }}>
          Bu kategoride henüz ürün bulunmamaktadır.
        </div>
      )}
    </div>
  );
}