import Image from "next/image";
import Link from "next/link";

export default function CategoryView({ category }) {
  const items = category.subcategories || category.products || [];

  return (
    <section>
      <div className="catalog-header" style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        padding: "24px 32px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
      }}>
        <div className="catalog-title-group">
          <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#0F172A", display: "flex", alignItems: "center", gap: "12px", margin: 0 }}>
            {category.name} 
            {items.length > 0 && (
              <span style={{ background: "#E6F7FA", color: "#0088A5", fontSize: "14px", padding: "4px 12px", borderRadius: "30px", fontWeight: "700" }}>
                {items.length} modele
              </span>
            )}
          </h1>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px"
      }}>
         {items.map((sub, index) => (
          <Link
            key={index}
            href={`/categorii/${category.slug}/${sub.slug}`}
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease"
            }}
          >
            <div style={{ width: "100%", height: "220px", background: "#F1F5F9", overflow: "hidden", position: "relative" }}>
              <Image
                src={
                  sub.image ||
                  "https://images.unsplash.com/photo-1631626244439-d349340623bd?auto=format&fit=crop&w=500&q=60"
                }
                alt={sub.name}
                width={500}
                height={500}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
              <div>
                <span style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", lineHeight: "1.4", marginBottom: "8px", display: "block" }}>
                  {sub.name}
                </span>
                {sub.description && (
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "16px" }}>
                    {sub.description}
                  </p>
                )}
              </div>

              <span style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "12px",
                background: "#00A8CC",
                color: "#FFFFFF",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Vezi detalii →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}