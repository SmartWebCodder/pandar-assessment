export default function (field: any) {
  if (!field || typeof field !== "object") return;
  for (const key in field) {
    if (typeof field[key] === "string") {
      field[key] = field[key].trim();
    }
  }
}
