"use client";

import { useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Undo2,
  Redo2,
  RemoveFormatting,
} from "lucide-react";

const TOOLBAR_BUTTONS = [
  { cmd: "bold", icon: Bold, title: "Bold" },
  { cmd: "italic", icon: Italic, title: "Italic" },
  { cmd: "underline", icon: Underline, title: "Underline" },
  { cmd: "insertUnorderedList", icon: List, title: "Listă" },
  { cmd: "insertOrderedList", icon: ListOrdered, title: "Listă numerotată" },
  { cmd: "formatBlock_h2", icon: Heading2, title: "Heading 2" },
  { cmd: "formatBlock_h3", icon: Heading3, title: "Heading 3" },
  { cmd: "formatBlock_blockquote", icon: Quote, title: "Citat" },
  { cmd: "undo", icon: Undo2, title: "Undo" },
  { cmd: "redo", icon: Redo2, title: "Redo" },
  { cmd: "removeFormat", icon: RemoveFormatting, title: "Șterge formatare" },
];

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);
  const initializedRef = useRef(false);

  const handleRef = useCallback(
    (node) => {
      editorRef.current = node;
      if (node && !initializedRef.current) {
        node.innerHTML = value || "";
        initializedRef.current = true;
      }
    },
    [value],
  );

  const execCommand = (cmd) => {
    if (cmd.startsWith("formatBlock_")) {
      const tag = cmd.replace("formatBlock_", "");
      document.execCommand("formatBlock", false, tag);
    } else {
      document.execCommand(cmd, false, null);
    }
    editorRef.current?.focus();
    fireChange();
  };

  const fireChange = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "0.375rem",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2px",
          padding: "0.35rem 0.5rem",
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        {TOOLBAR_BUTTONS.map(({ cmd, icon: Icon, title }) => (
          <button
            key={cmd}
            type="button"
            title={title}
            onMouseDown={(e) => {
              e.preventDefault(); 
              execCommand(cmd);
            }}
            style={{
              background: "none",
              border: "1px solid transparent",
              borderRadius: "4px",
              cursor: "pointer",
              padding: "0.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#374151",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e5e7eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>

      {}
      <div
        ref={handleRef}
        contentEditable
        onInput={fireChange}
        onBlur={fireChange}
        data-placeholder={placeholder || "Scrie aici..."}
        style={{
          minHeight: "150px",
          padding: "0.75rem 1rem",
          outline: "none",
          fontSize: "0.875rem",
          lineHeight: "1.6",
          color: "#1f2937",
          fontFamily: "inherit",
        }}
        suppressContentEditableWarning
      />
    </div>
  );
}
