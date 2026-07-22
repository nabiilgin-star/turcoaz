"use client";

import React from "react";
import Modal from "./Modal";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmare",
  message = "Ești sigur că vrei să continui?",
  confirmText = "Șterge",
  cancelText = "Anulează",
  isDanger = true,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div style={{ paddingBottom: "1rem" }}>
        <p
          style={{
            color: "#4b5563",
            marginBottom: "1.5rem",
            fontSize: "0.95rem",
          }}
        >
          {message}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              background: "#fff",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              padding: "0.5rem 1rem",
              background: isDanger ? "#ef4444" : "#3b82f6",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: 500,
              color: "#fff",
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
