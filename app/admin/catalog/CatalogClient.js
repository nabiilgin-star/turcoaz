"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, FileText, Download } from "lucide-react";
import toast from "react-hot-toast";
import tableStyles from "@/app/components/admin/admin-table.module.css";
import pageStyles from "@/app/admin/admin-page.module.css";
import Modal from "@/app/components/admin/Modal";
import { createCatalog, deleteCatalog } from "@/app/actions/catalog";
import ConfirmModal from "@/app/components/admin/ConfirmModal";
import styles from "@/app/components/admin/admin-form.module.css";

export default function CatalogClient({ initialCatalogs }) {
  const [catalogs, setCatalogs] = useState(initialCatalogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [catalogToDelete, setCatalogToDelete] = useState(null);

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setCatalogs(initialCatalogs);
  }, [initialCatalogs]);

  const handleDelete = async () => {
    if (catalogToDelete) {
      await deleteCatalog(catalogToDelete);
      setCatalogs(catalogs.filter((c) => c.id !== catalogToDelete));
      setCatalogToDelete(null);
      toast.success("Catalog șters cu succes!");
    }
  };

  const confirmDelete = (id) => {
    setCatalogToDelete(id);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createCatalog(formData);
      toast.success("Catalog încărcat cu succes!");
      setIsModalOpen(false);
      setFileName("");
    } catch (e) {
      toast.error("Eroare: " + e.message);
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.header}>
        <div className={pageStyles.headerTop}>
          <h1 className={pageStyles.title}>Catalog</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className={pageStyles.addButton}
          >
            <Plus className={pageStyles.icon} />
            <span className={pageStyles.btnTextDesktop}>Adaugă Catalog</span>
            <span className={pageStyles.btnTextMobile}>Adaugă</span>
          </button>
        </div>
      </div>

      <div className={tableStyles.tableContainer}>
        <table className={tableStyles.table}>
          <thead className={tableStyles.thead}>
            <tr>
              <th scope="col" className={tableStyles.th}>
                Nume
              </th>
              <th scope="col" className={tableStyles.th}>
                Fișier
              </th>
              <th scope="col" className={tableStyles.th}>
                Data
              </th>
              <th scope="col" className={tableStyles.thRight}>
                Acțiuni
              </th>
            </tr>
          </thead>
          <tbody className={tableStyles.tbody}>
            {catalogs.map((catalog) => (
              <tr key={catalog.id} className={tableStyles.tr}>
                <td className={tableStyles.tdPrimary}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FileText size={18} />
                    {catalog.name}
                  </div>
                </td>
                <td className={tableStyles.td}>
                  <a
                    href={catalog.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      color: "var(--color-primary)",
                      textDecoration: "none",
                    }}
                  >
                    <Download size={14} />
                    Descarcă
                  </a>
                </td>
                <td className={tableStyles.td}>
                  {new Date(catalog.created_at).toLocaleDateString("ro-RO")}
                </td>
                <td className={tableStyles.tdActions}>
                  <div className={tableStyles.actionsContainer}>
                    <button
                      onClick={() => confirmDelete(catalog.id)}
                      className={tableStyles.deleteButton}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {catalogs.length === 0 && (
          <div className={tableStyles.emptyState}>
            Nu există cataloage. Adaugă unul nou!
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adaugă Catalog"
      >
        <form action={handleSubmit} className={`${styles.form} ${styles.flat}`}>
          <div className={styles.grid}>
            <div className={styles.inputGroupFull}>
              <label htmlFor="name" className={styles.label}>
                Nume Catalog
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className={styles.input}
                placeholder="Ex: Catalog Produse 2026"
              />
            </div>
            <div className={styles.inputGroupFull}>
              <label className={styles.label}>Documente</label>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type="file"
                  name="file"
                  id="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("file").click()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.8rem",
                    color: "var(--color-primary)",
                    background: "none",
                    border: "1px dashed var(--color-primary)",
                    borderRadius: "6px",
                    padding: "0.4rem 0.75rem",
                    cursor: "pointer",
                    marginTop: "0.25rem",
                    width: "fit-content",
                  }}
                >
                  <Plus size={14} />
                  {fileName ? "Schimbă Document" : "Adaugă Document"}
                </button>
                {fileName && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <FileText size={12} />
                    {fileName}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className={styles.buttonCancel}
            >
              Anulează
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.buttonSubmit}
            >
              {loading ? "Se încarcă..." : "Salvează"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={!!catalogToDelete}
        onClose={() => setCatalogToDelete(null)}
        onConfirm={handleDelete}
        message="Sigur vrei să ștergi acest catalog?"
      />
    </div>
  );
}
