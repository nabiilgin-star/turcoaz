export function translateError(error) {
  const message = error?.message || error || "";
  if (!message) return "A apărut o eroare necunoscută.";

  const msg = typeof message === "string" ? message.toLowerCase() : "";

  if (msg.includes("duplicate key value violates unique constraint")) {
    if (msg.includes("slug")) {
      return "Acest nume există deja. Te rugăm să alegi un nume unic.";
    }
    return "O înregistrare cu aceste date există deja.";
  }

  if (msg.includes("violates foreign key constraint")) {
    return "Acțiunea nu poate fi finalizată. Elementul este strict asociat cu alte date (ex: are produse sau subcategorii dependente).";
  }

  if (msg.includes("row-level security")) {
    return "Nu ai permisiunea necesară pentru a face această modificare.";
  }

  
  return message;
}
