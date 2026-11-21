import { beforeEach, describe, it, expect, vi } from "vitest";
import { leerRecords, guardarRecord, borrarRecords } from "../src/lib/records";
const r = { movimientos: 9, segundos: 45, fecha: "2026-11-12T12:00:00.000Z" };
beforeEach(() => localStorage.clear());
describe("récords", () => {
  it("guarda el mejor por movimientos y tiempo", () => {
    expect(guardarRecord(12, r)).toBe(true);
    expect(guardarRecord(12, { ...r, movimientos: 10 })).toBe(false);
    expect(guardarRecord(12, { ...r, segundos: 30 })).toBe(true);
    expect(leerRecords()[12]?.segundos).toBe(30);
  });
  it("ignora JSON roto y formatos inválidos", () => {
    localStorage.setItem("memoria-records-v1", "{");
    expect(leerRecords()).toEqual({});
    localStorage.setItem(
      "memoria-records-v1",
      JSON.stringify({ 12: { movimientos: "malo" } }),
    );
    expect(leerRecords()).toEqual({});
  });
  it("permite borrar", () => {
    guardarRecord(12, r);
    expect(borrarRecords()).toBe(true);
    expect(leerRecords()).toEqual({});
  });
  it("no se cae con almacenamiento bloqueado", () => {
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("bloqueado");
      });
    expect(guardarRecord(12, r)).toBe(false);
    spy.mockRestore();
  });
  it("rechaza resultados inválidos", () => {
    expect(guardarRecord(12, { ...r, movimientos: -1 })).toBe(false);
  });
});
