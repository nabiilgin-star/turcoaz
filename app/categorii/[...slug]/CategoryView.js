import Image from "next/image";
import Link from "next/link";
import styles from "./subcategory.module.css";

export default function CategoryView({ category }) {
  return (
    <section className={styles["subcategory-page-section"]}>
      <div className="container-max">
        <div
          className={styles["subcategory-header"]}
          style={{ marginTop: "1rem" }}
        >
          <h1 className={styles["subcategory-title"]}>{category.name} </h1>
        </div>

        <div className={styles["subcategory-grid"]}>
           {category.subcategories.map((sub, index) => (
            <Link
              key={index}
              href={`/categorii/${category.slug}/${sub.slug}`}
              className={styles["subcategory-card"]}
            >
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
                />
              </div>
              <span className={styles["subcategory-name"]}>{sub.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
