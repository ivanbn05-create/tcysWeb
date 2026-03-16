/**
 * ================================================================
 * LOS TOCAYOS — components/promo.js
 * Renderiza promos + botones de descarga compactos en un grid
 * de 3 columnas:
 *   · Promo 1 → col 1
 *   · Promo 2 → col 2  (o promo única ocupa cols 1–2)
 *   · Descargas → col 3 (siempre)
 * ================================================================
 * ✏️  DESCARGAS: actualiza los `href` en DESCARGAS_CONFIG con
 * los nombres reales de tus imágenes en la carpeta img/.
 * ================================================================
 */

'use strict';

/* ── Config de descargas ──────────────────────────────────────── */
const DESCARGAS_CONFIG = [
  {
    icono: 'fa-solid fa-utensils',
    titulo: 'Nuestro Menú',
    href: 'img/menu-imagen.jpg',
    ariaLabel: 'Descargar imagen del menú',
  },
  {
    icono: 'fa-solid fa-fire-flame-curved',
    titulo: 'Precios Cortes',
    href: 'img/cortes-precios.jpg',
    ariaLabel: 'Descargar precios de cortes finos',
  },
  {
    icono: 'fa-solid fa-star',
    titulo: 'Eventos',
    href: 'img/eventos.jpg',
    ariaLabel: 'Descargar información para eventos',
  },
  {
    icono: 'fa-solid fa-tag',
    titulo: 'Promociones',
    href: 'img/promociones.jpg',
    ariaLabel: 'Descargar imagen de promociones',
  },
];

/* ── Escape HTML ────────────────────────────────────────────────── */
function _esc(s) {
  if (typeof s !== 'string') return String(s);
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

/* ── HTML del panel de descargas ────────────────────────────────── */
function _renderDescargasPanel() {
  const botones = DESCARGAS_CONFIG.map(d => `
    <a class="descarga-mini-btn"
       href="${_esc(d.href)}"
       download
       aria-label="${_esc(d.ariaLabel)}">
      <i class="${_esc(d.icono)}" aria-hidden="true"></i>
      <span>${_esc(d.titulo)}</span>
      <i class="fa-solid fa-arrow-down-to-line descarga-mini-arrow" aria-hidden="true"></i>
    </a>`).join('');

  return `
    <div class="promo-descargas-col reveal">
      <div class="descargas-mini-panel">
        <p class="descargas-mini-header">
          <i class="fa-solid fa-download" aria-hidden="true"></i>
          Descarga
        </p>
        ${botones}
      </div>
    </div>`;
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

  let mainColClase = '';
  let mainColContenido;

  if (!promosDia) {
    /* Sin promo hoy → ocupa las 2 columnas izquierdas */
    mainColClase = 'promo-main-col promo-main-col--wide';
    mainColContenido = `
      <div class="promo-rest-card reveal">
        <i class="fa-solid fa-calendar-xmark promo-rest-icon" aria-hidden="true"></i>
        <h3>Hoy no hay promo especial</h3>
        <p>${_esc(diaTexto)}: La barbacoa sigue igual de rica.</p>
      </div>`;
  } else {
    const promos     = Array.isArray(promosDia) ? promosDia : [promosDia];
    const esDoble    = promos.length > 1;

    /* Con 1 promo también ocupa las 2 columnas; con 2, cada una ocupa 1 */
    mainColClase = esDoble
      ? 'promo-main-col promo-main-col--doble'
      : 'promo-main-col promo-main-col--wide';

    const tarjetas = promos.map((p, i) => {
      /* Icono: el campo p.icono ahora es una clase de FA (ej. 'fa-solid fa-utensils') */
      const iconoHTML = p.icono
        ? `<i class="${_esc(p.icono)} promo-fa-icon" aria-hidden="true"></i>`
        : '';

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
             <i class="fa-solid fa-fire-flame-curved" aria-hidden="true"></i>
             ¡La quiero!
           </a>`;

      return `
        <div class="promo-card reveal" data-ghost="${_esc(diaTexto.toUpperCase())}">
          <span class="promo-num-badge" aria-hidden="true">
            Promo ${i + 1} de ${promos.length}
          </span>
          <div class="promo-day-label">
            ${i === 0 ? 'Hoy — ' + _esc(diaTexto) : _esc(diaTexto)}
          </div>
          ${iconoHTML}
          <h3 class="promo-title">${_esc(p.titulo)}</h3>
          <p class="promo-desc">${_esc(p.descripcion)}</p>
          <p class="promo-disclaimer">${_esc(p.disclaimer)}</p>
          ${btnHTML}
        </div>`;
    }).join('');

    mainColContenido = `<div class="promos-inner${esDoble ? ' doble' : ''}">${tarjetas}</div>`;
  }

  seccion.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">
          <i class="fa-solid fa-fire-flame-curved" aria-hidden="true"></i>
          Oferta especial
        </span>
        <h2 class="section-title">Promo del día</h2>
      </div>

      <div class="promo-layout">
        <div class="${_esc(mainColClase)}">
          ${mainColContenido}
        </div>
        ${_renderDescargasPanel()}
      </div>
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
