"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoriesAccordion({ categories = [] }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const resize = () => setIsMobile(window.innerWidth <= 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleCardClick = (cat, isActive) => {
    if (isMobile || isActive) {
      router.push(`/categorii/${cat.slug}`);
    }
  };

  if (!isClient) {
    return (
      <div className="categories-container-accordion">
        {categories.map((cat, index) => (
          <div key={index} className="category-card-accordion">
            {cat.image && (
              <Image src={cat.image} alt={cat.name} width={400} height={400} />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="categories-container-accordion">
      {categories.map((cat, index) => {
        
        const isActive = isMobile || activeIndex === index;

        return (
          <motion.div
            key={index}
            className={`category-card-accordion ${isActive ? "active" : ""} ${isMobile ? "mobile-forced" : ""}`}
            onMouseEnter={!isMobile ? () => setActiveIndex(index) : undefined}
            onMouseLeave={!isMobile ? () => setActiveIndex(-1) : undefined}
            onClick={() => handleCardClick(cat, isActive)}
            animate={{
              flexGrow: isMobile ? 0 : isActive ? 4 : 1,
              height: isMobile ? "350px" : "450px",
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="card-image-wrapper">
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="card-image-new"
                  priority={index < 3}
                />
              ) : (
                <div className="card-image-placeholder" />
              )}
            </div>

            <div
              className={`card-overlay-new ${isActive ? "active" : ""} ${isMobile ? "mobile" : ""}`}
            />

            <div className="card-content-new">
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div
                    key="active-content"
                    className="active-content-inner"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="category-title-expanded">{cat.name}</h3>
                    <div className="see-details-underline">Vezi detalii</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="vertical-title"
                    className="vertical-title-new"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {cat.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
