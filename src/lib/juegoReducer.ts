export type Carta = { id: number; simbolo: string; descubierta: boolean };
export type Estado = {
  cartas: Carta[];
  volteadas: number[];
  movimientos: number;
  segundos: number;
  fase: "inicio" | "jugando" | "fin";
};
export type Accion =
  | { tipo: "reiniciar"; cartas: Carta[] }
  | { tipo: "voltear"; id: number }
  | { tipo: "resolver" }
  | { tipo: "tic" };
export const estadoInicial = (cartas: Carta[]): Estado => ({
  cartas,
  volteadas: [],
  movimientos: 0,
  segundos: 0,
  fase: "inicio",
});
export function juegoReducer(estado: Estado, accion: Accion): Estado {
  switch (accion.tipo) {
    case "reiniciar":
      return estadoInicial(
        accion.cartas.map((c) => ({ ...c, descubierta: false })),
      );
    case "voltear": {
      if (
        estado.fase === "fin" ||
        estado.volteadas.length === 2 ||
        estado.volteadas.includes(accion.id)
      )
        return estado;
      const carta = estado.cartas.find((c) => c.id === accion.id);
      if (!carta || carta.descubierta) return estado;
      const volteadas = [...estado.volteadas, accion.id];
      return {
        ...estado,
        volteadas,
        movimientos: estado.movimientos + (volteadas.length === 2 ? 1 : 0),
        fase: "jugando",
      };
    }
    case "resolver": {
      if (estado.volteadas.length !== 2) return estado;
      const [a, b] = estado.volteadas.map((id) =>
        estado.cartas.find((c) => c.id === id),
      );
      if (!a || !b) return { ...estado, volteadas: [] };
      const cartas =
        a.simbolo === b.simbolo
          ? estado.cartas.map((c) =>
              estado.volteadas.includes(c.id) ? { ...c, descubierta: true } : c,
            )
          : estado.cartas;
      return {
        ...estado,
        cartas,
        volteadas: [],
        fase: cartas.every((c) => c.descubierta) ? "fin" : "jugando",
      };
    }
    case "tic":
      return estado.fase === "jugando"
        ? { ...estado, segundos: estado.segundos + 1 }
        : estado;
  }
}
