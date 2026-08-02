document.addEventListener("DOMContentLoaded", () => {
  renderSite();
  initHeader();
  initPortfolio();
  initReviews();
  initFaq();
  initForm();
  initReveal();
  initParallax();
  initCustomCursor();
});

function renderSite() {
  const c = SITE_CONTENT;
  document.title = c.projectName + " — " + c.photographer;

  setText("header-logo", c.photographer + " · " + c.role);
  setText("hero-project", c.projectName);
  setText("hero-slogan", c.slogan);
  setHtml("hero-meta", `<span>${c.city}</span><span>Опыт ${c.experience}</span>`);
  document.getElementById("hero-portrait").src = c.heroPortrait;
  document.getElementById("hero-portrait").alt = c.photographer;

  setText("positioning-title", c.positioning.title);
  setText("positioning-text", c.positioning.text);

  renderDirections();
  renderAiBlock();
  renderAbout();
  renderPosing();
  renderBenefits();
  renderFaq();
  renderCta();
  renderFooter();
  renderFormOptions();
}

function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function setHtml(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }

function renderDirections() {
  const grid = document.getElementById("directions-grid");
  grid.innerHTML = SITE_CONTENT.directions.map((d, i) => `
    <article class="direction-card reveal">
      <div class="direction-card__num">0${i + 1}</div>
      <h3 class="direction-card__title">${d.title}</h3>
      <p class="direction-card__text">${d.description}</p>
    </article>
  `).join("");
}

function renderAiBlock() {
  const b = SITE_CONTENT.aiBlock;
  setText("ai-title", b.title);
  setText("ai-subtitle", b.subtitle);
  setText("ai-text", b.text);
  setText("ai-note", b.note);
  document.getElementById("ai-grid").innerHTML = b.images.map(img => `
    <div class="ai-block__item reveal">
      <img src="${img.src}" alt="${img.alt}" loading="lazy">
      <span class="mark-badge">AI-концепт</span>
    </div>
  `).join("");
}

function renderAbout() {
  const a = SITE_CONTENT.about;
  setText("about-title", a.title);
  setText("about-text", a.text);
  document.getElementById("about-photo").src = a.photo;
  document.getElementById("about-highlights").innerHTML = a.highlights.map(h => `<li>${h}</li>`).join("");
}

function renderPosing() {
  const p = SITE_CONTENT.posing;
  setText("posing-title", p.title);
  setText("posing-text", p.text);
  setText("posing-quote", p.quote);
}

function renderBenefits() {
  document.getElementById("benefits-grid").innerHTML = SITE_CONTENT.benefits.map(b => `
    <div class="benefit-item reveal">
      <h3 class="benefit-item__title">${b.title}</h3>
      <p class="benefit-item__text">${b.text}</p>
    </div>
  `).join("");
}

function renderFaq() {
  document.getElementById("faq-list").innerHTML = SITE_CONTENT.faq.map((f, i) => `
    <div class="faq-item" data-faq="${i}">
      <button class="faq-question" type="button">${f.question}</button>
      <div class="faq-answer">${f.answer}</div>
    </div>
  `).join("");
}

function renderCta() {
  setText("cta-title", SITE_CONTENT.cta.title);
  setText("cta-text", SITE_CONTENT.cta.text);
}

function renderFooter() {
  const ct = SITE_CONTENT.contacts;
  setText("footer-brand", SITE_CONTENT.photographer);
  setText("footer-telegram", ct.telegram);
  setText("footer-phone", ct.phone);
  setText("footer-email", ct.email);
  setText("footer-copy", "© " + new Date().getFullYear() + " " + SITE_CONTENT.photographer);
}

function renderFormOptions() {
  setText("form-note", SITE_CONTENT.form.demoNote);
  const sel = document.getElementById("form-direction");
  sel.innerHTML = '<option value="">Выберите направление</option>' +
    SITE_CONTENT.directions.map(d => `<option value="${d.id}">${d.title}</option>`).join("");
}

function initHeader() {
  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 40));
  burger.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

