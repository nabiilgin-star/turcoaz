import { Poppins } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// ----------------------------------------------------------------------
// SEO GÜNCELLEMELERİ YAPILMIŞ METADATA OBJESİ
// ----------------------------------------------------------------------
export const metadata = {
  // 1. Title ideal 55-60 karakter aralığına çekildi (Kesilmeleri önler)
  title: "Sisteme Tâmplărie Aluminiu, Glafuri & Balustrade | Turcoaz",
  
  // 2. Description 148 karaktere optimize edildi (Yeşil bölge)
  description:
    "Distribuitor de profile și sisteme din aluminiu, glafuri exterioare, balustrade din sticlă și panouri compozite. Livrare rapidă în toată România.",
  
  metadataBase: new URL("https://turcoaz.com"),
  alternates: {
    canonical: "/",
  },
  
  // 3. Eklentide eksik görünen Robots etiketleri eklendi
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },

  openGraph: {
    title: "Sisteme Tâmplărie Aluminiu, Glafuri & Balustrade | Turcoaz",
    description:
      "Distribuitor de profile și sisteme din aluminiu, glafuri exterioare, balustrade din sticlă și panouri compozite. Livrare rapidă în toată România.",
    url: "https://turcoaz.com",
    siteName: "Turcoaz Aluminiu",
    locale: "ro_RO",
    type: "website",
    // images: ["/og-image.jpg"], // Sosyal medya paylaşımları için ileride 1200x630 resim ekleyebilirsiniz
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
    foundingDate: "2002",
    email: "turcoaztrading@yahoo.com",
    sameAs: [
      "https://www.google.com/maps/place/Turcoaz+Aluminiu+SRL/@44.3765673,26.1882932,17z/data=!4m6!3m5!1s0x40b1fdf5e63c6ee5:0x2c86dbb15c0eb27c!8m2!3d44.3765673!4d26.1882932",
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
      url: "https://turcoaz.com",
      telephone: "+40746921162",
      email: "alufab.iasi@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Str. Trei Fântâni",
        addressLocality: "Iași",
        addressCountry: "RO",
      },
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