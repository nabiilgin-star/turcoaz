import { notFound } from "next/navigation";
import { getNavbarData, resolvePath } from "@/app/lib/get-nav-data";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import TrackView from "@/app/components/TrackView";
import CategoryView from "./CategoryView";
import SubcategoryView from "./SubcategoryView";
import ProductView from "./ProductView";

import { categories as localCategories } from "@/app/data/categories"; 
import { getAllSlugsForStaticGeneration } from "@/app/lib/get-nav-data";

export const dynamicParams = true;

export async function generateStaticParams() {
  return await getAllSlugsForStaticGeneration();
}

export default async function CatchAllCategoryPage({ params }) {
  const { slug: pathSegments } = await params;

  const [navData, apiResult] = await Promise.all([
    getNavbarData(),
    resolvePath(pathSegments).catch(() => null),
  ]);

  let result = apiResult;
  let matchedCategory = null;

  if (pathSegments && pathSegments.length > 0) {
    const firstSlug = pathSegments[0]?.toLowerCase().trim();
    matchedCategory = localCategories.find(c => c.slug?.toLowerCase().trim() === firstSlug);
  }

  // Eğer standart resolvePath boş döndüyse ama yerel kategorilerde eşleşme varsa, 
  // sistemi çöktürmeden yerel veriden güvenli bir şekilde çözümlüyoruz (Fallback Mechanism).
  if (!result && matchedCategory) {
    const targetCat = matchedCategory;

    if (pathSegments.length === 1) {
      result = {
        type: "category",
        data: targetCat
      };
    } 
    else if (pathSegments.length === 2) {
      const secondSlug = pathSegments[1]?.toLowerCase().trim();

      // 1. Önce bu ana kategorinin doğrudan kendi ürünleri arasında arayalım (Örn: ACP Bond altındaki Primebond vb.)
      const targetProd = targetCat.products?.find(p => p.slug?.toLowerCase().trim() === secondSlug || p.id?.toLowerCase().trim() === secondSlug);

      if (targetProd) {
        result = {
          type: "product",
          data: {
            ...targetProd,
            title: targetProd.name || targetProd.title,
            category: targetCat,
            subcategory: null
          }
        };
      } else {
        // 2. Ürün bulunamadıysa alt kategori olarak arayalım (Örn: Glafuri din Aluminiu)
        let targetSub = targetCat.subcategories?.find(s => s.slug?.toLowerCase().trim() === secondSlug);

        // Derin arama: Alt kategorilerin içindeki ürünler veya alt-alt kırılımlar
        if (!targetSub && targetCat.subcategories) {
          for (const sub of targetCat.subcategories) {
            if (sub.products) {
              const foundInSubProd = sub.products.find(p => p.slug?.toLowerCase().trim() === secondSlug || p.id?.toLowerCase().trim() === secondSlug);
              if (foundInSubProd) {
                targetSub = sub;
                break;
              }
            }
            if (sub.subcategories) {
              const foundInSubSub = sub.subcategories.find(ss => ss.slug?.toLowerCase().trim() === secondSlug);
              if (foundInSubSub) {
                targetSub = foundInSubSub;
                break;
              }
            }
          }
        }

        if (targetSub) {
          result = {
            type: "subcategory",
            data: {
              category: targetCat,
              subcategory: targetSub,
              products: targetSub.products || [],
              subcategories: targetSub.subcategories || []
            }
          };
        }
      }
    } 
    else if (pathSegments.length >= 3) {
      const secondSlug = pathSegments[1]?.toLowerCase().trim();
      let targetSub = targetCat.subcategories?.find(s => s.slug?.toLowerCase().trim() === secondSlug);

      if (!targetSub && targetCat.subcategories) {
        for (const sub of targetCat.subcategories) {
          if (sub.subcategories) {
            const foundSubSub = sub.subcategories.find(ss => ss.slug?.toLowerCase().trim() === secondSlug);
            if (foundSubSub) {
              targetSub = foundSubSub;
              break;
            }
          }
        }
      }

      if (targetSub) {
        const thirdSlug = pathSegments[pathSegments.length - 1]?.toLowerCase().trim();
        const targetProd = targetSub.products?.find(p => p.slug?.toLowerCase().trim() === thirdSlug || p.id?.toLowerCase().trim() === thirdSlug) ||
                           targetSub.subcategories?.find(s => s.slug?.toLowerCase().trim() === thirdSlug);

        if (targetProd) {
          result = {
            type: "product",
            data: {
              ...targetProd,
              title: targetProd.name || targetProd.title,
              category: targetCat,
              subcategory: targetSub
            }
          };
        }
      }
    }
  }

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

  const activeCategorySlug = matchedCategory ? matchedCategory.slug : (type === "category" ? data.slug : data?.category?.slug);

  return (
    <main className="page" style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
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

      <div style={{ maxWidth: "1320px", margin: "20px auto 0", padding: "0 24px" }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div style={{
        maxWidth: "1320px",
        margin: "30px auto 60px",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "32px",
        alignItems: "start"
      }}>
        
        {/* SOL FİLTRE PANELİ */}
        <aside style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          padding: "24px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          position: "sticky",
          top: "100px"
        }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "800",
            color: "#0F172A",
            marginBottom: "20px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Categorii Produse
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
            {localCategories.map((cat) => {
              const currentSlug = activeCategorySlug?.toLowerCase().trim();
              const catSlug = cat.slug?.toLowerCase().trim();
              const isActive = currentSlug === catSlug;
              
              return (
                <li key={cat.slug || cat.id} style={{ marginBottom: "4px" }}>
                  <a
                    href={`/categorii/${cat.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      color: isActive ? "#0088A5" : "#64748B",
                      fontWeight: "600",
                      fontSize: "14px",
                      backgroundColor: isActive ? "#E6F7FA" : "transparent",
                      transition: "all 0.2s"
                    }}
                  >
                    <span>{cat.name || cat.title}</span>
                    {cat.subcategories && (
                      <span style={{ fontSize: "12px", opacity: 0.8 }}>({cat.subcategories.length})</span>
                    )}
                  </a>

                  {isActive && cat.subcategories && cat.subcategories.length > 0 && (
                    <ul style={{ listStyle: "none", paddingLeft: "12px", marginTop: "6px", marginBottom: "6px", display: "flex", flexDirection: "column", gap: "4px", borderLeft: "2px solid #E2E8F0" }}>
                      {cat.subcategories.map((sub) => {
                        const isSubActive = data?.subcategory?.slug?.toLowerCase() === sub.slug?.toLowerCase();
                        return (
                          <li key={sub.slug}>
                            <a
                              href={`/categorii/${cat.slug}/${sub.slug}`}
                              style={{
                                display: "block",
                                padding: "8px 10px",
                                borderRadius: "8px",
                                fontSize: "13px",
                                textDecoration: "none",
                                color: isSubActive ? "#0088A5" : "#475569",
                                fontWeight: isSubActive ? "700" : "500",
                                backgroundColor: isSubActive ? "#F1F5F9" : "transparent",
                                textTransform: "none"
                              }}
                            >
                              • {sub.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* SAĞ KATALOG ALANI */}
        <div style={{ minWidth: 0 }}>
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

      <Footer
        categories={navData.categories}
        topProducts={navData.topProducts}
      />
    </main>
  );
}