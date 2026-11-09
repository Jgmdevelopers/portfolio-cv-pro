# Documento técnico — Portfolio CV Pro v1.0

## Objetivo
Producto repetible para crear portfolios profesionales individuales sin backend en la primera fase.

## Actores
- Operador GM Tecnología: configura y publica un sitio por cliente.
- Profesional cliente: aprueba textos, imágenes y alcance de datos publicados.
- Visitante: consulta trayectoria y se comunica.

## Diseño técnico
- Arquitectura estática: HTML accesible, CSS responsive, JavaScript vanilla y JSON separado.
- `app.js` lee `config/profesional.json` por HTTP. Usa `textContent`/creación de nodos, no `innerHTML`, para evitar inyección HTML desde datos del cliente.
- Enlaces restringidos a protocolos http(s)/mailto y nuevas pestañas con `noopener noreferrer`.
- Preferencias de tema almacenadas localmente en el navegador. Sin cookies de terceros ni analytics por defecto.
- La personalización por cliente exige nuevo deploy; no existe panel ni edición en vivo.

## Decisiones de producto
- v1 incluye perfil, experiencia, formación, habilidades, proyectos y contacto.
- Secciones de datos vacíos u opcionalmente deshabilitadas no se muestran.
- PDF y foto son opt-in. No hay formularios para evitar backend, spam y procesamiento de datos.
- Datos ficticios únicamente en demostración; nunca publicar datos de un cliente sin autorización.

## Flujo de trabajo profesional
1. Relevamiento: actividad, público objetivo, CV, foto, referencias visuales y canales de contacto.
2. Alcance: definir secciones, cantidad de experiencias/proyectos y nivel de personalización.
3. Implementación: rama feature, PR, revisión, validación de datos y pruebas.
4. QA: móvil (360px), tablet (768px), desktop (1440px), teclado, modo oscuro, enlaces y PDF.
5. Aprobación del cliente sobre datos y diseño.
6. Publicación: GitHub Pages, HTTPS, DNS si corresponde; checklist final.
7. Entrega: URL, alcance de mantenimiento, copia/exportación de contenido y documentación.

## Pruebas y criterios de aceptación
- `node tests/validar-config.mjs` debe pasar.
- Navegación por anclas opera sin barra tapando títulos.
- Menú móvil se abre, se cierra al navegar y refleja aria-expanded.
- Modo claro/oscuro funciona y persiste tras refrescar.
- Si `foto` está vacío se muestran iniciales; si `cv` está vacío no aparece descarga.
- Proyectos no renderizan enlaces con protocolos peligrosos.
- No hay scroll horizontal en ancho móvil.
- GitHub Pages sirve configuración, estilos y JS usando rutas relativas.

## Riesgos y límites
- Contenido y fotos publicadas son accesibles públicamente. Requiere consentimiento y revisión de privacidad.
- El JSON se descarga públicamente y no debe almacenar contraseñas, teléfonos privados u otros secretos.
- No hay formulario, CMS, autenticación, dashboard, SEO avanzado, métricas ni editor.
- No se garantiza posicionamiento SEO; se requiere contenido real, dominio, metadatos individuales y pruebas posteriores.

## Roadmap
- v1.1: foto e imágenes por proyecto, variantes de diseño, OG/social cards, favicon, sitemap, pruebas automatizadas de navegador.
- v1.2: CLI/validador completo de personalización, generador de PDFs y paquete de entrega reproducible.
- v2: panel autogestionable solo si el negocio valida demanda recurrente.
