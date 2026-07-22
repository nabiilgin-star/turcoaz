import Link from "next/link";
import { ChevronRight } from "lucide-react";
import "./Breadcrumb.css";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="breadcrumb-item">
              <Link href={item.href || "#"} className="breadcrumb-link">
                {item.label}
              </Link>
              {!isLast && (
                <ChevronRight size={14} className="breadcrumb-separator" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
