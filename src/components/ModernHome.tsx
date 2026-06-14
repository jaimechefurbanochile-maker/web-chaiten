import { useState } from 'react';
import { Search, SlidersHorizontal, Heart, ChevronRight, Home, Map, MessageCircle, Bookmark, User, Mic, Clock } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

// ─── Types ───────────────────────────────────────────────────────────────────
type Category = 'Volcán' | 'Rutas' | 'Camping';
type NavTab = 'home' | 'buscar' | 'guardados' | 'chat' | 'perfil';

interface Destination {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  gradient: string;
  accentColor: string;
}

interface FlashDeal {
  id: string;
  name: string;
  location: string;
  price: string;
  originalPrice: string;
  gradient: string;
  timeLeft: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = ['Volcán', 'Rutas', 'Camping'];

const DESTINATIONS: Record<Category, Destination[]> = {
  'Volcán': [
    {
      id: 'corcovado',
      name: 'Volcán Corcovado',
      location: 'Chaitén, Chile',
      price: '$45',
      rating: 4.9,
      gradient: 'linear-gradient(160deg, #1a3d28 0%, #2d6b42 35%, #1e7a3e 65%, #0d4020 100%)',
      accentColor: '#C8F135',
    },
    {
      id: 'pumalin',
      name: 'Parque Pumalín',
      location: 'Chaitén, Chile',
      price: 'Gratis',
      rating: 4.8,
      gradient: 'linear-gradient(160deg, #0a2810 0%, #1a5c28 40%, #2d8040 70%, #1a5030 100%)',
      accentColor: '#C8F135',
    },
    {
      id: 'fiordos',
      name: 'Fiordos Patagónicos',
      location: 'Palena, Chile',
      price: '$30',
      rating: 4.9,
      gradient: 'linear-gradient(160deg, #0a1e2d 0%, #0d3d5c 40%, #1a6080 70%, #0d3040 100%)',
      accentColor: '#64D9F8',
    },
  ],
  'Rutas': [
    {
      id: 'carretera',
      name: 'Carretera Austral',
      location: 'Aysén, Chile',
      price: '$0',
      rating: 4.9,
      gradient: 'linear-gradient(160deg, #1e2d0a 0%, #3d5c1a 40%, #5a8028 70%, #3a6015 100%)',
      accentColor: '#C8F135',
    },
    {
      id: 'bosque',
      name: 'Bosque Valdiviano',
      location: 'Chaitén, Chile',
      price: '$12',
      rating: 4.7,
      gradient: 'linear-gradient(160deg, #0d1e0a 0%, #1e4015 40%, #2d6020 70%, #1a4010 100%)',
      accentColor: '#C8F135',
    },
    {
      id: 'termas',
      name: 'Termas El Amarillo',
      location: 'Chaitén, Chile',
      price: '$18',
      rating: 4.8,
      gradient: 'linear-gradient(160deg, #2d1a0a 0%, #5c3a1a 40%, #805028 70%, #603820 100%)',
      accentColor: '#F8C664',
    },
  ],
  'Camping': [
    {
      id: 'camping1',
      name: 'Camping Pumalín',
      location: 'Chaitén, Chile',
      price: '$8',
      rating: 4.6,
      gradient: 'linear-gradient(160deg, #0d2010 0%, #1a4020 40%, #2d6030 70%, #1a4020 100%)',
      accentColor: '#C8F135',
    },
    {
      id: 'camping2',
      name: 'Camping El Volcán',
      location: 'Chaitén, Chile',
      price: '$10',
      rating: 4.7,
      gradient: 'linear-gradient(160deg, #200a0a 0%, #4a1a1a 40%, #6b2828 70%, #4a1515 100%)',
      accentColor: '#FF8A65',
    },
    {
      id: 'camping3',
      name: 'Camping Río Yelcho',
      location: 'Futaleufú, Chile',
      price: '$6',
      rating: 4.5,
      gradient: 'linear-gradient(160deg, #0a1a2d 0%, #1a3a5c 40%, #286080 70%, #1a4060 100%)',
      accentColor: '#64D9F8',
    },
  ],
};

const FLASH_DEALS: FlashDeal[] = [
  {
    id: 'ferry',
    name: 'Ferry Quellón↔Chaitén',
    location: 'Navimag · TMC',
    price: '$35',
    originalPrice: '$60',
    gradient: 'linear-gradient(135deg, #0a1e2d 0%, #1a4060 60%, #0d3050 100%)',
    timeLeft: '02:14:33',
  },
  {
    id: 'paquete',
    name: 'Paquete 3 días Pumalín',
    location: 'Chaitén, Chile',
    price: '$89',
    originalPrice: '$140',
    gradient: 'linear-gradient(135deg, #0d2010 0%, #1e4a28 60%, #2d6040 100%)',
    timeLeft: '05:40:12',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ModernHome() {
  const [activeCategory, setActiveCategory] = useState<Category>('Volcán');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const weather = useWeather();

  const toggleLike = (id: string) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const visibleDestinations = DESTINATIONS[activeCategory];

  return (
    <div style={s.root}>

      {/* ── SCROLLABLE CONTENT ─────────────────────────────────────────── */}
      <div style={s.scroll} className="hide-scrollbar">

        {/* ── TOP BAR ─────────────────────────────────────────────────── */}
        <div style={s.topBar}>
          <div style={s.userRow}>
            <div style={s.avatar}>🧑‍🌿</div>
            <div style={s.userInfo}>
              <span style={s.greeting}>Hola, viajero</span>
              <span style={s.subGreeting}>Elige tu próxima aventura</span>
            </div>
          </div>
          <div style={s.topActions}>
            {!weather.loading && (
              <div style={s.weatherChip}>
                <span style={{ fontSize: 14 }}>{weather.icon}</span>
                <span style={s.weatherTemp}>{weather.temp}°C</span>
              </div>
            )}
            <button style={s.iconBtn} aria-label="Buscar">
              <Search size={18} color="#0D1F17" />
            </button>
            <button style={s.iconBtn} aria-label="Filtros">
              <SlidersHorizontal size={18} color="#0D1F17" />
            </button>
          </div>
        </div>

        {/* ── TITLE ───────────────────────────────────────────────────── */}
        <div style={s.titleSection}>
          <h1 style={s.title}>
            Descubre la<br />
            <span style={s.titleHighlight}>Patagonia</span>{' '}
            <span style={s.titleNormal}>Norte</span>
          </h1>
        </div>

        {/* ── SEARCH BAR ──────────────────────────────────────────────── */}
        <div style={s.searchBarWrap}>
          <div style={s.searchBar}>
            <Search size={16} color="#9E9E9E" />
            <span style={s.searchPlaceholder}>Buscar destinos...</span>
          </div>
          <button style={s.micBtn} aria-label="Buscar por voz">
            <Mic size={16} color="#fff" />
          </button>
        </div>

        {/* ── CATEGORY PILLS ──────────────────────────────────────────── */}
        <div style={s.categoryRow} className="hide-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              style={activeCategory === cat ? s.catActive : s.catInactive}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'Volcán' && '🌋 '}
              {cat === 'Rutas' && '🗺️ '}
              {cat === 'Camping' && '🏕️ '}
              {cat}
            </button>
          ))}
        </div>

        {/* ── RECOMMENDED ─────────────────────────────────────────────── */}
        <div style={s.sectionHeader}>
          <span style={s.sectionTitle}>Recomendados</span>
          <button style={s.seeAll}>Ver todos <ChevronRight size={13} /></button>
        </div>

        <div style={s.cardsRow} className="hide-scrollbar">
          {visibleDestinations.map(dest => (
            <div key={dest.id} style={{ ...s.card, background: dest.gradient }}>
              {/* Landscape illustration layer */}
              <div style={s.cardIllustration}>
                <MountainIllustration color={dest.accentColor} />
              </div>

              {/* Rating badge */}
              <div style={s.ratingBadge}>
                <span style={{ fontSize: 10 }}>⭐</span>
                <span style={{ fontSize: 11, fontWeight: 700 }}>{dest.rating}</span>
              </div>

              {/* Like */}
              <button style={s.likeBtn} onClick={() => toggleLike(dest.id)}>
                <Heart
                  size={13}
                  fill={likedIds.has(dest.id) ? '#FF4B6E' : 'none'}
                  color={likedIds.has(dest.id) ? '#FF4B6E' : '#fff'}
                  strokeWidth={2}
                />
              </button>

              {/* Bottom info */}
              <div style={s.cardInfo}>
                <div style={s.cardLocation}>
                  <span style={{ fontSize: 10 }}>📍</span>
                  <span style={s.cardLocationTxt}>{dest.location}</span>
                </div>
                <div style={s.cardNameRow}>
                  <span style={s.cardName}>{dest.name}</span>
                </div>
                <span style={{ ...s.cardPrice, color: dest.accentColor }}>{dest.price} / persona</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── FLASH DEALS ─────────────────────────────────────────────── */}
        <div style={s.sectionHeader}>
          <div style={s.flashTitleRow}>
            <span style={s.sectionTitle}>Ofertas</span>
            <span style={s.flashBadge}>🔥 LIMITADO</span>
          </div>
          <button style={s.seeAll}>Ver más <ChevronRight size={13} /></button>
        </div>

        {FLASH_DEALS.map(deal => (
          <div key={deal.id} style={{ ...s.dealCard, background: deal.gradient }}>
            <div style={s.dealLeft}>
              <span style={s.dealName}>{deal.name}</span>
              <span style={s.dealLocation}>📍 {deal.location}</span>
              <div style={s.dealPriceRow}>
                <span style={s.dealPrice}>{deal.price}</span>
                <span style={s.dealOriginal}>{deal.originalPrice}</span>
              </div>
            </div>
            <div style={s.dealRight}>
              <Clock size={13} color="rgba(255,255,255,0.6)" />
              <span style={s.dealTimer}>{deal.timeLeft}</span>
              <button style={s.dealBtn}>Ver</button>
            </div>
          </div>
        ))}

        <div style={{ height: 90 }} />
      </div>

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────── */}
      <nav style={s.bottomNav}>
        {([
          { id: 'home' as NavTab, icon: <Home size={22} />, label: 'Inicio' },
          { id: 'buscar' as NavTab, icon: <Search size={22} />, label: 'Buscar' },
          { id: 'guardados' as NavTab, icon: <Bookmark size={22} />, label: 'Guardados' },
          { id: 'chat' as NavTab, icon: <MessageCircle size={22} />, label: 'Info' },
          { id: 'perfil' as NavTab, icon: <User size={22} />, label: 'Perfil' },
        ]).map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} style={s.navItem} onClick={() => setActiveTab(tab.id)}>
              <span style={{ color: isActive ? '#0D1F17' : '#BDBDBD', transition: 'color 0.2s' }}>
                {tab.icon}
              </span>
              <span style={{
                ...s.navLabel,
                color: isActive ? '#0D1F17' : '#BDBDBD',
                fontWeight: isActive ? 700 : 400,
              }}>
                {tab.label}
              </span>
              {isActive && <div style={s.navDot} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ─── SVG Mountain Illustration ───────────────────────────────────────────────
function MountainIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Sky glow */}
      <circle cx="100" cy="20" r="35" fill={color} opacity="0.08" />
      {/* Back mountains */}
      <polygon points="0,130 60,40 120,130" fill="rgba(255,255,255,0.04)" />
      <polygon points="40,130 100,30 160,130" fill="rgba(255,255,255,0.06)" />
      <polygon points="80,130 140,45 200,130" fill="rgba(255,255,255,0.04)" />
      {/* Front mountains */}
      <polygon points="0,130 50,65 100,130" fill="rgba(255,255,255,0.07)" />
      <polygon points="55,130 110,55 165,130" fill="rgba(255,255,255,0.09)" />
      <polygon points="100,130 155,70 200,130" fill="rgba(255,255,255,0.07)" />
      {/* Snow caps */}
      <polygon points="95,55 110,55 102,38" fill={color} opacity="0.5" />
      <polygon points="48,65 62,65 55,52" fill="rgba(255,255,255,0.4)" />
      <polygon points="148,70 162,70 155,57" fill="rgba(255,255,255,0.3)" />
      {/* Trees silhouette */}
      <rect x="10" y="115" width="4" height="15" fill="rgba(255,255,255,0.08)" />
      <polygon points="12,110 6,118 18,118" fill="rgba(255,255,255,0.1)" />
      <rect x="175" y="118" width="4" height="12" fill="rgba(255,255,255,0.08)" />
      <polygon points="177,113 171,120 183,120" fill="rgba(255,255,255,0.1)" />
      {/* Accent dot (sun/moon) */}
      <circle cx="155" cy="22" r="7" fill={color} opacity="0.7" />
      <circle cx="155" cy="22" r="4" fill={color} />
    </svg>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    background: '#FFFFFF',
    overflow: 'hidden',
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    background: '#FFFFFF',
  },

  // Top bar
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '52px 20px 0',
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #C8F135, #2D5A27)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    flexShrink: 0,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  greeting: {
    fontSize: 15,
    fontWeight: 700,
    color: '#0D1F17',
    lineHeight: 1.2,
  },
  subGreeting: {
    fontSize: 12,
    color: '#9E9E9E',
    fontWeight: 400,
  },
  topActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  weatherChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    background: '#F5F5F5',
    borderRadius: 100,
    padding: '5px 10px',
  },
  weatherTemp: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0D1F17',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
  },

  // Title
  titleSection: {
    padding: '20px 20px 4px',
  },
  title: {
    fontSize: 36,
    fontWeight: 800,
    color: '#0D1F17',
    lineHeight: 1.15,
    letterSpacing: '-1px',
  },
  titleHighlight: {
    background: '#C8F135',
    color: '#0D1F17',
    borderRadius: 6,
    padding: '0 6px 2px',
    display: 'inline-block',
    lineHeight: 1.2,
  },
  titleNormal: {
    color: '#0D1F17',
  },

  // Search bar
  searchBarWrap: {
    display: 'flex',
    gap: 10,
    padding: '16px 20px 0',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#F5F5F5',
    borderRadius: 14,
    padding: '13px 16px',
    cursor: 'text',
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#BDBDBD',
  },
  micBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    background: '#0D1F17',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    border: 'none',
  },

  // Categories
  categoryRow: {
    display: 'flex',
    gap: 10,
    padding: '16px 20px 0',
    overflowX: 'auto',
  },
  catActive: {
    padding: '9px 18px',
    borderRadius: 100,
    background: '#0D1F17',
    color: '#C8F135',
    fontSize: 13,
    fontWeight: 700,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    border: 'none',
    cursor: 'pointer',
  },
  catInactive: {
    padding: '9px 18px',
    borderRadius: 100,
    background: '#F5F5F5',
    color: '#9E9E9E',
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    border: 'none',
    cursor: 'pointer',
  },

  // Section headers
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 20px 12px',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 800,
    color: '#0D1F17',
    letterSpacing: '-0.4px',
  },
  seeAll: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    fontSize: 13,
    fontWeight: 600,
    color: '#2D5A27',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  flashTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  flashBadge: {
    fontSize: 10,
    fontWeight: 700,
    background: '#FF4B6E',
    color: '#fff',
    padding: '3px 8px',
    borderRadius: 100,
  },

  // Destination cards
  cardsRow: {
    display: 'flex',
    gap: 14,
    overflowX: 'auto',
    padding: '0 20px 4px',
  },
  card: {
    width: 165,
    height: 220,
    borderRadius: 20,
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  cardIllustration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '65%',
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
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    zIndex: 2,
  },
  likeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    zIndex: 2,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '12px 14px',
    background: 'rgba(0,0,0,0.45)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  cardLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  },
  cardLocationTxt: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
  },
  cardNameRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 13,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: '-0.2px',
    lineHeight: 1.2,
  },
  cardPrice: {
    fontSize: 12,
    fontWeight: 700,
  },

  // Flash deals
  dealCard: {
    margin: '0 20px 12px',
    borderRadius: 18,
    padding: '16px 18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  },
  dealName: {
    fontSize: 14,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: '-0.3px',
  },
  dealLocation: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
  },
  dealPriceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 4,
  },
  dealPrice: {
    fontSize: 18,
    fontWeight: 800,
    color: '#C8F135',
  },
  dealOriginal: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'line-through',
  },
  dealRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 6,
  },
  dealTimer: {
    fontSize: 13,
    fontWeight: 700,
    color: '#fff',
    fontVariantNumeric: 'tabular-nums',
  },
  dealBtn: {
    background: '#C8F135',
    color: '#0D1F17',
    fontSize: 12,
    fontWeight: 800,
    padding: '6px 16px',
    borderRadius: 100,
    border: 'none',
    cursor: 'pointer',
  },

  // Bottom nav
  bottomNav: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#fff',
    paddingBottom: 'env(safe-area-inset-bottom, 8px)',
    paddingTop: 8,
    borderTop: '1px solid #F0F0F0',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
    flexShrink: 0,
    zIndex: 100,
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    padding: '6px 14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    minWidth: 52,
  },
  navLabel: {
    fontSize: 10,
    letterSpacing: '0.1px',
  },
  navDot: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 4,
    height: 4,
    borderRadius: '50%',
    background: '#0D1F17',
  },
};
