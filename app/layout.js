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
    google: "99WUIU-knQT64obdDg7tY_iKjVa3Yn2p8COGa5n25eo",
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