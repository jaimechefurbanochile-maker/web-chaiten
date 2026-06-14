import { useState, useRef } from 'react';
import {
  Bell, SlidersHorizontal, Heart, ChevronRight,
  Home, Map, BookmarkCheck, User, Compass,
  Wind, Droplets, Mountain, Utensils, Bed, Car, Info
} from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

// ─── Types ───────────────────────────────────────────────────────────────────
type Category = 'volcán' | 'rutas' | 'comer' | 'dormir' | 'moverse' | 'info';
type NavTab = 'home' | 'mapa' | 'pudi' | 'guardados' | 'perfil';

interface Destination {
  id: string;
  name: string;
  distance: string;
  rating: number;
  gradient: string;
  emoji: string;
  category: Category[];
  path: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: 'volcán', label: 'Volcán', icon: <Mountain size={14} /> },
  { id: 'rutas', label: 'Rutas', icon: <Compass size={14} /> },
  { id: 'comer', label: 'Comer', icon: <Utensils size={14} /> },
  { id: 'dormir', label: 'Dormir', icon: <Bed size={14} /> },
  { id: 'moverse', label: 'Moverse', icon: <Car size={14} /> },
  { id: 'info', label: 'Info', icon: <Info size={14} /> },
];

const DESTINATIONS: Destination[] = [
  {
    id: 'volcan',
    name: 'Volcán Corcovado',
    distance: '42 km',
    rating: 4.9,
    gradient: 'linear-gradient(135deg, #1a3a2a 0%, #2d5a27 40%, #4a7c5e 100%)',
    emoji: '🌋',
    category: ['volcán'],
    path: '/volcan',
  },
  {
    id: 'fiordos',
    name: 'Fiordos Patagónicos',
    distance: '28 km',
    rating: 4.8,
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #2d6a8f 100%)',
    emoji: '🌊',
    category: ['rutas'],
    path: '/fiordos',
  },
  {
    id: 'bosque',
    name: 'Bosque Valdiviano',
    distance: '15 km',
    rating: 4.7,
    gradient: 'linear-gradient(135deg, #0d2010 0%, #1e4d1a 50%, #2d7a27 100%)',
    emoji: '🌿',
    category: ['rutas'],
    path: '/bosque',
  },
  {
    id: 'pumalin',
    name: 'Parque Pumalín',
    distance: '35 km',
    rating: 4.9,
    gradient: 'linear-gradient(135deg, #1a2a0a 0%, #3d5a0d 50%, #5a7a1a 100%)',
    emoji: '🦌',
    category: ['rutas', 'volcán'],
    path: '/pumalin',
  },
  {
    id: 'chaiten-pueblo',
    name: 'Chaitén Pueblo',
    distance: '0 km',
    rating: 4.6,
    gradient: 'linear-gradient(135deg, #2a1a0a 0%, #5a3d0d 50%, #7a5a1a 100%)',
    emoji: '🏘️',
    category: ['comer', 'dormir', 'info'],
    path: '/pueblo',
  },
  {
    id: 'termas',
    name: 'Termas El Amarillo',
    distance: '52 km',
    rating: 4.8,
    gradient: 'linear-gradient(135deg, #2a0a1a 0%, #5a1a3d 50%, #7a2a5a 100%)',
    emoji: '♨️',
    category: ['rutas', 'dormir'],
    path: '/termas',
  },
];

