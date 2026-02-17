export default function (field: any) {
  for (const key in field) {
    if (typeof field[key] === "string") {
      field[key] = field[key].trim();
    }
  }
}
