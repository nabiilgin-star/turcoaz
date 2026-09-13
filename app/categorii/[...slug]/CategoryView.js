import Image from "next/image";
import Link from "next/link";
import styles from "./subcategory.module.css";

export default function CategoryView({ category }) {
  return (
    <section className={styles["subcategory-page-section"]}>
      <div className="container-max">
        <div
          className={styles["subcategory-header"]}
          style={{ marginTop: "1rem", marginBottom: "2rem" }}
        >
          <h1 className={styles["subcategory-title"]}>{category.name}</h1>
        </div>

        <div className={styles["subcategory-grid"]}>
           {category.subcategories?.map((sub, index) => (
            <Link
              key={index}
              href={`/categorii/${category.slug}/${sub.slug}`}
              className={styles["subcategory-card"]}
              style={{
                background: "#ffffff",
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: "1px solid #f3f4f6",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer"
              }}
            >
              {/* Resme tıklandığında çalışır */}
              <div className={styles["subcategory-image-wrapper"]}>
                <Image
                  src={
                    sub.image ||
                    "https://images.unsplash.com/photo-1631626244439-d349340623bd?auto=format&fit=crop&w=500&q=60"
                  }
                  alt={sub.name}
                  width={500}
                  height={500}
                  className={styles["subcategory-image"]}
                  style={{ width: "100%", height: "220px", objectFit: "cover" }}
                />
              </div>
              
              {/* Başlık ve Buton alanına tıklandığında çalışır */}
              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                <span 
                  className={styles["subcategory-name"]}
                  style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}
                >
                  {sub.name}
                </span>

                <span 
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0ea5e9",
                    color: "#ffffff",
                    padding: "0.6rem 1rem",
                    borderRadius: "0.5rem",
                    fontWeight: "500",
                    fontSize: "0.9rem",
                    textAlign: "center"
                  }}
                >
                  Vezi Detalii →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}