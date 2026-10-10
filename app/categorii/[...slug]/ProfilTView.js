'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profilTData from '@/app/data/profilT';
import styles from './product-page.module.css'; 

export default function ProfilTView() {
  const [filterA, setFilterA] = useState('');
  const [filterB, setFilterB] = useState('');
  const [filterS, setFilterS] = useState('');

  // 1. Üst Genişlik (a)
  const uniqueA = [...new Set(profilTData.map(item => item.a))].sort((a, b) => a - b);

  // 2. Gövde Yüksekliği (b) - Sadece seçilen A'ya göre daralır
  const uniqueB = [...new Set(
    profilTData
      .filter(item => filterA === '' || item.a.toString() === filterA)
      .map(item => item.b)
  )].sort((a, b) => a - b);

  // 3. Et Kalınlığı (s) - Seçilen A ve B'ye göre daralır
  const uniqueS = [...new Set(
    profilTData
      .filter(item => (filterA === '' || item.a.toString() === filterA) && 
                      (filterB === '' || item.b.toString() === filterB))
      .map(item => item.s)
  )].sort((a, b) => a - b);

  // Tabloyu filtreleme mantığı
  const filteredData = profilTData.filter(item => {
    const matchA = filterA === '' || item.a.toString() === filterA;
    const matchB = filterB === '' || item.b.toString() === filterB;
    const matchS = filterS === '' || item.s.toString() === filterS;
    return matchA && matchB && matchS;
  });

  return (
    <section className={styles.b2bProductSection}>
      {/* 1. ÜST BÖLÜM: B2B SATIŞ VE GÜVEN */}
      <div className={styles.productHeroGrid}>
        <div style={{ position: "relative", width: "100%", height: "350px", borderRadius: "12px", overflow: "hidden", background: "#fff", border: "1px solid #eaeaea" }}>
          <Image 
            src="https://res.cloudinary.com/oivvupgw/image/upload/v1790527688/Profile_T_j2twek.png" 
            alt="profil T aluminiu dimensiuni si schita tehnica"
            fill
            style={{ objectFit: "contain", padding: "10px" }}
            priority
          />
        </div>
        
        <div>
          {/* SEO Uyumlu H1 Başlık */}
          <h1 className={styles.productTitle}>Profil T Aluminiu Extrudat</h1>
          <div className={styles.priceTag}>de la 4,90 LEI / m / Cu TVA</div>
          
          {/* SEO Açıklama Paragrafı */}
          <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: "1.6", margin: "12px 0 16px 0" }}>
            La Turcoaz Aluminiu găsiți <strong>profil T aluminiu</strong> (profil aluminiu T) extrudat pentru îmbinări, rame și structuri ușoare. 
            Consultați lista de <strong>profil T aluminiu dimensiuni</strong> disponibile și cereți o ofertă avantajoasă 
            de <strong>profil T aluminiu preț</strong> direct din stocul depozitelor noastre din Popești-Leordeni și Iași.
          </p>

          <ul className={styles.trustBadges}>
            <li className={styles.stockIn}>✅ Peste 200 de tone în stoc permanent</li>
            <li className={styles.shippingNote}>🚚 Se expediază la comandă</li>
            <li className={styles.taxNote}>⚠️ Prețul nu include taxele de transport</li>
          </ul>

          {/* Action Buttons + Catalog PDF */}
          <div className={styles.actionButtons} style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginTop: "16px" }}>
            <Link 
              href="/catalog-profile-standard.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#c5a491",
                color: "#ffffff",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "13px",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(197, 164, 145, 0.35)"
              }}
            >
              Catalog PDF
            </Link>
            <button className={styles.btnCalculator}>🧮 Calculator UM</button>
            <Link href="/contact" className={styles.btnQuote}>Solicită ofertă</Link>
          </div>
        </div>
      </div>

      {/* 2. ALT BÖLÜM: FİLTRELİ DİNAMİK TABLO */}
      <div className={styles.technicalTableSection} style={{ marginTop: "40px" }}>
        {/* H2 Başlık: SEO Uyumlu İkincil Kelimeler */}
        <h2 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#0F172A", marginBottom: "20px" }}>
          Profil T Aluminiu – Specificații Tehnice și Dimensiuni
        </h2>
        
        <div className={styles.filterBar} style={{ flexWrap: 'wrap', gap: '15px' }}>
          <div className={styles.filterGroup}>
            <label>Latura - a (mm)</label>
            <select 
              value={filterA} 
              onChange={(e) => {
                setFilterA(e.target.value);
                setFilterB('');
                setFilterS('');
              }}
            >
              <option value="">Toate</option>
              {uniqueA.map(val => <option key={val} value={val}>{val} mm</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Înălțime - b (mm)</label>
            <select 
              value={filterB} 
              onChange={(e) => {
                setFilterB(e.target.value);
                setFilterS('');
              }}
            >
              <option value="">Toate</option>
              {uniqueB.map(val => <option key={val} value={val}>{val} mm</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Grosime - s (mm)</label>
            <select 
              value={filterS} 
              onChange={(e) => setFilterS(e.target.value)}
            >
              <option value="">Toate</option>
              {uniqueS.map(val => <option key={val} value={val}>{val} mm</option>)}
            </select>
          </div>
          
          <button 
            className={styles.btnClearFilters} 
            onClick={() => { setFilterA(''); setFilterB(''); setFilterS(''); }}
            style={{ alignSelf: 'flex-end' }}
          >
            Resetează
          </button>
        </div>

        <div className={styles.tableResponsive}>
          <table className={styles.b2bTable}>
            <thead>
              <tr>
                <th>Cod Profil</th>
                <th>Dimensiune (a x b)</th>
                <th>Grosime (s)</th>
                <th>Greutate (Kg/m)</th>
                <th>Disponibilitate</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={row.profilNo || index}>
                    <td><strong>{row.profilNo}</strong></td>
                    <td>{row.a} x {row.b} mm</td>
                    <td>{row.s} mm</td>
                    <td>{row.kg} Kg/m</td>
                    <td>
                      {row.stoc ? (
                        <span className={styles.badgeStoc}>În stoc</span>
                      ) : (
                        <span className={styles.badgeComanda}>La comandă</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.textCenter}>Nu au fost găsite profile pentru dimensiunile selectate.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}