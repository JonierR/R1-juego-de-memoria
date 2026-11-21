import type { Carta } from "./juegoReducer";
export const TEMAS = {
  animales: [
    "🐶",
    "🐱",
    "🐻",
    "🦊",
    "🐼",
    "🐸",
    "🐵",
    "🦁",
    "🐯",
    "🐨",
    "🐷",
    "🐙",
  ],
  comida: [
    "🍎",
    "🍕",
    "🍓",
    "🍔",
    "🥑",
    "🍇",
    "🍩",
    "🍉",
    "🥐",
    "🍋",
    "🍒",
    "🌮",
  ],
  deportes: [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🎾",
    "🏐",
    "🏓",
    "🏸",
    "🥊",
    "⛳",
    "🏒",
    "🎯",
  ],
} as const;
export type Tema = keyof typeof TEMAS;
export type Tamano = 12 | 16 | 24;
export function barajar<T>(
  arreglo: readonly T[],
  aleatorio: () => number = Math.random,
): T[] {
  const copia = [...arreglo];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
export function crearCartas(
  simbolos: readonly string[],
  parejas: number,
): Carta[] {
  if (
    !Number.isInteger(parejas) ||
    parejas < 1 ||
    parejas > simbolos.length ||
    new Set(simbolos).size !== simbolos.length
  )
    throw new Error("Símbolos o cantidad de parejas inválidos");
  return barajar([
    ...simbolos.slice(0, parejas),
    ...simbolos.slice(0, parejas),
  ]).map((simbolo, id) => ({ id, simbolo, descubierta: false }));
}
