"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./admin-form.module.css";
import ImageUpload from "./ImageUpload";
import { translateError } from "@/app/lib/errorUtils";


export default function CategoryForm({
  action,
  initialData = {},
  onSuccess,
  flat = false,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await action(formData);
      toast.success("Categorie salvată cu succes!");
      if (onSuccess) onSuccess();
    } catch (e) {
      toast.error(translateError(e));
      setLoading(false);
    }
  };

  return (
    <form
      action={handleSubmit}
      className={`${styles.form} ${flat ? styles.flat : ""}`}
    >
      <div className={styles.grid}>
        <div className={styles.inputGroupFull}>
          <label htmlFor="name" className={styles.label}>
            Nume Categorie
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
