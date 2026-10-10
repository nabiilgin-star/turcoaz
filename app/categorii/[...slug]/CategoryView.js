'use client';
import Link from "next/link";
import Image from "next/image";

export default function CategoryView({ category }) {
  if (!category) return null;

  const items = category.subcategories || category.products || [];
  const hasItems = items.length > 0;

  return (
    <section style={{ width: "100%", fontFamily: "'Poppins', sans-serif", display: "flex", flexDirection: "column", gap: "32px" }}>
      
      {/* 1. HERO / ÜST BAŞLIK ALANI */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        padding: "32px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <h1 style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#0F172A",
              margin: 0,
              letterSpacing: "-0.2px"
            }}>
              {category.title || category.name}
            </h1>
            {hasItems && (
              <span style={{
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
          </div>

          {/* Eylem Butonları + Catalog PDF (Varsa) */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            {category.pdfUrl && (
              <Link 
                href={category.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: "10px 22px",
                  backgroundColor: "#c5a491",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "13px",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(197, 164, 145, 0.35)",
                  letterSpacing: "0.5px"
                }}
              >
                Catalog PDF
              </Link>
            )}
            <Link 
              href="/contact" 
              style={{
                padding: "10px 22px",
                backgroundColor: "#00A8CC",
                color: "#FFFFFF",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "13px",
                textDecoration: "none"
              }}
            >
              Solicită ofertă
            </Link>
          </div>
        </div>

        {/* Ana Kategori Görseli (Varsa) */}
        {(category.image || category.detailImage) && !hasItems && (
          <div style={{
            position: "relative",
            width: "100%",
            height: "350px",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0"
          }}>
            <Image 
              src={category.detailImage || category.image} 
              alt={`${category.title || category.name} schita tehnica si schita`}
              fill
              style={{ objectFit: "contain", padding: "16px" }}
              priority
            />
          </div>
        )}
      </div>

      {/* 2. DURUM A: ALT KATEGORİ VEYA ÜRÜN KARTLARI (Varsa) */}
      {hasItems && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {items.map((sub, index) => {
            const imgSrc = sub.image || sub.detailImage || "https://images.unsplash.com/photo-1631626244439-d349340623bd?auto=format&fit=crop&w=500&q=60";

            return (
              <Link
                key={sub.slug || index}
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
                <div style={{ width: "100%", height: "200px", background: "#F8FAFC", overflow: "hidden", position: "relative", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    src={imgSrc}
                    alt={sub.title || sub.name || "Profil"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                  <div style={{ minHeight: "44px", display: "flex", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ 
                      fontSize: "16px", 
                      fontWeight: "700", 
                      color: "#0F172A", 
                      lineHeight: "1.4", 
                      width: "100%" 
                    }}>
                      {sub.title || sub.name}
                    </span>
                  </div>

                  <div style={{ textAlign: "center", marginTop: "auto" }}>
                    <span style={{
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
      )}

      {/* 3. DURUM B: SEO AÇIKLAMA METNİ VE TEKNİK DETAYLAR (Gard, ACP, Sticla vb. için) */}
      {category.description && (
        <div style={{
          background: "#FFFFFF",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "20px", borderBottom: "2px solid #F1F5F9", paddingBottom: "10px" }}>
            Descriere Tehnică și Specificații
          </h2>
          <div 
            style={{ fontSize: "15px", lineHeight: "1.8", color: "#334155" }}
            dangerouslySetInnerHTML={{ __html: category.description }} 
          />
        </div>
      )}

      {/* 4. FOTO GALERİ (Gard, ACP vb. sayfalarda varsa) */}
      {category.gallery && category.gallery.length > 0 && (
        <div style={{
          background: "#FFFFFF",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid #E2E8F0"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "20px" }}>
            Galerie Foto – {category.title || category.name}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
            {category.gallery.map((imgUrl, idx) => (
              <div key={idx} style={{ position: "relative", width: "100%", height: "180px", borderRadius: "12px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
                <Image 
                  src={imgUrl} 
                  alt={`${category.title || category.name} foto ${idx + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}