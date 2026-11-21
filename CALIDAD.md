# Informe de calidad — R1

**Estado:** estructura preparada; las mediciones reales requieren instalar, ejecutar y desplegar la aplicación. No se presentan métricas inventadas.

## Metas

| Indicador                    | Objetivo | Resultado de producción |
| ---------------------------- | -------: | ----------------------- |
| LCP p75                      |  ≤ 2,5 s | Pendiente               |
| INP p75                      | ≤ 200 ms | Pendiente               |
| CLS p75                      |    ≤ 0,1 | Pendiente               |
| Lighthouse móvil rendimiento |     ≥ 90 | Pendiente               |
| Lighthouse accesibilidad     |     ≥ 95 | Pendiente               |
| Lighthouse buenas prácticas  |     ≥ 95 | Pendiente               |
| Lighthouse SEO               |     ≥ 95 | Pendiente               |
| JavaScript transferido       | ≤ 200 kB | Pendiente               |

## Evidencias por recolectar

- Lighthouse móvil y escritorio para `/` con 24 cartas y `/records`.
- Capturas a 360, 768 y 1024 px, vertical/horizontal y zoom 200 %.
- axe DevTools, validador HTML W3C y recorrido manual con teclado y VoiceOver/NVDA.
- Captura del resultado de `npm run check` y cobertura.
- Métricas antes/después medidas sobre URL pública.

## Tres retos de excelencia seleccionados (pendientes de verificar)

1. Modo oscuro con `prefers-color-scheme` y foco visible: contrastes por verificar.
2. Estilos de impresión y SEO (robots, sitemap, metadatos): validar en producción.
3. Pruebas automatizadas de interfaz y lógica: ejecutar y aportar evidencia.

**Nota:** el reto 3 no sustituye los retos exactos del enunciado; para cumplir la rúbrica, elegir y demostrar un tercer reto oficial (por ejemplo Playwright + axe en 3 anchos). No marcar completado sin prueba.
