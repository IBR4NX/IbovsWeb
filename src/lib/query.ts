
export function getQueryString(
  value: string | (string)[] | undefined
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  return value.replace(/-/g, " ").trim() || null;
}