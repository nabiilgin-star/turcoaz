import { categories } from "./data/categories";

const baseUrl = "https://turcoaz.com";

// new Date() yerine sabit bir fallback tarihi eklendi
function pageEntry(url, priority, changeFrequency = "weekly", lastModDate) {
  return { 
    url, 
    lastModified: lastModDate || "2026-09-20T00:00:00.000Z",
    changeFrequency, 
    priority 
  };
}

export default async function sitemap() {
  // 1. Ana Sayfa ve Statik Sayfalar
  const urls = [
    pageEntry(baseUrl, 1.0, "daily", "2026-09-23"), 
    pageEntry(`${baseUrl}/categorii`, 0.9, "weekly", "2026-09-20"),
    pageEntry(`${baseUrl}/contact`, 0.7, "yearly", "2026-01-15"), 
    pageEntry(`${baseUrl}/despre-noi`, 0.6, "yearly", "2026-01-15"),
    pageEntry(`${baseUrl}/locatii`, 0.7, "yearly", "2026-05-10"),
  ];

  // 2. Kategoriler Döngüsü
  for (const cat of categories) {
    if (!cat.slug) continue;

    const catLastMod = cat.updatedAt || "2026-09-20";
    urls.push(pageEntry(`${baseUrl}/categorii/${cat.slug}`, 0.8, "weekly", catLastMod));

    // Alt Kategoriler Döngüsü (Veri kaynağı düzgünse if/else'lere gerek kalmaz)
    const subs = cat.subcategories || cat.subCategories;
    if (Array.isArray(subs)) {
      for (const sub of subs) {
        if (!sub.slug) continue;
        // Tüm alt kategoriler doğal hiyerarşisinde yazdırılır
        let subUrl = `${baseUrl}/categorii/${cat.slug}/${sub.slug}`;
        urls.push(pageEntry(subUrl, 0.7, "weekly", sub.updatedAt || catLastMod));
      }
    }
  }

  return urls;
}