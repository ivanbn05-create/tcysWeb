/**
 * ================================================================
 * LOS TOCAYOS — app.js
 * Router SPA, gestor de SEO y orquestador de componentes.
 * ================================================================
 *
 * RUTAS:
 *   /            → Arboledas (default)
 *   /arboledas   → Sucursal Arboledas
 *   /aguilas     → Sucursal Las Águilas
 *   /estancia    → Sucursal La Estancia
 *   /centromedico→ Zona Centro Médico
 *
 * REQUIERE .htaccess en la raíz para reescritura de URLs:
 *   RewriteEngine On
 *   RewriteCond %{REQUEST_FILENAME} !-f
 *   RewriteRule ^(.*)$ index.html [L,QSA]
 * ================================================================
 */

'use strict';

/* ── Estado global de la aplicación ────────────────────────────── */
window.App = {
  sucursalActualId: null,
  sucursalActual:   null,

  /** Navegar a una sucursal por ID */
  navegarA(sucursalId) {
    const slug = sucursalId === SUCURSAL_DEFAULT ? '' : sucursalId;
    history.pushState({ sucursalId }, '', '/' + slug);
    _cargarSucursal(sucursalId);
  },

  /** Exponer para que los componentes llamen a reObservar */
  reObservar(contenedor) {
    _observarElementos(contenedor);
  },
};

/* ── Mapa de rutas URL → ID de sucursal ────────────────────────── */
const RUTAS = {
  '':              'arboledas',
  'arboledas':     'arboledas',
  'aguilas':       'aguilas',
  'estancia':      'estancia',
  'centromedico':  'centromedico',
};

/* ── Resolver ruta actual a ID de sucursal ─────────────────────── */
function _resolverRuta() {
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  return RUTAS[path] ?? SUCURSAL_DEFAULT;
}

/* ── Cargar sucursal: actualizar todos los componentes ─────────── */
function _cargarSucursal(sucursalId) {
  const sucursal = SUCURSALES_DATA[sucursalId];
  if (!sucursal) {
    console.warn('[App] Sucursal no encontrada:', sucursalId, '→ redirigiendo a default');
    return _cargarSucursal(SUCURSAL_DEFAULT);
  }

   App.sucursalActualId = sucursalId;
  App.sucursalActual   = sucursal;

  // 1. SEO
  _actualizarSEO(sucursal);

  // 2. Hero
  _renderHero(sucursal);

  // 3. Navbar — WhatsApp dinámico  ← NUEVO
  _actualizarNavWA(sucursal);

  // 4. Branch switcher
  _actualizarSwitcher(sucursalId);

  // 5. Promociones
  renderPromos(sucursalId);

  // 6. Menú
  renderMenu(sucursalId, sucursal.tieneCarrito);

  // 7. Sucursales
  renderSucursales(sucursalId);

  // 8. Mapa
  renderMapa(sucursalId);

  // 9. Carrito — mostrar/ocultar
  _toggleCarritoUI(sucursal.tieneCarrito);

  // 10. Scroll top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 11. Scroll reveal
  setTimeout(() => _observarElementos(document.body), 100);
}

