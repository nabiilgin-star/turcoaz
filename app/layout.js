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
  description: "Glafuri și pervaz din aluminiu extrudat, panouri compozite AKPA Bond, Primebond, Durabond, sisteme și balustrade sticlă. Livrare în București, Iași și toată România.",
  
  openGraph: {
    title: "Turcoaz Aluminiu | Glafuri Aluminiu, AKPA Bond, Primebond, Durabond",
    description: "Glafuri și pervaz din aluminiu extrudat, panouri compozite AKPA Bond, Primebond, Durabond, sisteme și balustrade. Livrare în București, Iași și toată România.",
    url: "https://turcoaz.com",
    siteName: "Turcoaz Aluminiu",
    locale: "ro_RO",
    type: "website",
  },

  verification: {
    google: "99WUIU-knQT64obdDg7tY_iKjVa3Yn2p8COGa5n25eo",
  },
};

export default function RootLayout({ children }) {
  // Schema.org - Ürünler, Markalar ve Genişletilmiş Hizmet Bölgesi (București, Iași, România)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "S.C. TURCOAZ ALUMINIU S.R.L.",
    "image": "https://turcoaz.com/logo.png",
    "url": "https://turcoaz.com",
    "description": "Distribuitor glafuri din aluminiu extrudat, panouri compozite AKPA Bond, Primebond, Durabond și sisteme balustrade.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Popești-Leordeni",
      "addressRegion": "Ilfov",
      "addressCountry": "RO"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "București"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Iași"
      },
      {
        "@type": "Country",
        "name": "Romania"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    }
  };

  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={poppins.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}