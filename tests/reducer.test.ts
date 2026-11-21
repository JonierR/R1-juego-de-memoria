import { describe, it, expect } from "vitest";
import {
  estadoInicial,
  juegoReducer,
  type Carta,
} from "../src/lib/juegoReducer";
const cartas: Carta[] = [
  { id: 0, simbolo: "a", descubierta: false },
  { id: 1, simbolo: "a", descubierta: false },
  { id: 2, simbolo: "b", descubierta: false },
  { id: 3, simbolo: "b", descubierta: false },
];
const voltear = (s: ReturnType<typeof estadoInicial>, id: number) =>
  juegoReducer(s, { tipo: "voltear", id });
describe("juegoReducer", () => {
  it("marca parejas y termina al encontrar todas", () => {
    let s = estadoInicial(cartas);
    s = voltear(voltear(s, 0), 1);
    expect(s.movimientos).toBe(1);
    s = juegoReducer(s, { tipo: "resolver" });
    expect(s.cartas[0].descubierta).toBe(true);
    s = juegoReducer(voltear(voltear(s, 2), 3), { tipo: "resolver" });
    expect(s.fase).toBe("fin");
  });
  it("oculta distintas, bloquea tercera y no cuenta doble clic", () => {
    let s = voltear(estadoInicial(cartas), 0);
    expect(voltear(s, 0)).toBe(s);
    s = voltear(s, 2);
    expect(voltear(s, 3)).toBe(s);
    expect(s.movimientos).toBe(1);
    s = juegoReducer(s, { tipo: "resolver" });
    expect(s.volteadas).toEqual([]);
    expect(s.cartas.every((c) => !c.descubierta)).toBe(true);
  });
  it("no modifica el estado anterior", () => {
    const s = voltear(estadoInicial(cartas), 0);
    const antes = structuredClone(s);
    voltear(s, 1);
    expect(s).toEqual(antes);
  });
  it("tic solo durante juego y reinicio restaura", () => {
    const inicio = estadoInicial(cartas);
    expect(juegoReducer(inicio, { tipo: "tic" })).toBe(inicio);
    const s = juegoReducer(voltear(inicio, 0), { tipo: "tic" });
    expect(s.segundos).toBe(1);
    expect(juegoReducer(s, { tipo: "reiniciar", cartas }).movimientos).toBe(0);
  });
  it("ignora carta inexistente, descubierta y resolver incompleto", () => {
    const s = estadoInicial(cartas);
    expect(voltear(s, 50)).toBe(s);
    expect(juegoReducer(s, { tipo: "resolver" })).toBe(s);
    const x = {
      ...s,
      cartas: [{ ...cartas[0], descubierta: true }, ...cartas.slice(1)],
    };
    expect(voltear(x, 0)).toBe(x);
  });
});
