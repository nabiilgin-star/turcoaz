"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        
        setIsVisible(false);
      } else {
        
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href="https://wa.me/40730630063"
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-float ${isVisible ? "visible" : "hidden"}`}
      aria-label="Contactează-ne pe WhatsApp"
    >
      <div className="whatsapp-icon-wrapper">
        <Image
          src="https://res.cloudinary.com/dfyvfexhc/image/upload/v1770287301/irea3sf8ekvnrp25ou0f.png"
          alt="WhatsApp"
          width={60}
          height={60}
          className="whatsapp-icon"
        />
      </div>
    </a>
  );
}
