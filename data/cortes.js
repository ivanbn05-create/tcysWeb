/**
 * ================================================================
 * DEL CORRAL CORTES FINOS — data/cortes.js
 * Productos que se muestran en el showcase de Los Tocayos.
 * ================================================================
 * ✏️  CÓMO EDITAR:
 *   - DEL_CORRAL_URL: URL real de la tienda. Al hacer clic en
 *     cualquier tarjeta o en el botón "Ver toda la tienda",
 *     el usuario es redirigido a esta URL.
 *   - Cada producto en CORTES_SHOWCASE_DATA puede tener:
 *       id, nombre, descripcion, precio, imagen, badge, corte
 *     donde `corte` es la etiqueta que aparece abajo (reemplaza
 *     a `categoria` en el menú de tacos).
 *   - Para agregar/quitar productos: edita el array CORTES_SHOWCASE_DATA.
 *   - Las imágenes deben estar en img/cortes/ o ser URLs absolutas.
 * ================================================================
 */

'use strict';

/* ✏️  Cambia esta URL por la real de la tienda de cortes */
const DEL_CORRAL_URL = '';

const CORTES_SHOWCASE_DATA = [
  {
    id: 'ribeye',
    nombre: 'Ribeye',
    descripcion: 'Corte con abundante marmoleo, jugoso y con sabor intenso. El favorito de los conocedores.',
    precio: 420,
    imagen: '../img/ribeye.jpeg',
    badge: '⭐ Top seller',
    corte: '400 g · Res premium',
  },
  {
    id: 'new-york',
    nombre: 'New York',
    descripcion: 'Corte magro de lomo con borde de grasa que lo hace perfecto para la parrilla.',
    precio: 380,
    imagen: '../img/newyork.jpeg',
    badge: null,
    corte: '350 g · Res premium',
  },
  {
    id: 'Filete',
    nombre: 'Filete',
    descripcion: 'Corte espectacular. Para ocasiones que merecen el mejor producto.',
    precio: 890,
    imagen: '../img/filete.jpeg',
    badge: '🔥 Especial',
    corte: '500 g · Res premium',
  },
];
