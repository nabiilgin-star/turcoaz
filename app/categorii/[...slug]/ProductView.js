import Image from "next/image";

export default function ProductView({ product }) {
  if (!product) return <div>Ürün bulunamadı.</div>;

  // ACP Bond sayfasına özel dikey akışlı özel tasarım
  const isAcpBond = product.slug === "acp-aluminiu-compozit-panel-bond";

  if (isAcpBond) {
    return (
      <section style={{ padding: "0 0 60px 0", backgroundColor: "#fff", width: "100%" }}>
        {/* 1. En Üst Tam Genişlik Banner Görseli */}
        {product.image && (
          <div style={{ width: "100%", height: "300px", position: "relative", marginBottom: "40px", backgroundColor: "#fcfcfc" }}>
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        )}

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "40px" }}>
          
          {/* Başlık */}
          <h1 style={{ fontSize: "2.4rem", fontWeight: "700", color: "#1a1a1a", textAlign: "center", margin: 0 }}>
            {product.name}
          </h1>

          {/* 2. Bölüm: Üstte Açıklama, Altta Teknik Kesit Resmi (Dikey Akış) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", background: "#fafafa", padding: "30px", borderRadius: "16px", border: "1px solid #eaeaea" }}>
            <div 
              style={{ fontSize: "1rem", color: "#444", lineHeight: "1.8", whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            {product.detailImage && (
              <div style={{ position: "relative", width: "100%", height: "350px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.06)", backgroundColor: "#fff" }}>
                <Image 
                  src={product.detailImage} 
                  alt="ACP Teknik Detay" 
                  fill 
                  style={{ objectFit: "contain", padding: "10px" }} 
                />
              </div>
            )}
          </div>

          {/* 3. Bölüm: Üstte Teknik Tablo, Altta Renk/Detay Görseli (Dikey Akış) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", background: "#fafafa", padding: "30px", borderRadius: "16px", border: "1px solid #eaeaea" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1a1a1a", margin: 0 }}>Parametri Tehnici</h3>
            
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem", textAlign: "left", backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden" }}>
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

            <div style={{ position: "relative", width: "100%", height: "320px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.06)", backgroundColor: "#fff" }}>
              <Image 
                src="https://res.cloudinary.com/oivvupgw/image/upload/v1789256461/Bond_Color_t7va5t.jpg" 
                alt="ACP Renkler ve Detay" 
                fill 
                style={{ objectFit: "cover" }} 
              />
            </div>
          </div>

          {/* 4. En Altta Mărci Disponibile (Dikey Akışlı Liste) */}
          {product.products && product.products.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "20px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1a1a1a", textAlign: "center", margin: 0 }}>
                Mărci Disponibile
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                {product.products.map((brand, index) => (
                  <div key={index} style={{ 
                    border: "1px solid #eaeaea", 
                    borderRadius: "16px", 
                    padding: "24px", 
                    backgroundColor: "#fafafa",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.03)"
                  }}>
                    {brand.image && (
                      <div style={{ position: "relative", width: "100%", height: "220px", borderRadius: "10px", overflow: "hidden", backgroundColor: "#fff", border: "1px solid #eee" }}>
                        <Image 
                          src={brand.image} 
                          alt={brand.name} 
                          fill 
                          style={{ objectFit: "contain", padding: "10px" }} 
                        />
                      </div>
                    )}

                    <div>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "#222", marginBottom: "8px" }}>
                        {brand.name}
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.6", margin: 0, whiteSpace: "pre-line" }}>
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
                          padding: "12px 20px", 
                          borderRadius: "8px", 
                          textAlign: "center", 
                          fontWeight: "500",
                          fontSize: "0.95rem",
                          display: "block",
                          alignSelf: "flex-start"
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

  // DİĞER NORMAL ÜRÜNLER İÇİN DİKEY AKIŞLI STANDART GÖRÜNÜM:
  const mainDisplayImage = product.detailImage || product.image;

  return (
    <section style={{ padding: "40px 20px", backgroundColor: "#fff", width: "100%" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "30px" }}>
        
        {/* Başlık */}
        <h1 style={{ fontSize: "2.2rem", fontWeight: "700", color: "#1a1a1a", margin: 0 }}>{product.name}</h1>
        
        {/* Üstte Büyük Ana Görsel */}
        {mainDisplayImage && (
          <div style={{ position: "relative", width: "100%", height: "380px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 5px 20px rgba(0,0,0,0.08)", backgroundColor: "#f9f9f9", border: "1px solid #eaeaea" }}>
            <Image src={mainDisplayImage} alt={product.name} fill style={{ objectFit: "contain", padding: "15px" }} />
          </div>
        )}

        {/* Altta Açıklama Metni */}
        <div style={{ fontSize: "1rem", color: "#555", lineHeight: "1.8", whiteSpace: "pre-line", background: "#fafafa", padding: "30px", borderRadius: "16px", border: "1px solid #eaeaea" }} dangerouslySetInnerHTML={{ __html: product.description }} />
        
        {product.pdfUrl && (
          <a href={product.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-block", alignSelf: "flex-start" }}>
            <div style={{ backgroundColor: "#c5a491", color: "#fff", padding: "12px 28px", borderRadius: "8px", fontWeight: "600" }}>Catalog PDF</div>
          </a>
        )}
      </div>

      {/* En Altta Alt Alta Sıralı Galeri Fotoğrafları */}
      {product.gallery && product.gallery.length > 0 && (
        <div style={{ maxWidth: "900px", margin: "50px auto 0", display: "flex", flexDirection: "column", gap: "30px" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1a1a1a", margin: 0 }}>Galerie Foto</h3>
          {product.gallery.map((src, index) => (
            <div key={index} style={{ position: "relative", width: "100%", borderRadius: "16px", overflow: "hidden", boxShadow: "0 5px 20px rgba(0,0,0,0.08)", backgroundColor: "#fff", border: "1px solid #eaeaea", padding: "10px" }}>
              <Image src={src} alt={`${product.name} detay ${index + 1}`} width={900} height={500} style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}