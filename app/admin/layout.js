"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import {
  LayoutDashboard,
  FolderTree,
  Package,
  LogOut,
  Menu,
  HelpCircle,
  BookOpen,
  Settings,
} from "lucide-react";
import { useState } from "react";
import styles from "./admin-layout.module.css";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inventar", href: "/admin/inventar", icon: FolderTree },
    { name: "Catalog", href: "/admin/catalog", icon: BookOpen },
    {
      name: "Întrebări frecvente",
      href: "/admin/intrebari-frecvente",
      icon: HelpCircle,
    },
    { name: "Setări", href: "/admin/setari", icon: Settings },
  ];

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      {}
      {isSidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {}
      <div
        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <Image
            src="https://res.cloudinary.com/dfyvfexhc/image/upload/v1768644306/afmvb5dhoixh0b90mpn2.png"
            alt="Kahe Admin"
            width={120}
            height={40}
            priority
            style={{ height: "auto" }}
          />
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${styles.navLink} ${
                  isActive ? styles.navLinkActive : styles.navLinkInactive
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className={styles.icon} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className={styles.logoutWrapper}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <LogOut className={styles.icon} />
            Deconectare
          </button>
        </div>
      </div>

      {}
      <div className={styles.mainContent}>
        {}
        <header className={styles.mobileHeader}>
          <button
            className={styles.menuButton}
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className={styles.mobileTitle}>Admin</span>
        </header>

        <main className={styles.pageContent}>{children}</main>
      </div>
    </div>
  );
}
