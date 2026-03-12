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

  dosX1Tacos: {
    productoId: 'taco-barbacoa',   // ← producto que se agrega al carrito
    icono: '🌮',
    titulo: '2×1 en Tacos',
    descripcion: 'Compra un taco y llévate otro de cortesía. ¡Sin límite de piezas!',
    disclaimer: '*Válido solo en los primeros 50 clientes por sucursal.',
  },

  bebidaGratis: {
    productoId: 'agua-sabor',
    icono: '🥤',
    titulo: 'Bebida Gratis',
    descripcion: 'Con cualquier orden de 3 tacos o más, tu agua de sabor es cortesía.',
    disclaimer: '*Agua fresca del día (jamaica, horchata o tamarindo).',
  },

  tacoExtraMaciza: {
    productoId: 'taco-barbacoa',
    icono: '🌯',
    titulo: 'Taco Extra de Maciza',
    descripcion: 'Pide una orden y llévate un taco extra de maciza sin costo.',
    disclaimer: '*Aplica solo en sucursales participantes.',
  },

  ordenChef: {
    productoId: 'orden-especial',
    icono: '🔥',
    titulo: 'Orden Especial del Chef',
    descripcion: '5 tacos + consomé chico + agua de sabor por $120.',
    disclaimer: '*Precio especial solo para esta orden completa.',
  },

  consomeDosX1: {
    productoId: 'consome-chico',
    icono: '🫙',
    titulo: 'Consomé 2×1',
    descripcion: 'Dos consomés al precio de uno. El caldo que cura todo.',
    disclaimer: '*Aplica para consomé chico. Todas las sucursales.',
  },

  quesatacosDia: {
    productoId: 'quesataco',
    icono: '🧀',
    titulo: 'Jueves de Quesatacos',
    descripcion: '3 quesatacos al precio de 2. Queso Oaxaca fundido y barbacoa.',
    disclaimer: '*Válido de 7am a 1pm o hasta agotar existencias.',
  },

  viernesCarnivoro: {
    productoId: 'paquete-familiar',
    icono: '🎉',
    titulo: 'Viernes Carnívoro',
    descripcion: 'Kilo de barbacoa para llevar a precio especial.',
    disclaimer: '*Pedido anticipado recomendado. Hasta agotar.',
  },
};

/* ================================================================
   PROMOCIONES POR SUCURSAL
================================================================ */
const PROMOCIONES_DATA = {

  /* ── Arboledas ─────────────────────────────────────────────── */
  arboledas: {
    0: null,
    1: PROMOS_BASE.dosX1Tacos,
    2: [PROMOS_BASE.bebidaGratis,
        PROMOS_BASE.tacoExtraMaciza],
    3: [PROMOS_BASE.ordenChef,
        PROMOS_BASE.consomeDosX1],
    4: PROMOS_BASE.quesatacosDia,
    5: PROMOS_BASE.viernesCarnivoro,
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
