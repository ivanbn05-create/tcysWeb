/**
 * ================================================================
 * LOS TOCAYOS — components/carrito.js
 * Sistema de carrito (solo Sucursal Mariano Otero).
 * Soporte de platos numerados (1–10).
 *
 * FLUJO DE CHECKOUT:
 *   1. Vista carrito   → items + "Pedir por WhatsApp"
 *   2. Vista tipo      → elegir recoger en sucursal / envío a domicilio
 *   3a. Vista sucursal → nombre de pila + teléfono
 *   3b. Vista domicilio→ nombre + apellido + teléfono + dirección
 *       (detectar GPS, editar resultado, o escribir manualmente)
 *   4. Se abre WhatsApp con el mensaje completo formateado
 * ================================================================
 */

'use strict';

/* ── Estado ─────────────────────────────────────────────────────── */
const Carrito = {
  items: {},
  platoActual: 1,
  abierto: false,

  _checkout: {
    vista: 'carrito', // 'carrito' | 'tipo' | 'sucursal' | 'domicilio'
    tipo: null,
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
  },

  _resetCheckout() {
    this._checkout = {
      vista: 'carrito', tipo: null,
      nombre: '', apellido: '', telefono: '', direccion: '',
    };
  },

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

  vaciar() { this.items = {}; this._resetCheckout(); this._actualizar(); },

  get totalPiezas() {
    return Object.values(this.items).reduce((t, p) =>
      t + Object.values(p).reduce((s, i) => s + i.cantidad, 0), 0);
  },
  get totalPesos() {
    return Object.values(this.items).reduce((t, p) =>
      t + Object.values(p).reduce((s, i) => s + i.producto.precio * i.cantidad, 0), 0);
  },

  _actualizar() {
    _renderBadge();
    _actualizarPlatoSelector();
    if (this.abierto) _renderVista();
  },
};

/* ── Helpers ─────────────────────────────────────────────────────── */
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
    btn.classList.toggle('activo', n === Carrito.platoActual);
    btn.setAttribute('aria-pressed', String(n === Carrito.platoActual));
    const count = Object.values(Carrito.items[n] ?? {}).reduce((s, i) => s + i.cantidad, 0);
    btn.dataset.count = count > 0 ? String(count) : '';
  });
}

function _mostrarError(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 5000);
}

/* ── Router de vistas ────────────────────────────────────────────── */
function _renderVista() {
  switch (Carrito._checkout.vista) {
    case 'tipo':      return _renderVistaTipo();
    case 'sucursal':  return _renderVistaSucursal();
    case 'domicilio': return _renderVistaDomicilio();
    default:          return _renderContenido();
  }
}

