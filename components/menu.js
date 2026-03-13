/**
 * ================================================================
 * LOS TOCAYOS — components/menu.js
 * Renderiza la sección de menú de forma dinámica.
 *
 * · Filtra items con visible === false (promo-exclusivos).
 * · Botón "Agregar" → stepper inline de cantidad antes de
 *   añadir al carrito. El usuario elige cuántos quiere
 *   directamente en la tarjeta, sin abrir el drawer.
 * ================================================================
 */

'use strict';

function _escM(s) {
  if (typeof s !== 'string') return String(s);
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

/* ─── Helpers de stepper ────────────────────────────────────────── */

/** Abre el stepper de una tarjeta, cerrando cualquier otro abierto. */
function _abrirStepper(accionEl) {
  document.querySelectorAll('.card-accion.activo').forEach(el => {
    if (el !== accionEl) _cerrarStepper(el);
  });
  accionEl.classList.add('activo');
  const qtyEl = accionEl.querySelector('.stepper-qty');
  if (qtyEl) qtyEl.textContent = '1';
}

/** Cierra el stepper y restaura el botón "Agregar". */
function _cerrarStepper(accionEl) {
  accionEl.classList.remove('activo');
}

/** Lee la cantidad actual del stepper (mínimo 1). */
function _getQty(accionEl) {
  return parseInt(accionEl.querySelector('.stepper-qty')?.textContent ?? '1', 10) || 1;
}

/** Incrementa o decrementa la cantidad (rango 1–99). */
function _setQty(accionEl, delta) {
  const qtyEl = accionEl.querySelector('.stepper-qty');
  if (!qtyEl) return;
  qtyEl.textContent = String(
    Math.max(1, Math.min(99, (parseInt(qtyEl.textContent, 10) || 1) + delta))
  );
}

/* ─── Manejadores de evento (declarados fuera para poder removerlos) */

function _onMenuClick(e) {
  /* Botón "Agregar" → abre stepper */
  const btnAgregar = e.target.closest('.btn-card-agregar');
  if (btnAgregar) {
    e.stopPropagation();
    const accion = btnAgregar.closest('.card-accion');
    if (accion) _abrirStepper(accion);
    return;
  }

  /* Botón "−" */
  const btnMenos = e.target.closest('.stepper-menos');
  if (btnMenos) {
    e.stopPropagation();
    _setQty(btnMenos.closest('.card-accion'), -1);
    return;
  }

  /* Botón "+" */
  const btnMas = e.target.closest('.stepper-mas');
  if (btnMas) {
    e.stopPropagation();
    _setQty(btnMas.closest('.card-accion'), +1);
    return;
  }

  /* Botón "✓" → confirmar y agregar N ítems */
  const btnOk = e.target.closest('.stepper-ok');
  if (btnOk) {
    e.stopPropagation();
    const accion     = btnOk.closest('.card-accion');
    const cantidad   = _getQty(accion);
    const productoId = accion?.dataset.productoId;

    const sucursalId = window.App?.sucursalActualId ?? 'arboledas';
    const todos      = MENUS_DATA[sucursalId] ?? [];
    const producto   = todos.find(p => p.id === productoId);

    if (producto && typeof Carrito !== 'undefined') {
      Carrito.agregar(producto, cantidad);

      const originalHTML = btnOk.innerHTML;
      btnOk.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>';
      btnOk.classList.add('stepper-ok--done');
      btnOk.disabled = true;

      setTimeout(() => {
        _cerrarStepper(accion);
        btnOk.innerHTML = originalHTML;
        btnOk.classList.remove('stepper-ok--done');
        btnOk.disabled = false;
      }, 1100);
    }
  }
}

function _onDocClick(e) {
  if (!e.target.closest('.card-accion')) {
    document.querySelectorAll('.card-accion.activo').forEach(_cerrarStepper);
  }
}

/* ─── Render principal ──────────────────────────────────────────── */

/**
 * Renderiza la sección de menú para una sucursal.
 * @param {string}  sucursalId
 * @param {boolean} mostrarCarrito  - true si la sucursal tiene carrito activo
 */
function renderMenu(sucursalId, mostrarCarrito) {
  const seccion = document.getElementById('seccion-menu');
  if (!seccion) return;

  /* Filtrar: solo productos con visible !== false */
  const items = (MENUS_DATA[sucursalId] ?? []).filter(item => item.visible !== false);

  if (!items.length) {
    seccion.innerHTML = '<p style="text-align:center;padding:3rem;color:var(--crema-soft)">Menú no disponible para esta sucursal.</p>';
    return;
  }

  const tarjetas = items.map(item => {
    const accionHTML = (mostrarCarrito && item.enCarrito)
      ? `<div class="card-accion" data-producto-id="${_escM(item.id)}">
          <button class="btn-card-agregar"
                  aria-label="Agregar ${_escM(item.nombre)} al pedido">
            <i class="fa-solid fa-plus" aria-hidden="true"></i>
            <span>Agregar</span>
          </button>
          <div class="card-stepper" role="group" aria-label="Seleccionar cantidad">
            <button class="stepper-btn stepper-menos" aria-label="Restar uno">−</button>
            <span class="stepper-qty" aria-live="polite">1</span>
            <button class="stepper-btn stepper-mas"   aria-label="Sumar uno">+</button>
            <button class="stepper-btn stepper-ok"    aria-label="Agregar al carrito">
              <i class="fa-solid fa-check" aria-hidden="true"></i>
            </button>
          </div>
        </div>`
      : '';

    return `
      <article class="menu-card reveal" role="listitem" data-id="${_escM(item.id)}">
        <div class="menu-img-wrap">
          <img src="${_escM(item.imagen)}"
               alt="${_escM(item.nombre)} — Los Tocayos"
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
        <span class="section-badge">🥩 Lo más pedido</span>
        <h2 class="section-title">Nuestro Menú</h2>
        <p class="section-sub">Todo preparado fresh, cada mañana, sin excepción.</p>
      </div>
      <div class="menu-grid" role="list">
        ${tarjetas}
      </div>
    </div>`;

  /* Remover listeners anteriores antes de añadir nuevos
     (evita acumulación al cambiar de sucursal) */
  seccion.removeEventListener('click', _onMenuClick);
  document.removeEventListener('click', _onDocClick);

  if (mostrarCarrito) {
    seccion.addEventListener('click', _onMenuClick);
    document.addEventListener('click', _onDocClick);
  }

  if (window.App?.reObservar) window.App.reObservar(seccion);
}
