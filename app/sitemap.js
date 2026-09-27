import { categories } from "./data/categories";

const baseUrl = "https://turcoaz.com";

function pageEntry(url, priority, changeFrequency = "weekly", lastModDate) {
  return { 
    url, 
    lastModified: lastModDate || new Date().toISOString(),
    changeFrequency, 
    priority 
  };
}

export default async function sitemap() {
  // 1. Ana Sayfa ve Statik Sayfalar
  const urls = [
    pageEntry(baseUrl, 1.0, "daily"), 
    pageEntry(`${baseUrl}/categorii`, 0.9, "weekly"),
    pageEntry(`${baseUrl}/contact`, 0.8, "yearly"), 
    pageEntry(`${baseUrl}/despre-noi`, 0.7, "yearly"),
    pageEntry(`${baseUrl}/locatii`, 0.7, "yearly"),
  ];

  // 2. Dinamik Kategoriler Döngüsü (categories.js'den otomatik beslenir)
  for (const cat of categories) {
    if (!cat.slug) continue;

    // Glafuri din aluminiu için SEO önceliğini yüksek (0.9) tutuyoruz!
    let catPriority = cat.slug === 'glafuri-din-aluminiu' ? 0.9 : 0.8;
    urls.push(pageEntry(`${baseUrl}/categorii/${cat.slug}`, catPriority, "weekly", cat.updatedAt));

    // Alt Kategoriler Döngüsü
    const subs = cat.subcategories || cat.subCategories;
    if (Array.isArray(subs)) {
      for (const sub of subs) {
        if (!sub.slug) continue;
        
        let subUrl = `${baseUrl}/categorii/${cat.slug}/${sub.slug}`;
        urls.push(pageEntry(subUrl, 0.7, "weekly", sub.updatedAt));

        // 3. SEVİYE: Ürünler / Profiller (Cornier, Teava Rectangulara, Teava Rotunda vb.)
        const items = sub.items || sub.products;
        if (Array.isArray(items)) {
          for (const item of items) {
            if (!item.slug) continue;
            let itemUrl = `${baseUrl}/categorii/${cat.slug}/${sub.slug}/${item.slug}`;
            urls.push(pageEntry(itemUrl, 0.7, "weekly", item.updatedAt));
          }
        }
      }
    }
  }

  // EĞER standart profilleriniz categories.js içinde "items" olarak YER ALMIYORSA,
  // onları manuel olarak buraya ekliyoruz ki kesinlikle Google tarafından taransınlar:
  const standardProfiles = ['cornier', 'teava-rectangulara', 'teava-rotunda'];
  standardProfiles.forEach((slug) => {
    urls.push(pageEntry(
      `${baseUrl}/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/${slug}`, 
      0.7, 
      "weekly"
    ));
  });

  // Aynı URL'lerin (eğer hem dinamik hem manuel eklendiyse) çakışmasını engellemek için filtreleme:
  const uniqueUrls = Array.from(new Map(urls.map(item => [item.url, item])).values());

  return uniqueUrls;
}