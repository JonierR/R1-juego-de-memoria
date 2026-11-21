"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  borrarRecords,
  leerRecords,
  type Records as TipoRecords,
} from "@/lib/records";
export function Records() {
  const [records, setRecords] = useState<TipoRecords>({});
  const [cargado, setCargado] = useState(false);
  useEffect(() => {
    setRecords(leerRecords());
    setCargado(true);
  }, []);
  const hay = Object.keys(records).length > 0;
  return (
    <section className="records">
      <span className="eyebrow">TUS MEJORES MARCAS</span>
      <h1>
        Salón de récords<span className="punto">.</span>
      </h1>
      <p>Los mejores resultados se guardan en este navegador.</p>
      {!cargado ? (
        <p>Cargando récords…</p>
      ) : !hay ? (
        <div className="vacio">
          <span aria-hidden="true">🏅</span>
          <h2>Aún no hay récords</h2>
          <p>Completa una partida para conseguir tu primera marca.</p>
          <Link className="enlace-boton" href="/">
            Empezar a jugar
          </Link>
        </div>
      ) : (
        <>
          <div className="lista-records">
            {([12, 16, 24] as const).map((t) => (
              <article key={t} className="record">
                <h2>{t} cartas</h2>
                {records[t] ? (
                  <>
                    <strong>{records[t].movimientos} movimientos</strong>
                    <p>{records[t].segundos} segundos</p>
                    <small>
                      <time dateTime={records[t].fecha}>
                        {new Date(records[t].fecha).toLocaleDateString("es-CO")}
                      </time>
                    </small>
                  </>
                ) : (
                  <p>Sin récord todavía</p>
                )}
              </article>
            ))}
          </div>
          <button
            className="borrar"
            type="button"
            onClick={() => {
              if (
                window.confirm("¿Seguro que quieres borrar todos los récords?")
              ) {
                if (borrarRecords()) setRecords({});
              }
            }}
          >
            Borrar todos los récords
          </button>
        </>
      )}
    </section>
  );
}
