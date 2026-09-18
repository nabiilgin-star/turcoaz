import Link from "next/link";

export default function CategoryView({ category }) {
  const items = category.subcategories || category.products || [];

  return (
    <section style={{ width: "100%", fontFamily: "'Poppins', sans-serif" }}>
      {/* Üst Başlık Alanı - SEO Uyumlu H1 */}
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
        <h1 style={{ 
          fontFamily: "'Poppins', sans-serif", 
          fontSize: "26px", 
          fontWeight: "700", 
          color: "#0F172A", 
          margin: 0, 
          display: "flex", 
          alignItems: "center", 
          gap: "12px", 
          letterSpacing: "-0.2px" 
        }}>
          {category.name} 
          {items.length > 0 && (
            <span style={{ 
              fontFamily: "'Poppins', sans-serif",
              background: "#F1F5F9", 
              color: "#0088A5", 
              fontSize: "13px", 
              padding: "4px 14px", 
              borderRadius: "20px", 
              fontWeight: "700" 
            }}>
              {items.length} modele
            </span>
          )}
        </h1>
      </div>

      {/* Kartlar Grid Yapısı */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px"
      }}>
         {items.map((sub, index) => {
           const imgSrc = sub.image || sub.detailImage || "https://images.unsplash.com/photo-1631626244439-d349340623bd?auto=format&fit=crop&w=500&q=60";

           return (
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
              {/* Resim Kutusu - Hızlı Yüklenen <img> Altyapısı */}
              <div style={{ width: "100%", height: "200px", background: "#F8FAFC", overflow: "hidden", position: "relative", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={imgSrc}
                  alt={sub.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              
              {/* İçerik ve Başlık Alanı */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                <div style={{ minHeight: "44px", display: "flex", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ 
                    fontFamily: "'Poppins', sans-serif", 
                    fontSize: "16px", 
                    fontWeight: "700", 
                    color: "#0F172A", 
                    lineHeight: "1.4", 
                    width: "100%" 
                  }}>
                    {sub.name}
                  </span>
                </div>

                {/* Şık Bej Buton */}
                <div style={{ textAlign: "center", marginTop: "auto" }}>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    display: "inline-block",
                    padding: "10px 24px",
                    backgroundColor: "#c5a491",
                    color: "#FFFFFF",
                    borderRadius: "20px",
                    fontWeight: "700",
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    boxShadow: "0 2px 8px rgba(197, 164, 145, 0.35)"
                  }}>
                    VEZI DETALII
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}