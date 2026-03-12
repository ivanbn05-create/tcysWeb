/**
 * ================================================================
 * LOS TOCAYOS — components/carrito.js
 * Sistema de carrito (solo Sucursal Arboledas).
 * Genera mensaje automático para WhatsApp.
 * ================================================================
 */

'use strict';

/* ── Estado del carrito ─────────────────────────────────────────── */
const Carrito = {
  items: {},       // { [productoId]: { producto, cantidad } }
  abierto: false,

  /* Agregar o incrementar un producto */
  agregar(producto) {
    if (this.items[producto.id]) {
      this.items[producto.id].cantidad++;
    } else {
      this.items[producto.id] = { producto, cantidad: 1 };
    }
    this._actualizar();
  },

  /* Restar uno (elimina si llega a 0) */
  restar(productoId) {
    if (!this.items[productoId]) return;
    this.items[productoId].cantidad--;
    if (this.items[productoId].cantidad <= 0) {
      delete this.items[productoId];
    }
    this._actualizar();
  },

  /* Eliminar producto completo */
  eliminar(productoId) {
    delete this.items[productoId];
    this._actualizar();
  },

  /* Vaciar carrito */
  vaciar() {
    this.items = {};
    this._actualizar();
  },

  /* Total de piezas */
  get totalPiezas() {
    return Object.values(this.items).reduce((s, i) => s + i.cantidad, 0);
  },

  /* Total en pesos */
  get totalPesos() {
    return Object.values(this.items).reduce(
      (s, i) => s + i.producto.precio * i.cantidad, 0
    );
  },

  /* Actualizar UI */
  _actualizar() {
    _renderBadge();
    if (this.abierto) _renderContenido();
  },
};

