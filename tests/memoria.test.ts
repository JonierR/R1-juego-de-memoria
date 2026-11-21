import { describe, it, expect } from "vitest";
import { barajar, crearCartas } from "../src/lib/memoria";
describe("barajado y cartas", () => {
  it("conserva los elementos sin modificar el original", () => {
    const original = [1, 2, 3, 4];
    const copia = [...original];
    const mezclado = barajar(original, () => 0);
    expect(original).toEqual(copia);
    expect([...mezclado].sort()).toEqual(original);
    expect(mezclado).not.toBe(original);
  });
  it("crea ocho parejas únicas", () => {
    const cartas = crearCartas(["a", "b", "c", "d", "e", "f", "g", "h"], 8);
    expect(cartas).toHaveLength(16);
    for (const s of "abcdefgh")
      expect(cartas.filter((c) => c.simbolo === s)).toHaveLength(2);
  });
  it("rechaza símbolos duplicados y tamaños inválidos", () => {
    expect(() => crearCartas(["a", "a"], 2)).toThrow();
    expect(() => crearCartas(["a"], 2)).toThrow();
  });
});
