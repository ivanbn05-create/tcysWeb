/**
 * ================================================================
 * LOS TOCAYOS — components/menu.js
 * Renderiza la sección de menú de forma dinámica.
 * ================================================================
 */

'use strict';

function esc(s) {
  if (typeof s !== 'string') return String(s);
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

/**
 * Renderiza la sección de menú para una sucursal dada.
 * @param {string} sucursalId - clave de MENUS_DATA
 * @param {boolean} mostrarCarrito - si mostrar botones de agregar
 */
function renderMenu(sucursalId, mostrarCarrito) {
  const seccion = document.getElementById('seccion-menu');
  if (!seccion) return;

  const items = MENUS_DATA[sucursalId];
  if (!items || !items.length) {
    seccion.innerHTML = '<p class="menu-vacio">Menú no disponible para esta sucursal.</p>';
    return;
  }

  const tarjetas = items.map(item => `
    <article class="menu-card reveal" role="listitem">
      <div class="menu-img-wrap">
        <img src="${esc(item.imagen)}"
             alt="${esc(item.nombre)} — Los Tocayos"
             loading="lazy" width="600" height="400"
             onerror="this.src='img/menu/placeholder.jpg'" />
        ${item.badge ? `<span class="menu-badge-hot">${esc(item.badge)}</span>` : ''}
      </div>
      <div class="menu-card-body">
        <h3>${esc(item.nombre)}</h3>
        <p>${esc(item.descripcion)}</p>
        <div class="menu-card-footer">
          <div class="menu-precio-wrap">
            <span class="menu-price">$${item.precio}</span>
            <span class="menu-tag">${esc(item.categoria)}</span>
          </div>
          ${mostrarCarrito ? renderBotonAgregar(item) : ''}
        </div>
      </div>
    </article>`).join('');

  seccion.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">🥩 Lo más pedido</span>
        <h2 class="section-title">Nuestro Menú</h2>
        <p class="section-sub">Todo preparado fresh, cada mañana, sin excepción.</p>
      </div>
      <div class="menu-grid" role="list">
        ${tarjetas}
      </div>
    </div>`;

  // Re-observar elementos para animación scroll reveal
  if (window.App?.reObservar) window.App.reObservar(seccion);
}
