import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidateTag, unstable_cache } from "next/cache";
import dns from "dns";
import { categories as localCategories } from "@/app/data/categories";

// Yerel ağdaki ENOTFOUND / getaddrinfo hatalarını aşmak için 
if (dns && typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

export const getNavbarData = unstable_cache(
  async () => {
    const { data: categories, error: catError } = await supabaseAdmin
      .from("categories")
      .select("*")
      .eq("show_in_menu", true) 
      .order("display_order", { ascending: true });
      
    if (catError) {
      return { categories: [], products: [], topProducts: [], announcement: { text: "", active: false } };
    }

    const { data: allSubcategories, error: subError } = await supabaseAdmin
      .from("subcategories")
      .select("*")
      .order("display_order", { ascending: true });

    const subMap = {};
    allSubcategories?.forEach((sub) => {
      subMap[sub.id] = { ...sub, subcategories: [] };
    });

    const rootSubcategories = [];
    allSubcategories?.forEach((sub) => {
      const item = subMap[sub.id];
      if (sub.parent_id && subMap[sub.parent_id]) {
        subMap[sub.parent_id].subcategories.push(item);
      } else {
        rootSubcategories.push(item);
      }
    });

    const categoriesWithTree = categories.map((cat) => ({
      ...cat,
      subcategories: rootSubcategories.filter((s) => s.category_id === cat.id),
    }));

    const [{ data: topProductsRaw }, { data: recommendedRaw }] =
      await Promise.all([
        supabaseAdmin
          .from("products")
          .select(
            "id, title, slug, image, category_id, subcategory_id, subcategories(slug, parent_id, category_id, categories(slug)), categories(slug)",
          )
          .order("view_count", { ascending: false })
          .limit(5),
        supabaseAdmin
          .from("products")
          .select(
            "id, title, slug, image, category_id, subcategory_id, is_recommended, subcategories(slug, parent_id, category_id, categories(slug)), categories(slug)",
          )
          .eq("is_recommended", true),
      ]);

    const buildPath = (p) => {
      let fullPath = "";
      if (p.subcategory_id) {
        let path = "";
        let current = subMap[p.subcategory_id];
        while (current) {
          path = current.slug + (path ? "/" + path : "");
          if (current.parent_id) {
            current = subMap[current.parent_id];
          } else {
            const cat = categories.find((c) => c.id === current.category_id);
            if (cat) {
              path = cat.slug + "/" + path;
            }
            break;
          }
        }
        fullPath = path;
      } else if (p.category_id && p.categories?.slug) {
        fullPath = p.categories.slug;
      }
      return `/categorii/${fullPath ? fullPath + "/" : ""}${p.slug}`;
    };

    const topProducts =
      topProductsRaw?.map((p) => ({
        id: p.id,
        title: p.title,
        image: p.image,
        link: buildPath(p),
      })) || [];

    const recommendedProducts =
      recommendedRaw?.map((p) => ({
        id: p.id,
        title: p.title,
        image: p.image,
        is_recommended: p.is_recommended,
        link: buildPath(p),
      })) || [];

    const { data: settings } = await supabaseAdmin
      .from("settings")
      .select("key, value")
      .in("key", ["announcement_text", "announcement_active"]);

    const getVal = (key) => settings?.find((s) => s.key === key)?.value;

    return {
      categories: categoriesWithTree,
      products: recommendedProducts, 
      topProducts: topProducts,
      announcement: {
        text: getVal("announcement_text"),
        active: getVal("announcement_active") === "true",
      },
    };
  },
  ["navbar-data"],
  {
    tags: ["navbar-data", "header-categories", "products-list", "settings"],
    revalidate: 3600,
  },
);

export const getCategoryBySlug = unstable_cache(
  async (slug) => {
    const { data, error } = await supabaseAdmin
      .from("categories")
      .select("*, subcategories(*), products(*)")
      .eq("slug", slug)
      .order("display_order", {
        foreignTable: "subcategories",
        ascending: true,
      })
      .single();

    if (error) return null;
    return data;
  },
  ["category-slug"],
  { revalidate: 3600, tags: ["categories"] },
);

export const getSubcategoryWithProducts = unstable_cache(
  async (catSlug, subSlug) => {
    const { data: subcategory, error } = await supabaseAdmin
      .from("subcategories")
      .select("*, categories!inner(*), products(*)")
      .eq("slug", subSlug)
      .eq("categories.slug", catSlug)
      .single();

    if (error || !subcategory) return null;

    return {
      category: subcategory.categories,
      subcategory: subcategory,
      products: subcategory.products || [],
    };
  },
  ["subcategory-products"],
  { revalidate: 3600, tags: ["subcategories", "products"] },
);

export const getProductBySlug = unstable_cache(
  async (slug) => {
    const { data: product, error } = await supabaseAdmin
      .from("products")
      .select(
        "*, subcategories(*, categories(*)), categories(*), product_documents(*)",
      )
      .eq("slug", slug)
      .single();

    if (error) return null;
    if (!product.subcategories && !product.categories) return null;

    return {
      ...product,
      subcategory: product.subcategories || null,
      category: product.subcategories
        ? product.subcategories.categories
        : product.categories,
    };
  },
  ["product-slug"],
  { revalidate: 3600, tags: ["products"] },
);

export const resolvePath = unstable_cache(
  async (pathSegments) => {
    if (!pathSegments || pathSegments.length === 0) return null;

    const lastSlug = pathSegments[pathSegments.length - 1];

    if (pathSegments.length === 1) {
      const { data: category } = await supabaseAdmin
        .from("categories")
        .select("*, subcategories(*)")
        .eq("slug", pathSegments[0])
        .order("display_order", {
          foreignTable: "subcategories",
          ascending: true,
        })
        .single();
      if (category) return { type: "category", data: category };
    }

    const { data: product } = await supabaseAdmin
      .from("products")
      .select(
        "*, subcategories(*, categories(*)), categories(*), product_documents(*)",
      )
      .eq("slug", lastSlug)
      .single();

    if (product) {
      if (product.subcategories) {
        return {
          type: "product",
          data: {
            ...product,
            subcategory: product.subcategories,
            category: product.subcategories.categories,
          },
        };
      } else if (product.categories) {
        return {
          type: "product",
          data: {
            ...product,
            subcategory: null,
            category: product.categories,
          },
        };
      }
    }

    const { data: subcategory } = await supabaseAdmin
      .from("subcategories")
      .select("*, categories(*), products(*), subcategories(*)") 
      .eq("slug", lastSlug)
      .order("display_order", { foreignTable: "products", ascending: true })
      .order("display_order", {
        foreignTable: "subcategories",
        ascending: true,
      })
      .single();

    if (subcategory) {
      return {
        type: "subcategory",
        data: {
          category: subcategory.categories,
          subcategory: subcategory,
          products: subcategory.products || [],
          subcategories: subcategory.subcategories || [],
        },
      };
    }

    return null;
  },
  ["resolve-path"],
  { revalidate: 3600, tags: ["categories", "subcategories", "products"] },
);

export const getAllSlugsForStaticGeneration = unstable_cache(
  async () => {
    const { data: categories } = await supabaseAdmin
      .from("categories")
      .select("slug");
    const categoryPaths = categories?.map((c) => ({ slug: [c.slug] })) || [];

    const { data: allSubs } = await supabaseAdmin
      .from("subcategories")
      .select("*");
    const subMap = {};
    allSubs?.forEach((s) => (subMap[s.id] = s));

    const { data: fullSubcategories } = await supabaseAdmin
      .from("subcategories")
      .select("id, slug, parent_id, category_id, categories(slug)");

    const subMap2 = {};
    fullSubcategories?.forEach((s) => (subMap2[s.id] = s));

    const subcategoryPaths =
      fullSubcategories?.map((s) => {
        let path = [s.slug];
        let curr = s;
        while (curr.parent_id && subMap2[curr.parent_id]) {
          curr = subMap2[curr.parent_id];
          path.unshift(curr.slug);
        }
        path.unshift(curr.categories?.slug);
        return { slug: path.filter(Boolean) };
      }) || [];

    const catMap = {};
    categories?.forEach((c) => (catMap[c.id] = c));

    const { data: products } = await supabaseAdmin
      .from("products")
      .select("slug, subcategory_id, category_id");

    const productPaths =
      products?.map((p) => {
        let path = [p.slug];
        if (p.subcategory_id) {
          let currSub = subMap2[p.subcategory_id];
          while (currSub) {
            path.unshift(currSub.slug);
            if (currSub.parent_id) {
              currSub = subMap2[currSub.parent_id];
            } else {
              path.unshift(currSub.categories?.slug);
              break;
            }
          }
        } else if (p.category_id) {
          const cat = catMap[p.category_id];
          if (cat) {
            path.unshift(cat.slug);
          }
        }
        return { slug: path.filter(Boolean) };
      }) || [];

    // Yerel kategorileri de statik yollara dahil ediyoruz
    const localPaths = [];
    localCategories?.forEach((cat) => {
      localPaths.push({ slug: [cat.slug] });
      cat.subcategories?.forEach((sub) => {
        localPaths.push({ slug: [cat.slug, sub.slug] });
        sub.products?.forEach((prod) => {
          localPaths.push({ slug: [cat.slug, sub.slug, prod.slug] });
        });
      });
    });

    const allPaths = [...categoryPaths, ...subcategoryPaths, ...productPaths, ...localPaths];
    const uniquePaths = Array.from(new Set(allPaths.map(p => JSON.stringify(p)))).map(p => JSON.parse(p));
    uniquePaths.categorySlugs = categoryPaths; 
    
    return uniquePaths;
  },
  ["all-slugs-catchall"],
  { tags: ["categories", "subcategories", "products"] },
);

export const getFaqs = unstable_cache(
  async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from("faqs")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) return [];
      return data || [];
    } catch (catchError) {
      return [];
    }
  },
  ["faqs-list"],
  { revalidate: 3600, tags: ["faqs"] },
);

export const getHeroSettings = unstable_cache(
  async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from("hero_settings")
        .select("device_type, image_url");

      if (error) return [];
      return data || [];
    } catch (catchError) {
      return [];
    }
  },
  ["hero-settings-list"],
  { revalidate: 3600, tags: ["hero-settings"] },
);