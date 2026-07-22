import sharp from "sharp";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function optimizeAndUploadImages(files, bucket) {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map(async (file) => {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());

      
      
      const optimizedBuffer = await sharp(buffer)
        .resize(1920, null, {
          withoutEnlargement: true, 
          fit: "inside",
        })
        .webp({ quality: 80 })
        .toBuffer();

      const fileName = `${Math.random().toString(36).substring(2)}.webp`;
      const filePath = `${fileName}`; 

      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(filePath, optimizedBuffer, {
          contentType: "image/webp",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error("Image processing error:", error);
      return null;
    }
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((url) => url !== null);
}
