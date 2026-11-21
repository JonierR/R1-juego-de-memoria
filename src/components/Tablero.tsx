import { Carta } from "./Carta";
import type { Estado } from "@/lib/juegoReducer";
export function Tablero({
  estado,
  onVoltear,
}: {
  estado: Estado;
  onVoltear: (id: number) => void;
}) {
  return (
    <section aria-label="Tablero de cartas" className="tablero">
      {estado.cartas.map((c) => (
        <Carta
          key={c.id}
          carta={c}
          volteada={estado.volteadas.includes(c.id)}
          bloqueada={estado.volteadas.length === 2}
          onVoltear={onVoltear}
        />
      ))}
    </section>
  );
}
