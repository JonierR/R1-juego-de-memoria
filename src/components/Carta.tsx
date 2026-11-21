import type { Carta as CartaTipo } from "@/lib/juegoReducer";
export function Carta({
  carta,
  volteada,
  bloqueada,
  onVoltear,
}: {
  carta: CartaTipo;
  volteada: boolean;
  bloqueada: boolean;
  onVoltear: (id: number) => void;
}) {
  const abierta = volteada || carta.descubierta;
  return (
    <button
      type="button"
      className={`carta ${abierta ? "abierta" : ""} ${carta.descubierta ? "encontrada" : ""}`}
      aria-pressed={abierta}
      aria-label={`Carta ${carta.id + 1}, ${abierta ? carta.simbolo : "boca abajo"}${carta.descubierta ? ", pareja encontrada" : ""}`}
      disabled={carta.descubierta || (bloqueada && !volteada)}
      onClick={() => onVoltear(carta.id)}
    >
      <span aria-hidden="true">{abierta ? carta.simbolo : "?"}</span>
      {carta.descubierta && (
        <span className="marca" aria-hidden="true">
          ✓
        </span>
      )}
    </button>
  );
}
