import Image from "next/image";
import { CheckCircle2, ShieldCheck, Target, ArrowRight } from "lucide-react";
import "./TrustSection.css";

const TrustSection = () => {
  // İlk bölümün (Despre Turcoaz) güncel cephe resmi
  const imgAbout = "https://res.cloudinary.com/oivvupgw/image/upload/v1784416492/Turcoaz_fatade_s7zdev.jpg";
  
  // Ürünlerin Özel Görsel URL'leri (GÜNCELLENDİ)
  const imgAkpa = "https://res.cloudinary.com/oivvupgw/image/upload/v1784464708/AKPA-LOGO_wctiyh.jpg";
  const imgBond = "https://res.cloudinary.com/oivvupgw/image/upload/v1784464498/akpa-bond_epvi9m.png";
  const imgProducts = "https://res.cloudinary.com/oivvupgw/image/upload/v1784453837/kaheaksesuar1_u17kaf.jpg"; // KAHE
  const imgPvc = "https://res.cloudinary.com/oivvupgw/image/upload/v1784465915/EXENplast-Logo_zc4i40.png";       // Exen Plast PVC Logosu Yeni!
  const imgFeronerie = "https://res.cloudinary.com/oivvupgw/image/upload/v1784465092/accesorii_tfoc70.jpg";
  const imgBalustrade = "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png";

  return (
    <section className="about-premium-section">
      <div className="container-max">
        
        {/* SECȚIUNEA 1: Despre Turcoaz Aluminiu SRL */}
        <div className="section-block grid-2col">
          <div className="block-content">
            <span className="section-badge">Prezentare Companie</span>
            <h2 className="section-title">Despre Turcoaz Aluminiu SRL</h2>
            <p className="paragraph-lead">
              Turcoaz Aluminiu SRL face parte dintr-un grup de companii cu tradiție în industria aluminiului și a sistemelor pentru construcții, fondat în anul 2002. Cu o experiență cumulată de peste 24 de ani, acționariatul a construit o reputație solidă bazată pe profesionalism, inovație și parteneriate durabile.
            </p>
            <p className="paragraph-normal">
              Astăzi, compania este un furnizor de referință pe piața materialelor pentru fațade, tâmplărie, sisteme din sticlă și soluții arhitecturale premium, oferind clienților o gamă completă de produse certificate și servicii specializate.
            </p>
          </div>
          <div className="block-image-wrapper">
            <div className="premium-image-container">
              <Image src={imgAbout} alt="Turcoaz Aluminiu" fill className="premium-img" />
            </div>
          </div>
        </div>

        <hr className="premium-divider" />

        {/* SECȚIUNEA 2: Portofoliul Nostru de Produse */}
        <div className="section-block">
          <span className="section-badge">Gama Noastră</span>
          <h2 className="section-title margin-bottom-lg">Portofoliul Nostru de Produse</h2>
          
          <div className="products-detailed-grid">
            
            {/* 1. AKPA Aluminiu */}
            <div className="portfolio-card span-2">
              <div className="card-split">
                <div className="split-text">
                  <h3>Profile din Aluminiu AKPA – Distribuitor Unic în România</h3>
                  <p>Oferim profile din aluminiu marca AKPA, recunoscute pentru rezistență, precizie și versatilitate. Gama include profile pentru aplicații industriale, comerciale și rezidențiale, precum și sisteme pentru ferestre și uși Exen Plast.</p>
                </div>
                <div className="split-image">
                  <Image src={imgAkpa} alt="Profile din Aluminiu AKPA" fill className="premium-img" />
                </div>
              </div>
            </div>

            {/* 2. Panouri Compozite */}
            <div className="portfolio-card span-2">
              <div className="card-split">
                <div className="split-text">
                  <h3>Panouri Compozite din Aluminiu</h3>
                  <p>Pentru proiecte arhitecturale moderne, punem la dispoziție panouri compozite premium:</p>
                  <ul className="premium-bullet-list row-layout">
                    <li><span>AKPA Bond</span></li>
                    <li><span>PrimeBond</span></li>
                    <li><span>DuraBond</span></li>
                    <li><span>RallBond</span></li>
                  </ul>
                  <p className="margin-top-sm italic-text">Acestea sunt ideale pentru fațade ventilate, placări decorative și proiecte comerciale de mare impact vizual.</p>
                </div>
                <div className="split-image">
                  <Image src={imgBond} alt="Panouri Compozite" fill className="premium-img" />
                </div>
              </div>
            </div>

            {/* 3. KAHE Sticlă */}
            <div className="portfolio-card span-2">
              <div className="card-split">
                <div className="split-text">
                  <h3>Sisteme din Sticlă – KAHE</h3>
                  <p>Distribuim componente și sisteme complete pentru proiecte din sticlă:</p>
                  <ul className="premium-bullet-list grid-2col-list">
                    <li><ArrowRight size={14} /> <span>Uși din sticlă</span></li>
                    <li><ArrowRight size={14} /> <span>Cabine de duș</span></li>
                    <li><ArrowRight size={14} /> <span>Sisteme de compartimentare</span></li>
                    <li><ArrowRight size={14} /> <span>Feronerie și accesorii</span></li>
                    <li><ArrowRight size={14} /> <span>Sisteme glisante</span></li>
                    <li><ArrowRight size={14} /> <span>Balustrade din sticlă</span></li>
                  </ul>
                  <p className="margin-top-md text-highlight">Produsele KAHE sunt concepute pentru proiecte premium, unde estetica și funcționalitatea trebuie să se îmbine perfect.</p>
                </div>
                <div className="split-image">
                  <Image src={imgProducts} alt="KAHE Glass Systems" fill className="premium-img" />
                </div>
              </div>
            </div>

            {/* 4. Profile PVC */}
            <div className="portfolio-card span-2">
              <div className="card-split">
                <div className="split-text">
                  <h3>Profile PVC – Distribuitor Unic în România</h3>
                  <p>Suntem distribuitor unic pentru profile PVC destinate realizării ferestrelor și ușilor, oferind produse conforme standardelor europene și cerințelor actuale ale pieței.</p>
                </div>
                <div className="split-image">
                  <Image src={imgPvc} alt="Profile PVC Exen Plast" fill className="premium-img" />
                </div>
              </div>
            </div>

            {/* 5. Feronerie */}
            <div className="portfolio-card span-2">
              <div className="card-split">
                <div className="split-text">
                  <h3>Feronerie și Accesorii pentru Tâmplărie</h3>
                  <p>Oferim feronerie, accesorii și soluții de etanșare pentru realizarea geamului termopan, asigurând compatibilitate completă cu sistemele din aluminiu și PVC.</p>
                </div>
                <div className="split-image">
                  <Image src={imgFeronerie} alt="Feronerie și Accesorii" fill className="premium-img" />
                </div>
              </div>
            </div>

            {/* 6. Balustrade Aluminiu */}
            <div className="portfolio-card span-2">
              <div className="card-split">
                <div className="split-text">
                  <h3>Balustrade din Aluminiu</h3>
                  <p>Comercializăm balustrade din aluminiu în diverse culori și configurații, împreună cu toate accesoriile necesare montajului.</p>
                </div>
                <div className="split-image">
                  <Image src={imgBalustrade} alt="Balustrade din Aluminiu" fill className="premium-img" />
                </div>
              </div>
            </div>

          </div>
        </div>

        <hr className="premium-divider" />

        {/* SECȚIUNEA 3: Certificări & Misiune */}
        <div className="section-block grid-2col alignment-top">
          
          {/* Stânga: Certificări */}
          <div className="info-block-wrapper">
            <span className="section-badge">Standarde</span>
            <h2 className="section-title">Certificări Internaționale</h2>
            <p>Deținem certificările:</p>
            <ul className="premium-bullet-list margin-y-sm">
              <li className="with-icon"><ShieldCheck size={18} className="icon-teal" /> <span><strong>ISO 9001:2015</strong> – Managementul calității</span></li>
              <li className="with-icon"><ShieldCheck size={18} className="icon-teal" /> <span><strong>ISO 14001:2015</strong> – Managementul mediului</span></li>
            </ul>
            <p className="text-muted">Aceste standarde confirmă angajamentul nostru pentru calitate, siguranță și responsabilitate față de mediu.</p>
          </div>

          {/* Dreapta: Misiune */}
          <div className="info-block-wrapper">
            <span className="section-badge">Strategie</span>
            <h2 className="section-title">Misiunea Noastră</h2>
            <p>Ne propunem ca în următorii ani să:</p>
            <ul className="premium-bullet-list variant-clean">
              <li><span>• Dezvoltăm colaborări cu parteneri din România și din străinătate.</span></li>
              <li><span>• Extindem rețeaua de puncte de lucru pentru a fi mai aproape de clienți.</span></li>
              <li><span>• Investim în instruirea echipei pentru a crește calitatea serviciilor.</span></li>
              <li><span>• Oferim servicii excelente, adaptate fiecărui proiect.</span></li>
              <li><span>• Construim o afacere durabilă, profitabilă și orientată spre viitor.</span></li>
            </ul>
            <p className="margin-top-sm border-left-box">
              Turcoaz Trading SRL urmărește să atingă competențe de top în coordonarea și execuția lucrărilor de construcții civile și industriale, finalizând proiectele rapid, eficient și la cele mai avantajoase condiții pentru clienți.
            </p>
          </div>

        </div>

        <hr className="premium-divider" />

        {/* SECȚIUNEA 4: Ce Oferim & Cum Lucrăm */}
        <div className="section-block grid-2col alignment-top">
          
          {/* Ce Oferim */}
          <div className="features-box-dark">
            <h3 className="box-title">Ce Oferim</h3>
            <ul className="box-list">
              <li><CheckCircle2 size={16} /> Soluții personalizate pentru fiecare proiect</li>
              <li><CheckCircle2 size={16} /> Consultanță tehnică de specialitate</li>
              <li><CheckCircle2 size={16} /> Transport la cerere</li>
              <li><CheckCircle2 size={16} /> Raport excelent calitate–preț</li>
              <li><CheckCircle2 size={16} /> Produse certificate și durabile</li>
            </ul>
          </div>

          {/* Cum Lucrăm */}
          <div className="features-box-light">
            <span className="section-badge">Filozofia Noastră</span>
            <h3 className="box-title-light">Cum Lucrăm</h3>
            <p className="paragraph-lead">
              Promovăm o comunicare constantă cu partenerii noștri și oferim consultanță dedicată, astfel încât produsele și serviciile noastre să depășească așteptările clienților.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustSection;