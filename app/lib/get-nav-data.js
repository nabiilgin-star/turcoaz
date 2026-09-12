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