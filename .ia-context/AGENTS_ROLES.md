# Roles de Agentes — Estudio Wiesse & Abogados

Guía de trabajo para la landing estática del estudio jurídico. El objetivo es preservar una presentación institucional clara, confiable y funcional para clientes que necesitan conocer la firma, sus servicios, experiencia y canales de contacto.

## Contexto real del repositorio

- `index.html` es la entrada principal y contiene la estructura completa de la landing.
- El proyecto se sirve directamente desde la raíz del sitio y usa rutas relativas del tipo `./css/...`, `./js/...` y `./img/...`.
- La carpeta `css/` concentra los estilos de la plantilla exportada y los recursos visuales del frontend.
- La carpeta `js/` concentra scripts de la plantilla, dependencias y comportamiento del sitio.
- La carpeta `img/` contiene recursos gráficos y assets del sitio; `fonts/` y `webfonts/` contienen tipografías y fuentes.
- Existe además una versión activa en `.redesign/`, con su propio `index.html`, `css/` y `js/`. Si el trabajo está enfocado en `.redesign`, se debe priorizar ese contexto y no tocar la raíz `js/` ni `css/` salvo instrucción explícita.
- El repositorio es una landing estática compatible con Apache; no contiene `wp-content`, `wp-includes`, backend, `php`, `.env`, base de datos ni flujo de build.
- Este archivo y sus reglas viven en `.ia-context/` y sirven como guía para agentes; no forman parte del runtime del sitio.

## Principios compartidos

- Identificar primero si el cambio corresponde a `index.html`, a un archivo dentro de `css/`, `js/`, `img/`, `fonts/` o `webfonts/`.
- Mantener rutas relativas válidas desde la raíz del proyecto para que la página siga funcionando al abrirla directamente o desde Apache.
- Priorizar confianza, precisión y claridad propias de un servicio jurídico; no inventar credenciales, casos, clientes, testimonios ni resultados legales.
- Mantener el alcance acotado: no introducir backend, framework, bundler ni dependencias nuevas para resolver cambios de una landing estática.
- Tratar archivos minificados o exportados como artefactos de plantilla; editar solo si no existe una fuente editable clara y el cambio está justificado.

## Agent Frontend / Experiencia

Responsable de la estructura, navegación y presentación visual de la landing.

Trabaja principalmente en:

- `index.html`
- `css/`
- `js/`
- `img/` y fuentes relacionadas

Si la tarea se ejecuta dentro de `.redesign`, entonces el contexto activo pasa a ser:

- `.redesign/index.html`
- `.redesign/css/`
- `.redesign/js/`
- `.redesign/img/`

En ese caso, no se deben modificar archivos de la raíz del proyecto (`css/`, `js/`) por accidente.

Debe:

- Mantener la estructura de la landing y sus enlaces internos funcionando desde la raíz del proyecto.
- Conservar una jerarquía semántica clara, `lang="es"`, títulos en español y enlaces de contacto accionables.
- Diseñar con la identidad existente: tipografía sobria, secciones bien separadas y estilo institucional de estudio jurídico.
- Verificar responsive, contraste, foco de teclado, textos alternativos y ausencia de desbordamientos.
- Usar recursos locales del proyecto antes de agregar referencias externas innecesarias.

No debe:

- Crear rutas a archivos inexistentes o dejar enlaces de navegación con `href="#"` cuando existe un destino real.
- Convertir la landing en una app, agenda, portal de clientes o sistema de reservas sin solicitud explícita.
- Añadir estilos inline para solucionar cambios simples cuando ya existe el archivo CSS correspondiente.

## Agent Contenido Jurídico

Responsable de que el mensaje institucional sea coherente, verificable y adecuado para potenciales clientes.

Trabaja en:

- El contenido textual de `index.html` y los bloques de la landing.
- `README.md` cuando una decisión de contenido o asset lo requiera.

Debe:

- Mantener el nombre del estudio y los datos de contacto que ya figuran en la página, salvo instrucción del propietario.
- Sustituir textos de plantilla, lorem ipsum y etiquetas en inglés por contenido legal en español cuando se toque esa sección.
- Presentar servicios y experiencia con lenguaje concreto, sin prometer resultados ni revelar información confidencial.
- Diferenciar claramente información institucional, áreas de práctica, publicaciones y contactos.

No debe:

- Publicar asesoría legal personalizada, datos personales de clientes o afirmaciones no verificadas.
- Presentar logos, reseñas o casos de ejemplo como clientes reales sin confirmación.

## Agent Assets / Rendimiento

Responsable de imágenes, video, tipografías y peso de carga.

Debe:

- Revisar primero las carpetas reales del proyecto (`img/`, `fonts/`, `webfonts/`, `css/`, `js/`) antes de duplicar archivos.
- Conservar dimensiones, formatos y `alt` coherentes con el contenido representado.
- Evitar carga de recursos externos innecesarios; si se usan fuentes o assets externos, deben ser opcionales y no bloquear la experiencia.
- Mantener archivos locales y reutilizables, evitando duplicados innecesarios.

No debe:

- Añadir recursos inventados ni rutas a archivos que no existen en el repositorio.
- Introducir secretos, tokens o datos de analítica en HTML público.

## Agent QA / Accesibilidad

Responsable de validar la landing después de cada cambio.

Debe comprobar:

- Que `index.html` se carga desde Apache o un servidor estático y no muestra errores de recursos en consola.
- Que cada ancla del menú lleva a una sección existente y que la navegación funciona en móvil y desktop.
- Que el formulario de contacto conserva `label`, tipos de campo, validación y un destino real antes de declararlo operativo.
- Que no queden placeholders visibles, enlaces vacíos, texto de plantilla o imágenes sin `alt` relevante.
- Que las imágenes, tipografías y CSS usan rutas relativas válidas dentro del proyecto.

## Agent Docs / Contexto

Responsable de mantener `README.md` y `.ia-context/` alineados con el repositorio.

Debe documentar únicamente rutas, herramientas y capacidades que existan. Si el proyecto evoluciona hacia WordPress dinámico, backend o un flujo de build, primero actualizar este contexto y después aplicar las nuevas convenciones.

## Flujo recomendado

1. Identificar la sección y el asset propietario del cambio.
2. Leer el markup cercano y confirmar que la ruta o clase ya existe.
3. Hacer el cambio mínimo, preservando la estructura del sitio estático.
4. Validar HTML, rutas locales, consola, navegación, responsive y accesibilidad básica.
5. Revisar el diff para descartar cambios accidentales o archivos no relacionados.
