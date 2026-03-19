import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3c74d287-0c6a-48ec-89c2-ecef9852c1c7/files/de16f0a5-f23f-4a14-8bbc-24da6d5ef2a7.jpg";
const CODEX_IMAGE = "https://cdn.poehali.dev/projects/3c74d287-0c6a-48ec-89c2-ecef9852c1c7/files/ea8082ea-6692-40a6-a24c-521a4644dbf0.jpg";

type Section = "home" | "codexes" | "documents" | "about" | "contacts" | "gallery";

interface Codex {
  id: number;
  title: string;
  category: string;
  articles: number;
  version: string;
  lastUpdate: string;
  status: "active" | "draft" | "archived";
  description: string;
  image?: string;
}

interface Document {
  id: number;
  title: string;
  type: string;
  date: string;
  author: string;
  version: string;
  content: string;
  image?: string;
}

const CODEXES: Codex[] = [
  {
    id: 1,
    title: "Уголовный Кодекс",
    category: "Уголовное право",
    articles: 142,
    version: "3.2.1",
    lastUpdate: "15 марта 2026",
    status: "active",
    description: "Основной свод законов, регулирующий уголовную ответственность граждан Falko City за совершение преступлений различной степени тяжести.",
    image: CODEX_IMAGE,
  },
  {
    id: 2,
    title: "Административный Кодекс",
    category: "Административное право",
    articles: 87,
    version: "2.4.0",
    lastUpdate: "10 марта 2026",
    status: "active",
    description: "Регулирует административные правонарушения и ответственность юридических и физических лиц перед государственными органами.",
  },
  {
    id: 3,
    title: "Гражданский Кодекс",
    category: "Гражданское право",
    articles: 211,
    version: "1.8.3",
    lastUpdate: "1 марта 2026",
    status: "active",
    description: "Определяет правовое положение участников гражданского оборота, регулирует имущественные и личные неимущественные отношения.",
  },
  {
    id: 4,
    title: "Трудовой Кодекс",
    category: "Трудовое право",
    articles: 64,
    version: "1.2.0",
    lastUpdate: "20 февраля 2026",
    status: "active",
    description: "Устанавливает государственные гарантии трудовых прав, регулирует отношения между работодателями и работниками.",
  },
  {
    id: 5,
    title: "Кодекс об Организациях",
    category: "Корпоративное право",
    articles: 53,
    version: "0.9.1",
    lastUpdate: "5 февраля 2026",
    status: "draft",
    description: "Определяет порядок создания, деятельности и ликвидации организаций, фракций и предприятий на территории сервера.",
  },
  {
    id: 6,
    title: "Конституция Falko City",
    category: "Конституционное право",
    articles: 32,
    version: "1.0.0",
    lastUpdate: "1 января 2026",
    status: "active",
    description: "Основной закон государства, определяющий права и свободы граждан, основы государственного строя и систему органов власти.",
    image: CODEX_IMAGE,
  },
];

const DOCUMENTS: Document[] = [
  {
    id: 1,
    title: "Приказ №47 — Реструктуризация полицейских сил",
    type: "Приказ",
    date: "18 марта 2026",
    author: "Министерство внутренних дел",
    version: "1.0",
    content: "Во исполнение Указа Президента о реформировании силовых структур настоящим приказом вносятся следующие изменения в организационную структуру полицейских сил...",
    image: HERO_IMAGE,
  },
  {
    id: 2,
    title: "Постановление Правительства — Экономическая реформа 2026",
    type: "Постановление",
    date: "12 марта 2026",
    author: "Правительство Falko City",
    version: "2.1",
    content: "Правительство Falko City в целях обеспечения устойчивого экономического роста и повышения благосостояния граждан постановляет...",
  },
  {
    id: 3,
    title: "Регламент судебного заседания",
    type: "Регламент",
    date: "5 марта 2026",
    author: "Верховный суд",
    version: "1.3",
    content: "Настоящий Регламент устанавливает порядок проведения судебных заседаний в Верховном суде Falko City и обязателен для исполнения всеми участниками процесса...",
  },
  {
    id: 4,
    title: "Указ Президента №12 — О гражданстве",
    type: "Указ",
    date: "28 февраля 2026",
    author: "Президент Falko City",
    version: "1.0",
    content: "В целях упорядочения системы гражданства и обеспечения прав граждан на территории Falko City настоящим Указом устанавливается следующий порядок...",
  },
];

