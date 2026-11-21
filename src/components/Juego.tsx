"use client";
import { useEffect, useRef, useState } from "react";
import { useJuego } from "@/hooks/useJuego";
import { TEMAS, type Tamano, type Tema } from "@/lib/memoria";
import { guardarRecord } from "@/lib/records";
import { Tablero } from "./Tablero";
export function Juego() {
  const [tamano, setTamano] = useState<Tamano>(12);
  const [tema, setTema] = useState<Tema>("animales");
  const { estado, dispatch, reiniciar } = useJuego(tamano, tema);
  const [anuncio, setAnuncio] = useState("");
  const [record, setRecord] = useState(false);
  const previo = useRef(estado);
  const guardado = useRef(false);
  useEffect(() => {
    const antes = previo.current;
    if (antes.volteadas.length === 2 && estado.volteadas.length === 0) {
      const [a, b] = antes.volteadas.map((id) =>
        antes.cartas.find((c) => c.id === id),
      );
      setAnuncio(
        a?.simbolo === b?.simbolo
          ? "Pareja encontrada"
          : "Las cartas no coinciden",
      );
    }
    previo.current = estado;
    if (estado.fase === "fin" && !guardado.current) {
      guardado.current = true;
      setRecord(
        guardarRecord(tamano, {
          movimientos: estado.movimientos,
          segundos: estado.segundos,
          fecha: new Date().toISOString(),
        }),
      );
      setAnuncio(
        `¡Ganaste! ${estado.movimientos} movimientos en ${estado.segundos} segundos.`,
      );
    }
  }, [estado, tamano]);
  function reset() {
    guardado.current = false;
    setRecord(false);
    setAnuncio("Partida reiniciada");
    reiniciar();
  }
  function cambiar(nuevoTamano: Tamano, nuevoTema: Tema) {
    if (
      estado.fase === "jugando" &&
      !window.confirm("¿Abandonar esta partida y comenzar una nueva?")
    )
      return;
    setTamano(nuevoTamano);
    setTema(nuevoTema);
    guardado.current = false;
    setRecord(false);
    setAnuncio("Nueva partida preparada");
    dispatch({ tipo: "reiniciar", cartas: crearNueva(nuevoTamano, nuevoTema) });
  }
  return (
    <div className="juego">
      <div className="introduccion">
        <span className="eyebrow">MEMORIA · DESAFÍO</span>
        <h1>
          Encuentra las parejas<span className="punto">.</span>
        </h1>
        <p>
          Entrena tu memoria. Descubre dos cartas por turno y encuentra todas
          las parejas en el menor tiempo posible.
        </p>
      </div>
      <section className="panel" aria-label="Configuración del juego">
        <div className="campo">
          <label htmlFor="tamano">Tamaño del tablero</label>
          <select
            id="tamano"
            value={tamano}
            onChange={(e) => cambiar(Number(e.target.value) as Tamano, tema)}
          >
            <option value="12">12 cartas · Fácil</option>
            <option value="16">16 cartas · Medio</option>
            <option value="24">24 cartas · Difícil</option>
          </select>
        </div>
        <div className="campo">
          <label htmlFor="tema">Tema de las cartas</label>
          <select
            id="tema"
            value={tema}
            onChange={(e) => cambiar(tamano, e.target.value as Tema)}
          >
            <option value="animales">🐾 Animales</option>
            <option value="comida">🍓 Comida</option>
            <option value="deportes">⚽ Deportes</option>
          </select>
        </div>
        <button className="reiniciar" onClick={reset} type="button">
          ↻ Reiniciar partida
        </button>
      </section>
      <section className="estadisticas" aria-label="Estadísticas">
        <div>
          <span>Movimientos</span>
          <strong>{estado.movimientos}</strong>
        </div>
        <div>
          <span>Tiempo</span>
          <strong>
            {Math.floor(estado.segundos / 60)
              .toString()
              .padStart(2, "0")}
            :{(estado.segundos % 60).toString().padStart(2, "0")}
          </strong>
        </div>
        <div>
          <span>Parejas</span>
          <strong>
            {estado.cartas.filter((c) => c.descubierta).length / 2}
            <small> / {tamano / 2}</small>
          </strong>
        </div>
      </section>
      <Tablero
        estado={estado}
        onVoltear={(id) => dispatch({ tipo: "voltear", id })}
      />
      <p className="ayuda">
        Selecciona dos cartas. También puedes usar Tab, Enter o Espacio.
      </p>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {anuncio}
      </div>
      {estado.fase === "fin" && (
        <section className="victoria" role="status">
          <span aria-hidden="true">🏆</span>
          <h2>¡Lo lograste!</h2>
          <p>
            Encontraste todas las parejas en{" "}
            <strong>{estado.movimientos} movimientos</strong> y{" "}
            <strong>{estado.segundos} segundos</strong>.
          </p>
          {record && <p>¡Nuevo récord para este tamaño!</p>}
          <button type="button" onClick={reset}>
            Jugar de nuevo
          </button>
        </section>
      )}
    </div>
  );
}
import { crearCartas } from "@/lib/memoria";
function crearNueva(tamano: Tamano, tema: Tema) {
  return crearCartas(TEMAS[tema], tamano / 2);
}
