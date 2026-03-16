/**
 * ================================================================
 * LOS TOCAYOS — components/menu.js
 * Renderiza la sección de menú de forma dinámica.
 *
 * · Selector de platos (1–10) encima del grid de productos.
 * · Auto-add: si el usuario no cambia la cantidad (queda en 1),
 *   el producto se agrega automáticamente tras 2.5 segundos.
 * · Hint/tutorial dismissable sobre el sistema de platos.
 * ================================================================
 */

'use strict';

function _escM(s) {
  if (typeof s !== 'string') return String(s);
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

let _autoAddTimer = null;
function _clearAutoTimer() {
  if (_autoAddTimer) { clearTimeout(_autoAddTimer); _autoAddTimer = null; }
}

function _abrirStepper(accionEl) {
  document.querySelectorAll('.card-accion.activo').forEach(el => {
    if (el !== accionEl) _cerrarStepper(el);
  });
  accionEl.classList.add('activo');
  const qtyEl = accionEl.querySelector('.stepper-qty');
  if (qtyEl) qtyEl.textContent = '1';

  const okBtn = accionEl.querySelector('.stepper-ok');
  if (okBtn) {
    okBtn.querySelector('.stepper-auto-progress')?.remove();
    okBtn.style.position = 'relative';
    okBtn.style.overflow = 'hidden';
    const bar = document.createElement('div');
    bar.className = 'stepper-auto-progress';
    okBtn.appendChild(bar);
  }

  _clearAutoTimer();
  _autoAddTimer = setTimeout(() => {
    if (accionEl.classList.contains('activo') && _getQty(accionEl) === 1) {
      _confirmarAgregar(accionEl);
    }
  }, 2500);
}

function _cerrarStepper(accionEl) {
  _clearAutoTimer();
  accionEl.querySelector('.stepper-auto-progress')?.remove();
  accionEl.classList.remove('activo');
}

function _getQty(accionEl) {
  return parseInt(accionEl.querySelector('.stepper-qty')?.textContent ?? '1', 10) || 1;
}

function _setQty(accionEl, delta) {
  _clearAutoTimer();
  accionEl.querySelector('.stepper-auto-progress')?.remove();
  const qtyEl = accionEl.querySelector('.stepper-qty');
  if (!qtyEl) return;
  qtyEl.textContent = String(
    Math.max(1, Math.min(99, (parseInt(qtyEl.textContent, 10) || 1) + delta))
  );
}

function _confirmarAgregar(accionEl) {
  _clearAutoTimer();
  const cantidad   = _getQty(accionEl);
  const productoId = accionEl?.dataset.productoId;
  const sucursalId = window.App?.sucursalActualId ?? 'arboledas';
  const todos      = MENUS_DATA[sucursalId] ?? [];
  const producto   = todos.find(p => p.id === productoId);

  if (!producto || typeof Carrito === 'undefined') return;

  Carrito.agregar(producto, cantidad);

  const btnOk = accionEl.querySelector('.stepper-ok');
  if (btnOk) {
    const originalHTML = btnOk.innerHTML;
    btnOk.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>';
    btnOk.classList.add('stepper-ok--done');
    btnOk.disabled = true;
    setTimeout(() => {
      _cerrarStepper(accionEl);
      btnOk.innerHTML = originalHTML;
      btnOk.classList.remove('stepper-ok--done');
      btnOk.disabled = false;
    }, 1100);
  } else {
    _cerrarStepper(accionEl);
  }
}

function _onMenuClick(e) {
  const btnAgregar = e.target.closest('.btn-card-agregar');
  if (btnAgregar) { e.stopPropagation(); const a = btnAgregar.closest('.card-accion'); if (a) _abrirStepper(a); return; }
  const btnMenos = e.target.closest('.stepper-menos');
  if (btnMenos) { e.stopPropagation(); _setQty(btnMenos.closest('.card-accion'), -1); return; }
  const btnMas = e.target.closest('.stepper-mas');
  if (btnMas) { e.stopPropagation(); _setQty(btnMas.closest('.card-accion'), +1); return; }
  const btnOk = e.target.closest('.stepper-ok');
  if (btnOk) { e.stopPropagation(); const a = btnOk.closest('.card-accion'); if (a) _confirmarAgregar(a); return; }
}

function _onDocClick(e) {
  if (!e.target.closest('.card-accion')) {
    document.querySelectorAll('.card-accion.activo').forEach(_cerrarStepper);
  }
}

function _renderPlatoSelector() {
  const platoActual = (typeof Carrito !== 'undefined') ? Carrito.platoActual : 1;
  const botones = Array.from({ length: 10 }, (_, i) => i + 1)
    .map(n => `<button class="plato-btn${n === platoActual ? ' activo' : ''}" data-plato="${n}" aria-label="Plato ${n}" aria-pressed="${n === platoActual}">${n}</button>`)
    .join('');

  return `
    <div class="plato-selector-wrap" id="plato-selector-wrap">
      <div class="menu-hint hint-oculto" id="menu-hint-platos" role="status" aria-live="polite">
        <span>
          <strong>¿Cómo funciona?</strong> Selecciona el número de plato antes de agregar.
          Cada plato agrupa tus productos por separado en el mensaje de WhatsApp,
          ideal para pedidos en grupo. Puedes cambiar de plato en cualquier momento.
        </span>
        <button class="menu-hint-close" aria-label="Cerrar sugerencia">×</button>
      </div>
      <div class="plato-selector" role="group" aria-label="Seleccionar plato activo">
        <span class="plato-selector-label">
          <i class="fa-solid fa-utensils" aria-hidden="true"></i>
          Plato:
        </span>
        <div class="plato-btns" id="plato-btns">${botones}</div>
        <button class="plato-hint-toggle" id="plato-hint-toggle"
                aria-label="Ayuda sobre los platos">?</button>
      </div>
    </div>`;
}

function _bindPlatoSelector(seccion) {
  seccion.querySelectorAll('.plato-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof Carrito !== 'undefined') {
        Carrito.platoActual = parseInt(btn.dataset.plato, 10);
        Carrito._actualizar();
      }
    });
  });
}

