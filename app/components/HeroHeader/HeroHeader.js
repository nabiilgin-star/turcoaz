import Image, { getImageProps } from "next/image";
import Link from "next/link";
import Button from "../Button/Button";
import "./HeroHeader.css";

const HeroHeader = ({ heroSettings = [] }) => {
  const desktopImg =
    heroSettings.find((s) => s.device_type === "desktop")?.image_url ||
    "https://res.cloudinary.com/dfyvfexhc/image/upload/v1770277619/njm3k2qxmvo7fhnatut7.png";
  const mobileImg =
    heroSettings.find((s) => s.device_type === "mobile")?.image_url ||
    desktopImg ||
    "https://res.cloudinary.com/dfyvfexhc/image/upload/v1770277620/a3hkjryojkwt0bqvrgta.png";

  const common = {
    alt: "Sisteme de feronerie și sticlă",
    fill: true,
    priority: true,
    quality: 90,
    sizes: "100vw",
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: desktopImg,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: mobileImg,
  });

  return (
    <section className="hero-wrapper">
      <div className="container-max">
        <div className="hero-card">
          <picture>
            <source media="(max-width: 768px)" srcSet={mobile} />
            <source media="(min-width: 769px)" srcSet={desktop} />
            <img
              {...rest}
              className="hero-bg"
              fetchPriority="high"
              decoding="sync"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -2,
              }}
            />
          </picture>

          {}
          <div className="hero-overlay"></div>

          {}
          <div className="hero-content">
            <span className="hero-badge">
              Soluții profesionale pentru construcții
            </span>

            <h1 className="hero-title">
              Sisteme premium de feronerie și sticlă.
            </h1>

            <p className="hero-description">
              Oferim o gamă completă de produse de înaltă calitate pentru
              proiecte rezidențiale și comerciale. Experiență de peste 24 ani în
              domeniu.
            </p>

            <div className="hero-actions">
              <Link href="/contact" tabIndex={-1}>
                <Button variant="primary">Solicită ofertă →</Button>
              </Link>

              <Link href="/categorii" tabIndex={-1}>
                <Button variant="secondary">Vezi categoriile</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHeader;
