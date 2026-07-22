"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import Link from "next/link";
import "./ProductTabs.css";
import "./quill-content.css";

const ProductTabs = ({ description, technical_specifications, documents }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="product-tabs-section">
      <div className="tabs-header">
        <button
          className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Descriere
        </button>
        <button
          className={`tab-btn ${activeTab === "specs" ? "active" : ""}`}
          onClick={() => setActiveTab("specs")}
        >
          Specificații Tehnice
        </button>
        <button
          className={`tab-btn ${activeTab === "docs" ? "active" : ""}`}
          onClick={() => setActiveTab("docs")}
        >
          Documente
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "description" && (
          <div className="tab-pane fade-in">
            {description ? (
              <div
                className="quill-content"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <p className="tab-text">
                Acest produs face parte din gama premium Kahe, fiind testat
                riguros pentru a rezista la condiții dificile de utilizare.
              </p>
            )}
          </div>
        )}

        {activeTab === "specs" && (
          <div className="tab-pane fade-in">
            {technical_specifications ? (
              <div
                className="quill-content"
                dangerouslySetInnerHTML={{ __html: technical_specifications }}
              />
            ) : (
              <p className="tab-text">
                Nu există specificații tehnice detaliate momentan.
              </p>
            )}
          </div>
        )}

        {activeTab === "docs" && (
          <div className="tab-pane fade-in">
            {documents && documents.length > 0 ? (
              <>
                <h3 className="docs-title">Documente Disponibile</h3>
                <div className="docs-list">
                  {documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={`/api/documents/${doc.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      <FileText size={18} /> {doc.name}
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <p className="tab-text">
                Nu există documente disponibile pentru acest produs.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
