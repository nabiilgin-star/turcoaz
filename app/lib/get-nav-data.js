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

    // --- YEREL (LOCAL) KATEGORİ VE ÜRÜNLERİ STATİK YOLLARA DAHİL ETME ---
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