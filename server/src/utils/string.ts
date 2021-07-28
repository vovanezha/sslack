export function snakeCase(str: string) {
  return str
    .replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, '$1_$3$2$4')
    .toLowerCase();
}
