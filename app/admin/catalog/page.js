import { supabaseAdmin } from "@/lib/supabase-admin";
import CatalogClient from "./CatalogClient";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const { data: catalogs } = await supabaseAdmin
    .from("catalogs")
    .select("*")
    .order("created_at", { ascending: false });

  return <CatalogClient initialCatalogs={catalogs || []} />;
}
