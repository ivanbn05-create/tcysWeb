# Los Tocayos — Web App (SPA)
**Tacos de Barbacoa · Zona Metropolitana de Guadalajara, Jalisco, México**

---

## Estructura del proyecto

```
/
├── index.html              ← Shell HTML (estructura base, no contiene datos)
├── styles.css              ← Todos los estilos ("Fuego Lento" design system)
├── app.js                  ← Router SPA, SEO dinámico, orquestador
├── .htaccess               ← Reescritura de URLs para Apache/cPanel
│
├── data/
│   ├── sucursales.js       ← ✏️  Datos de cada sucursal (coords, teléfonos, horario, SEO)
│   ├── menus.js            ← ✏️  Productos por sucursal
│   └── promociones.js      ← ✏️  Promos diarias por sucursal (con productoId para carrito)
│
├── components/
│   ├── carrito.js          ← Sistema de carrito + mensaje WhatsApp
│   ├── menu.js             ← Renderer de tarjetas de menú
│   ├── promo.js            ← Renderer de promos del día (botón "Agregar al pedido" en Arboledas)
│   ├── sucursales.js       ← Renderer de tarjetas + geolocalización
│   └── mapa.js             ← Mapa Leaflet con popup "Cómo llegar" y WhatsApp
│
└── img/
    ├── og-arboledas.jpg        ← Open Graph Arboledas (1200×630)
    ├── og-aguilas.jpg          ← Open Graph Las Águilas
    ├── og-estancia.jpg         ← Open Graph La Estancia
    ├── og-centromedico.jpg     ← Open Graph Centro Médico
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
        └── placeholder.jpg
```

> Las imágenes de hero (`heroImg` en `data/sucursales.js`) actualmente usan
> URLs de Unsplash como placeholder. Reemplázalas con fotos reales de cada sucursal
> para producción.

---

## Rutas de la SPA

| URL            | Sucursal            |
|----------------|---------------------|
| `/`            | Arboledas (default) |
| `/arboledas`   | Arboledas           |
| `/aguilas`     | Las Águilas         |
| `/estancia`    | La Estancia         |
| `/centromedico`| Zona Centro Médico  |

> El `.htaccess` redirige todas las rutas a `index.html`.
> El router en `app.js` lee `window.location.pathname` y carga la sucursal correspondiente.

---

## ✏️ Guía de edición rápida

### Cambiar datos de una sucursal
**Archivo:** `data/sucursales.js`

```js
arboledas: {
  lat: 20.7249,                   // ← coordenada real de Google Maps (click derecho)
  lng: -103.4198,
  telefono: '3310000001',         // 10 dígitos, sin espacios ni +
  telefonoDisplay: '(33) 1000-0001',
  whatsapp: '5213310000001',      // 521 + 10 dígitos, sin espacios ni +
  direccion: 'Tu dirección real...',
  mapsUrl: 'https://maps.google.com/?q=...',

  // Horario: una sola cadena de texto — sin separar entresemana/fin de semana.
  // Arboledas no cierra ningún día → 'Lun – Dom · ...'
  // Las demás sucursales descansan un día → 'Lun – Sáb · ...'
  horario: 'Lun – Dom · 9:30 – 17:30',

  // Imagen de fondo del hero. Ruta relativa desde la raíz o URL absoluta.
  // Para producción: sube una foto real de la sucursal y pon la ruta aquí.
  heroImg: 'img/hero-arboledas.jpg',
}
```

