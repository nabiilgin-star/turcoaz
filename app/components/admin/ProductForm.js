"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, X, Search } from "lucide-react";
import toast from "react-hot-toast";
import styles from "./admin-form.module.css";
import MultiImageUpload from "./MultiImageUpload";
import RichTextEditor from "./RichTextEditor";
import { translateError } from "@/app/lib/errorUtils";
import { removeDiacritics } from "@/app/lib/stringUtils";

export default function ProductForm({
  categories,
  allProducts = [],
  action,
  initialData = {},
  onSuccess,
  simplified = false,
  flat = false,
}) {
  const [loading, setLoading] = useState(false);

  
  const getInitialImages = () => {
    if (initialData.images && Array.isArray(initialData.images))
      return initialData.images;
    if (initialData.image) return [initialData.image];
    return [];
  };
  const [existingImagesValues, setExistingImagesValues] =
    useState(getInitialImages());
  const [newFiles, setNewFiles] = useState([]);

  
  const [existingDocs, setExistingDocs] = useState(
    initialData.product_documents || [],
  );
  const [newDocs, setNewDocs] = useState([]);

  
  const [description, setDescription] = useState(initialData.description || "");
  const [techSpecs, setTechSpecs] = useState(
    initialData.technical_specifications || "",
  );

  
  
  const [recommendedProductIds, setRecommendedProductIds] = useState(
    initialData.recommended_products || [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  
  const [isRecommended, setIsRecommended] = useState(
    initialData.is_recommended || false,
  );

  const getDefaultParent = () => {
    if (initialData.subcategory_id) return `sub_${initialData.subcategory_id}`;
    if (initialData.category_id) return `cat_${initialData.category_id}`;
    return "";
  };

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      
      const parentIdStr = formData.get("parent_id");
      formData.delete("parent_id");
      if (parentIdStr) {
        if (parentIdStr.startsWith("cat_")) {
          formData.set("category_id", parentIdStr.replace("cat_", ""));
          formData.set("subcategory_id", "");
        } else if (parentIdStr.startsWith("sub_")) {
          formData.set("subcategory_id", parentIdStr.replace("sub_", ""));
          formData.set("category_id", "");
        }
      }

      formData.delete("existing_images");
      existingImagesValues.forEach((url) => {
        formData.append("existing_images", url);
      });

      formData.delete("images");
      newFiles.forEach((file) => {
        formData.append("new_images", file);
      });

      
      formData.delete("keep_doc_ids");
      existingDocs.forEach((doc) => {
        formData.append("keep_doc_ids", doc.id);
      });

      
      newDocs.forEach((doc, i) => {
        formData.append(`doc_name_${i}`, doc.name);
        formData.append(`doc_file_${i}`, doc.file);
      });
      formData.set("new_docs_count", newDocs.length.toString());

      
      formData.set("description", description);
      formData.set("technical_specifications", techSpecs);

      
      formData.set("is_recommended", isRecommended ? "on" : "");
      formData.set(
        "recommended_products",
        JSON.stringify(recommendedProductIds),
      );

      await action(formData);
      toast.success("Produs salvat cu succes!");
      if (onSuccess) onSuccess();
    } catch (e) {
      toast.error(translateError(e));
      setLoading(false);
    }
  };

  
  const addNewDoc = () => setNewDocs([...newDocs, { name: "", file: null }]);
  const removeNewDoc = (index) =>
    setNewDocs(newDocs.filter((_, i) => i !== index));
  const removeExistingDoc = (docId) =>
    setExistingDocs(existingDocs.filter((d) => d.id !== docId));
  const updateNewDoc = (index, field, value) => {
    const updated = [...newDocs];
    updated[index] = { ...updated[index], [field]: value };
    setNewDocs(updated);
  };

  
  const availableProducts = allProducts.filter(
    (p) =>
      p.id !== initialData.id &&
      !recommendedProductIds.includes(p.id) &&
      removeDiacritics(p.title.toLowerCase()).includes(
        removeDiacritics(searchQuery.toLowerCase()),
      ),
  );

  const addRecommended = (id) => {
    setRecommendedProductIds([...recommendedProductIds, id]);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const removeRecommended = (id) => {
    setRecommendedProductIds(
      recommendedProductIds.filter((recId) => recId !== id),
    );
  };

  return (
    <form
      action={handleSubmit}
      className={`${styles.form} ${flat ? styles.flat : ""}`}
    >
      <div className={styles.grid}>
        {simplified ? (
          <>
            <input
              type="hidden"
              name="category_id"
              value={initialData.category_id || ""}
            />
            <input
              type="hidden"
              name="subcategory_id"
              value={initialData.subcategory_id || ""}
            />
          </>
        ) : (
          <div className={styles.inputGroup}>
            <label htmlFor="parent_id" className={styles.label}>
              Categorie Părinte
            </label>
            <select
              name="parent_id"
              id="parent_id"
              required
              defaultValue={getDefaultParent()}
              className={styles.select}
            >
              <option value="" disabled>
                Selectează o categorie sau subcategorie...
              </option>
              {categories.map((cat) => (
                <optgroup key={cat.id} label={`📦 ${cat.name}`}>
                  <option
                    value={`cat_${cat.id}`}
                    disabled={cat.subcategories && cat.subcategories.length > 0}
                  >
                    ↳ {cat.name} (Categorie Principală)
                  </option>
                  {(() => {
                    const flatten = (subs, level = 0) => {
                      let results = [];
                      subs.forEach((s) => {
                        results.push(
                          <option
                            key={s.id}
                            value={`sub_${s.id}`}
                            disabled={
                              s.subcategories && s.subcategories.length > 0
                            }
                          >
                            {"\u00A0".repeat((level + 1) * 4)}↳ {s.name}
                          </option>,
                        );
                        if (s.subcategories && s.subcategories.length > 0) {
                          results = results.concat(
                            flatten(s.subcategories, level + 1),
                          );
                        }
                      });
                      return results;
                    };
                    return flatten(cat.subcategories || []);
                  })()}
                </optgroup>
              ))}
            </select>
          </div>
        )}

        {}
        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
          <label htmlFor="title" className={styles.label}>
            Titlu Produs
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={initialData.title}
            className={styles.input}
          />
        </div>

        {}
        <div className={`${styles.inputGroupFull} ${styles.fullWidth}`}>
          <label className={styles.label}>Imagini Produs</label>
          <MultiImageUpload
            initialImages={existingImagesValues}
            onFilesChange={setNewFiles}
            onExistingChange={setExistingImagesValues}
          />
        </div>

        {!simplified && (
          <>
            <div className={`${styles.inputGroupFull} ${styles.fullWidth}`}>
              <label className={styles.label}>Descriere </label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Scrie descrierea produsului..."
              />
            </div>

            <div className={`${styles.inputGroupFull} ${styles.fullWidth}`}>
              <label className={styles.label}>Specificații Tehnice</label>
              <RichTextEditor
                value={techSpecs}
                onChange={setTechSpecs}
                placeholder="Scrie specificațiile tehnice..."
              />
            </div>

            {}
            <div className={`${styles.inputGroupFull} ${styles.fullWidth}`}>
              <label className={styles.label}>Documente</label>

              {existingDocs.map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ flex: 1, fontSize: "0.875rem" }}>
                    {doc.name}
                  </span>
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-primary)",
                    }}
                  >
                    Vizualizează
                  </a>
                  <button
                    type="button"
                    onClick={() => removeExistingDoc(doc.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                      padding: "0.25rem",
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {newDocs.map((doc, i) => (
                <div
                  key={`new-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                    padding: "0.5rem",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Nume document"
                    value={doc.name}
                    onChange={(e) => updateNewDoc(i, "name", e.target.value)}
                    className={styles.input}
                    style={{ flex: 1, minWidth: 0 }}
                  />
                  <input
                    type="file"
                    id={`doc-file-${i}`}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg"
                    onChange={(e) =>
                      updateNewDoc(i, "file", e.target.files?.[0] || null)
                    }
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor={`doc-file-${i}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontSize: "0.75rem",
                      color: "var(--color-primary)",
                      background: "white",
                      border: "1px dashed var(--color-primary)",
                      borderRadius: "6px",
                      padding: "0.35rem 0.6rem",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    <Plus size={12} />
                    {doc.file ? doc.file.name : "Alege fișier"}
                  </label>
                  <button
                    type="button"
                    onClick={() => removeNewDoc(i)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                      padding: "0.25rem",
                      flexShrink: 0,
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addNewDoc}
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
                }}
              >
                <Plus size={14} />
                Adaugă Document
              </button>
            </div>

            {}
            <div className={`${styles.inputGroupFull} ${styles.fullWidth}`}>
              <label className={styles.label}>Alte produse sugerate</label>

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  marginBottom: recommendedProductIds.length > 0 ? "1rem" : "0",
                }}
              >
                {recommendedProductIds.map((recId) => {
                  const p = allProducts.find((p) => p.id === recId);
                  if (!p) return null;
                  return (
                    <div
                      key={recId}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.3rem 0.6rem",
                        background: "#f3f4f6",
                        borderRadius: "999px",
                        fontSize: "0.8rem",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {p.image && (
                        <img
                          src={p.image}
                          alt=""
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: "2px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      {p.title}
                      <button
                        type="button"
                        onClick={() => removeRecommended(recId)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#9ca3af",
                          padding: 0,
                          display: "flex",
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div style={{ position: "relative" }} ref={searchRef}>
                <div style={{ position: "relative" }}>
                  <Search
                    size={16}
                    style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Caută și selectează produse..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    className={styles.input}
                    style={{ paddingLeft: "2.5rem" }}
                  />
                </div>
                {isSearchOpen && (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 50,
                      top: "100%",
                      left: 0,
                      right: 0,
                      marginTop: "0.25rem",
                      background: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {availableProducts.length > 0 ? (
                      availableProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => addRecommended(p.id)}
                          style={{
                            padding: "0.5rem 0.75rem",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            borderBottom: "1px solid #f3f4f6",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f9fafb")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          {p.image ? (
                            <img
                              src={p.image}
                              alt=""
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: "4px",
                                objectFit: "cover",
                                border: "1px solid #e5e7eb",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: "4px",
                                backgroundColor: "#f3f4f6",
                                border: "1px solid #e5e7eb",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#9ca3af",
                                fontSize: "0.6rem",
                              }}
                            >
                              —
                            </div>
                          )}
                          <span style={{ fontWeight: 500, color: "#374151" }}>
                            {p.title}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          padding: "0.75rem",
                          fontSize: "0.875rem",
                          color: "#6b7280",
                          textAlign: "center",
                        }}
                      >
                        Nu au fost găsite produse.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {}
            <div
              className={`${styles.checkboxGroup} ${styles.fullWidth}`}
              style={{ gap: "2rem", alignItems: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: "pointer",
                }}
                onClick={() => setIsRecommended(!isRecommended)}
              >
                <button
                  type="button"
                  role="switch"
                  aria-checked={isRecommended}
                  style={{
                    position: "relative",
                    width: "44px",
                    height: "24px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: isRecommended
                      ? "rgb(37, 99, 235)"
                      : "#e5e7eb",
                    transition: "background-color 0.2s",
                    padding: "0px",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: isRecommended ? "22px" : "2px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "rgb(255, 255, 255)",
                      boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px",
                      transition: "left 0.2s",
                    }}
                  />
                </button>
                <span className={styles.checkboxLabel} style={{ margin: 0 }}>
                  Afișează pe home
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onSuccess}
          className={styles.buttonCancel}
        >
          Anulează
        </button>
        <button
          type="submit"
          disabled={loading}
          className={styles.buttonSubmit}
        >
          {loading ? "Se salvează..." : "Salvează"}
        </button>
      </div>
    </form>
  );
}
