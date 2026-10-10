/**
 * app/sitemap.js
 * - Noindex olan kategorilerin alt kategorileri ve ürünleri otomatik atlanır (Sızıntı engellendi).
 * - Düzgün lastModified ve Map tekleştirmesi içerir.
 */
import { categories } from "@/app/data/categories";
import { siteConfig, pages } from "./seo.config";

// Ürün sayfalarının 200 döndüğünden emin olunana kadar true/false yapılabilir
const INCLUDE_PRODUCT_PAGES = true;

// noindex olan tüm path'ler (tam yol eşleşmesi)
const noindexPaths = new Set(
  Object.values(pages)
    .filter((p) => !p.indexable)
    .map((p) => p.path)
);

function entry(path, lastModified) {
  return {
    url: `${siteConfig.domain}${path === "/" ? "" : path.toLowerCase()}`,
    ...(lastModified ? { lastModified } : {}),
  };
}

export default function sitemap() {
  const urls = [
    entry("/"),
    entry("/categorii"),
    entry("/contact"),
    entry("/depozit-aluminiu-bucuresti"),
    entry("/depozit-aluminiu-iasi"),
    entry("/politica-confidentialitate"),
    entry("/termeni-si-conditii"),
  ];

  for (const cat of categories) {
    if (!cat.slug) continue;
    const catPath = `/categorii/${cat.slug}`;

    // 1. Ana Kategori Noindex ise altındaki HİÇBİR ŞEY sitemap'e giremez
    if (noindexPaths.has(catPath)) continue;
    urls.push(entry(catPath, cat.updatedAt));

    // Kategori seviyesindeki ürünler (Varsa)
    if (INCLUDE_PRODUCT_PAGES && Array.isArray(cat.products)) {
      for (const prod of cat.products) {
        if (!prod.slug) continue;
        const prodPath = `${catPath}/${prod.slug}`;
        if (noindexPaths.has(prodPath)) continue;
        urls.push(entry(prodPath, prod.updatedAt || cat.updatedAt));
      }
    }

    // 2. Alt Kategoriler ve ürünleri
    const subs = cat.subcategories || cat.subCategories;
    if (!Array.isArray(subs)) continue;

    for (const sub of subs) {
      if (!sub.slug) continue;
      const subPath = `${catPath}/${sub.slug}`;

      // Alt Kategori Noindex ise ürünlerine geçilmez
      if (noindexPaths.has(subPath)) continue;
      urls.push(entry(subPath, sub.updatedAt || cat.updatedAt));

      if (INCLUDE_PRODUCT_PAGES && Array.isArray(sub.products)) {
        for (const prod of sub.products) {
          if (!prod.slug) continue;
          const prodPath = `${subPath}/${prod.slug}`;
          if (noindexPaths.has(prodPath)) continue;
          urls.push(entry(prodPath, prod.updatedAt || sub.updatedAt || cat.updatedAt));
        }
      }
    }
  }

  // Statik Profil Rotaları
  const standardProfiles = [
    "cornier",
    "teava-rectangulara",
    "teava-rotunda",
    "teava-patrata",
    "profil-u",
    "profil-t",
    "platbanda",
  ];

  for (const slug of standardProfiles) {
    const profilePath = `/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/${slug}`;
    if (!noindexPaths.has(profilePath)) {
      urls.push(entry(profilePath));
    }
  }

  // Tekrarlayan URL'leri temizle (lastModified olanı koru)
  const map = new Map();
  for (const u of urls) {
    const prev = map.get(u.url);
    if (!prev || (!prev.lastModified && u.lastModified)) {
      map.set(u.url, u);
    }
  }

  return Array.from(map.values());
}