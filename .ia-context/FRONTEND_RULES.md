# Reglas Frontend — Estudio Wiesse & Abogados

## Contexto

- **Producto**: landing institucional estática de un estudio jurídico.
- **Entrada**: `index.html`.
- **Servidor esperado**: Apache o cualquier servidor estático que respete rutas relativas.
- **Objetivo**: transmitir autoridad y confianza, explicar la firma y sus servicios, y facilitar el contacto.
- **No existe actualmente**: aplicación SPA, build pipeline, backend, API, base de datos, sistema de citas o autenticación.

## Estructura real

- `index.html`: markup, contenido, navegación y referencias a todos los recursos.
- `css/`: estilos de la plantilla, dependencias y hojas de estilo del proyecto.
- `js/`: scripts de la plantilla, dependencias y comportamiento del sitio.
- `img/`: recursos visuales y assets del sitio.
- `fonts/` y `webfonts/`: tipografías y fuentes locales.
- `README.md`: documentación de uso del proyecto.
- `.ia-context/`: convenciones para agentes; no forma parte del runtime de la página.

No crear nuevas carpetas tipo `wp-content`, `wp-includes`, `php`, `uploads`, `.env`, `programacion.json` o `citas.json` como si fueran parte del proyecto actual. El sitio se organiza con rutas relativas desde la raíz del proyecto y no requiere un CMS ni build system.

## HTML y contenido

- `index.html` debe contener markup, contenido y referencias a recursos; no debe contener bloques `<style>`, JavaScript inline ni atributos `style` para comportamiento o estilos propios.
- Los cambios de estilo deben mantenerse dentro de `css/` y los cambios de comportamiento dentro de `js/`, respetando la estructura actual del proyecto.
- Mantener `lang="es"`, `meta charset`, viewport y un único `h1` principal.
- Conservar las secciones y anclas relevantes que ya existan en la landing y mantener navegación coherente.
- Usar secciones y headings en una jerarquía comprensible; evitar texto de plantilla, lorem ipsum o etiquetas en inglés si el contenido se está corrigiendo.
- Los datos de la firma deben ser verificables. No inventar áreas de práctica, clientes, reconocimientos, testimonios o casos.
- Los enlaces telefónicos y de correo deben ser accionables (`tel:` y `mailto:`) cuando se modifique el bloque de contacto.
- Los formularios requieren `label` asociado, tipo de campo correcto, `required` cuando aplique, mensajes de estado y un destino real. No presentar un formulario con `action="#"` como funcional.
- Cada imagen debe tener un `alt` descriptivo; usar `alt=""` solo para imágenes puramente decorativas.

## Dirección visual

- Preservar la estética sobria existente del tema Watson: fondo oscuro, acentos turquesa, tipografía serif para títulos y sans-serif para lectura.
- Mantener una jerarquía editorial clara: nombre de la firma primero, propuesta y experiencia después, contacto siempre localizable.
- No añadir tarjetas decorativas anidadas, gradientes genéricos, blobs, animaciones gratuitas ni una estética de producto SaaS.
- Usar iconos solo cuando ya estén disponibles en las dependencias exportadas y acompañarlos con texto accesible cuando el significado no sea evidente.
- No usar texto visible para explicar reglas internas de diseño o atajos de teclado.

## CSS

- Mantener los estilos editables dentro de `css/`; `index.html` solo debe enlazar hojas de estilo.
- Antes de editar un archivo CSS minificado o heredado, confirmar que no exista una alternativa más clara dentro del proyecto y hacer el cambio mínimo necesario.
- Evitar `!important`, selectores globales frágiles y cambios que alteren accidentalmente el layout del sitio.
- Definir dimensiones estables para imágenes, video y controles para evitar saltos de layout.
- Probar como mínimo escritorio y móvil; ningún texto, botón ni navegación debe desbordarse horizontalmente.

## JavaScript y recursos

- Mantener la lógica y configuración del sitio dentro de `js/`; `index.html` solo debe cargar scripts mediante `src`.
- No añadir lógica de negocio inexistente ni endpoints que no existan.
- Mantener el comportamiento del sitio consistente con la estructura actual; si se modifica un script exportado, revisarlo con cuidado y evitar reescribir funciones sin necesidad.
- Preferir assets locales en `img/`, `fonts/` o `webfonts/`; no enlazar recursos externos innecesarios.
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

- Servir desde la raíz del proyecto para que rutas como `./css/...`, `./js/...`, `./img/...` funcionen correctamente.
- Abrir `index.html` mediante Apache y revisar consola y red del navegador.
- Validar manualmente navegación, menú móvil, hero, imágenes, formularios y contenido principal.
- Comprobar ausencia de placeholders, enlaces `#` no intencionales, recursos 404 y errores JavaScript.
- Revisar el diff final y no incluir cambios no relacionados en assets o estructura del frontend.

## Regla de evolución

Si el proyecto incorpora backend, WordPress dinámico o un sistema de build, actualizar primero esta guía y `AGENTS_ROLES.md` con las nuevas rutas, comandos y responsabilidades. Hasta entonces, tratarlo como una landing estática y mantener los cambios pequeños y verificables.