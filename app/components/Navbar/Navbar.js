"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Button from "../Button/Button";
import "./Navbar.css";

const BALUSTRADA_IMAGE_URL = "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png";

const isBalustradeItem = (item) => {
  return (
    item.slug === "balustrade" || 
    item.slug?.includes("balustrad") || 
    item.name?.toLowerCase().includes("balustrad")
  );
};

const DesktopDropdownItem = ({
  item,
  parentPath,
  level = 0,
  isCustom = false,
}) => {
  const hasSub = item.subcategories && item.subcategories.length > 0;
  // Null/undefined oluşmasını önleyen güvenli yol birleştirme
  const currentPath = parentPath ? `${parentPath}/${item.slug}` : item.slug;
  const href = isCustom ? "#" : `/categorii/${currentPath}`;

  if (item.isAction) {
    return (
      <div
        className="dropdown-item"
        onClick={item.action}
        style={{ cursor: "pointer" }}
      >
        <span className="item-text">{item.name}</span>
      </div>
    );
  }

  const imageSrc = isBalustradeItem(item) ? BALUSTRADA_IMAGE_URL : item.image;

  return (
    <div
      className={`dropdown-item-wrapper ${hasSub ? "has-sub" : ""}`}
      style={{ "--level": level }}
    >
      <Link href={href} className="dropdown-item">
        <div className="item-image-wrapper">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={item.name}
              width={40}
              height={40}
              className="item-image"
            />
          )}
        </div>
        <span className="item-text">{item.name}</span>
        {hasSub && <ChevronRight size={14} className="sub-chevron" />}
      </Link>
      {hasSub && (
        <div className="sub-dropdown">
          {item.subcategories.map((sub, idx) => (
            <DesktopDropdownItem
              key={idx}
              item={sub}
              parentPath={currentPath}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const MobileMenuItem = ({
  item,
  isOpen,
  onToggle,
  closeMobileMenu,
  parentPath,
  scrollToSection,
  level = 0,
}) => {
  const hasSub = item.subcategories && item.subcategories.length > 0;
  
  const handleClick = (e) => {
    if (item.isScroll && item.targetId) {
      e.preventDefault();
      scrollToSection(item.targetId);
      closeMobileMenu();
    }
  };

  const currentPath = parentPath ? `${parentPath}/${item.slug || ""}`.replace(/\/$/, "") : item.slug;
  const href =
    item.type === "custom" || item.isScroll
      ? item.path || "#"
      : item.path || `/categorii/${currentPath}`;

  const imageSrc = isBalustradeItem(item) ? BALUSTRADA_IMAGE_URL : item.image;

  return (
    <div
      className="mobile-item"
      style={{ borderBottom: level === 0 ? "1px solid #f2f4f7" : "none" }}
    >
      <div
        className={`mobile-item-header ${isOpen ? "active" : ""}`}
        onClick={hasSub ? onToggle : undefined}
      >
        {hasSub ? (
          <>
            {item.name}
            <ChevronRight
              size={20}
              className={`chevron-icon ${isOpen ? "rotate-90" : ""}`}
              style={{ transform: isOpen ? "rotate(90deg)" : "none" }}
            />
          </>
        ) : item.isAction ? (
          <div
            className="mobile-sub-link"
            onClick={() => {
              item.action();
              closeMobileMenu();
            }}
          >
            {item.name}
          </div>
        ) : (
          <Link
            href={href}
            className="mobile-sub-link"
            onClick={item.isScroll ? handleClick : closeMobileMenu}
            style={{
              padding: level > 0 ? "0.75rem 0" : "1rem 0",
              width: "100%",
            }}
          >
            {imageSrc && level > 0 && (
              <div
                className="item-image-wrapper"
                style={{ width: 32, height: 32, marginRight: "1rem" }}
              >
                <Image
                  src={imageSrc}
                  alt={item.name}
                  width={32}
                  height={32}
                  className="item-image"
                />
              </div>
            )}
            {item.name}
          </Link>
        )}
      </div>

      {hasSub && (
        <div
          className={`mobile-submenu ${isOpen ? "open" : ""}`}
          style={{ paddingLeft: level === 0 ? "1rem" : "0.5rem" }}
        >
          {item.subcategories.map((sub, idx) => {
            const [isChildOpen, setIsChildOpen] = useState(false);
            return (
              <MobileMenuItem
                key={idx}
                item={sub}
                isOpen={isChildOpen}
                onToggle={() => setIsChildOpen(!isChildOpen)}
                closeMobileMenu={closeMobileMenu}
                scrollToSection={scrollToSection}
                parentPath={currentPath}
                level={level + 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const Navbar = ({ categories = [], announcement = {} }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (pathname === "/") {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      setIsSearchLoading(true);
      setSearchResults([]); 
    } else {
      setIsSearchLoading(false);
      setSearchResults([]);
    }

    const timer = setTimeout(async () => {
      if (searchQuery.trim().length < 1) {
        return;
      }

      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`,
        );
        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setIsSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

  const toggleMobileSubmenu = (slug) => {
    setOpenMobileSubmenu((prev) => (prev === slug ? null : slug));
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setOpenMobileSubmenu(null);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const scrollToSection = (id) => {
    closeMobileMenu();

    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  const getSubItems = (item) => {
    if (item.type === "category") {
      const category = categories.find((c) => c.slug === item.slug);
      return category ? category.subcategories : [];
    }
    return [];
  };

  const getProductLink = (product) => {
    if (product.link) return product.link;
    return "#";
  };

  const menuItems = [
  { title: "Acasă", slug: "", path: "/", type: "link" },
  { title: "Produse", slug: "categorii", path: "/categorii", type: "link" },
  { title: "Despre Noi", slug: "despre-noi", path: "/#despre-noi", type: "link" },
  { title: "Contact", slug: "contact", path: "/#contact", type: "link" }, // Yolu /#contact yaptık
  ...categories.map((cat) => ({
    title: cat.title,
    slug: cat.slug,
    path: `/categorii/${cat.slug}`,
    type: "category",
  })),
];

  return (
    <>
      {announcement?.active && announcement?.text && (
        <div className="announcement-banner">
          <div className="container">
            <p>{announcement.text}</p>
          </div>
        </div>
      )}
      <nav className="navbar">
        <div className="navbar-container container-max">

          <div 
            className="logo-link"
            onClick={() => scrollToSection("hero")}
            style={{ 
              position: 'relative', 
              zIndex: 999999, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Image
              src="https://res.cloudinary.com/oivvupgw/image/upload/v1784325751/Logo_Turcoaz_aluminiu_er7eyt.png"
              alt="Turcoaz Aluminiu Logo"
              width={200}
              height={60}
              priority
              className="nav-logo"
              style={{ pointerEvents: 'none' }}
            />
          </div>

        <div className="desktop-menu">
    {menuItems.map((item) => {
      const subItems = getSubItems(item);
      const hasSub = subItems && subItems.length > 0;
      
      if (item.isScroll) {
        return (
          <div key={item.slug || item.targetId} className="nav-item">
            <span 
              className="nav-link" 
              onClick={() => scrollToSection(item.targetId)}
              style={{ cursor: "pointer" }}
            >
              {item.title}
            </span>
          </div>
        );
      }

      // HATA ÇÖZÜMÜ: Linkin bozulmasını kesin olarak engelliyoruz.
      // Eğer eleman statik bir link ise sadece kendi özel path'ini kullansın, 
      // Kategori ise kategori linki oluştursun.
      let correctHref = item.path || "#";
      if (item.type === "link") {
        if (item.slug === "") correctHref = "/";
        else if (item.slug === "categorii") correctHref = "/categorii";
        else if (item.slug === "contact") correctHref = "/contact";
      }

      return (
        <div key={item.slug || item.title} className="nav-item">
          <Link href={correctHref} className="nav-link">
            {item.title}{" "}
            {hasSub && (
              <ChevronDown size={16} className="chevron-icon" />
            )}
          </Link>
          
          {/* Alt Menü (Dropdown) kodlarınız muhtemelen burada devam ediyordur... */}
                  {hasSub && (
                    <div className="dropdown-menu">
                      {subItems.map((sub, idx) => (
                        <DesktopDropdownItem
                          key={idx}
                          item={sub}
                          parentPath={item.type === "category" ? item.slug : ""}
                          isCustom={item.type === "custom"}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="navbar-right">
            <div className="search-wrapper" ref={searchRef}>
              <button
                className="search-trigger-btn"
                onClick={openSearch}
                aria-label="Search"
              >
                <Search size={22} />
              </button>

              {isSearchOpen && (
                <div className="search-dropdown">
                  <div className="search-input-wrapper">
                    <Search size={18} className="search-input-icon" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Caută produse..."
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {searchQuery.length > 0 && (
                    <div className="search-results">
                      {isSearchLoading ? (
                        [...Array(4)].map((_, i) => (
                          <div key={i} className="search-result-item skeleton">
                            <div className="result-image-wrapper skeleton-img"></div>
                            <div className="result-title skeleton-line"></div>
                          </div>
                        ))
                      ) : searchResults.length > 0 ? (
                        searchResults.slice(0, 6).map((product) => (
                          <Link
                            key={product.id}
                            href={getProductLink(product)}
                            onClick={closeSearch}
                            className="search-result-item"
                          >
                            <div className="result-image-wrapper">
                              {product.image && (
                                <Image
                                  src={product.image}
                                  alt={product.title}
                                  width={36}
                                  height={36}
                                />
                              )}
                            </div>
                            <span className="result-title">
                              {product.title}
                            </span>
                          </Link>
                        ))
                      ) : (
                        <div className="no-results">Nu am găsit produse.</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="cta-button-container">
              <Link href="/contact">
                <Button variant="primary">Solicită ofertă</Button>
              </Link>
            </div>

            <button
              className={`hamburger-btn ${isMobileOpen ? "is-active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <div className="hamburger-box">
                <span className="hamburger-inner"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-drawer ${isMobileOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <span className="mobile-title"></span>
        </div>

        <div className="mobile-content">
          {menuItems.map((item) => {
            const subItems = getSubItems(item);
            return (
              <MobileMenuItem
                key={item.slug}
                item={{
                  name: item.title,
                  slug: item.slug,
                  subcategories: subItems,
                  type: item.type,
                  isScroll: item.isScroll,
                  targetId: item.targetId,
                  path: item.path
                }}
                isOpen={openMobileSubmenu === item.slug}
                onToggle={() => toggleMobileSubmenu(item.slug)}
                closeMobileMenu={closeMobileMenu}
                scrollToSection={scrollToSection}
                parentPath={item.type === "category" ? item.slug : ""}
              />
            );
          })}
        </div>

        <div className="mobile-footer">
          <Link href="/contact" onClick={closeMobileMenu}>
            <Button variant="primary" className="mobile-cta">
              Solicită ofertă
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;