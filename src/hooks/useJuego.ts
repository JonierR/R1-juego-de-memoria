"use client";
import { useEffect, useReducer, useState } from "react";
import { crearCartas, TEMAS, type Tamano, type Tema } from "@/lib/memoria";
import { estadoInicial, juegoReducer } from "@/lib/juegoReducer";
export function useJuego(tamano: Tamano, tema: Tema) {
  const [estado, dispatch] = useReducer(juegoReducer, undefined, () =>
    estadoInicial(crearCartas(TEMAS[tema], tamano / 2)),
  );
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (estado.volteadas.length !== 2) return;
    const id = window.setTimeout(() => dispatch({ tipo: "resolver" }), 800);
    return () => window.clearTimeout(id);
  }, [estado.volteadas]);
  useEffect(() => {
    if (estado.fase !== "jugando" || !visible) return;
    const id = window.setInterval(() => dispatch({ tipo: "tic" }), 1000);
    return () => window.clearInterval(id);
  }, [estado.fase, visible]);
  const reiniciar = () =>
    dispatch({
      tipo: "reiniciar",
      cartas: crearCartas(TEMAS[tema], tamano / 2),
    });
  return { estado, dispatch, reiniciar };
}
