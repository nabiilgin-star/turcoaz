"use client";

import { FolderTree, Package, FileText, Eye } from "lucide-react";
import styles from "./dashboard.module.css";

export default function DashboardClient({
  stats,
  recentProducts,
  topProducts,
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>

      {}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FolderTree size={20} />
          </div>
          <div>
            <p className={styles.statValue}>{stats.categories}</p>
            <p className={styles.statLabel}>Categorii</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Package size={20} />
          </div>
          <div>
            <p className={styles.statValue}>{stats.products}</p>
            <p className={styles.statLabel}>Produse</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FileText size={20} />
          </div>
          <div>
            <p className={styles.statValue}>{stats.faqs}</p>
            <p className={styles.statLabel}>Întrebări frecvente</p>
          </div>
        </div>
      </div>

      {}
      <div className={styles.tablesGrid}>
        {}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Ultimele Produse</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Produs</th>
                  <th className={styles.thRight}>Data</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.productCell}>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className={styles.productImg}
                          />
                        ) : (
                          <div className={styles.productImgPlaceholder}>
                            <Package size={14} />
                          </div>
                        )}
                        <div>
                          <span className={styles.productName}>
                            {product.title}
                          </span>
                          <span className={styles.productSub}>
                            {product.subcategories?.name || ""}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tdRight}>
                      {new Date(product.created_at).toLocaleDateString(
                        "ro-RO",
                        {
                          day: "numeric",
                          month: "short",
                        },
                      )}
                    </td>
                  </tr>
                ))}
                {recentProducts.length === 0 && (
                  <tr>
                    <td colSpan={2} className={styles.emptyRow}>
                      Niciun produs adăugat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Eye size={16} style={{ marginRight: 6, verticalAlign: -2 }} />
            Cele Mai Vizionate
          </h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Produs</th>
                  <th className={styles.thRight}>Vizualizări</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, i) => (
                  <tr key={product.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.productCell}>
                        <span className={styles.rankBadge}>{i + 1}</span>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className={styles.productImg}
                          />
                        ) : (
                          <div className={styles.productImgPlaceholder}>
                            <Package size={14} />
                          </div>
                        )}
                        <div>
                          <span className={styles.productName}>
                            {product.title}
                          </span>
                          <span className={styles.productSub}>
                            {product.subcategories?.name || ""}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tdRight}>
                      <span className={styles.viewsBadge}>
                        {product.view_count}
                      </span>
                    </td>
                  </tr>
                ))}
                {topProducts.length === 0 && (
                  <tr>
                    <td colSpan={2} className={styles.emptyRow}>
                      Nicio vizualizare încă.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
