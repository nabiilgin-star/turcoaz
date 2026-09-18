import Image from "next/image";
import Link from "next/link";

export default function CategoryView({ category }) {
  const items = category.subcategories || category.products || [];

  return (
    <section style={{ width: "100%" }}>
      {/* Üst Başlık Alanı - Soft ve Modern */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        padding: "24px 32px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1E293B", margin: 0, display: "flex", alignItems: "center", gap: "12px", letterSpacing: "-0.5px" }}>
          {category.name} 
          {items.length > 0 && (
            <span style={{ background: "#F1F5F9", color: "#0088A5", fontSize: "13px", padding: "4px 12px", borderRadius: "20px", fontWeight: "600" }}>
              {items.length} modele
            </span>
          )}
        </h1>
      </div>

      {/* Ürün / Kategori Kartları Grid Yapısı */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px"
      }}>
         {items.map((sub, index) => (
          <Link
            key={index}
            href={`/categorii/${category.slug}/${sub.slug}`}
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
           
           {/* Resim Kutusu - Kesin Yükseklik Sabitleme */}
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
            
            {/* İçerik ve Tam Boy Mavi Buton */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "15px", fontWeight: "600", color: "#1E293B", lineHeight: "1.4", display: "block" }}>
                  {sub.name}
                </span>
              </div>

              {/* Tam Boy Soft Mavi Buton */}
              <span style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "11px",
                background: "#0096B4",
                color: "#FFFFFF",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "13px",
                letterSpacing: "0.3px",
                boxShadow: "0 2px 4px rgba(0, 150, 180, 0.2)"
              }}>
                VEZI DETALII →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}