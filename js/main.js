document.addEventListener("DOMContentLoaded", () => {
  renderSite();
  initHeader();
  initPortfolio();
  initReviews();
  initPackages();
  initDirectionLinks();
  initFaq();
  initForm();
  initContactMethod();
  initFormDirectionSelect();
  initFormDirectionPrefill();
  initReveal();
  initScrollSpy();
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
  toggleReviewsSection();
}

function isPlaceholder(value) {
  return !value || /^\[.+\]$/.test(String(value).trim());
}

function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function setHtml(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }

function imgSrc(path) {
  if (!path) return path;
  const v = typeof ASSET_VERSION !== "undefined" ? ASSET_VERSION : "1";
  return path + (path.includes("?") ? "&" : "?") + "v=" + v;
}

function portfolioImgMarkup(item, { lazy = true } = {}) {
  const fitClass = item.isCollage ? "portfolio-item__img--collage" : "";
  const pos = item.objectPosition ? ` style="object-position:${item.objectPosition}"` : "";
  const loading = lazy ? ' loading="lazy"' : "";
  const src = imgSrc(item.image);
  const fallback = item.image;
  return `<img class="portfolio-item__img ${fitClass}" src="${src}" data-fallback="${fallback}" alt="${item.title}" decoding="async"${loading}${pos} onerror="if(this.dataset.fallback&&this.src.indexOf(this.dataset.fallback)===-1){this.onerror=null;this.src=this.dataset.fallback}">`;
}

function renderDirections() {
  const grid = document.getElementById("directions-grid");
  grid.innerHTML = SITE_CONTENT.directions.map((d, i) => `
    <article class="direction-card reveal" data-direction-id="${d.id}" tabindex="0" role="link" aria-label="Смотреть работы: ${d.title}">
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

  const collage = typeof AI_CONCEPT_BLOCK !== "undefined"
    ? AI_CONCEPT_BLOCK
    : { image: AI_IMAGES ? AI_IMAGES["6.2"] : "images/6-2-ai-v2.png", title: "AI-концепт" };

  document.getElementById("ai-grid").innerHTML = `
    <div class="ai-block__gallery reveal">
      <article class="ai-block__item">
        <img src="${imgSrc(collage.image)}" data-fallback="${collage.image}" alt="${collage.title}" loading="lazy" decoding="async" onerror="if(this.dataset.fallback&&this.src.indexOf(this.dataset.fallback)===-1){this.onerror=null;this.src=this.dataset.fallback}">
        <span class="mark-badge">AI-концепт</span>
      </article>
    </div>
  `;
}

function renderAbout() {
  const a = SITE_CONTENT.about;
  setText("about-title", a.title);
  setText("about-text", a.text);
  const photo = document.getElementById("about-photo");
  photo.src = imgSrc(a.photo);
  photo.loading = "lazy";
  photo.decoding = "async";
  document.getElementById("about-highlights").innerHTML = a.highlights.map(h => `<li>${h}</li>`).join("");
}

function renderPosing() {
  const p = SITE_CONTENT.posing;
  setText("posing-title", p.title);
  setText("posing-text", p.text);
  setText("posing-quote", p.quote);
}

function renderBenefits() {
  document.getElementById("benefits-grid").innerHTML = SITE_CONTENT.benefits.map((b, i) => `
    <div class="benefit-item reveal">
      <span class="benefit-item__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
      <h3 class="benefit-item__title">${b.title}</h3>
      <p class="benefit-item__text">${b.text}</p>
    </div>
  `).join("");
}

function renderFaq() {
  document.getElementById("faq-list").innerHTML = SITE_CONTENT.faq.map((f, i) => `
    <div class="faq-item" data-faq="${i}">
      <button class="faq-question" type="button" aria-expanded="false">${f.question}</button>
      <div class="faq-answer"><div class="faq-answer__inner">${f.answer}</div></div>
    </div>
  `).join("");
}

function renderCta() {
  setText("cta-title", SITE_CONTENT.cta.title);
  setText("cta-text", SITE_CONTENT.cta.text);
}

function setContactLink(el, value, { type }) {
  if (!el) return;
  if (isPlaceholder(value)) {
    el.textContent = value;
    el.removeAttribute("href");
    el.classList.add("footer__link--placeholder");
    return;
  }
  el.classList.remove("footer__link--placeholder");
  if (type === "telegram") {
    const href = value.startsWith("http") ? value : `https://t.me/${value.replace(/^@/, "")}`;
    el.href = href;
    el.textContent = SITE_CONTENT.contacts.telegramLabel || value;
  } else if (type === "phone") {
    el.href = `tel:${value.replace(/\s/g, "")}`;
    el.textContent = value;
  } else if (type === "email") {
    el.href = `mailto:${value}`;
    el.textContent = value;
  }
}

function renderFooter() {
  const ct = SITE_CONTENT.contacts;
  setText("footer-brand", SITE_CONTENT.photographer);
  setContactLink(document.getElementById("footer-telegram"), ct.telegram, { type: "telegram" });
  setContactLink(document.getElementById("footer-phone"), ct.phone, { type: "phone" });
  setContactLink(document.getElementById("footer-email"), ct.email, { type: "email" });
  setText("footer-copy", "© " + new Date().getFullYear() + " " + SITE_CONTENT.photographer);
}

function renderFormOptions() {
  const note = document.getElementById("form-note");
  const hint = document.getElementById("form-hint");
  const endpoint = SITE_CONTENT.form?.endpoint?.trim();
  if (note) {
    if (!endpoint) {
      note.innerHTML = `
        <span class="form-note__line">${SITE_CONTENT.form.noEndpointLine1}</span>
        <span class="form-note__line">${SITE_CONTENT.form.noEndpointLine2}</span>`;
      note.hidden = false;
    } else {
      note.hidden = true;
    }
  }
  if (hint && SITE_CONTENT.form.formHint) {
    hint.textContent = SITE_CONTENT.form.formHint;
  }

  const sel = document.getElementById("form-direction");
  sel.innerHTML = '<option value="">Выберите направление</option>' +
    SITE_CONTENT.directions.map(d => `<option value="${d.id}">${d.title}</option>`).join("");
  updateDirectionSelectState();
}

function updateDirectionSelectState() {
  const sel = document.getElementById("form-direction");
  if (!sel) return;
  sel.classList.toggle("is-placeholder", !sel.value);
}

function initFormDirectionSelect() {
  const sel = document.getElementById("form-direction");
  if (!sel) return;
  sel.addEventListener("change", updateDirectionSelectState);
  updateDirectionSelectState();
}

function prefillFormDirection(id) {
  const sel = document.getElementById("form-direction");
  if (!sel || !id) return;
  const exists = SITE_CONTENT.directions.some(d => d.id === id);
  if (exists) sel.value = id;
  updateDirectionSelectState();
}

function initContactMethod() {
  const form = document.getElementById("contact-form");
  const contactInput = document.getElementById("contact");
  if (!form || !contactInput) return;

  const placeholders = {
    default: "Выберите способ связи",
    telegram: "@username",
    phone: "+7 999 000-00-00",
  };

  function updatePlaceholder() {
    const method = form.querySelector('input[name="contact-method"]:checked');
    contactInput.placeholder = method ? placeholders[method.value] : placeholders.default;
  }

  form.querySelectorAll('input[name="contact-method"]').forEach(radio => {
    radio.addEventListener("change", updatePlaceholder);
  });
  updatePlaceholder();
}

function initFormDirectionPrefill() {
  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener("click", () => {
      const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter;
      if (activeFilter && activeFilter !== "all") {
        prefillFormDirection(activeFilter);
      }
    });
  });
}

