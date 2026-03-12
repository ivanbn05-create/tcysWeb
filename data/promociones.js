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
    1: PROMOS_BASE.bebidaGratis,
    2: [PROMOS_BASE.dosX1Tacos, PROMOS_BASE.consomeDosX1],
    3: PROMOS_BASE.ordenChef,
    4: {
      /* Sin productoId: no hay carrito en esta sucursal, pero se puede añadir si se habilita */
      icono: '🌮',
      titulo: 'Jueves de Birria',
      descripcion: '2 tacos de birria + consomé por $65. Exclusivo de Las Águilas.',
      disclaimer: '*Solo en sucursal Las Águilas. Hasta agotar existencias.',
    },
    5: PROMOS_BASE.viernesCarnivoro,
    6: null,
  },

  /* ── La Estancia ────────────────────────────────────────────── */
  estancia: {
    0: null,
    1: PROMOS_BASE.consomeDosX1,
    2: PROMOS_BASE.dosX1Tacos,
    3: [PROMOS_BASE.ordenChef, PROMOS_BASE.bebidaGratis],
    4: PROMOS_BASE.quesatacosDia,
    5: {
      icono: '👨‍👩‍👧',
      titulo: 'Viernes Familiar',
      descripcion: 'Paquete: 8 tacos + consomé grande + 2 aguas por $180.',
      disclaimer: '*Solo en La Estancia. No aplica con otras promociones.',
    },
    6: null,
  },

  /* ── Zona Centro Médico ─────────────────────────────────────── */
  centromedico: {
    0: null,
    1: PROMOS_BASE.dosX1Tacos,
    2: PROMOS_BASE.bebidaGratis,
    3: [PROMOS_BASE.consomeDosX1, PROMOS_BASE.tacoExtraMaciza],
    4: {
      icono: '🏥',
      titulo: 'Combo Salud',
      descripcion: 'Consomé grande + 2 tacos + agua. La cura de la semana por $70.',
      disclaimer: '*Exclusivo Centro Médico. Lunes a viernes.',
    },
    5: PROMOS_BASE.viernesCarnivoro,
    6: null,
  },
};
