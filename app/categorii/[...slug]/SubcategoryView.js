import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/app/components/BestSellers/ProductCard";
import styles from "./subcategory-products.module.css";
import catStyles from "./subcategory.module.css";

export default function SubcategoryView({
  category,
  subcategory,
  products,
  subcategories,
}) {
  // Eğer local veri veya api verisiyse güvenli path oluşturma
  const categorySlug = category?.slug || "";
  const subcategorySlug = subcategory?.slug || "";

  // Filtreleme: Alt kategoriler listelenirken, şu an içinde bulunduğumuz alt kategoriyi listeden çıkartıyoruz.
  // Böylece "Sisteme Tamplarie" içerisindeyken kendisi bir daha menü olarak aşağıda türemez.
  const filteredSubcategories = (subcategories || []).filter(
    (sub) => sub.slug !== subcategorySlug
  );

  return (
    <section className={styles["subcategory-products-section"]}>
      <div className="container-max">
        <div className={styles["subcategory-header"]}>
          <h1 className={styles["subcategory-title"]}>
            {subcategory?.name || ""}{" "}
            {products && products.length > 0 && (
              <span style={{ color: "#667085", fontWeight: "300", fontSize: "1.5rem" }}>
                ({products.length})
              </span>
            )}
          </h1>
        </div>

        {/* DİĞER ALT KATEGORİLER (Menü Elemanları) */}
        {filteredSubcategories.length > 0 && (
          <div
            className={catStyles["subcategory-grid"]}
            style={{ marginBottom: "3rem" }}
          >
            {filteredSubcategories.map((sub, index) => (
              <Link
                key={index}
                // Düzeltilen URL: Kategori -> Yeni tıklanan alt kategori şeklinde temiz yönlendirme
                href={`/categorii/${categorySlug}/${sub.slug}`}
                className={catStyles["subcategory-card"]}
              >
                <div className={catStyles["subcategory-image-wrapper"]}>
                  <Image
                    src={
                      sub.image ||
                      "https://images.unsplash.com/photo-1631626244439-d349340623bd?auto=format&fit=crop&w=500&q=60"
                    }
                    alt={sub.name}
                    width={500}
                    height={500}
                    className={catStyles["subcategory-image"]}
                  />
                </div>
                <span className={catStyles["subcategory-name"]}>
                  {sub.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* 4 ADET ÜRÜNÜN LİSTELENDİĞİ YER (ProductCard) */}
        {products && products.length > 0 && (
          <div className={styles["products-grid"]}>
            {products.map((product) => (
              <ProductCard
                key={product.id || product.slug}
                product={product}
                // Ürün detayı için doğru base URL yapısı
                baseUrl={`/categorii/${categorySlug}/${subcategorySlug}`}
              />
            ))}
          </div>
        )}

        {/* EĞER BOMBOŞSA GÖSTERİLECEK ALAN */}
        {(!products || products.length === 0) &&
          (filteredSubcategories.length === 0) && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 0",
                color: "#667085",
              }}
            >
              Nu există produse sau subcategorii în această secțiune.
            </div>
          )}
      </div>
    </section>
  );
}