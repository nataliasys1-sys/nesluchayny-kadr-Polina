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
  const t = c.heroTitleLines || { ne: "НЕ", line2: "случайный", line3: "кадр" };
  setHtml("hero-project", `
    <span class="hero__title-line hero__title-ne">${t.ne}</span>
    <span class="hero__title-line hero__title-word">${t.line2}</span>
    <span class="hero__title-line hero__title-word">${t.line3}</span>
  `);
  setText("hero-slogan", c.slogan);
  setHtml("hero-meta", `<span>${c.city}</span><span>Опыт ${c.experience}</span>`);
  document.getElementById("hero-portrait").src = imgSrc(c.heroPortrait);
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

function imgSrc(path) {
  if (!path) return path;
  const v = typeof ASSET_VERSION !== "undefined" ? ASSET_VERSION : "1";
  return path + (path.includes("?") ? "&" : "?") + "v=" + v;
}

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
  const images = typeof AI_GALLERY !== "undefined" ? AI_GALLERY : b.images.map(img => ({
    image: img.src,
    title: img.alt || "AI-концепт",
    category: "ai",
    isCollage: false,
  }));
  document.getElementById("ai-grid").innerHTML = `
    <div class="ai-block__gallery reveal portfolio-grid portfolio-grid--category">${renderAiGalleryMarkup(images)}</div>
  `;
}

function renderAbout() {
  const a = SITE_CONTENT.about;
  setText("about-title", a.title);
  setText("about-text", a.text);
  document.getElementById("about-photo").src = imgSrc(a.photo);
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

function renderAiGalleryMarkup(items, { showBadge = true } = {}) {
  return items.map(item => {
    const fitClass = item.isCollage ? "portfolio-item__img--collage" : "";
    const pos = item.objectPosition ? ` style="object-position:${item.objectPosition}"` : "";
    const badge = showBadge && item.category === "ai"
      ? '<span class="mark-badge">AI-концепт</span>' : "";
    return `<article class="portfolio-item${item.isCollage ? " portfolio-item--collage" : ""} reveal" data-id="${item.id}">
      <img class="portfolio-item__img ${fitClass}" src="${imgSrc(item.image)}" alt="${item.title}" loading="lazy"${pos}>
      <span class="portfolio-item__title">${item.title}</span>${badge}
    </article>`;
  }).join("");
}

function renderPortfolioItem(item, { clickable = false } = {}) {
  const fitClass = item.isCollage ? "portfolio-item__img--collage" : "";
  const pos = item.objectPosition ? ` style="object-position:${item.objectPosition}"` : "";
  const badge = item.category === "ai" ? '<span class="mark-badge">AI-концепт</span>' : "";
  const clickAttrs = clickable
    ? ` role="button" tabindex="0" data-filter-target="${item.category}" aria-label="Открыть категорию ${item.title}"`
    : "";

  return `<article class="portfolio-item portfolio-item--featured reveal" data-category="${item.category}" data-id="${item.id}"${clickAttrs}>
    <img class="portfolio-item__img ${fitClass}" src="${imgSrc(item.image)}" alt="${item.title}" loading="lazy"${pos}>
    <span class="portfolio-item__title">${item.title}</span>${badge}
  </article>`;
}

function setActiveFilterButton(filtersEl, filter) {
  filtersEl.querySelectorAll(".filter-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.filter === filter);
  });
}

function initPortfolio() {
  const grid = document.getElementById("portfolio-grid");
  const filtersEl = document.getElementById("portfolio-filters");
  let currentFilter = "all";

  if (filtersEl && typeof PORTFOLIO_FILTERS !== "undefined") {
    filtersEl.innerHTML = PORTFOLIO_FILTERS.map(f =>
      `<button class="filter-btn${f.id === "all" ? " active" : ""}" type="button" data-filter="${f.id}">${f.label}</button>`
    ).join("");
  }

  function renderFeaturedVitrine() {
    currentFilter = "all";
    grid.className = "portfolio-grid portfolio-grid--featured";
    grid.innerHTML = PORTFOLIO_FEATURED.map(item => renderPortfolioItem(item, { clickable: true })).join("");
    bindFeaturedInteractions();
  }

  function renderCategoryView(category) {
    currentFilter = category;
    const items = PORTFOLIO_ITEMS.filter(item => item.category === category);
    grid.className = "portfolio-grid portfolio-grid--category";
    grid.innerHTML = renderAiGalleryMarkup(items, { showBadge: category === "ai" });
  }

  function applyFilter(filter, { fromFeatured = false } = {}) {
    if (filter === "all") renderFeaturedVitrine();
    else renderCategoryView(filter);
    if (filtersEl) setActiveFilterButton(filtersEl, filter);
    if (fromFeatured && filter !== "all") {
      grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function bindFeaturedInteractions() {
    grid.querySelectorAll("[data-filter-target]").forEach(card => {
      const category = card.dataset.filterTarget;

      card.addEventListener("click", () => applyFilter(category, { fromFeatured: true }));

      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          applyFilter(category, { fromFeatured: true });
        }
      });
    });
  }

  renderFeaturedVitrine();

  if (filtersEl) {
    filtersEl.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      applyFilter(btn.dataset.filter);
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
