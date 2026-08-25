/** Vanilla lightbox для портфолио */
const Lightbox = (() => {
  let items = [];
  let index = 0;
  let lastFocus = null;
  let touchStartX = 0;

  const el = {
    root: null,
    img: null,
    backdrop: null,
    close: null,
    prev: null,
    next: null,
    counter: null,
  };

  function ensureDom() {
    if (el.root) return;
    const root = document.createElement("div");
    root.className = "lightbox";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "Просмотр фотографии");
    root.innerHTML = `
      <div class="lightbox__backdrop" data-lightbox-close></div>
      <div class="lightbox__inner">
        <button type="button" class="lightbox__btn lightbox__btn--close" aria-label="Закрыть">×</button>
        <button type="button" class="lightbox__btn lightbox__btn--prev" aria-label="Предыдущая фотография">←</button>
        <button type="button" class="lightbox__btn lightbox__btn--next" aria-label="Следующая фотография">→</button>
        <figure class="lightbox__figure">
          <img class="lightbox__img" alt="" decoding="async">
        </figure>
        <p class="lightbox__counter" aria-live="polite"></p>
      </div>
    `;
    document.body.appendChild(root);
    el.root = root;
    el.img = root.querySelector(".lightbox__img");
    el.backdrop = root.querySelector(".lightbox__backdrop");
    el.close = root.querySelector(".lightbox__btn--close");
    el.prev = root.querySelector(".lightbox__btn--prev");
    el.next = root.querySelector(".lightbox__btn--next");
    el.counter = root.querySelector(".lightbox__counter");

    el.close.addEventListener("click", close);
    el.backdrop.addEventListener("click", close);
    el.prev.addEventListener("click", () => step(-1));
    el.next.addEventListener("click", () => step(1));
    root.addEventListener("click", e => {
      if (e.target === root.querySelector(".lightbox__inner")) close();
    });
    root.addEventListener("keydown", onKeydown);
    root.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 48) step(dx > 0 ? -1 : 1);
    }, { passive: true });
  }

  function fullSrc(item) {
    const path = item.imageFull || item.image;
    return typeof imgSrc === "function" ? imgSrc(path) : path;
  }

  function renderSlide() {
    const item = items[index];
    if (!item) return;
    const collage = item.isCollage;
    el.img.src = fullSrc(item);
    el.img.alt = item.title || "Фотография";
    el.img.classList.toggle("lightbox__img--collage", collage);
    el.counter.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : "";
    el.prev.hidden = items.length <= 1;
    el.next.hidden = items.length <= 1;
  }

  function step(delta) {
    index = (index + delta + items.length) % items.length;
    renderSlide();
  }

  function onKeydown(e) {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "Tab") {
      const focusable = [el.close, el.prev, el.next].filter(b => !b.hidden);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }

  function open(list, startIndex, triggerEl) {
    if (!list?.length) return;
    ensureDom();
    items = list;
    index = startIndex;
    lastFocus = triggerEl || document.activeElement;
    renderSlide();
    el.root.hidden = false;
    document.body.classList.add("lightbox-open");
    el.close.focus();
  }

  function close() {
    if (!el.root || el.root.hidden) return;
    el.root.hidden = true;
    el.img.src = "";
    document.body.classList.remove("lightbox-open");
    if (lastFocus?.focus) lastFocus.focus();
  }

  return { open, close };
})();
