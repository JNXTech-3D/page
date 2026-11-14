// Cambiá solo este número: código de país + número, sin + ni espacios (Argentina: 549 + código de área + número)
const NUMERO = "549XXXXXXXXXX";
document.querySelectorAll("a.wa").forEach(a => {
  const t = a.dataset.t || "Hola JNX Tech, quiero hacer una consulta";
  a.href = "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(t);
});
// Si una foto todavía no existe, muestra un aviso en su lugar
document.querySelectorAll(".foto img").forEach(i => {
  const f = () => { i.parentNode.classList.add("sin-foto"); i.remove(); };
  i.addEventListener("error", f);
  if (i.complete && !i.naturalWidth) f();
});
