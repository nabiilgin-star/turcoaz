import { Poppins } from "next/font/google"; 
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Turcoaz Aluminiu & Alufab",
  description: "Soluții premium pentru feronerie și sticlă.",
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