/* ================================================================
   VISTA 1: LISTA DE ITEMS
================================================================ */
function _renderContenido() {
  const panel = document.getElementById('carrito-panel');
  if (!panel) return;

  const nums = Object.keys(Carrito.items).map(Number).sort((a, b) => a - b);

  if (nums.length === 0) {
    panel.innerHTML = `
      <div class="carrito-vacio">
        <span class="carrito-vacio-icon" aria-hidden="true"><i class="fa-solid fa-bag-shopping"></i></span>
        <p>Tu carrito está vacío</p>
        <small>Selecciona un plato y agrega productos</small>
      </div>`;
    return;
  }

  const secciones = nums.map(plato => {
    const items = Carrito.items[plato];
    const filas = Object.entries(items).map(([id, { producto, cantidad }]) => `
      <div class="carrito-item" data-id="${esc(id)}" data-plato="${plato}">
        <div class="carrito-item-info">
          <span class="carrito-item-nombre">${esc(producto.nombre)}</span>
          <span class="carrito-item-precio">$${producto.precio * cantidad}</span>
        </div>
        <div class="carrito-item-ctrl">
          <button class="ctrl-btn" data-accion="restar"   data-id="${esc(id)}" data-plato="${plato}" aria-label="Restar uno">−</button>
          <span class="ctrl-cantidad">${cantidad}</span>
          <button class="ctrl-btn" data-accion="sumar"    data-id="${esc(id)}" data-plato="${plato}" aria-label="Sumar uno">+</button>
          <button class="ctrl-btn ctrl-btn--del" data-accion="eliminar" data-id="${esc(id)}" data-plato="${plato}" aria-label="Eliminar">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
      </div>`).join('');
    const sub = Object.values(items).reduce((s, i) => s + i.producto.precio * i.cantidad, 0);
    return `
      <div class="carrito-plato-grupo">
        <div class="carrito-plato-header">
          <span class="carrito-plato-num"><i class="fa-solid fa-utensils" aria-hidden="true"></i> Plato ${plato}</span>
          <span class="carrito-plato-subtotal">$${sub}</span>
        </div>
        ${filas}
      </div>`;
  }).join('');

  panel.innerHTML = `
    ${secciones}
    <div class="carrito-total"><span>Total</span><strong>$${Carrito.totalPesos}</strong></div>
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
      const n = parseInt(plato, 10);
      if (accion === 'sumar')    Carrito._incrementar(id, n);
      if (accion === 'restar')   Carrito.restar(id, n);
      if (accion === 'eliminar') Carrito.eliminar(id, n);
    });
  });

  document.getElementById('btn-carrito-vaciar')
    ?.addEventListener('click', () => { if (confirm('¿Vaciar el carrito completo?')) Carrito.vaciar(); });

  document.getElementById('btn-carrito-pedir')
    ?.addEventListener('click', () => {
      Carrito._checkout.vista = 'tipo';
      _renderVistaTipo();
    });
}

/* ================================================================
   VISTA 2: ELEGIR TIPO DE ENTREGA
================================================================ */
function _renderVistaTipo() {
  const panel = document.getElementById('carrito-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="checkout-vista">
      <p class="checkout-pregunta">
        <i class="fa-solid fa-circle-question" aria-hidden="true"></i>
        ¿Cómo quieres recibir tu pedido?
      </p>
      <div class="checkout-tipo-btns">
        <button class="checkout-tipo-btn" id="btn-tipo-sucursal">
          <i class="fa-solid fa-store" aria-hidden="true"></i>
          <strong>Recoger en sucursal</strong>
          <span>Pasa a recogerlo listo</span>
        </button>
        <button class="checkout-tipo-btn" id="btn-tipo-domicilio">
          <i class="fa-solid fa-motorcycle" aria-hidden="true"></i>
          <strong>Envío a domicilio</strong>
          <span>Te lo llevamos donde estés</span>
        </button>
      </div>
      <button class="checkout-back" id="btn-back-tipo">
        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Volver al carrito
      </button>
    </div>`;

  document.getElementById('btn-tipo-sucursal')?.addEventListener('click', () => {
    Carrito._checkout.tipo  = 'sucursal';
    Carrito._checkout.vista = 'sucursal';
    _renderVistaSucursal();
  });
  document.getElementById('btn-tipo-domicilio')?.addEventListener('click', () => {
    Carrito._checkout.tipo  = 'domicilio';
    Carrito._checkout.vista = 'domicilio';
    _renderVistaDomicilio();
  });
  document.getElementById('btn-back-tipo')?.addEventListener('click', () => {
    Carrito._checkout.vista = 'carrito';
    _renderContenido();
  });
}

