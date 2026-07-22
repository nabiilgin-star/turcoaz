"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath, revalidateTag } from "next/cache";
import { generateSlug } from "@/app/utils/slugGenerator";
import { uploadImage } from "@/app/utils/uploadImage";

export async function createSubcategory(formData) {
  const category_id = formData.get("category_id");
  const parent_id = formData.get("parent_id") || null;
  const name = formData.get("name");
  const slug = generateSlug(name);

  const imageFile = formData.get("image");
  let image = null;

  if (imageFile && imageFile.size > 0) {
    image = await uploadImage(imageFile, "subcategories");
  }

  const { error } = await supabaseAdmin
    .from("subcategories")
    .insert([{ category_id, parent_id, name, slug, image }]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/inventar");
  revalidateTag("navbar-data");
  revalidateTag("subcategories");
  revalidateTag("categories");
}

export async function updateSubcategory(id, formData) {
  const category_id = formData.get("category_id");
  const parent_id = formData.get("parent_id") || null;
  const name = formData.get("name");
  const slug = generateSlug(name);

  const imageFile = formData.get("image");
  const currentImage = formData.get("current_image");
  let image = currentImage;

  if (imageFile && imageFile.size > 0) {
    image = await uploadImage(imageFile, "subcategories");
  }

  if (!imageFile?.size && !currentImage) {
    image = null;
  }

  const { error } = await supabaseAdmin
    .from("subcategories")
    .update({ category_id, parent_id, name, slug, image })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/inventar");
  revalidateTag("navbar-data");
  revalidateTag("subcategories");
  revalidateTag("categories");
}

export async function deleteSubcategory(id) {
  const { error } = await supabaseAdmin
    .from("subcategories")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/inventar");
  revalidateTag("navbar-data");
  revalidateTag("subcategories");
  revalidateTag("categories");
}

export async function updateSubcategoryOrder(items) {
  const promises = items.map((item) =>
    supabaseAdmin
      .from("subcategories")
      .update({ display_order: item.display_order })
      .eq("id", item.id),
  );

  await Promise.all(promises);

  revalidatePath("/admin/inventar");
  revalidateTag("navbar-data");
  revalidateTag("subcategories");
  revalidateTag("categories");
}
