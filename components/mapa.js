/**
 * ================================================================
 * LOS TOCAYOS — components/mapa.js
 * Mapa Leaflet + OpenStreetMap con marcadores de todas las sucursales.
 * Sin API Key. Dark theme.
 * ================================================================
 */

'use strict';

let _mapaInstancia = null;

/**
 * Inicializa o actualiza el mapa.
 * Si ya existe una instancia, la destruye y crea una nueva.
 * @param {string} sucursalActivaId - resalta este marcador
 */
function renderMapa(sucursalActivaId) {
  const contenedor = document.getElementById('mapa-sucursales');
  if (!contenedor || typeof L === 'undefined') return;

  // Destruir mapa anterior si existe
  if (_mapaInstancia) {
    _mapaInstancia.remove();
    _mapaInstancia = null;
  }

  // Coordenadas promedio de todas las sucursales
  const lats = SUCURSALES_ORDEN.map(id => SUCURSALES_DATA[id].lat);
  const lngs = SUCURSALES_ORDEN.map(id => SUCURSALES_DATA[id].lng);
  const centroLat = lats.reduce((a,b)=>a+b,0) / lats.length;
  const centroLng = lngs.reduce((a,b)=>a+b,0) / lngs.length;

  _mapaInstancia = L.map('mapa-sucursales', {
    center: [centroLat, centroLng],
    zoom: 12,
    scrollWheelZoom: false,
  });

  // Tiles oscuros — CartoDB Dark Matter (gratis, sin API Key)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(_mapaInstancia);

  // Marcadores
  SUCURSALES_ORDEN.forEach(id => {
    const s      = SUCURSALES_DATA[id];
    const activa = id === sucursalActivaId;

    const icono = L.divIcon({
      className: '',
      html: `<div style="
        width:${activa?42:34}px;height:${activa?42:34}px;
        background:${activa?'#F7B731':'#D62828'};
        border:3px solid #fff;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 3px 14px rgba(0,0,0,.55);
        display:flex;align-items:center;justify-content:center;
        transition:all .2s;
      "><span style="transform:rotate(45deg);font-size:${activa?16:13}px;line-height:1;">🌮</span></div>`,
      iconSize: [activa?42:34, activa?42:34],
      iconAnchor: [activa?21:17, activa?42:34],
      popupAnchor: [0, -38],
    });

    const waUrl = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent('Hola, quisiera información sobre Los Tocayos ' + s.nombre)}`;

    const marcador = L.marker([s.lat, s.lng], { icon: icono })
      .addTo(_mapaInstancia)
      .bindPopup(`
        <b>${s.nombre}${activa ? ' ✦' : ''}</b>
        <small>${s.direccion}</small>
        <small><a href="tel:+52${s.telefono}" style="color:#F7B731;">${s.telefonoDisplay}</a></small>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="popup-wa">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp
        </a>`, { maxWidth: 220 });

    // Abrir el popup de la sucursal activa automáticamente
    if (activa) marcador.openPopup();
  });

  // Zoom para encuadrar todos los marcadores
  const bounds = L.latLngBounds(SUCURSALES_ORDEN.map(id => {
    const s = SUCURSALES_DATA[id];
    return [s.lat, s.lng];
  }));
  _mapaInstancia.fitBounds(bounds, { padding: [40, 40] });
}