function toggleReviewsSection() {
  const section = document.getElementById("reviews");
  const navLink = document.querySelector('.nav a[href="#reviews"]');
  const show = SITE_CONTENT.reviews?.show === true &&
    typeof REVIEWS !== "undefined" &&
    REVIEWS.some(r => !r.demo);

  if (section) section.hidden = !show;
  if (navLink) navLink.hidden = !show;
}

function initHeader() {
  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 40));
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a:not([hidden])").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));
}

function renderAiGalleryMarkup(items) {
  return items.map(item => {
    const badge = item.category === "ai"
      ? '<span class="mark-badge">AI-концепт</span>' : "";
    return `<article class="portfolio-item${item.isCollage ? " portfolio-item--collage" : ""} portfolio-item--lightbox reveal" data-id="${item.id}" role="button" tabindex="0" aria-label="Открыть фото ${item.title}">
      ${portfolioImgMarkup(item)}
      <span class="portfolio-item__title">${item.title}</span>${badge}
    </article>`;
  }).join("");
}

function renderPortfolioItem(item) {
  const badge = item.category === "ai" ? '<span class="mark-badge">AI-концепт</span>' : "";
  return `<article class="portfolio-item portfolio-item--featured portfolio-item--lightbox reveal" data-category="${item.category}" data-id="${item.id}" role="button" tabindex="0" aria-label="Открыть фото ${item.title}">
    ${portfolioImgMarkup(item)}
    <span class="portfolio-item__title">${item.title}</span>${badge}
  </article>`;
}

function setActiveFilterButton(filtersEl, filter) {
  filtersEl.querySelectorAll(".filter-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.filter === filter);
  });
}

