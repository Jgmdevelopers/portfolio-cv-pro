# Portfolio CV Pro — MVP v1.0

Plantilla estática, profesional, responsive y personalizable para CV/portfolio individuales.

## Requisitos
- Navegador moderno
- Python 3 (solo para servidor local) o extensión Live Server de VS Code
- Git para versionar/publicar

## Ejecución local
```bash
cd portfolio-cv-pro
python -m http.server 5500
```
Visitar http://localhost:5500. **No abrir index.html con file://** porque `fetch` del JSON requiere HTTP.

## Personalizar
1. Editar `config/profesional.json` con los datos autorizados del cliente.
2. Definir `foto` con una ruta relativa, por ejemplo `assets/img/perfil.jpg`, y guardar la foto en esa ubicación.
3. Para habilitar "Descargar CV", guardar el PDF autorizado en `assets/cv.pdf` y configurar `"cv": "assets/cv.pdf"`.
4. Modificar `color` con un color hexadecimal válido (por ejemplo `#2563eb`).
5. Completar `contacto`: WhatsApp como código de país + número, solo dígitos, por ejemplo `549...` (sin `+`).
6. Poner una sección en `false` en `secciones` para ocultarla. Si no tiene elementos, se oculta automáticamente.
7. Probar en móvil y desktop, verificar enlaces, foto, ortografía y autorización de publicación de datos personales.

Los nombres, textos y proyectos del JSON son **ficticios** y deben reemplazarse antes de entregar al cliente. El correo `example.com` no es real.

## Publicar en GitHub Pages
1. Crear repositorio para el sitio del cliente (si se usa el plan gratuito, repositorio público).
2. Hacer commit y push a `main`.
3. En **Settings → Pages → Build and deployment**, elegir **Deploy from a branch**, `main`, `/ (root)`.
4. Esperar que GitHub muestre la URL. No es necesario configurar Actions para esta versión sin build.
5. Si se conecta dominio propio, configurarlo también en GitHub Pages y el DNS del proveedor.

**Importante:** el repositorio de la plantilla base puede ser privado; no incluir información sensible ni material sin permiso en el repo publicado de cada cliente. GitHub Pages sirve contenido público; no es un almacén privado de CVs.

## Estructura
- `index.html`: semántica de la página
- `assets/css/styles.css`: diseño y breakpoints
- `assets/js/app.js`: render seguro de datos + tema + menú
- `config/profesional.json`: configuración por cliente
- `docs/ARQUITECTURA.md`: alcance, diseño, criterios de aceptación y roadmap
- `tests/validar-config.mjs`: chequeo simple de configuración con Node.js

## Criterios de entrega
- JSON válido, sin datos ficticios pendientes
- Todos los enlaces funcionan
- CV se descarga si está configurado; si no, no aparece el botón
- Foto propia o iniciales si no hay foto
- Navegación móvil y cambio de tema funcionan
- Sin errores en consola ni contenido desbordado a 360px
- Publicación aprobada por cliente

## Git sugerido
```bash
git init
git checkout -b main
git add .
git commit -m "feat: crear MVP portfolio cv pro"
git checkout -b feat/primer-cliente
```

El archivo `.nojekyll` permite servir el sitio estático sin Jekyll en GitHub Pages.
