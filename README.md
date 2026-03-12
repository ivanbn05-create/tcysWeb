# Los Tocayos — Web App (SPA)
**Tacos de Barbacoa · Zona Metropolitana de Guadalajara, Jalisco, México**

---

## Estructura del proyecto

```
/
├── index.html              ← Shell HTML (estructura base, no contiene datos)
├── styles.css              ← Todos los estilos
├── app.js                  ← Router SPA, SEO dinámico, orquestador
├── .htaccess               ← Reescritura de URLs para Apache/cPanel
│
├── data/
│   ├── sucursales.js       ← ✏️  Datos de cada sucursal (coords, teléfonos, SEO)
│   ├── menus.js            ← ✏️  Productos por sucursal
│   └── promociones.js      ← ✏️  Promos diarias por sucursal
│
├── components/
│   ├── carrito.js          ← Sistema de carrito + mensaje WhatsApp
│   ├── menu.js             ← Renderer de tarjetas de menú
│   ├── promo.js            ← Renderer de promos del día
│   ├── sucursales.js       ← Renderer de tarjetas + geolocalización
│   └── mapa.js             ← Mapa Leaflet (sin API Key)
│
└── img/
    ├── hero-arboledas.jpg      ← Fondo del hero — Arboledas
    ├── hero-aguilas.jpg        ← Fondo del hero — Las Águilas
    ├── hero-estancia.jpg       ← Fondo del hero — La Estancia
    ├── hero-centromedico.jpg   ← Fondo del hero — Centro Médico
    ├── og-arboledas.jpg        ← Imagen Open Graph Arboledas (1200×630)
    ├── og-aguilas.jpg          ← Imagen Open Graph Las Águilas
    ├── og-estancia.jpg         ← Imagen Open Graph La Estancia
    ├── og-centromedico.jpg     ← Imagen Open Graph Centro Médico
    └── menu/
        ├── taco-barbacoa.jpg
        ├── orden-especial.jpg
        ├── quesataco.jpg
        ├── consome-chico.jpg
        ├── consome-grande.jpg
        ├── agua-sabor.jpg
        ├── taco-cabeza.jpg
        ├── birria.jpg
        ├── paquete-familiar.jpg
        ├── combo-medico.jpg
        └── placeholder.jpg     ← Imagen de respaldo si falla la carga
```

---

## Rutas de la SPA

| URL            | Sucursal          |
|----------------|-------------------|
| `/`            | Arboledas (default) |
| `/arboledas`   | Arboledas         |
| `/aguilas`     | Las Águilas       |
| `/estancia`    | La Estancia       |
| `/centromedico`| Zona Centro Médico|

> El `.htaccess` redirige todas las rutas a `index.html`.  
> El router en `app.js` lee `window.location.pathname` y carga la sucursal correspondiente.

---

## ✏️ Guía de edición rápida

### Cambiar datos de una sucursal
**Archivo:** `data/sucursales.js`

```js
arboledas: {
  lat: 20.7249,        // ← coordenada real de Google Maps (click derecho)
  lng: -103.4198,      // ← coordenada real de Google Maps
  telefono: '3310000001',         // 10 dígitos, sin espacios
  telefonoDisplay: '(33) 1000-0001',
  whatsapp: '5213310000001',      // 521 + 10 dígitos
  direccion: 'Tu dirección real...',
  mapsUrl: 'https://maps.google.com/?q=...',
}
```

