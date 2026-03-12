/**
 * ================================================================
 * LOS TOCAYOS — data/sucursales.js
 * Fuente única de datos de sucursales.
 * ================================================================
 * ✏️  CÓMO EDITAR:
 *   - Cambia lat/lng con coordenadas reales de Google Maps
 *     (click derecho → "¿Qué hay aquí?" → copia los números)
 *   - Actualiza telefono, whatsapp, direccion, mapsUrl
 *   - whatsapp: formato 521 + 10 dígitos sin espacios ni +
 *   - horario: cadena única, p. ej. 'Lun – Dom · 7:00 – 15:00'
 * ================================================================
 */

'use strict';

const SUCURSALES_DATA = {

  /* ── SUCURSAL 1 — ARBOLEDAS (PRINCIPAL, tiene carrito) ──────── */
  arboledas: {
    id: 'arboledas',
    slug: 'arboledas',
    esPrincipal: true,
    tieneCarrito: true,
    nombre: 'Arboledas',
    nombreCompleto: 'Los Tocayos Arboledas',
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

    /* Un solo horario fijo — sin separación entresemana / fin de semana */
    horario: 'Lun – Dom · 9:30 – 17:30',

    heroImg: '/img/grinda.jpeg',

    seo: {
      title:       'Los Tocayos Arboledas | Tacos de Barbacoa en Zapopan, Jalisco',
      description: 'Los mejores tacos de barbacoa en Arboledas, Zapopan. Barbacoa auténtica, consomé, quesatacos. Abierto lunes a domingo desde las 7am. Los Tocayos.',
      keywords:    'tacos barbacoa Arboledas, tacos Zapopan, barbacoa Arboledas, Los Tocayos Arboledas, taquería Zapopan, tacos cerca de mi Zapopan',
      og: {
        image: 'https://www.lostocayos.mx/img/og-arboledas.jpg',
        url:   'https://www.lostocayos.mx/arboledas',
      },
      schema: {
        name:        'Los Tocayos Arboledas',
        description: 'Tacos de barbacoa auténtica en Arboledas, Zapopan. Sucursal principal.',
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

    /* ✏️  Ajusta los días y horas según tu operación real */
    horario: 'Lun – Sáb · 7:00 – 15:00',

    heroImg: 'img/hero-aguilas.jpg',

    seo: {
      title:       'Los Tocayos Las Águilas | Tacos de Barbacoa en Zapopan',
      description: 'Tacos de barbacoa en Las Águilas, Zapopan. Barbacoa artesanal, consomé y más. Visítanos de lunes a sábado desde las 7am. Los Tocayos.',
      keywords:    'tacos barbacoa Las Águilas, tacos Zapopan Las Águilas, barbacoa Zapopan, Los Tocayos Águilas, taquería Las Águilas',
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

    /* ✏️  Ajusta los días y horas según tu operación real */
    horario: 'Lun – Sáb · 7:00 – 15:00',

    heroImg: 'img/hero-estancia.jpg',

    seo: {
      title:       'Los Tocayos La Estancia | Tacos de Barbacoa en Zapopan',
      description: 'Barbacoa auténtica en La Estancia, Zapopan. Tacos, consomé y más. Abierto todos los días desde las 7am. Los Tocayos.',
      keywords:    'tacos barbacoa La Estancia Zapopan, taquería La Estancia, barbacoa cerca de mi Zapopan, Los Tocayos La Estancia',
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

  /* ── SUCURSAL 4 — ZONA CENTRO MÉDICO ───────────────────────── */
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

    /* ✏️  Ajusta los días y horas según tu operación real */
    horario: 'Lun – Sáb · 7:00 – 15:00',

    heroImg: 'img/hero-centromedico.jpg',

    seo: {
      title:       'Los Tocayos Centro Médico | Tacos de Barbacoa en Guadalajara',
      description: 'Tacos de barbacoa cerca del Centro Médico en Guadalajara. Barbacoa artesanal lista desde las 7am. Los Tocayos.',
      keywords:    'tacos barbacoa Centro Médico Guadalajara, taquería Centro Médico, barbacoa Guadalajara, Los Tocayos Centro Médico, tacos cerca de Centro Médico',
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

/* Orden de display en la UI (pestañas / tarjetas) */
const SUCURSALES_ORDEN = ['arboledas', 'aguilas', 'estancia', 'centromedico'];

/* Sucursal por defecto (ruta /) */
const SUCURSAL_DEFAULT = 'arboledas';
