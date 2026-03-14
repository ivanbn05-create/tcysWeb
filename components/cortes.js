/**
 * ================================================================
 * DEL CORRAL CORTES FINOS — components/cortes.js
 * Renderiza el showcase de cortes premium en la sección
 * #seccion-cortes. Reutiliza las mismas clases de tarjeta
 * que el menú de tacos (menu-card, menu-img-wrap, etc.).
 *
 * Cada tarjeta es un enlace a DEL_CORRAL_URL (definido en
 * data/cortes.js). Se llama una sola vez en DOMContentLoaded.
 * ================================================================
 */

'use strict';

function _escC(s) {
  if (typeof s !== 'string') return String(s);
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function renderCortes() {
  const seccion = document.getElementById('seccion-cortes');
  if (!seccion) return;

  /* Verificar que los datos existan */
  if (typeof CORTES_SHOWCASE_DATA === 'undefined' || !CORTES_SHOWCASE_DATA.length) {
    seccion.innerHTML = '';
    return;
  }

  const url = typeof DEL_CORRAL_URL !== 'undefined'
    ? DEL_CORRAL_URL
    : '#';

  const tarjetas = CORTES_SHOWCASE_DATA.map(item => `
    <a class="menu-card corte-card reveal"
       href="${_escC(url)}"
       target="_blank"
       rel="noopener noreferrer"
       role="listitem"
       aria-label="Ver ${_escC(item.nombre)} en Del Corral Cortes Finos">

      <div class="menu-img-wrap">
        <img src="${_escC(item.imagen)}"
             alt="${_escC(item.nombre)} — Del Corral Cortes Finos"
             loading="lazy"
             width="600" height="450"
             onerror="this.src='img/menu/placeholder.jpg'" />
        ${item.badge
          ? `<span class="menu-badge-hot">${_escC(item.badge)}</span>`
          : ''}
        <span class="menu-price-float" aria-hidden="true">$${item.precio}</span>
      </div>

      <div class="menu-card-body">
        <h3>${_escC(item.nombre)}</h3>
        <p>${_escC(item.descripcion)}</p>
        <div class="menu-card-footer">
          <span class="menu-tag">${_escC(item.corte)}</span>
          <span class="corte-ver-btn" aria-hidden="true">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </span>
        </div>
      </div>
    </a>`).join('');

  seccion.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">🥩 Del Corral · Cortes Finos</span>
        <h2 class="section-title">Cortes Premium</h2>
        <p class="section-sub">Del mismo rancho, otro nivel. Cortes de res de primera selección.</p>
      </div>

      <div class="menu-grid" role="list">
        ${tarjetas}
      </div>

      <div class="cortes-cta reveal">
        <a href="${_escC(url)}"
           target="_blank"
           rel="noopener noreferrer"
           class="btn btn-primary btn-xl">
          <i class="fa-solid fa-fire-flame-curved" aria-hidden="true"></i>
          Ver toda la tienda
        </a>
      </div>
    </div>`;

  if (window.App?.reObservar) window.App.reObservar(seccion);
}
