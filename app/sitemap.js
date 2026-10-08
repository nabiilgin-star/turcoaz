/**
 * app/sitemap.js
 * seo.config.js ile senkron: bir sayfa `indexable: false` ise hem sayfada noindex
 * olur hem de buradan otomatik çıkar. Artık iki yerde elle düzeltme yok.
 */
import { categories } from "@/app/data/categories";
import { siteConfig, pages } from "./seo.config";

// noindex olan sayfaların path'leri (slug değil, tam path → yanlış eşleşme olmaz)
const noindexPaths = new Set(
  Object.values(pages)
    .filter((p) => !p.indexable)
    .map((p) => p.path)
);

/** Gerçek tarih yoksa lastModified HİÇ yazılmaz (sahte "bugün" tarihi Google'ı yanıltır). */
function entry(path, lastModified) {
  return {
    url: `${siteConfig.domain}${path === "/" ? "" : path}`,
    ...(lastModified ? { lastModified } : {}),
  };
}

export default function sitemap() {
  const urls = [
    entry("/"),
    entry("/categorii"),
    entry("/contact"),
    entry("/politica-confidentialitate"),
    entry("/termeni-si-conditii"),
  ];

  for (const cat of categories) {
    if (!cat.slug) continue;
    const catPath = `/categorii/${cat.slug}`;
    // noindex kategori → alt sayfaları da atlanır (önceki davranışla aynı)
    if (noindexPaths.has(catPath)) continue;
    urls.push(entry(catPath, cat.updatedAt));

    const subs = cat.subcategories || cat.subCategories;
    if (!Array.isArray(subs)) continue;

    for (const sub of subs) {
      if (!sub.slug) continue;
      const subPath = `${catPath}/${sub.slug}`;
      if (noindexPaths.has(subPath)) continue;
      urls.push(entry(subPath, sub.updatedAt));
    }
  }

  // Elle yönetilen standart profiller (kategori verisinde yoksa)
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
    urls.push(
      entry(`/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/${slug}`)
    );
  }

  // Tekrarlayanları temizle; tarihi olan kayıt tarihi olmayana tercih edilir
  const map = new Map();
  for (const u of urls) {
    const prev = map.get(u.url);
    if (!prev || (!prev.lastModified && u.lastModified)) map.set(u.url, u);
  }
  return Array.from(map.values());
}