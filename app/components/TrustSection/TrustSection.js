import Image from "next/image";
import { CheckCircle2, ShieldCheck, Target, ArrowRight } from "lucide-react";
import "./TrustSection.css";

const TrustSection = () => {
  // İlk bölümün (Despre Turcoaz) güncel cephe resmi
  const imgAbout = "https://res.cloudinary.com/oivvupgw/image/upload/v1784416492/Turcoaz_fatade_s7zdev.jpg";
  
  // Ürünlerin Özel Görsel URL'leri (GÜNCELLENDİ)
  const imgAkpa = "https://res.cloudinary.com/oivvupgw/image/upload/v1784464708/AKPA-LOGO_wctiyh.jpg";
  const imgGlaf = "https://res.cloudinary.com/oivvupgw/image/upload/v1784664028/pervazaluminiu_dtoqug.png";
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
      Turcoaz Aluminiu SRL activează din 2011 în distribuția de profile și
      sisteme din aluminiu și PVC pentru construcții. Acționarii companiei
      au peste 24 de ani de experiență în domeniul sistemelor de tâmplărie
      din aluminiu și PVC.
    </p>

    <p className="paragraph-normal">
      Suntem importator și distribuitor unic al profilelor din aluminiu AKPA
      în România, precum și distribuitor unic al profilelor PVC EXENplast și
      BlancoPlast. Comercializăm profile din aluminiu, glafuri exterioare,
      panouri compozite Bond, sisteme de balustrade, profile PVC, feronerie
      și sisteme din sticlă KAHE. Vindem peste 150 de tone lunar și
      menținem un stoc permanent de peste 200 de tone.
    </p>
  </div>

  <div className="block-image-wrapper">
    <div className="premium-image-container">
      <Image
        src={imgAbout}
        alt="Fațadă și depozit Turcoaz Aluminiu"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="premium-img"
      />
    </div>
  </div>
</div>

<hr className="premium-divider" />

        {/* SECȚIUNEA 3: Portofoliul Nostru de Produse */}
        <div className="section-block">
          <span className="section-badge">Gama Noastră</span>
          <h2 className="section-title margin-bottom-lg">Portofoliul Nostru de Produse</h2>
          
          <div className="products-detailed-grid">
            
            {/* 1. AKPA Aluminiu */}
            <div className="portfolio-card span-2">
              <div className="card-split">
                <div className="split-text">
                  <h3>Profile din Aluminiu AKPA – Distribuitor Unic în România</h3>
<p>
  Turcoaz Aluminiu este importator și distribuitor unic al profilelor din aluminiu AKPA în România. La nivelul companiei, vindem peste 150 de tone lunar și menținem un stoc permanent de peste 200 de tone. Din portofoliul AKPA oferim sisteme de tâmplărie pentru uși și ferestre, sisteme glisante, pereți cortină, garduri, sisteme de închidere a teraselor, profile standard din aluminiu extrudat, glafuri exterioare și panouri compozite Bond, destinate proiectelor rezidențiale, comerciale și industriale.
</p>

                </div>
                <div className="split-image">
                  <Image src={imgAkpa} alt="Profile din Aluminiu AKPA" fill className="premium-img" />
                </div>
              </div>
            </div>
{/* Glafuri din aluminiu AKPA */}
<div className="portfolio-card span-2">
  <div className="card-split">
    <div className="split-text">
      <h3>Glafuri exterioare AKPA din aluminiu pentru ferestre</h3>
      <p>
        Glafurile exterioare AKPA din aluminiu extrudat protejează fațada
        împotriva infiltrațiilor și evacuează apa departe de fereastră. Sunt
        disponibile în lățimi de 75–380 mm, în culorile RAL 9016, RAL 8014 și
        RAL 7016, precum și în finisajele Stejar Auriu, Nuc și Wenghe. Se
        debitează la dimensiunea solicitată și se livrează din stoc în toată
        România.
      </p>
      <ul className="premium-bullet-list row-layout margin-top-sm">
        <li><span>Lățimi: 75–380 mm</span></li>
        <li><span>RAL 9016, 8014, 7016</span></li>
        <li><span>Stejar Auriu, Nuc, Wenghe</span></li>
        <li><span>Debitare la dimensiune</span></li>
        <li><span>Livrare din stoc în toată România</span></li>
      </ul>
    </div>
    <div className="split-image">
      <Image
        src={imgGlaf}
        alt="Glaf exterior din aluminiu AKPA montat sub fereastră"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="premium-img"
      />
    </div>
  </div>
</div>

            {/* 3. Panouri Compozite */}
            <div className="portfolio-card span-2">
              <div className="card-split">
                <div className="split-text">
                  <h3>Panouri Compozite din Aluminiu (Bond)</h3>
<p>
 Comercializăm panouri compozite din aluminiu AKPA Bond, PrimeBond, PrimeBond Plus, DuraBond și RallBond, disponibile într-o gamă variată de culori și finisaje. Panourile PrimeBond sunt fabricate cu tablă de aluminiu Hydro din Norvegia. Produsele sunt potrivite pentru fațade ventilate, placări exterioare, reclame și amenajări comerciale.
</p>
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

            {/* 4. KAHE Sticlă */}
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

           {/* 5. Profile PVC */}
<div className="portfolio-card span-2">
  <div className="card-split">
    <div className="split-text">
      <h3>Profile PVC – Distribuitor Unic EXENplast & BlancoPlast în România</h3>
      <p>
        Suntem distribuitor autorizat și unic în România pentru brandurile 
        <strong> EXENplast</strong> și <strong>BlancoPlast</strong>. Oferim profile PVC 
        pentru ferestre și uși PVC, fabricate la standarde europene.
      </p>
    </div>
    <div className="split-image">
      <Image 
        src={imgPvc} 
        alt="Profile PVC EXENplast si BlancoPlast Romania" 
        fill 
        className="premium-img" 
      />
    </div>
  </div>
</div>

            {/* 6. Feronerie */}
            <div className="portfolio-card span-2">
              <div className="card-split">
                <div className="split-text">
                  <h3>Feronerie și Accesorii pentru Tâmplărie</h3>
                  <p>
  Comercializăm feronerie, accesorii și soluții de etanșare pentru tâmplăria din aluminiu și PVC, destinate producției și montajului de ferestre și uși.
</p>
                </div>
                <div className="split-image">
                  <Image src={imgFeronerie} alt="Feronerie și Accesorii" fill className="premium-img" />
                </div>
              </div>
            </div>

            {/* 7. Balustrade Aluminiu */}
            <div className="portfolio-card span-2">
              <div className="card-split">
                <div className="split-text">
                  <h3>Sisteme și Balustrade din Aluminiu & Sticlă</h3>
<p>
 Comercializăm sisteme de balustrade din aluminiu și sticlă, însoțite de Agrement Tehnic și de toate accesoriile necesare montajului. Din stoc permanent livrăm finisajele Eloxat Argintiu, Eloxat Maro și Gri Antracit (RAL 7016), iar culorile speciale se execută la comandă. Oferim modele cu profile pătrate și rotunde, balustrade modulare și balustrade din sticlă, cu livrare în toată România.
</p>
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
    <h2 className="section-title">Certificări și Atestări</h2>

    <h3>Certificări ale companiei</h3>
    <ul className="premium-bullet-list margin-y-sm">
      <li className="with-icon">
        <ShieldCheck size={18} className="icon-teal" />
        <span><strong>ISO 9001:2015</strong> – Managementul calității</span>
      </li>
      <li className="with-icon">
        <ShieldCheck size={18} className="icon-teal" />
        <span><strong>ISO 14001:2015</strong> – Managementul mediului</span>
      </li>
    </ul>

    <h3>Agrement Tehnic pentru produse</h3>
    <p className="text-muted">
      Sistemele de balustrade din aluminiu și panourile compozite Bond sunt
      livrate cu Agrement Tehnic, document care atestă conformitatea lor
      pentru utilizarea în construcții în România. La cerere, transmitem
      fișele tehnice și documentele de conformitate pentru produsul
      achiziționat.
    </p>
  </div>
          {/* Dreapta: Misiune */}
          <div className="info-block-wrapper">
            <span className="section-badge">Strategie</span>
            <h2 className="section-title">Misiunea Noastră</h2>
<p>
  Misiunea noastră este să oferim partenerilor soluții complete și produse de calitate pentru proiecte din domeniul construcțiilor, printr-un portofoliu diversificat, stocuri permanente și suport tehnic de specialitate.
</p>
<ul className="premium-bullet-list variant-clean">
  <li><span>• Dezvoltăm parteneriate durabile în România și pe piețele internaționale.</span></li>
  <li><span>• Extindem rețeaua de distribuție pentru a fi mai aproape de clienții noștri.</span></li>
  <li><span>• Investim în pregătirea echipei și în îmbunătățirea serviciilor.</span></li>
  <li><span>• Oferim soluții adaptate cerințelor fiecărui proiect.</span></li>
  <li><span>• Urmărim o dezvoltare sustenabilă, bazată pe încredere și profesionalism.</span></li>
</ul>
            <p className="margin-top-sm border-left-box">
              Turcoaz Aluminiu SRL urmărește să atingă competențe de top în coordonarea și execuția lucrărilor de construcții civile și industriale, finalizând proiectele rapid, eficient și la cele mai avantajoase condiții pentru clienți.
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
              <li><CheckCircle2 size={16} /> Gamă variată de produse disponibile pentru livrare</li>
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
              Promovăm o comunicare transparentă și promptă cu partenerii noștri, oferind 
    suport tehnic dedicat pentru ca fiecare proiect să se realizeze rapid, 
    eficient și în cele mai bune condiții economice.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustSection;