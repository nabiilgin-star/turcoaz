'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import teavaPatrataData from '@/app/data/teavaPatrata';
import styles from './product-page.module.css'; 

export default function TeavaPatrataView() {
  const [filterA, setFilterA] = useState('');
  const [filterS, setFilterS] = useState('');

  // 1. Kenar Ölçüsü (a) filtrelemesi
  const uniqueA = [...new Set(teavaPatrataData.map(item => item.a))].sort((a, b) => a - b);

  // 2. Et Kalınlığı (s) filtrelemesi (Seçilen A'ya göre daralır)
  const uniqueS = [...new Set(
    teavaPatrataData
      .filter(item => filterA === '' || item.a.toString() === filterA)
      .map(item => item.s)
  )].sort((a, b) => a - b);

  // Tabloyu filtreleme mantığı
  const filteredData = teavaPatrataData.filter(item => {
    const matchA = filterA === '' || item.a.toString() === filterA;
    const matchS = filterS === '' || item.s.toString() === filterS;
    return matchA && matchS;
  });

  return (
    <section className={styles.b2bProductSection}>
      {/* 1. ÜST BÖLÜM: B2B SATIŞ VE GÜVEN */}
      <div className={styles.productHeroGrid}>
        <div style={{ position: "relative", width: "100%", height: "350px", borderRadius: "12px", overflow: "hidden", background: "#fff", border: "1px solid #eaeaea" }}>
          <Image 
            src="https://res.cloudinary.com/oivvupgw/image/upload/v1790527387/profile_teava_aluminiu_patrata_tehnic_cyofon.jpg" 
            alt="teava patrata aluminiu profil patrat dimensiuni si schita tehnica"
            fill
            style={{ objectFit: "contain", padding: "10px" }}
            priority
          />
        </div>
        
        <div>
          {/* SEO Uyumlu H1 Başlık */}
          <h1 className={styles.productTitle}>Țeavă Pătrată Aluminiu Extrudat</h1>
          <div className={styles.priceTag}>de la 4,50 LEI / m / TVA inclus</div>
          
          {/* SEO Açıklama Paragrafı */}
          <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: "1.6", margin: "12px 0 16px 0" }}>
            La Turcoaz Aluminiu găsiți <strong>țeavă pătrată aluminiu</strong> (profil pătrat) de calitate superioară pentru cadre, rafturi și structuri ușoare. 
            Verificați lista de <strong>țeavă pătrată dimensiuni</strong> disponibile și solicitați o ofertă avantajoasă 
            pentru <strong>țeavă pătrată preț</strong> direct din stocul depozitelor noastre din Popești-Leordeni și Iași.
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
          Țeavă Pătrată Aluminiu – Specificații Tehnice și Dimensiuni
        </h2>
        
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <label>Latura - a (mm)</label>
            <select 
              value={filterA} 
              onChange={(e) => {
                setFilterA(e.target.value);
                setFilterS('');
              }}
            >
              <option value="">Toate</option>
              {uniqueA.map(val => <option key={val} value={val}>{val} x {val} mm</option>)}
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
            onClick={() => { setFilterA(''); setFilterS(''); }}
          >
            Resetează Filtrele
          </button>
        </div>

        <div className={styles.tableResponsive}>
          <table className={styles.b2bTable}>
            <thead>
              <tr>
                <th>Cod Profil</th>
                <th>Dimensiune (a x a)</th>
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
                    <td>{row.a} x {row.a} mm</td>
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