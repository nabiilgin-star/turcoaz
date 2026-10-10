import { pages as seoPages } from "@/app/seo.config";
import { notFound } from "next/navigation";
import { getNavbarData, resolvePath, getAllSlugsForStaticGeneration } from "@/app/lib/get-nav-data";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import TrackView from "@/app/components/TrackView";
import CategoryView from "./CategoryView";
import SubcategoryView from "./SubcategoryView";
import ProductView from "./ProductView";
import MobileMenuToggle from "./MobileMenuToggle";
import CornierView from './CornierView';
import TeavaRectangularaView from './TeavaRectangularaView'; 
import TeavaRotundaView from './TeavaRotundaView'; 
import TeavaPatrataView from './TeavaPatrataView';
import ProfilUView from './ProfilUView';
import ProfilTView from './ProfilTView';
import PlatbandaView from './PlatbandaView';

// Local veri dosyası
import { categories as localCategories } from "@/app/data/categories"; 

// ----------------------------------------------------------------------
// HELPER: CLIENT COMPONENT'LERE FONKSİYON/ICON AKTARIMINI ENGELLEYEN SÜZGEÇ
// ----------------------------------------------------------------------
function sanitizeData(data) {
  if (!data) return data;
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }
  if (typeof data === 'object') {
    const copy = { ...data };
    delete copy.icon; // Lucide icon bileşenini temizle
    if (copy.subcategories) {
      copy.subcategories = copy.subcategories.map(sanitizeData);
    }
    if (copy.products) {
      copy.products = copy.products.map(sanitizeData);
    }
    if (copy.category) {
      copy.category = sanitizeData(copy.category);
    }
    if (copy.subcategory) {
      copy.subcategory = sanitizeData(copy.subcategory);
    }
    return copy;
  }
  return data;
}