function bindPortfolioLightbox(items) {
  const grid = document.getElementById("portfolio-grid");
  grid.querySelectorAll(".portfolio-item[data-id]").forEach(node => {
    const idx = items.findIndex(i => i.id === node.dataset.id);
    if (idx < 0) return;

    const open = e => {
      if (e) e.preventDefault();
      if (typeof Lightbox !== "undefined") Lightbox.open(items, idx, node);
    };

    node.onclick = open;
    node.onkeydown = e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(e);
      }
    };
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
    grid.innerHTML = PORTFOLIO_FEATURED.map(item => renderPortfolioItem(item)).join("");
    bindPortfolioLightbox(PORTFOLIO_FEATURED);
    applyStagger(grid, ".portfolio-item");
  }

  function renderCategoryView(category) {
    currentFilter = category;
    const items = category === "ai" && typeof AI_PORTFOLIO_TAB !== "undefined"
      ? AI_PORTFOLIO_TAB
      : PORTFOLIO_ITEMS.filter(item => item.category === category);
    grid.className = "portfolio-grid portfolio-grid--category";
    grid.innerHTML = renderAiGalleryMarkup(items);
    bindPortfolioLightbox(items);
    applyStagger(grid, ".portfolio-item");
  }

  function applyFilter(filter) {
    if (filter === "all") renderFeaturedVitrine();
    else renderCategoryView(filter);
    if (filtersEl) setActiveFilterButton(filtersEl, filter);
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
  if (SITE_CONTENT.reviews?.show !== true) return;
  if (typeof REVIEWS === "undefined" || !REVIEWS.some(r => !r.demo)) return;

  const track = document.getElementById("reviews-track");
  if (!track) return;

  let current = 0;
  track.innerHTML = REVIEWS.filter(r => !r.demo).map(r => `
    <div class="review-slide">
      <p class="review-slide__text">«${r.text}»</p>
      <p class="review-slide__author">${r.name}</p>
      <p class="review-slide__direction">${r.direction}</p>
    </div>
  `).join("");

  const slides = REVIEWS.filter(r => !r.demo);

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  document.getElementById("review-prev").addEventListener("click", () => goTo(current - 1));
  document.getElementById("review-next").addEventListener("click", () => goTo(current + 1));

  const carousel = track.closest(".reviews-carousel");
  let autoplay = setInterval(() => goTo(current + 1), 6000);
  carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
}

function renderPackageGift(gift) {
  if (!gift) return "";
  const title = typeof gift === "object" ? gift.title : gift;
  const subtitle = typeof gift === "object" ? gift.subtitle : "";
  return `
    <div class="package-card__gift">
      <span class="package-card__gift-icon" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 1.5 12.1 7.9 18.5 10 12.1 12.1 10 18.5 7.9 12.1 1.5 10 7.9 7.9 10 1.5Z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>
        </svg>
      </span>
      <div class="package-card__gift-text">
        <p class="package-card__gift-title">${title}</p>
        ${subtitle ? `<p class="package-card__gift-sub">${subtitle}</p>` : ""}
      </div>
    </div>`;
}

function initPackages() {
  const section = document.getElementById("packages");
  const grid = document.getElementById("packages-grid");
  if (!section || !grid || !SITE_CONTENT.packages) return;

  const p = SITE_CONTENT.packages;
  setText("packages-title", p.title);
  setText("packages-subtitle", p.subtitle);

  const spec = (label, value) => `
    <div class="package-card__spec">
      <dt>${label}</dt>
      <dd>${value}</dd>
    </div>`;

  grid.innerHTML = p.items.map(pkg => {
    const featured = pkg.id === "classic";
    const cardClass = [
      "package-card", "reveal",
      `package-card--${pkg.id}`,
      featured ? "package-card--featured" : "",
    ].filter(Boolean).join(" ");

    return `
    <article class="${cardClass}" data-package-id="${pkg.id}">
      <div class="package-card__head">
        <div class="package-card__badge-slot">
          ${pkg.badge ? `<span class="package-card__badge">${pkg.badge}</span>` : ""}
        </div>
        <h3 class="package-card__name">${pkg.name}</h3>
        <p class="package-card__tagline">${pkg.tagline}</p>
      </div>
      <div class="package-card__body">
        <dl class="package-card__specs">
          ${spec("Продолжительность", pkg.duration)}
          ${spec("Готовые фото", pkg.photos)}
          ${spec("Обработка", pkg.processing)}
          ${pkg.extras ? spec("Дополнительно", pkg.extras) : ""}
          ${spec("Бронирование", pkg.booking)}
        </dl>
        ${renderPackageGift(pkg.gift)}
      </div>
      <div class="package-card__foot">
        <p class="package-card__price"><span class="package-card__price-label">Стоимость</span> <span class="package-card__price-value">${pkg.price}</span></p>
        <button type="button" class="btn btn--package package-card__cta" data-form-message="${pkg.formMessage}">${pkg.cta} <span class="btn-arrow">→</span></button>
      </div>
    </article>`;
  }).join("");

  grid.querySelectorAll(".package-card__cta").forEach(btn => {
    btn.addEventListener("click", () => {
      const message = document.getElementById("message");
      if (message) message.value = btn.dataset.formMessage;
      document.getElementById("contact").scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => message?.focus(), 400);
    });
  });
  applyStagger(grid, ".package-card");
}

