/**
 * ================================================================
 * LOS TOCAYOS — components/carrito.js
 * Sistema de carrito (solo Sucursal Arboledas).
 * Soporte de platos numerados (1–10).
 * ================================================================
 */

'use strict';

const Carrito = {
  items: {},
  platoActual: 1,
  abierto: false,

  agregar(producto, cantidad = 1) {
    const plato = this.platoActual;
    const n = Math.max(1, Math.floor(cantidad));
    if (!this.items[plato]) this.items[plato] = {};
    if (this.items[plato][producto.id]) {
      this.items[plato][producto.id].cantidad += n;
    } else {
      this.items[plato][producto.id] = { producto, cantidad: n };
    }
    this._actualizar();
  },

  _incrementar(productoId, plato) {
    if (!this.items[plato]?.[productoId]) return;
    this.items[plato][productoId].cantidad += 1;
    this._actualizar();
  },

  restar(productoId, plato) {
    if (!this.items[plato]?.[productoId]) return;
    this.items[plato][productoId].cantidad--;
    if (this.items[plato][productoId].cantidad <= 0) delete this.items[plato][productoId];
    if (this.items[plato] && Object.keys(this.items[plato]).length === 0) delete this.items[plato];
    this._actualizar();
  },

  eliminar(productoId, plato) {
    if (!this.items[plato]) return;
    delete this.items[plato][productoId];
    if (Object.keys(this.items[plato]).length === 0) delete this.items[plato];
    this._actualizar();
  },

  vaciar() { this.items = {}; this._actualizar(); },

  get totalPiezas() {
    return Object.values(this.items).reduce((total, p) =>
      total + Object.values(p).reduce((s, i) => s + i.cantidad, 0), 0);
  },

  get totalPesos() {
    return Object.values(this.items).reduce((total, p) =>
      total + Object.values(p).reduce((s, i) => s + i.producto.precio * i.cantidad, 0), 0);
  },

  _actualizar() {
    _renderBadge();
    _actualizarPlatoSelector();
    if (this.abierto) _renderContenido();
  },
};

