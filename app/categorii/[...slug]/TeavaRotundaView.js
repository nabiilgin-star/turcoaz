'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import teavaRotundaData from '@/app/data/teavaRotunda';
import styles from './product-page.module.css'; 

export default function TeavaRotundaView() {
  const [filterD, setFilterD] = useState('');
  const [filterS, setFilterS] = useState('');

  // 1. Dış Çap (D) filtrelemesi (Her zaman benzersiz tüm değerleri gösterir)
  const uniqueD = [...new Set(teavaRotundaData.map(item => item.D))].sort((a, b) => a - b);

  // 2. Et Kalınlığı (s) filtrelemesi (Seçilen Dış Çap'a göre dinamik daralır)
  const uniqueS = [...new Set(
    teavaRotundaData
      .filter(item => filterD === '' || item.D.toString() === filterD)
      .map(item => item.s)
  )].sort((a, b) => a - b);

  // Tabloyu filtreleme mantığı
  const filteredData = teavaRotundaData.filter(item => {
    const matchD = filterD === '' || item.D.toString() === filterD;
    const matchS = filterS === '' || item.s.toString() === filterS;
    return matchD && matchS;
  });

  return (
    <section className={styles.b2bProductSection}>
      <div className={styles.productHeroGrid}>
        <div style={{ position: "relative", width: "100%", height: "350px", borderRadius: "12px", overflow: "hidden", background: "#fff", border: "1px solid #eaeaea" }}>
          <Image 
            // NOT: Buraya kendi cloudinary'nizdeki Yuvarlak Boru (Teava Rotunda) görsel linkinizi yapıştırın
            src="https://res.cloudinary.com/oivvupgw/image/upload/v1790428490/profile_teava_aluminiu_rectangular_rrd1se.jpg" 
            alt="Țeavă Rotundă Aluminiu"
            fill
            style={{ objectFit: "contain", padding: "10px" }}
            priority
          />
        </div>
        
        <div>
          <h1 className={styles.productTitle}>Țeavă Rotundă Aluminiu</h1>
          <div className={styles.priceTag}>de la 3,80 LEI / m</div>
          
          <ul className={styles.trustBadges}>
            <li className={styles.stockIn}>✅ Peste 200 de tone în stoc permanent</li>
            <li className={styles.shippingNote}>🚚 Se expediază la comandă</li>
            <li className={styles.taxNote}>⚠️ Prețul nu include taxele de transport</li>
          </ul>

          <div className={styles.actionButtons}>
            <button className={styles.btnCalculator}>🧮 Consultați calculatorul UM</button>
            <Link href="/contact" className={styles.btnQuote}>Solicită ofertă</Link>
          </div>
        </div>
      </div>

      <div className={styles.technicalTableSection}>
        <h3>Specificații Tehnice și Dimensiuni</h3>
        
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <label>Diametru Exterior - D (mm)</label>
            <select 
              value={filterD} 
              onChange={(e) => {
                setFilterD(e.target.value);
                setFilterS(''); // D değişince S sıfırlanır
              }}
            >
              <option value="">Toate</option>
              {uniqueD.map(val => <option key={val} value={val}>Ø {val} mm</option>)}
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
            onClick={() => { setFilterD(''); setFilterS(''); }}
          >
            Resetează Filtrele
          </button>
        </div>

        <div className={styles.tableResponsive}>
          <table className={styles.b2bTable}>
            <thead>
              <tr>
                <th>Cod Profil</th>
                <th>D (Ext) x d (Int)</th>
                <th>Grosime (s)</th>
                <th>Greutate (Kg/m)</th>
                <th>Disponibilitate</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={index}>
                    <td><strong>{row.profilNo}</strong></td>
                    <td>Ø {row.D} x {row.d} mm</td>
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