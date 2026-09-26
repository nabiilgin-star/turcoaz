'use client';
import { useState } from 'react';
import Link from 'next/link';
// Veri dosyanızın yolunu kendi klasör yapınıza göre ayarlayın
import cornierData from '@/data/cornier'; 
import './ProductDetail.css'; // Sayfaya özel CSS dosyanız (varsa)

export default function CornierPage() {
  // Filtreler için State'ler
  const [filterA, setFilterA] = useState('');
  const [filterB, setFilterB] = useState('');
  const [filterS, setFilterS] = useState('');

  // Dropdown'lar için benzersiz (unique) ölçüleri çıkarıp sıralıyoruz
  const uniqueA = [...new Set(cornierData.map(item => item.a))].sort((a, b) => a - b);
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
    <section className="b2b-product-section">
      {/* 1. ÜST BÖLÜM: B2B SATIŞ VE GÜVEN */}
      <div className="product-hero-grid">
        <div className="product-image-box">
          {/* Buraya köşebent teknik çizimi veya görseli gelecek */}
          <div className="placeholder-image">Grafic / Secțiune Cornier</div>
        </div>
        
        <div className="product-info-box">
          <h1 className="product-title">Cornier Aluminiu (Profil L)</h1>
          <div className="price-tag">de la 3,40 LEI / m</div>
          
          <ul className="trust-badges">
            <li className="stock-in">✅ Peste 200 de tone în stoc permanent</li>
            <li className="shipping-note">🚚 Se expediază la comandă</li>
            <li className="tax-note">⚠️ Prețul nu include taxele de transport</li>
          </ul>

          <div className="action-buttons">
            <button className="btn-calculator">🧮 Consultați calculatorul UM</button>
            <Link href="/contact" className="btn-quote">Solicită ofertă</Link>
          </div>
        </div>
      </div>

      {/* 2. ALT BÖLÜM: FİLTRELİ DİNAMİK TABLO */}
      <div className="technical-table-section">
        <h3>Specificații Tehnice și Dimensiuni</h3>
        
        {/* Filtre Çubuğu */}
        <div className="filter-bar">
          <div className="filter-group">
            <label>Latura a (mm)</label>
            <select value={filterA} onChange={(e) => setFilterA(e.target.value)}>
              <option value="">Toate</option>
              {uniqueA.map(val => <option key={val} value={val}>{val} mm</option>)}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Latura b (mm)</label>
            <select value={filterB} onChange={(e) => setFilterB(e.target.value)}>
              <option value="">Toate</option>
              {uniqueB.map(val => <option key={val} value={val}>{val} mm</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Grosime s (mm)</label>
            <select value={filterS} onChange={(e) => setFilterS(e.target.value)}>
              <option value="">Toate</option>
              {uniqueS.map(val => <option key={val} value={val}>{val} mm</option>)}
            </select>
          </div>
          
          <button 
            className="btn-clear-filters" 
            onClick={() => { setFilterA(''); setFilterB(''); setFilterS(''); }}
          >
            Resetează Filtrele
          </button>
        </div>

        {/* Veri Tablosu */}
        <div className="table-responsive">
          <table className="b2b-table">
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
                      {row.stoc ? (
                        <span className="badge-stoc">În stoc</span>
                      ) : (
                        <span className="badge-comanda">La comandă</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">Nu au fost găsite profile pentru dimensiunile selectate.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}