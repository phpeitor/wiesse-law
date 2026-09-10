# Roles de Agentes — Estudio Wiesse & Abogados

Guía de trabajo para la landing estática del estudio jurídico. El objetivo es preservar una presentación institucional clara, confiable y funcional para clientes que necesitan conocer la firma, sus servicios, experiencia, publicaciones y canales de contacto.

## Contexto real del repositorio

- `index.html` es la entrada única y contiene toda la experiencia de la landing.
- La página usa el tema Watson/Elementor exportado, con navegación por anclas: `#home`, `#about`, `#resume`, `#portfolio`, `#blog` y `#contact`.
- Los estilos principales están en `wp-content/cache/autoptimize/css/`.
- Los scripts disponibles son dependencias exportadas o minificadas en `wp-content/cache/autoptimize/js/` y `wp-includes/js/`; no existe un código fuente JavaScript separado.
- Las imágenes y el video están en `wp-content/uploads/`; las carpetas `wp-content/themes/watson/` y `wp-content/themes/watson-child/` pertenecen al origen WordPress exportado.
- Es un sitio estático compatible con Apache. Actualmente no hay `js/`, `php/`, `.env`, Composer, API, calendario ni persistencia de citas en este repositorio.

## Principios compartidos

- Identificar primero si el cambio pertenece al contenido/markup de `index.html`, a un asset de `wp-content/uploads/` o a un CSS/JS exportado.
- Mantener las rutas relativas existentes para que la página siga funcionando desde la raíz del proyecto.
- Priorizar confianza, precisión y claridad propias de un servicio jurídico; no inventar credenciales, casos, clientes, testimonios ni resultados legales.
- Mantener el alcance acotado: no introducir backend, framework, bundler o dependencias nuevas para resolver cambios de una landing estática.
- Tratar el CSS y JavaScript minificados de `cache/autoptimize/` como artefactos generados. Solo editarlos si no existe una fuente editable y el cambio está justificado; documentar cualquier modificación manual.

## Agent Frontend / Experiencia

Responsable de la estructura, navegación y presentación visual de la landing.

Trabaja principalmente en:

- `index.html`
- `wp-content/cache/autoptimize/css/` cuando sea necesario corregir estilos exportados
- `wp-content/uploads/` cuando se incorpore o reemplace un recurso visual real

Debe:

- Mantener las seis secciones y sus anclas funcionando, incluida la navegación móvil del tema.
- Conservar una jerarquía semántica clara, `lang="es"`, títulos en español y enlaces de contacto accionables.
- Diseñar con la identidad existente: tipografía serif para encabezados, sans-serif para lectura y una estética sobria de estudio jurídico.
- Verificar responsive, contraste, foco de teclado, textos alternativos y ausencia de desbordamientos.
- Usar los assets locales antes de añadir recursos externos y conservar `loading="lazy"` en imágenes fuera del primer viewport cuando corresponda.

No debe:

- Convertir la landing en una agenda, un portal de clientes o una aplicación de reservas sin una solicitud explícita.
- Crear rutas a archivos que no existen ni dejar enlaces de navegación con `href="#"` cuando exista un destino real.
- Añadir estilos inline o dependencias nuevas para resolver un ajuste visual sencillo.

## Agent Contenido Jurídico

Responsable de que el mensaje institucional sea coherente, verificable y adecuado para potenciales clientes.

Trabaja en:

- El contenido textual de `index.html` dentro de `about`, `resume`, `portfolio`, `blog` y `contact`.
- `README.md` cuando una decisión de contenido o asset necesite documentarse.

Debe:

- Mantener el nombre Estudio Wiesse & Abogados y los datos de contacto que ya figuran en la página, salvo instrucción del propietario.
- Sustituir textos de plantilla, lorem ipsum y etiquetas en inglés por contenido legal en español cuando se toque esa sección.
- Presentar servicios y experiencia con lenguaje concreto, sin prometer resultados ni revelar información confidencial.
- Diferenciar claramente información institucional, áreas de práctica, publicaciones y testimonios.

No debe:

- Publicar asesoría legal personalizada, datos personales de clientes o afirmaciones no verificadas.
- Presentar logos, reseñas o casos de ejemplo como clientes reales sin confirmación.

## Agent Assets / Rendimiento

Responsable de imágenes, video, tipografías y peso de carga.

Debe:

- Revisar primero `wp-content/uploads/` y reutilizar variantes existentes antes de duplicar archivos.
- Mantener `video.mp4` con `autoplay`, `loop`, `playsinline` y `muted` solo si el hero sigue siendo usable con movimiento reducido o sin audio.
- Conservar dimensiones, formatos y `alt` coherentes con el contenido representado.
- Evitar llamadas externas innecesarias; las fuentes de Google son opcionales y debe existir una experiencia legible si fallan.

No debe:

- Cometer cambios masivos en archivos cacheados ni reemplazar assets reales por imágenes genéricas de stock sin aprobación.
- Introducir secretos, tokens o datos de analítica en HTML público.

## Agent QA / Accesibilidad

Responsable de validar la landing después de cada cambio.

Debe comprobar:

- Que `index.html` se carga desde Apache y no muestra errores de recursos en consola.
- Que cada ancla del menú lleva a una sección existente y que el menú móvil puede abrirse y cerrarse con teclado.
- Que el formulario de contacto conserva `label`, tipos de campo, estados de validación y un destino real antes de declararlo operativo.
- Que no quedan placeholders visibles, enlaces vacíos, texto de plantilla o imágenes sin `alt` relevante.
- Que las imágenes, el video, el mapa y el CSS usan rutas relativas válidas.

## Agent Docs / Contexto

Responsable de mantener `README.md` y `.ia-context/` alineados con el repositorio.

Debe documentar únicamente rutas, herramientas y capacidades que existan. Si el proyecto evoluciona hacia WordPress dinámico, backend o un pipeline de build, primero actualizar este contexto y después aplicar las nuevas convenciones.

## Flujo recomendado

1. Identificar la sección y el asset propietario del cambio.
2. Leer el markup cercano y confirmar que la ruta o clase ya existe.
3. Hacer el cambio mínimo, preservando la estructura exportada.
4. Validar HTML, rutas locales, consola, navegación, responsive y accesibilidad básica.
5. Revisar el diff para descartar cambios accidentales en cachés o contenido no relacionado.
