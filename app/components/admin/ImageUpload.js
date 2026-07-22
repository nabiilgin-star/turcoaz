"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";
import styles from "./admin-form.module.css";

export default function ImageUpload({ initialImage, name = "image" }) {
  const [preview, setPreview] = useState(initialImage);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(initialImage);
  }, [initialImage]);

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.imageUploadContainer}>
      <input
        type="file"
        name={name}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      {}
      {!preview && <input type="hidden" name="current_image" value="" />}
      {preview && !fileInputRef.current?.value && (
        <input type="hidden" name="current_image" value={preview} />
      )}

      {preview ? (
        <div className={styles.miniPreviewWrapper}>
          <img src={preview} alt="Preview" className={styles.miniPreview} />
          <button
            type="button"
            onClick={handleRemove}
            className={styles.removeMiniButton}
          >
            <X size={10} />
          </button>
        </div>
      ) : (
        <div onClick={handleContainerClick} className={styles.uploadSquare}>
          <Plus size={24} />
        </div>
      )}
    </div>
  );
}
