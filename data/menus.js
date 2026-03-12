/**
 * ================================================================
 * LOS TOCAYOS — data/menus.js
 * Menús por sucursal.
 * ================================================================
 * ✏️  CÓMO EDITAR:
 *   - Cada sucursal tiene su propio array de productos
 *   - Para compartir un producto entre sucursales, define el
 *     objeto en ITEMS_BASE y referéncialo en cada sucursal
 *   - imagen: ruta relativa desde la raíz del proyecto
 *   - precio: número sin símbolo ($)
 *   - badge: texto del chip (opcional, ej. "⭐ Estrella", "🆕 Nuevo")
 *   - enCarrito: true = aparece en el carrito de Arboledas
 * ================================================================
 */

'use strict';

/* ── Productos base reutilizables ──────────────────────────────── */
const ITEMS_BASE = {

  tacoBarbacoa: {
    id: 'taco-barbacoa',
    nombre: 'Taco de Barbacoa',
    descripcion: 'Carne deshebrada, consomé, cilantro y cebolla. El clásico.',
    precio: 20,
    imagen: 'img/menu/taco-barbacoa.jpg',
    categoria: 'tacos',
    badge: '⭐ Estrella',
    enCarrito: true,
  },

  ordenEspecial: {
    id: 'orden-especial',
    nombre: 'Orden Especial',
    descripcion: '3 tacos + consomé + agua de sabor. La combinación perfecta.',
    precio: 75,
    imagen: 'img/menu/orden-especial.jpg',
    categoria: 'ordenes',
    badge: null,
    enCarrito: true,
  },

  quesataco: {
    id: 'quesataco',
    nombre: 'Quesataco',
    descripcion: 'Tortilla con queso Oaxaca fundido y barbacoa. La nueva obsesión.',
    precio: 30,
    imagen: 'img/menu/quesataco.jpg',
    categoria: 'tacos',
    badge: '🆕 Nuevo',
    enCarrito: true,
  },

  consomeChico: {
    id: 'consome-chico',
    nombre: 'Consomé Chico',
    descripcion: 'Caldo natural de barbacoa con garbanzos, chile y hierbas.',
    precio: 25,
    imagen: 'img/menu/consome-chico.jpg',
    categoria: 'consomes',
    badge: null,
    enCarrito: true,
  },

  consomeGrande: {
    id: 'consome-grande',
    nombre: 'Consomé Grande',
    descripcion: 'El tamaño familiar. Más carne, más sabor. Ideal para compartir.',
    precio: 45,
    imagen: 'img/menu/consome-grande.jpg',
    categoria: 'consomes',
    badge: null,
    enCarrito: true,
  },

  aguaSabor: {
    id: 'agua-sabor',
    nombre: 'Agua de Sabor',
    descripcion: 'Jamaica, horchata o tamarindo. Natural, sin colorantes.',
    precio: 20,
    imagen: 'img/menu/agua-sabor.jpg',
    categoria: 'bebidas',
    badge: null,
    enCarrito: true,
  },

  /* ── Productos exclusivos de ciertas sucursales ─────────────── */

  tacoCabeza: {
    id: 'taco-cabeza',
    nombre: 'Taco de Cabeza',
    descripcion: 'Especialidad de la casa. Carne de cabeza de res con sazón único.',
    precio: 25,
    imagen: 'img/menu/taco-cabeza.jpg',
    categoria: 'tacos',
    badge: '🏆 Especial',
    enCarrito: true,
  },

  birria: {
    id: 'birria',
    nombre: 'Taco de Birria',
    descripcion: 'Birria estilo Jalisco, consomé incluido. Delicia 100% local.',
    precio: 28,
    imagen: 'img/menu/birria.jpg',
    categoria: 'tacos',
    badge: '🌶️ Picante',
    enCarrito: true,
  },

  paqueteFamiliar: {
    id: 'paquete-familiar',
    nombre: 'Paquete Familiar',
    descripcion: '12 tacos + consomé grande + 3 aguas de sabor.',
    precio: 280,
    imagen: 'img/menu/paquete-familiar.jpg',
    categoria: 'paquetes',
    badge: '👨‍👩‍👧 Familiar',
    enCarrito: true,
  },
};

/* ================================================================
   MENÚS POR SUCURSAL
   Cada sucursal tiene su propio arreglo de productos.
   Puedes referenciar ITEMS_BASE o crear objetos nuevos inline.
================================================================ */
const MENUS_DATA = {

  /* ── Arboledas — menú completo ─────────────────────────────── */
  arboledas: [
    ITEMS_BASE.tacoBarbacoa,
    ITEMS_BASE.quesataco,
    ITEMS_BASE.tacoCabeza,
    ITEMS_BASE.ordenEspecial,
    ITEMS_BASE.consomeChico,
    ITEMS_BASE.consomeGrande,
    ITEMS_BASE.aguaSabor,
    ITEMS_BASE.paqueteFamiliar,
  ],

  /* ── Las Águilas ────────────────────────────────────────────── */
  aguilas: [
    ITEMS_BASE.tacoBarbacoa,
    ITEMS_BASE.quesataco,
    ITEMS_BASE.birria,
    ITEMS_BASE.ordenEspecial,
    ITEMS_BASE.consomeChico,
    ITEMS_BASE.consomeGrande,
    ITEMS_BASE.aguaSabor,
  ],

  /* ── La Estancia ────────────────────────────────────────────── */
  estancia: [
    ITEMS_BASE.tacoBarbacoa,
    ITEMS_BASE.tacoCabeza,
    ITEMS_BASE.ordenEspecial,
    ITEMS_BASE.consomeChico,
    ITEMS_BASE.consomeGrande,
    ITEMS_BASE.aguaSabor,
  ],

  /* ── Zona Centro Médico ─────────────────────────────────────── */
  centromedico: [
    ITEMS_BASE.tacoBarbacoa,
    ITEMS_BASE.quesataco,
    ITEMS_BASE.ordenEspecial,
    ITEMS_BASE.consomeChico,
    ITEMS_BASE.consomeGrande,
    ITEMS_BASE.aguaSabor,
    {
      /* Producto exclusivo de esta sucursal — definido inline */
      id: 'combo-medico',
      nombre: 'Combo Centro Médico',
      descripcion: '2 tacos + consomé chico + agua. El favorito de la zona.',
      precio: 60,
      imagen: 'img/menu/combo-medico.jpg',
      categoria: 'paquetes',
      badge: '🏥 Exclusivo',
      enCarrito: false,   // solo info, sin carrito
    },
  ],
};
