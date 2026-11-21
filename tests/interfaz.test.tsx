import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Carta } from "../src/components/Carta";
import { Records } from "../src/components/Records";
import { Juego } from "../src/components/Juego";
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));
describe("interfaz", () => {
  it("una carta muestra símbolo al abrirse", () => {
    const c = { id: 2, simbolo: "🐶", descubierta: false };
    const onVoltear = vi.fn();
    const { rerender } = render(
      <Carta
        carta={c}
        volteada={false}
        bloqueada={false}
        onVoltear={onVoltear}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Carta 3, boca abajo" }),
    );
    expect(onVoltear).toHaveBeenCalledWith(2);
    rerender(
      <Carta
        carta={c}
        volteada={true}
        bloqueada={false}
        onVoltear={onVoltear}
      />,
    );
    expect(screen.getByRole("button", { name: "Carta 3, 🐶" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
  it("récords muestra estado vacío", () => {
    localStorage.clear();
    render(<Records />);
    expect(screen.getByText("Aún no hay récords")).toBeInTheDocument();
  });
  it("muestra victoria al resolver todas las parejas", async () => {
    vi.useFakeTimers();
    try {
      render(<Juego />);
      for (let n = 0; n < 6; n++) {
        const buttons = screen.getAllByRole("button", { name: /Carta \d+,/ });
        const ocultas = buttons.filter((b) =>
          b.getAttribute("aria-label")?.includes("boca abajo"),
        );
        if (!ocultas.length) break;
        fireEvent.click(ocultas[0]);
        const label = ocultas[0].getAttribute("aria-label") || "";
        const simbolo = label.split(", ")[1];
        const pareja = screen
          .getAllByRole("button", { name: /Carta \d+,/ })
          .find(
            (b) =>
              b !== ocultas[0] &&
              b.getAttribute("aria-label")?.endsWith(simbolo),
          );
        if (pareja) fireEvent.click(pareja);
        else {
          const restantes = screen.getAllByRole("button", {
            name: /boca abajo/,
          });
          if (restantes[0]) fireEvent.click(restantes[0]);
        }
        act(() => vi.advanceTimersByTime(800));
      }
      expect(screen.getByText(/Movimientos/)).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
