/*!
 * Joomax Welcome Screen (portable)
 * Taruh di <head> website mana pun (paling atas supaya tidak ada kedipan):
 *   <script src="https://designjoomax.github.io/welcomescreen/welcome.js"></script>
 * Opsi (atribut di tag script):
 *   data-title="Welcome to Joomax!"   data-credit="create : fixs.arts studio"
 *   data-always                       tampil setiap kali dibuka (default: sekali per sesi browser)
 * Tampilkan ulang: tambahkan ?welcome di URL. Lewati: tambahkan #home.
 */
(() => {
  "use strict";
  if (window.JoomaxWelcome) return;
  const S = document.currentScript, BASE = S && S.src ? new URL(".", S.src).href : "";
  const title = (S && S.dataset.title) || "Welcome to Joomax!";
  const credit = (S && S.dataset.credit) || "create : fixs.arts studio";
  const always = !!(S && S.hasAttribute("data-always"));
  const KEY = "jx_welcome_seen", root = document.documentElement;
  const store = { get: () => { try { return sessionStorage.getItem(KEY); } catch (e) { return null; } },
                  set: () => { try { sessionStorage.setItem(KEY, "1"); } catch (e) {} },
                  del: () => { try { sessionStorage.removeItem(KEY); } catch (e) {} } };
  if (/[?&]welcome\b/.test(location.search)) store.del();
  window.JoomaxWelcome = true;
  if (location.hash === "#home" || (!always && store.get())) return;

  if (!document.querySelector('link[href*="family=Poppins"]') && !document.getElementById("jx-font")) {
    const l = document.createElement("link"); l.id = "jx-font"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,400&display=swap";
    document.head.append(l);
  }
  const css = document.createElement("style");
  css.textContent = `
    html.jxw-lock,html.jxw-lock body{overflow:hidden !important}
    #jx-welcome{--ease:cubic-bezier(.76,0,.24,1);--out:cubic-bezier(.22,.8,.24,1);position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;background:#f80023;color:#fff;cursor:pointer;touch-action:none;
      font:16px/1.5 var(--jx-font,"Poppins",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif);transition:transform 1.05s var(--ease),border-radius 1.05s var(--ease);will-change:transform}
    #jx-welcome.leaving{transform:translateY(-101%);border-radius:0 0 50% 50% / 0 0 14vh 14vh}
    #jx-welcome .c{display:flex;flex-direction:column;align-items:center;gap:26px;padding:0 24px;text-align:center;transition:transform 1s var(--ease),opacity .6s ease}
    #jx-welcome.leaving .c{transform:translateY(-8vh);opacity:0}
    #jx-welcome img{width:clamp(130px,17vw,200px);height:auto;animation:jxpop 1.1s var(--out) both}
    #jx-welcome h1{margin:0;font-size:clamp(1.4rem,2.6vw,2rem);font-weight:600;letter-spacing:-.01em;animation:jxrise .9s var(--out) .35s both}
    #jx-welcome .h,#jx-welcome .k{position:absolute;left:0;right:0;margin:0;text-align:center;animation:jxrise .9s var(--out) .9s both}
    #jx-welcome .h{bottom:calc(76px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;gap:6px;font-size:.82rem;opacity:.85}
    #jx-welcome .h svg{animation:jxbob 1.8s ease-in-out infinite}
    #jx-welcome .k{bottom:calc(34px + env(safe-area-inset-bottom,0px));font-size:.8rem;font-style:italic}
    @keyframes jxpop{from{opacity:0;transform:scale(.7) rotate(-12deg)}to{opacity:1;transform:none}}
    @keyframes jxrise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
    @keyframes jxbob{50%{transform:translateY(-5px)}}
    @media (prefers-reduced-motion:reduce){#jx-welcome{transition:opacity .4s ease}#jx-welcome.leaving{transform:none;opacity:0;border-radius:0}#jx-welcome *{animation:none !important}}`;
  const w = document.createElement("div");
  w.id = "jx-welcome"; w.setAttribute("role", "button"); w.tabIndex = 0; w.setAttribute("aria-label", title + " Klik untuk masuk");
  const el = (t, c, txt) => { const e = document.createElement(t); if (c) e.className = c; if (txt) e.textContent = txt; return e; };
  const c = el("div", "c"), img = el("img"); img.src = BASE + "assets/icon-white.png"; img.alt = "";
  c.append(img, el("h1", "", title));
  const hint = el("p", "h"); hint.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 12.5 10 6.5l6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  hint.append("Klik atau geser ke atas");
  w.append(c, hint, el("p", "k", credit));
  document.head.append(css);
  root.classList.add("jxw-lock"); root.append(w);

  let done = false;
  const enter = () => {
    if (done) return; done = true; store.set();
    w.classList.add("leaving");
    const fin = () => { if (!w.isConnected) return; w.remove(); css.remove(); root.classList.remove("jxw-lock"); };
    w.addEventListener("transitionend", (e) => { if (e.target === w && e.propertyName === "transform") fin(); });
    setTimeout(fin, 1500);
  };
  w.addEventListener("click", enter);
  w.addEventListener("keydown", (e) => { if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) { e.preventDefault(); enter(); } });
  w.addEventListener("wheel", (e) => { if (e.deltaY > 8) enter(); }, { passive: true });
  let y0 = null;
  w.addEventListener("touchstart", (e) => { y0 = e.touches[0].clientY; }, { passive: true });
  w.addEventListener("touchmove", (e) => { if (y0 !== null && y0 - e.touches[0].clientY > 36) enter(); }, { passive: true });
  addEventListener("DOMContentLoaded", () => w.focus({ preventScroll: true }));
})();
