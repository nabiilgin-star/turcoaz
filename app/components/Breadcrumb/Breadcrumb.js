import Link from "next/link";
import { ChevronRight } from "lucide-react";
import "./Breadcrumb.css";

const Breadcrumb = ({ items }) => {
  // Ardışık aynı isme (label) sahip olan elemanları temizliyoruz
  const uniqueItems = items.filter(
    (item, index, arr) => index === 0 || item.label !== arr[index - 1].label
  );

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol className="breadcrumb-list">
        {uniqueItems.map((item, index) => {
          const isLast = index === uniqueItems.length - 1;

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