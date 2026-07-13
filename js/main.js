// 和の美 トップページ用スクリプト

document.addEventListener('DOMContentLoaded', function () {

  // ---------- スクロールで要素をフェードイン ----------
  var wowEls = document.querySelectorAll('.wow');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  wowEls.forEach(function (el) { observer.observe(el); });

  // ---------- ヘッダースライダー（クロスフェード） ----------
  var slides = document.querySelectorAll('.h_slider_1 .slide');
  var current = 0;
  if (slides.length > 1) {
    setInterval(function () {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 5000);
  }

  // ---------- ドロワーメニュー ----------
  var drawer = document.getElementById('drawer_menu');
  var overlay = document.getElementById('drawer_overlay');
  var hamburger = document.getElementById('icon-animation');

  function openDrawer() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    hamburger.classList.add('is-active');
    drawer.setAttribute('aria-hidden', 'false');
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    drawer.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', function () {
    if (drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('.drawer_close, a').forEach(function (el) {
    el.addEventListener('click', closeDrawer);
  });

  // ---------- Access地図（Leaflet + OpenStreetMap、赤ピン） ----------
  // Leaflet本体の読み込みが遅延する場合に備えて、読み込み完了を待ってから初期化する
  (function initAccessMap() {
    var mapEl = document.getElementById('map');
    if (!mapEl) return;
    if (!window.L) {
      setTimeout(initAccessMap, 50);
      return;
    }
    if (mapEl._leaflet_id) return; // 二重初期化防止

    var lat = 34.8944296, lng = 135.8086145;
    var map = L.map('map', { scrollWheelZoom: false }).setView([lat, lng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var redPin = L.divIcon({
      className: 'red_pin',
      html: '<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M15 0C6.7 0 0 6.7 0 15c0 11.3 15 27 15 27s15-15.7 15-27C30 6.7 23.3 0 15 0z" fill="#d92626"/>' +
            '<circle cx="15" cy="15" r="6" fill="#fff"/></svg>',
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -38]
    });

    L.marker([lat, lng], { icon: redPin }).addTo(map)
      .bindPopup('和の美 cafe &amp; art');
  })();

  // ---------- スクロールでヘッダーメニューを固定 ----------
  var headerMenu = document.getElementById('header_menu');
  var topNavi = document.getElementById('top_navi');

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y > 300) {
      headerMenu.classList.add('fixed');
    } else {
      headerMenu.classList.remove('fixed');
    }
    if (y > 600) {
      topNavi.classList.add('is-show');
    } else {
      topNavi.classList.remove('is-show');
    }
  });
});
