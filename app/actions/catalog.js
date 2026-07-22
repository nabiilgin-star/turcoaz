"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createCatalog(formData) {
  const name = formData.get("name");
  const file = formData.get("file");

  if (!file || file.size === 0) {
    throw new Error("Trebuie să încarci un fișier.");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `catalog_${Date.now()}.${fileExt}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabaseAdmin.storage
    .from("catalogs")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from("catalogs").getPublicUrl(fileName);

  const { error } = await supabaseAdmin
    .from("catalogs")
    .insert([{ name, file_url: publicUrl }]);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/catalog");
  revalidateTag("catalogs");
}

export async function deleteCatalog(id) {
  const { error } = await supabaseAdmin.from("catalogs").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/catalog");
  revalidateTag("catalogs");
}
