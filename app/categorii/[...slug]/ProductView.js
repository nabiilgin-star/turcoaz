import Image from "next/image";

export default function ProductView({ product }) {
  if (!product) return <div>Ürün bulunamadı.</div>;

  // Özel detay resmi varsa (product.detailImage) onu kullan, yoksa ana resmi (product.image) kullan:
  const mainDisplayImage = product.detailImage || product.image;

  return (
    <section style={{ padding: "40px 20px", backgroundColor: "#fff", width: "100%" }}>
      {/* Ana Ürün Bölümü */}
      <div style={{ 
        maxWidth: "900px", 
        margin: "0 auto", 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "40px", 
        alignItems: "center" 
      }}>
        
        <div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "700", color: "#1a1a1a", margin: "0 0 15px 0" }}>{product.name}</h1>
          
          {/* Açıklama alanı: HTML etiketlerini ve satır atlamalarını destekler */}
          <div 
            style={{ fontSize: "0.95rem", color: "#666", lineHeight: "1.6", whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          
          <a 
            href={product.pdfUrl || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: "none", marginTop: "20px", display: "inline-block" }}
          >
            <div style={{ backgroundColor: "#c5a491", color: "#fff", padding: "10px 25px", borderRadius: "8px", fontWeight: "500" }}>
              Catalog
            </div>
          </a>
        </div>

        {/* Ana Görsel Kutusu */}
        <div style={{ position: "relative", width: "100%", height: "300px", borderRadius: "15px", overflow: "hidden", boxShadow: "0 5px 15px rgba(0,0,0,0.08)", backgroundColor: "#f9f9f9" }}>
          <Image 
            src={mainDisplayImage} 
            alt={product.name} 
            fill 
            style={{ objectFit: "contain", padding: "15px" }} 
          />
        </div>
      </div>

      {/* Sayfa Altı Galeri */}
      {product.gallery && product.gallery.length > 0 && (
        <div style={{ maxWidth: "900px", margin: "40px auto 0", display: "flex", flexDirection: "column", gap: "30px" }}>
          {product.gallery.map((src, index) => (
            <div key={index} style={{ position: "relative", width: "100%", borderRadius: "15px", overflow: "hidden", boxShadow: "0 5px 20px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
              <Image 
                src={src} 
                alt={`${product.name} detay ${index + 1}`} 
                width={900} 
                height={500}
                style={{ width: "100%", height: "auto", objectFit: "contain" }} 
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}