/**
 * ================================================================
 * LOS TOCAYOS — data/sucursales.js
 * Fuente única de datos de sucursales.
 * ================================================================
 * ✏️  APPS DE ENTREGA (campo `delivery` en cada sucursal):
 *
 *   delivery: {
 *     uberEats: { activo: true,  url: 'https://ubereats.com/...' },
 *     didi:     { activo: true,  url: 'https://food.didiglobal.com/...' },
 *     rappi:    { activo: false, url: '' },
 *   }
 *
 *   · activo: true  → el botón aparece en el hero de esa sucursal
 *   · activo: false → botón oculto (aunque tenga url)
 *   · url: enlace directo a la página de la sucursal en la app
 * ================================================================
 */

'use strict';

const SUCURSALES_DATA = {

  /* ── SUCURSAL 1 — MARIANO OTERO (PRINCIPAL, tiene carrito) ──── */
  arboledas: {
    id: 'arboledas',
    slug: 'arboledas',
    esPrincipal: true,
    tieneCarrito: true,
    nombre: 'Mariano Otero',
    nombreCompleto: 'Los Tocayos Mariano Otero',
    subtitulo: 'Sucursal Principal',

    lat: 20.63183901659015,
    lng: -103.42938124907371,

    direccion: 'Av. Mariano Otero 5665, Arboledas, 45070 Zapopan, Jal.',
    ciudad: 'Zapopan',
    estado: 'Jalisco',
    cp: '45070',
    telefono: '3315421635',
    telefonoDisplay: '(33) 1542-1635',
    whatsapp: '5213323324878',
    mapsUrl: 'https://maps.app.goo.gl/f4rZjW4jQqRVoidq8',

    horario: 'Lun – Dom · 9:30 – 17:30',
    horarios: [
      { abre: '09:30', cierra: '17:30' },
      { abre: '09:30', cierra: '17:30' },
      { abre: '09:30', cierra: '17:30' },
      { abre: '09:30', cierra: '17:30' },
      { abre: '09:30', cierra: '17:30' },
      { abre: '09:30', cierra: '17:30' },
      { abre: '09:30', cierra: '17:30' },
    ],

    heroImg: '../img/tacosdorados.jpeg',

    /* ✏️  Edita activo y url de cada app para esta sucursal */
    delivery: {
      uberEats: { activo: true, url: 'https://www.ubereats.com/mx/store/los-tocayos-matriz-mariano-otero-jalisto/M2Mv1Z35QHWST6nvrWcq7Q?srsltid=AfmBOoq-_cE0PdVWhtH8l0L4WJxuwUuGWZFe3rs1APu3Kk8L_h5jhRC-' },
      didi:     { activo: true, url: 'https://www.didi-food.com/es-MX/food/store/5764607571500204084/Los-Tocayos?channel=19&pl=eyJwb2lJZCI6IkNoSUpEVU12ZVhTc0tJUVI1T3pMSXdPTVhfRSIsImRpc3BsYXlOYW1lIjoiTWFyaWFubyBPdGVybyIsImFkZHJlc3MiOiJNYXJpYW5vIE90ZXJvLCBaYXBvcGFuLCBKYWwuIiwibGF0IjoyMC42MzAxNDcyLCJsbmciOi0xMDMuNDQ2ODQxOSwic3JjVGFnIjoiZ29vZ2xlX3RleHRzZWFyY2hfZ2ciLCJwb2lTcmNUYWciOiJtYW51YWxfc3VnIiwiY29vcmRpbmF0ZVR5cGUiOiJ3Z3M4NCIsImNpdHlJZCI6NTIxNDA1MDAsImNpdHkiOiJHdWFkYWxhamFyYSIsInNlYXJjaElkIjoiMGE5M2UwOTU2OWMwOWQ5ZjdkMWRjODM1NDY1MjE4MDIiLCJhZGRyZXNzQWxsIjoiTWFyaWFubyBPdGVybywgWmFwb3BhbiwgSmFsLiIsImFkZHJlc3NBbGxEaXNwbGF5IjoiWmFwb3BhbiwgSmFsIiwiY291bnRyeUNvZGUiOiJNWCIsImNvdW50cnlJZCI6NTIsImRpc3RTdHIiOiI5OStrbSIsImRpc3QiOjQ2OTM1NSwicG9pVHlwZSI6IiIsImNvdW50eUlkIjo1MjE0MDUxMSwiY291bnR5R3JvdXBJZCI6NTIxNDA1MDAwMDAxLCJhaWQiOiIifQ%3D%3D' },
      rappi:    { activo: true, url: 'https://www.rappi.com.mx/restaurantes/1306713481-los-tocayos-tacos-de-barbacoa' },
    },

    seo: {
      title:       'Los Tocayos Mariano Otero | Tacos de Barbacoa en Zapopan, Jalisco',
      description: 'Los mejores tacos de barbacoa en Mariano Otero, Zapopan. Barbacoa auténtica, consomé, quesatacos. Abierto lunes a domingo desde las 9:30am. Los Tocayos.',
      keywords:    'tacos barbacoa Mariano Otero, tacos Zapopan, Los Tocayos Mariano Otero, taquería Zapopan',
      og: {
        image: 'https://www.lostocayos.mx/img/og-arboledas.jpg',
        url:   'https://www.lostocayos.mx/arboledas',
      },
      schema: {
        name:        'Los Tocayos Mariano Otero',
        description: 'Tacos de barbacoa auténtica en Mariano Otero, Zapopan. Sucursal principal.',
      },
    },
  },

  /* ── SUCURSAL 2 — LAS ÁGUILAS ───────────────────────────────── */
  aguilas: {
    id: 'aguilas',
    slug: 'aguilas',
    esPrincipal: false,
    tieneCarrito: false,
    nombre: 'Las Águilas',
    nombreCompleto: 'Los Tocayos Las Águilas',
    subtitulo: 'Sucursal Las Águilas',

    lat: 20.62547561814145,
    lng: -103.41211310713281,

    direccion: 'Av 18 de Marzo 3279-B, Las Águilas, 45080 Guadalajara, Jal.',
    ciudad: 'Zapopan',
    estado: 'Jalisco',
    cp: '45080',
    telefono: '3322557171',
    telefonoDisplay: '(33) 2255-7171',
    whatsapp: '5213322557171',
    mapsUrl: 'https://maps.app.goo.gl/k3wTB3ARCPnqWT487',

    horario: 'Lun – Sáb · 7:00 – 15:00',
    horarios: [
      null,
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
    ],

    heroImg: '../img/tacosdorados.jpeg',

    /* ✏️  Edita activo y url de cada app para esta sucursal */
    delivery: {
      uberEats: { activo: false, url: '' },
      didi:     { activo: false, url: '' },
      rappi:    { activo: false, url: '' },
    },

    seo: {
      title:       'Los Tocayos Las Águilas | Tacos de Barbacoa en Zapopan',
      description: 'Tacos de barbacoa en Las Águilas, Zapopan. Barbacoa artesanal, consomé y más. Visítanos de lunes a sábado desde las 7am. Los Tocayos.',
      keywords:    'tacos barbacoa Las Águilas, Los Tocayos Águilas',
      og: {
        image: 'https://www.lostocayos.mx/img/og-aguilas.jpg',
        url:   'https://www.lostocayos.mx/aguilas',
      },
      schema: {
        name:        'Los Tocayos Las Águilas',
        description: 'Tacos de barbacoa auténtica en Las Águilas, Zapopan.',
      },
    },
  },

  /* ── SUCURSAL 3 — LA ESTANCIA ───────────────────────────────── */
  estancia: {
    id: 'estancia',
    slug: 'estancia',
    esPrincipal: false,
    tieneCarrito: false,
    nombre: 'La Estancia',
    nombreCompleto: 'Los Tocayos La Estancia',
    subtitulo: 'Sucursal La Estancia',

    lat: 20.671171370486846,
    lng: -103.43122317264731,

    direccion: 'Av Rafael Sanzio 302, La Estancia, 45030 Zapopan, Jal.',
    ciudad: 'Zapopan',
    estado: 'Jalisco',
    cp: '45030',
    telefono: '333336273815',
    telefonoDisplay: '(33) 3627-3815',
    whatsapp: '5213336273815',
    mapsUrl: 'https://maps.app.goo.gl/ujPCxo82QPVpqoEC8',

    horario: 'Lun – Sáb · 7:00 – 15:00',
    horarios: [
      null,
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
    ],

    heroImg: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1920&q=80&auto=format&fit=crop',

    /* ✏️  Edita activo y url de cada app para esta sucursal */
    delivery: {
      uberEats: { activo: false, url: '' },
      didi:     { activo: false, url: '' },
      rappi:    { activo: false, url: '' },
    },

    seo: {
      title:       'Los Tocayos La Estancia | Tacos de Barbacoa en Zapopan',
      description: 'Barbacoa auténtica en La Estancia, Zapopan. Tacos, consomé y más. Abierto lunes a sábado desde las 7am. Los Tocayos.',
      keywords:    'tacos barbacoa La Estancia Zapopan, Los Tocayos La Estancia',
      og: {
        image: 'https://www.lostocayos.mx/img/og-estancia.jpg',
        url:   'https://www.lostocayos.mx/estancia',
      },
      schema: {
        name:        'Los Tocayos La Estancia',
        description: 'Tacos de barbacoa auténtica en La Estancia, Zapopan.',
      },
    },
  },

  /* ── SUCURSAL 4 — CENTRO MÉDICO ─────────────────────────────── */
  centromedico: {
    id: 'centromedico',
    slug: 'centromedico',
    esPrincipal: false,
    tieneCarrito: false,
    nombre: 'Centro Médico',
    nombreCompleto: 'Los Tocayos Centro Médico',
    subtitulo: 'Zona Centro Médico',

    lat: 20.68851572134136,
    lng: -103.32819143558203,

    direccion: 'Sierra Morena 479, Independencia Oriente, 44340 Guadalajara, Jal.',
    ciudad: 'Guadalajara',
    estado: 'Jalisco',
    cp: '44340',
    telefono: '3317403159',
    telefonoDisplay: '(33) 1740-3159',
    whatsapp: '5213317403159',
    mapsUrl: 'https://maps.app.goo.gl/ynFBevnLTevviYxJ8',

    horario: 'Lun – Sáb · 7:00 – 15:00',
    horarios: [
      null,
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
      { abre: '07:00', cierra: '15:00' },
    ],

    heroImg: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1920&q=80&auto=format&fit=crop',

    /* ✏️  Edita activo y url de cada app para esta sucursal */
    delivery: {
      uberEats: { activo: false, url: '' },
      didi:     { activo: false, url: '' },
      rappi:    { activo: false, url: '' },
    },

    seo: {
      title:       'Los Tocayos Centro Médico | Tacos de Barbacoa en Guadalajara',
      description: 'Tacos de barbacoa cerca del Centro Médico en Guadalajara. Barbacoa artesanal lista desde las 7am. Los Tocayos.',
      keywords:    'tacos barbacoa Centro Médico Guadalajara, Los Tocayos Centro Médico',
      og: {
        image: 'https://www.lostocayos.mx/img/og-centromedico.jpg',
        url:   'https://www.lostocayos.mx/centromedico',
      },
      schema: {
        name:        'Los Tocayos Zona Centro Médico',
        description: 'Tacos de barbacoa auténtica en la Zona Centro Médico, Guadalajara.',
      },
    },
  },
};

const SUCURSALES_ORDEN = ['arboledas', 'aguilas', 'estancia', 'centromedico'];
const SUCURSAL_DEFAULT = 'arboledas';
