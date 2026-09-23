'use client';
import { useState } from 'react';
import Link from 'next/link';
import './Categories.css'; 

const IMAGE_REPLACEMENTS = {
  'sisteme-balustrada': 'https://res.cloudinary.com/oivvupgw/video/upload/v1784410358/iu5y33cfqflyttmnrjcz_vhxsmm.mp4',
  'componente-sisteme-sticla': 'https://res.cloudinary.com/oivvupgw/image/upload/v1784411023/componentesticla_fzvhmq.jpg',
  'acp-aluminiu-compozit-panel-bond': 'https://res.cloudinary.com/oivvupgw/video/upload/v1784411343/ACP_exterior_qgltil.mp4',
  'profile-pvc': 'https://res.cloudinary.com/oivvupgw/image/upload/v1784452707/FerestrePVC_dd7ixj.jpg',
  'sticla': 'https://res.cloudinary.com/oivvupgw/image/upload/v1784416310/Sticla-Securizata-Curbata_ya1kgq.png',
};

export default function CategoriesSection({ className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    {
      id: 1,
      title: 'Sisteme Aluminiu Akpa',
      slug: 'sisteme-aluminiu-akpa',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
      subcategories: ['Sisteme Tâmplărie', 'Perete Cortină', 'Gard', 'Închidere Terasă', 'Diverse Profile Aluminiu', 'Glafuri din Aluminiu']
    },
    {
      id: 2,
      title: 'Glafuri din Aluminiu',
      slug: 'glafuri-din-aluminiu',
      image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784664028/pervazaluminiu_dtoqug.png",
      subcategories: ['Lățimi: 75 mm - 380 mm', 'RAL 9016 / 8014 / 7016 / Stejar A./ Nuc / Wenghe', 'Debitare la Dimensiune', 'Stoc permanent de peste 200 de tone pentru livrare imediată']
    },
    {
      id: 3,
      title: 'Sisteme Balustradă',
      slug: 'sisteme-balustrada',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
      subcategories: ['Sistem Balustradă Pătrat', 'Sistem Balustradă Rotund', 'Balustradă Modulară', 'Balustradă de Sticlă']
    },
    {
      id: 3,
      title: 'Componente Sisteme Sticlă',
      slug: 'componente-sisteme-sticla',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
      subcategories: ['Ușă din Sticlă cu Toc', 'Ușă din Sticlă fără Toc', 'Sisteme Cabină de Duș', 'Compartimentare Sticlă']
    },
    {
      id: 5,
      title: 'Panouri Compozite ACP (Bond)',
      slug: 'acp-aluminiu-compozit-panel-bond',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800',
      subcategories: ['PrimeBond Plus', 'PrimeBond', 'DuraBond', 'RallBond']
    },
    {
      id: 6,
      title: 'Profile PVC',
      slug: 'profile-pvc',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
      subcategories: ['Profile Fereastră Containere', 'Glafuri PVC', 'Sistem Glisant PVC', 'BLANCOPLAST', 'Exenplast']
    },
    {
      id: 7,
      title: 'Sticlă Specială',
      slug: 'sticla',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
      subcategories: ['Sticlă Securizată Curbată', 'Sticlă Laminată Securizată']
    }
  ];

  return (
    <section className={`categories-section ${className}`}>
      <h2 className="categories-title">Produsele noastre</h2>
      
      <div className="categories-container-accordion">
        {categories.map((cat, index) => {
          const isActive = activeIndex === index;
          const lookupSlug = cat.slug ? cat.slug.trim() : '';
          const finalMedia = IMAGE_REPLACEMENTS[lookupSlug] || cat.image;
          const isVideo = finalMedia.includes('.mp4') || finalMedia.includes('/video/upload/');

          return (
            <div 
              key={cat.id}
              className={`category-card-accordion ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              style={{ position: 'relative' }} // Tıklama katmanı için zemin hazırladık
            >
              {/* TÜM KARTA TIKLAMA HİSSİ VEREN GİZLİ KATMAN */}
              <Link 
                href={`/categorii/${cat.slug}`} 
                className="card-clickable-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 10, // Yazıların ve görselin önüne geçerek her yeri tıklanabilir yapar
                  cursor: 'pointer'
                }}
                aria-label={`Vezi toate produsele din ${cat.title}`}
              />

              {/* Arka Plan Görsel / Video Alanı */}
              <div className="card-image-wrapper">
                {isVideo ? (
                  <video 
                    src={finalMedia}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="card-image-new"
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      left: 0,
                      top: 0,
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <img 
                    src={finalMedia} 
                    alt={cat.title} 
                    className="card-image-new"
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      left: 0,
                      top: 0,
                      objectFit: 'cover',
                      color: 'transparent'
                    }}
                  />
                )}
                <div className={`card-overlay-new ${isActive ? 'active' : ''}`} />
              </div>

              {/* İçerik Alanı */}
              <div className="card-content-new" style={{ pointerEvents: 'none' }}> 
                {/* pointerEvents: 'none' vererek linkin tıklanmasını engellemesini önledik */}
                
                {/* Kapalı Karttaki Dikey Yazı */}
                <h3 className="vertical-title-new">
                  {cat.title}
                </h3>

                {/* Açık Karttaki Detay Alanı */}
                <div className="active-content-inner">
                  <h3 className="category-title-expanded">
                    {cat.title}
                  </h3>
                  
                  <ul className="subcategory-list-new">
                    {cat.subcategories.map((sub, idx) => (
                      <li key={idx}>{sub}</li>
                    ))}
                  </ul>

                  <span className="see-details-underline">
                    Vezi toate produsele
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}