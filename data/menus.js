/**
 * ================================================================
 * LOS TOCAYOS — data/menus.js
 * Menús por sucursal.
 * ================================================================
 * ✏️  CÓMO EDITAR:
 *   - visible: true  → el producto aparece en el menú del sitio.
 *   - visible: false → el producto NO se muestra en el menú, pero
 *                      sigue existiendo para que las promociones
 *                      puedan referenciar su `id` con `productoId`.
 *                      Úsalo para productos de promo-exclusiva.
 *   - enCarrito: true  → muestra el stepper de cantidad (solo en
 *                         sucursales con tieneCarrito: true).
 *   - enCarrito: false → informativo, sin opción de agregar.
 *   - precio: número sin símbolo $
 *   - badge: texto del chip (null si no quieres ninguno)
 * ================================================================
 */

'use strict';

/* ── Catálogo base reutilizable ─────────────────────────────────── */
const ITEMS_BASE = {

  tacoBarbacoa: {
    id: 'td',
    nombre: 'Taco de Barbacoa',
    descripcion: 'Carne deshebrada, cilantro y cebolla. El clásico que nunca falla.',
    precio: 23,
    imagen: '../img/tacosdorados.jpeg',
    categoria: 'tacos',
    badge: '⭐ Estrella',
    visible: true,       // ← siempre visible en el menú
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
    visible: false,
    enCarrito: true,
  },

  /* ─────────────────────────────────────────────────────────────
   * EJEMPLO DE PRODUCTO PROMO-EXCLUSIVO:
   * visible: false  →  no aparece en el menú del sitio
   *                    pero las promociones pueden referenciar su id.
   *
   * promoTacosViernes: {
   *   id: 'promo-tacos-viernes',
   *   nombre: 'Promo Viernes Carnívoro',
   *   descripcion: 'Kilo de barbacoa a precio especial.',
   *   precio: 180,
   *   imagen: 'img/menu/placeholder.jpg',
   *   categoria: 'paquetes',
   *   badge: null,
   *   visible: false,   ← oculto en el menú, activo para promos
   *   enCarrito: true,
   * },
   * ───────────────────────────────────────────────────────────── */
};

/* ================================================================
   MENÚS POR SUCURSAL
   Solo los productos con visible !== false se renderizan en HTML.
   Los de visible: false siguen siendo válidos como productoId
   en data/promociones.js.
================================================================ */
const MENUS_DATA = {

  /* ── Arboledas ─────────────────────────────────────────────── */
  arboledas: [
    ITEMS_BASE.tacoBarbacoa,
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
