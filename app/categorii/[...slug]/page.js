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
        // 1. Ana Kategori Görünümü
        result = {
          type: "category",
          data: targetLocalCategory
        };
      } 
      else if (pathSegments.length === 2) {
        // 2. İki kademeli derinlik (Alt Kategori VEYA Doğrudan Ürün)
        const subSlug = pathSegments[1];
        const targetSub = targetLocalCategory.subcategories?.find(s => s.slug === subSlug);

        if (targetSub) {
          // KONTROL: Eğer eleman 'products' dizisi içermeyip kendisi 'detailImage'/'description' taşıyorsa (Örn: Glafuri)
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
            // Standart Alt Kategori Görünümü
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
        // 3. Üç veya daha fazla kademeli derinlik (Ürün Görünümü - Örn: Glisante S28)
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

      <Footer
        categories={navData.categories}
        topProducts={navData.topProducts}
      />
    </main>
  );
}