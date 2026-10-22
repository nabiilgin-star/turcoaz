import { Poppins } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./globals.css";

// Romence karakterler (ă, â, î, ș, ț) için latin-ext gerekli.
// Sadece gerçekten kullanılan ağırlıkları bırakın (300/500/700 kullanımını sitede arayın).
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const SITE_URL = "https://turcoaz.com";

// Logo, 1200x630 beyaz zeminli (kırpılmadan) paylaşım görseli.
// Mümkünse ürün fotoğraflı gerçek bir banner ile değiştirin.
const OG_IMAGE =
  "https://res.cloudinary.com/oivvupgw/image/upload/c_pad,w_1200,h_630,b_white/v1792179034/Turcoaz_Aluminum_Logo_hnffft.png";

const LOGO_URL =
  "https://res.cloudinary.com/oivvupgw/image/upload/v1792179034/Turcoaz_Aluminum_Logo_hnffft.png";

// ----------------------------------------------------------------------
// METADATA
// NOT: canonical, alternates ve openGraph.url BİLEREK burada yok.
// Next.js metadata'yı sığ birleştirir; root'ta "canonical: /" olursa
// kendi canonical'ını vermeyen tüm sayfalar ana sayfayı canonical gösterir.
// Bunlar sayfa bazında buildMetadata() / generateMetadata() ile verilmeli.
// ----------------------------------------------------------------------
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sisteme Tâmplărie Aluminiu, Glafuri & Balustrade | Turcoaz",
  description:
  "Importator și distribuitor de profile din aluminiu și sisteme din aluminiu AKPA în România. Glafuri din aluminiu, balustrade, panouri compozite din aluminiu tip Bond, sticlă și profile PVC. Cere o ofertă pentru proiectul tău.",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },

  openGraph: {
    title: "Sisteme Tâmplărie Aluminiu, Glafuri & Balustrade | Turcoaz",
   description:
  "Importator și distribuitor de profile și sisteme din aluminiu AKPA. Glafuri din aluminiu, balustrade, panouri compozite din aluminiu tip Bond, sticlă și profile PVC. Cere o ofertă!",
    siteName: "Turcoaz Aluminiu",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Turcoaz Aluminiu – profile și sisteme din aluminiu",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sisteme Tâmplărie Aluminiu, Glafuri & Balustrade | Turcoaz",
description:
  "Importator și distribuitor de profile și sisteme din aluminiu AKPA. Glafuri din aluminiu, balustrade, panouri compozite din aluminiu tip Bond, sticlă și profile PVC. Cere o ofertă!",
    images: [OG_IMAGE],
  },

  verification: {
    google: "99WUIU-knQT64obdDg7tY_iKjVa3Yn2p8COGa5n25eo",
  },
};

// Tarayıcı çubuğu rengi (kontrol aracındaki theme-color maddesi). Rengi markanıza göre değiştirin.
export const viewport = {
  themeColor: "#0e7c86",
};

// ----------------------------------------------------------------------
// STRUCTURED DATA
// ----------------------------------------------------------------------
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Turcoaz Aluminiu SRL",
  legalName: "Turcoaz Aluminiu S.R.L.",
description:
  "Importator și distribuitor de profile și sisteme din aluminiu AKPA. Glafuri din aluminiu, balustrade, panouri compozite din aluminiu tip Bond, sticlă și profile PVC. Cere o ofertă!",
  foundingDate: "2011",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
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
    addressLocality: "Popești-Leordeni",
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
    // Adăugați când există: LinkedIn, Facebook, pagina de distribuitor de pe site-ul AKPA
  ],
  areaServed: { "@type": "Country", name: "România" },
  knowsAbout: [
    "profile din aluminiu",
    "glafuri din aluminiu",
    "balustrade din sticlă și aluminiu",
    "panouri compozite din aluminiu (ACP)",
    "profile PVC",
    "sisteme de tâmplărie din aluminiu",
    "sisteme din sticlă",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Turcoaz Aluminiu",
  inLanguage: "ro-RO",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const locationsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#popesti-leordeni`,
    name: "Turcoaz Aluminiu SRL - Depozit Central",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    image: LOGO_URL,
    url: SITE_URL,
    telephone: "+40730630063",
    email: "info@turcoaz.com",
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
    areaServed: { "@type": "Country", name: "România" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE_URL}/#sector4`,
    // Verificați numele: adresa este Str. Orăștie, nu Șos. Giurgiului
    name: "Turcoaz Aluminiu SRL - Magazin București Sector 4",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    image: LOGO_URL,
    url: SITE_URL,
    telephone: "+40720097224",
    email: "info@turcoaz.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Orăștie",
      addressLocality: "București",
      addressRegion: "București",
      // postalCode: "0xxxxx", // adăugați codul poștal real
      addressCountry: "RO",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    areaServed: ["București", "Ilfov"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE_URL}/#iasi`,
    // Depozitul din Iași aparține Alufab SRL; păstrat separat, legat prin affiliation
    name: "Alufab SRL - Depozit Iași",
    affiliation: { "@id": `${SITE_URL}/#organization` },
    image: LOGO_URL,
    url: SITE_URL,
    telephone: "+40746921162",
    email: "alufab.iasi@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Trei Fântâni",
      addressLocality: "Iași",
      addressRegion: "Iași",
      addressCountry: "RO",
    },
    areaServed: ["Iași", "Moldova"],
  },
];

// "<" karakterini kaçırır (script enjeksiyonuna karşı güvenli JSON-LD)
function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// ----------------------------------------------------------------------
// ROOT LAYOUT
// ----------------------------------------------------------------------
export default function RootLayout({ children }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={locationsJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className={poppins.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}