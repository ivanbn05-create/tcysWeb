/**
 * ================================================================
 * LOS TOCAYOS — components/promo.js
 * Renderiza la sección de promociones del día de forma dinámica.
 *
 * Si la sucursal tiene carrito (tieneCarrito: true) y la promo
 * tiene un `productoId`, muestra un botón "Agregar al pedido"
 * en lugar del botón "¡La quiero!".
 * ================================================================
 */

'use strict';

function _esc(s) {
  if (typeof s !== 'string') return String(s);
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

/**
 * Renderiza la sección de promos para una sucursal y el día actual.
 * @param {string} sucursalId
 */
function renderPromos(sucursalId) {
  const seccion = document.getElementById('seccion-promo');
  if (!seccion) return;

  const ahora    = new Date();
  const diaNum   = ahora.getDay();
  const nombres  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const diaTexto = nombres[diaNum];

  const promosDia    = PROMOCIONES_DATA[sucursalId]?.[diaNum] ?? null;
  const sucursal     = SUCURSALES_DATA[sucursalId];
  const tieneCarrito = sucursal?.tieneCarrito ?? false;

  let contenido;

  if (!promosDia) {
    contenido = `
      <div class="promo-rest-card reveal">
        <span class="rest-icon" aria-hidden="true">😴</span>
        <h3>Hoy no hay promo especial</h3>
        <p>${_esc(diaTexto)}: ¡Pero la barbacoa sigue igual de rica! 🌮</p>
      </div>`;
  } else {
    const promos    = Array.isArray(promosDia) ? promosDia : [promosDia];
    const claseDoble = promos.length > 1 ? 'doble' : '';

    const tarjetas = promos.map((p, i) => {
      /* Botón: si hay carrito y productoId → "Agregar al pedido"
                en otro caso → "¡La quiero!" (scroll a sucursales) */
      const btnHTML = (tieneCarrito && p.productoId)
        ? `<button
             class="btn-agregar-promo"
             data-producto-id="${_esc(p.productoId)}"
             aria-label="Agregar ${_esc(p.titulo)} al carrito">
             <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i>
             Agregar al pedido
           </button>`
        : `<a href="#sucursales" class="btn btn-primary promo-btn"
             onclick="event.preventDefault(); document.getElementById('seccion-sucursales')?.scrollIntoView({behavior:'smooth'})">
             <i class="fa-solid fa-fire" aria-hidden="true"></i> ¡La quiero!
           </a>`;

      return `
        <div class="promo-card reveal" data-ghost="${_esc(diaTexto.toUpperCase())}">
          <span class="promo-num-badge" aria-hidden="true">
            Promo ${i + 1} de ${promos.length}
          </span>
          <div class="promo-day-label">
            ${i === 0 ? 'Hoy — ' + _esc(diaTexto) : _esc(diaTexto)}
          </div>
          <div class="promo-icon" aria-hidden="true">${_esc(p.icono)}</div>
          <h3 class="promo-title">${_esc(p.titulo)}</h3>
          <p class="promo-desc">${_esc(p.descripcion)}</p>
          <p class="promo-disclaimer">${_esc(p.disclaimer)}</p>
          ${btnHTML}
        </div>`;
    }).join('');

    contenido = `<div class="promos-container ${_esc(claseDoble)}">${tarjetas}</div>`;
  }

  seccion.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">🔥 Oferta especial</span>
        <h2 class="section-title">Promo del día</h2>
      </div>
      ${contenido}
    </div>`;

  /* ── Bind botones "Agregar al pedido" ────────────────────────── */
  if (tieneCarrito) {
    seccion.querySelectorAll('.btn-agregar-promo').forEach(btn => {
      btn.addEventListener('click', () => {
        const productoId = btn.dataset.productoId;
        const menus      = MENUS_DATA[sucursalId] || [];
        const producto   = menus.find(p => p.id === productoId);
        if (!producto) return;

        Carrito.agregar(producto);

        /* Feedback visual */
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Agregado';
        btn.classList.add('agregado');
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = textoOriginal;
          btn.classList.remove('agregado');
          btn.disabled = false;
        }, 1400);
      });
    });
  }

  if (window.App?.reObservar) window.App.reObservar(seccion);
}
