"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { categories } from "../../data/categories";

export default function NavbarCategories() {
  return (
    <ul className="categories-list">
      {categories.map((cat, index) => {
        return (
          <li key={index} className="category-item">
            <div className="category-trigger">
              <span>{cat.name}</span>
              <ChevronDown size={14} className="chevron" />
            </div>

            <div className="dropdown centered">
              {cat.subcategories.map((sub, subIndex) => (
                <Link
                  key={subIndex}
                  href={`/categorii/${sub.slug}`}
                  className="dropdown-item"
                >
                  <div className="dropdown-image-container">
                    {}
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="dropdown-image"
                    />
                  </div>
                  <span>{sub.name}</span>
                </Link>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