function esc(str) {
  if (typeof str !== 'string') return String(str);
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;')
            .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function _renderBadge() {
  const badge = document.getElementById('carrito-badge');
  if (!badge) return;
  const total = Carrito.totalPiezas;
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

function _actualizarPlatoSelector() {
  document.querySelectorAll('.plato-btn').forEach(btn => {
    const n = parseInt(btn.dataset.plato, 10);
    const esActivo = n === Carrito.platoActual;
    btn.classList.toggle('activo', esActivo);
    btn.setAttribute('aria-pressed', String(esActivo));
    const count = Object.values(Carrito.items[n] ?? {}).reduce((s, i) => s + i.cantidad, 0);
    btn.dataset.count = count > 0 ? String(count) : '';
  });
}

function _renderContenido() {
  const panel = document.getElementById('carrito-panel');
  if (!panel) return;

  const platoNums = Object.keys(Carrito.items).map(Number).sort((a, b) => a - b);

  if (platoNums.length === 0) {
    panel.innerHTML = `
      <div class="carrito-vacio">
        <span class="carrito-vacio-icon" aria-hidden="true">
          <i class="fa-solid fa-bag-shopping"></i>
        </span>
        <p>Tu carrito está vacío</p>
        <small>Selecciona un plato y agrega productos</small>
      </div>`;
    return;
  }

  const secciones = platoNums.map(plato => {
    const platoItems = Carrito.items[plato];
    const filas = Object.entries(platoItems).map(([productoId, { producto, cantidad }]) => `
      <div class="carrito-item" data-id="${esc(productoId)}" data-plato="${plato}">
        <div class="carrito-item-info">
          <span class="carrito-item-nombre">${esc(producto.nombre)}</span>
          <span class="carrito-item-precio">$${producto.precio * cantidad}</span>
        </div>
        <div class="carrito-item-ctrl">
          <button class="ctrl-btn" data-accion="restar" data-id="${esc(productoId)}" data-plato="${plato}" aria-label="Restar uno de ${esc(producto.nombre)}">−</button>
          <span class="ctrl-cantidad" aria-label="Cantidad: ${cantidad}">${cantidad}</span>
          <button class="ctrl-btn" data-accion="sumar" data-id="${esc(productoId)}" data-plato="${plato}" aria-label="Sumar uno de ${esc(producto.nombre)}">+</button>
          <button class="ctrl-btn ctrl-btn--del" data-accion="eliminar" data-id="${esc(productoId)}" data-plato="${plato}" aria-label="Eliminar ${esc(producto.nombre)}">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
      </div>`).join('');

    const subtotal = Object.values(platoItems).reduce((s, i) => s + i.producto.precio * i.cantidad, 0);

    return `
      <div class="carrito-plato-grupo">
        <div class="carrito-plato-header">
          <span class="carrito-plato-num">
            <i class="fa-solid fa-utensils" aria-hidden="true"></i>
            Plato ${plato}
          </span>
          <span class="carrito-plato-subtotal">$${subtotal}</span>
        </div>
        ${filas}
      </div>`;
  }).join('');

  panel.innerHTML = `
    ${secciones}
    <div class="carrito-total">
      <span>Total</span>
      <strong>$${Carrito.totalPesos}</strong>
    </div>
    <div class="carrito-acciones">
      <button id="btn-carrito-vaciar" class="btn btn-outline-dark btn-sm">
        <i class="fa-solid fa-trash" aria-hidden="true"></i> Vaciar
      </button>
      <button id="btn-carrito-pedir" class="btn btn-whatsapp btn-carrito-pedir">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Pedir por WhatsApp
      </button>
    </div>`;

  panel.querySelectorAll('[data-accion]').forEach(btn => {
    btn.addEventListener('click', () => {
      const { accion, id, plato } = btn.dataset;
      const platoNum = parseInt(plato, 10);
      if (accion === 'sumar')    Carrito._incrementar(id, platoNum);
      if (accion === 'restar')   Carrito.restar(id, platoNum);
      if (accion === 'eliminar') Carrito.eliminar(id, platoNum);
    });
  });

  document.getElementById('btn-carrito-vaciar')
    ?.addEventListener('click', () => { if (confirm('¿Vaciar el carrito completo?')) Carrito.vaciar(); });
  document.getElementById('btn-carrito-pedir')
    ?.addEventListener('click', _enviarWhatsApp);
}

function _enviarWhatsApp() {
  const sucursal = window.App?.sucursalActual;
  if (!sucursal) return;
  const platoNums = Object.keys(Carrito.items).map(Number).sort((a, b) => a - b);
  if (platoNums.length === 0) return;

  const hora   = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';
  const lineas = platoNums.map(plato => {
    const items = Object.values(Carrito.items[plato])
      .map(({ producto, cantidad }) => `  ${cantidad}x ${producto.nombre}`).join('\n');
    return `Plato ${plato}:\n${items}`;
  }).join('\n\n');

  const mensaje =
    `${saludo}, quisiera realizar el siguiente pedido en ${sucursal.nombre}:\n\n` +
    `${lineas}\n\nTotal estimado: $${Carrito.totalPesos}\n\nGracias.`;

  window.open(`https://wa.me/${sucursal.whatsapp}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer');
}

function _toggleCarrito() {
  Carrito.abierto = !Carrito.abierto;
  const drawer  = document.getElementById('carrito-drawer');
  const overlay = document.getElementById('carrito-overlay');
  if (!drawer) return;
  drawer.classList.toggle('open', Carrito.abierto);
  overlay?.classList.toggle('open', Carrito.abierto);
  document.body.style.overflow = Carrito.abierto ? 'hidden' : '';
  if (Carrito.abierto) _renderContenido();
}

function renderCarritoUI() {
  return `
    <button id="btn-carrito-flotante" class="carrito-flotante" aria-label="Ver carrito de pedido">
      <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i>
      <span id="carrito-badge" class="carrito-badge" aria-live="polite" style="display:none">0</span>
    </button>
    <div id="carrito-overlay" class="carrito-overlay" aria-hidden="true"></div>
    <aside id="carrito-drawer" class="carrito-drawer" role="dialog" aria-modal="true" aria-label="Carrito de pedido">
      <div class="carrito-header">
        <h2 class="carrito-titulo">
          <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i>
          Tu Pedido
        </h2>
        <button id="btn-carrito-cerrar" class="carrito-cerrar" aria-label="Cerrar carrito">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>
      <div class="carrito-sucursal-tag">
        <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
        Sucursal Mariano Otero
      </div>
      <div id="carrito-panel" class="carrito-panel" role="region" aria-live="polite"></div>
    </aside>`;
}

function renderBotonAgregar(producto) { return ''; }

function initCarrito() {
  const container = document.getElementById('carrito-container');
  if (container) container.innerHTML = renderCarritoUI();
  document.getElementById('btn-carrito-flotante')?.addEventListener('click', _toggleCarrito);
  document.getElementById('btn-carrito-cerrar')?.addEventListener('click', _toggleCarrito);
  document.getElementById('carrito-overlay')?.addEventListener('click', _toggleCarrito);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && Carrito.abierto) _toggleCarrito(); });
  _renderBadge();
}
