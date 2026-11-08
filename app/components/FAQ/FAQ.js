
import React from "react";
import "./FAQ.css";

// Sursa unică pentru întrebările vizibile și schema JSON-LD.
const faqItems = [
  {
    id: "despre-turcoaz",
    question: "Ce este Turcoaz Aluminiu SRL și cu ce se ocupă?",
    answer:
      "Turcoaz Aluminiu SRL activează din 2011 în distribuția de profile și sisteme din aluminiu și PVC pentru construcții. Acționariatul companiei are peste 24 de ani de experiență în domeniul sistemelor de tâmplărie din aluminiu și PVC. Portofoliul include profile din aluminiu și PVC, glafuri exterioare, panouri compozite Bond, sisteme de balustrade, feronerie și sisteme din sticlă KAHE.",
  },
  {
    id: "profile-aluminiu-akpa",
    question: "De unde pot cumpăra profile din aluminiu AKPA în România?",
    answer:
      "Turcoaz Aluminiu SRL este importator și distribuitor unic al profilelor din aluminiu AKPA în România. Comercializăm peste 150 de tone lunar, la nivelul companiei, și menținem un stoc permanent de peste 200 de tone. Pentru informații despre seriile disponibile, dimensiuni și stocul curent, contactați echipa noastră.",
  },
  {
    id: "glafuri-aluminiu",
    question: "Ce glafuri din aluminiu sunt disponibile?",
    answer:
      "Oferim glafuri exterioare din aluminiu extrudat, cu lățimi cuprinse între 75 și 380 mm. Glafurile pot fi debitate la dimensiunea solicitată. Pentru o ofertă, transmiteți lățimea, lungimea și culoarea dorită.",
  },
  {
    id: "culori-glafuri",
    question: "Ce culori sunt disponibile pentru glafurile din aluminiu?",
    answer:
      "Glafurile din aluminiu sunt disponibile în culorile RAL 9016 (alb), RAL 8014 (maro) și RAL 7016 (gri antracit), precum și în finisajele Stejar Auriu, Nuc și Wenghe. Disponibilitatea pentru dimensiunea și cantitatea dorită se confirmă la solicitarea ofertei.",
  },
  {
    id: "preturi-oferta",
    question: "Cum pot solicita o ofertă de preț?",
    answer:
      "Pentru o ofertă de preț, transmiteți produsele dorite, dimensiunile, finisajele și cantitățile prin formularul de contact, WhatsApp sau la adresa info@turcoaz.com. Echipa noastră vă va contacta în cel mai scurt timp cu o ofertă detaliată.",
  },
  {
    id: "panouri-compozite-acp",
    question: "Ce panouri compozite din aluminiu comercializează Turcoaz Aluminiu?",
    answer:
      "Comercializăm panouri compozite din aluminiu AKPA Bond, PrimeBond, PrimeBond Plus, DuraBond și RallBond. Panourile sunt utilizate pentru fațade ventilate, placări exterioare, reclame și amenajări comerciale. Panourile PrimeBond sunt fabricate cu tablă de aluminiu Hydro din Norvegia. Pentru informații despre Agrementul Tehnic, grosimi, finisaje și documentație tehnică, solicitați detalii echipei noastre.",
  },
  {
    id: "profile-pvc",
    question: "Ce profile PVC sunt disponibile la Turcoaz Aluminiu?",
    answer:
      "Turcoaz Aluminiu este distribuitor unic în România al profilelor PVC EXENplast și BlancoPlast, pentru ferestre și uși. Seria EXEN 6040A are 60 mm grosime, 4 camere și un coeficient de transfer termic Uf de 1,432 W/m²K. Pentru informații despre celelalte serii, caracteristicile tehnice și stoc, contactați echipa noastră.",
  },
  {
    id: "sisteme-kahe",
    question: "Ce sisteme și produse din sticlă KAHE comercializați?",
    answer:
      "Distribuim componente și sisteme KAHE pentru uși din sticlă, cabine de duș, compartimentări, sisteme glisante, feronerie, accesorii și balustrade din sticlă. De asemenea, livrăm sticlă securizată curbată și sticlă laminată securizată, debitată la dimensiune.",
  },
  {
    id: "balustrade",
    question: "Ce tipuri de sisteme de balustrade sunt disponibile?",
    answer:
      "Comercializăm sisteme de balustrade din aluminiu și sticlă, împreună cu accesoriile necesare pentru montaj. Finisajele disponibile din stoc sunt Eloxat Argintiu, Eloxat Maro și Gri Antracit (RAL 7016). Culorile speciale pot fi executate la comandă. Pentru informații despre documentația tehnică și Agrementul Tehnic, contactați echipa noastră.",
  },
  {
    id: "livrare-romania",
    question: "Turcoaz Aluminiu livrează produse în toată România?",
    answer:
      "Da, livrăm produse în toată România. Depozitul principal al companiei se află în Popești-Leordeni, Ilfov. Pentru disponibilitatea produselor în Iași, vă rugăm să contactați echipa noastră. Termenul și costul transportului se confirmă în funcție de produse și destinație.",
  },
  {
    id: "stoc-produse",
    question: "Cum pot verifica stocul produselor?",
    answer:
      "Turcoaz Aluminiu menține un stoc permanent de peste 200 de tone, la nivelul companiei. Disponibilitatea fiecărui produs depinde de tip, dimensiune și cantitate. Pentru confirmare, transmiteți denumirea produsului și cantitatea necesară echipei noastre.",
  },
  {
    id: "program-lucru",
    question: "Care este programul de lucru al depozitelor?",
    answer:
      "Programul de lucru pentru depozitul central din Popești-Leordeni și magazinul din București, Sector 4, este de luni până vineri, între orele 08:00 și 17:00.",
  },
  {
    id: "certificari",
    question: "Ce certificări și documente tehnice sunt disponibile?",
    answer:
      "Pentru informații despre Agrementul Tehnic și documentele de conformitate aferente produselor, contactați echipa noastră și specificați produsul dorit. Compania deține certificări ISO 9001:2015 (Managementul calității) și ISO 14001:2015 (Managementul mediului).",
  },
  {
    id: "contact-turcoaz",
    question: "Cum pot lua legătura cu Turcoaz Aluminiu?",
    answer:
      "Depozitul central se află pe Str. Taberei nr. 6, Popești-Leordeni, Ilfov. Magazinul din București, Sector 4, este situat la colțul Șos. Giurgiului cu Str. Orăștie, cu posibilitate de parcare pe Str. Orăștie. Programul este de luni până vineri, între orele 08:00 și 17:00. Ne puteți contacta și la info@turcoaz.com sau pe WhatsApp.",
  },
];

export default function FAQSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "ro",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-12 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Întrebări frecvente despre produsele Turcoaz Aluminiu
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.id}
              className="group border border-gray-200 rounded-lg bg-gray-50 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 font-medium">
                <span>{item.question}</span>

                <span
                  aria-hidden="true"
                  className="shrink-0 transition duration-300 group-open:-rotate-180"
                  style={{
                    display: "flex",
                    width: "20px",
                    height: "20px",
                    minWidth: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    style={{
                      display: "block",
                      width: "20px",
                      height: "20px",
                      minWidth: "20px",
                      maxWidth: "20px",
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
