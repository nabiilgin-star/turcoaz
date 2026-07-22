import { supabaseAdmin } from "@/lib/supabase-admin";
import InventoryClient from "./InventoryClient";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  
  const { data: categories } = await supabaseAdmin
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  
  const { data: allSubcategories } = await supabaseAdmin
    .from("subcategories")
    .select("*")
    .order("display_order", { ascending: true });

  
  const { data: allProducts } = await supabaseAdmin
    .from("products")
    .select("*, product_documents(*)")
    .order("display_order", { ascending: true });

  
  const subMap = {};
  allSubcategories?.forEach((sub) => {
    subMap[sub.id] = {
      ...sub,
      subcategories: [],
      products: allProducts?.filter((p) => p.subcategory_id === sub.id) || [],
    };
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

  const categoriesWithTree =
    categories?.map((cat) => ({
      ...cat,
      subcategories: rootSubcategories.filter((s) => s.category_id === cat.id),
      products:
        allProducts?.filter(
          (p) => p.category_id === cat.id && !p.subcategory_id,
        ) || [],
    })) || [];

  return <InventoryClient initialCategories={categoriesWithTree} />;
}
