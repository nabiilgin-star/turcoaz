"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ProductCard({ product, baseUrl }) {
  // Sayfa yüklendiğinde Tailwind dahil tüm 4'lü grid sınıflarını ezen agresif kural enjeksiyonu
  useEffect(() => {
    const styleId = "force-3-3-grid-ultimate";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        /* 1. Olası tüm özel sınıf isimlerini ezer */
        .categories-grid, 
        .products-grid, 
        .products-container,
        .best-sellers-grid,
        .product-grid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 24px !important;
        }

        /* 2. Eğer projede Tailwind CSS kullanılıyorsa, grid-cols-4 sınıflarını tamamen devre dışı bırakıp 3 yapar */
        div[class*="grid-cols-4"],
        div[class*="sm:grid-cols-4"],
        div[class*="md:grid-cols-4"],
        div[class*="lg:grid-cols-4"],
        div[class*="xl:grid-cols-4"] {
          grid-template-columns: repeat(3, 1fr) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Image
          src={product.image || "/images/placeholder.svg"} 
          alt={product.title || "Produs"}
          fill
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        {product.hasVariants && (
          <span className="variant-label">Produs cu variante</span>
        )}
      </div>

      <div className="product-action">
        <Link
          href={
            baseUrl
              ? `${baseUrl}/${product.slug}`
              : product.link || `/produse/${product.slug}`
          }
        >
          <button className="btn-details">Vezi detalii</button>
        </Link>
      </div>
    </div>
  );
}