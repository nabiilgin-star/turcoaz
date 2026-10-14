"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, baseUrl }) {
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
        
        {/* SADECE FİYAT VARSA GÖSTERİR - Yükseklik farkı CSS Grid/Flex ile ebeveyn div'de tolere edilmelidir */}
        {product.price && (
          <div className="product-price" style={{ color: "#0088A5", fontWeight: "700", marginTop: "10px", fontSize: "1.1rem" }}>
            {product.price} <span style={{ fontSize: "0.85rem", color: "#666", fontWeight: "400" }}>(fără TVA)</span>
          </div>
        )}

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