// 📁 lib/cloudinary.js
export default function cloudinaryLoader({ src, width, quality }) {
  if (!src || typeof src !== "string") return src;
  if (!src.includes("res.cloudinary.com")) return src;

  // Video veya halihazırda otomasyon parametresi içeren URL'lere dokunma
  if (src.includes("/video/upload/") || src.includes("f_auto") || src.includes("q_auto")) {
    return src;
  }

  const q = quality || "auto";
  const w = width || 800;

  return src.replace("/upload/", `/upload/f_auto,q_${q},w_${w}/`);
}