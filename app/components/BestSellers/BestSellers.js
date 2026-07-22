import ProductCard from "./ProductCard";
import "./BestSellers.css";

const BestSellers = ({ products = [] }) => {
  return (
    <section id="best-sellers" className="best-sellers-section">
      <div className="container-max">
        <h2 className="section-title">Cele mai cumparate</h2>
        <div className="products-grid">
          {products
            .filter((p) => p.is_recommended)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
