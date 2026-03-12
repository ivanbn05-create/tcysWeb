/**
 * ================================================================
 * LOS TOCAYOS — components/mapa.js
 * Mapa Leaflet + OpenStreetMap.
 * Popup con botones WhatsApp y Cómo llegar.
 * ================================================================
 */

'use strict';

let _mapaInstancia = null;

function renderMapa(sucursalActivaId) {
  const contenedor = document.getElementById('mapa-sucursales');
  if (!contenedor || typeof L === 'undefined') return;

  if (_mapaInstancia) {
    _mapaInstancia.remove();
    _mapaInstancia = null;
  }

  const lats = SUCURSALES_ORDEN.map(id => SUCURSALES_DATA[id].lat);
  const lngs = SUCURSALES_ORDEN.map(id => SUCURSALES_DATA[id].lng);
  const centroLat = lats.reduce((a,b)=>a+b,0) / lats.length;
  const centroLng = lngs.reduce((a,b)=>a+b,0) / lngs.length;

  _mapaInstancia = L.map('mapa-sucursales', {
    center: [centroLat, centroLng],
    zoom: 12,
    scrollWheelZoom: false,
    zoomControl: false,
  });

  /* Control de zoom reposicionado */
  L.control.zoom({ position: 'bottomright' }).addTo(_mapaInstancia);

  /* Tiles oscuros — CartoDB Dark Matter */
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(_mapaInstancia);

  /* Marcadores */
  SUCURSALES_ORDEN.forEach(id => {
    const s      = SUCURSALES_DATA[id];
    const activa = id === sucursalActivaId;

    const icono = L.divIcon({
      className: '',
      html: `<div style="
        width:${activa?44:34}px; height:${activa?44:34}px;
        background:${activa?'#E8A016':'#CC1F1F'};
        border:3px solid rgba(255,255,255,.85);
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 4px 16px rgba(0,0,0,.6);
        display:flex; align-items:center; justify-content:center;
      "><span style="transform:rotate(45deg); font-size:${activa?17:13}px; line-height:1;">🌮</span></div>`,
      iconSize:    [activa?44:34, activa?44:34],
      iconAnchor:  [activa?22:17, activa?44:34],
      popupAnchor: [0, -42],
    });

    /* URLs para popup */
    const waUrl   = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent('Hola, quisiera información sobre Los Tocayos ' + s.nombre)}`;
    const mapsUrl = s.mapsUrl;

    const marcador = L.marker([s.lat, s.lng], { icon: icono })
      .addTo(_mapaInstancia)
      .bindPopup(`
        <b>${s.nombre}${activa ? ' ✦' : ''}</b>
        <small>${s.direccion}</small>
        <small><a href="tel:+52${s.telefono}" style="color:#E8A016;">${s.telefonoDisplay}</a></small>
        <small>${s.horario}</small>
        <div class="popup-actions">
          <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="popup-maps">
            <i class="fa-solid fa-map"></i> Cómo llegar
          </a>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="popup-wa">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      `, { maxWidth: 240, className: 'tocayos-popup' });

    if (activa) marcador.openPopup();
  });

  const bounds = L.latLngBounds(SUCURSALES_ORDEN.map(id => {
    const s = SUCURSALES_DATA[id];
    return [s.lat, s.lng];
  }));
  _mapaInstancia.fitBounds(bounds, { padding: [48, 48] });
}
