"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";
import styles from "./admin-form.module.css";

export default function MultiImageUpload({
  initialImages = [],
  onFilesChange, 
  onExistingChange, 
}) {
  
  const safeInitialImages = Array.isArray(initialImages)
    ? initialImages
    : initialImages
      ? [initialImages]
      : [];

  const [existingImages, setExistingImages] = useState(safeInitialImages);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    
    
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = [...selectedFiles, ...files];
      setSelectedFiles(newFiles);
      onFilesChange && onFilesChange(newFiles);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeExisting = (index) => {
    const valid = existingImages.filter((_, i) => i !== index);
    setExistingImages(valid);
    onExistingChange && onExistingChange(valid);
  };

  const removeNew = (index) => {
    const valid = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(valid);
    onFilesChange && onFilesChange(valid);
  };

  return (
    <div className={styles.imageUploadContainer}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        style={{ display: "none" }}
      />

      <div className={styles.multiPreviewGrid}>
        {}
        {existingImages.map((url, i) => (
          <div key={`existing-${i}`} className={styles.miniPreviewWrapper}>
            <img src={url} alt="Existing" className={styles.miniPreview} />
            <button
              type="button"
              onClick={() => removeExisting(i)}
              className={styles.removeMiniButton}
            >
              <X size={10} />
            </button>
          </div>
        ))}

        {}
        {selectedFiles.map((file, i) => (
          <div key={`new-${i}`} className={styles.miniPreviewWrapper}>
            <img
              src={URL.createObjectURL(file)}
              alt="New"
              className={styles.miniPreview}
            />
            <button
              type="button"
              onClick={() => removeNew(i)}
              className={styles.removeMiniButton}
            >
              <X size={10} />
            </button>
          </div>
        ))}

        {}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={styles.addMorePlaceholder}
        >
          <Plus size={24} />
        </div>
      </div>

      <p className={styles.helperText}>Poți selecta mai multe imagini.</p>
    </div>
  );
}
