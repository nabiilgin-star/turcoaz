import { Poppins } from "next/font/google"; 
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Turcoaz Aluminiu & Alufab | Profile Aluminiu, Balustrade Sticlă și Bond",
  description: "Turcoaz & Alufab - Gama completă de profile din aluminiu, sisteme pentru balustrade din sticlă securizată și panouri compozite (bond). Depozit Popești-Leordeni.",
  verification: {
    google: "google955aae56204d0058",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head></head>
      <body className={poppins.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
