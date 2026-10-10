export const siteConfig = {
  domain: "https://turcoaz.com",
  companyName: "S.C. Turcoaz Aluminiu S.R.L.",
  locale: "ro_RO",
ogImage: "https://res.cloudinary.com/oivvupgw/image/upload/v1784470155/pervaz6_bhmroe.png", // Veya 1200x630 kurumsal banner görseli
};

export const pages = {
  // --- KURUMSAL SAYFALAR ---
  home: {
    path: "/",
    title: "Turcoaz Aluminiu – Profile Aluminiu, Tâmplărie și Garduri",
    description: "Distribuitor autorizat de profile din aluminiu AKPA, sticlă securizată, glafuri și sisteme de gard F60 în Popești-Leordeni și Iași.",
    indexable: true,
  },
  categorii: {
    path: "/categorii",
    title: "Categorii Produse – Profile Aluminiu și Accesorii | Turcoaz",
    description: "Explorați gama noastră completă de profile din aluminiu, sisteme de gard, glafuri și sticlă securizată.",
    indexable: true,
  },
  contact: {
    path: "/contact",
    title: "Contact – Turcoaz Aluminiu S.R.L. Popești-Leordeni și Iași",
    description: "Contactați echipa Turcoaz Aluminiu pentru oferte de preț, consultanță tehnică și comenzi de profile aluminiu.",
    indexable: true,
  },
  politica: {
    path: "/politica-confidentialitate",
    title: "Politica de Confidențialitate – Turcoaz Aluminiu",
    description: "Politica privind protecția datelor cu caracter personal ale clienților Turcoaz Aluminiu S.R.L.",
    indexable: true,
  },
  termeni: {
    path: "/termeni-si-conditii",
    title: "Termeni și Condiții – Turcoaz Aluminiu",
    description: "Termenii și condițiile oficiale de utilizare ale platformei turcoaz.com.",
    indexable: true,
  },

  // --- AKPA VE SİSTEM SAYFALARI ---
  akpa: {
    path: "/categorii/sisteme-aluminiu-akpa",
    title: "Sisteme Aluminiu AKPA – Profile și Tâmplărie | Turcoaz",
    description: "Sisteme de profile din aluminiu AKPA pentru tâmplărie, pereți cortină, închideri terasă și garduri în Popești-Leordeni.",
    indexable: true,
  },
  gard: {
    path: "/categorii/sisteme-aluminiu-akpa/gard",
    title: "Sistem de Gard F60 – Profile Aluminiu Porți | Turcoaz",
    description: "Profile din aluminiu pentru gard F60, porți batante și culisante. Soluții moderne pentru împrejmuiri. Depozit în Popești-Leordeni și Iași.",
    indexable: true,
    ogImage: "https://res.cloudinary.com/oivvupgw/image/upload/c_fill,w_1200,h_630/v1791401513/Gard-Fence_60-2_gage5r.jpg",
  },
  sistemeTamplarie: {
    path: "/categorii/sisteme-aluminiu-akpa/sisteme-tamplarie",
    title: "Sisteme Tâmplărie Aluminiu AKPA – Uși și Ferestre | Turcoaz",
    description: "Profile din aluminiu AKPA pentru ferestre și uși termoizolante. Serii speciale cu performanță termică ridicată.",
    indexable: true,
  },
  pereteCortina: {
    path: "/categorii/sisteme-aluminiu-akpa/perete-cortina",
    title: "Sisteme Perete Cortină Aluminiu AKPA | Turcoaz",
    description: "Profile din aluminiu pentru fațade izolate și pereți cortină comerciali. Livrare rapidă din stoc.",
    indexable: true,
  },
  inchidereTerasa: {
    path: "/categorii/sisteme-aluminiu-akpa/inchidere-terasa",
    title: "Sisteme Închidere Terasă din Aluminiu | Turcoaz",
    description: "Sisteme din aluminiu și sticlă pentru închiderea teraselor, balcoanelor și foișoarelor rezidențiale.",
    indexable: true,
  },

  // --- STANDART ALÜMİNYUM PROFİLLER ---
  profileStandard: {
    path: "/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu",
    title: "Profile Standard Aluminiu Extrudat | Turcoaz",
    description: "Corniere, țevi rectangulare, pătrate, rotunde, profile U, T și platbandă din aluminiu extrudat. Stoc permanent.",
    indexable: true,
  },
  cornier: {
    path: "/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/cornier",
    title: "Cornier Aluminiu Extrudat – Laturi Egale și Inegale | Turcoaz",
    description: "Cornier din aluminiu extrudat pentru structuri, rame și finisaje. Dimensiuni variate, prețuri competitive în Popești-Leordeni.",
    indexable: true,
  },
  teavaRectangulara: {
    path: "/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/teava-rectangulara",
    title: "Țeavă Rectangulară Aluminiu – Profil Dreptunghiular | Turcoaz",
    description: "Țeavă rectangulară din aluminiu extrudat pentru construcții și confecții metalice. Stoc în Popești-Leordeni și Iași.",
    indexable: true,
  },
  teavaPatrata: {
    path: "/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/teava-patrata",
    title: "Țeavă Pătrată Aluminiu – Profile Pătrate Extrudate | Turcoaz",
    description: "Țeavă pătrată din aluminiu pentru cadre, rafturi și structuri ușoare. Mai multe grosimi și dimensiuni disponibile.",
    indexable: true,
  },
  teavaRotunda: {
    path: "/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/teava-rotunda",
    title: "Țeavă Rotundă Aluminiu – Tub Extrudat | Turcoaz",
    description: "Țeavă rotundă din aluminiu (tub extrudat) pentru balustrade, confecții și instalații. Livrare din stoc depozit.",
    indexable: true,
  },
  profilU: {
    path: "/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/profil-u",
    title: "Profil U Aluminiu Extrudat – Dimensiuni Standard | Turcoaz",
    description: "Profil U din aluminiu extrudat pentru tâmplărie, mobilier și structuri ușoare. Mai multe dimensiuni, stoc în Popești-Leordeni și Iași. Cere ofertă.",
    indexable: true,
  },
  profilT: {
    path: "/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/profil-t",
    title: "Profil T Aluminiu Extrudat – Dimensiuni Standard | Turcoaz",
    description: "Profil T din aluminiu extrudat pentru îmbinări, rame și structuri ușoare. Mai multe dimensiuni, stoc în Popești-Leordeni și Iași. Cere ofertă.",
    indexable: true,
  },
  platbanda: {
    path: "/categorii/sisteme-aluminiu-akpa/profile-standard-aluminiu/platbanda",
    title: "Platbandă Aluminiu – Bară Plată, Mai Multe Lățimi | Turcoaz",
    description: "Platbandă din aluminiu (bară plată) pentru rame, suporți și finisaje. Lățimi și grosimi variate, stoc în Popești-Leordeni și Iași. Cere ofertă.",
    indexable: true,
  },

  // --- CAM VE BALUSTRAD SİSTEMLERİ ---
  sticla: {
    path: "/categorii/sticla",
    title: "Sticlă Securizată și Laminată pentru Construcții | Turcoaz",
    description: "Sticlă securizată și laminată pentru balustrade, fațade, uși și compartimentări. Tăiere la dimensiune și livrare din Popești-Leordeni. Cere ofertă.",
    indexable: true,
  },
  sistemeBalustrada: {
    path: "/categorii/sisteme-balustrada",
    title: "Sisteme de Balustradă din Aluminiu și Sticlă | Turcoaz",
    description: "Sisteme complete de balustradă din aluminiu și sticlă securizată pentru interior și exterior. Agrement Tehnic, finisaje eloxat, livrare rapidă în toată România.",
    indexable: true,
  },
  balustradaSticla: {
    path: "/categorii/sisteme-balustrada/balustrada-de-sticla",
    title: "Balustradă din Sticlă pentru Scări și Terase | Turcoaz",
    description: "Sisteme de balustradă din sticlă cu profile din aluminiu pentru scări, terase și balcoane. Design modern, montaj sigur. Cere ofertă de la Turcoaz.",
    indexable: true,
  },

  // --- DİĞER KATEGORİLER ---
  glafuri: {
    path: "/categorii/glafuri-din-aluminiu",
    title: "Glafuri din Aluminiu Exterioare – Protecție Ferestre | Turcoaz",
    description: "Glafuri din aluminiu extrudat pentru ferestre. Protecție împotriva infiltrațiilor, lățimi variate și culori RAL din stoc.",
    indexable: true,
  },
  bond: {
    path: "/categorii/acp-aluminiu-compozit-panel-bond",
    title: "Panouri Compozite Aluminiu Bond (ACP) | Turcoaz",
    description: "Panouri aluminiu compozit tip Bond pentru placări de fațade, reclame și amenajări interioare. Rezistență ridicată.",
    indexable: true,
  },

  // --- HENÜZ HAZIR OLMAYAN / PASİF SAYFALAR (NOINDEX) ---
  pvc: {
    path: "/categorii/profile-pvc",
    title: "Profile PVC Fără Plumb EXENplast și Blancoplast – Turcoaz",
    description: "Profile PVC ecologice fără plumb, serii EXEN 60, 70 și 85 mm, plus sisteme de glisare. Livrare rapidă din depozitul Popești-Leordeni.",
    indexable: true, // Sayfa tam hazır olunca true yapın
  },
  sticlaComponente: {
    path: "/categorii/componente-sisteme-sticla",
    title: "Componente și Fitinguri Sisteme Sticlă Securizată | Turcoaz",
    description: "Fitinguri, amortizoare și accesorii din inox și aluminiu pentru compartimentări și ușile din sticlă securizată.",
    indexable: false, // Sayfa tam hazır olunca true yapın
  },
};

export function buildMetadata(page) {
  if (!page) return {};
  const url = `${siteConfig.domain}${page.path}`;
  const image = page.ogImage ?? siteConfig.defaultOgImage;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    robots: page.indexable ? undefined : { index: false, follow: false },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: siteConfig.companyName,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}