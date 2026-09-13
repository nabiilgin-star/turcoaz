import { Building2, Settings, Home, ShowerHead, Sparkles, Layers } from "lucide-react";

// Tümü senin güvenli Cloudinary (oivvupgw) hesabına yönlendirildi
const productImages = [
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784416492/Turcoaz_fatade_s7zdev.jpg",
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784464498/akpa-bond_epvi9m.png",
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784453837/kaheaksesuar1_u17kaf.jpg",
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784465915/EXENplast-Logo_zc4i40.png",
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784465092/accesorii_tfoc70.jpg",
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png",
];

const categoryImages = [
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784407768/SistemeBalustrada_etapaj.png", // Balustrade
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784465092/accesorii_tfoc70.jpg",         // Feronerie
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784416492/Turcoaz_fatade_s7zdev.jpg",    // Închidere terase / Fațade
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784453837/kaheaksesuar1_u17kaf.jpg",    // Cabine duș / KAHE
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784464498/akpa-bond_epvi9m.png",        // Alte produse
  "https://res.cloudinary.com/oivvupgw/image/upload/v1784464708/AKPA-LOGO_wctiyh.jpg",        // AKPA Logo
];

export const categories = [
  {
    name: "Sisteme închidere terase",
    slug: "inchidere-terase",
    icon: Home,
    image: categoryImages[2],
    subcategories: [
      {
        name: "Sistem tip sliding",
        slug: "sistem-sliding",
        image: productImages[0],
      },
      {
        name: "Sistem tip Ghilotina",
        slug: "sistem-ghilotina",
        image: productImages[0],
      },
      {
        name: "Sistem tip Acordeon",
        slug: "sistem-acordeon",
        image: productImages[0],
      },
      {
        name: "Sisteme pereți cortină",
        slug: "pereti-cortina",
        image: productImages[0],
      },
      {
        name: "Sisteme copertine sticlă",
        slug: "copertine-sticla",
        image: productImages[2],
      },
      {
        name: "Riflaje",
        slug: "riflaje",
        image: productImages[1],
      },
    ],
  },
  {
    name: "Cabine de duș",
    slug: "cabine-dus",
    icon: ShowerHead,
    image: categoryImages[3],
    subcategories: [
      {
        name: "Cabine uși batante",
        slug: "cabine-usi-batante",
        image: productImages[2],
      },
      {
        name: "Cabine uși glisante",
        slug: "cabine-usi-glisante",
        image: productImages[2],
      },
      {
        name: "Paravane duș",
        slug: "paravane-dus",
        image: productImages[2],
      },
    ],
  },
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
            pdfUrl: "/pdf/S28-Glisanta.pdf",
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
        description: "SISTEME PREMIUM DE GLAFURI DIN ALUMINIU EXTRUDAT\n-Se poate picta în culorile RAL dorite.\n-Opțiuni de lățime a profilului de până la 75 mm-380 mm.\n-Grosimea peretelui profilului este cuprinsă între 1,4 mm și 2,5 mm.\n-Lungimile profilului pot fi de 4000mm-7000mm.\n-Itensionează scurgerea apei spre pervazurile ferestrelor cu înclinarea înclinată în față.\n-Oferă o oportunitate de a preveni izolarea termică și condensarea.\n-Este atașat pentru a preveni scurgerile de apă în perete din interior și exterior",
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
      },
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
            image: "https://res.cloudinary.com/oivvupgw/image/upload/v1784671305/M115_oqr6rz.jpg",
            detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784671305/M115_oqr6rz.jpg",
            description: "Sistem de balustradă din aluminiu - AKPA M115 Sistem premium, proiectat pentru cei care caută siguranță, eleganță și durabilitate în amenajările moderne. Profilul din aluminiu AKPA M115 Premium oferă o rezistență certificată de 3 kN/ml, fiind ideal atât pentru balcoanele clădinilor rezidențiale cu regim mare de înălțime, cât și pentru proiectele rezidențiale private.",
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
      }
    ],
  },
 {
    name: "ACP Aluminiu Compozit Panel (Bond)",
    slug: "acp-aluminiu-compozit-panel-bond",
    icon: Layers,
    image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789252957/bond_banner_detali_pr16om.jpg",
    detailImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1789249202/bond_tehnic_skj3yu.jpg",
    description: "Avantajele Panoului Compozit Panoul compozit reprezintă soluția modernă și eficientă pentru fațade premium, oferind un echilibru ideal între estetică, performanță și costuri pe termen lung. Panoul compozit oferă design flexibil, greutate redusă și rezistență ridicată. Asigură planeitate perfectă, gamă variată de culori și montaj rapid. Acoperă imperfecțiunile, nu ruginește, este sigur seismic, ecologic și economic pe termen lung.", 
    gallery: [
      "https://res.cloudinary.com/oivvupgw/image/upload/v1789252957/bond_banner_detali_pr16om.jpg",
      "https://res.cloudinary.com/oivvupgw/image/upload/v1789249202/bond_tehnic_skj3yu.jpg"
    ],
    // En altta yer alacak 4 marka ve altlarında PDF katalogları:
    products: [
      {
        name: "Primebond Plus",
        slug: "primebond-plus",
        image: "https://res.cloudinary.com/oivvupgw/image/upload/v1789287064/primebondplus_ekuawf.jpg",
        description: "Specificații tehnice:\n• Grosime tablă + vopsea: 0,47 mm + PVDF\n• Potrivit pentru utilizare în exterior și beneficiază de o garanție de 20 de ani.\n• Poate fi fabricat în categoriile de rezistență la foc A2 și FR/B1.\n• Dimensiunile standard sunt 4*1250*3200mm.\n• Culori și dimensiuni personalizate sunt disponibile.",
        pdfUrl: "/pdf/primebond-plus.pdf"
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
  }
];
    