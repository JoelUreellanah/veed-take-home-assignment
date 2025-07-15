export function parseTags(input?: string | string[]): string[] {
  if (!input) return [];

  if (Array.isArray(input)) return input.map((t) => t.trim()).filter(Boolean);

  return input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
