'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <-- BU EKLENDİ

// Veri dosyanızın yolunu kendi klasör yapınıza göre kontrol edin. 
// Örneğin: '@/app/data/cornier' veya '@/data/cornier'
import cornierData from '@/app/data/cornier';

// CSS dosyanızı import ediyoruz
import styles from './product-page.module.css'; 

export default function CornierView() {
  // Filtreler için State'ler
  const [filterA, setFilterA] = useState('');
  const [filterB, setFilterB] = useState('');
  const [filterS, setFilterS] = useState('');

  // Dropdown'lar için benzersiz (unique) ölçüleri çıkarıp küçükten büyüğe sıralıyoruz
  const uniqueA = [...new Set(cornierData.map(item => item.a))].sort((a, b) => a - b);
  // Eğer b değeri yoksa (eşkenar ise) a değerini b olarak kabul ediyoruz
  const uniqueB = [...new Set(cornierData.map(item => item.b || item.a))].sort((a, b) => a - b);
  const uniqueS = [...new Set(cornierData.map(item => item.s))].sort((a, b) => a - b);

  // Tabloyu anlık filtreleme mantığı
  const filteredData = cornierData.filter(item => {
    const matchA = filterA === '' || item.a.toString() === filterA;
    const itemB = item.b || item.a; // Eşkenar ise b değeri a'ya eşittir
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
            src="https://res.cloudinary.com/oivvupgw/image/upload/v1790428504/profile_Cornier_olog97.jpg" 
            alt="Cornier Aluminiu Profil L"
            fill
            style={{ objectFit: "contain", padding: "10px" }}
            priority
          />
        </div>
        
        <div>
          <h1 className={styles.productTitle}>Cornier Aluminiu (Profil L)</h1>
          <div className={styles.priceTag}>de la 3,40 LEI / m</div>
          
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

      {/* 2. ALT BÖLÜM: FİLTRELİ DİNAMİK TABLO */}
      <div className={styles.technicalTableSection}>
        <h3>Specificații Tehnice și Dimensiuni</h3>
        
        {/* Filtre Çubuğu */}
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <label>Latura a (mm)</label>
            <select value={filterA} onChange={(e) => setFilterA(e.target.value)}>
              <option value="">Toate</option>
              {uniqueA.map(val => <option key={val} value={val}>{val} mm</option>)}
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label>Latura b (mm)</label>
            <select value={filterB} onChange={(e) => setFilterB(e.target.value)}>
              <option value="">Toate</option>
              {uniqueB.map(val => <option key={val} value={val}>{val} mm</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Grosime s (mm)</label>
            <select value={filterS} onChange={(e) => setFilterS(e.target.value)}>
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
                  <tr key={index}>
                    <td><strong>{row.profilNo}</strong></td>
                    <td>{row.a} x {row.b || row.a} mm</td>
                    <td>{row.s} mm</td>
                    <td>{row.kg} Kg/ml</td>
                    <td>
                      {/* JSON verinizdeki stoc durumuna göre yeşil veya sarı etiket */}
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