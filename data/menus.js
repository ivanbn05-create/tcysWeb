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
    descripcion: 'Carne de res deshebrada dorado a la plancha. El clásico que nunca falla.',
    precio: 23,
    imagen: '../img/tacosdorados.jpeg',
    categoria: 'tacos',
    badge: '⭐ Estrella',
    visible: true,       // ← siempre visible en el menú
    enCarrito: true,
  },

  tacoBarbacoaConQueso: {
    id: 'tdq',
    nombre: 'Taco de Barbacoa Con Queso',
    descripcion: 'Los tacos que amas, con nuestra mezcla de quesos gratinado.',
    precio: 30,
    imagen: '../img/tacoconqueso.jpeg',
    categoria: 'tacos',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  tacoBarbacoaPlanchado: {
    id: 'tpl',
    nombre: 'Taco de Barbacoa Planchado',
    descripcion: 'Carne dorada a la plancha con un sabor único.',
    precio: 28,
    imagen: '../img/tacoplanchado.jpeg',
    categoria: 'tacos',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  tacoBarbacoaPlanchadoConQueso: {
    id: 'tplq',
    nombre: 'Taco de Barbacoa Planchado Con Queso',
    descripcion: 'La mejor combinación. El mejor sabor.',
    precio: 34,
    imagen: '../img/tacoplanchadoconqueso.jpeg',
    categoria: 'tacos',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  loncheBarbacoaConQueso: {
    id: 'lo',
    nombre: 'Lonche de Barbacoa Con Queso',
    descripcion: 'Barbacoa, queso y bolillo.',
    precio: 70,
    imagen: '../img/lonche4.jpeg',
    categoria: 'lonches',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  gringaBarbacoa: {
    id: 'gr',
    nombre: 'Gringa de Barbacoa',
    descripcion: 'Tortilla de harina, queso y barbacoa.',
    precio: 34,
    imagen: '../img/tacoplanchadoconqueso.jpeg',
    categoria: 'tacos',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  barbacoaMedio: {
    id: 'medioBarba',
    nombre: 'Medio Litro de Barbacoa',
    descripcion: 'Barbacoa con tortillas, salsas, chiles y cebollas',
    precio: 185,
    imagen: '../img/barbacoaservida.jpeg',
    categoria: 'empaquetado',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

   barbacoaLitro: {
    id: 'litroBarba',
    nombre: 'Litro de Barbacoa',
    descripcion: 'Barbacoa con tortillas, salsas, chiles y cebollas',
    precio: 370,
    imagen: '../img/barbacoaservida.jpeg',
    categoria: 'empaquetado',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

   consomeVaso: {
    id: 'co',
    nombre: 'Vaso de 8 oz de consomé',
    descripcion: 'Delicioso y calientito.',
    precio: 12,
    imagen: '../img/mainlogo.jpeg',
    categoria: 'bebida',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  consomeMedio: {
    id: 'coMedio',
    nombre: 'Medio litro de consomé para compartir',
    descripcion: 'Delicioso y calientito.',
    precio: 20,
    imagen: '../img/mainlogo.jpeg',
    categoria: 'bebida',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  consomeLitro: {
    id: 'coLitro',
    nombre: 'Un litro de consomé para compartir',
    descripcion: 'Delicioso y calientito.',
    precio: 30,
    imagen: '../img/mainlogo.jpeg',
    categoria: 'bebida',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  aguasFrescasMedio: {
    id: 'aguaMedio',
    nombre: 'Agua Fresca de Medio Litro',
    descripcion: 'Preparadas cada día, de horchata blanca, rosa y jamaica.',
    precio: 28,
    imagen: '../img/aguasfrescas.jpeg',
    categoria: 'bebida',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

   aguasFrescasLitro: {
    id: 'aguaLitro',
    nombre: 'Agua Fresca de Litro',
    descripcion: 'Preparadas cada día, de horchata blanca, rosa y jamaica.',
    precio: 46,
    imagen: '../img/aguasfrescas.jpeg',
    categoria: 'bebida',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

   tacoBistek: {
    id: 'tk',
    nombre: 'Taco de Bistek',
    descripcion: 'Bistek a la plancha.',
    precio: 30,
    imagen: '../img/bistek.jpeg',
    categoria: 'tacos',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  tacoBistekConQueso: {
    id: 'tkq',
    nombre: 'Taco de Bistek Con Queso',
    descripcion: 'Bistek a la plancha con queso.',
    precio: 36,
    imagen: '../img/bistek.jpeg',
    categoria: 'tacos',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  loncheBistek: {
    id: 'lok',
    nombre: 'Lonche de Bistek',
    descripcion: 'Bistek, queso y bolillo.',
    precio: 80,
    imagen: '../img/bistek.jpeg',
    categoria: 'lonches',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  gringaBistek: {
    id: 'grk',
    nombre: 'Gringa de Bistek',
    descripcion: 'Bistek, queso y tortilla de harina.',
    precio: 45,
    imagen: '../img/bistek.jpeg',
    categoria: 'tacos',
    badge: '',
    visible: true,       
    enCarrito: true,
  },

  promoAgua: {
    id: 'promoAgua',
    nombre: 'Promo Tacos y Agua',
    descripcion: '3 tacos + 1 agua.',
    precio: 88,
    imagen: '../img/mainlogo.jpeg',
    categoria: 'ordenes',
    badge: null,
    visible: false,
    enCarrito: true,
  },

  promoBistek: {
    id: 'promoBistek',
    nombre: 'Promo Tacos de Bistek',
    descripcion: '3 tacos de Bistek.',
    precio: 84,
    imagen: '../img/mainlogo.jpeg',
    categoria: 'ordenes',
    badge: null,
    visible: false,
    enCarrito: true,
  },

  promoLonche: {
    id: 'promoLonche',
    nombre: 'Promo Taco y Lonche',
    descripcion: 'Taco y Lonche.',
    precio: 84,
    imagen: '../img/mainlogo.jpeg',
    categoria: 'ordenes',
    badge: null,
    visible: false,
    enCarrito: true,
  },

  promoTacos: {
    id: 'promoTacos',
    nombre: 'Promo 4 Tacos',
    descripcion: '4 Tacos',
    precio: 84,
    imagen: '../img/mainlogo.jpeg',
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
    ITEMS_BASE.tacoBarbacoaConQueso,
    ITEMS_BASE.tacoBarbacoaPlanchado,
    ITEMS_BASE.tacoBarbacoaPlanchadoConQueso,
    ITEMS_BASE.loncheBarbacoaConQueso,
    ITEMS_BASE.barbacoaMedio,
    ITEMS_BASE.barbacoaLitro,
    ITEMS_BASE.consomeVaso,
    ITEMS_BASE.consomeMedio,
    ITEMS_BASE.consomeLitro,
    ITEMS_BASE.aguasFrescasLitro,
    ITEMS_BASE.aguasFrescasMedio,
    ITEMS_BASE.tacoBistek,
    ITEMS_BASE.tacoBistekConQueso,
    ITEMS_BASE.loncheBistek,
    ITEMS_BASE.gringaBistek,
    ITEMS_BASE.promoAgua,
    ITEMS_BASE.promoBistek,
    ITEMS_BASE.promoLonche,
    ITEMS_BASE.promoTacos,
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
