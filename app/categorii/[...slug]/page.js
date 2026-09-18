import { notFound } from "next/navigation";
import { getNavbarData, resolvePath } from "@/app/lib/get-nav-data";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import TrackView from "@/app/components/TrackView";
import CategoryView from "./CategoryView";
import SubcategoryView from "./SubcategoryView";
import ProductView from "./ProductView";
import MobileMenuToggle from "./MobileMenuToggle";

// Local veri dosyası
import { categories as localCategories } from "@/app/data/categories"; 
import { getAllSlugsForStaticGeneration } from "@/app/lib/get-nav-data";

// ----------------------------------------------------------------------
// 1. DİNAMİK SEO METADATA OLUSTURUCU (GOOGLE SEARCH CONSOLE ODAKLI)
// ----------------------------------------------------------------------
export async function generateMetadata({ params }) {
  const { slug: pathSegments } = await params;

  if (!pathSegments || pathSegments.length === 0) {
    return {
      title: "Sisteme Tâmplărie Aluminiu, Glafuri & Balustrade | Turcoaz",
      description: "Distribuitor de profile și sisteme din aluminiu, glafuri exterioare, balustrade din sticlă și panouri compozite. Livrare rapidă în toată România.",
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    };
  }

  const [apiResult] = await Promise.all([
    resolvePath(pathSegments).catch(() => null),
  ]);

  let result = apiResult;

  // Local veri eşleştirme (Fallback)
  if (!result && pathSegments && pathSegments.length > 0) {
    const firstSlug = pathSegments[0]?.toLowerCase().trim();
    const targetLocalCategory = localCategories.find(c => c.slug?.toLowerCase().trim() === firstSlug);

    if (targetLocalCategory) {
      if (pathSegments.length === 1) {
        if (targetLocalCategory.products && targetLocalCategory.products.length > 0) {
          result = { type: "product", data: { ...targetLocalCategory, title: targetLocalCategory.name } };
        } else if (targetLocalCategory.detailImage || targetLocalCategory.description) {
          result = { type: "product", data: { ...targetLocalCategory, title: targetLocalCategory.name } };
        } else {
          result = { type: "category", data: targetLocalCategory };
        }
      } else if (pathSegments.length === 2) {
        const secondSlug = pathSegments[1]?.toLowerCase().trim();
        const targetProd = targetLocalCategory.products?.find(p => p.slug?.toLowerCase().trim() === secondSlug || p.id?.toLowerCase().trim() === secondSlug);

        if (targetProd) {
          result = { type: "product", data: { ...targetProd, title: targetProd.name || targetProd.title } };
        } else {
          const targetSub = targetLocalCategory.subcategories?.find(s => s.slug?.toLowerCase().trim() === secondSlug);
          if (targetSub) {
            const isDirectProduct = !targetSub.products && (targetSub.detailImage || targetSub.description);
            if (isDirectProduct) {
              result = { type: "product", data: { ...targetSub, title: targetSub.name } };
            } else {
              result = { type: "subcategory", data: { category: targetLocalCategory, subcategory: targetSub } };
            }
          }
        }
      } else {
        const prodSlug = pathSegments[pathSegments.length - 1]?.toLowerCase().trim();
        const subSlug = pathSegments[pathSegments.length - 2]?.toLowerCase().trim();
        const targetSub = targetLocalCategory.subcategories?.find(s => s.slug?.toLowerCase().trim() === subSlug);

        if (targetSub) {
          const targetProd = targetSub.products?.find(p => p.slug?.toLowerCase().trim() === prodSlug || p.id?.toLowerCase().trim() === prodSlug);
          if (targetProd) {
            result = { type: "product", data: { ...targetProd, title: targetProd.name || targetProd.title } };
          }
        }
      }
    }
  }

  if (!result) {
    return {
      title: "Pagina nu a fost găsită | Turcoaz Aluminiu",
      robots: { index: false, follow: true },
    };
  }

  const { type, data } = result;
  let title = "Turcoaz Aluminiu";
  let description = "Distribuitor de profile și sisteme din aluminiu, glafuri exterioare și accesorii de calitate superioară.";

  if (type === "category") {
    title = `${data.name || data.title} | Turcoaz Aluminiu`;
    description = data.description?.replace(/<[^>]*>?/gm, '').slice(0, 155) || `Sisteme și profile din aluminiu pentru ${data.name || data.title}. Calitate superioară și livrare din stoc.`;
  } else if (type === "subcategory") {
    title = `${data.subcategory.name} - ${data.category.name || data.category.title} | Turcoaz`;
    description = data.subcategory.description?.replace(/<[^>]*>?/gm, '').slice(0, 155) || `Profile și accesorii din aluminiu pentru ${data.subcategory.name}. Comandă online la preț de distribuitor.`;
  } else if (type === "product") {
    title = `${data.title || data.name} | Turcoaz Aluminiu`;
    description = data.description?.replace(/<[^>]*>?/gm, '').slice(0, 155) || `${data.title || data.name} - Sistem din aluminiu și sticlă de înaltă rezistență cu certificat de calitate.`;
  }

  const canonicalUrl = `https://turcoaz.com/categorii/${pathSegments.join('/')}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Turcoaz Aluminiu",
      locale: "ro_RO",
      type: "website",
    },
  };
}

// ----------------------------------------------------------------------
// 2. STATİK SAYFA VE DİNAMİK PARAMETRE YAPILANDIRMASI
// ----------------------------------------------------------------------
export const dynamicParams = true;

export async function generateStaticParams() {
  return await getAllSlugsForStaticGeneration();
}

// ----------------------------------------------------------------------
// 3. ANA SAYFA COMPONENT'I
// ----------------------------------------------------------------------
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

  // LOCAL VERİDE ARAMA VE EŞLEŞTİRME MEKANİZMASI (FALLBACK)
  if (!result && pathSegments && pathSegments.length > 0) {
    const firstSlug = pathSegments[0]?.toLowerCase().trim();
    const targetLocalCategory = localCategories.find(c => c.slug?.toLowerCase().trim() === firstSlug);

    if (targetLocalCategory) {
      if (pathSegments.length === 1) {
        if (targetLocalCategory.products && targetLocalCategory.products.length > 0) {
          result = {
            type: "product",
            data: {
              ...targetLocalCategory,
              title: targetLocalCategory.name,
              category: targetLocalCategory,
              subcategory: null
            }
          };
        } else if (targetLocalCategory.detailImage || targetLocalCategory.description) {
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
          result = {
            type: "category",
            data: targetLocalCategory
          };
        }
      } 
      else if (pathSegments.length === 2) {
        const secondSlug = pathSegments[1]?.toLowerCase().trim();
        const targetProd = targetLocalCategory.products?.find(p => p.slug?.toLowerCase().trim() === secondSlug || p.id?.toLowerCase().trim() === secondSlug);

        if (targetProd) {
          result = {
            type: "product",
            data: {
              ...targetProd,
              title: targetProd.name || targetProd.title,
              category: targetLocalCategory,
              subcategory: null
            }
          };
        } else {
          const targetSub = targetLocalCategory.subcategories?.find(s => s.slug?.toLowerCase().trim() === secondSlug);

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
                  subcategories: targetSub.subcategories || [] 
                }
              };
            }
          }
        }
      }
      else {
        const prodSlug = pathSegments[pathSegments.length - 1]?.toLowerCase().trim();
        const subSlug = pathSegments[pathSegments.length - 2]?.toLowerCase().trim();
        const targetSub = targetLocalCategory.subcategories?.find(s => s.slug?.toLowerCase().trim() === subSlug);

        if (targetSub) {
          const targetProd = targetSub.products?.find(p => p.slug?.toLowerCase().trim() === prodSlug || p.id?.toLowerCase().trim() === prodSlug);
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

  // 1. ÜRÜN SAYFALARI İÇİN DİNAMİK SEO SCHEMA (JSON-LD)
  const productSchema = type === "product" ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.title || data.name,
    "description": data.description?.replace(/<[^>]*>?/gm, '') || "Sistem premium din aluminiu și sticlă de la Turcoaz Aluminiu",
    "brand": {
      "@type": "Brand",
      "name": "Turcoaz Aluminiu"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "RON",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "S.C. Turcoaz Aluminiu S.R.L."
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Capacitate producție și import",
        "value": "150+ tone/lună"
      },
      {
        "@type": "PropertyValue",
        "name": "Certificare",
        "value": "Agrement Tehnic"
      }
    ]
  } : null;

  // 2. KATEGORİ SAYFALARI İÇİN DİNAMİK FAQ SCHEMA (GOOGLE RICH RESULTS DOKUNUŞU)
  const faqSchema = (data?.faqs && data.faqs.length > 0) ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>?/gm, '')
      }
    }))
  } : null;

  return (
    <main className="page" style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", overflowX: "hidden", width: "100%", boxSizing: "border-box" }}>
      {/* Product JSON-LD Şeması */}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}

      {/* FAQ JSON-LD Şeması */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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

      <div style={{ maxWidth: "1320px", margin: "20px auto 0", padding: "0 24px", boxSizing: "border-box" }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* MOBİL UYUMLU ÖZEL CSS STİLLERİ */}
      <style>{`
        .catalog-container {
          max-width: 1320px;
          margin: 30px auto 60px;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          align-items: start;
          box-sizing: border-box;
          width: 100%;
        }
        .mobile-sidebar-toggle {
          display: none;
          width: 100%;
          background: #00A8CC;
          color: #ffffff;
          border: none;
          padding: 14px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          margin-bottom: 20px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 900px) {
          .catalog-container {
            grid-template-columns: 1fr !important;
            padding: 0 16px !important;
          }
          .mobile-sidebar-toggle {
            display: flex !important;
          }
          .sidebar-aside {
            display: none;
            margin-bottom: 24px;
          }
          .sidebar-aside.show-mobile {
            display: block !important;
          }
        }
      `}</style>

      <div className="catalog-container">
        
        {/* MOBİL İÇİN AÇ/KAPA BUTONU */}
        <div style={{ gridColumn: "1 / -1", width: "100%" }}>
          <MobileMenuToggle />
        </div>

        {/* SOL FİLTRE PANELİ (Sidebar) */}
        <aside id="categorySidebar" className="sidebar-aside" style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          padding: "24px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          position: "sticky",
          top: "100px",
          boxSizing: "border-box",
          width: "100%"
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
        <div style={{ minWidth: 0, width: "100%", boxSizing: "border-box", overflowX: "hidden" }}>
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