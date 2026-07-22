"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./admin-form.module.css";
import ImageUpload from "./ImageUpload";
import { translateError } from "@/app/lib/errorUtils";


export default function SubcategoryForm({
  categories,
  subcategories = [],
  action,
  initialData = {},
  onSuccess,
  simplified = false,
  flat = false,
}) {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    initialData.category_id || "",
  );

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await action(formData);
      toast.success("Subcategorie salvată cu succes!");
      if (onSuccess) onSuccess();
    } catch (e) {
      toast.error(translateError(e));
      setLoading(false);
    }
  };

  
  
  const possibleParents = subcategories.filter(
    (s) => s.category_id === selectedCategory && s.id !== initialData.id,
  );

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
              name="parent_id"
              value={initialData.parent_id || ""}
            />
          </>
        ) : (
          <>
            <div className={styles.inputGroup}>
              <label htmlFor="category_id" className={styles.label}>
                Categorie
              </label>
              <select
                name="category_id"
                id="category_id"
                required
                defaultValue={initialData.category_id || ""}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.select}
              >
                <option value="" disabled>
                  Selectează o categorie
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    disabled={cat.products && cat.products.length > 0}
                  >
                    {cat.name}{" "}
                    {cat.products && cat.products.length > 0
                      ? "(Conține produse)"
                      : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="parent_id" className={styles.label}>
                Subcategorie Părinte (opțional)
              </label>
              <select
                name="parent_id"
                id="parent_id"
                defaultValue={initialData.parent_id || ""}
                className={styles.select}
              >
                <option value="">— Nivel principal —</option>
                {(() => {
                  const flatten = (subs, level = 0) => {
                    let results = [];
                    subs.forEach((s) => {
                      if (s.id === initialData.id) return; 
                      results.push(
                        <option
                          key={s.id}
                          value={s.id}
                          disabled={s.products && s.products.length > 0}
                        >
                          {"\u00A0".repeat(level * 4)}↳ {s.name}{" "}
                          {s.products && s.products.length > 0
                            ? "(Conține produse)"
                            : ""}
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
                  
                  
                  
                  
                  const categorySubs = subcategories.filter(
                    (s) => s.category_id === selectedCategory,
                  );
                  const buildTree = (list, parentId = null) => {
                    return list
                      .filter((s) => s.parent_id === parentId)
                      .map((s) => ({
                        ...s,
                        subcategories: buildTree(list, s.id),
                      }));
                  };
                  const tree = buildTree(categorySubs);
                  return flatten(tree);
                })()}
              </select>
            </div>
          </>
        )}

        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
          <label htmlFor="name" className={styles.label}>
            Nume Subcategorie
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            defaultValue={initialData.name}
            className={styles.input}
          />
        </div>

        {}

        <div className={styles.inputGroupFull}>
          <label className={styles.label}>Imagine</label>
          <ImageUpload initialImage={initialData.image} name="image" />
        </div>
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
