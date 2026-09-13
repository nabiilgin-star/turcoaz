import Image from "next/image";

export default function ProductView({ product }) {
  if (!product) return <div>Ürün bulunamadı.</div>;

  // ACP Bond sayfasına özel özel tasarım kontrolü
  const isAcpBond = product.slug === "acp-aluminiu-compozit-panel-bond";

  if (isAcpBond) {
    return (
      <section style={{ padding: "0 0 60px 0", backgroundColor: "#fff", width: "100%" }}>
  {/* 1. En Üst Tam Genişlik Banner Görseli (Kesilmeden tam sığacak şekilde) */}
        {product.image && (
          <div style={{ width: "100%", height: "280px", position: "relative", marginBottom: "30px", backgroundColor: "#fcfcfc" }}>
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        )}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Başlık */}
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "30px", textAlign: "center" }}>
            {product.name}
          </h1>

          {/* 2. Birinci Bölüm: Sol Yazı - Sağ Teknik Kesit Resmi */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "40px", 
            alignItems: "center",
            marginBottom: "60px"
          }}>
            <div 
              style={{ fontSize: "1rem", color: "#444", lineHeight: "1.7", whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            {product.detailImage && (
              <div style={{ position: "relative", width: "100%", height: "320px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 5px 20px rgba(0,0,0,0.08)", backgroundColor: "#f9f9f9" }}>
                <Image 
                  src={product.detailImage} 
                  alt="ACP Teknik Detay" 
                  fill 
                  style={{ objectFit: "contain", padding: "10px" }} 
                />
              </div>
            )}
          </div>

          {/* 3. İkinci Bölüm: Sol Tablo - Sağ Renk/Detay Görseli (İstediğin yeni görsel ile) */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "40px", 
            alignItems: "center",
            marginBottom: "60px"
          }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ backgroundColor: "#fdf8f5", borderBottom: "2px solid #e5d8d0" }}>
                    <th style={{ padding: "12px", fontWeight: "600", color: "#333" }}>Parametru</th>
                    <th style={{ padding: "12px", fontWeight: "600", color: "#333" }}>Valoare / Descriere</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: "10px", fontWeight: "500" }}>Dimensiune standard (mm)</td><td style={{ padding: "10px", color: "#666" }}>4 × 1250 × 3200</td></tr>
                  <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: "10px", fontWeight: "500" }}>Grosime (mm)</td><td style={{ padding: "10px", color: "#666" }}>2 · 3 · 4 · 6</td></tr>
                  <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: "10px", fontWeight: "500" }}>Lățime (mm)</td><td style={{ padding: "10px", color: "#666" }}>1000 / 1250 / 1500</td></tr>
                  <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: "10px", fontWeight: "500" }}>Lungime (mm)</td><td style={{ padding: "10px", color: "#666" }}>până la 6000 mm – speciale la cerere</td></tr>
                  <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: "10px", fontWeight: "500" }}>Foaie de aluminiu</td><td style={{ padding: "10px", color: "#666" }}>EN AW 3005 / H42–H46</td></tr>
                  <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: "10px", fontWeight: "500" }}>Suprafața exterioară</td><td style={{ padding: "10px", color: "#666" }}>PVDF / HDP / PE</td></tr>
                  <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: "10px", fontWeight: "500" }}>Suprafața interioară</td><td style={{ padding: "10px", color: "#666" }}>Grund protector</td></tr>
                  <tr><td style={{ padding: "10px", fontWeight: "500" }}>Material de umplere</td><td style={{ padding: "10px", color: "#666" }}>Polietilenă (LDPE)</td></tr>
                </tbody>
              </table>
            </div>
            <div style={{ position: "relative", width: "100%", height: "320px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 5px 20px rgba(0,0,0,0.08)", backgroundColor: "#f9f9f9" }}>
              <Image 
                src="https://res.cloudinary.com/oivvupgw/image/upload/v1789256461/Bond_Color_t7va5t.jpg" 
                alt="ACP Renkler ve Detay" 
                fill 
                style={{ objectFit: "cover" }} 
              />
            </div>
          </div>
          

          {/* 4. En Altta 4 Marka ve Her Birinin Altında PDF Butonu */}
          {product.products && product.products.length > 0 && (
            <div style={{ marginTop: "60px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "30px", textAlign: "center" }}>
                Mărci Disponibile
              </h2>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
                gap: "25px" 
              }}>
                {product.products.map((brand, index) => (
                  <div key={index} style={{ 
                    border: "1px solid #eaeaea", 
                    borderRadius: "12px", 
                    padding: "20px", 
                    backgroundColor: "#fafafa",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.03)"
                  }}>
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#222", marginBottom: "10px" }}>
                        {brand.name}
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "#666", lineHeight: "1.5", marginBottom: "20px" }}>
                        {brand.description}
                      </p>
                    </div>
                    {brand.pdfUrl && (
                      <a 
                        href={brand.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          textDecoration: "none", 
                          backgroundColor: "#c5a491", 
                          color: "#fff", 
                          padding: "10px 15px", 
                          borderRadius: "6px", 
                          textAlign: "center", 
                          fontWeight: "500",
                          fontSize: "0.9rem",
                          display: "block"
                        }}
                      >
                        Catalog PDF
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    );
  }

  // DİĞER NORMAL ÜRÜNLER İÇİN MEVCUT STANDART GÖRÜNÜM:
  const mainDisplayImage = product.detailImage || product.image;

  return (
    <section style={{ padding: "40px 20px", backgroundColor: "#fff", width: "100%" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "700", color: "#1a1a1a", margin: "0 0 15px 0" }}>{product.name}</h1>
          <div style={{ fontSize: "0.95rem", color: "#666", lineHeight: "1.6", whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: product.description }} />
          <a href={product.pdfUrl || "#"} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", marginTop: "20px", display: "inline-block" }}>
            <div style={{ backgroundColor: "#c5a491", color: "#fff", padding: "10px 25px", borderRadius: "8px", fontWeight: "500" }}>Catalog</div>
          </a>
        </div>
        <div style={{ position: "relative", width: "100%", height: "300px", borderRadius: "15px", overflow: "hidden", boxShadow: "0 5px 15px rgba(0,0,0,0.08)", backgroundColor: "#f9f9f9" }}>
          <Image src={mainDisplayImage} alt={product.name} fill style={{ objectFit: "contain", padding: "15px" }} />
        </div>
      </div>
      {product.gallery && product.gallery.length > 0 && (
        <div style={{ maxWidth: "900px", margin: "40px auto 0", display: "flex", flexDirection: "column", gap: "30px" }}>
          {product.gallery.map((src, index) => (
            <div key={index} style={{ position: "relative", width: "100%", borderRadius: "15px", overflow: "hidden", boxShadow: "0 5px 20px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
              <Image src={src} alt={`${product.name} detay ${index + 1}`} width={900} height={500} style={{ width: "100%", height: "auto", objectFit: "contain" }} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}