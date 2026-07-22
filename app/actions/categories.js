"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath, revalidateTag } from "next/cache";
import { generateSlug } from "@/app/utils/slugGenerator";
import { uploadImage } from "@/app/utils/uploadImage";

export async function createCategory(formData) {
  const name = formData.get("name");
  const slug = generateSlug(name);
  
  

  const imageFile = formData.get("image");
  let image = null;

  if (imageFile && imageFile.size > 0) {
    image = await uploadImage(imageFile, "categories");
  }

  const icon = formData.get("icon"); 

  const { error } = await supabaseAdmin
    .from("categories")
    .insert([{ name, slug, image, icon }]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/inventar");
  revalidateTag("navbar-data");
  revalidateTag("categories");
}

export async function updateCategory(id, formData) {
  const name = formData.get("name");
  const slug = generateSlug(name);

  const imageFile = formData.get("image");
  const currentImage = formData.get("current_image");
  let image = currentImage;

  if (imageFile && imageFile.size > 0) {
    image = await uploadImage(imageFile, "categories");
  }

  
  if (!imageFile?.size && !currentImage) {
    image = null;
  }

  const icon = formData.get("icon");

  const { error } = await supabaseAdmin
    .from("categories")
    .update({ name, slug, image, icon })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/inventar");
  revalidateTag("navbar-data");
  revalidateTag("categories");
}

export async function deleteCategory(id) {
  const { error } = await supabaseAdmin
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/inventar");
  revalidateTag("navbar-data");
  revalidateTag("categories");
}

export async function updateCategoryOrder(items) {
  
  
  const promises = items.map((item) =>
    supabaseAdmin
      .from("categories")
      .update({ display_order: item.display_order })
      .eq("id", item.id),
  );

  await Promise.all(promises);

  revalidatePath("/admin/inventar");
  revalidateTag("navbar-data");
  revalidateTag("categories");
}
