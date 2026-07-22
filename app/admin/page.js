import { supabaseAdmin } from "@/lib/supabase-admin";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    { count: categoriesCount },
    { count: productsCount },
    { count: faqsCount },
    { data: recentProducts },
    { data: topProducts },
  ] = await Promise.all([
    supabaseAdmin
      .from("categories")
      .select("*", { count: "exact", head: true }),
    supabaseAdmin.from("products").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("faqs").select("*", { count: "exact", head: true }),
    supabaseAdmin
      .from("products")
      .select("id, title, image, created_at, subcategories(name)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabaseAdmin
      .from("products")
      .select("id, title, image, view_count, subcategories(name)")
      .order("view_count", { ascending: false })
      .gt("view_count", 0)
      .limit(100),
  ]);

  return (
    <DashboardClient
      stats={{
        categories: categoriesCount || 0,
        products: productsCount || 0,
        faqs: faqsCount || 0,
      }}
      recentProducts={recentProducts || []}
      topProducts={topProducts || []}
    />
  );
}
