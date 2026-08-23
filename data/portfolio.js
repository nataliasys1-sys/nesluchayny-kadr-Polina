const ASSET_VERSION = "20250824";

const PORTFOLIO_FILTERS = [
  { id: "all", label: "Все работы" },
  { id: "personal", label: "Персональные" },
  { id: "wedding", label: "Свадьбы" },
  { id: "family", label: "Семья" },
  { id: "expert", label: "Экспертные" },
  { id: "pet", label: "Pet-фото" },
  { id: "ai", label: "AI" },
];

const PORTFOLIO_ITEMS = [
  { id: "1.1", category: "personal", title: "Персональные", image: "images/1-1-personal.png", featured: true },
  { id: "1.2", category: "personal", title: "Персональные", image: "images/1-2-personal.png", featured: false },
  { id: "1.3", category: "personal", title: "Персональные", image: "images/1-3-personal.png", featured: false },
  { id: "1.4", category: "personal", title: "Персональные", image: "images/1-4-personal.png", featured: false },
  { id: "2.1", category: "wedding", title: "Свадьбы", image: "images/2-1-wedding.png", featured: true },
  { id: "2.2", category: "wedding", title: "Свадьбы", image: "images/2-2-wedding.png", featured: false },
  { id: "2.3", category: "wedding", title: "Свадьбы", image: "images/2-3-wedding.png", featured: false },
  { id: "2.4", category: "wedding", title: "Свадьбы", image: "images/2-4-wedding.png", featured: false },
  { id: "3.1", category: "family", title: "Семья", image: "images/3-1-family.png", featured: true },
  { id: "3.2", category: "family", title: "Семья", image: "images/3-2-family.png", featured: false },
  { id: "3.3", category: "family", title: "Семья", image: "images/3-3-family.png", featured: false },
  { id: "3.4", category: "family", title: "Семья", image: "images/3-4-family.png", featured: false },
  { id: "4.1", category: "expert", title: "Экспертные", image: "images/4-1-expert.png", featured: true },
  { id: "4.2", category: "expert", title: "Экспертные", image: "images/4-2-expert.png", featured: false },
  { id: "4.3", category: "expert", title: "Экспертные", image: "images/4-3-expert.png", featured: false },
  { id: "4.4", category: "expert", title: "Экспертные", image: "images/4-4-expert.png", featured: false },
  { id: "5.1", category: "pet", title: "Pet-фото", image: "images/5-1-pet.png", featured: true },
  { id: "5.2", category: "pet", title: "Pet-фото", image: "images/5-2-pet.png", featured: false },
  { id: "5.3", category: "pet", title: "Pet-фото", image: "images/5-3-pet.png", featured: false },
  { id: "5.4", category: "pet", title: "Pet-фото", image: "images/5-4-pet.png", featured: false },
  { id: "6.1", category: "ai", title: "AI", image: "images/6-1-ai.png", featured: true, objectPosition: "center 20%" },
  { id: "6.2", category: "ai", title: "AI", image: "images/6-2-ai.png", featured: false, isCollage: true },
  { id: "6.3", category: "ai", title: "AI", image: "images/6-3-ai.png", featured: false, isCollage: true },
  { id: "6.4", category: "ai", title: "AI", image: "images/6-4-ai.png", featured: false, isCollage: true },
];

const PORTFOLIO_FEATURED = PORTFOLIO_ITEMS.filter(item => item.featured);

/** Вкладка AI в меню портфолио: 6.1, 6.2, 6.3, 6.4 */
const AI_PORTFOLIO_TAB = PORTFOLIO_ITEMS.filter(item => item.category === "ai");

/** Отдельный блок «AI-концепции» на странице: только коллаж 6.2 */
const AI_CONCEPT_BLOCK = PORTFOLIO_ITEMS.find(item => item.id === "6.2");

const AI_GALLERY = AI_PORTFOLIO_TAB;