const QUICK_INFO = [
  { icon: '🚌', label: 'Buses', sub: 'Tur-Bus · Queilen' },
  { icon: '⛴️', label: 'Ferry', sub: 'Navimag · TMC' },
  { icon: '🏕️', label: 'Camping', sub: '6 sitios cercanos' },
  { icon: '🏥', label: 'Hospital', sub: 'Av. Carretera 123' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ModernHome() {
  const [activeCategory, setActiveCategory] = useState<Category>('volcán');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const weather = useWeather();

  const toggleLike = (id: string) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredDestinations = DESTINATIONS.filter(d =>
    d.category.includes(activeCategory)
  );

  const visibleDestinations = filteredDestinations.length > 0
    ? filteredDestinations
    : DESTINATIONS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: '#fff', overflow: 'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={styles.hero}>
        {/* Background layers */}
        <div style={styles.heroBg} />
        <div style={styles.heroGradient} />

        {/* Weather badge */}
        {!weather.loading && (
          <div style={styles.weatherBadge}>
            <span style={{ fontSize: 16 }}>{weather.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{weather.temp}°</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginLeft: 2 }}>Chaitén</span>
          </div>
        )}

        {/* Top bar */}
        <div style={styles.heroTopBar}>
          <div style={styles.heroAvatar}>
            <div style={styles.avatarCircle}>🧑‍🌿</div>
            <span style={styles.heroGreeting}>Hola, viajero 👋</span>
          </div>
          <div style={styles.heroActions}>
            <button style={styles.heroIconBtn} aria-label="Notificaciones">
              <Bell size={18} color="#fff" />
              <span style={styles.notifDot} />
            </button>
            <button style={styles.heroIconBtn} aria-label="Filtros">
              <SlidersHorizontal size={18} color="#fff" />
            </button>
          </div>
        </div>

        {/* Hero content */}
        <div style={styles.heroContent}>
          <p style={styles.heroEyebrow}>🌿 Patagonia Norte · Chile</p>
          <h1 style={styles.heroTitle}>
            <span style={{ display: 'block' }}>Descubre la</span>
            <span style={styles.heroTitleAccent}>Patagonia</span>
          </h1>
          <p style={styles.heroSubtitle}>Volcán · Fiordos · Bosque nativo</p>

          {/* Weather detail strip */}
          {!weather.loading && (
            <div style={styles.weatherStrip}>
              <div style={styles.weatherItem}>
                <Wind size={12} color="rgba(255,255,255,0.7)" />
                <span>{weather.windSpeed} km/h</span>
              </div>
              <div style={styles.weatherDivider} />
              <div style={styles.weatherItem}>
                <Droplets size={12} color="rgba(255,255,255,0.7)" />
                <span>{weather.humidity}%</span>
              </div>
              <div style={styles.weatherDivider} />
              <span style={styles.weatherDesc}>{weather.description}</span>
            </div>
          )}

          {/* CTA buttons */}
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary}>
              <span>✦</span> Armar mi viaje
            </button>
            <button style={styles.btnSecondary}>
              🦌 Pudi
            </button>
          </div>
        </div>
      </section>

      {/* ── SCROLLABLE CONTENT ───────────────────────────────────────────── */}
      <div ref={scrollRef} style={styles.scrollArea} className="hide-scrollbar">

        {/* ── CATEGORY CHIPS ───────────────────────────────────────────── */}
        <div style={styles.chipsSection}>
          <div style={styles.chipsRow} className="hide-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                style={{
                  ...styles.chip,
                  ...(activeCategory === cat.id ? styles.chipActive : styles.chipInactive),
                }}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── DESTINATION CARDS ────────────────────────────────────────── */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Destinos</span>
            <button style={styles.seeAllBtn}>
              Ver todos <ChevronRight size={14} />
            </button>
          </div>

          <div style={styles.cardsRow} className="hide-scrollbar">
            {visibleDestinations.map(dest => (
              <div key={dest.id} style={{ ...styles.card, background: dest.gradient }}>
                {/* Emoji as visual placeholder */}
                <div style={styles.cardEmoji}>{dest.emoji}</div>

                {/* Dark overlay at bottom */}
                <div style={styles.cardOverlay} />

                {/* Rating badge */}
                <div style={styles.ratingBadge}>
                  <span style={{ fontSize: 10 }}>⭐</span>
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{dest.rating}</span>
                </div>

                {/* Like button */}
                <button
                  style={styles.likeBtn}
                  onClick={() => toggleLike(dest.id)}
                  aria-label="Guardar"
                >
                  <Heart
                    size={14}
                    fill={likedIds.has(dest.id) ? '#FF4B6E' : 'none'}
                    color={likedIds.has(dest.id) ? '#FF4B6E' : '#fff'}
                    strokeWidth={2}
                  />
                </button>

                {/* Card info */}
                <div style={styles.cardInfo}>
                  <span style={styles.cardName}>{dest.name}</span>
                  <span style={styles.cardDistance}>📍 {dest.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── QUICK INFO GRID ──────────────────────────────────────────── */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Información útil</span>
          </div>
          <div style={styles.infoGrid}>
            {QUICK_INFO.map(item => (
              <div key={item.label} style={styles.infoCard}>
                <span style={styles.infoEmoji}>{item.icon}</span>
                <span style={styles.infoLabel}>{item.label}</span>
                <span style={styles.infoSub}>{item.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED BANNER ──────────────────────────────────────────── */}
        <section style={{ padding: '0 20px 24px' }}>
          <div style={styles.featureBanner}>
            <div style={styles.featureBannerContent}>
              <span style={styles.featureBannerTag}>Nueva ruta</span>
              <p style={styles.featureBannerTitle}>Trekking Volcán Corcovado</p>
              <p style={styles.featureBannerSub}>3 días · Nivel intermedio · Guiado</p>
            </div>
            <span style={{ fontSize: 48, lineHeight: 1 }}>🌋</span>
          </div>
        </section>

        {/* Bottom padding for nav */}
        <div style={{ height: 80 }} />
      </div>

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────── */}
      <nav style={styles.bottomNav}>
        {([
          { id: 'home', icon: <Home size={22} />, label: 'Inicio' },
          { id: 'mapa', icon: <Map size={22} />, label: 'Mapa' },
          { id: 'pudi', icon: null, label: 'Pudi' },
          { id: 'guardados', icon: <BookmarkCheck size={22} />, label: 'Guardados' },
          { id: 'perfil', icon: <User size={22} />, label: 'Perfil' },
        ] as { id: NavTab; icon: React.ReactNode; label: string }[]).map(tab => {
          const isActive = activeTab === tab.id;
          const isPudi = tab.id === 'pudi';
          return (
            <button
              key={tab.id}
              style={{ ...styles.navItem, ...(isPudi ? styles.navItemPudi : {}) }}
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.label}
            >
              {isPudi ? (
                <div style={styles.pudiBtn}>
                  <span style={{ fontSize: 22, lineHeight: 1 }}>🦌</span>
                </div>
              ) : (
                <>
                  <span style={{ color: isActive ? '#0D1F17' : '#9E9E9E', transition: 'color 0.2s' }}>
                    {tab.icon}
                  </span>
                  <span style={{
                    ...styles.navLabel,
                    color: isActive ? '#0D1F17' : '#9E9E9E',
                    fontWeight: isActive ? 700 : 400,
                  }}>
                    {tab.label}
                  </span>
                  {isActive && <div style={styles.navActiveDot} />}
                </>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  // Hero
  hero: {
    position: 'relative',
    height: '52vh',
    minHeight: 320,
    maxHeight: 420,
    flexShrink: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(160deg, #0d2a18 0%, #1a4a2a 30%, #0d3d1f 60%, #0a2010 100%)',
    zIndex: 0,
  },
  heroGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
    zIndex: 1,
  },
  weatherBadge: {
    position: 'absolute',
    top: 56,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    borderRadius: 100,
    padding: '4px 12px',
    zIndex: 3,
  },
  heroTopBar: {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '52px 20px 0',
  },
  heroAvatar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'rgba(200,241,53,0.2)',
    border: '2px solid rgba(200,241,53,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  heroGreeting: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 500,
  },
  heroActions: {
    display: 'flex',
    gap: 8,
  },
  heroIconBtn: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#C8F135',
    border: '1.5px solid rgba(0,0,0,0.3)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 3,
    padding: '0 20px 24px',
  },
  heroEyebrow: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.5px',
    marginBottom: 8,
    fontWeight: 500,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.1,
    letterSpacing: '-1.5px',
    marginBottom: 8,
  },
  heroTitleAccent: {
    display: 'block',
    color: '#C8F135',
    fontStyle: 'italic',
    textShadow: '0 0 40px rgba(200,241,53,0.4)',
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: '0.3px',
    marginBottom: 12,
  },
  weatherStrip: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  weatherItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  weatherDivider: {
    width: 1,
    height: 12,
    background: 'rgba(255,255,255,0.2)',
  },
  weatherDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  heroBtns: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#C8F135',
    color: '#0D1F17',
    fontWeight: 800,
    fontSize: 14,
    padding: '13px 22px',
    borderRadius: 100,
    letterSpacing: '-0.3px',
    boxShadow: '0 4px 20px rgba(200,241,53,0.4)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  btnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(8px)',
    color: '#fff',
    fontWeight: 700,
    fontSize: 14,
    padding: '13px 22px',
    borderRadius: 100,
    border: '1.5px solid rgba(255,255,255,0.3)',
  },

  // Scrollable area
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    background: '#fff',
    borderRadius: '24px 24px 0 0',
    marginTop: -20,
    position: 'relative',
    zIndex: 10,
  },

  // Categories
  chipsSection: {
    padding: '20px 0 4px',
    background: '#fff',
  },
  chipsRow: {
    display: 'flex',
    gap: 8,
    overflowX: 'auto',
    padding: '0 20px',
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '9px 16px',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  chipActive: {
    background: '#0D1F17',
    color: '#C8F135',
  },
  chipInactive: {
    background: '#F5F5F5',
    color: '#616161',
  },

  // Section
  section: {
    padding: '20px 0 0',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: '#0D1F17',
    letterSpacing: '-0.5px',
  },
  seeAllBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    fontSize: 13,
    fontWeight: 600,
    color: '#2D5A27',
    background: 'none',
    cursor: 'pointer',
  },

  // Cards
  cardsRow: {
    display: 'flex',
    gap: 14,
    overflowX: 'auto',
    padding: '0 20px 4px',
  },
  card: {
    width: 160,
    height: 210,
    borderRadius: 20,
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  cardEmoji: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -65%)',
    fontSize: 56,
    lineHeight: 1,
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    background: '#fff',
    borderRadius: 100,
    padding: '4px 8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  likeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.15s',
  },
  cardInfo: {
    position: 'relative',
    zIndex: 2,
    padding: '0 12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  cardName: {
    fontSize: 14,
    fontWeight: 800,
    color: '#fff',
    lineHeight: 1.2,
    letterSpacing: '-0.3px',
  },
  cardDistance: {
    fontSize: 11,
    color: '#C8F135',
    fontWeight: 600,
  },

  // Quick info grid
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    padding: '0 20px',
  },
  infoCard: {
    background: '#F5F5F5',
    borderRadius: 16,
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    cursor: 'pointer',
  },
  infoEmoji: {
    fontSize: 22,
    lineHeight: 1,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: '#0D1F17',
  },
  infoSub: {
    fontSize: 11,
    color: '#9E9E9E',
  },

  // Feature banner
  featureBanner: {
    background: 'linear-gradient(135deg, #0D1F17 0%, #1a4a2a 100%)',
    borderRadius: 20,
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureBannerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  featureBannerTag: {
    display: 'inline-block',
    background: '#C8F135',
    color: '#0D1F17',
    fontSize: 10,
    fontWeight: 800,
    padding: '3px 10px',
    borderRadius: 100,
    letterSpacing: '0.5px',
    width: 'fit-content',
  },
  featureBannerTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: '-0.3px',
  },
  featureBannerSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },

  // Bottom nav
  bottomNav: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#fff',
    paddingBottom: 'env(safe-area-inset-bottom, 8px)',
    paddingTop: 8,
    borderTop: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
    flexShrink: 0,
    zIndex: 100,
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    padding: '6px 16px',
    background: 'none',
    cursor: 'pointer',
    position: 'relative',
    minWidth: 56,
  },
  navItemPudi: {
    padding: '0 16px',
    marginTop: -20,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: '0.2px',
    transition: 'color 0.2s',
  },
  navActiveDot: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 4,
    height: 4,
    borderRadius: '50%',
    background: '#0D1F17',
  },
  pudiBtn: {
    width: 54,
    height: 54,
    borderRadius: '50%',
    background: '#0D1F17',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(13,31,23,0.4)',
    border: '3px solid #C8F135',
  },
};