const GALLERY_IMAGES = [
  { url: HERO_IMAGE, caption: "Falko City — ночная панорама" },
  { url: CODEX_IMAGE, caption: "Судебные архивы" },
  { url: HERO_IMAGE, caption: "Деловой квартал" },
  { url: CODEX_IMAGE, caption: "Законодательное собрание" },
  { url: HERO_IMAGE, caption: "Центральный район" },
  { url: CODEX_IMAGE, caption: "Библиотека законов" },
];

const STATUS_LABELS = {
  active: { label: "Действующий", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  draft: { label: "Проект", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  archived: { label: "Архив", color: "text-gray-400 bg-gray-400/10 border-gray-400/20" },
};

const TYPE_COLORS: Record<string, string> = {
  "Приказ": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Постановление": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Регламент": "text-teal-400 bg-teal-400/10 border-teal-400/20",
  "Указ": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

const VERSIONS = [
  { version: "3.2.1", date: "15 марта 2026", changes: "Обновлены статьи 47–53, добавлены поправки к разделу IV" },
  { version: "3.1.0", date: "1 февраля 2026", changes: "Введена новая глава XII, уточнены санкции по ст. 12–15" },
  { version: "3.0.0", date: "1 января 2026", changes: "Масштабная реформа. Полный пересмотр разделов I–III" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCodex, setSelectedCodex] = useState<Codex | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [activeVersion, setActiveVersion] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredCodexes = CODEXES.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDocs = DOCUMENTS.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (galleryIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [galleryIndex]);

  const navItems: { key: Section; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "codexes", label: "Кодексы" },
    { key: "documents", label: "Документы" },
    { key: "gallery", label: "Галерея" },
    { key: "about", label: "О сервере" },
    { key: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-[#0D0B07] text-foreground" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
        style={{ background: "rgba(13,11,7,0.92)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            <button onClick={() => setActiveSection("home")} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #F5A623, #C97B1A)" }}>
                <Icon name="Scale" size={16} className="text-[#0D0B07]" />
              </div>
              <div className="text-left">
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.8rem", letterSpacing: "0.15em", color: "white", textTransform: "uppercase", fontWeight: 600, lineHeight: 1 }}>Falko</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" }}>ROLE PLAY</div>
              </div>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <button key={item.key} onClick={() => { setActiveSection(item.key); setSelectedCodex(null); setSelectedDocument(null); }}
                  className="nav-link" style={{ color: activeSection === item.key ? "#F5A623" : undefined }}>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="https://discord.gg/falkorp" target="_blank" rel="noopener noreferrer" className="btn-outline-gold px-4 py-2 text-xs rounded flex items-center gap-2">
                <Icon name="MessageSquare" size={13} /> Discord
              </a>
              <a href="https://t.me/falkoroleplay" target="_blank" rel="noopener noreferrer" className="btn-gold px-4 py-2 text-xs rounded flex items-center gap-2">
                <Icon name="Send" size={13} /> Telegram
              </a>
            </div>

            <button className="md:hidden text-white/60 hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/5 px-6 py-5 space-y-4" style={{ background: "rgba(13,11,7,0.98)" }}>
            {navItems.map(item => (
              <button key={item.key} onClick={() => { setActiveSection(item.key); setMenuOpen(false); setSelectedCodex(null); setSelectedDocument(null); }}
                className="block w-full text-left nav-link py-1" style={{ color: activeSection === item.key ? "#F5A623" : undefined }}>
                {item.label}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="https://discord.gg/falkorp" target="_blank" rel="noopener noreferrer" className="btn-outline-gold px-4 py-2 text-xs rounded flex items-center gap-2 flex-1 justify-center">
                <Icon name="MessageSquare" size={13} /> Discord
              </a>
              <a href="https://t.me/falkoroleplay" target="_blank" rel="noopener noreferrer" className="btn-gold px-4 py-2 text-xs rounded flex items-center gap-2 flex-1 justify-center">
                <Icon name="Send" size={13} /> Telegram
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════
          HOME
      ═══════════════════════════════════════ */}
      {activeSection === "home" && (
        <>
          {/* Hero */}
          <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">
            <div className="absolute inset-0 hero-grid" />
            <div className="absolute inset-0">
              <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover opacity-25" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,11,7,0.3) 0%, rgba(13,11,7,0.65) 60%, #0D0B07 100%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(245,166,35,0.07) 0%, transparent 65%)" }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
              <div className="max-w-3xl">
                <div className="tag-badge animate-fade-up mb-6">Официальная законодательная база</div>

                <h1 className="animate-fade-up delay-100" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(4rem,10vw,7rem)", lineHeight: 0.9, fontWeight: 700, textTransform: "uppercase", color: "white" }}>
                  Falko
                  <span className="block gold-text">Role Play</span>
                </h1>

                <p className="mt-6 text-lg animate-fade-up delay-200" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "36rem", lineHeight: 1.7 }}>
                  Полная законодательная база сервера. Кодексы, правовые акты и официальные документы государственных органов.
                </p>

                <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-300">
                  <button onClick={() => setActiveSection("codexes")} className="btn-gold px-8 py-3.5 rounded text-sm flex items-center gap-2.5">
                    <Icon name="BookOpen" size={15} /> Открыть кодексы
                  </button>
                  <button onClick={() => setActiveSection("documents")} className="btn-outline-gold px-8 py-3.5 rounded text-sm flex items-center gap-2.5">
                    <Icon name="FileText" size={15} /> Документы
                  </button>
                </div>

                <div className="mt-16 flex gap-10 animate-fade-up delay-400">
                  {[
                    { num: "6", label: "Кодексов" },
                    { num: "589", label: "Статей" },
                    { num: "4+", label: "Документов" },
                    { num: "v3.2", label: "Версия базы" },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="gold-text" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 600 }}>{s.num}</div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.2rem" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Quick Access */}
          <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <div className="section-line" />
              <span style={{ fontFamily: "'Oswald', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Разделы системы</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "Scale", title: "Кодексы", desc: "6 действующих кодексов с 589 статьями", section: "codexes" as Section },
                { icon: "FileText", title: "Документы", desc: "Указы, постановления и регламенты", section: "documents" as Section },
                { icon: "Image", title: "Галерея", desc: "Медиаматериалы и официальные фото", section: "gallery" as Section },
                { icon: "Info", title: "О сервере", desc: "История и правила Falko Role Play", section: "about" as Section },
                { icon: "Search", title: "Поиск", desc: "Быстрый поиск по всей базе законов", section: "codexes" as Section },
                { icon: "Mail", title: "Контакты", desc: "Связь с администрацией сервера", section: "contacts" as Section },
              ].map(item => (
                <button key={item.title} onClick={() => setActiveSection(item.section)}
                  className="card-surface rounded-xl p-6 text-left group transition-all duration-300">
                  <div className="w-10 h-10 rounded mb-4 flex items-center justify-center"
                    style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.15)" }}>
                    <Icon name={item.icon} fallback="Circle" size={18} style={{ color: "#F5A623" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", fontWeight: 500, color: "white" }}
                    className="group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "0.3rem", lineHeight: 1.5 }}>{item.desc}</p>
                  <div style={{ marginTop: "1rem", color: "rgba(245,166,35,0.6)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Oswald', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}
                    className="group-hover:text-yellow-400 transition-colors">
                    Перейти <Icon name="ArrowRight" size={11} />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Recent */}
          <section className="py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-10">
                <div className="section-line" />
                <span style={{ fontFamily: "'Oswald', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Последние обновления</span>
              </div>
              <div className="space-y-1">
                {DOCUMENTS.slice(0, 3).map(doc => (
                  <button key={doc.id} onClick={() => { setSelectedDocument(doc); setActiveSection("documents"); }}
                    className="w-full flex items-center justify-between p-5 rounded-lg transition-colors text-left group hover:bg-white/3">
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${TYPE_COLORS[doc.type] || ""}`}>{doc.type}</span>
                      <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem" }} className="group-hover:text-white transition-colors">{doc.title}</span>
                    </div>
                    <div className="flex items-center gap-5" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>
                      <span>{doc.date}</span>
                      <Icon name="ChevronRight" size={14} className="group-hover:text-yellow-400 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════════════════════════════════
          CODEXES LIST
      ═══════════════════════════════════════ */}
      {activeSection === "codexes" && !selectedCodex && (
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="py-12">
              <div className="tag-badge mb-4">Законодательная база</div>
              <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 600, textTransform: "uppercase", color: "white" }}>Кодексы</h1>
              <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.5rem", maxWidth: "30rem" }}>Своды законов, регулирующие правовые отношения на территории Falko City</p>
            </div>

            <div className="relative mb-10">
              <Icon name="Search" size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.25)" }} />
              <input
                type="text"
                placeholder="Поиск по кодексам..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-lg pl-10 pr-4 py-3.5 text-sm focus:outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCodexes.map(codex => (
                <button key={codex.id} onClick={() => setSelectedCodex(codex)}
                  className="card-surface rounded-xl overflow-hidden text-left group transition-all duration-300">
                  {codex.image && (
                    <div className="h-40 overflow-hidden">
                      <img src={codex.image} alt={codex.title} className="w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <span className="tag-badge">{codex.category}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${STATUS_LABELS[codex.status].color}`}>{STATUS_LABELS[codex.status].label}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", fontWeight: 500, color: "white" }}
                      className="group-hover:text-yellow-300 transition-colors">{codex.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.82rem", marginTop: "0.4rem", lineHeight: 1.5 }} className="line-clamp-2">{codex.description}</p>
                    <div className="mt-5 pt-4 border-t border-white/6 flex items-center justify-between" style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.72rem" }}>
                      <span className="flex items-center gap-1.5"><Icon name="BookOpen" size={11} />{codex.articles} статей</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>v{codex.version}</span>
                      <span>{codex.lastUpdate}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {filteredCodexes.length === 0 && (
              <div className="text-center py-24" style={{ color: "rgba(255,255,255,0.2)" }}>
                <Icon name="Search" size={36} className="mx-auto mb-4 opacity-30" />
                <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem" }}>Ничего не найдено</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          CODEX DETAIL
      ═══════════════════════════════════════ */}
      {activeSection === "codexes" && selectedCodex && (
        <div className="pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-6">
            <button onClick={() => setSelectedCodex(null)}
              className="flex items-center gap-2 mt-8 mb-8 transition-colors hover:text-yellow-400"
              style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Oswald', sans-serif" }}>
              <Icon name="ArrowLeft" size={13} /> Назад к кодексам
            </button>

            {selectedCodex.image && (
              <div className="h-56 rounded-xl overflow-hidden mb-8">
                <img src={selectedCodex.image} alt={selectedCodex.title} className="w-full h-full object-cover opacity-55" />
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="tag-badge">{selectedCodex.category}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${STATUS_LABELS[selectedCodex.status].color}`}>{STATUS_LABELS[selectedCodex.status].label}</span>
            </div>

            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 600, color: "white", marginBottom: "1rem" }}>{selectedCodex.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.7, marginBottom: "2.5rem" }}>{selectedCodex.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { label: "Статей", value: String(selectedCodex.articles) },
                { label: "Версия", value: `v${selectedCodex.version}` },
                { label: "Обновлён", value: selectedCodex.lastUpdate },
              ].map(s => (
                <div key={s.label} className="card-surface rounded-xl p-4 text-center">
                  <div className="gold-text" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", fontWeight: 600 }}>{s.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="card-surface rounded-xl p-6 mb-6">
              <h3 className="flex items-center gap-2 mb-5" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", fontWeight: 500, color: "white" }}>
                <Icon name="GitBranch" size={15} style={{ color: "#F5A623" }} /> История версий
              </h3>
              <div className="space-y-2">
                {VERSIONS.map((v, i) => (
                  <button key={i} onClick={() => setActiveVersion(i)}
                    className="w-full text-left p-4 rounded-lg transition-all"
                    style={{ background: activeVersion === i ? "rgba(245,166,35,0.07)" : "transparent", border: activeVersion === i ? "1px solid rgba(245,166,35,0.2)" : "1px solid transparent" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.85rem", color: "#F5A623" }}>v{v.version}</span>
                      <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.75rem" }}>{v.date}</span>
                    </div>
                    {activeVersion === i && <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "0.4rem" }}>{v.changes}</p>}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl flex items-center gap-3" style={{ background: "rgba(245,166,35,0.04)", border: "1px solid rgba(245,166,35,0.12)" }}>
              <Icon name="Info" size={15} style={{ color: "#F5A623", flexShrink: 0 }} />
              <span style={{ color: "rgba(245,166,35,0.75)", fontSize: "0.85rem" }}>Для просмотра полного текста кодекса обратитесь к администрации сервера</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          DOCUMENTS LIST
      ═══════════════════════════════════════ */}
      {activeSection === "documents" && !selectedDocument && (
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="py-12">
              <div className="tag-badge mb-4">Официальные акты</div>
              <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 600, textTransform: "uppercase", color: "white" }}>Документы</h1>
              <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.5rem", maxWidth: "30rem" }}>Указы, постановления, регламенты и официальные акты</p>
            </div>

            <div className="relative mb-10">
              <Icon name="Search" size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.25)" }} />
              <input
                type="text"
                placeholder="Поиск по документам..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-lg pl-10 pr-4 py-3.5 text-sm focus:outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}
              />
            </div>

            <div className="space-y-4">
              {filteredDocs.map(doc => (
                <button key={doc.id} onClick={() => setSelectedDocument(doc)}
                  className="card-surface rounded-xl p-6 text-left w-full group transition-all duration-300 flex gap-5 items-start">
                  {doc.image && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={doc.image} alt="" className="w-full h-full object-cover opacity-45 group-hover:opacity-65 transition-opacity duration-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${TYPE_COLORS[doc.type] || ""}`}>{doc.type}</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.22)", fontSize: "0.7rem" }}>v{doc.version}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", fontWeight: 500, color: "white" }}
                      className="group-hover:text-yellow-300 transition-colors">{doc.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.82rem", marginTop: "0.3rem" }} className="line-clamp-2">{doc.content}</p>
                    <div className="flex gap-5 mt-2.5" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.72rem" }}>
                      <span className="flex items-center gap-1"><Icon name="User" size={10} /> {doc.author}</span>
                      <span className="flex items-center gap-1"><Icon name="Calendar" size={10} /> {doc.date}</span>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={17} className="group-hover:text-yellow-400 transition-colors flex-shrink-0 self-center" style={{ color: "rgba(255,255,255,0.18)" }} />
                </button>
              ))}

              {filteredDocs.length === 0 && (
                <div className="text-center py-24" style={{ color: "rgba(255,255,255,0.2)" }}>
                  <Icon name="FileX" size={36} className="mx-auto mb-4 opacity-30" />
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem" }}>Документы не найдены</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          DOCUMENT DETAIL
      ═══════════════════════════════════════ */}
      {activeSection === "documents" && selectedDocument && (
        <div className="pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-6">
            <button onClick={() => setSelectedDocument(null)}
              className="flex items-center gap-2 mt-8 mb-8 transition-colors hover:text-yellow-400"
              style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Oswald', sans-serif" }}>
              <Icon name="ArrowLeft" size={13} /> Назад к документам
            </button>

            {selectedDocument.image && (
              <div className="h-52 rounded-xl overflow-hidden mb-8">
                <img src={selectedDocument.image} alt="" className="w-full h-full object-cover opacity-50" />
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-4">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${TYPE_COLORS[selectedDocument.type] || ""}`}>{selectedDocument.type}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.25)", fontSize: "0.72rem", padding: "2px 8px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2px" }}>Версия {selectedDocument.version}</span>
            </div>

            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: "white", marginBottom: "1.5rem" }}>{selectedDocument.title}</h1>

            <div className="flex flex-wrap gap-6 mb-10 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.38)", fontSize: "0.85rem" }}>
              <span className="flex items-center gap-1.5"><Icon name="User" size={13} /> {selectedDocument.author}</span>
              <span className="flex items-center gap-1.5"><Icon name="Calendar" size={13} /> {selectedDocument.date}</span>
            </div>

            <div style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.8 }} className="space-y-5">
              <p>{selectedDocument.content}</p>
              <p>Настоящий документ вступает в силу с момента подписания уполномоченным лицом и подлежит обязательному исполнению всеми субъектами, находящимися на территории Falko City.</p>
              <p>Нарушение положений данного документа влечёт ответственность, предусмотренную действующим законодательством. Все спорные вопросы разрешаются в судебном порядке согласно нормам Уголовного и Гражданского кодексов.</p>
            </div>

            <div className="mt-12 p-5 rounded-xl flex items-center justify-between"
              style={{ background: "rgba(245,166,35,0.04)", border: "1px solid rgba(245,166,35,0.12)" }}>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", marginBottom: "0.2rem" }}>Документ верифицирован</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>FALKO-{selectedDocument.type.toUpperCase()}-{String(selectedDocument.id).padStart(4, "0")}</div>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(245,166,35,0.1)" }}>
                <Icon name="ShieldCheck" size={18} style={{ color: "#F5A623" }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          GALLERY
      ═══════════════════════════════════════ */}
      {activeSection === "gallery" && (
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="py-12">
              <div className="tag-badge mb-4">Медиа</div>
              <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 600, textTransform: "uppercase", color: "white" }}>Галерея</h1>
              <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>Официальные фотоматериалы и события Falko Role Play</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GALLERY_IMAGES.map((img, i) => (
                <button key={i} onClick={() => setGalleryIndex(i)}
                  className="group relative rounded-xl overflow-hidden bg-white/5"
                  style={{ aspectRatio: "16/9" }}>
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover opacity-55 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", color: "white", fontSize: "0.9rem" }}>{img.caption}</span>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <Icon name="Maximize2" size={12} className="text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Lightbox */}
      {galleryIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(10px)" }}>
          <button onClick={() => setGalleryIndex(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.08)" }}>
            <Icon name="X" size={18} />
          </button>
          <button onClick={() => setGalleryIndex(i => i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0)}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.08)" }}>
            <Icon name="ChevronLeft" size={22} />
          </button>
          <img src={GALLERY_IMAGES[galleryIndex].url} alt={GALLERY_IMAGES[galleryIndex].caption}
            className="max-w-4xl max-h-[80vh] w-full object-contain rounded-xl" />
          <button onClick={() => setGalleryIndex(i => i !== null ? (i + 1) % GALLERY_IMAGES.length : 0)}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.08)" }}>
            <Icon name="ChevronRight" size={22} />
          </button>
          <div className="absolute bottom-8" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", fontFamily: "'Oswald', sans-serif" }}>
            {GALLERY_IMAGES[galleryIndex].caption} — {galleryIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════ */}
      {activeSection === "about" && (
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="py-12">
              <div className="tag-badge mb-4">О нас</div>
              <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 600, textTransform: "uppercase", color: "white" }}>О сервере</h1>
            </div>

            <div className="relative rounded-2xl overflow-hidden mb-12 h-72">
              <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover opacity-35" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,11,7,0.92) 0%, rgba(13,11,7,0.3) 100%)" }} />
              <div className="absolute inset-0 flex items-center px-10">
                <div>
                  <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 600, color: "white", marginBottom: "0.5rem" }}>Falko Role Play</h2>
                  <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "24rem" }}>Один из крупнейших русскоязычных RP серверов Unturned</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { icon: "Flag", title: "Наша история", text: "Falko Role Play — уникальный проект, созданный для любителей реалистичного ролевого геймплея в Unturned. Мы строим живое государство с настоящими законами, выборами и институтами власти." },
                { icon: "Target", title: "Наша миссия", text: "Создать максимально реалистичное ролевое пространство, где каждый игрок может найти своё место: от рядового гражданина до президента. Законы здесь работают, а правосудие — справедливо." },
                { icon: "BookOpen", title: "Правовая система", text: "Законодательная база постоянно развивается. Игроки могут предлагать новые законы, участвовать в голосованиях и влиять на жизнь государства через демократические механизмы." },
              ].map(item => (
                <div key={item.title} className="card-surface rounded-xl p-6">
                  <h3 className="flex items-center gap-2 mb-3"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.15rem", fontWeight: 500, color: "white" }}>
                    <Icon name={item.icon} fallback="Circle" size={15} style={{ color: "#F5A623" }} /> {item.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.52)", lineHeight: 1.7 }}>{item.text}</p>
                </div>
              ))}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: "Users", value: "2500+", label: "Игроков" },
                  { icon: "Calendar", value: "3 года", label: "В сети" },
                  { icon: "Shield", value: "15", label: "Фракций" },
                  { icon: "Award", value: "TOP-5", label: "Рейтинг" },
                ].map(s => (
                  <div key={s.label} className="card-surface rounded-xl p-5 text-center">
                    <Icon name={s.icon} fallback="Circle" size={20} className="mx-auto mb-3" style={{ color: "#F5A623" }} />
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", color: "white" }}>{s.value}</div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.25rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          CONTACTS
      ═══════════════════════════════════════ */}
      {activeSection === "contacts" && (
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="py-12">
              <div className="tag-badge mb-4">Связь</div>
              <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 600, textTransform: "uppercase", color: "white" }}>Контакты</h1>
              <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>Свяжитесь с администрацией Falko Role Play</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                { icon: "MessageSquare", title: "Discord", desc: "Основная площадка сервера", link: "https://discord.gg/falkorp", cta: "Присоединиться" },
                { icon: "Send", title: "Telegram", desc: "Официальный канал новостей", link: "https://t.me/falkoroleplay", cta: "Подписаться" },
                { icon: "Globe", title: "Официальный сайт", desc: "Все ресурсы сервера", link: "#", cta: "Открыть" },
                { icon: "Mail", title: "Email", desc: "admin@falkoroleplay.ru", link: "mailto:admin@falkoroleplay.ru", cta: "Написать" },
              ].map(c => (
                <a key={c.title} href={c.link} target="_blank" rel="noopener noreferrer"
                  className="card-surface rounded-xl p-6 group transition-all duration-300 block">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.15)" }}>
                      <Icon name={c.icon} fallback="Circle" size={20} style={{ color: "#F5A623" }} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.05rem", fontWeight: 500, color: "white" }}
                        className="group-hover:text-yellow-300 transition-colors">{c.title}</h3>
                      <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.82rem", marginTop: "0.2rem" }}>{c.desc}</p>
                      <div className="flex items-center gap-1 mt-3 transition-colors group-hover:text-yellow-400"
                        style={{ color: "rgba(245,166,35,0.6)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Oswald', sans-serif" }}>
                        {c.cta} <Icon name="ExternalLink" size={10} />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="card-surface rounded-xl p-8">
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.25rem", fontWeight: 500, color: "white", marginBottom: "1.5rem" }}>Написать администрации</h3>
              <div className="space-y-4">
                {["Никнейм на сервере", "Тема обращения"].map(label => (
                  <div key={label}>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{label}</label>
                    <input type="text" placeholder={label === "Никнейм на сервере" ? "Ваш игровой ник" : "Кратко опишите вопрос"}
                      className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Сообщение</label>
                  <textarea rows={4} placeholder="Подробное описание..."
                    className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} />
                </div>
                <button className="btn-gold w-full py-3 rounded text-sm flex items-center justify-center gap-2">
                  <Icon name="Send" size={14} /> Отправить обращение
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "2.5rem 0", marginTop: "2rem" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F5A623, #C97B1A)" }}>
              <Icon name="Scale" size={12} className="text-[#0D0B07]" />
            </div>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.78rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Falko Role Play</span>
          </div>
          <div className="divider-gold hidden md:block flex-1 mx-10" />
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.2)", fontSize: "0.72rem" }}>© 2026 Falko RP — Законодательная база</div>
        </div>
      </footer>
    </div>
  );
}