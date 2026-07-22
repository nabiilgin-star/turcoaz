"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath, revalidateTag } from "next/cache";
import { generateSlug } from "@/app/utils/slugGenerator";
import { optimizeAndUploadImages } from "@/app/utils/optimizeImages";

export async function createProduct(formData) {
  let subcategory_id = formData.get("subcategory_id");
  if (!subcategory_id) subcategory_id = null;

  let category_id = formData.get("category_id");
  if (!category_id) category_id = null;

  const title = formData.get("title");
  const slug = generateSlug(title);
  const description = formData.get("description");
  const features = formData.get("features");
  const is_recommended = formData.get("is_recommended") === "on";

  const technical_specifications =
    formData.get("technical_specifications") || "";
  let recommended_products = [];
  try {
    const recs = formData.get("recommended_products");
    if (recs) recommended_products = JSON.parse(recs);
  } catch (e) {
    console.error("Error parsing recommended_products:", e);
  }

  
  
  const existingImages = formData.getAll("existing_images");

  
  const newFiles = formData.getAll("new_images");

  let uploadedUrls = [];
  if (newFiles && newFiles.length > 0) {
    
    const validFiles = newFiles.filter((f) => f.size > 0);
    uploadedUrls = await optimizeAndUploadImages(validFiles, "products");
  }

  const allImages = [...existingImages, ...uploadedUrls];
  const mainImage = allImages.length > 0 ? allImages[0] : null;

  const { error } = await supabaseAdmin.from("products").insert([
    {
      subcategory_id,
      category_id,
      title,
      slug,
      description,
      image: mainImage, 
      images: allImages, 
      features,
      is_recommended,
      technical_specifications,
      recommended_products,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  
  const { data: inserted } = await supabaseAdmin
    .from("products")
    .select("id")
    .eq("slug", slug)
    .single();

  if (inserted) {
    await processDocuments(inserted.id, formData);
  }

  revalidatePath("/admin/inventar");
  revalidatePath("/", "layout");
  revalidateTag("products");
  revalidateTag("navbar-data");
}

export async function updateProduct(id, formData) {
  let subcategory_id = formData.get("subcategory_id");
  if (!subcategory_id) subcategory_id = null;

  let category_id = formData.get("category_id");
  if (!category_id) category_id = null;

  const title = formData.get("title");
  const slug = generateSlug(title);
  const description = formData.get("description");
  const features = formData.get("features");
  const is_recommended = formData.get("is_recommended") === "on";

  const technical_specifications =
    formData.get("technical_specifications") || "";
  let recommended_products = [];
  try {
    const recs = formData.get("recommended_products");
    if (recs) recommended_products = JSON.parse(recs);
  } catch (e) {
    console.error("Error parsing recommended_products:", e);
  }

  
  const existingImages = formData.getAll("existing_images");
  const newFiles = formData.getAll("new_images");

  let uploadedUrls = [];
  if (newFiles && newFiles.length > 0) {
    const validFiles = newFiles.filter((f) => f.size > 0);
    uploadedUrls = await optimizeAndUploadImages(validFiles, "products");
  }

  const allImages = [...existingImages, ...uploadedUrls];
  const mainImage = allImages.length > 0 ? allImages[0] : null;

  const { error } = await supabaseAdmin
    .from("products")
    .update({
      subcategory_id,
      category_id,
      title,
      slug,
      description,
      image: mainImage,
      images: allImages,
      features,
      is_recommended,
      technical_specifications,
      recommended_products,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await processDocuments(id, formData);

  revalidatePath("/admin/inventar");
  revalidatePath("/", "layout");
  revalidateTag("products");
  revalidateTag("navbar-data");
}

export async function deleteProduct(id) {
  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/inventar");
  revalidatePath("/", "layout");
  revalidateTag("products");
  revalidateTag("navbar-data");
}


async function processDocuments(productId, formData) {
  
  const keepIds = formData.getAll("keep_doc_ids");
  if (keepIds.length > 0) {
    
    const { data: existingDocs } = await supabaseAdmin
      .from("product_documents")
      .select("id")
      .eq("product_id", productId);

    if (existingDocs) {
      const toDelete = existingDocs
        .filter((d) => !keepIds.includes(d.id))
        .map((d) => d.id);

      if (toDelete.length > 0) {
        await supabaseAdmin
          .from("product_documents")
          .delete()
          .in("id", toDelete);
      }
    }
  } else {
    
    await supabaseAdmin
      .from("product_documents")
      .delete()
      .eq("product_id", productId);
  }

  
  const newDocsCount = parseInt(formData.get("new_docs_count") || "0");
  for (let i = 0; i < newDocsCount; i++) {
    const name = formData.get(`doc_name_${i}`);
    const file = formData.get(`doc_file_${i}`);

    if (!name || !file || file.size === 0) continue;

    const fileExt = file.name.split(".").pop();
    const fileName = `doc_${productId}_${Date.now()}_${i}.${fileExt}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabaseAdmin.storage
      .from("documents")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Document upload error:", uploadError.message);
      continue;
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("documents").getPublicUrl(fileName);

    await supabaseAdmin.from("product_documents").insert([
      {
        product_id: productId,
        name,
        file_url: publicUrl,
        display_order: i,
      },
    ]);
  }
}

export async function updateProductOrder(items) {
  const promises = items.map((item) =>
    supabaseAdmin
      .from("products")
      .update({ display_order: item.display_order })
      .eq("id", item.id),
  );

  await Promise.all(promises);

  revalidatePath("/admin/inventar");
  revalidateTag("navbar-data");
  revalidateTag("products");
}

export async function moveProduct(productId, updates) {
  
  const { error } = await supabaseAdmin
    .from("products")
    .update({
      category_id: updates.category_id || null,
      subcategory_id: updates.subcategory_id || null,
    })
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/inventar");
  revalidatePath("/", "layout");
  revalidateTag("navbar-data");
  revalidateTag("products");
}