**Cómo obtener coordenadas reales:**
1. Abre [maps.google.com](https://maps.google.com)
2. Busca la dirección exacta
3. Click derecho sobre el pin → copia los números (ej. `20.712345, -103.389012`)
4. El primero es `lat`, el segundo es `lng`

---

### Cambiar el menú de una sucursal
**Archivo:** `data/menus.js`

```js
MENUS_DATA = {
  arboledas: [
    ITEMS_BASE.tacoBarbacoa,   // ← producto del catálogo base
    ITEMS_BASE.quesataco,
    {
      // O define uno inline:
      id: 'mi-nuevo-producto',
      nombre: 'Nombre del producto',
      descripcion: 'Descripción breve.',
      precio: 35,               // número, sin $
      imagen: 'img/menu/mi-foto.jpg',
      categoria: 'tacos',
      badge: '🆕 Nuevo',        // null si no quieres badge
      enCarrito: true,          // false = informativo, no se agrega al carrito
    },
  ],
}
```

---

### Cambiar una promoción
**Archivo:** `data/promociones.js`

Estructura por día (0 = Dom, 1 = Lun, … 6 = Sáb):

```js
PROMOCIONES_DATA = {
  arboledas: {
    0: null,                    // Domingo — sin promo
    1: PROMOS_BASE.dosX1Tacos,  // Lunes — 1 promo
    2: [PROMOS_BASE.bebidaGratis, PROMOS_BASE.tacoExtraMaciza], // 2 promos
    3: null,
    // ...
  }
}
```

**Campo `productoId`** (opcional):
Si la sucursal tiene carrito (`tieneCarrito: true`) y la promo incluye un `productoId`,
la sección de promos mostrará un botón **"Agregar al pedido"** que añade ese producto
directamente al carrito. Si la promo no tiene `productoId`, o la sucursal no tiene
carrito, se muestra el botón genérico "¡La quiero!" que hace scroll a sucursales.

```js
// Ejemplo de promo con botón de carrito:
4: {
  productoId: 'quesataco',    // ← debe existir en MENUS_DATA[sucursalId]
  icono: '🧀',
  titulo: 'Jueves de Quesatacos',
  descripcion: '3 quesatacos al precio de 2.',
  disclaimer: '*Hasta agotar existencias.',
},

// Ejemplo de promo sin botón de carrito (solo informativa):
5: {
  icono: '🎉',
  titulo: 'Viernes Carnívoro',
  descripcion: 'Kilo de barbacoa a precio especial.',
  disclaimer: '*Pedido anticipado recomendado.',
},
```

---

### Cambiar imágenes

| Imagen | Dónde cambiarla |
|--------|-----------------|
| Hero por sucursal | `data/sucursales.js` → campo `heroImg` |
| Open Graph por sucursal | `data/sucursales.js` → `seo.og.image` |
| Fotos del menú | `data/menus.js` → campo `imagen` en cada producto |

Todos los `src` son rutas relativas desde la raíz del proyecto o URLs absolutas.

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

### Enlace "Cortes" en el navbar
**Archivo:** `index.html` → dentro del `<nav>`, el último `<li>`:

```html
<li>
  <a href="https://TU-TIENDA-DE-CORTES.COM"
     class="nav-cta"
     target="_blank"
     rel="noopener noreferrer">
    <i class="fa-solid fa-fire-flame-curved"></i> Cortes
  </a>
</li>
```

Reemplaza `https://TU-TIENDA-DE-CORTES.COM` con la URL real de la tienda de cortes.

---

### Configurar el carrito

El carrito solo aparece en la sucursal Arboledas. Para habilitarlo en otra sucursal:

**`data/sucursales.js`** → `tieneCarrito: true`

Para que un producto **no aparezca** en el carrito (solo informativo):

**`data/menus.js`** → `enCarrito: false`

---

### Agregar una nueva sucursal

1. **`data/sucursales.js`** → añade objeto en `SUCURSALES_DATA` y agrégalo a `SUCURSALES_ORDEN`
2. **`data/menus.js`** → añade su clave en `MENUS_DATA`
3. **`data/promociones.js`** → añade su clave en `PROMOCIONES_DATA`
4. **`index.html`** → añade `<button class="switcher-tab">` en el branch switcher
5. **`app.js`** → añade la ruta en el objeto `RUTAS`
6. Agrega la imagen del hero: `img/hero-NUEVA.jpg` (o URL externa)

---

## Mapa de sucursales (Leaflet)

El popup de cada marcador en el mapa muestra:
- Nombre de la sucursal
- Dirección
- Teléfono (clicable)
- Horario
- **Botón "Cómo llegar"** → abre `mapsUrl` en nueva pestaña
- **Botón "WhatsApp"** → abre chat de WhatsApp con mensaje predefinido

El marcador de la sucursal actualmente seleccionada se muestra en **ámbar** y con popup abierto por defecto. Los demás marcadores son en rojo.

---

## Despliegue

### Hostinger / cPanel / Apache
1. Sube todos los archivos a `public_html/`
2. Asegúrate de que `.htaccess` esté en la raíz
3. Verifica que `mod_rewrite` esté habilitado (cPanel → "Apache Handlers")

### Netlify
```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel
```json
// vercel.json
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

No requiere `npm`, `node_modules` ni build step.
Es HTML/CSS/JS puro, funciona en cualquier hosting estático.

---

## Notas técnicas

| Característica | Detalle |
|---|---|
| **Router SPA** | `history.pushState` + `window.onpopstate`; sin recarga de página |
| **SEO dinámico** | Cada cambio de sucursal actualiza `<title>`, `<meta>`, Open Graph y Schema.org |
| **Horario** | Campo `horario` en cada sucursal: cadena única de texto. No se separa entresemana/fin de semana. Los días de apertura varían por sucursal. |
| **Geolocalización** | `navigator.geolocation` + fórmula Haversine; detecta la sucursal más cercana |
| **Carrito** | Estado en memoria (objeto `Carrito`); se resetea al recargar — diseño intencional para pedidos en tiempo real |
| **Promos con carrito** | Si la sucursal tiene `tieneCarrito: true` y la promo tiene `productoId`, el botón "¡La quiero!" se reemplaza por "Agregar al pedido" |
| **Mapa Leaflet** | Dark theme (CartoDB Dark Matter). Popup con botones WhatsApp y Cómo llegar. Al cambiar sucursal, el mapa se destruye y recrea para evitar bugs de Leaflet |
| **Scroll Reveal** | `IntersectionObserver` re-disparado en cada cambio de sucursal |
| **Botón "Cortes"** | Enlace externo en navbar a la tienda de cortes (URL configurable en `index.html`) |