/* ================================================================
   VISTA 3a: DATOS PARA RECOGER EN SUCURSAL
================================================================ */
function _renderVistaSucursal() {
  const panel = document.getElementById('carrito-panel');
  if (!panel) return;
  const co = Carrito._checkout;

  panel.innerHTML = `
    <div class="checkout-vista">
      <div class="checkout-tipo-tag">
        <i class="fa-solid fa-store" aria-hidden="true"></i> Recoger en sucursal
      </div>
      <p class="checkout-instruccion">Ingresa tus datos para asignar el pedido a tu nombre.</p>
      <div class="checkout-form">
        <div class="checkout-field">
          <label class="checkout-label" for="co-nombre">
            <i class="fa-solid fa-user" aria-hidden="true"></i> Nombre de pila
          </label>
          <input class="checkout-input" id="co-nombre" type="text"
                 placeholder="Ej. Carlos" maxlength="40"
                 value="${esc(co.nombre)}" autocomplete="given-name" />
        </div>
        <div class="checkout-field">
          <label class="checkout-label" for="co-tel">
            <i class="fa-solid fa-phone" aria-hidden="true"></i> Teléfono de contacto
          </label>
          <input class="checkout-input" id="co-tel" type="tel"
                 placeholder="10 dígitos" maxlength="15"
                 value="${esc(co.telefono)}" autocomplete="tel" />
        </div>
        <p class="checkout-error" id="co-error" style="display:none;"></p>
        <button class="btn btn-whatsapp checkout-submit" id="btn-suc-confirmar">
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
          Confirmar y enviar pedido
        </button>
      </div>
      <button class="checkout-back" id="btn-back-suc">
        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Cambiar tipo de pedido
      </button>
    </div>`;

  document.getElementById('btn-back-suc')?.addEventListener('click', () => {
    co.nombre   = document.getElementById('co-nombre')?.value.trim() ?? co.nombre;
    co.telefono = document.getElementById('co-tel')?.value.trim()    ?? co.telefono;
    Carrito._checkout.vista = 'tipo';
    _renderVistaTipo();
  });

  document.getElementById('btn-suc-confirmar')?.addEventListener('click', () => {
    const nombre   = document.getElementById('co-nombre')?.value.trim();
    const telefono = document.getElementById('co-tel')?.value.trim();
    const errEl    = document.getElementById('co-error');
    if (!nombre) { _mostrarError(errEl, 'Por favor ingresa tu nombre de pila.'); document.getElementById('co-nombre')?.focus(); return; }
    if (!telefono || !/^\d{7,15}$/.test(telefono.replace(/[\s\-]/g, ''))) {
      _mostrarError(errEl, 'Ingresa un teléfono válido (7-15 dígitos).');
      document.getElementById('co-tel')?.focus(); return;
    }
    co.nombre = nombre; co.telefono = telefono;
    _enviarWhatsApp();
  });
}

