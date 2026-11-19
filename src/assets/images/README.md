# Imágenes del sitio

Cada carpeta corresponde a un lugar del sitio. Los datos (`src/data/*.ts`) referencian el **nombre
base** del archivo, sin extensión; se acepta `.webp`, `.jpg`, `.jpeg`, `.png` o `.avif`
(si hay dos con el mismo nombre se prefiere `webp > avif > jpg > jpeg > png > svg`).

**Nombres**: en minúscula, sin espacios ni tildes (`^[a-z0-9-]+\.(webp|jpg|jpeg|png|avif|svg)$`).
El sitio publicado distingue mayúsculas y minúsculas.

| Carpeta       | Archivos esperados                                                                           | Tamaño recomendado |
| ------------- | -------------------------------------------------------------------------------------------- | ------------------ |
| `slider/`     | `slide-1` … `slide-5` (huerta, sustrato, capacitación, comunidad, cosecha)                   | 1920 × 800         |
| `home/`       | `proyecto`, `logros`, `recursos`                                                             | 1200 × 800         |
| `activities/` | `semana-1` … `semana-4`                                                                      | 900 × 600          |
| `sdg/`        | `intro`, `ods-1`, `ods-2`, `ods-3`, `ods-4`, `ods-8`, `ods-12`, `ods-13`, `ods-15`, `ods-17` | 900 × 600          |
| `unused/`     | fotos disponibles que hoy no se muestran (no se incluyen en el build)                        | —                  |

Si un archivo falta o no carga, el sitio muestra `placeholder.svg` con las mismas proporciones.
Al cambiar una foto, revisa su texto alternativo (`alt` / `imageAlt`) en el archivo de datos.
