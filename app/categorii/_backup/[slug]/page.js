export default async function SubcategoryPage({ params }) {
  const { slug: rawSlug } = await params;

  // Ana sayfadan gelen slug eğer haritamızda varsa veritabanındaki eski karşılığına çeviriyoruz
  const dbSlug = SLUG_MAPPING[rawSlug] || rawSlug;

  // 📝 Sorunu görmek için bu logları ekle:
  console.log("=== KATEGORİ ARAMA BAŞLADI ===");
  console.log("Tarayıcıdan Gelen (rawSlug):", rawSlug);
  console.log("Veritabanında Aranan (dbSlug):", dbSlug);

  const [navData, category] = await Promise.all([
    getNavbarData(),
    getCategoryBySlug(dbSlug),
  ]);

  console.log("Supabase'den Dönen Kategori Nesnesi:", category);
  console.log("===============================");

  if (!category) {
    notFound();
  }
  // ... kodun geri kalanı
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./subcategory.module.css";
import { getNavbarData, getCategoryBySlug } from "@/app/lib/get-nav-data";
import TrackView from "../../components/TrackView";
import { getAllSlugsForStaticGeneration } from "@/app/lib/get-nav-data";

export const dynamic = 'force-dynamic';
// Ana sayfadaki yeni modern isimleri, veritabanındaki (Supabase) eski karşılıklarına bağlayan harita
const SLUG_MAPPING = {
  'sisteme-balustrada': 'balustrade-sticla',
  'componente-sisteme-sticla': 'componente-sticla',
  'acp-aluminiu-compozit-panel-bond': 'acp-bond',
  'profile-pvc': 'pvc-profile', // Veritabanındaki tam karşılığı neyse onunla değiştirebilirsin
  'sticla': 'sticla-speciala',  // Veritabanındaki tam karşılığı neyse onunla değiştirebilirsin
};

export async function generateStaticParams() {
  const { categorySlugs } = await getAllSlugsForStaticGeneration();
  
  // Eğer statik üretimde yeni slug'ların da algılanmasını istiyorsak haritayı dahil ediyoruz
  const mappedSlugs = categorySlugs.map(p => {
    // Ters eşleşme veya doğrudan slug gönderimi
    return { slug: p.slug };
  });
  
  return mappedSlugs;
}

export default async function SubcategoryPage({ params }) {
  const resolvedParams = await params;
  
  // Eğer [...slug] catch-all yapısındaysa resolvedParams.slug bir array gelir. 
  // İlk elemanı alarak string'e dönüştürüyoruz:
  const rawSlug = Array.isArray(resolvedParams.slug) 
    ? resolvedParams.slug[0] 
    : resolvedParams.slug;

  // Ana sayfadan gelen slug eğer haritamızda varsa veritabanındaki eski karşılığına çeviriyoruz
  const dbSlug = SLUG_MAPPING[rawSlug] || rawSlug;

  // ... kodun geri kalan kısımları aynen devam ediyor
  const productCount = "-"; 

  return (
    <main className="page">
      <TrackView table="categories" id={category.id} />
      <Navbar
        categories={navData.categories}
        products={navData.products}
        announcement={navData.announcement}
      />

      <section className={styles["subcategory-page-section"]}>
        <div className="container-max">
          <Breadcrumb
            items={[
              { label: "Categorii", href: "/categorii" },
              { label: category.name, href: `/categorii/${rawSlug}` }, // URL yapısının yeni haliyle kalması için rawSlug kullandık
            ]}
          />

          <div
            className={styles["subcategory-header"]}
            style={{ marginTop: "1rem" }}
          >
            <h1 className={styles["subcategory-title"]}>{category.name} </h1>
          </div>

          <div className={styles["subcategory-grid"]}>
            {category.subcategories && category.subcategories.map((sub, index) => (
              <Link
                key={index}
                // Alt kategori linklerinin de yeni üst slug yapısıyla (rawSlug) uyumlu çalışmasını sağlıyoruz
                href={`/categorii/${rawSlug}/${sub.slug}`}
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

      <Footer categories={navData.categories} />
    </main>
  );
}