/* ================================================================
   VISTA 3b: DATOS PARA ENVÍO A DOMICILIO
================================================================ */
function _renderVistaDomicilio() {
  const panel = document.getElementById('carrito-panel');
  if (!panel) return;
  const co = Carrito._checkout;

  panel.innerHTML = `
    <div class="checkout-vista">
      <div class="checkout-tipo-tag checkout-tipo-tag--delivery">
        <i class="fa-solid fa-motorcycle" aria-hidden="true"></i> Envío a domicilio
      </div>
      <p class="checkout-instruccion">Completa tus datos para coordinar la entrega.</p>
      <div class="checkout-form">

        <div class="checkout-fields-row">
          <div class="checkout-field">
            <label class="checkout-label" for="dom-nombre">Nombre</label>
            <input class="checkout-input" id="dom-nombre" type="text"
                   placeholder="Nombre" maxlength="40"
                   value="${esc(co.nombre)}" autocomplete="given-name" />
          </div>
          <div class="checkout-field">
            <label class="checkout-label" for="dom-apellido">Apellido</label>
            <input class="checkout-input" id="dom-apellido" type="text"
                   placeholder="Apellido" maxlength="40"
                   value="${esc(co.apellido)}" autocomplete="family-name" />
          </div>
        </div>

        <div class="checkout-field">
          <label class="checkout-label" for="dom-tel">
            <i class="fa-solid fa-phone" aria-hidden="true"></i> Teléfono
          </label>
          <input class="checkout-input" id="dom-tel" type="tel"
                 placeholder="10 dígitos" maxlength="15"
                 value="${esc(co.telefono)}" autocomplete="tel" />
        </div>

        <div class="checkout-field">
          <label class="checkout-label">
            <i class="fa-solid fa-location-dot" aria-hidden="true"></i> Dirección de entrega
          </label>
          <div class="checkout-geo-btns">
            <button class="checkout-geo-btn" id="btn-geo-detectar" type="button">
              <i class="fa-solid fa-location-crosshairs" aria-hidden="true"></i>
              Detectar mi ubicación
            </button>
            <span class="checkout-geo-sep">o</span>
            <button class="checkout-geo-btn checkout-geo-btn--outline" id="btn-geo-manual" type="button">
              Escribir manualmente
            </button>
          </div>
          <div id="dom-geo-loading" class="checkout-geo-loading" style="display:none;">
            <i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
            Detectando tu ubicación…
          </div>
          <div id="dom-dir-wrap" style="display:${co.direccion ? 'block' : 'none'};">
            <textarea class="checkout-input checkout-textarea" id="dom-dir"
                      placeholder="Calle, número, colonia, ciudad, referencias..."
                      rows="3" maxlength="300">${esc(co.direccion)}</textarea>
            <p class="checkout-geo-hint" id="geo-edit-hint" style="display:none;">
              <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
              Puedes editar la dirección detectada antes de enviar.
            </p>
          </div>
        </div>

        <p class="checkout-error" id="dom-error" style="display:none;"></p>

        <button class="btn btn-whatsapp checkout-submit" id="btn-dom-confirmar">
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
          Confirmar y enviar pedido
        </button>
      </div>
      <button class="checkout-back" id="btn-back-dom">
        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Cambiar tipo de pedido
      </button>
    </div>`;

  /* Volver */
  document.getElementById('btn-back-dom')?.addEventListener('click', () => {
    _guardarDomicilio();
    Carrito._checkout.vista = 'tipo';
    _renderVistaTipo();
  });

  /* Detectar GPS */
  document.getElementById('btn-geo-detectar')?.addEventListener('click', _detectarUbicacion);

  /* Manual */
  document.getElementById('btn-geo-manual')?.addEventListener('click', () => {
    const wrap = document.getElementById('dom-dir-wrap');
    if (wrap) { wrap.style.display = 'block'; document.getElementById('dom-dir')?.focus(); }
  });

  /* Confirmar */
  document.getElementById('btn-dom-confirmar')?.addEventListener('click', () => {
    const nombre    = document.getElementById('dom-nombre')?.value.trim();
    const apellido  = document.getElementById('dom-apellido')?.value.trim();
    const telefono  = document.getElementById('dom-tel')?.value.trim();
    const direccion = document.getElementById('dom-dir')?.value.trim();
    const errEl     = document.getElementById('dom-error');

    if (!nombre)    { _mostrarError(errEl, 'Ingresa tu nombre.'); document.getElementById('dom-nombre')?.focus(); return; }
    if (!apellido)  { _mostrarError(errEl, 'Ingresa tu apellido.'); document.getElementById('dom-apellido')?.focus(); return; }
    if (!telefono || !/^\d{7,15}$/.test(telefono.replace(/[\s\-]/g, ''))) {
      _mostrarError(errEl, 'Ingresa un teléfono válido (7-15 dígitos).');
      document.getElementById('dom-tel')?.focus(); return;
    }
    if (!direccion) { _mostrarError(errEl, 'Ingresa o detecta tu dirección de entrega.'); return; }

    co.nombre = nombre; co.apellido = apellido;
    co.telefono = telefono; co.direccion = direccion;
    _enviarWhatsApp();
  });
}

function _guardarDomicilio() {
  const co = Carrito._checkout;
  co.nombre    = document.getElementById('dom-nombre')?.value.trim()   ?? co.nombre;
  co.apellido  = document.getElementById('dom-apellido')?.value.trim() ?? co.apellido;
  co.telefono  = document.getElementById('dom-tel')?.value.trim()      ?? co.telefono;
  co.direccion = document.getElementById('dom-dir')?.value.trim()      ?? co.direccion;
}

