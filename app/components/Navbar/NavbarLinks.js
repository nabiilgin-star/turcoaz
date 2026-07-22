"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function NavbarLinks() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Categorii", href: "/categorii" },
    { name: "Cele mai vândute", href: "/#best-sellers" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <ul className="navbar-links">
      <li className="category-item">
        <div className="category-trigger">
          <span>Linkuri</span>
          <ChevronDown size={16} />
        </div>

        <div className="dropdown right-aligned">
          {links.map((link, index) => (
            <Link key={index} href={link.href} className="dropdown-item">
              {link.name}
            </Link>
          ))}
        </div>
      </li>
    </ul>
  );
}
