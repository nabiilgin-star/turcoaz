import { Building2, Settings, Home, ShowerHead, Sparkles, Layers } from "lucide-react";

const categoryImages = [
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png", 
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784465092/accesorii_tfoc70.jpg",         
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784416492/Turcoaz_fatade_s7zdev.jpg",     
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784453837/kaheaksesuar1_u17kaf.jpg",     
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784464498/akpa-bond_epvi9m.png",         
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784464708/AKPA-LOGO_wctiyh.jpg",         
];

export const categories = [
  // 1. ANA KATEGORİ: Sisteme Aluminiu AKPA ve Alt Kategorileri
  {
    title: "Sisteme Aluminiu AKPA",
    slug: "sisteme-aluminiu-akpa",
    icon: Layers,
    image: categoryImages[5],
    subcategories: [
      {
        title: "SISTEME TAMPLARIE",
        slug: "sisteme-tamplarie",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470157/Tamplarie_mhksam.png",
        products: [
          {
            id: "glisante-s28",
            slug: "glisante-s28",
            title: "Glisante S28",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784481561/S28-2-1_dp9668.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784481561/S28-2-1_dp9668.jpg",
            description: `Sistem S28 – avantaje:\n- Sistem utilizat pentru executia de usi si ferestre glisante\n- Sistem economic de tamplarie din aluminiu, tip glisante\n- Sistem fara ruperea puntii termice\n- Posibilitatea executarii unei game largi de tipologii de constructie\n- Inchidere cu garnituri perie si garnituri EPDM\n\nSTOC:\nAlb - RAL 9016, Maro - RAL8014, Gri antracit 7016Mat, STEJAR AURIU`,
            pdfUrl: "/pdf/s28-glisanta.pdf",
            gallery: [
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784566277/AKPA_S28_RO_HD_e3xt4u.jpg",
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784481536/S28-4_s27r0e.jpg",
            ],
          },
          {
            id: "sistem-wd37",
            slug: "sistem-wd37",
            title: "Sistem WD37",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470157/Tamplarie_mhksam.png",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784485357/WD37-1_nw1wtx.jpg",
            description: `Sistem WD37 - avantaje:\n-sistem utilizat pentru executia de usi si ferestre\n-cel mai economic sistem rece de tamplarie din aluminiu\n-sistem fara ruperea puntii termice\n-posibilitatea executarii unei game largi de tipologii de constructie\n-inchidere pe trei nivele cu garnituri EPDM\n\nSTOC: Alb-RAL 9016, Maro-RAL8014, Gri antracit RAL 7016Mat, Stejar Auriu\nSTOC LIMITAT: imitatie lemn: WENGE, NUC`,
            pdfUrl: "/pdf/wd37.pdf",
            gallery: [
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784565774/WD37_HD_Letter_muct7d.jpg",
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784485360/WD37-4_ixcaqw.jpg",
            ],
          },
          {
            id: "sistem-wd50t",
            slug: "sistem-wd50t",
            title: "Sistem WD50T cu bariera termica",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784487716/WD50T-PNG-800x961_fzeeav.png",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784487716/WD50T-PNG-800x961_fzeeav.png",
            description: `Sistem WD50 - avantaje:\n-sistem utilizat pentru executia de usi si ferestre\n-sistem cald, cu ruperea puntii termice\n-sistem economic de tamplarie din aluminiu\n-posibilitatea executarii unei game largi de tipologii de constructie\n-inchidere pe trei nivele cu garnituri EPDM\n\nSTOC: Alb-RAL 9016, Maro-RAL8014, Gri antracit RAL 7016Mat, Stejar Auriu\nSTOC LIMITAT: imitatie lemn: WENGE, NUC`,
            pdfUrl: "/pdf/wd50t.pdf",
            gallery: [
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784564901/WD50T-scaled_pw2if3.jpg",
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784487721/wd50t-4_jlomp1.jpg",
            ],
          },
          {
            id: "sistem-wd70t",
            slug: "sistem-wd70t",
            title: "Sistem WD70T cu bariera termica",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784564144/WD70T-Akpa_wfaar0.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784564144/WD70T-Akpa_wfaar0.jpg",
            description: "Top de gamă în izolație termică și fonică. Sistemul WD70T este perfect optimizat pentru proiecte rezidențiale moderne ce necesită cel mai înalt nivel de eficiență energetică.",
            pdfUrl: "/pdf/wd70t.pdf",
            gallery: [
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784582884/AKPA_WD70T_RO_HD_maym7g.jpg",
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784564143/WD70T-01_qbzo94.jpg",
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784564143/WD70T-02_suoz0a.jpg",
            ],
          },
        ],
      },
      {
        title: "Profile Standard Aluminiu",
        slug: "profile-standard-aluminiu",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790428981/Profile_aluminiu_standard_vojgdy.jpg",
        products: [
          {
            id: "cornier",
            slug: "cornier",
            title: "Cornier Aluminiu (Profil L)",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790428504/profile_Cornier_olog97.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1790428504/profile_Cornier_olog97.jpg",
            description: "Cornier din aluminiu cu laturi egale sau inegale."
          },
          {
            id: "teava-rectangulara",
            slug: "teava-rectangulara",
            title: "Teava Rectangulara Aluminiu",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790428490/profile_teava_aluminiu_rectangular_rrd1se.jpg",
            description: "Profile Aluminiu Țeavă rectangulară"
          },
          {
            id: "teava-rotunda",
            slug: "teava-rotunda",
            title: "Teava Rotunda Aluminiu",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790428504/Profile_Teava_rotund_pwncn5.jpg",
            description: "Țeavă rotundă din aluminiu"
          },
          {
            id: "teava-patrata",
            slug: "teava-patrata",
            title: "Teava Patrata Aluminiu",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790428503/profile_teava_aluminiu_patrata_essstr.jpg",
            description: "Profile pătrate din aluminiu"
          },
          {
            id: "profil-U",
            slug: "profil-U",
            title: "Profil U Aluminiu",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790447666/Profile_Aluminiu_U_bl5olf.jpg",
            description: "Profil U"
          },
          {
            id: "profil-t",
            slug: "profil-t",
            title: "Profil T Aluminiu",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790527688/Profile_T_j2twek.png",
            description: "Profil din Aluminiu T"
          },
          {
            id: "platbanda",
            slug: "platbanda",
            title: "Platbanda Aluminiu (Profil Plat)",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790529146/profile_teava_aluminiu_platbanda_wfjhty.jpg",
            description: "Profile Platbandă din aluminiu"
          }
        ]
      },
      {
        title: "Perete Cortina",
        slug: "perete-cortina",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Perete-Cortina_jzrfez.jpg",
        description: "Sisteme moderne de perete cortină din aluminiu pentru fațade arhitecturale.",
      },
   {
  title: "Sistem de Gard F60 – Profile din Aluminiu",
  slug: "gard",
  icon: Layers,
  image: "https://res.cloudinary.com/oivvupgw/image/upload/v1791401513/Gard-Fence_60-2_gage5r.jpg",
  detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1791401511/Gard-Fence_60-5_syvdit.jpg",
  pdfUrl: "/pdf/gard-aluminiu.pdf",
  gallery: [
    "https://res.cloudinary.com/oivvupgw/image/upload/v1791401513/Gard-Fence_60-1_aa02aw.jpg",
    "https://res.cloudinary.com/oivvupgw/image/upload/v1791401512/Gard-Fence_60-3_kzf1s7.jpg",
    "https://res.cloudinary.com/oivvupgw/image/upload/v1791401512/Gard-Fence_60-4_jtd7sb.jpg",
    "https://res.cloudinary.com/oivvupgw/image/upload/v1791401511/Gard-Fence_60-5_syvdit.jpg"
  ],
  description: `<strong>🛡️ Sistem de Gard F60 – Profile din Aluminiu pentru Împrejmuiri Moderne</strong><br>
Căutați <strong>sistem de gard F60</strong>, <strong>gard aluminiu</strong> de înaltă calitate sau <strong>profile gard aluminiu</strong> pentru porți și împrejmuiri în România? S.C. Turcoaz Aluminiu S.R.L. oferă soluții inovatoare și durabile pentru proiecte rezidențiale și industriale. Solicitați o ofertă avantajoasă de <strong>gard aluminiu preț</strong> direct din stocul permanent din depozitul Popești-Leordeni și filiala Alufab Iași.<br><br>

<strong>⭐ Avantajele Sistemului de Gard F60</strong>
- <strong>Design Estetic și Variat:</strong> Lambriuri cu aspect diversificat ce conferă o eleganță deosebită proprietății.
- <strong>Opțiuni de Vizibilitate:</strong> Vederi pline sau cu spații libere, folosind lamele cu lățimi variate (60 - 150 mm).
- <strong>Soluții Complete pentru Porți:</strong> Compatibilitate excelentă pentru <strong>porți aluminiu</strong> batante (simple sau duble) și porți culisante de garaj.
- <strong>Intimitate și Protecție:</strong> Transformă grădinile, depozitele și spațiile deschise în zone sigure și complet protejate vizual de exterior.<br><br>

<strong>⚙️ Specificații Tehnice</strong>
- <strong>Lățime stâlp:</strong> 60 mm
- <strong>Lățime panou:</strong> 60 - 150 mm
- <strong>Grosime perete profil:</strong> 1,2 - 1,5 mm
- <strong>Adâncime panou:</strong> 14 mm
- <strong>Distanță minimă între stâlpi:</strong> 400 mm
- <strong>Distanță maximă între stâlpi:</strong> 1600 mm
- <strong>Înălțime maximă gard:</strong> 1800 mm<br><br>

<strong>🏗️ Opțiuni de Aplicare și Montaj</strong>
- Partiție tip L
- Partiție unghiulară / înclinată
- Partiție tip T
- Partiție în patru căi`,
  products: [],
  subcategories: []
},
      {
        title: "INCHIDERE TERASA",
        slug: "inchidere-terasa",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
        description: "Sisteme moderne de închidere terase cu sticlă și aluminiu.",
        products: [
          {
            id: "glisant-geam-simplu-sc100",
            slug: "glisant-geam-simplu-sc100",
            title: "Glisant Geam Simplu - SC100",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            description: "Sistem glisant din sticlă simplă SC100 pentru închidere terase.",
            pdfUrl: "/pdf/sc100.pdf"
          },
 {
    id: "glisant-geam-termopan-iscb140",
    slug: "glisant-geam-termopan-iscb140",
    title: "Sistem Culisant cu Geam Termopan ISCB140 – Închideri Terase",
    updatedAt: "2026-10-08",
    seo: {
      title: "Sistem Culisant cu Geam Termopan ISCB140 | Turcoaz Aluminiu",
      description: "Sistem culisant cu geam termopan ISCB140 pentru închideri terase și balcoane în București și România. Izolație termică superioară și stoc permanent.",
      indexable: true
    },
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1791494096/iscb140_fonfii.png",
    imageAlt: "Sistem culisant cu geam termopan ISCB140 pentru închideri terase",
    detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1791494096/iscb140_fonfii.png",
pdfUrl: "/pdf/iscb-140.pdf",    
 gallery: [
      "https://res.cloudinary.com/oivvupgw/image/upload/v1791492159/iscb140-sc100_btodeo.png",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1791491458/SCB140-4_amzmer.jpg",
    ],
    description: `
      <h2>Sistem Culisant cu Geam Termopan ISCB140 pentru Închideri Terase în București și România</h2>
      <p>Căutați un <strong>sistem culisant cu sticlă termoizolantă pentru închideri terase</strong> sau un <strong>sistem culisant pentru închideri terase cu sticlă termopan</strong>? S.C. Turcoaz Aluminiu S.R.L. furnizează sistemul premium <strong>ISCB140</strong>, proiectat pentru deschideri mari, eficiență termică ridicată, etanșare avansată și transparență arhitecturală maximă. Asigurăm stoc permanent în depozitul central din zona București / Ilfov (Popești-Leordeni) și filiala Alufab Iași, cu livrare rapidă în toată România.</p>

      <h2>Avantaje Principale – ISCB140</h2>
      <ul>
        <li><strong>Sistem Premium pentru Deschideri Mari:</strong> Proiectat special pentru performanță superioară în proiecte moderne.</li>
        <li><strong>Capacitate de Susținere:</strong> Suportă o greutate maximă de până la 90 kg pe fiecare cercevea.</li>
        <li><strong>Configurații Complexe:</strong> Suport nativ pentru sisteme cu 4 șine, configurație 4+4 cercevele, precum și montaj în formă de L și U.</li>
        <li><strong>Etanșare cu Profile Verticale:</strong> Asigură o barieră eficientă împotriva intemperiilor și a pierderilor termice între panourile de termopan.</li>
        <li><strong>Transparență Maximă și Eficiență Termică:</strong> Design contemporan care maximizează lumina naturală menținând confortul termic.</li>
      </ul>

      <h2>Specificații Tehnice Oficiale – ISCB140</h2>
      <ul>
        <li><strong>Lățime Toc:</strong> 140 mm — cadru robust optimizat pentru geam termopan.</li>
        <li><strong>Lățime Cercevea:</strong> 24 mm — profil proiectat pentru stabilitate structurală.</li>
        <li><strong>Grosime Perete Profil:</strong> 1,2 mm – 1,5 mm — rezistență mecanică superioară la vânt și utilizare intensă.</li>
        <li><strong>Grosime Vitraj / Sticlă:</strong> 20 mm (geam termopan izolant) pentru o izolare termică și fonică excelentă.</li>
        <li><strong>Dimensiuni & Capacitate Maximă:</strong> Lățime maximă cercevea 1000 mm, înălțime maximă 3000 mm și greutate maximă 90 kg per cercevea.</li>
        <li><strong>Configurație Cercevele:</strong> Sistem cu 4 șine și configurație 4+4 cercevele (4 stânga / 4 dreapta).</li>
      </ul>

      <h2>Opțiuni de Configurare</h2>
      <p>Sistemul ISCB140 excelează în proiecte arhitecturale complexe, fiind compatibil cu <strong>Balcon tip L</strong>, <strong>Balcon tip U</strong>, sistem cu 4 șine și prag, și configurație 4+4 cercevele.</p>

      <p><em>Sistemul culisant ISCB140 oferă o soluție modernă pentru închiderea balcoanelor, teraselor și spațiilor comerciale. Datorită profilului din aluminiu și suprafeței vitrate generoase, acest sistem asigură luminozitate maximă, design elegant și funcționare fiabilă pentru proiectele tale.</em> Program de calcul disponibil — primul pas clar pentru proiectul tău!</p>

      <h2>Întrebări Frecvente (FAQ)</h2>
      <p><strong>Unde se pot utiliza sistemele culisante ISCB140?</strong> Sunt ideale pentru închiderea teraselor rezidențiale, restaurantelor și a spațiilor comerciale mari din București, Ilfov, Iași și în toată România.</p>
      <p><strong>Cum se face livrarea?</strong> Expediem componentele și profilele direct din depozitul nostru din Popești-Leordeni și filiala Iași, asigurând suport logistic complet pentru parteneri și montatori.</p>
    `
  },
          {
            id: "sistem-tip-ghilotina",
            slug: "sistem-tip-ghilotina",
            title: "Sistem Tip Ghilotina",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            description: "Sistem tip ghilotină motorizat/manual pentru terase.",
            pdfUrl: "/pdf/ghilotina.pdf"
          },
          {
            id: "sistem-tip-acordeon",
            slug: "sistem-tip-acordeon",
            title: "Sistem Tip Acordeon",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            description: "Sistem tip acordeon pliabil pentru închidere spații.",
            pdfUrl: "/pdf/acordeon.pdf"
          },
          {
            id: "sistem-tip-copertina-sticla",
            slug: "sistem-tip-copertina-sticla",
            title: "Sistem Tip Copertina Sticla",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            description: "Sistem copertină din sticlă pentru protecție exterioară.",
            pdfUrl: "/pdf/copertina-sticla.pdf"
          }
        ]
      }
    ],
  },

  // 2. ANA KATEGORİ: Sisteme Balustrada
  {
    id: "sisteme-balustrada",
    slug: "sisteme-balustrada",
    title: "Sisteme Balustradă",
    icon: Building2,
    image: categoryImages[0],
    subcategories: [
      {
        id: "balustrada-de-sticla",
        slug: "balustrada-de-sticla",
        title: "Balustradă de sticlă",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784593459/Balustradasticla_n7rx1n.png",
        products: [
          {
            id: "m115",
            slug: "m115",
            title: "Sistem de balustradă din aluminiu - AKPA M115 Sistem premium",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789317643/M115-0_xvzqqq.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784671305/M115_oqr6rz.jpg",
            description: "Sisteme de Balustradă din Aluminiu și Sticlă | AKPA M115 – Sistem Premium.<br>Căutați profile din aluminiu pentru balustradă din sticlă, profil U continuu sau sisteme complete de balustradă în România? S.C. Turcoaz Aluminiu S.R.L. oferă sistemul premium AKPA M115, proiectat pentru siguranță, eleganță și durabilitate. Disponibil cu stoc permanent în depozitul din Popești‑Leordeni și în filiala regională Alufab Iași, asigurând distribuție rapidă la nivel național.<br><br>🏆 <strong style='font-size: 1rem; color: #1f2937;'>Performanță & Avantaje Tehnice – AKPA M115</strong><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Rezistență Certificată 3 kN/ml</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— profilul AKPA M115 Premium oferă rezistență structurală superioară, ideal pentru balcoane rezidențiale cu regim mare de înălțime și proiecte private.</span><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Profil U pentru Balustradă Continuă</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— sistem bazat pe profil U din aluminiu, pentru montaj curat, fixare stabilă și transparență arhitecturală maximă, fără montanți verticali.</span><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Siguranță & Estetică Modernă</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— compatibil cu sticlă securizată și stratificată, oferind un design minimalist, elegant și durabil pentru fațade și terase.</span><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Stoc & Distribuție Națională</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— disponibilitate imediată în Popești‑Leordeni și prin filiala Alufab Iași, pentru întreaga rețea de parteneri și distribuitori.</span>",
            pdfUrl: "/pdf/m115.pdf",
            gallery: [
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784676831/AkpaM115premium_may3aq.png",
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784672556/BalustradaM115_rdls45.png",
            ],
          },
          {
            id: "m90",
            slug: "m90",
            title: "Sistem de balustradă din aluminiu - AKPA M90 Sistem premium",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790026060/Balustrada_sticla_M90_lhzpom.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1790026060/Balustrada_sticla_M90_lhzpom.jpg",
            description: "Sisteme de Balustradă din Aluminiu și Sticlă | AKPA M90 – Sistem Premium.<br>Căutați profile din aluminiu pentru balustradă din sticlă, profil U continuu sau sisteme complete de balustradă în România? S.C. Turcoaz Aluminiu S.R.L. oferă sistemul premium AKPA M90, proiectat pentru siguranță, eleganță și durabilitate. Disponibil cu stoc permanent în depozitul din Popești‑Leordeni și în filiala regională Alufab Iași, asigurând distribuție rapidă la nivel național.<br><br>🏆 <strong style='font-size: 1rem; color: #1f2937;'>Performanță & Avantaje Tehnice – AKPA M90</strong><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Rezistență Certificată 3 kN/ml</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— profilul AKPA M90 Premium oferă rezistență structurală superioară, ideal pentru balcoane rezidențiale cu regim mare de înălțime și proiecte private.</span><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Profil U pentru Balustradă Continuă</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— sistem bazat pe profil U din aluminiu, pentru montaj curat, fixare stabilă și transparență arhitecturală maximă, fără montanți verticali.</span><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Siguranță & Estetică Modernă</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— compatibil cu sticlă securizată și stratificată, oferind un design minimalist, elegant și durabil pentru fațade și terase.</span><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Stoc & Distribuție Națională</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— disponibilitate imediată în Popești‑Leordeni și prin filiala Alufab Iași, pentru întreaga rețea de parteneri și distribuitori.</span>",
            pdfUrl: "/pdf/m90.pdf",
            gallery: [
              "https://res.cloudinary.com/oivvupgw/image/upload/v1790026990/Balustrada_sticla_M90_1_wmevlt.jpg",
              "https://res.cloudinary.com/oivvupgw/image/upload/v1790026795/Balustrada_sticla_m90_3_ko05xi.jpg",
            ],
          },
          {
            id: "m115f",
            slug: "m115f",
            title: "M115F",
            detailImage: "/images/m115f.jpg",
            description: "Sistem de balustradă din aluminiu M115F.",
            pdfUrl: "/pdf/m115f.pdf"
          },
          {
            id: "m125",
            slug: "m125",
            title: "M125",
            detailImage: "/images/m125.jpg",
            description: "Sistem de balustradă din aluminiu M125.",
            pdfUrl: "/pdf/m125.pdf"
          },
          {
            id: "m300",
            slug: "m300",
            title: "M300",
            detailImage: "/images/m300.jpg",
            description: "Sistem de balustradă din aluminiu M300.",
            pdfUrl: "/pdf/m300.pdf"
          },
          {
            id: "m100",
            slug: "m100",
            title: "m100",
            detailImage: "/images/m115.jpg",
            description: "Profil din aluminiu pentru balustradă de sticlă M115.",
            pdfUrl: "/pdf/m100.pdf"
          },
        ]
      },
      {
        id: "sistem-balustrada-patrat",
        slug: "sistem-balustrada-patrat",
        title: "Sistem Balustradă Pătrat",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790017321/balustrada_patrata_1_ae2fgt.jpg",
        detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
        description: "Sistem modern de balustradă din aluminiu cu profil pătrat.",
        pdfUrl: "/pdf/balustrada-patrat.pdf"
      },
      {
        id: "sistem-balustrada-rotund",
        slug: "sistem-balustrada-rotund",
        title: "Sistem Balustradă Rotund",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1790017320/balustrada_rotunda_1_dcrffw.jpg",
        detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
        description: "Sistem clasic și elegant de balustradă din aluminiu cu profil rotund.",
        pdfUrl: "/pdf/balustrada-rotund.pdf"
      },
      {
        id: "balustrada-modulara",
        slug: "balustrada-modulara",
        title: "Balustradă Modulară",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784592792/Balustrada-Modulara_ljlsyi.jpg",
        detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
        description: "Sistem modular versatil pentru balustrade din aluminiu.",
        pdfUrl: "/pdf/balustrada-modulara.pdf"
      },
      {
        id: "balustrada-fereastra-franceza-din-aluminiu",
        slug: "balustrada-fereastra-franceza-din-aluminiu",
        title: "Balustradă fereastră franceză din aluminiu",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784593787/balustradafransuzesc_hbupoa.jpg",
        detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784593787/balustradafransuzesc_hbupoa.jpg",
        description: "Sistem modern de balustradă din aluminiu pentru ferestre franceze.",
        pdfUrl: "/pdf/fereastra-franceza.pdf"
      }
    ],
  },
// 3. ANA KATEGORİ: Glafuri din Aluminiu
 // 3. ANA KATEGORİ: Glafuri din Aluminiu
  {
    title: "Glafuri din Aluminiu",
    slug: "glafuri-din-aluminiu",
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470155/pervaz6_bhmroe.png",
    detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784589354/pervaz0_afn0uf.png",
    pdfUrl: "/pdf/glafuri-aluminiu.pdf",
    price: "de la 15,50 LEI / ml", 
    gallery: [
      "https://res.cloudinary.com/oivvupgw/image/upload/v1784664028/pervazaluminiu_dtoqug.png",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1784589195/PERVAZ-TP2_gnubk0.png",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1784589429/pervaz4_lzmcdu.jpg",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1784589492/pervaz5_1_xp9use.jpg",
    ],
    description: `
      <h2>Sisteme Premium de Glafuri din Aluminiu Extrudat în București, Ilfov și România</h2>
      <p><strong>Preț:</strong> de la 15,50 LEI / ml (fără TVA)</p>
      <p>Căutați <strong>glafuri din aluminiu în București</strong>, <strong>pervazuri aluminiu Ilfov</strong> sau <strong>glafuri exterioare cu livrare în toată România</strong>? S.C. Turcoaz Aluminiu S.R.L. furnizează sisteme complete din aluminiu extrudat pentru protecția ferestrelor și a fațadelor. Asigurăm stoc permanent de peste 200 de tone în depozitul nostru central din zona București / Ilfov (Popești-Leordeni) și filiala regională Alufab Iași, oferind cel mai bun raport calitate-preț pentru <strong>glafuri aluminiu la preț de distribuitor</strong>.</p>
      
      <h2>Caracteristici Tehnice & Rezistență Structurală</h2>
      <p><strong>Culori & Finisaje Disponibile:</strong> Alb, Maro, Antracit Gri (RAL 7016), Stejar Auriu, Nuc, Wenghe, precum și vopsire electrostatică în orice culoare RAL la comandă.</p>
      <p><strong>Grosime Adaptivă Anti-Flambaj (Model TP2):</strong> Lățimi de la 75 mm până la 380 mm. La lățimi mari, grosimea peretelui crește până la 2,8 mm pentru a preveni curbarea, deformarea sau flexarea profilului în timp.</p>
      <p><strong>Protecție Împotriva Infiltrațiilor:</strong> Panta frontală integrată direcționează eficient apa de ploaie departe de tencuială, prevenind umiditatea, deteriorarea fațadei și condensul.</p>
      <p><strong>Lungimi de Bare & Acoperire Națională:</strong> Bare de 4000 mm – 7000 mm sau debitate la dimensiune, cu livrare rapidă în București, Ilfov, Iași și prin flotă proprie sau curierat în orice județ din România.</p>

      <h2>Întrebări Frecvente (FAQ)</h2>
      <p><strong>Care este avantajul modelului TP2 la lățimi mari?</strong> Spre deosebire de glafurile economice subțiri, modelul TP2 își mărește grosimea peretelui de aluminiu până la 2,8 mm la lățimi mari (până la 380 mm), oferind o rigiditate superioară și prevenind flambarea.</p>
      <p><strong>Cum se face livrarea în București, Ilfov și în țară?</strong> Expediem comenzi rapid direct din depozitul central din zona București / Ilfov (Popești-Leordeni) și din filiala Alufab Iași. Asigurăm acoperire operativă în București, Ilfov, Iași și livrare pe șantier în toată România.</p>
    `,
    products: [],
    subcategories: []
  },

  // 4. ANA KATEGORİ: ACP Aluminiu Compozit Panel (Bond)
  {
    title: "ACP Aluminiu Compozit Panel (Bond)",
    slug: "acp-aluminiu-compozit-panel-bond",
    icon: Layers,
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789252957/bond_banner_detali_pr16om.jpg",
    detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1789249202/bond_tehnic_skj3yu.jpg",
    pdfUrl: "/pdf/primebond.pdf",
    gallery: [
      "https://res.cloudinary.com/oivvupgw/image/upload/v1789252957/bond_banner_detali_pr16om.jpg",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1789249202/bond_tehnic_skj3yu.jpg",
    ],
    description: `
      <h2>Panouri Compozite Bond și Plăci Compozite pentru Fațade Ventilate</h2>
      <p>Căutați <strong>panouri compozite bond</strong>, <strong>plăci compozite aluminiu</strong> sau <strong>fațade compozite</strong> de înaltă calitate în România? S.C. Turcoaz Aluminiu S.R.L. oferă soluții moderne pentru fațade arhitecturale ventilate, placări exterioare și interioare. Verificați gama noastră de produse la cel mai bun raport calitate-preț pentru <strong>alucobond preț</strong>, direct din depozitele noastre din Popești-Leordeni și Iași.</p>

      <h2>De ce să alegi panourile noastre compozit (Bond)?</h2>
      <ul>
        <li><strong>Agrement Tehnic în România:</strong> Produse certified oficial cu agrement tehnic complet pentru proiecte civile și industriale conforme cu standardele naționale.</li>
        <li><strong>Primebond – Aluminiu Hydro Norvegia:</strong> Fabricate cu aluminiu premium importat din Norvegia (Hydro), oferind durabilitate maximă, stabilitate structurală și finisaje PVDF/HDP de top.</li>
        <li><strong>Preț Avantajos & Stoc Permanent:</strong> Costuri competitive, livrare rapidă din stoc prin rețeaua noastră regională.</li>
      </ul>
    `,
    products: [
      {
        title: "Primebond Plus",
        slug: "primebond-plus",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789287064/primebondplus_ekuawf.jpg",
        description: "<strong>Specificații tehnice:</strong><br>- Grosime tablă + vopsea: 0,47 mm + PVDF<br>- Potrivit pentru utilizare în exterior cu garanție de 20 de ani.<br>- Clasă de rezistență la foc: A2 și FR/B1.<br>- Dimensiune standard: 4 x 1250 x 3200 mm.<br>- Culori și dimensiuni personalizate la comandă.",
        pdfUrl: "/pdf/primebond.pdf"
      },
      {
        title: "Primebond",
        slug: "primebond",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789287064/primebond_uz2s35.jpg",
        description: "<strong>Specificații tehnice:</strong><br>- Grosime tablă + vopsea: 0,40 mm + PVDF<br>- Potrivit pentru utilizare în exterior cu garanție de 20 de ani.<br>- Clasă de rezistență la foc: A2 și FR/B1.<br>- Dimensiune standard: 4 x 1250 x 3200 mm.<br>- Culori și dimensiuni personalizate la comandă.",
        pdfUrl: "/pdf/primebond.pdf"
      },
      {
        title: "Durabond",
        slug: "durabond",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789287063/durabond_pl0dgq.jpg",
        description: "<strong>Specificații tehnice:</strong><br>- Grosime tablă + vopsea: 0,30 mm + HDP<br>- Potrivit pentru exterior cu garanție de 15 ani.<br>- Clasă de rezistență la foc: FR/B1.<br>- Dimensiune standard: 4 x 1250 x 3200 mm.<br>- Culori și dimensiuni la comandă.",
        pdfUrl: "/pdf/durabond.pdf"
      },
      {
        title: "Rallbond",
        slug: "rallbond",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789287064/rallbond_lapj2g.jpg",
        description: "<strong>Specificații tehnice:</strong><br>- Grosime tablă + vopsea: 0,20 mm + PE<br>- Material ideal pentru semnalistică publicitară și placări interioare.<br>- Dimensiune standard: 4 x 1250 x 3200 mm.<br>- Gamă variată de culori.",
        pdfUrl: "/pdf/rallbond.pdf"
      }
    ],
    subcategories: []
  },

  // 5. ANA KATEGORİ: Sticla Laminata Securizata
  {
    id: "sticla",
    slug: "sticla",
    title: "Sticlă Laminată Securizată",
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784593459/Balustradasticla_n7rx1n.png",
    detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1789333969/Sticla_Laminat_Securizat__tqngsn.jpg",
    pdfUrl: "/pdf/catalog-sticla.pdf",
    gallery: [
      "https://res.cloudinary.com/oivvupgw/image/upload/v1784593459/Balustradasticla_n7rx1n.png",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1789333969/Sticla_Laminat_Securizat__tqngsn.jpg",
    ],
    description: `
      <h2>Sticlă Laminată Securizată pentru Balustrade – 6.6.2 / 8.8.2 / 10.10.2</h2>
      <p>Import direct Turcia – Calitate premium, preț optim, livrare rapidă în România • Preț de la 50 € + TVA / m²</p>

      <h2>Avantajele Sticlei Securizate Turcoaz</h2>
      <ul>
        <li><strong>Import Direct:</strong> Prețuri avantajoase fără intermediari pentru <strong>sticlă laminată securizată</strong> și <strong>geam securizat</strong>.</li>
        <li><strong>Certificare EN 12600:</strong> Calitate premium garantată pentru siguranță sporită.</li>
        <li><strong>Debitare & Canturi Finisate:</strong> Finisare profesională la dimensiunile solicitate.</li>
        <li><strong>Stoc Permanent:</strong> Livrare rapidă din depozitele Popești-Leordeni și Iași pentru configurațiile 6.6.2, 8.8.2 și 10.10.2.</li>
      </ul>

      <h2>Ce este Sticla Laminată Securizată?</h2>
      <p>Sticla laminată securizată (numită și duplex) este formată din două foi de sticlă securizată unite cu folie PVB. În caz de impact, fragmentele rămân lipite de folie — nu se prăbușește și nu produce accidente.</p>

      <h2>Configurații & Utilizări Recomandate</h2>
      <p><strong>6.6.2 (≈12.76 mm):</strong> Două foi de 6 mm + 2 folii PVB – ideală pentru balustrade interioare și compartimentări.</p>
      <p><strong>8.8.2 (≈17.52 mm):</strong> Standardul de aur pentru <strong>balustradă sticlă terasă</strong>, balcon și scări. Rezistență excelentă la vânt în profilele AKPA M115.</p>
      <p><strong>10.10.2 (≈21.52 mm):</strong> Pentru trepte din sticlă, copertine și balustrade fără ramă supuse la încărcări mari.</p>

      <h2>Listă Prețuri Orientative</h2>
      <ul>
        <li><strong>6.6.2:</strong> de la 50 € + TVA / m²</li>
        <li><strong>8.8.2:</strong> de la 70 € + TVA / m²</li>
        <li><strong>10.10.2:</strong> de la 85 € + TVA / m²</li>
      </ul>
    `,
    products: [],
    subcategories: []
  },

  // 6. ANA KATEGORİ: Profile PVC
  {
    title: "Sistem de Profile PVC – EXENplast & BLANCOPLAST",
    slug: "profile-pvc",
    icon: Layers,
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1791316708/Profil-pvc-exenplat-blancoplast_skqvec.jpg",
    detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1791316708/Profil-pvc-exenplat-blancoplast_skqvec.jpg",
    pdfUrl: "/pdf/exen_catalog_2026.pdf",
    gallery: [
      "https://res.cloudinary.com/oivvupgw/image/upload/v1791317993/EXENPLAST-6040_qtryzg.jpg",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1791318248/EXENPLAST-6040_2_yfzqlb.jpg",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1791317993/EXENPLAST-6040_1_vo5lvj.jpg",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1791318395/EXENPLAST-6040_3_qycvuk.jpg",
    ],
    description: `
      <h2>Sistem de Profile PVC EXENplast & BLANCOPLAST – Soluții Premium pentru Uși și Ferestre</h2>
      <p>Căutați <strong>profile PVC fără plumb</strong>, sisteme ecologice cu 4, 5 sau 6 camere și soluții de <strong>tâmplărie PVC</strong> în România? S.C. Turcoaz Aluminiu S.R.L. oferă profile PVC de înaltă calitate cu stoc permanent disponibil în depozitele noastre din Popești-Leordeni și Iași.</p>

      <h2>Avantajele Profilelor PVC EXEN</h2>
      <ul>
        <li><strong>100% Fără Plumb (Lead-Free):</strong> Formule 100% ecologice ce respectă mediul și cerințele europene.</li>
        <li><strong>Izolație Fonică și Termică Superioară:</strong> Coeficienți Uf optimizați (Uf = 1.432 W/m²K) și protecție acustică ridicată.</li>
        <li><strong>Stabilitate și Armătură Unificată:</strong> Oțel unificat pentru toc, aripă și teu pentru rezistență mecanică sporită.</li>
      </ul>
    `,
    products: [
      {
        title: "EXEN 6040A (60 mm - 4 Camere)",
        slug: "exen-6040a",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1791321887/exenplast_6040_4_jt9iax.jpg",
        description: "<strong>Specificații tehnice:</strong><br>- Lățime profil: 60 mm | Număr camere: 4 camere<br>- Coeficient izolație termică: Uf = 1.432 W/m²K<br>- Izolare acustică: Până la 58 dB<br>- Grosime vitrare: 5 mm – 24 mm<br>- Coduri principale: Toc 6040A-10 (1.024 gr/m), Aripă 6040A-20 (1.237 gr/m), Teu 6040A-30 (1.151 gr/m).",
        pdfUrl: "/pdf/exen_catalog_2026.pdf"
      }
    ],
    subcategories: []
  },
];