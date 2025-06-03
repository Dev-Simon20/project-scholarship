export function sanitizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // removes accents
    .replace(/ñ/g, "n")
    .replace(/Ñ/g, "N")
    .toLowerCase();
}
