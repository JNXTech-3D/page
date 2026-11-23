/*
  JNX Tech - extras para la página
  1) Arregla los botones "Pedir presupuesto" / "Escribir por WhatsApp" (los que apuntan a "#")
  2) Agrega un botón flotante de WhatsApp en todas las páginas
  3) Dibuja el catálogo donde haya <div id="catalogo" data-categoria="...">
  Requiere cargar antes productos.js
*/
(function () {
  "use strict";

  var cfg = window.JNX;
  if (!cfg) {
    console.error("JNX: falta cargar productos.js antes de jnx-extras.js");
    return;
  }

  function waLink(mensaje) {
    return "https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(mensaje);
  }

  /* ---------- Estilos (se inyectan solos, no hace falta tocar tu CSS) ---------- */
  var css = [
    ".jnx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.25rem;margin:1.5rem 0}",
    ".jnx-card{display:flex;flex-direction:column;border:1px solid rgba(128,128,128,.3);border-radius:12px;overflow:hidden;background:transparent}",
    ".jnx-card__img{width:100%;aspect-ratio:4/3;object-fit:cover;background:rgba(128,128,128,.15);display:block}",
    ".jnx-card__body{display:flex;flex-direction:column;gap:.4rem;padding:1rem;flex:1}",
    ".jnx-card__title{margin:0;font-size:1.05rem;line-height:1.3}",
    ".jnx-card__text{margin:0;font-size:.95rem;opacity:.85}",
    ".jnx-card__detail{margin:0;font-size:.85rem;opacity:.7}",
    ".jnx-card__price{margin:.4rem 0 0;font-size:1.15rem;font-weight:700}",
    ".jnx-btn{display:inline-block;margin-top:auto;padding:.65rem 1rem;border-radius:8px;background:#128c4a;color:#fff;text-decoration:none;font-weight:600;text-align:center}",
    ".jnx-btn:hover{background:#0e7a40}",
    ".jnx-btn:focus-visible,.jnx-fab:focus-visible{outline:3px solid #fff;outline-offset:2px;box-shadow:0 0 0 5px #128c4a}",
    ".jnx-fab{position:fixed;right:max(1rem,env(safe-area-inset-right));bottom:max(1rem,env(safe-area-inset-bottom));z-index:1000;display:flex;align-items:center;gap:.5rem;padding:.8rem 1rem;border-radius:999px;background:#128c4a;color:#fff;text-decoration:none;font-weight:600;box-shadow:0 4px 14px rgba(0,0,0,.3)}",
    ".jnx-fab:hover{background:#0e7a40}",
    ".jnx-fab svg{width:24px;height:24px;fill:currentColor;flex:none}",
    "@media (max-width:480px){.jnx-fab span{display:none}.jnx-fab{padding:.9rem}}",
    ".jnx-vacio{opacity:.7}"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- 1) Arreglar botones que apuntan a "#" ---------- */
  var links = document.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    var texto = (a.textContent || "").toLowerCase();
    var vacio = a.getAttribute("href") === "#";
    var pideContacto = texto.indexOf("whatsapp") !== -1 || texto.indexOf("presupuesto") !== -1;
    if (vacio && pideContacto && !a.hasAttribute("data-t")) {
      a.href = waLink(cfg.mensajeGeneral);
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
  }

  /* ---------- 2) Botón flotante de WhatsApp ---------- */
  var fab = document.createElement("a");
  fab.className = "jnx-fab";
  fab.href = waLink(cfg.mensajeGeneral);
  fab.target = "_blank";
  fab.rel = "noopener noreferrer";
  fab.setAttribute("aria-label", "Escribir a " + cfg.negocio + " por WhatsApp");
  fab.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z"/></svg>' +
    "<span>Escribinos</span>";
  document.body.appendChild(fab);

  /* ---------- 3) Catálogo ---------- */
  function crearTarjeta(p) {
    var card = document.createElement("article");
    card.className = "jnx-card";

    var img = document.createElement("img");
    img.className = "jnx-card__img";
    img.alt = p.nombre || "";
    img.loading = "lazy";
    if (p.imagen) {
      img.src = p.imagen;
      img.onerror = function () { img.removeAttribute("src"); };
    }
    card.appendChild(img);

    var body = document.createElement("div");
    body.className = "jnx-card__body";

    var h3 = document.createElement("h3");
    h3.className = "jnx-card__title";
    h3.textContent = p.nombre || "";
    body.appendChild(h3);

    if (p.descripcion) {
      var d = document.createElement("p");
      d.className = "jnx-card__text";
      d.textContent = p.descripcion;
      body.appendChild(d);
    }
    if (p.detalle) {
      var det = document.createElement("p");
      det.className = "jnx-card__detail";
      det.textContent = p.detalle;
      body.appendChild(det);
    }
    if (p.precio) {
      var pr = document.createElement("p");
      pr.className = "jnx-card__price";
      pr.textContent = p.precio;
      body.appendChild(pr);
    }

    var btn = document.createElement("a");
    btn.className = "jnx-btn";
    btn.href = waLink("Hola " + cfg.negocio + ", me interesa: " + p.nombre);
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.textContent = "Consultar por WhatsApp";
    body.appendChild(btn);

    card.appendChild(body);
    return card;
  }

  var contenedores = document.querySelectorAll("[data-categoria]");
  for (var c = 0; c < contenedores.length; c++) {
    var cont = contenedores[c];
    var lista = (cfg.catalogo || {})[cont.getAttribute("data-categoria")] || [];
    var grid = document.createElement("div");
    grid.className = "jnx-grid";
    if (!lista.length) {
      var vacioMsg = document.createElement("p");
      vacioMsg.className = "jnx-vacio";
      vacioMsg.textContent = "Pronto vamos a sumar productos. Escribinos y te contamos qué tenemos.";
      cont.appendChild(vacioMsg);
      continue;
    }
    for (var k = 0; k < lista.length; k++) {
      grid.appendChild(crearTarjeta(lista[k]));
    }
    cont.appendChild(grid);
  }
})();