import React from "react";

// Tek kaynak: Görünen FAQ ve JSON-LD aynı veriyi kullanır.
// GEO Optimizasyonu: Yapay zekanın alıntılayabilmesi pentru adres, marka, RAL kodları ve sertifikalar metne dahil edildi.
const faqItems = [
  {
    id: "despre-turcoaz",
    question: "Ce este Turcoaz Aluminiu SRL și cu ce se ocupă?",
    answer:
      "Turcoaz Aluminiu SRL este un distribuitor de profile și sisteme din aluminiu și PVC pentru construcții, activ din 2011, cu centre logistice în Popești-Leordeni și Iași. Portofoliul include profile din aluminiu, glafuri, balustrade, panouri compozite ACP (Bond), sticlă specială și accesorii.",
  },
  {
    id: "profile-aluminiu-akpa",
    question: "De unde pot cumpăra profile din aluminiu AKPA în România?",
    answer:
      "Turcoaz Aluminiu este importator și distribuitor pentru profile din aluminiu AKPA în România, gestionând volume mari în depozitele noastre. Pentru informații despre seriile disponibile, dimensiuni și stoc curent, contactați echipa noastră.",
  },
  {
    id: "glafuri-aluminiu",
    question: "Ce glafuri din aluminiu sunt disponibile?",
    answer:
      "Glafurile exterioare din aluminiu extrudat sunt disponibile în lățimi standard cuprinse între 75 mm și 380 mm. Pentru glafuri debitate la dimensiune, comunicați lățimea, lungimea și culoarea dorită pentru a verifica disponibilitatea.",
  },
  {
    id: "culori-glafuri",
    question: "Ce culori pot alege pentru glafurile din aluminiu?",
    answer:
      "Opțiunile pot include nuanțe precum RAL 9016 (Alb), RAL 8014 (Maro), RAL 7016 (Gri Antracit), Stejar Auriu, Nuc și Wenghe, în funcție de lot. Contactați Turcoaz Aluminiu pentru confirmarea culorilor disponibile pe stoc pentru dimensiunea dorită.",
  },
  {
    id: "preturi-oferta",
    question: "Cum pot solicita o ofertă de preț pentru produsele din aluminiu?",
    answer:
      "Pentru o ofertă de preț, transmiteți lista produselor, dimensiunile, finisajele și cantitățile dorite prin formularul de contact, pe WhatsApp sau la info@turcoaz.com. Aceste informații ajută echipa să pregătească o ofertă B2B sau B2C potrivită.",
  },
  {
    id: "panouri-compozite-acp",
    question: "Ce sunt panourile compozite din aluminiu ACP și unde se folosesc?",
    answer:
      "Panourile compozite (ex: AKPA Bond, PrimeBond cu aluminiu Hydro Norvegia, DuraBond) sunt utilizate pentru fațade ventilate și placări decorative. Pentru grosimi, finisaje și documentație tehnică, solicitați detalii echipei noastre.",
  },
  {
    id: "livrare-romania",
    question: "Turcoaz Aluminiu livrează produse în toată România?",
    answer:
      "Da, expediem comenzi din depozitele noastre din Ilfov (Popești-Leordeni) și Iași către destinații din toată România. Disponibilitatea, termenul exact de livrare și costul transportului se confirmă la momentul ofertei.",
  },
  {
    id: "stoc-produse",
    question: "Cum pot verifica stocul pentru profile și accesorii?",
    answer:
      "Deși menținem un stoc permanent de peste 200 de tone pentru a asigura continuitatea, disponibilitatea variază. Pentru confirmare, transmiteți denumirea produsului și cantitatea necesară către echipa Turcoaz Aluminiu înainte de comandă.",
  },
  {
    id: "documentatie-tehnica",
    question: "Unde pot solicita fișe tehnice și documente de conformitate?",
    answer:
      "Materialele noastre dețin Agrement Tehnic, iar compania operează sub standardele ISO 9001 și 14001. Pentru declarații de conformitate și fișe tehnice specifice produsului achiziționat, contactați echipa noastră.",
  },
  {
    id: "contact-turcoaz",
    question: "Cum pot lua legătura cu Turcoaz Aluminiu?",
    answer:
      "Ne puteți vizita la sediul central din Str. Taberei nr. 6, Popești-Leordeni, sau ne puteți contacta prin e-mail la info@turcoaz.com și pe WhatsApp. Includeți detaliile proiectului pentru un răspuns rapid și relevant.",
  },
];

export default function FAQSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": "ro",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
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
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900 font-medium">
                <span>{item.question}</span>

                <span
                  aria-hidden="true"
                  className="shrink-0 transition duration-300 group-open:-rotate-180"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
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