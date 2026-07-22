"use client";

import { useState, useRef } from "react";
import { updateSetting, updateHeroSetting } from "@/app/actions/settings";
import toast from "react-hot-toast";
import styles from "@/app/components/admin/admin-form.module.css";
import pageStyles from "@/app/admin/admin-page.module.css";
import {
  Plus,
  X,
  Laptop,
  Smartphone,
  Settings as SettingsIcon,
  Image as ImageIcon,
} from "lucide-react";

export default function SettingsClient({
  contactImage,
  announcementText,
  announcementActive,
  heroSettings,
}) {
  const [activeTab, setActiveTab] = useState("contact");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isAnnActive, setIsAnnActive] = useState(announcementActive === "true");

  
  const [preview, setPreview] = useState(contactImage);
  const fileInputRef = useRef(null);

  
  const desktopHero = heroSettings.find(
    (s) => s.device_type === "desktop",
  )?.image_url;
  const mobileHero = heroSettings.find(
    (s) => s.device_type === "mobile",
  )?.image_url;

  const [desktopPreview, setDesktopPreview] = useState(desktopHero);
  const [mobilePreview, setMobilePreview] = useState(mobileHero);
  const desktopInputRef = useRef(null);
  const mobileInputRef = useRef(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setSaved(false);
    try {
      const type = formData.get("form_type");
      if (type === "contact") {
        await updateSetting("contact_image", formData);
      } else if (type === "announcement") {
        const text = formData.get("value");
        const active = isAnnActive ? "true" : "false";

        await Promise.all([
          updateSetting("announcement_text", text),
          updateSetting("announcement_active", active),
        ]);
      } else if (type === "hero_desktop") {
        await updateHeroSetting("desktop", formData);
      } else if (type === "hero_mobile") {
        await updateHeroSetting("mobile", formData);
      }

      setSaved(true);
      toast.success("Setări salvate cu succes!");
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      toast.error("Eroare: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.header}>
        <h1 className={pageStyles.title}>Setări Site</h1>
      </div>

      <div
        className="settings-tabs"
        style={{
          display: "flex",
          gap: "1.5rem",
          marginBottom: "2rem",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "0.5rem",
          overflowX: "auto",
        }}
      >
        {[
          { id: "contact", label: "Imagine Contact", icon: ImageIcon },
          { id: "announcement", label: "Anunț Site", icon: SettingsIcon },
          { id: "hero_desktop", label: "Hero Desktop", icon: Laptop },
          { id: "hero_mobile", label: "Hero Mobile", icon: Smartphone },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 0.25rem",
              fontSize: "0.9rem",
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? "#2563eb" : "#6b7280",
              background: "none",
              border: "none",
              borderBottom:
                activeTab === tab.id
                  ? "2px solid #2563eb"
                  : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              marginBottom: "-0.6rem",
              whiteSpace: "nowrap",
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="settings-content">
        {activeTab === "contact" && (
          <div style={{ flex: 1 }}>
            <h3
              style={{
                marginBottom: "1.5rem",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Imagine Formular Contact
            </h3>
            <form
              action={handleSubmit}
              className={`${styles.form} ${styles.flat}`}
            >
              <input type="hidden" name="form_type" value="contact" />
              <div className={styles.inputGroupFull}>
                <label className={styles.label}>Imagine</label>
                <input
                  type="file"
                  name="image"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
                <div
                  onClick={() => !preview && fileInputRef.current?.click()}
                  style={{
                    width: "100%",
                    minHeight: "150px",
                    borderRadius: "var(--radius-md)",
                    border: preview
                      ? "1px solid #e5e7eb"
                      : "2px dashed #d1d5db",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: preview ? "#000" : "#f9fafb",
                    cursor: preview ? "default" : "pointer",
                  }}
                >
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Contact Preview"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreview(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          right: "0.5rem",
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", color: "#6b7280" }}>
                      <Plus
                        size={32}
                        style={{ margin: "0 auto 0.5rem", color: "#9ca3af" }}
                      />
                      <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                        Apasă pentru a alege imaginea
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.buttonSubmit}
                >
                  {loading
                    ? "Se salvează..."
                    : saved
                      ? "✓ Salvat!"
                      : "Salvează"}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "announcement" && (
          <div style={{ flex: 1 }}>
            <h3
              style={{
                marginBottom: "1.5rem",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Anunț Global (Banner)
            </h3>
            <form
              action={handleSubmit}
              className={`${styles.form} ${styles.flat}`}
            >
              <input type="hidden" name="form_type" value="announcement" />
              <div
                className={styles.inputGroup}
                style={{ marginBottom: "1.5rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                  }}
                >
                  <label
                    htmlFor="announcement_active"
                    className={styles.label}
                    style={{ marginBottom: 0, cursor: "pointer" }}
                  >
                    Activează banner-ul pe site
                  </label>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isAnnActive}
                    onClick={() => setIsAnnActive(!isAnnActive)}
                    style={{
                      position: "relative",
                      width: "44px",
                      height: "24px",
                      borderRadius: "12px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: isAnnActive ? "#2563eb" : "#d1d5db",
                      transition: "background-color 0.2s ease",
                      padding: 0,
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "2px",
                        left: isAnnActive ? "22px" : "2px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        transition: "left 0.2s ease",
                      }}
                    />
                  </button>
                </div>
              </div>
              <div className={styles.inputGroupFull}>
                <label htmlFor="announcement_text" className={styles.label}>
                  Mesaj Anunț
                </label>
                <textarea
                  name="value"
                  id="announcement_text"
                  rows={4}
                  defaultValue={announcementText}
                  className={styles.textarea}
                  placeholder="Ex: Livrare gratuită..."
                  style={{ width: "100%" }}
                />
              </div>
              <div className={styles.actions}>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.buttonSubmit}
                >
                  {loading
                    ? "Se salvează..."
                    : saved
                      ? "✓ Salvat!"
                      : "Salvează"}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "hero_desktop" && (
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <Laptop size={20} color="#6b7280" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
                Imagine Hero Desktop
              </h3>
            </div>
            <form
              action={handleSubmit}
              className={`${styles.form} ${styles.flat}`}
            >
              <input type="hidden" name="form_type" value="hero_desktop" />
              <div className={styles.inputGroupFull}>
                <input
                  type="file"
                  name="image"
                  ref={desktopInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setDesktopPreview(URL.createObjectURL(file));
                  }}
                />
                <div
                  onClick={() =>
                    !desktopPreview && desktopInputRef.current?.click()
                  }
                  style={{
                    width: "100%",
                    minHeight: "200px",
                    borderRadius: "var(--radius-md)",
                    border: desktopPreview
                      ? "1px solid #e5e7eb"
                      : "2px dashed #d1d5db",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: desktopPreview ? "#000" : "#f9fafb",
                    cursor: desktopPreview ? "default" : "pointer",
                  }}
                >
                  {desktopPreview ? (
                    <>
                      <img
                        src={desktopPreview}
                        alt="Desktop Hero"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDesktopPreview(null);
                          if (desktopInputRef.current)
                            desktopInputRef.current.value = "";
                        }}
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          right: "0.5rem",
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", color: "#6b7280" }}>
                      <Plus
                        size={32}
                        style={{ margin: "0 auto 0.5rem", color: "#9ca3af" }}
                      />
                      <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                        Apasă pentru Desktop
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.buttonSubmit}
                >
                  {loading
                    ? "Se salvează..."
                    : saved
                      ? "✓ Salvat!"
                      : "Salvează"}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "hero_mobile" && (
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <Smartphone size={20} color="#6b7280" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
                Imagine Hero Mobile
              </h3>
            </div>
            <form
              action={handleSubmit}
              className={`${styles.form} ${styles.flat}`}
            >
              <input type="hidden" name="form_type" value="hero_mobile" />
              <div className={styles.inputGroupFull}>
                <input
                  type="file"
                  name="image"
                  ref={mobileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setMobilePreview(URL.createObjectURL(file));
                  }}
                />
                <div
                  onClick={() =>
                    !mobilePreview && mobileInputRef.current?.click()
                  }
                  style={{
                    width: "100%",
                    minHeight: "200px",
                    borderRadius: "var(--radius-md)",
                    border: mobilePreview
                      ? "1px solid #e5e7eb"
                      : "2px dashed #d1d5db",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: mobilePreview ? "#000" : "#f9fafb",
                    cursor: mobilePreview ? "default" : "pointer",
                  }}
                >
                  {mobilePreview ? (
                    <>
                      <img
                        src={mobilePreview}
                        alt="Mobile Hero"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobilePreview(null);
                          if (mobileInputRef.current)
                            mobileInputRef.current.value = "";
                        }}
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          right: "0.5rem",
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", color: "#6b7280" }}>
                      <Plus
                        size={32}
                        style={{ margin: "0 auto 0.5rem", color: "#9ca3af" }}
                      />
                      <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                        Apasă pentru Mobile
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.buttonSubmit}
                >
                  {loading
                    ? "Se salvează..."
                    : saved
                      ? "✓ Salvat!"
                      : "Salvează"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
