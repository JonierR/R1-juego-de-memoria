# Memo — R1 Juego de memoria

Juego de parejas con Next.js App Router, React, TypeScript, CSS responsivo, accesibilidad y récords en `localStorage`.

## Ejecutar

Requiere Node.js LTS y npm.

```bash
npm install
npm run dev
```

Abrir http://localhost:3000. Otras órdenes:

```bash
npm test
npm run check
npm run build
```

`check` comprueba tipos, ESLint, Prettier y Vitest con cobertura mínima del 80 % de la lógica. Si Prettier detecta formato, ejecutar `npx prettier --write .` y repetir el chequeo.

## Estructura

- `src/lib/memoria.ts`: Fisher–Yates y creación de cartas.
- `src/lib/juegoReducer.ts`: máquina de estados pura.
- `src/lib/records.ts`: validación y almacenamiento seguro.
- `src/hooks/useJuego.ts`: temporizadores, limpieza y visibilidad.
- `src/components/`: tablero, cartas, juego y récords.
- `src/app/`: páginas `/` y `/records`, layout, metadatos.
- `tests/`: pruebas unitarias y de interfaz.
- `ia/` y `calidad/`: documentación y guiones de evidencia.

## Publicación

**URL de Vercel:** pendiente de publicar por el estudiante.

1. Revisar y personalizar `AGENTS.md` antes de comenzar el historial propio de Git.
2. Crear el primer commit solo con la configuración de IA, antes de incorporar el código generado; no falsear la cronología.
3. Incorporar y revisar el código en commits graduales propios (al menos ocho).
4. Hacer `git push` personalmente, importar el repositorio en Vercel y publicar.
5. Sustituir esta sección por la URL real y completar `CALIDAD.md` y `ia/BITACORA.md` con evidencias auténticas.

## Sustentación

Para cambiar un tema, editar `TEMAS` en `src/lib/memoria.ts`. Para añadir un tamaño, actualizar `Tamano`, selectores y récords. Para cambiar la puntuación, editar el caso `voltear` de `juegoReducer`. Explicar por qué los efectos limpian `setTimeout` y `setInterval`.
