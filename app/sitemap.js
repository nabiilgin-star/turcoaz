import { categories } from "@/app/data/categories"; 

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
  // RİSK 1 & 2 ÇÖZÜLDÜ: Olmayan sayfalar çıkarıldı, var olan yasal sayfalar eklendi.
  const urls = [
    pageEntry(baseUrl, 1.0, "daily"), 
    pageEntry(`${baseUrl}/categorii`, 0.9, "weekly"),
    pageEntry(`${baseUrl}/contact`, 0.8, "yearly"), 
    pageEntry(`${baseUrl}/politica-confidentialitate`, 0.5, "yearly"),
    pageEntry(`${baseUrl}/termeni-si-conditii`, 0.5, "yearly"),
  ];

  // RİSK 4 ÇÖZÜLDÜ: Henüz tamamlanmamış (noindex) kategorileri sızdırmamak için kara liste (blacklist) oluşturduk.
  const excludedSlugs = ['profile-pvc', 'componente-sisteme-sticla'];

  // 2. Dinamik Kategoriler Döngüsü
  for (const cat of categories) {
    // Kategori slug'ı yoksa veya kara listedeyse atla
    if (!cat.slug || excludedSlugs.includes(cat.slug)) continue;

    let catPriority = cat.slug === 'glafuri-din-aluminiu' ? 0.9 : 0.8;
    urls.push(pageEntry(`${baseUrl}/categorii/${cat.slug}`, catPriority, "weekly", cat.updatedAt));

    // Alt Kategoriler Döngüsü
    const subs = cat.subcategories || cat.subCategories;
    if (Array.isArray(subs)) {
      for (const sub of subs) {
        // Alt kategori slug'ı yoksa veya kara listedeyse atla
        if (!sub.slug || excludedSlugs.includes(sub.slug)) continue;
        
        let subUrl = `${baseUrl}/categorii/${cat.slug}/${sub.slug}`;
        urls.push(pageEntry(subUrl, 0.7, "weekly", sub.updatedAt));

        // RİSK 3 ÇÖZÜLDÜ: 3. Seviye ürün döngüsü (items/products) tamamen silindi! 
        // Ürünler alt kategori sayfasında listelendiği için artık 404 verecek hayalet URL'ler üretilmeyecek.
      }
    }
  }

  // Bütün standart profilleri içeren güncel manuel listemiz
  const standardProfiles = [
    'cornier', 'teava-rectangulara', 'teava-rotunda', 'teava-patrata', 'profil-u', 'profil-t', 'platbanda'
  ];
  
  standardProfiles.forEach((slug) => {
    urls.push(pageEntry(
      `${baseUrl}/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/${slug}`, 
      0.7, 
      "weekly"
    ));
  });

  // Yinelenen URL'leri temizle (Güvenlik önlemi)
  const uniqueUrls = Array.from(new Map(urls.map(item => [item.url, item])).values());

  return uniqueUrls;
}