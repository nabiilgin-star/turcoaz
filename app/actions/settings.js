"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath, revalidateTag } from "next/cache";
import { uploadImage } from "@/app/utils/uploadImage";

export async function updateSetting(key, formDataOrValue) {
  let value;

  if (formDataOrValue instanceof FormData) {
    const imageFile = formDataOrValue.get("image");
    const textValue = formDataOrValue.get("value");
    const currentValue = formDataOrValue.get("current_value");

    if (imageFile && imageFile.size > 0) {
      value = await uploadImage(imageFile, "settings");
    } else if (textValue !== null) {
      value = textValue;
    } else {
      value = currentValue;
    }
  } else {
    value = formDataOrValue;
  }

  const { error } = await supabaseAdmin
    .from("settings")
    .update({ value })
    .eq("key", key);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/setari");
  revalidateTag("settings");
  revalidatePath("/", "layout");
}

export async function updateHeroSetting(deviceType, formData) {
  const imageFile = formData.get("image");
  const currentValue = formData.get("current_value");
  let imageUrl = currentValue;

  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile, "hero-images");
  }

  const { error } = await supabaseAdmin
    .from("hero_settings")
    .update({ image_url: imageUrl, updated_at: new Date().toISOString() })
    .eq("device_type", deviceType);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/setari");
  revalidatePath("/");
  revalidateTag("hero-settings");
}

export async function getSetting(key) {
  const { data } = await supabaseAdmin
    .from("settings")
    .select("value")
    .eq("key", key)
    .single();

  return data?.value || null;
}