// ----------------------------------------------------------------------
// 1. DİNAMİK SEO METADATA OLUŞTURUCU (GOOGLE SEARCH CONSOLE ODAKLI)
// ----------------------------------------------------------------------
export async function generateMetadata({ params }) {
  const { slug: pathSegments } = await params;
  const lastSlug =
    pathSegments && pathSegments.length > 0
      ? pathSegments[pathSegments.length - 1]?.toLowerCase().trim()
      : "";

  const baseUrl = "https://turcoaz.com";
  const canonicalUrl =
    pathSegments && pathSegments.length > 0
      ? `${baseUrl}/categorii/${pathSegments.join("/")}`
      : `${baseUrl}/categorii`;

  // 1. Ana /categorii sayfası
  if (!pathSegments || pathSegments.length === 0) {
    return {
      title: "Categorii Produse | Turcoaz Aluminiu",
      description:
        "Profile aluminiu, glafuri exterioare, balustrade din sticlă, panouri compozite și profile PVC. Livrare rapidă în toată România.",
      alternates: { canonical: canonicalUrl },
      openGraph: {
        url: canonicalUrl,
        siteName: "Turcoaz Aluminiu",
        locale: "ro_RO",
        type: "website",
      },
      robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    };
  }

  // 2. seo.config.js'te bu yol için yazılmış metin var mı (öncelikli kaynak)
  const seoPath = `/categorii/${pathSegments.join("/")}`;
  const seoEntry = Object.values(seoPages).find((p) => p?.path === seoPath);

  // 3. Veritabanı (sayfa bileşeniyle aynı kaynak), sonra yerel veri
  let currentItem = null;

  try {
    const apiResult = await resolvePath(pathSegments);
    if (apiResult?.data) currentItem = apiResult.data;
  } catch (e) {
    currentItem = null;
  }

  if (!currentItem) {
    const findItemBySlug = (items, targetSlug) => {
      for (const item of items || []) {
        if (item.slug?.toLowerCase().trim() === targetSlug) return item;
        const found =
          findItemBySlug(item.subcategories, targetSlug) ||
          findItemBySlug(item.products, targetSlug);
        if (found) return found;
      }
      return null;
    };
    currentItem = findItemBySlug(localCategories, lastSlug);
  }

  // 4. Ne seo.config.js'te ne veride bulunduysa yedek
  if (!currentItem && !seoEntry) {
    return {
      title: "Produs | Turcoaz Aluminiu",
      description: "Sisteme din aluminiu și PVC premium în România.",
      alternates: { canonical: canonicalUrl },
      robots: { index: false, follow: true },
    };
  }

  // 5. Metinleri birleştir: seo.config.js > ürünün seo bloğu > otomatik
  const item = currentItem || {};
  const name = item.title || item.name || "";
  const plainDesc = (item.description || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);

  const title =
    seoEntry?.title || item.seo?.title || `${name} | Turcoaz Aluminiu`;
  // Özellik listesi gibi başlayan veya çok kısa metinler SERP için uygun değil
  const specLike =
    plainDesc.length < 50 ||
    /^(Specifica[tțţ]ii|Caracteristici)/i.test(plainDesc) ||
    /\s\|\s/.test(plainDesc);

  const autoDesc = name
    ? `${name} – disponibil din stoc la Turcoaz Aluminiu. Cere ofertă, livrare rapidă în toată România.`.slice(0, 155)
    : "";

  const description =
    seoEntry?.description ||
    item.seo?.description ||
    (!specLike && plainDesc) ||
    autoDesc ||
    "Descoperiți detalii și specificații tehnice la Turcoaz Aluminiu. Livrare rapidă în România.";
    
  const indexable = seoEntry?.indexable ?? item.seo?.indexable !== false;
  const image = item.image || item.detailImage;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Turcoaz Aluminiu",
      locale: "ro_RO",
      type: "website",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    robots: {
      index: indexable,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
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
  
  const lastSlug = pathSegments && pathSegments.length > 0 ? pathSegments[pathSegments.length - 1]?.toLowerCase().trim() : "";

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
              title: targetLocalCategory.title || targetLocalCategory.name,
              category: targetLocalCategory,
              subcategory: null
            }
          };
        } else if (targetLocalCategory.detailImage || targetLocalCategory.description) {
          result = {
            type: "product",
            data: {
              ...targetLocalCategory,
              title: targetLocalCategory.title || targetLocalCategory.name,
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
              title: targetProd.title || targetProd.name,
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
                  title: targetSub.title || targetSub.name,
                  category: targetLocalCategory,
                  subcategory: targetSub
                }
              };
            } else {
              const mappedProducts = (targetSub.products || []).map((prod, index) => ({
                ...prod,
                id: prod.id || `local-prod-${index}`,
                title: prod.title || prod.name,
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
                title: targetProd.title || targetProd.name,
                category: targetLocalCategory,
                subcategory: targetSub
              }
            };
          }
        }
      }
    }
  }

  const allowedSlugs = ['cornier', 'teava-rectangulara', 'teava-rotunda', 'teava-patrata', 'profil-u', 'profil-t','platbanda'];

  if (!result && !allowedSlugs.includes(lastSlug)) {
    notFound();
  }

  const currentSlug = lastSlug || "cornier";

  const defaultProducts = {
    "cornier": {
      id: "cornier",
      title: "Cornier Aluminiu",
      name: "Cornier Aluminiu",
      slug: "cornier",
      category: { title: "Profile Standard", slug: "profile-standard-aluminiu" }
    },
    "teava-rectangulara": {
      id: "teava-rectangulara",
      title: "Țeavă Rectangulară Aluminiu",
      name: "Țeavă Rectangulară Aluminiu",
      slug: "teava-rectangulara",
      category: { title: "Profile Standard", slug: "profile-standard-aluminiu" }
    },
    "teava-rotunda": {
      id: "teava-rotunda",
      title: "Țeavă Rotundă Aluminiu",
      name: "Țeavă Rotundă Aluminiu",
      slug: "teava-rotunda",
      category: { title: "Profile Standard", slug: "profile-standard-aluminiu" }
    },
    "teava-patrata": {
      id: "teava-patrata",
      title: "Țeavă Pătrată Aluminiu",
      name: "Țeavă Pătrată Aluminiu",
      slug: "teava-patrata",
      category: { title: "Profile Standard", slug: "profile-standard-aluminiu" }
    },
    "profil-u": {
      id: "profil-u",
      title: "Profil U Aluminiu",
      name: "Profil U Aluminiu",
      slug: "profil-u",
      category: { title: "Profile Standard", slug: "profile-standard-aluminiu" }
    },
    "profil-t": {
      id: "profil-t",
      title: "Profil T Aluminiu",
      name: "Profil T Aluminiu",
      slug: "profil-t",
      category: { title: "Profile Standard", slug: "profile-standard-aluminiu" }
    },
    "platbanda": {
      id: "platbanda",
      title: "Platbandă Aluminiu",
      name: "Platbandă Aluminiu",
      slug: "platbanda",
      category: { title: "Profile Standard", slug: "profile-standard-aluminiu" }
    }
  };

  const type = result?.type || "product";
  const rawData = result?.data || defaultProducts[currentSlug] || defaultProducts["cornier"];

  // 🛠️ KRİTİK DÜZELTME: Veriyi Client Component'lere aktarmadan önce temizliyoruz
  const cleanData = sanitizeData(rawData);

  const currentPath = `/categorii/${pathSegments.join('/')}`;
  const breadcrumbItems = [{ label: "Categorii", href: "/categorii" }];

  if (type === "category") {
    breadcrumbItems.push({ 
      label: cleanData.title || cleanData.name, 
      href: currentPath 
    });
  } else if (type === "subcategory" && cleanData.category) {
    breadcrumbItems.push({
      label: cleanData.category.title || cleanData.category.name,
      href: `/categorii/${cleanData.category.slug}`,
    });
    breadcrumbItems.push({ 
      label: cleanData.subcategory?.title || cleanData.subcategory?.name || 'Subcategorie', 
      href: currentPath 
    });
  } else if (type === "product") {
    if (cleanData.category) {
      breadcrumbItems.push({
        label: cleanData.category.title || cleanData.category.name,
        href: `/categorii/${cleanData.category.slug}`,
      });
    }
    if (cleanData.subcategory && cleanData.subcategory.slug !== cleanData.slug && cleanData.category) {
      breadcrumbItems.push({
        label: cleanData.subcategory.title || cleanData.subcategory.name,
        href: `/categorii/${cleanData.category.slug}/${cleanData.subcategory.slug}`,
      });
    }
    breadcrumbItems.push({ 
      label: cleanData.title || cleanData.name, 
      href: currentPath 
    });
  }

  const activeCategorySlug = matchedCategory ? matchedCategory.slug : (type === "category" ? cleanData.slug : cleanData?.category?.slug);

  const productImages = cleanData.gallery && cleanData.gallery.length > 0 
    ? cleanData.gallery 
    : [cleanData.image || cleanData.detailImage].filter(Boolean);

      // Marka: kategoriye göre (sabit "AKPA" yerine). Emin değilseniz marka yazılmaz.
  const productBrand = (() => {
    const cat = activeCategorySlug || "";
    const slugStr = (cleanData.slug || "").toLowerCase();
    if (["sisteme-aluminiu-akpa", "sisteme-balustrada", "glafuri-din-aluminiu"].includes(cat)) return "AKPA";
    if (cat === "profile-pvc") return slugStr.includes("blanco") ? "BLANCOPLAST" : "EXENplast";
    return null;
  })();

  const productDescription = (cleanData.description || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const productSchema = type === "product" ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": cleanData.title || cleanData.name,
    "url": `https://turcoaz.com/categorii/${pathSegments.join("/")}`,
    "image": productImages.length > 0 ? productImages : ["https://res.cloudinary.com/oivvupgw/image/upload/v1784664028/pervazaluminiu_dtoqug.png"],
    "description": productDescription || "Sistem premium din aluminiu și sticlă de la Turcoaz Aluminiu",
    "sku": `TURCOAZ-${cleanData.slug ? cleanData.slug.toUpperCase() : "PROD"}`,
    ...(productBrand ? { "brand": { "@type": "Brand", "name": productBrand } } : {})
  } : null;
  
  const faqSchema = (cleanData?.faqs && cleanData.faqs.length > 0) ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": cleanData.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>?/gm, '')
      }
    }))
  } : null;

  const productSchemaJson = productSchema ? JSON.stringify(productSchema) : "";
  const faqSchemaJson = faqSchema ? JSON.stringify(faqSchema) : "";

  return (
    <main className="page" style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", overflowX: "hidden", width: "100%", boxSizing: "border-box" }}>
      {productSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: productSchemaJson }}
        />
      ) : null}

      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
        />
      ) : null}

      <TrackView
        table={
          type === "product"
            ? "products"
            : type === "category"
              ? "categories"
              : "subcategories"
        }
        id={cleanData.id || cleanData.subcategory?.id || 999}
      />
      <Navbar
        categories={navData.categories}
        products={navData.products}
        announcement={navData.announcement}
      />

      <div style={{ maxWidth: "1320px", margin: "20px auto 0", padding: "0 24px", boxSizing: "border-box" }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

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
        
        <div style={{ gridColumn: "1 / -1", width: "100%" }}>
          <MobileMenuToggle />
        </div>

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
                      justifySpaceBetween: "space-between",
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
                    <span>{cat.title || cat.name}</span>
                    {cat.subcategories && (
                      <span style={{ fontSize: "12px", opacity: 0.8 }}>({cat.subcategories.length})</span>
                    )}
                  </a>

                  {isActive && cat.subcategories && cat.subcategories.length > 0 && (
                    <ul style={{ listStyle: "none", paddingLeft: "12px", marginTop: "6px", marginBottom: "6px", display: "flex", flexDirection: "column", gap: "4px", borderLeft: "2px solid #E2E8F0" }}>
                      {cat.subcategories.map((sub) => {
                        const isSubActive = cleanData?.subcategory?.slug?.toLowerCase() === sub.slug?.toLowerCase();
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
                              • {sub.title || sub.name}
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
          
          {lastSlug === "cornier" ? (
            <CornierView />
          ) : lastSlug === "teava-rectangulara" ? (
            <TeavaRectangularaView />
          ) : lastSlug === "teava-rotunda" ? (
            <TeavaRotundaView /> 
          ) : lastSlug === "teava-patrata" ? (
            <TeavaPatrataView />
          ) : lastSlug === "profil-u" ? (
            <ProfilUView />
          ) : lastSlug === "profil-t" ? (
            <ProfilTView />
          ) : lastSlug === "platbanda" ? (
            <PlatbandaView />
          ) : lastSlug === "gard" ? (
            <ProductView product={cleanData.subcategory || cleanData} />
          ) : (
            <>
              {type === "category" && <CategoryView category={cleanData} />}
              {type === "subcategory" && (
                <SubcategoryView
                  category={cleanData.category}
                  subcategory={cleanData.subcategory}
                  products={cleanData.products}
                  subcategories={cleanData.subcategories}
                />
              )}
              {type === "product" && (
                <ProductView 
                  product={cleanData} 
                  subcategoryName={cleanData.subcategory?.title || cleanData.subcategory?.name} 
                />
              )}
            </>
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