**Cómo obtener coordenadas reales:**
1. Abre [maps.google.com](https://maps.google.com)
2. Busca la dirección exacta
3. Haz clic derecho sobre el pin → copia los números (ej. `20.712345, -103.389012`)
4. El primero es `lat`, el segundo es `lng`

---

### Cambiar el menú de una sucursal
**Archivo:** `data/menus.js`

Cada sucursal tiene su propio array en `MENUS_DATA`:

```js
MENUS_DATA = {
  arboledas: [
    ITEMS_BASE.tacoBarbacoa,   // ← producto reutilizable del catálogo base
    ITEMS_BASE.quesataco,
    {
      // O define uno nuevo inline
      id: 'mi-nuevo-producto',
      nombre: 'Nombre del producto',
      descripcion: 'Descripción breve',
      precio: 35,               // número, sin $
      imagen: 'img/menu/mi-foto.jpg',
      categoria: 'tacos',
      badge: '🆕 Nuevo',        // null si no quieres badge
      enCarrito: true,          // false = se muestra pero no se agrega al carrito
    },
  ],
}
```

---

### Cambiar una promoción
**Archivo:** `data/promociones.js`

Estructura por día de la semana (0=Dom, 1=Lun, ... 6=Sáb):

```js
PROMOCIONES_DATA = {
  arboledas: {
    0: null,                    // Domingo — sin promo
    1: PROMOS_BASE.dosX1Tacos,  // Lunes — 1 promo (objeto)
    2: [PROMOS_BASE.bebidaGratis, PROMOS_BASE.tacoExtraMaciza], // 2 promos
    3: null,                    // ...
  }
}
```

Para crear una promo nueva inline:
```js
4: {
  icono: '🎁',
  titulo: 'Título de la promo',
  descripcion: 'Descripción de lo que incluye.',
  disclaimer: '*Condiciones aplican.',
},
```

---

### Cambiar imágenes

| Imagen | Dónde cambiarla |
|--------|-----------------|
| Fondo del hero por sucursal | `data/sucursales.js` → campo `heroImg` |
| Imagen Open Graph por sucursal | `data/sucursales.js` → `seo.og.image` |
| Fotos del menú | `data/menus.js` → campo `imagen` en cada producto |
| Logo (navbar y footer) | `index.html` → etiqueta `<img>` o ajusta CSS |

Todos los `src` son rutas relativas desde la raíz del proyecto.  
Ejemplo: si tu foto está en `img/menu/taco-nuevo.jpg`, pon exactamente `'img/menu/taco-nuevo.jpg'`.

---

### Cambiar el SEO de una sucursal
**Archivo:** `data/sucursales.js` → bloque `seo` de cada sucursal

```js
seo: {
  title:       'Los Tocayos Arboledas | Tacos de Barbacoa en Zapopan, Jalisco',
  description: 'Descripción para Google (máx. 155 caracteres).',
  keywords:    'tacos barbacoa Arboledas, tacos Zapopan...',
  og: {
    image: 'https://www.lostocayos.mx/img/og-arboledas.jpg',
    url:   'https://www.lostocayos.mx/arboledas',
  },
  schema: {
    name:        'Los Tocayos Arboledas',
    description: 'Descripción para Schema.org.',
  },
},
```

---

### Agregar una nueva sucursal

1. **`data/sucursales.js`** → añade un nuevo objeto dentro de `SUCURSALES_DATA` y agrégalo a `SUCURSALES_ORDEN`
2. **`data/menus.js`** → añade su clave en `MENUS_DATA`
3. **`data/promociones.js`** → añade su clave en `PROMOCIONES_DATA`
4. **`index.html`** → añade un `<button class="switcher-tab">` en el branch switcher
5. **`app.js`** → añade la ruta en el objeto `RUTAS`
6. Agrega la imagen del hero: `img/hero-NUEVA.jpg`

---

### Configurar el carrito

El carrito solo aparece en la sucursal Arboledas. Para habilitarlo en otra sucursal:

**`data/sucursales.js`** → cambia `tieneCarrito: false` a `tieneCarrito: true`

Para que un producto **no aparezca** en el carrito (solo sea informativo):

**`data/menus.js`** → `enCarrito: false`

---

## Despliegue

### Hostinger / cPanel / Apache
1. Sube todos los archivos a `public_html/` (o la carpeta raíz de tu dominio)
2. Asegúrate de que el `.htaccess` esté en la raíz
3. Verifica que `mod_rewrite` esté habilitado (en cPanel → "Apache Handlers")
4. Listo

### Netlify / Vercel
Agrega un archivo `netlify.toml` en la raíz:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
O para Vercel, `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Dependencias externas (CDN, sin instalación)

| Librería | Versión | Uso |
|----------|---------|-----|
| Leaflet | 1.9.4 | Mapa interactivo (sin API Key) |
| Font Awesome | 6.5.1 | Íconos |
| Bebas Neue / Oswald / Nunito | — | Tipografía (Google Fonts) |

Ninguna dependencia requiere `npm`, `node_modules` ni build step.  
El proyecto es HTML/CSS/JS puro, carga en cualquier hosting estático.

---

## Notas técnicas

- **SPA sin framework**: el router usa `history.pushState` + `window.onpopstate` para navegación sin recarga
- **SEO dinámico**: cada cambio de sucursal actualiza `<title>`, `<meta>`, Open Graph y el bloque `Schema.org` en el `<head>`
- **Geolocalización**: usa `navigator.geolocation` + fórmula Haversine; al detectar la sucursal más cercana ofrece navegar a ella
- **Carrito**: estado en memoria (objeto `Carrito`); se resetea al recargar la página — diseño intencional para un negocio de comida en tiempo real
- **Scroll Reveal**: `IntersectionObserver` se re-dispara en cada cambio de sucursal para animar los nuevos elementos inyectados
- **Mapa**: al cambiar de sucursal, el mapa se destruye y recrea para evitar bugs de Leaflet con contenedores reutilizados
