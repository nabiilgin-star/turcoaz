"use client";
import { useState } from "react";

export default function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const sidebar = document.getElementById("categorySidebar");
    if (sidebar) {
      if (isOpen) {
        sidebar.style.display = "none";
        sidebar.classList.remove("show-mobile");
      } else {
        sidebar.style.display = "block";
        sidebar.classList.add("show-mobile");
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <button 
      type="button" 
      onClick={toggleMenu}
      className="mobile-sidebar-toggle"
    >
      <span>📁 Meniu Produse ({isOpen ? "Ascunde" : "Categorii"})</span>
      <span>{isOpen ? "▲" : "▼"}</span>
    </button>
  );
}