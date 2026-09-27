'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import platbandaData from '@/app/data/platbanda';
import styles from './product-page.module.css'; 

export default function PlatbandaView() {
  const [filterA, setFilterA] = useState('');
  const [filterB, setFilterB] = useState('');

  // 1. Genişlik (a)
  const uniqueA = [...new Set(platbandaData.map(item => item.a))].sort((a, b) => a - b);

  // 2. Kalınlık (b) - Sadece seçilen A'ya göre daralır
  const uniqueB = [...new Set(
    platbandaData
      .filter(item => filterA === '' || item.a.toString() === filterA)
      .map(item => item.b)
  )].sort((a, b) => a - b);

  // Tabloyu filtreleme mantığı
  const filteredData = platbandaData.filter(item => {
    const matchA = filterA === '' || item.a.toString() === filterA;
    const matchB = filterB === '' || item.b.toString() === filterB;
    return matchA && matchB;
  });

  return (
    <section className={styles.b2bProductSection}>
      <div className={styles.productHeroGrid}>
        <div style={{ position: "relative", width: "100%", height: "350px", borderRadius: "12px", overflow: "hidden", background: "#fff", border: "1px solid #eaeaea" }}>
          <Image 
            // NOT: Platbanda (Lama Profil) için kendi görsel URL'nizi buraya koyun
            src="https://res.cloudinary.com/oivvupgw/image/upload/v1790529146/profile_teava_aluminiu_platbanda_wfjhty.jpg" 
            alt="Platbandă Aluminiu (Lamă)"
            fill
            style={{ objectFit: "contain", padding: "10px" }}
            priority
          />
        </div>
        
        <div>
          <h1 className={styles.productTitle}>Platbandă Aluminiu (Lamă)</h1>
          <div className={styles.priceTag}>de la 3,50 LEI / m</div>
          
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
        
        <div className={styles.filterBar} style={{ flexWrap: 'wrap', gap: '15px' }}>
          <div className={styles.filterGroup}>
            <label>Lățime - a (mm)</label>
            <select 
              value={filterA} 
              onChange={(e) => {
                setFilterA(e.target.value);
                setFilterB(''); // a değişince b sıfırlanır
              }}
            >
              <option value="">Toate</option>
              {uniqueA.map(val => <option key={val} value={val}>{val} mm</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Grosime - b (mm)</label>
            <select 
              value={filterB} 
              onChange={(e) => setFilterB(e.target.value)}
            >
              <option value="">Toate</option>
              {uniqueB.map(val => <option key={val} value={val}>{val} mm</option>)}
            </select>
          </div>
          
          <button 
            className={styles.btnClearFilters} 
            onClick={() => { setFilterA(''); setFilterB(''); }}
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
                <th>Rază (r)</th>
                <th>Greutate (Kg/m)</th>
                <th>Disponibilitate</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={index}>
                    <td><strong>{row.profilNo}</strong></td>
                    <td>{row.a} x {row.b} mm</td>
                    <td>{row.r} mm</td>
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
                  <td colSpan="5" className={styles.textCenter}>Nu au fost găsite platbande pentru dimensiunile selectate.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}