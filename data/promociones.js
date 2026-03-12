/**
 * ================================================================
 * LOS TOCAYOS — data/promociones.js
 * Promociones por sucursal y por día de la semana.
 * ================================================================
 * ✏️  CÓMO EDITAR:
 *   Estructura de días:
 *   0 = Domingo  |  1 = Lunes    |  2 = Martes   |  3 = Miércoles
 *   4 = Jueves   |  5 = Viernes  |  6 = Sábado
 *
 *   Valores posibles por día:
 *   · null        → Sin promo (Sáb y Dom por defecto)
 *   · { }         → 1 promo
 *   · [ {}, {} ]  → 2 promos (se muestran lado a lado)
 *
 *   productoId (opcional):
 *   · Si la sucursal tiene carrito (tieneCarrito: true), se muestra
 *     un botón "Agregar al pedido" en lugar de "¡La quiero!".
 *   · Debe coincidir con el `id` de un producto en MENUS_DATA.
 * ================================================================
 */

'use strict';

/* ── Promos base reutilizables ──────────────────────────────────── */
const PROMOS_BASE = {

  promoLonche: {
    productoId: 'td',   // ← producto que se agrega al carrito
    icono: '🌮',
    titulo: 'Taco y Lonche',
    descripcion: 'Un taco y un lonche con queso a precio especial de 84 pesos',
    disclaimer: '*Sólo para Barbacoa; taco sin queso.',
  },

  promoAgua: {
    productoId: 'td',
    icono: '🥤',
    titulo: 'Taco y Bebida',
    descripcion: 'Tres tacos y una bebida por 84 pesos.',
    disclaimer: '*Agua fresca de medio litro o refresco.',
  },

  promoTacos: {
    productoId: 'promoMartes1',
    icono: '🌯',
    titulo: 'Orden 4 Tacos',
    descripcion: 'Cuatro tacos al gusto',
    disclaimer: '*Sólo para Barbacoa; sin queso.',
  },

  promoBistek: {
    productoId: 'tk',
    icono: '🔥',
    titulo: 'Orden 3 de Bistek',
    descripcion: 'Tres tacos de bistek.',
    disclaimer: '*Sin queso.',
  },
};

/* ================================================================
   PROMOCIONES POR SUCURSAL
================================================================ */
const PROMOCIONES_DATA = {

  /* ── Arboledas ─────────────────────────────────────────────── */
  arboledas: {
    0: null,
    1: PROMOS_BASE.promoAgua,
    2: [PROMOS_BASE.promoLonche,
        PROMOS_BASE.promoTacos],
    3: [PROMOS_BASE.promoLonche,
        PROMOS_BASE.promoTacos],
    4: PROMOS_BASE.promoAgua,
    5: PROMOS_BASE.promoBistek,
    6: null,
  },

  /* ── Las Águilas ────────────────────────────────────────────── */
  aguilas: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  },

  /* ── La Estancia ────────────────────────────────────────────── */
  estancia: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  },

  /* ── Zona Centro Médico ─────────────────────────────────────── */
  centromedico: {
   0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  },
};
