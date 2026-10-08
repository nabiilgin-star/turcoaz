'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Veri dosyanızın yolu
import cornierData from '@/app/data/cornier';

// CSS dosyanız
import styles from './product-page.module.css'; 

export default function CornierView() {
  // Filtreler için State'ler
  const [filterA, setFilterA] = useState('');
  const [filterB, setFilterB] = useState('');
  const [filterS, setFilterS] = useState('');

  // 1. Latura a her zaman tüm benzersiz a değerlerini listeler
  const uniqueA = [...new Set(cornierData.map(item => item.a))].sort((a, b) => a - b);

  // 2. Latura b, seçilen filterA'ya göre dinamik olarak daralır
  const uniqueB = [...new Set(
    cornierData
      .filter(item => {
        return filterA === '' || item.a.toString() === filterA;
      })
      .map(item => item.b || item.a)
  )].sort((a, b) => a - b);

  // 3. Grosime s, seçilen a ve b değerlerine göre dinamik olarak daralır
  const uniqueS = [...new Set(
    cornierData
      .filter(item => {
        const itemB = item.b || item.a;
        const matchA = filterA === '' || item.a.toString() === filterA;
        const matchB = filterB === '' || itemB.toString() === filterB;
        return matchA && matchB;
      })
      .map(item => item.s)
  )].sort((a, b) => a - b);

  // Tabloyu anlık filtreleme mantığı
  const filteredData = cornierData.filter(item => {
    const matchA = filterA === '' || item.a.toString() === filterA;
    const itemB = item.b || item.a; 
    const matchB = filterB === '' || itemB.toString() === filterB;
    const matchS = filterS === '' || item.s.toString() === filterS;
    
    return matchA && matchB && matchS;
  });

  return (
    <section className={styles.b2bProductSection}>
      {/* 1. ÜST BÖLÜM: B2B SATIŞ VE GÜVEN */}
      <div className={styles.productHeroGrid}>
        <div style={{ position: "relative", width: "100%", height: "350px", borderRadius: "12px", overflow: "hidden", background: "#fff", border: "1px solid #eaeaea" }}>
          <Image 
            src="https://res.cloudinary.com/oivvupgw/image/upload/v1790526907/profile_Cornier_tehnic_zgbjhz.jpg" 
            alt="cornier aluminiu profil L dimensiuni si schita tehnica"
            fill
            style={{ objectFit: "contain", padding: "10px" }}
            priority
          />
        </div>
        
        <div>
          {/* SEO Uyumlu H1 */}
          <h1 className={styles.productTitle}>Cornier Aluminiu Extrudat (Profil L)</h1>
          <div className={styles.priceTag}>de la 3,40 LEI / m</div>
          
          {/* SEO Açıklama Paragrafı (Ana ve İkincil Kelimeler Entegre Edildi) */}
          <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: "1.6", margin: "12px 0 16px 0" }}>
            La Turcoaz Aluminiu găsiți <strong>cornier aluminiu</strong> (profil L) de calitate superioară cu laturi egale și inegale. 
            Verificați gama noastră de <strong>cornier aluminiu dimensiuni</strong> standard și solicitați o ofertă avantajoasă 
            pentru <strong>cornier aluminiu preț</strong> direct din stocul depozitelor noastre din Popești-Leordeni și Iași.
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
          Cornier Cu Laturi Egale și Inegale – Specificații Tehnice
        </h2>
        
        {/* Filtre Çubuğu */}
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <label>Latura a (mm)</label>
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
            <label>Latura b (mm)</label>
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
            <label>Grosime s (mm)</label>
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
          >
            Resetează Filtrele
          </button>
        </div>

        {/* Veri Tablosu */}
        <div className={styles.tableResponsive}>
          <table className={styles.b2bTable}>
            <thead>
              <tr>
                <th>Cod Profil</th>
                <th>Dimensiuni (a x b)</th>
                <th>Grosime (s)</th>
                <th>Greutate (Kg/ml)</th>
                <th>Disponibilitate</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={row.profilNo || index}>
                    <td><strong>{row.profilNo}</strong></td>
                    <td>{row.a} x {row.b || row.a} mm</td>
                    <td>{row.s} mm</td>
                    <td>{row.kg} Kg/ml</td>
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