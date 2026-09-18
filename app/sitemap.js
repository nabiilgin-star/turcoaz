// DİKKAT: aşağıdaki import yolunu kendi proje yapınıza göre düzeltin
// (örn. "@/data/categories" veya "../../data/categories")
import { categories } from "./data/categories";
const baseUrl = "https://turcoaz.com";

// Sitede yeni bir kategori/ürün eklediğinizde sitemap'i elle güncellemenize
// gerek kalmasın diye tarih sabit değil, build zamanı bugünün tarihi olarak
// ayarlandı. İçerik nadiren değiştiği için bu kabul edilebilir; çok sık
// deploy ediyorsanız her kayda kendi "updatedAt" alanını eklemeniz daha
// doğru olur (bkz. önceki sitemap'teki uyarı).
const today = new Date();

function pageEntry(url, priority, changeFrequency = "monthly") {
  return { url, lastModified: today, changeFrequency, priority };
}

export default async function sitemap() {
  const urls = [
    pageEntry(baseUrl, 1.0, "weekly"),
    pageEntry(`${baseUrl}/categorii`, 0.9, "weekly"),
  ];

  for (const cat of categories) {
    // slug'ı olmayan (henüz tanımlanmamış / taslak) kategoriler otomatik atlanır
    if (!cat.slug) continue;

    urls.push(pageEntry(`${baseUrl}/categorii/${cat.slug}`, 0.8));

    // NOT: Ürünlerin (glisante-s28, m115, primebond-plus vb.) kendi ayrı
    // sayfası/URL'si YOK — alt kategori sayfası içinde listeleniyorlar.
    // Bu yüzden burada ürün seviyesinde URL üretilmiyor; ürün ayrıntıları
    // ilgili alt kategori sayfasının içeriği olarak zaten indexleniyor.

    // Alt kategoriler — bunların HER BİRİNİN kendi sayfası var
    // (ör. glafuri-din-aluminiu, sisteme-tamplarie, balustrada-de-sticla)
    if (Array.isArray(cat.subcategories)) {
      for (const sub of cat.subcategories) {
        if (!sub.slug) continue;

        urls.push(
          pageEntry(`${baseUrl}/categorii/${cat.slug}/${sub.slug}`, 0.7)
        );
      }
    }
  }

  return urls;
}