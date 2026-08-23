const PORTFOLIO_FILTERS = [
  { id: "all", label: "Все работы" },
  { id: "personal", label: "Персональные" },
  { id: "wedding", label: "Свадьбы" },
  { id: "family", label: "Семья" },
  { id: "expert", label: "Экспертные" },
  { id: "pet", label: "Pet-фото" },
  { id: "ai", label: "AI" },
];

/** Главная витрина 3×2: только featured-изображения категорий */
const PORTFOLIO_FEATURED = [
  { id: "1.1", category: "personal", title: "Персональные", image: "images/1-1-personal.png" },
  { id: "2.1", category: "wedding", title: "Свадьбы", image: "images/2-1-wedding.png" },
  { id: "3.1", category: "family", title: "Семья", image: "images/3-1-family.png" },
  { id: "4.1", category: "expert", title: "Экспертные", image: "images/4-1-expert.png" },
  { id: "5.1", category: "pet", title: "Pet-фото", image: "images/5-1-pet.png" },
  { id: "6.1", category: "ai", title: "AI", image: "images/6-1-ai.png", isAi: true },
];

/** Полная AI-подборка: 6.1 — фото, 6.2–6.4 — готовые коллажи целиком */
const AI_GALLERY = [
  { id: "6.1", image: "images/6-1-ai.png", alt: "AI-концепт" },
  { id: "6.2", image: "images/6-2-ai.png", alt: "AI-концепт" },
  { id: "6.3", image: "images/6-3-ai.png", alt: "AI-концепт" },
  { id: "6.4", image: "images/6-4-ai.png", alt: "AI-концепт" },
];

const PORTFOLIO_ITEMS = PORTFOLIO_FEATURED;
