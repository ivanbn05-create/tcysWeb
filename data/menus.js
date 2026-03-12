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
    id: 'td',
    nombre: 'Taco de Barbacoa',
    descripcion: 'Carne deshebrada, consomé, cilantro y cebolla. El clásico.',
    precio: 23,
    imagen: '../img/tacosdorados.jpeg',
    categoria: 'tacos',
    badge: '⭐ Estrella',
    enCarrito: true,
  },

  tacoBistek: {
    id: 'tk',
    nombre: 'Taco de Bistek',
    descripcion: 'Bistek a la plancha en tortilla original y copia.',
    precio: 30,
    imagen: '../img/bistek.jpeg',
    categoria: 'tacos',
    badge: null,
    enCarrito: true,
  },

  tacoQueso: {
    id: 'tbq',
    nombre: 'Taco con Queso',
    descripcion: 'Tortilla con nuestra mezcla de quesos gratinado y barbacoa.',
    precio: 30,
    imagen: '../img/tacoconqueso.jpeg',
    categoria: 'tacos',
    badge: null,
    enCarrito: true,
  },

  consomeVaso: {
    id: 'co',
    nombre: 'Consomé 8 oz',
    descripcion: 'Caldoito de barbacoa bien caliente.',
    precio: 12,
    imagen: '../img/mainlogo.jpeg',
    categoria: 'consomes',
    badge: null,
    enCarrito: true,
  },

   consomeMedio: {
    id: 'com',
    nombre: 'Consomé Medio Litro',
    descripcion: 'Caldoito de barbacoa, más grande, bien caliente.',
    precio: 20,
    imagen: '../img/mainlogo.jpeg',
    categoria: 'consomes',
    badge: null,
    enCarrito: true,
  },

  consomeLitro: {
    id: 'col',
    nombre: 'Consomé de Litro',
    descripcion: 'El tamaño familiar. Ideal para compartir.',
    precio: 30,
    imagen: '../img/mainlogo.jpeg',
    categoria: 'consomes',
    badge: null,
    enCarrito: true,
  },

  aguaFresca: {
    id: 'aguaFresca',
    nombre: 'Aguas Frescas',
    descripcion: 'Horchata blanca, horchata rosa y jamaica. Natural, sin colorantes. De cada día',
    precio: 28,
    imagen: '../img/aguasfrescas.jpeg',
    categoria: 'bebidas',
    badge: null,
    enCarrito: true,
  },

  /* ── Productos exclusivos de ciertas sucursales ─────────────── */

  promoLunes: {
    id: 'promoLunes',
    nombre: 'Promoción Tacos y Bebida',
    descripcion: 'Tres tacos y una Bebida.',
    precio: 88,
    imagen: 'img/menu/taco-cabeza.jpg',
    categoria: 'tacos',
    badge: '🏆 Especial',
    enCarrito: true,
  },

  promoMartes1: {
    id: 'promoMartes1',
    nombre: 'Cuatro tacos',
    descripcion: 'Orden de 4 tacos',
    precio: 84,
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
    ITEMS_BASE.aguaFresca,
    ITEMS_BASE.consomeVaso,
    ITEMS_BASE.consomeMedio,
    ITEMS_BASE.consomeLitro,
    ITEMS_BASE.tacoBistek,
    ITEMS_BASE.tacoQueso,
  ],

  /* ── Las Águilas ────────────────────────────────────────────── */
  aguilas: [
    ITEMS_BASE.tacoBarbacoa,
  ],

  /* ── La Estancia ────────────────────────────────────────────── */
  estancia: [
    ITEMS_BASE.tacoBarbacoa,
  ],

  /* ── Zona Centro Médico ─────────────────────────────────────── */
  centromedico: [
    ITEMS_BASE.tacoBarbacoa,
  ],
};
