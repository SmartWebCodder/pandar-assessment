export default function (field: Record<string, unknown>) {
  if (!field || typeof field !== "object") return;
  for (const key in field) {
    if (typeof field[key] === "string") {
      field[key] = (field[key] as string).trim();
    }
  }
}