const HINT_KEY_PLATOS = 'tcy-hint-platos-ok';

function _iniciarHintPlatos(seccion) {
  const hint = seccion.querySelector('#menu-hint-platos');
  if (!hint || sessionStorage.getItem(HINT_KEY_PLATOS)) return;

  setTimeout(() => hint.classList.remove('hint-oculto'), 400);

  hint.querySelector('.menu-hint-close')?.addEventListener('click', () => {
    hint.classList.add('hint-ocultando');
    setTimeout(() => hint.classList.add('hint-oculto'), 300);
    sessionStorage.setItem(HINT_KEY_PLATOS, '1');
  });

  seccion.querySelector('#plato-hint-toggle')?.addEventListener('click', () => {
    if (hint.classList.contains('hint-oculto')) {
      hint.classList.remove('hint-oculto', 'hint-ocultando');
    } else {
      hint.classList.add('hint-ocultando');
      setTimeout(() => hint.classList.add('hint-oculto'), 300);
    }
  });
}

function renderMenu(sucursalId, mostrarCarrito) {
  const seccion = document.getElementById('seccion-menu');
  if (!seccion) return;

  const items = (MENUS_DATA[sucursalId] ?? []).filter(item => item.visible !== false);

  if (!items.length) {
    seccion.innerHTML = `<p style="text-align:center;padding:3rem;color:var(--muted)">Menú no disponible para esta sucursal.</p>`;
    return;
  }

  const tarjetas = items.map(item => {
    const accionHTML = (mostrarCarrito && item.enCarrito)
      ? `<div class="card-accion" data-producto-id="${_escM(item.id)}">
          <button class="btn-card-agregar" aria-label="Agregar ${_escM(item.nombre)} al pedido">
            <i class="fa-solid fa-plus" aria-hidden="true"></i>
            <span>Agregar</span>
          </button>
          <div class="card-stepper" role="group" aria-label="Seleccionar cantidad">
            <button class="stepper-btn stepper-menos" aria-label="Restar uno">−</button>
            <span class="stepper-qty" aria-live="polite">1</span>
            <button class="stepper-btn stepper-mas" aria-label="Sumar uno">+</button>
            <button class="stepper-btn stepper-ok" aria-label="Agregar al carrito">
              <i class="fa-solid fa-check" aria-hidden="true"></i>
            </button>
          </div>
        </div>` : '';

    return `
      <article class="menu-card reveal" role="listitem" data-id="${_escM(item.id)}">
        <div class="menu-img-wrap">
          <img src="${_escM(item.imagen)}" alt="${_escM(item.nombre)} — Los Tocayos"
               loading="lazy" width="600" height="375"
               onerror="this.src='img/menu/placeholder.jpg'" />
          ${item.badge ? `<span class="menu-badge-hot">${_escM(item.badge)}</span>` : ''}
          <span class="menu-price-float" aria-hidden="true">$${item.precio}</span>
        </div>
        <div class="menu-card-body">
          <h3>${_escM(item.nombre)}</h3>
          <p>${_escM(item.descripcion)}</p>
          <div class="menu-card-footer">
            <span class="menu-tag">${_escM(item.categoria)}</span>
            ${accionHTML}
          </div>
        </div>
      </article>`;
  }).join('');

  seccion.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">
          <i class="fa-solid fa-utensils" aria-hidden="true"></i>
          Lo más pedido
        </span>
        <h2 class="section-title">Nuestro Menú</h2>
        <p class="section-sub">Todo preparado fresh, cada mañana, sin excepción.</p>
      </div>
      ${mostrarCarrito ? _renderPlatoSelector() : ''}
      <div class="menu-grid" role="list">${tarjetas}</div>
    </div>`;

  seccion.removeEventListener('click', _onMenuClick);
  document.removeEventListener('click', _onDocClick);

  if (mostrarCarrito) {
    seccion.addEventListener('click', _onMenuClick);
    document.addEventListener('click', _onDocClick);
    _bindPlatoSelector(seccion);
    _iniciarHintPlatos(seccion);
  }

  if (window.App?.reObservar) window.App.reObservar(seccion);
}
