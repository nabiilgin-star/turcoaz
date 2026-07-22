"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "../BestSellers/ProductCard";
import styles from "./RecommendedSlider.module.css";

const RecommendedSlider = ({ products, baseUrl }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  return (
    <div className={`${styles["recommended-slider"]} embla`}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {products.map((product) => (
            <div key={product.id} className="embla__slide">
              <ProductCard product={product} baseUrl={baseUrl} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles["recommended-dots"]}>
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`${styles["recommended-dot"]} ${
              index === selectedIndex ? styles["recommended-dot--selected"] : ""
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedSlider;
