import { Poppins } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Turcoaz Aluminiu | Glafuri Aluminiu Extrudat, AKPA Bond, Primebond, Durabond",
  description:
    "Glafuri și pervaz din aluminiu extrudat, panouri compozite AKPA Bond, Primebond, Durabond, sisteme și balustrade sticlă. Livrare în București, Iași și toată România.",
  metadataBase: new URL("https://turcoaz.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Turcoaz Aluminiu | Glafuri Aluminiu, AKPA Bond, Primebond, Durabond",
    description:
      "Glafuri și pervaz din aluminiu extrudat, panouri compozite AKPA Bond, Primebond, Durabond, sisteme și balustrade. Livrare în București, Iași și toată România.",
    url: "https://turcoaz.com",
    siteName: "Turcoaz Aluminiu",
    locale: "ro_RO",
    type: "website",
    // images: ["/og-image.jpg"], // 1200x630 önerilir — ekleyin, paylaşım önizlemesi için önemli
  },
  verification: {
    google: "99WUIU-knQT64obdDg7tY_iKjVa3Yn2p8COGa5n25eo",
  },
};

export default function RootLayout({ children }) {
  // Organization: markanın kendisi (tüm lokasyonların "şemsiyesi")
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://turcoaz.com/#organization",
    name: "Turcoaz Aluminiu SRL",
    url: "https://turcoaz.com",
    logo: "https://turcoaz.com/logo.png",

    // ⚠️ HENÜZ TEYİT EDİLMEDİ: Google Business açıklamanızda "2001" yazıyor,
    // sitenizde "2002" yazıyor. Doğru yılı söyleyince burayı güncelleyeceğiz.
    foundingDate: "2002",

    email: "turcoaztrading@yahoo.com",
    sameAs: [
      // Popești-Leordeni Google Business Profile (isim güncellemesi sonrası)
      "https://www.google.com/maps/place/Turcoaz+Aluminiu+SRL/@44.3765673,26.1882932,17z/data=!4m6!3m5!1s0x40b1fdf5e63c6ee5:0x2c86dbb15c0eb27c!8m2!3d44.3765673!4d26.1882932",

      // ⚠️ EKSİK: Sector 4 ve Iași lokasyonlarının Maps linklerini
      // aldığınızda buraya ekleyin.
      // "https://www.facebook.com/turcoazaluminiu",
      // "https://www.europages.co.uk/COMPANY/turcoaz-aluminiu.html",
    ],
  };

  // Her fiziksel lokasyon için ayrı LocalBusiness kaydı
  const locationsJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://turcoaz.com/#popesti-leordeni",
      name: "Turcoaz Aluminiu SRL - Depozit Central",
      parentOrganization: { "@id": "https://turcoaz.com/#organization" },
      image: "https://turcoaz.com/logo.png",
      url: "https://turcoaz.com",
      telephone: "+40730630063",
      email: "turcoaztrading@yahoo.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Str. Taberei nr. 6",
        addressLocality: "Popești-Leordeni",
        addressRegion: "Ilfov",
        addressCountry: "RO",
      },
      // Google Maps işletme kaydından alınan gerçek koordinatlar
      geo: {
        "@type": "GeoCoordinates",
        latitude: 44.3765673,
        longitude: 26.1882932,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      areaServed: ["București", "Ilfov", "România"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "@id": "https://turcoaz.com/#sector4",
      name: "Turcoaz Aluminiu SRL - Magazin Șos. Giurgiului",
      parentOrganization: { "@id": "https://turcoaz.com/#organization" },
      url: "https://turcoaz.com",
      telephone: "+40720097224",
      email: "turcoaztrading@yahoo.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Str. Orăștie",
        addressLocality: "Sector 4, București",
        addressCountry: "RO",
      },
      // ⚠️ EKSİK: Bu lokasyon için Google Maps geo koordinatı henüz yok.
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      areaServed: ["București", "România"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "@id": "https://turcoaz.com/#iasi",
      name: "Alufab SRL - Depozit Iași",
      parentOrganization: { "@id": "https://turcoaz.com/#organization" },
      // alufab.ro, turcoaz.com'a 301 yönlendiriyor — kanonik URL olarak
      // turcoaz.com kullanılıyor. alufab.ro'yu bu lokasyonun kendi Google
      // Business Profile'ında web sitesi olarak ayrıca belirtebilirsiniz.
      url: "https://turcoaz.com",
      telephone: "+40746921162",
      email: "alufab.iasi@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Str. Trei Fântâni",
        addressLocality: "Iași",
        addressCountry: "RO",
      },
      // ⚠️ EKSİK: Bu lokasyon için Google Maps geo koordinatı henüz yok.
      areaServed: ["Iași", "Moldova", "România"],
    },
  ];

  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsJsonLd) }}
        />
      </head>
      <body className={poppins.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}