function initDirectionLinks() {
  const grid = document.getElementById("directions-grid");
  if (!grid) return;

  function openDirection(id) {
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${id}"]`);
    if (filterBtn) filterBtn.click();
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  grid.addEventListener("click", e => {
    const card = e.target.closest("[data-direction-id]");
    if (!card) return;
    openDirection(card.dataset.directionId);
  });

  grid.addEventListener("keydown", e => {
    const card = e.target.closest("[data-direction-id]");
    if (!card || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    openDirection(card.dataset.directionId);
  });
}

function applyStagger(container, selector, step = 0.07) {
  if (!container) return;
  container.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * step, 0.42)}s`;
  });
}

function initScrollSpy() {
  const links = [...document.querySelectorAll('.nav a[href^="#"]:not([hidden])')];
  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.05 });

  sections.forEach(section => observer.observe(section));
}

function initFaq() {
  document.getElementById("faq-list").addEventListener("click", e => {
    const btn = e.target.closest(".faq-question");
    if (!btn) return;
    const item = btn.parentElement;
    const open = !item.classList.contains("open");
    item.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function setFormState(form, state) {
  const submit = document.getElementById("form-submit");
  const success = document.getElementById("form-success");
  const error = document.getElementById("form-error");

  if (success) success.hidden = state !== "success";
  if (error) error.hidden = state !== "error";

  if (submit) {
    submit.disabled = state === "submitting";
    submit.setAttribute("aria-busy", state === "submitting" ? "true" : "false");
    const defaultLabel = submit.dataset.defaultLabel || "Отправить";
    submit.innerHTML = state === "submitting"
      ? `${SITE_CONTENT.form.submittingLabel} <span class="btn-arrow">→</span>`
      : `${defaultLabel} <span class="btn-arrow">→</span>`;
  }

  form.dataset.state = state || "idle";
}

function initForm() {
  const form = document.getElementById("contact-form");
  const submit = document.getElementById("form-submit");
  if (submit) submit.dataset.defaultLabel = "Отправить";

  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (form.dataset.state === "submitting") return;

    let valid = true;
    form.querySelectorAll("[data-required]").forEach(field => {
      const wrap = field.closest(".form-field");
      const err = wrap.querySelector(".form-error");
      const empty = field.type === "checkbox" ? !field.checked : !String(field.value).trim();
      if (empty) {
        wrap.classList.add("error");
        if (err) err.textContent = field.type === "checkbox"
          ? "Необходимо согласие на обработку данных"
          : "Обязательное поле";
        valid = false;
      } else {
        wrap.classList.remove("error");
        if (err) err.textContent = "";
      }
    });

    const method = form.querySelector('input[name="contact-method"]:checked');
    const methodErr = document.getElementById("method-error");
    if (!method) {
      if (methodErr) methodErr.textContent = "Выберите способ связи";
      valid = false;
    } else if (methodErr) {
      methodErr.textContent = "";
    }

    if (!valid) return;

    const endpoint = SITE_CONTENT.form?.endpoint?.trim();
    if (!endpoint) {
      const note = document.getElementById("form-note");
      if (note) {
        note.hidden = false;
        note.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      return;
    }

    const payload = {
      name: form.name.value.trim(),
      contactMethod: method.value,
      contact: form.contact.value.trim(),
      direction: form.direction.value,
      message: form.message.value.trim(),
      consent: form.consent.checked,
    };

    setFormState(form, "submitting");
    const errorEl = document.getElementById("form-error");
    if (errorEl) errorEl.textContent = "";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("request failed");

      form.reset();
      setFormState(form, "success");
      const success = document.getElementById("form-success");
      if (success) success.textContent = SITE_CONTENT.form.successMessage;
      setTimeout(() => setFormState(form, "idle"), 8000);
    } catch {
      setFormState(form, "error");
      if (errorEl) errorEl.textContent = SITE_CONTENT.form.errorMessage;
    }
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
