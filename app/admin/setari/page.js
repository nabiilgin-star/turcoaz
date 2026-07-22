import { supabaseAdmin } from "@/lib/supabase-admin";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [{ data: settings }, { data: heroSettings }] = await Promise.all([
    supabaseAdmin.from("settings").select("*"),
    supabaseAdmin.from("hero_settings").select("*"),
  ]);

  const getVal = (key) => settings?.find((s) => s.key === key)?.value;

  return (
    <SettingsClient
      contactImage={getVal("contact_image")}
      announcementText={getVal("announcement_text")}
      announcementActive={getVal("announcement_active")}
      heroSettings={heroSettings || []}
    />
  );
}
