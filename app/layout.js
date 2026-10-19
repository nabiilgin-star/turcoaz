import { Poppins } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap", // Font yüklenirken metnin görünmesini sağlar, gecikmeyi önler
});

// ----------------------------------------------------------------------
// SEO GÜNCELLEMELERİ YAPILMIŞ METADATA OBJESİ
// ----------------------------------------------------------------------
export const metadata = {
  metadataBase: new URL("https://turcoaz.com"),
  title: "Sisteme Tâmplărie Aluminiu, Glafuri & Balustrade | Turcoaz",
  description:
    "Distribuitor de profile și sisteme din aluminiu, glafuri exterioare, balustrade din sticlă și panouri compozite. Livrare rapidă în toată România.",
  
  alternates: {
    canonical: "/",
    languages: {
      "ro-RO": "/",
      "ro": "/",
    },
  },
  
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
    images: [
      {
        url: "https://res.cloudinary.com/oivvupgw/image/upload/v1792179034/Turcoaz_Aluminum_Logo_hnffft.png", // 1200x630 boyutlarında kurumsal banner görselinizle değiştirebilirsiniz
        width: 1200,
        height: 630,
        alt: "Turcoaz Aluminiu - Sisteme Profesionale",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sisteme Tâmplărie Aluminiu, Glafuri & Balustrade | Turcoaz",
    description:
      "Distribuitor de profile și sisteme din aluminiu, glafuri exterioare, balustrade din sticlă și panouri compozite. Livrare rapidă în toată România.",
    images: ["https://res.cloudinary.com/oivvupgw/image/upload/v1792179034/Turcoaz_Aluminum_Logo_hnffft.png"],
  },

  verification: {
    google: "99WUIU-knQT64obdDg7tY_iKjVa3Yn2p8COGa5n25eo",
  },
};

// ----------------------------------------------------------------------
// STATİK VERİLER (Performans için fonksiyon dışında tanımlandı)
// ----------------------------------------------------------------------

const allRomanianCounties = [
  "București", "Ilfov", "Iași", "Alba", "Arad", "Argeș", "Bacău", "Bihor",
  "Bistrița-Năsăud", "Botoșani", "Brașov", "Brăila", "Buzău", "Caraș-Severin",
  "Călărași", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați",
  "Giurgiu", "Gorj", "Harghita", "Hunedoara", "Ialomița", "Maramureș",
  "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Satu Mare", "Sălaj",
  "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vaslui", "Vâlcea",
  "Vrancea", "România"
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://turcoaz.com/#organization",
  name: "Turcoaz Aluminiu SRL",
  legalName: "Turcoaz Aluminiu S.R.L.",
  alternateName: "Turcoaz Trading S.R.L.",
  foundingDate: "2011",
  url: "https://turcoaz.com",
  logo: {
    "@type": "ImageObject",
    url: "https://res.cloudinary.com/oivvupgw/image/upload/v1792179034/Turcoaz_Aluminum_Logo_hnffft.png",
  },
  email: "info@turcoaz.com",
  telephone: "+40730630063",
  vatID: "RO28922264",
  identifier: {
    "@type": "PropertyValue",
    name: "Nr. Reg. Com.",
    value: "J2016003625234",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Str. Taberei nr. 6",
    addressLocality: "Pope\u0219ti-Leordeni",
    addressRegion: "Ilfov",
    addressCountry: "RO",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+40730630063",
      email: "info@turcoaz.com",
      contactType: "customer service",
      areaServed: "RO",
      availableLanguage: ["ro"],
    },
  ],
  sameAs: [
    "https://www.google.com/maps/place/Turcoaz+Aluminiu+SRL/@44.3765673,26.1882932,17z/data=!4m6!3m5!1s0x40b1fdf5e63c6ee5:0x2c86dbb15c0eb27c!8m2!3d44.3765673!4d26.1882932",
  ],
  areaServed: { "@type": "Country", name: "Rom\u00E2nia" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://turcoaz.com/#website",
  url: "https://turcoaz.com",
  name: "Turcoaz Aluminiu",
  inLanguage: "ro-RO",
  publisher: { "@id": "https://turcoaz.com/#organization" },
};

const locationsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://turcoaz.com/#popesti-leordeni",
    name: "Turcoaz Aluminiu SRL - Depozit Central",
    parentOrganization: { "@id": "https://turcoaz.com/#organization" },
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1792179034/Turcoaz_Aluminum_Logo_hnffft.png",
    url: "https://turcoaz.com",
    telephone: "+40730630063",
    email: "info@turcoaz.com",
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
    areaServed: allRomanianCounties,
  },
  {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": "https://turcoaz.com/#sector4",
    name: "Turcoaz Aluminiu SRL - Magazin Șos. Giurgiului",
    parentOrganization: { "@id": "https://turcoaz.com/#organization" },
    url: "https://turcoaz.com",
    telephone: "+40720097224",
    email: "info@turcoaz.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Orăștie",
      addressLocality: "Sector 4, București",
      addressRegion: "București",
      addressCountry: "RO",
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
    "@id": "https://turcoaz.com/#iasi",
    name: "Alufab SRL - Depozit Iași",
    affiliation: { "@id": "https://turcoaz.com/#organization" },
    url: "https://turcoaz.com",
    telephone: "+40746921162",
    email: "alufab.iasi@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Trei Fântâni",
      addressLocality: "Iași",
      addressRegion: "Iași",
      addressCountry: "RO",
    },
    areaServed: ["Iași", "Moldova", "România"],
  },
];

// ----------------------------------------------------------------------
// ANA LAYOUT BİLEŞENİ
// ----------------------------------------------------------------------
export default function RootLayout({ children }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={poppins.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}