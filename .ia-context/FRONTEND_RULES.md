# Reglas Frontend — Estudio Wiesse & Abogados

## Contexto

- **Producto**: landing institucional estática de un estudio jurídico.
- **Entrada**: `index.html`.
- **Servidor esperado**: Apache o cualquier servidor estático que respete rutas relativas.
- **Objetivo**: transmitir autoridad y confianza, explicar la firma y sus servicios, y facilitar el contacto.
- **No existe actualmente**: aplicación SPA, build pipeline, backend, API, base de datos, sistema de citas o autenticación.

## Estructura real

- `index.html`: markup, contenido, navegación y referencias a todos los recursos.
- `wp-includes/css/custom.css`: estilos propios del proyecto y overrides mantenibles.
- `wp-includes/js/custom.js`: configuración y comportamiento propio de la landing.
- `wp-content/cache/autoptimize/css/`: CSS exportado y minificado del tema/Elementor.
- `wp-content/cache/autoptimize/js/`: JavaScript exportado/minificado de la plantilla.
- `wp-content/uploads/`: video, perfil, firma, logos, portafolio, autores y publicaciones.
- `wp-content/themes/watson/` y `wp-content/themes/watson-child/`: estructura del tema original; no asumir que contienen fuentes editables.
- `wp-includes/js/`: dependencias de WordPress exportadas.
- `.ia-context/`: convenciones para agentes; no forma parte del runtime de la página.

No crear `css/`, `php/`, `images/`, `fonts/`, `.env`, `programacion.json` o `citas.json` como si fueran parte del proyecto actual. Los estilos y scripts propios deben vivir en `wp-includes/css/` y `wp-includes/js/`, separados del HTML.

## HTML y contenido

- `index.html` debe contener markup, contenido y referencias a recursos; no debe contener bloques `<style>`, JavaScript inline ni atributos `style` para comportamiento o estilos propios.
- Todo CSS nuevo debe vivir en `wp-includes/css/custom.css` y todo JavaScript nuevo debe vivir en `wp-includes/js/custom.js`. No mezclar responsabilidades en `index.html`.
- Los estilos inline heredados del exportador deben migrarse a clases en `wp-includes/css/custom.css` cuando se modifique esa zona; no añadir nuevos estilos inline.
- La configuración global requerida por dependencias exportadas debe definirse en `wp-includes/js/custom.js`, antes de cargar el bundle que la consume.
- Mantener `lang="es"`, `meta charset`, viewport y un único `h1` principal.
- Conservar las anclas existentes: `#home`, `#about`, `#resume`, `#portfolio`, `#blog` y `#contact`.
- Usar secciones y headings en una jerarquía comprensible; evitar texto de plantilla como “Ipsum”, “My Resume” o etiquetas en inglés si el contenido se está corrigiendo.
- Los datos de la firma deben ser verificables. No inventar áreas de práctica, clientes, reconocimientos, testimonios o casos.
- Los enlaces telefónicos y de correo deben ser accionables (`tel:` y `mailto:`) cuando se modifique el bloque de contacto.
- Los formularios requieren `label` asociado, tipo de campo correcto, `required` cuando aplique, mensajes de estado y un endpoint real. No presentar un formulario con `action="#"` como funcional.
- Cada imagen debe tener un `alt` descriptivo; usar `alt=""` solo para imágenes puramente decorativas.

## Dirección visual

- Preservar la estética sobria existente del tema Watson: fondo oscuro, acentos turquesa, tipografía serif para títulos y sans-serif para lectura.
- Mantener una jerarquía editorial clara: nombre de la firma primero, propuesta y experiencia después, contacto siempre localizable.
- No añadir tarjetas decorativas anidadas, gradientes genéricos, blobs, animaciones gratuitas ni una estética de producto SaaS.
- Usar iconos solo cuando ya estén disponibles en las dependencias exportadas y acompañarlos con texto accesible cuando el significado no sea evidente.
- No usar texto visible para explicar reglas internas de diseño o atajos de teclado.

## CSS

- Mantener todos los estilos editables en `wp-includes/css/custom.css`; `index.html` solo debe enlazar hojas de estilo.
- Antes de editar un CSS minificado, comprobar que no exista una fuente editable en el tema hijo; si no existe, hacer el cambio mínimo y dejar constancia en el diff.
- Evitar `!important`, selectores globales frágiles y cambios que alteren accidentalmente el layout exportado de Elementor.
- Definir dimensiones estables para imágenes, video y controles para evitar saltos de layout.
- Probar como mínimo escritorio y móvil; ningún texto, botón, navegación o mapa debe desbordarse horizontalmente.

## JavaScript y recursos

- Mantener toda la lógica y configuración propia en `wp-includes/js/custom.js`; `index.html` solo debe cargar scripts mediante `src`.
- No añadir lógica de negocio de citas ni endpoints inexistentes.
- Si se modifica el bundle cacheado, comprobar primero qué comportamiento controla y evitar reescribirlo sin fuente legible.
- Mantener el hero de video silencioso, en bucle y compatible con `playsinline`; respetar `prefers-reduced-motion` cuando se agreguen animaciones nuevas.
- Preferir assets locales en `wp-content/uploads/`; no enlazar recursos externos innecesarios.
- Verificar que cada `src`, `href`, `srcset` y URL de CSS apunta a un archivo existente o a un destino externo intencional.

## Accesibilidad, seguridad y privacidad

- Garantizar contraste suficiente, foco visible y navegación completa por teclado.
- El menú móvil debe tener un control operable, estado comprensible y no ocultar el contenido al teclado.
- No incluir credenciales, tokens, datos de clientes, DNI, teléfonos privados ni información confidencial en HTML o assets públicos.
- Evitar mapas, fuentes o videos externos si no son necesarios; documentar cualquier integración que implique terceros.

## Rendimiento

- Mantener `loading="lazy"` en imágenes que estén fuera del primer viewport y conservar variantes responsive existentes.
- No duplicar videos o imágenes pesadas; reutilizar los archivos de `wp-content/uploads/`.
- Mantener cache busting solo cuando sea necesario y no renombrar artefactos exportados sin actualizar todas sus referencias.

## Despliegue y QA

- Servir desde la raíz del proyecto para que las rutas `./wp-content/...` y `./wp-includes/...` funcionen.
- Abrir `index.html` mediante Apache y revisar consola y red del navegador.
- Validar manualmente navegación, menú móvil, hero, imágenes, video, portafolio, blog, formulario y mapa.
- Comprobar ausencia de placeholders, enlaces `#` no intencionales, recursos 404 y errores JavaScript.
- Revisar el diff final y no incluir cambios no relacionados en cachés o assets.

## Regla de evolución

Si el proyecto incorpora backend, WordPress dinámico o un sistema de build, actualizar primero esta guía y `AGENTS_ROLES.md` con las nuevas rutas, comandos y responsabilidades. Hasta entonces, tratarlo como una landing estática y mantener los cambios pequeños y verificables.