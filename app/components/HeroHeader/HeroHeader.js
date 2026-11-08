
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
    alt: "Turcoaz Aluminiu – profile din aluminiu, sisteme AKPA și soluții pentru construcții",
    fill: true,
    priority: true,
    quality: 85,
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
                zIndex: 0,
              }}
            />
          </picture>

          <div className="hero-overlay"></div>

          <div className="hero-content">
            <span className="hero-badge">
              Distribuitor unic AKPA în România
            </span>

            <h1 className="hero-title">
               Profile din aluminiu și PVC, glafuri, panouri compozite Bond și sticlă 
            </h1>

            <p className="hero-description">
  Vindem peste 150 de tone lunar și menținem un stoc permanent de peste
  200 de tone de profile din aluminiu și PVC, glafuri, panouri compozite
  Bond și sisteme din sticlă. Activăm din 2011, iar acționariatul nostru
  are peste 24 de ani de experiență în domeniul sistemelor de tâmplărie
  din aluminiu și PVC. Livrăm în toată România.
</p>
<div className="hero-actions">
  <Button href="/contact" variant="primary">
    Solicită ofertă →
  </Button>

  <Button href="/categorii" variant="secondary">
    Vezi categoriile
  </Button>
</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHeader;
