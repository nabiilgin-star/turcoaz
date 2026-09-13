import { notFound } from "next/navigation";
import { getNavbarData, resolvePath } from "@/app/lib/get-nav-data";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import TrackView from "@/app/components/TrackView";
import CategoryView from "./CategoryView";
import SubcategoryView from "./SubcategoryView";
import ProductView from "./ProductView";

// Local veri dosyası
import { categories as localCategories } from "@/app/data/categories"; 
import { getAllSlugsForStaticGeneration } from "@/app/lib/get-nav-data";

// Yeni eklenen statik olmayan sayfaların (örn. yeni kompozit panel) 404 vermesini engeller
export const dynamicParams = true;

export async function generateStaticParams() {
  return await getAllSlugsForStaticGeneration();
}

export default async function CatchAllCategoryPage({ params }) {
  const { slug: pathSegments } = await params;

  // Backend/API verilerini ve resolve işlemini başlatıyoruz
  const [navData, apiResult] = await Promise.all([
    getNavbarData(),
    resolvePath(pathSegments).catch(() => null),
  ]);

  let result = apiResult;

  // LOCAL VERİDE ARAMA VE EŞLEŞTİRME MEKANİZMASI
  if (!result && pathSegments && pathSegments.length > 0) {
    const firstSlug = pathSegments[0];
    const targetLocalCategory = localCategories.find(c => c.slug === firstSlug);

    if (targetLocalCategory) {
      if (pathSegments.length === 1) {
        // Eğer ana kategorinin detailImage veya description'ı varsa doğrudan detay/tek sayfa olarak aç
        if (targetLocalCategory.detailImage || (targetLocalCategory.description && (!targetLocalCategory.subcategories || targetLocalCategory.subcategories.length === 0))) {
          result = {
            type: "product",
            data: {
              ...targetLocalCategory,
              title: targetLocalCategory.name,
              category: targetLocalCategory,
              subcategory: null
            }
          };
        } else {
          // 1. Normal Ana Kategori Görünümü
          result = {
            type: "category",
            data: targetLocalCategory
          };
        }
      } 
      else if (pathSegments.length === 2) {
        // 2. İki kademeli derinlik (Alt Kategori VEYA Doğrudan Ürün)
        const subSlug = pathSegments[1];
        const targetSub = targetLocalCategory.subcategories?.find(s => s.slug === subSlug);

        if (targetSub) {
          const isDirectProduct = !targetSub.products && (targetSub.detailImage || targetSub.description);

          if (isDirectProduct) {
            result = {
              type: "product",
              data: {
                ...targetSub,
                title: targetSub.name,
                category: targetLocalCategory,
                subcategory: targetSub
              }
            };
          } else {
            const mappedProducts = (targetSub.products || []).map((prod, index) => ({
              ...prod,
              id: prod.id || `local-prod-${index}`,
              title: prod.name || prod.title,
            }));

            result = {
              type: "subcategory",
              data: {
                category: targetLocalCategory,
                subcategory: targetSub,
                products: mappedProducts,
                subcategories: [] 
              }
            };
          }
        }
      }
      else {
        // 3. Üç veya daha fazla kademeli derinlik (Ürün Görünümü)
        const prodSlug = pathSegments[pathSegments.length - 1];
        const subSlug = pathSegments[pathSegments.length - 2];

        const targetSub = targetLocalCategory.subcategories?.find(s => s.slug === subSlug);

        if (targetSub) {
          const targetProd = targetSub.products?.find(p => p.slug === prodSlug || p.id === prodSlug);

          if (targetProd) {
            result = {
              type: "product",
              data: {
                ...targetProd,
                title: targetProd.name || targetProd.title,
                category: targetLocalCategory,
                subcategory: targetSub
              }
            };
          }
        }
      }
    }
  }

  // Eğer hiçbir eşleşme bulunamadıysa 404
  if (!result) {
    notFound();
  }

  const { type, data } = result;
  const breadcrumbItems = [{ label: "Categorii", href: "/categorii" }];

  if (type === "category") {
    breadcrumbItems.push({ label: data.name || data.title, href: `/categorii/${data.slug}` });
  } else if (type === "subcategory") {
    breadcrumbItems.push({
      label: data.category.name || data.category.title,
      href: `/categorii/${data.category.slug}`,
    });
    breadcrumbItems.push({ label: data.subcategory.name, href: "#" });
  } else if (type === "product") {
    breadcrumbItems.push({
      label: data.category.name || data.category.title,
      href: `/categorii/${data.category.slug}`,
    });
    if (data.subcategory && data.subcategory.slug !== data.slug) {
      breadcrumbItems.push({
        label: data.subcategory.name,
        href: `/categorii/${data.category.slug}/${data.subcategory.slug}`,
      });
    }
    breadcrumbItems.push({ label: data.title || data.name, href: "#" });
  }

return (
    <main className="page">
      <TrackView
        table={
          type === "product"
            ? "products"
            : type === "category"
              ? "categories"
              : "subcategories"
        }
        id={data.id || data.subcategory?.id || 999}
      />
      <Navbar
        categories={navData.categories}
        products={navData.products}
        announcement={navData.announcement}
      />

      <div className="container-max" style={{ paddingTop: "2rem" }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Saf Flexbox ile Yan Menü ve İçerik Düzeni (Bozulma İhtimali Sıfır) */}
      <div className="container-max" style={{ paddingBottom: "4rem", paddingTop: "1.5rem" }}>
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          
          {/* SOL TARAF: Sabit Yan Menü (%25 Genişlik) */}
          <aside style={{ flex: "1 1 240px", minWidth: "240px", background: "#ffffff", padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid #f3f4f6", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#111827", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
              CATEGORII PRODUSE
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {(navData.categories || localCategories).map((cat) => {
                const isActive = data?.slug === cat.slug || data?.category?.slug === cat.slug;
                return (
                  <li key={cat.slug || cat.id}>
                    <a
                      href={`/categorii/${cat.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "between",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.5rem",
                        fontSize: "0.9rem",
                        textDecoration: "none",
                        backgroundColor: isActive ? "#eff6ff" : "transparent",
                        color: isActive ? "#1d4ed8" : "#4b5563",
                        fontWeight: isActive ? "600" : "400",
                        transition: "all 0.2s"
                      }}
                    >
                      <span>{cat.name || cat.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* SAĞ TARAF: İçerik Alanı (%75 Genişlik) */}
          <div style={{ flex: "1 1 650px", minWidth: "0" }}>
            {type === "category" && <CategoryView category={data} />}
            {type === "subcategory" && (
              <SubcategoryView
                category={data.category}
                subcategory={data.subcategory}
                products={data.products}
                subcategories={data.subcategories}
              />
            )}
            {type === "product" && (
              <ProductView 
                product={data} 
                subcategoryName={data.subcategory?.name} 
              />
            )}
          </div>

        </div>
      </div>

      <Footer
        categories={navData.categories}
        topProducts={navData.topProducts}
      />
    </main>
  );
}