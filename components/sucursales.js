/**
 * ================================================================
 * LOS TOCAYOS — components/sucursales.js
 * Renderiza la sección de sucursales y el botón de geolocalización.
 * ================================================================
 */

'use strict';

function _e(s) {
  if (typeof s !== 'string') return String(s);
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

/**
 * Formatea el nombre de una sucursal con estilo de marca:
 * primera palabra en verde, segunda en rojo.
 * Ej: "Las Águilas" → <span class="suc-verde">Las</span> <span class="suc-rojo">Águilas</span>
 */
function _nombreMarca(nombre) {
  const partes = nombre.split(' ');
  const primera = _e(partes[0]);
  const resto   = _e(partes.slice(1).join(' '));
  return `<span class="suc-verde">${primera}</span> <span class="suc-rojo">${resto}</span>`;
}

function renderSucursales(sucursalActivaId) {
  const seccion = document.getElementById('seccion-sucursales');
  if (!seccion) return;

  const tarjetas = SUCURSALES_ORDEN.map(id => {
    const s = SUCURSALES_DATA[id];
    const esActiva = id === sucursalActivaId;

    return `
      <article class="sucursal-card reveal ${esActiva ? 'sucursal-activa' : ''}"
               role="listitem" data-sucursal-id="${_e(id)}">
        <div class="sucursal-header">
          <span class="sucursal-num" aria-hidden="true">0${SUCURSALES_ORDEN.indexOf(id) + 1}</span>
          <div class="sucursal-status" aria-label="Estado de la sucursal">
            <span class="status-dot" aria-hidden="true"></span>
            <span class="status-label">Verificando…</span>
          </div>
        </div>

        ${esActiva
          ? `<div class="sucursal-activa-tag">
               <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
               Viendo esta sucursal
             </div>`
          : ''}

        <h3 class="sucursal-name">${_nombreMarca(s.nombre)}</h3>
        <address class="sucursal-addr">
          <i class="fa-solid fa-map-pin" aria-hidden="true"></i>
          ${_e(s.direccion)}
        </address>
        <a class="sucursal-tel" href="tel:+52${_e(s.telefono)}"
           aria-label="Llamar a sucursal ${_e(s.nombre)}">
          <i class="fa-solid fa-phone" aria-hidden="true"></i>
          ${_e(s.telefonoDisplay)}
        </a>
        <p class="sucursal-hours">
          <i class="fa-regular fa-clock" aria-hidden="true"></i>
          ${_e(s.horario)}
        </p>

        <div class="sucursal-actions">
          <a class="btn btn-maps"
             href="${_e(s.mapsUrl)}"
             target="_blank" rel="noopener noreferrer"
             aria-label="Cómo llegar a ${_e(s.nombre)}">
            <i class="fa-solid fa-map" aria-hidden="true"></i> Cómo llegar
          </a>
          <a class="btn btn-whatsapp"
             href="https://wa.me/${_e(s.whatsapp)}?text=${encodeURIComponent('Hola, quisiera información sobre Los Tocayos ' + s.nombre)}"
             target="_blank" rel="noopener noreferrer"
             aria-label="WhatsApp ${_e(s.nombre)}">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp
          </a>
        </div>

        ${!esActiva ? `
        <button class="btn btn-ver-sucursal" data-goto="${_e(id)}"
                aria-label="Ver contenido de sucursal ${_e(s.nombre)}">
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          Ver esta sucursal
        </button>` : ''}
      </article>`;
  }).join('');

  seccion.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">
          <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
          Encuéntranos
        </span>
        <h2 class="section-title">Nuestras Sucursales</h2>
        <p class="section-sub">4 puntos en la Zona Metropolitana de Guadalajara</p>
      </div>

      <div class="nearest-wrapper reveal">
        <button id="btn-nearest" class="btn btn-fire"
                aria-label="Detectar mi sucursal más cercana">
          <i class="fa-solid fa-location-crosshairs" aria-hidden="true"></i>
          Encontrar mi sucursal más cercana
        </button>
        <div id="nearest-result" class="nearest-result"
             role="status" aria-live="polite"></div>
      </div>

      <div class="sucursales-grid" role="list">
        ${tarjetas}
      </div>
    </div>`;

  seccion.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => window.App?.navegarA(btn.dataset.goto));
  });

  document.getElementById('btn-nearest')
    ?.addEventListener('click', iniciarGeolocalizacion);

  _actualizarEstados();

  if (window.App?.reObservar) window.App.reObservar(seccion);
}

function _actualizarEstados() {
  const ahora   = new Date();
  const diaHoy  = ahora.getDay();
  const horaHoy = ahora.getHours() + ahora.getMinutes() / 60;

  document.querySelectorAll('.sucursal-card').forEach(card => {
    const sucursalId = card.dataset.sucursalId;
    const sucursal   = typeof SUCURSALES_DATA !== 'undefined' ? SUCURSALES_DATA[sucursalId] : null;
    const statusEl   = card.querySelector('.sucursal-status');
    const dotEl      = card.querySelector('.status-dot');
    const labelEl    = card.querySelector('.status-label');
    if (!statusEl || !dotEl || !labelEl) return;

    let estaAbierto = false;
    let labelTexto  = 'Cerrado';

    if (sucursal?.horarios) {
      const turno = sucursal.horarios[diaHoy];
      if (turno) {
        const [abreH, abreM]     = turno.abre.split(':').map(Number);
        const [cierraH, cierraM] = turno.cierra.split(':').map(Number);
        const abre   = abreH   + abreM   / 60;
        const cierra = cierraH + cierraM / 60;
        estaAbierto = horaHoy >= abre && horaHoy < cierra;
        if (!estaAbierto) {
          labelTexto = horaHoy < abre ? `Abre a las ${turno.abre}` : 'Cerrado por hoy';
        }
      }
    }

    if (estaAbierto) {
      statusEl.className = 'sucursal-status open';
      dotEl.style.background  = '';
      dotEl.style.animation   = '';
      labelEl.textContent     = 'Abierto ahora';
      labelEl.style.color     = '';
      statusEl.setAttribute('aria-label', 'Sucursal abierta');
    } else {
      statusEl.className = 'sucursal-status closed';
      dotEl.style.background  = '#f87171';
      dotEl.style.animation   = 'none';
      labelEl.textContent     = labelTexto;
      labelEl.style.color     = '#f87171';
      statusEl.setAttribute('aria-label', `Sucursal cerrada — ${labelTexto}`);
    }
  });
}

function gradosARadianes(d) { return d * Math.PI / 180; }

function haversine(la1, lo1, la2, lo2) {
  const R = 6371, dLat = gradosARadianes(la2-la1), dLng = gradosARadianes(lo2-lo1);
  const a = Math.sin(dLat/2)**2 + Math.cos(gradosARadianes(la1))*Math.cos(gradosARadianes(la2))*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function masСercana(lat, lng) {
  let mejor = null, menor = Infinity;
  SUCURSALES_ORDEN.forEach(id => {
    const s = SUCURSALES_DATA[id];
    const d = haversine(lat, lng, s.lat, s.lng);
    if (d < menor) { menor = d; mejor = s; }
  });
  return { sucursal: mejor, distancia: menor };
}

function iniciarGeolocalizacion() {
  const resultDiv = document.getElementById('nearest-result');
  const btn       = document.getElementById('btn-nearest');
  if (!resultDiv || !btn) return;

  if (!('geolocation' in navigator)) {
    resultDiv.innerHTML = '<p class="nearest-error">Tu navegador no soporta geolocalización.</p>';
    return;
  }

  resultDiv.innerHTML = '<p class="nearest-loading"><i class="fa-solid fa-circle-notch fa-spin"></i> Detectando ubicación…</p>';
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude: lat, longitude: lng } }) => {
      btn.disabled = false;
      const { sucursal, distancia } = masСercana(lat, lng);

      resultDiv.innerHTML = `
        <div class="nearest-card">
          <span class="nearest-icon" aria-hidden="true">
            <i class="fa-solid fa-location-dot"></i>
          </span>
          <div class="nearest-info">
            <h4>${sucursal.nombre}</h4>
            <p>${sucursal.direccion}</p>
            <p class="nearest-dist">A ${distancia.toFixed(1)} km de ti</p>
          </div>
        </div>`;

      document.querySelectorAll('.sucursal-card').forEach(c => c.classList.remove('nearest-highlight'));
      document.querySelector(`.sucursal-card[data-sucursal-id="${sucursal.id}"]`)
              ?.classList.add('nearest-highlight');

      if (sucursal.id !== window.App?.sucursalActualId) {
        const extra = document.createElement('div');
        extra.className = 'nearest-cambiar';
        extra.innerHTML = `
          <p>Esta sucursal es tu más cercana.</p>
          <button class="btn btn-primary btn-sm" id="btn-ir-cercana">
            <i class="fa-solid fa-arrow-right"></i>
            Ver ${sucursal.nombre}
          </button>`;
        resultDiv.appendChild(extra);
        document.getElementById('btn-ir-cercana')
          ?.addEventListener('click', () => window.App?.navegarA(sucursal.id));
      }
    },
    (err) => {
      btn.disabled = false;
      const msgs = { 1:'Permiso denegado.', 2:'No se pudo determinar ubicación.', 3:'Tiempo agotado.' };
      resultDiv.innerHTML = `<p class="nearest-error"><i class="fa-solid fa-circle-exclamation"></i> ${msgs[err.code] || 'Error al obtener ubicación.'}</p>`;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}