/* ── Geolocalización + geocodificación inversa (Nominatim OSM) ───── */
function _detectarUbicacion() {
  const loading = document.getElementById('dom-geo-loading');
  const wrap    = document.getElementById('dom-dir-wrap');
  const hint    = document.getElementById('geo-edit-hint');
  const errEl   = document.getElementById('dom-error');
  const btnDet  = document.getElementById('btn-geo-detectar');

  if (!('geolocation' in navigator)) {
    if (wrap) wrap.style.display = 'block';
    _mostrarError(errEl, 'Tu navegador no soporta geolocalización. Escribe tu dirección manualmente.');
    return;
  }

  if (loading) loading.style.display = 'flex';
  if (btnDet)  btnDet.disabled = true;

  navigator.geolocation.getCurrentPosition(
    async ({ coords: { latitude, longitude } }) => {
      try {
        const res  = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=es`,
          { headers: { 'Accept-Language': 'es' } }
        );
        const data = await res.json();
        const a    = data.address ?? {};
        const partes = [
          a.road, a.house_number,
          a.suburb || a.neighbourhood || a.quarter,
          a.city   || a.town || a.village || a.municipality,
          a.state,
        ].filter(Boolean);

        const dir = partes.length > 0
          ? partes.join(', ')
          : data.display_name ?? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

        if (loading) loading.style.display = 'none';
        if (btnDet)  btnDet.disabled = false;
        if (wrap)    wrap.style.display = 'block';
        if (hint)    hint.style.display = 'block';

        const ta = document.getElementById('dom-dir');
        if (ta) { ta.value = dir; ta.focus(); ta.select(); }

      } catch {
        if (loading) loading.style.display = 'none';
        if (btnDet)  btnDet.disabled = false;
        if (wrap)    wrap.style.display = 'block';
        _mostrarError(errEl, 'No se pudo obtener la dirección. Escríbela manualmente.');
      }
    },
    (err) => {
      if (loading) loading.style.display = 'none';
      if (btnDet)  btnDet.disabled = false;
      if (wrap)    wrap.style.display = 'block';
      const msgs = {
        1: 'Permiso de ubicación denegado. Escribe tu dirección manualmente.',
        2: 'No se pudo determinar tu ubicación.',
        3: 'La solicitud tardó demasiado. Intenta de nuevo.',
      };
      _mostrarError(errEl, msgs[err.code] ?? 'Error al obtener ubicación.');
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

/* ================================================================
   GENERADOR DEL MENSAJE DE WHATSAPP
================================================================ */
function _enviarWhatsApp() {
  const sucursal = window.App?.sucursalActual;
  if (!sucursal) return;

  const nums = Object.keys(Carrito.items).map(Number).sort((a, b) => a - b);
  if (nums.length === 0) return;

  const co     = Carrito._checkout;
  const hora   = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';

  const lineas = nums.map(plato => {
    const items = Object.values(Carrito.items[plato])
      .map(({ producto, cantidad }) => `  ${cantidad}x ${producto.nombre}`)
      .join('\n');
    return `Plato ${plato}:\n${items}`;
  }).join('\n\n');

  const entrega = co.tipo === 'sucursal'
    ? `Tipo: Recoger en sucursal\nNombre: ${co.nombre}\nTeléfono: ${co.telefono}`
    : `Tipo: Envío a domicilio\nNombre: ${co.nombre} ${co.apellido}\nTeléfono: ${co.telefono}\nDirección: ${co.direccion}`;

  const mensaje =
    `${saludo}, quisiera realizar el siguiente pedido en ${sucursal.nombre}:\n\n` +
    `${lineas}\n\n` +
    //`Total estimado: $${Carrito.totalPesos}\n\n` +
    `${entrega}\n\n` +
    `Gracias.`;

  window.open(
    `https://wa.me/${sucursal.whatsapp}?text=${encodeURIComponent(mensaje)}`,
    '_blank', 'noopener,noreferrer'
  );

  Carrito._resetCheckout();
  _renderContenido();
}

/* ================================================================
   TOGGLE DRAWER
================================================================ */
function _toggleCarrito() {
  Carrito.abierto = !Carrito.abierto;
  const drawer  = document.getElementById('carrito-drawer');
  const overlay = document.getElementById('carrito-overlay');
  if (!drawer) return;

  if (Carrito.abierto) {
    Carrito._resetCheckout();
    drawer.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    _renderVista();
  } else {
    drawer.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ================================================================
   HTML ESTÁTICO DEL DRAWER
================================================================ */
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
          <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i> Tu Pedido
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

/* ================================================================
   INIT
================================================================ */
function initCarrito() {
  const container = document.getElementById('carrito-container');
  if (container) container.innerHTML = renderCarritoUI();
  document.getElementById('btn-carrito-flotante')?.addEventListener('click', _toggleCarrito);
  document.getElementById('btn-carrito-cerrar')?.addEventListener('click', _toggleCarrito);
  document.getElementById('carrito-overlay')?.addEventListener('click', _toggleCarrito);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && Carrito.abierto) _toggleCarrito();
  });
  _renderBadge();
}