/* ── Helpers de escape ──────────────────────────────────────────── */
function esc(str) {
  if (typeof str !== 'string') return String(str);
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;')
            .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

/* ── Render del badge (número en el botón flotante) ────────────── */
function _renderBadge() {
  const badge = document.getElementById('carrito-badge');
  if (!badge) return;
  const total = Carrito.totalPiezas;
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

/* ── Render del contenido del panel ────────────────────────────── */
function _renderContenido() {
  const panel = document.getElementById('carrito-panel');
  if (!panel) return;

  const entradas = Object.values(Carrito.items);

  if (entradas.length === 0) {
    panel.innerHTML = `
      <div class="carrito-vacio">
        <span class="carrito-vacio-icon" aria-hidden="true">🛒</span>
        <p>Tu carrito está vacío</p>
        <small>Agrega productos desde el menú</small>
      </div>`;
    return;
  }

  const filas = entradas.map(({ producto, cantidad }) => `
    <div class="carrito-item" data-id="${esc(producto.id)}">
      <div class="carrito-item-info">
        <span class="carrito-item-nombre">${esc(producto.nombre)}</span>
        <span class="carrito-item-precio">$${producto.precio * cantidad}</span>
      </div>
      <div class="carrito-item-ctrl">
        <button class="ctrl-btn" data-accion="restar" data-id="${esc(producto.id)}"
                aria-label="Restar uno de ${esc(producto.nombre)}">−</button>
        <span class="ctrl-cantidad" aria-label="Cantidad">${cantidad}</span>
        <button class="ctrl-btn" data-accion="sumar" data-id="${esc(producto.id)}"
                aria-label="Agregar uno más de ${esc(producto.nombre)}">+</button>
        <button class="ctrl-btn ctrl-btn--del" data-accion="eliminar" data-id="${esc(producto.id)}"
                aria-label="Eliminar ${esc(producto.nombre)}">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>
    </div>`).join('');

  panel.innerHTML = `
    ${filas}
    <div class="carrito-total">
      <span>Total</span>
      <strong>$${Carrito.totalPesos}</strong>
    </div>
    <div class="carrito-acciones">
      <button id="btn-carrito-vaciar" class="btn btn-outline btn-sm">
        <i class="fa-solid fa-trash" aria-hidden="true"></i> Vaciar
      </button>
      <button id="btn-carrito-pedir" class="btn btn-whatsapp btn-carrito-pedir">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Pedir por WhatsApp
      </button>
    </div>`;

  // Eventos de los controles
  panel.querySelectorAll('[data-accion]').forEach(btn => {
    btn.addEventListener('click', () => {
      const { accion, id } = btn.dataset;
      if (accion === 'sumar')    { const e = Carrito.items[id]; if(e) Carrito.agregar(e.producto); }
      if (accion === 'restar')   Carrito.restar(id);
      if (accion === 'eliminar') Carrito.eliminar(id);
    });
  });

  document.getElementById('btn-carrito-vaciar')?.addEventListener('click', () => {
    if (confirm('¿Vaciar el carrito?')) Carrito.vaciar();
  });

  document.getElementById('btn-carrito-pedir')?.addEventListener('click', _enviarWhatsApp);
}

/* ── Generar y abrir mensaje de WhatsApp ───────────────────────── */
function _enviarWhatsApp() {
  const sucursal = window.App?.sucursalActual;
  if (!sucursal) return;

  const entradas = Object.values(Carrito.items);
  if (entradas.length === 0) return;

  /* Formato del mensaje solicitado */
  const hora = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';

  const lineas = entradas
    .map(({ producto, cantidad }) => `${cantidad} ${producto.nombre}`)
    .join('\n');

  const total = Carrito.totalPesos;

  const mensaje =
    `${saludo}, quisiera realizar el siguiente pedido:\n\n` +
    `${lineas}\n\n` +
    `Total estimado: $${total}\n\n` +
    `Gracias.`;

  const url = `https://wa.me/${sucursal.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ── Abrir / cerrar el drawer del carrito ──────────────────────── */
function _toggleCarrito() {
  Carrito.abierto = !Carrito.abierto;
  const drawer  = document.getElementById('carrito-drawer');
  const overlay = document.getElementById('carrito-overlay');
  if (!drawer) return;

  drawer.classList.toggle('open', Carrito.abierto);
  overlay.classList.toggle('open', Carrito.abierto);
  document.body.style.overflow = Carrito.abierto ? 'hidden' : '';

  if (Carrito.abierto) _renderContenido();
}

/* ── HTML del sistema completo ──────────────────────────────────── */
function renderCarritoUI() {
  return `
    <!-- Botón flotante del carrito -->
    <button id="btn-carrito-flotante" class="carrito-flotante" aria-label="Ver carrito de pedido">
      <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i>
      <span id="carrito-badge" class="carrito-badge" aria-live="polite" style="display:none">0</span>
    </button>

    <!-- Overlay oscuro -->
    <div id="carrito-overlay" class="carrito-overlay" aria-hidden="true"></div>

    <!-- Drawer lateral -->
    <aside id="carrito-drawer" class="carrito-drawer" role="dialog"
           aria-modal="true" aria-label="Carrito de pedido">
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
        Sucursal Arboledas
      </div>
      <div id="carrito-panel" class="carrito-panel" role="region" aria-live="polite">
        <!-- contenido inyectado por JS -->
      </div>
    </aside>`;
}

/* ── Botones "+ Agregar" en las tarjetas del menú ──────────────── */
function renderBotonAgregar(producto) {
  if (!producto.enCarrito) return '';
  return `
    <button class="btn-agregar-carrito" data-producto-id="${esc(producto.id)}"
            aria-label="Agregar ${esc(producto.nombre)} al carrito">
      <i class="fa-solid fa-plus" aria-hidden="true"></i> Agregar
    </button>`;
}

/* ── Inicialización: bind eventos globales del carrito ─────────── */
function initCarrito() {
  // Insertar HTML del carrito en el body
  const carritoContainer = document.getElementById('carrito-container');
  if (carritoContainer) carritoContainer.innerHTML = renderCarritoUI();

  // Eventos
  document.getElementById('btn-carrito-flotante')
    ?.addEventListener('click', _toggleCarrito);
  document.getElementById('btn-carrito-cerrar')
    ?.addEventListener('click', _toggleCarrito);
  document.getElementById('carrito-overlay')
    ?.addEventListener('click', _toggleCarrito);

  // ESC para cerrar
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && Carrito.abierto) _toggleCarrito();
  });

  // Delegación de eventos para botones "Agregar" en el menú
  document.getElementById('seccion-menu')
    ?.addEventListener('click', e => {
      const btn = e.target.closest('.btn-agregar-carrito');
      if (!btn) return;
      const productoId = btn.dataset.productoId;
      const menus = MENUS_DATA[window.App?.sucursalActualId || 'arboledas'];
      const producto = menus?.find(p => p.id === productoId);
      if (producto) Carrito.agregar(producto);

      // Feedback visual
      btn.textContent = '✓ Agregado';
      btn.classList.add('agregado');
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i> Agregar';
        btn.classList.remove('agregado');
      }, 1200);
    });

  _renderBadge();
}
