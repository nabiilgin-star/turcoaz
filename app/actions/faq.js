"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createFAQ(formData) {
  const question = formData.get("question");
  const answer = formData.get("answer");

  const { error } = await supabaseAdmin
    .from("faqs")
    .insert([{ question, answer }]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/faq");
  revalidatePath("/");
  revalidateTag("faqs");
}

export async function updateFAQ(id, formData) {
  const question = formData.get("question");
  const answer = formData.get("answer");

  const { error } = await supabaseAdmin
    .from("faqs")
    .update({ question, answer })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/faq");
  revalidatePath("/");
  revalidateTag("faqs");
}

export async function deleteFAQ(id) {
  const { error } = await supabaseAdmin.from("faqs").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/faq");
  revalidatePath("/");
  revalidateTag("faqs");
}

export async function updateFAQOrder(items) {
  const promises = items.map((item) =>
    supabaseAdmin
      .from("faqs")
      .update({ display_order: item.display_order })
      .eq("id", item.id),
  );

  await Promise.all(promises);

  revalidatePath("/admin/faq");
  revalidatePath("/");
  revalidateTag("faqs");
}
