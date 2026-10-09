"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="container-max">
        <div className="footer-bottom-layout">
          
          {/* Sol Kısım: Telif Hakkı */}
          <div className="footer-copyright">
            <p>&copy; {currentYear} Turcoaz Aluminiu SRL. Toate drepturile rezervate.</p>
          </div>

          {/* Sağ Kısım: Yasal Linkler */}
          <div className="footer-legal-links">
            <Link href="/politica-confidentialitate">Politica de confidențialitate</Link>
            <span className="legal-separator">•</span>
            <Link href="/termeni-si-conditii">Termeni și condiții</Link>
          </div>

<div className="company-legal-info">
  <p><strong>Turcoaz Aluminiu S.R.L.</strong></p>
  <p>CUI: RO28922264 | Reg. Com: J2016003625234</p>
  <p>Sediu Social & Depozit: Str. Taberei nr. 6, Popești-Leordeni, Ilfov, România</p>
  <p>Email: info@turcoaz.com</p> 
</div>

        </div>
      </div>
    </footer>
  );
}