import type { Tamano } from "./memoria";
export type Resultado = {
  movimientos: number;
  segundos: number;
  fecha: string;
};
export type Records = Partial<Record<Tamano, Resultado>>;
const CLAVE = "memoria-records-v1";
function valido(r: unknown): r is Resultado {
  if (!r || typeof r !== "object") return false;
  const x = r as Record<string, unknown>;
  return (
    Number.isSafeInteger(x.movimientos) &&
    (x.movimientos as number) >= 1 &&
    Number.isSafeInteger(x.segundos) &&
    (x.segundos as number) >= 0 &&
    typeof x.fecha === "string" &&
    !Number.isNaN(Date.parse(x.fecha))
  );
}
export function leerRecords(): Records {
  try {
    const texto = localStorage.getItem(CLAVE);
    if (!texto) return {};
    const datos: unknown = JSON.parse(texto);
    if (!datos || typeof datos !== "object" || Array.isArray(datos)) return {};
    const resultado: Records = {};
    for (const tamano of [12, 16, 24] as const) {
      const valor = (datos as Record<string, unknown>)[tamano];
      if (valido(valor)) resultado[tamano] = valor;
    }
    return resultado;
  } catch {
    return {};
  }
}
export function guardarRecord(tamano: Tamano, resultado: Resultado): boolean {
  if (![12, 16, 24].includes(tamano) || !valido(resultado)) return false;
  const records = leerRecords();
  const anterior = records[tamano];
  if (
    anterior &&
    (anterior.movimientos < resultado.movimientos ||
      (anterior.movimientos === resultado.movimientos &&
        anterior.segundos <= resultado.segundos))
  )
    return false;
  try {
    localStorage.setItem(
      CLAVE,
      JSON.stringify({ ...records, [tamano]: resultado }),
    );
    return true;
  } catch {
    return false;
  }
}
export function borrarRecords(): boolean {
  try {
    localStorage.removeItem(CLAVE);
    return true;
  } catch {
    return false;
  }
}
