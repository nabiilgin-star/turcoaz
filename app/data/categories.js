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
    {
    name: "Sisteme Aluminiu AKPA",
    slug: "sisteme-aluminiu-akpa",
    icon: Layers,
    image: categoryImages[5],
    subcategories: [
      {
        name: "SISTEME TAMPLARIE",
        slug: "sisteme-tamplarie",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470157/Tamplarie_mhksam.png",
        products: [
          {
            id: "glisante-s28",
            slug: "glisante-s28",
            name: "Glisante S28",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470157/Tamplarie_mhksam.png",
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
            name: "Sistem WD37",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470157/Tamplarie_mhksam.png",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784485357/WD37-1_nw1wtx.jpg",
            description: `Sistem WD37 - avantaje:\n-sistem utilizat pentru executia de usi si ferestre\n-cel mai economic sistem rece de tamplarie din aluminiu\n-sistem fara ruperea puntii termice\n-posibilitatea executarii unei game largi de tipologii de constructie\n-inchidere pe trei nivele cu garnituri EPDM\n\nSTOC: Alb-RAL 9016, Maro-RAL8014, Gri antracit RAL 7016Mat, Stejar Auriu\nSTOC LIMITAT: imitatie lemn: WENGE, NUC`,
            pdfUrl: "/pdf/WD37.pdf",
            gallery: [
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784565774/WD37_HD_Letter_muct7d.jpg",
              "https://res.cloudinary.com/oivvupgw/image/upload/v1784485360/WD37-4_ixcaqw.jpg",
            ],
          },
          {
            id: "sistem-wd50t",
            slug: "sistem-wd50t",
            name: "Sistem WD50T cu bariera termica",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470157/Tamplarie_mhksam.png",
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
            name: "Sistem WD70T cu bariera termica",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470157/Tamplarie_mhksam.png",
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
        name: "Glafuri din Aluminiu",
        slug: "glafuri-din-aluminiu",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470155/pervaz6_bhmroe.png",
        detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784589354/pervaz0_afn0uf.png",
        description: "Sisteme Premium de Glafuri din Aluminiu Extrudat | Pervazuri Profesionale pentru Ferestre.<br>Căutați glafuri din aluminiu, pervazuri din aluminiu de înaltă calitate, pervaz aluminiu sau glaf aluminiu pentru ferestre în România? S.C. Turcoaz Aluminiu S.R.L. oferă soluții durabile și estetice pentru tâmplărie PVC și aluminiu, cu stoc permanent în depozitul din Popești-Leordeni și filiala regională Alufab din Iași, asigurând o rețea extinsă de distribuție la nivel național.<br><br>🏆 <strong style='font-size: 1rem; color: #1f2937;'>Caracteristici Tehnice & Finisaje Disponibile</strong><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Culori & Finisaje Populare</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— gamă diversificată de nuanțe: Alb, Maro, Antracit Gri, Stejar Auriu, Nuc și Wenghe, plus opțiunea de vopsire în orice culoare RAL dorită.</span><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Dimensiuni & Grosime Robuste</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— opțiuni variate de lățime a profilului între 75 mm și 380 mm, cu o grosime a peretelui cuprinsă între 1,4 mm și 2,5 mm în funcție de configurație.</span><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Lungimi Extinse & Distribuție Națională</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— bare cu lungimi cuprinse între 4000 mm și 7000 mm, livrate rapid prin rețeaua noastră din Popești-Leordeni și filiala Alufab Iași.</span><br><br>• <strong style='font-size: 0.9rem; color: #111827; text-decoration: none;'>Protecție Împotriva Infiltrațiilor</strong> <span style='font-size: 0.85rem; color: #4b5563;'>— panta frontală direcționează eficient scurgerea apei spre exterior, prevenind infiltrațiile în perete, pierderile termice și condensul.</span>",
        gallery: [
          "https://res.cloudinary.com/oivvupgw/image/upload/v1784664028/pervazaluminiu_dtoqug.png",
          "https://res.cloudinary.com/oivvupgw/image/upload/v1784589195/PERVAZ-TP2_gnubk0.png",
          "https://res.cloudinary.com/oivvupgw/image/upload/v1784589429/pervaz4_lzmcdu.jpg",
          "https://res.cloudinary.com/oivvupgw/image/upload/v1784589492/pervaz5_1_xp9use.jpg",
        ],
      },
      {
        name: "Perete Cortina",
        slug: "perete-cortina",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Perete-Cortina_jzrfez.jpg",
      },
      {
        name: "Gard",
        slug: "gard",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784469591/gard_mxrzvx.jpg",
      },
     {
        name: "INCHIDERE TERASA",
        slug: "inchidere-terasa",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
        products: [
          {
            id: "glisant-geam-simplu-sc100",
            slug: "glisant-geam-simplu-sc100",
            name: "Glisant Geam Simplu - SC100",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            description: "Sistem glisant din sticlă simplă SC100 pentru închidere terase.",
            pdfUrl: "/pdf/sc100.pdf"
          },
          {
            id: "glisant-geam-termopan-iscb140",
            slug: "glisant-geam-termopan-iscb140",
            name: "Glisant Geam Termopan - ISCB140",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            description: "Sistem glisant cu geam termopan ISCB140 pentru închidere terase.",
            pdfUrl: "/pdf/iscb140.pdf"
          },
          {
            id: "sistem-tip-ghilotina",
            slug: "sistem-tip-ghilotina",
            name: "Sistem Tip Ghilotina",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            description: "Sistem tip ghilotină motorizat/manual pentru terase.",
            pdfUrl: "/pdf/ghilotina.pdf"
          },
          {
            id: "sistem-tip-acordeon",
            slug: "sistem-tip-acordeon",
            name: "Sistem Tip Acordeon",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            description: "Sistem tip acordeon pliabil pentru închidere spații.",
            pdfUrl: "/pdf/acordeon.pdf"
          },
          {
            id: "sistem-tip-copertina-sticla",
            slug: "sistem-tip-copertina-sticla",
            name: "Sistem Tip Copertina Sticla",
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Terase-1_macqv3.jpg",
            description: "Sistem copertină din sticlă pentru protecție exterioară.",
            pdfUrl: "/pdf/copertina-sticla.pdf"
          }
        ]
      },
      {
        name: "DIVERSE Profile Aluminiu",
        slug: "diverse-profile-aluminiu",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470156/Diverse-Aluminiu-1_j8s9po.png",
      },
    ],
  },
 {
    id: "sisteme-balustrada",
    slug: "sisteme-balustrada",
    name: "Sisteme Balustradă",
    icon: Building2,
    image: categoryImages[0],
    subcategories: [
      {
        id: "balustrada-de-sticla",
        slug: "balustrada-de-sticla",
        name: "Balustradă de sticlă",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784593459/Balustradasticla_n7rx1n.png",
        products: [
          {
            id: "m115",
            slug: "m115",
            name: "Sistem de balustradă din aluminiu - AKPA M115 Sistem premium",
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
            id: "m115f",
            slug: "m115f",
            name: "M115F",
            detailImage: "/images/m115f.jpg",
            description: "Sistem de balustradă din aluminiu M115F.",
            pdfUrl: "/pdf/m115f.pdf"
          },
          {
            id: "m125",
            slug: "m125",
            name: "M125",
            detailImage: "/images/m125.jpg",
            description: "Sistem de balustradă din aluminiu M125.",
            pdfUrl: "/pdf/m125.pdf"
          },
          {
            id: "m300",
            slug: "m300",
            name: "M300",
            detailImage: "/images/m300.jpg",
            description: "Sistem de balustradă din aluminiu M300.",
            pdfUrl: "/pdf/m300.pdf"
          },
          {
            id: "m90",
            slug: "m90",
            name: "M90",
            detailImage: "/images/m90.jpg",
            description: "Sistem de balustradă din aluminiu M90.",
            pdfUrl: "/pdf/m90.pdf"
          },
          {
            id: "m100",
            slug: "m100",
            name: "m100",
            detailImage: "/images/m115.jpg",
            description: "Profil din aluminiu pentru balustradă de sticlă M115.",
            pdfUrl: "/pdf/m100.pdf"
          },
        ]
      },
      {
        id: "sistem-balustrada-patrat",
        slug: "sistem-balustrada-patrat",
        name: "Sistem Balustradă Pătrat",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784592793/balustradeQ40_tlo5tc.png",
        detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
        description: "Sistem modern de balustradă din aluminiu cu profil pătrat.",
        pdfUrl: "/pdf/balustrada-patrat.pdf"
      },
      {
        id: "sistem-balustrada-rotund",
        slug: "sistem-balustrada-rotund",
        name: "Sistem Balustradă Rotund",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784592793/balustrada-rotund-p-1_kggcuh.jpg",
        detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
        description: "Sistem clasic și elegant de balustradă din aluminiu cu profil rotund.",
        pdfUrl: "/pdf/balustrada-rotund.pdf"
      },
      {
        id: "balustrada-modulara",
        slug: "balustrada-modulara",
        name: "Balustradă Modulară",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784592792/Balustrada-Modulara_ljlsyi.jpg",
        detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
        description: "Sistem modular versatil pentru balustrade din aluminiu.",
        pdfUrl: "/pdf/balustrada-modulara.pdf"
      },
      {
        id: "balustrada-fereastra-franceza-din-aluminiu",
        slug: "balustrada-fereastra-franceza-din-aluminiu",
        name: "Balustradă fereastră franceză din aluminiu",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784593787/balustradafransuzesc_hbupoa.jpg",
        detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784593787/balustradafransuzesc_hbupoa.jpg",
        description: "Sistem modern de balustradă din aluminiu pentru ferestre franceze.",
        pdfUrl: "/pdf/fereastra-franceza.pdf"
      }
    ],
  },
    
  {
    name: "ACP Aluminiu Compozit Panel (Bond)",
    slug: "acp-aluminiu-compozit-panel-bond",
    icon: Layers,
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789252957/bond_banner_detali_pr16om.jpg",
    detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1789249202/bond_tehnic_skj3yu.jpg",
    gallery: [
      "https://res.cloudinary.com/oivvupgw/image/upload/v1789252957/bond_banner_detali_pr16om.jpg",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1789249202/bond_tehnic_skj3yu.jpg",
    ],
    description: `Panouri Compozit (Bond) și Plăci Compozit pentru Fațade – Calitate Superioară și Avantaje Majore în România.
Căutați plăci compozit, panou compozit sau profile din aluminiu pentru fațade de înaltă calitate în România? S.C. Turcoaz Aluminiu S.R.L. oferă soluții moderne pentru fațade arhitecturale ventilate, placări exterioare și interioare, cu stoc permanent disponibil în depozit.

🏆 De ce să alegi panourile noastre compozit (Bond)?
• Agrement Tehnic în România — produse certificate oficial și dețin agrement tehnic complet pentru proiecte civile și industriale conforme cu standardele naționale.
• Primebond – Aluminiu Hydro Norvegia — panourile compozit sunt fabricate cu aluminiu premium importat din Norvegia (Hydro), oferind durabilitate maximă, stabilitate structurală și finisaje PVDF/HDP de top.
• Preț Avantajos & Stoc Disponibil — costuri mai avantajoase comparativ cu competitori precum Geplast, livrare rapidă din stoc prin rețeaua noastră din Popești-Leordeni și filiala Alufab Iași.`,
    products: [
      {
        name: "Primebond Plus",
        slug: "primebond-plus",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789287064/primebondplus_ekuawf.jpg",
        description: "Specificații tehnice:\n• Grosime tablă + vopsea: 0,47 mm + PVDF\n• Potrivit pentru utilizare în exterior și beneficiază de o garanție de 20 de ani.\n• Poate fi fabricat în categoriile de rezistență la foc A2 și FR/B1.\n• Dimensiunile standard sunt 4*1250*3200mm.\n• Culori și dimensiuni personalizate sunt disponibile.",
        pdfUrl: "/pdf/primebond.pdf"
      },
      {
        name: "Primebond",
        slug: "primebond",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789287064/primebond_uz2s35.jpg",
        description: "Specificații tehnice:\n• Grosime tablă + vopsea: 0,40 mm + PVDF\n• Potrivit pentru utilizare în exterior și beneficiază de o garanție de 20 de ani.\n• Poate fi fabricat în categoriile de rezistență la foc A2 și FR/B1.\n• Dimensiunile standard sunt 4*1250*3200mm.\n• Culori și dimensiuni personalizate sunt disponibile.",
        pdfUrl: "/pdf/primebond.pdf"
      },
      {
        name: "Durabond",
        slug: "durabond",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789287063/durabond_pl0dgq.jpg",
        description: "Specificații tehnice:\n• Grosime tablă + vopsea: 0,30 mm + HDP\n• Potrivit pentru utilizare în exterior și beneficiază de o garanție de 15 ani.\n• Poate fi fabricat în categoriile de rezistență la foc FR/B1.\n• Dimensiunile standard sunt 4*1250*3200mm.\n• Culori și dimensiuni personalizate sunt disponibile.",
        pdfUrl: "/pdf/durabond.pdf"
      },
      {
        name: "Rallbond",
        slug: "rallbond",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789287064/rallbond_lapj2g.jpg",
        description: "Specificații tehnice:\n• Grosime tablă + vopsea: 0,20 mm + PE\n• Acesta este material publicitar și nu trebuie utilizat pe fațadele exterioare.\n• Dimensiunile standard sunt 4*1250*3200mm.\n• Culori și dimensiuni personalizate sunt disponibile.",
        pdfUrl: "/pdf/rallbond.pdf"
      }
    ],
    subcategories: []
  },
  {
  id: "sticla",
  slug: "sticla",
  name: "Sticlă Laminată Securizată",
  image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784593459/Balustradasticla_n7rx1n.png",
  detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1789333410/Sticla_Securizat_Laminat_oqzt4b.png", // İstersen buraya stı̇cla görseli ekleyebilirsin
  description: `🛡️ Sticlă Laminată Securizată pentru Balustrade – 6.6.2 / 8.8.2 / 10.10.2
Import direct Turcia – Calitate premium, preț optim, livrare rapidă în România • Preț de la 50 € + TVA / m²

⭐ Avantajele Noastre 
• Import direct Turcia → prețuri fără intermediari
• Calitate premium certificată EN 12600
• Preț de la 50 € + TVA / m²
• Debitare la comandă + canturi finisate profesional
• Consultanță tehnică pentru balustrade, trepte și fațade
• Livrare rapidă în toată România (Popești-Leordeni + Iași)
• Stoc permanent pentru 6.6.2 / 8.8.2 / 10.10.2

🔍 Ce este Sticla Laminată Securizată?
Sticla laminată securizată (numită și duplex) este formată din două foi de sticlă securizată unite cu folie PVB.
În caz de impact, fragmentele rămân lipite de folie — nu se prăbușește, nu cade, nu produce accidente.

📏 Configurații Disponibile
• 6.6.2 (≈12.76 mm) – două foi de 6 mm + 2 folii PVB
• 8.8.2 (≈17.52 mm) – două foi de 8 mm + 2 folii PVB
• 10.10.2 (≈21.52 mm) – două foi de 10 mm + 2 folii PVB
Explicație simplă: 8.8.2 = 8 mm + 8 mm + 2 folii PVB → panou de ~17.5 mm, ideal pentru balustrade.

🏗️ Utilizări Recomandate
• Balustrade interioare → 6.6.2 / 8.8.2
• Balustrade exterioare → 8.8.2 / 10.10.2
• Trepte din sticlă → 10.10.2 / 12.12.2
• Fațade, copertine, vitraje mari → 8.8.2 / 10.10.2

🥇 Recomandarea Tehnică
Pentru balustrade montate în profil U din aluminiu: 8.8.2 este standardul de aur. Nu vibrează, nu flexează, rezistă la vânt și se potrivește perfect în profilele AKPA M115.

💰 Prețuri (SEO + Conversie)
• 6.6.2 → de la 50 € + TVA / m²
• 8.8.2 → de la 70 € + TVA / m²
• 10.10.2 → de la 85 € + TVA / m²
*(Prețurile pot varia în funcție de cantitate, finisaje și complexitatea proiectului.)*

📦 Detalii Comerciale
• Prețurile sunt exprimate pe m², fără TVA
• Comenzile sub 3 m² → +10%
• Panourile sub 0.5 m² → se facturează 0.5 m²
• Termen execuție: 10–20 zile lucrătoare
• Ridicare din depozit sau livrare cu auto propriu
• Dimensiunile se transmit în scris: L x H x nr. bucăți
• Responsabilitatea dimensiunilor aparține clientului

📘 Foaie de Produs – 6.6.2
Clar + Clar – canturi finisate. Ideală pentru balustrade rezidențiale, copertine mici, uși interioare cu cerințe de siguranță.

📘 Foaie de Produs – 8.8.2
Clar + Clar – 17.52 mm. Cea mai folosită sticlă pentru balustrade premium, terase, scări, spații publice.

📘 Foaie de Produs – 10.10.2
Clar + Clar – 21.52 mm. Pentru trepte, balustrade fără ramă, proiecte expuse la vânt puternic.`,
  
}
];