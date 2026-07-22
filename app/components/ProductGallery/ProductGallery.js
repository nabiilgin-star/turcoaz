"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

// Görselleri ve linkleri indeks yerine slug'a bağlıyoruz
const CATEGORY_META = {
  "sisteme-aluminiu-akpa": {
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784416492/Turcoaz_fatade_s7zdev.jpg",
    links: ["Sisteme Tâmplărie", "Perete Cortină", "Gard", "Închidere Terasă", "Diverse Profile Aluminiu", "Glafuri din Aluminiu"],
    viewAllLink: "/produse#aluminiu"
  },
  "sisteme-balustrada": {
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
    links: ["Sistem Pătrat", "Sistem Rotund", "Balustradă Modulară", "Balustradă de Sticlă"],
    viewAllLink: "/produse#balustrada"
  },
  "balustrada-patrat": {
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
    links: ["Profil rectangular", "Linii drepte", "Design minimalist"],
    viewAllLink: "/produse#balustrada-patrat"
  },
  "balustrada-rotund": {
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
    links: ["Profile circulare", "Sisteme clasice", "Rezistență ridicată"],
    viewAllLink: "/produse#balustrada-rotund"
  },
  "balustrada-modulara": {
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
    links: ["Elemente de îmbinare", "Sisteme flexibile", "Accesorii moderne"],
    viewAllLink: "/produse#balustrada-modulara"
  },
  "balustrada-sticla": {
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
    links: ["Fixare inferioară (menghină)", "Transparență maximă", "Sticlă securizată"],
    viewAllLink: "/produse#balustrada-sticla"
  }
};

export default function CategoryList({ dbCategories = [] }) {
  // CSS Module ismini yakalayıp 3'lü sütuna zorlayan dinamik enjeksiyon
  useEffect(() => {
    const styleId = "force-subcategory-grid-3";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        /* İçinde subcategory-grid geçen tüm dinamik sınıfları yakalar ve 3'lü grid yapar */
        div[class*="subcategory-grid"] {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 24px !important;
        }

        /* Mobil cihazlarda alt alta düzgün listelenmesi için koruma */
        @media (max-width: 768px) {
          div[class*="subcategory-grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  let displayCategories = dbCategories.length > 0 
    ? dbCategories 
    : Object.keys(CATEGORY_META).map(slug => ({
        slug,
        title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      }));

  return (
    <section className="categories-section">
      <div className="container-max">
        <h2 className="categories-main-title">Produsele noastre</h2>
        
        {/* CSS module sınıf yapısını bozmamak için className'e dokunmuyoruz */}
        <div className="categories-grid">
          {displayCategories.map((cat, index) => {
            const currentSlug = cat.slug || "";
            let meta = CATEGORY_META[currentSlug];

            if (currentSlug.includes("balustrada")) {
              meta = CATEGORY_META["sisteme-balustrada"];
            }

            if (!meta) {
              meta = {
                image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
                links: [],
                viewAllLink: "/produse"
              };
            }

            return (
              <div className="category-card" key={currentSlug || index}>
                <div className="category-image-wrapper">
                  <Image 
                    src={meta.image} 
                    alt={cat.title || cat.name || "Balustrada"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="category-img"
                    priority={index < 3}
                  />
                </div>

                <div className="category-content">
                  <h3 className="category-card-title">{cat.title || cat.name}</h3>
                  
                  <ul className="category-links-list">
                    {meta.links && meta.links.map((link, lIndex) => (
                      <li key={lIndex}>
                        <span className="bullet-dot">•</span>
                        {link}
                      </li>
                    ))}
                  </ul>

                  <Link href={meta.viewAllLink} className="category-view-all">
                    Vezi toate produsele →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}