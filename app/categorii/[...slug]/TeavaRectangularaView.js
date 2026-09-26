'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import teavaData from '@/app/data/teavaRectangulara';
import styles from './product-page.module.css'; 

export default function TeavaRectangularaView() {
  const [filterA, setFilterA] = useState('');
  const [filterB, setFilterB] = useState('');
  const [filterS, setFilterS] = useState('');

  // 1. Latura a her zaman tüm benzersiz a değerlerini listeler
  const uniqueA = [...new Set(teavaData.map(item => item.a))].sort((x, y) => x - y);

  // 2. Latura b, seçilen filterA'ya göre dinamik olarak daralır
  const uniqueB = [...new Set(
    teavaData
      .filter(item => filterA === '' || item.a.toString() === filterA)
      .map(item => item.b)
  )].sort((x, y) => x - y);

  // 3. Et kalınlığı s, seçilen a ve b değerlerine göre dinamik olarak daralır
  const uniqueS = [...new Set(
    teavaData
      .filter(item => {
        const matchA = filterA === '' || item.a.toString() === filterA;
        const matchB = filterB === '' || item.b.toString() === filterB;
        return matchA && matchB;
      })
      .map(item => item.s)
  )].sort((x, y) => x - y);

  // Tablo verisini filtreleme mantığı
  const filteredData = teavaData.filter(item => {
    const matchA = filterA === '' || item.a.toString() === filterA;
    const matchB = filterB === '' || item.b.toString() === filterB;
    const matchS = filterS === '' || item.s.toString() === filterS;
    return matchA && matchB && matchS;
  });

  return (
    <section className={styles.b2bProductSection}>
      <div className={styles.productHeroGrid}>
        <div style={{ position: "relative", width: "100%", height: "350px", borderRadius: "12px", overflow: "hidden", background: "#fff", border: "1px solid #eaeaea" }}>
          <Image 
            src="https://res.cloudinary.com/oivvupgw/image/upload/v1790428490/profile_teava_aluminiu_rectangular_rrd1se.jpg" 
            alt="Teava Rectangulara Aluminiu"
            fill
            style={{ objectFit: "contain", padding: "10px" }}
            priority
          />
        </div>
        
        <div>
          <h1 className={styles.productTitle}>Țeavă Rectangulară Aluminiu</h1>
          <div className={styles.priceTag}>de la 4,20 LEI / m</div>
          
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
            <label>Latura a (mm)</label>
            <select 
              value={filterA} 
              onChange={(e) => {
                setFilterA(e.target.value);
                setFilterB(''); // A değişince B sıfırlanır
                setFilterS(''); // A değişince S sıfırlanır
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
                setFilterS(''); // B değişince S sıfırlanır
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
                  <tr key={index}>
                    <td><strong>{row.profilNo}</strong></td>
                    <td>{row.a} x {row.b} mm</td>
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