function initPortfolio() {
  const grid = document.getElementById("portfolio-grid");
  const filtersEl = document.getElementById("portfolio-filters");

  if (filtersEl && typeof PORTFOLIO_FILTERS !== "undefined") {
    filtersEl.innerHTML = PORTFOLIO_FILTERS.map(f =>
      `<button class="filter-btn${f.id === "all" ? " active" : ""}" type="button" data-filter="${f.id}">${f.label}</button>`
    ).join("");
  }

  grid.innerHTML = PORTFOLIO_ITEMS.map(item => {
    const mark = item.mark === "ai" ? '<span class="mark-badge">AI-концепт</span>'
      : item.mark === "visual" ? '<span class="mark-badge">Визуальный пример</span>' : "";
    return `<article class="portfolio-item reveal" data-category="${item.category}">
      <img class="portfolio-item__img" src="${item.image}" alt="${item.title}" loading="lazy">
      <span class="portfolio-item__title">${item.title}</span>${mark}
    </article>`;
  }).join("");

  if (filtersEl) {
    filtersEl.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      const filter = btn.dataset.filter;
      filtersEl.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      grid.querySelectorAll(".portfolio-item").forEach(el => {
        if (filter === "all") el.classList.remove("hidden");
        else el.classList.toggle("hidden", el.dataset.category !== filter);
      });
    });
  }
}

function initReviews() {
  const track = document.getElementById("reviews-track");
  let current = 0;

  track.innerHTML = REVIEWS.map(r => `
    <div class="review-slide">
      <p class="review-slide__text">«${r.text}»</p>
      <p class="review-slide__author">${r.name}</p>
      <p class="review-slide__direction">${r.direction}</p>
      ${r.demo ? '<span class="demo-badge">Демонстрационный отзыв</span>' : ""}
    </div>
  `).join("");

  function goTo(i) {
    current = (i + REVIEWS.length) % REVIEWS.length;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  document.getElementById("review-prev").addEventListener("click", () => goTo(current - 1));
  document.getElementById("review-next").addEventListener("click", () => goTo(current + 1));

  let autoplay = setInterval(() => goTo(current + 1), 6000);
  track.closest(".reviews-carousel").addEventListener("mouseenter", () => clearInterval(autoplay));
}

function initFaq() {
  document.getElementById("faq-list").addEventListener("click", e => {
    const btn = e.target.closest(".faq-question");
    if (!btn) return;
    btn.parentElement.classList.toggle("open");
  });
}

function initForm() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("[data-required]").forEach(field => {
      const wrap = field.closest(".form-field");
      const err = wrap.querySelector(".form-error");
      if (!field.value.trim()) {
        wrap.classList.add("error");
        err.textContent = "Обязательное поле";
        valid = false;
      } else {
        wrap.classList.remove("error");
        err.textContent = "";
      }
    });

    const method = form.querySelector('input[name="contact-method"]:checked');
    if (!method) {
      document.getElementById("method-error").textContent = "Выберите способ связи";
      valid = false;
    } else {
      document.getElementById("method-error").textContent = "";
    }

    if (!valid) return;

    const data = {
      name: form.name.value.trim(),
      contactMethod: method.value,
      contact: form.contact.value.trim(),
      direction: form.direction.value,
      message: form.message.value.trim(),
    };
    console.log("Форма (демо):", data);

    form.reset();
    const success = document.getElementById("form-success");
    success.textContent = SITE_CONTENT.form.successMessage;
    success.hidden = false;
    setTimeout(() => { success.hidden = true; }, 8000);
  });
}

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  const mo = new MutationObserver(() => document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el)));
  mo.observe(document.body, { childList: true, subtree: true });
}

function initParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const portrait = document.querySelector(".hero__portrait-wrap");
  if (!portrait) return;
  window.addEventListener("scroll", () => {
    const y = window.scrollY * 0.15;
    portrait.style.transform = `translateY(${y}px)`;
  }, { passive: true });
}

function initCustomCursor() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 1024px)").matches;
  if (reduced || coarse || narrow) return;

  let enabled = true;
  let frames = 0;
  let lastCheck = performance.now();
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "custom-cursor-dot";
  ring.className = "custom-cursor-ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.classList.add("custom-cursor");

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    frames++;
    const now = performance.now();
    if (now - lastCheck > 1000) {
      if (frames < 10) { enabled = false; dot.remove(); ring.remove(); document.body.classList.remove("custom-cursor"); }
      frames = 0; lastCheck = now;
    }
  });

  function animate() {
    if (!enabled) return;
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    dot.style.left = mx + "px"; dot.style.top = my + "px";
    ring.style.left = rx + "px"; ring.style.top = ry + "px";
    requestAnimationFrame(animate);
  }
  animate();

  document.querySelectorAll("a, button, .portfolio-item, .direction-card").forEach(el => {
    el.addEventListener("mouseenter", () => { dot.classList.add("hover"); ring.classList.add("hover"); });
    el.addEventListener("mouseleave", () => { dot.classList.remove("hover"); ring.classList.remove("hover"); });
  });
}