/* ── SEO: actualizar meta tags y Schema.org dinámicamente ───────── */
function _actualizarSEO(sucursal) {
  const { seo } = sucursal;
  const base = 'https://www.lostocayos.mx';

  // Título y metas básicas
  document.title = seo.title;
  _setMeta('name', 'description',    seo.description);
  _setMeta('name', 'keywords',       seo.keywords);
  _setMeta('property', 'og:title',   seo.title);
  _setMeta('property', 'og:description', seo.description);
  _setMeta('property', 'og:url',     seo.og.url);
  _setMeta('property', 'og:image',   seo.og.image);
  _setMeta('name', 'twitter:title',  seo.title);
  _setMeta('name', 'twitter:description', seo.description);
  _setMeta('name', 'twitter:image',  seo.og.image);

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = seo.og.url;

  // Schema.org — Restaurant por sucursal
  const schemaId = 'schema-sucursal';
  let schemaEl = document.getElementById(schemaId);
  if (!schemaEl) {
    schemaEl = document.createElement('script');
    schemaEl.type = 'application/ld+json';
    schemaEl.id = schemaId;
    document.head.appendChild(schemaEl);
  }

  schemaEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: seo.schema.name,
    alternateName: 'Los Tcys',
    description: seo.schema.description,
    url: seo.og.url,
    image: seo.og.image,
    servesCuisine: 'Mexicana',
    priceRange: '$',
    telephone: `+52${sucursal.telefono}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: sucursal.direccion,
      addressLocality: sucursal.ciudad,
      addressRegion: sucursal.estado,
      postalCode: sucursal.cp,
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude:  sucursal.lat,
      longitude: sucursal.lng,
    },
    hasMap: sucursal.mapsUrl,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
        opens: '07:00', closes: '15:00' },
      { '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday','Sunday'],
        opens: '07:00', closes: '14:00' },
    ],
    sameAs: [
      'https://www.facebook.com/lostocayos',
      'https://www.instagram.com/lostocayos',
    ],
  });
}

function _setMeta(attrName, attrValue, content) {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
}

/* ── Hero section ───────────────────────────────────────────────── */
function _renderHero(sucursal) {
  const hero = document.getElementById('seccion-hero');
  if (!hero) return;

  // Cambiar imagen de fondo con transición
  hero.style.transition = 'opacity .3s ease';
  hero.style.opacity = '0';

  setTimeout(() => {
    hero.style.backgroundImage = `url('${sucursal.heroImg}')`;
    hero.style.opacity = '1';
  }, 300);

  // Actualizar texto dinámico del hero
  const elNombre   = document.getElementById('hero-sucursal-nombre');
  const elSubtitle = document.getElementById('hero-sucursal-subtitulo');
  if (elNombre)   elNombre.textContent   = sucursal.nombre;
  if (elSubtitle) elSubtitle.textContent = sucursal.subtitulo;
}

/* ── Branch Switcher (pestañas de sucursal) ────────────────────── */
function _actualizarSwitcher(sucursalActiva) {
  document.querySelectorAll('.switcher-tab').forEach(tab => {
    const activa = tab.dataset.sucursal === sucursalActiva;
    tab.classList.toggle('activa', activa);
    tab.setAttribute('aria-selected', String(activa));
  });
}

/* ── Carrito: mostrar/ocultar el botón flotante ─────────────────── */
function _toggleCarritoUI(mostrar) {
  const boton = document.getElementById('btn-carrito-flotante');
  if (!boton) return;
  boton.style.display = mostrar ? 'flex' : 'none';
  if (!mostrar && Carrito.abierto) {
    // Cerrar el drawer si estaba abierto y cambiamos de sucursal
    document.getElementById('carrito-drawer')?.classList.remove('open');
    document.getElementById('carrito-overlay')?.classList.remove('open');
    Carrito.abierto = false;
    document.body.style.overflow = '';
  }
}

/* ── Scroll Reveal con IntersectionObserver ─────────────────────── */
let _observer = null;

function _observarElementos(contenedor) {
  if (!_observer) {
    _observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          _observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  }

  contenedor.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    _observer.observe(el);
  });
}

/* ── Footer: año dinámico ───────────────────────────────────────── */
function _initFooter() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Navbar: scroll shrink + hamburguesa ───────────────────────── */
function _initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');

  const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu?.classList.contains('open')) {
      menu.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle?.focus();
    }
  });
}

/* ── Branch Switcher: bind clicks en las pestañas ──────────────── */
function _initSwitcher() {
  document.getElementById('branch-switcher')
    ?.addEventListener('click', e => {
      const tab = e.target.closest('.switcher-tab');
      if (!tab) return;
      App.navegarA(tab.dataset.sucursal);
    });
}

/* ── Smooth scroll para anclas internas ────────────────────────── */
function _initSmoothScroll() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('.navbar')?.offsetHeight ?? 72;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navH - 16,
      behavior: 'smooth',
    });
  });
}

/* ── Popstate: botón atrás/adelante del navegador ──────────────── */
window.addEventListener('popstate', e => {
  const id = e.state?.sucursalId ?? _resolverRuta();
  _cargarSucursal(id);
});

/* ── INIT ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  _initFooter();
  _initNavbar();
  _initSwitcher();
  _initSmoothScroll();
  initCarrito();

  // Cargar la sucursal según la ruta actual
  const sucursalInicial = _resolverRuta();
  history.replaceState({ sucursalId: sucursalInicial }, '', window.location.href);
  _cargarSucursal(sucursalInicial);
});

/* ── NUEVA FUNCIÓN — pegar en app.js ────────────────────────────── */

/** Actualiza el enlace WhatsApp del navbar con la sucursal activa. */
function _actualizarNavWA(sucursal) {
  const link = document.getElementById('nav-wa-link');
  if (!link) return;
  const msg = encodeURIComponent(
    `Hola, quisiera información sobre Los Tocayos ${sucursal.nombre}`
  );
  link.href = `https://wa.me/${sucursal.whatsapp}?text=${msg}`;
  link.setAttribute('aria-label', `Contactar ${sucursal.nombre} por WhatsApp`);
}
