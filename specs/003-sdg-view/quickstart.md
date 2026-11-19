# Quickstart: validar la vista ODS e imágenes

## Prerrequisitos

- Node 20+, dependencias instaladas (`npm install`). Sin dependencias nuevas.
- Fotos copiadas con nombres definitivos (minúscula, sin espacios ni tildes), en `.webp` o `.jpg`:
  - `src/assets/images/slider/slide-1 … slide-5`
  - `src/assets/images/home/proyecto`, `logros`, `recursos`
  - `src/assets/images/activities/semana-1 … semana-4`
  - `src/assets/images/sdg/intro`, `ods-1`, `ods-2`, `ods-3`, `ods-4`, `ods-8`, `ods-12`, `ods-13`, `ods-15`, `ods-17`
  - Si alguna falta, el espacio debe mostrar el placeholder (ver escenario 6).

## Puertas automáticas

```bash
npm run lint && npm run format:check && npm run typecheck && npm test && npm run build
```

Esperado: todo en verde, incluidas las pruebas de integridad (`src/data/__tests__/sdg.test.ts`,
`images.test.ts`). El build muestra un chunk separado para `SdgPage`.

## Escenarios manuales (`npm run dev` y luego `npm run build && npm run preview`)

1. **Navbar** — En 1280 px y 360 px: orden Inicio · Problemáticas · Actividades · ODS; "ODS"
   resaltada en `/ods`; en celular aparece en el menú y lo cierra al navegar; Tab + Enter funcionan.
   Recargar `/ods` en preview carga la vista.
2. **Sección 1** — Explicación breve de ODS/Agenda 2030, mensaje "contribuye a nivel local",
   enlace a la ONU abre en pestaña nueva.
3. **Tarjetas** — 9 tarjetas en 3 grupos (3/4/2); cada una con imagen o placeholder, número con
   color, nombre, nivel, frase y "Ver cómo se relaciona"; hover/foco eleva suavemente.
4. **Modal** — Abrir con clic, toque, Enter y Espacio; ver explicación, metas, actividades con
   semana e indicador (ODS 3 y 15: "No se mide en el plan actual"); Tab no sale de la modal;
   cerrar con botón, Escape y clic fuera; el foco vuelve a la tarjeta.
5. **Filtro** — Todos 9 · Directa 3 · Complementaria 4 · Indirecta 2; flechas cambian opción;
   lector de pantalla anuncia "Mostrando N ODS".
6. **Imágenes** — Renombrar temporalmente una foto: su espacio muestra placeholder sin cambiar la
   altura; restaurarla. Inicio (slider y 3 secciones), Actividades (tarjeta y modal) y ODS muestran
   sus fotos.
7. **Cuadro resumen** — 4 filas coherentes con las modales (ver `data-model.md`); en 360 px se lee
   apilado sin scroll horizontal; el botón lleva a `/actividades`.
8. **Textos sin cambios** — `git diff main -- src/data/slides.ts src/data/activities.ts src/data/project.ts src/data/problems.ts`
   solo muestra cambios en campos `image`.
9. **Responsive / movimiento** — 360, 768 y 1280 px sin scroll horizontal; con "reducir
   movimiento" activado no hay transformaciones en tarjetas.
10. **Lighthouse** (preview, `/ods`, móvil): Accesibilidad 100, Rendimiento ≥ 90, CLS ≈ 0.
