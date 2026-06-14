import { useState } from 'react';
import { Search, Bell, Home, ShoppingBag, Tag, User, Plane, Ship, Bus, Car, Hotel, ChevronRight, Star, MapPin } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

type NavTab = 'home' | 'orders' | 'deals' | 'account';

interface JourneyCard {
  id: string;
  name: string;
  location: string;
  rating: number;
  priceFrom: string;
  nights: string;
  gradient: string;
}

interface HotelCard {
  id: string;
  name: string;
  type: string;
  rating: number;
  priceFrom: string;
  emoji: string;
}

const JOURNEY_CARDS: JourneyCard[] = [
  {
    id: 'corcovado',
    name: 'Volcán Corcovado',
    location: 'Chaitén, Chile',
    rating: 4.9,
    priceFrom: '$45',
    nights: '3D2N',
    gradient: 'linear-gradient(160deg,#0d4a2a 0%,#1a7a40 50%,#0d6030 100%)',
  },
  {
    id: 'pumalin',
    name: 'Parque Pumalín',
    location: 'Chaitén, Chile',
    rating: 4.8,
    priceFrom: '$30',
    nights: '2D1N',
    gradient: 'linear-gradient(160deg,#0a2a1a 0%,#156040 50%,#0a4a28 100%)',
  },
  {
    id: 'fiordos',
    name: 'Fiordos Patagónicos',
    location: 'Palena, Chile',
    rating: 4.9,
    priceFrom: '$80',
    nights: '4D3N',
    gradient: 'linear-gradient(160deg,#0a1e3a 0%,#0d4a7a 50%,#0a3060 100%)',
  },
  {
    id: 'termas',
    name: 'Termas El Amarillo',
    location: 'Chaitén, Chile',
    rating: 4.7,
    priceFrom: '$18',
    nights: '1D',
    gradient: 'linear-gradient(160deg,#3a1a0a 0%,#7a3a0d 50%,#5a2808 100%)',
  },
];

const HOTELS: HotelCard[] = [
  { id: 'h1', name: 'Hospedaje Mi Casa', type: 'Hospedaje familiar · Chaitén', rating: 4.8, priceFrom: '$35', emoji: '🏠' },
  { id: 'h2', name: 'Cabañas Bosque Verde', type: 'Cabaña de montaña · Pumalín', rating: 4.9, priceFrom: '$55', emoji: '🏡' },
  { id: 'h3', name: 'Hotel Los Volcanes', type: 'Hotel · Chaitén centro', rating: 4.6, priceFrom: '$48', emoji: '🏨' },
];

const CATEGORIES = [
  { id: 'vuelos', label: 'Vuelos', icon: <Plane size={20} /> },
  { id: 'hoteles', label: 'Hoteles', icon: <Hotel size={20} /> },
  { id: 'buses', label: 'Buses', icon: <Bus size={20} /> },
  { id: 'ferry', label: 'Ferry', icon: <Ship size={20} /> },
  { id: 'autos', label: 'Autos', icon: <Car size={20} /> },
];

export default function ModernHome() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const weather = useWeather();

  const TEAL = '#0B8E8E';
  const TEAL_LIGHT = '#E6F4F4';
  const DARK = '#1A1A2E';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: '#F8F9FA', overflow: 'hidden' }}>

      {/* ── SCROLLABLE CONTENT ─────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }} className="hide-scrollbar">

        {/* ── TOP BAR ─────────────────────────────────────────────────── */}
        <div style={{ background: '#fff', padding: '52px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 13, color: '#9E9E9E', marginBottom: 4 }}>
              {!weather.loading && `${weather.icon} ${weather.temp}°C · Chaitén`}
            </p>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: DARK, letterSpacing: '-0.5px' }}>
              Hola, viajero 👋
            </h1>
            <p style={{ fontSize: 13, color: TEAL, fontWeight: 600, marginTop: 2 }}>
              ✦ Patagonia Norte te espera
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button style={{ width: 38, height: 38, borderRadius: '50%', background: TEAL_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} color={TEAL} />
              <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: '#FF4B6E', border: '1.5px solid #fff' }} />
            </button>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg,${TEAL},#0d5a5a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `2px solid ${TEAL}` }}>
              🧑‍🌿
            </div>
          </div>
        </div>

        {/* ── SEARCH BAR ──────────────────────────────────────────────── */}
        <div style={{ padding: '0 20px 16px', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: `1.5px solid ${TEAL}`, borderRadius: 12, padding: '12px 16px', background: '#fff' }}>
            <Search size={18} color={TEAL} />
            <span style={{ fontSize: 14, color: '#BDBDBD' }}>¿A dónde vas?</span>
          </div>
        </div>

        {/* ── UPCOMING TRIP ───────────────────────────────────────────── */}
        <div style={{ padding: '0 20px 20px', background: '#fff' }}>
          <div style={{ background: '#F5F5F5', borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: TEAL, background: TEAL_LIGHT, padding: '3px 10px', borderRadius: 100 }}>Próximo viaje</span>
              <span style={{ fontSize: 11, color: '#9E9E9E' }}>14 Jun 2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: DARK, letterSpacing: '-0.5px' }}>QCH</p>
                <p style={{ fontSize: 11, color: '#9E9E9E' }}>09:00</p>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '0 12px' }}>
                <Ship size={18} color={TEAL} />
                <div style={{ width: '100%', height: 1, background: '#E0E0E0', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: -3, width: 6, height: 6, borderRadius: '50%', background: TEAL }} />
                  <div style={{ position: 'absolute', right: 0, top: -3, width: 6, height: 6, borderRadius: '50%', background: TEAL }} />
                </div>
                <p style={{ fontSize: 10, color: '#9E9E9E' }}>4h 30m</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: DARK, letterSpacing: '-0.5px' }}>CHT</p>
                <p style={{ fontSize: 11, color: '#9E9E9E' }}>13:30</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px solid #E0E0E0' }}>
              <span style={{ fontSize: 11, color: '#9E9E9E' }}>Navimag · Económico</span>
              <span style={{ fontSize: 11, color: '#9E9E9E' }}>Booking: <span style={{ fontWeight: 700, color: DARK }}>NV2026</span></span>
            </div>
          </div>
        </div>

        {/* ── CATEGORIES ──────────────────────────────────────────────── */}
        <div style={{ padding: '0 20px 20px', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: TEAL_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEAL }}>
                  {cat.icon}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: DARK }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── JOURNEY TOGETHER ────────────────────────────────────────── */}
        <div style={{ padding: '16px 0 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 12 }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: DARK, letterSpacing: '-0.3px' }}>Viaja por la Patagonia</span>
            <button style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 13, fontWeight: 600, color: TEAL, background: 'none', border: 'none', cursor: 'pointer' }}>
              Ver todos <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px 4px' }} className="hide-scrollbar">
            {JOURNEY_CARDS.map(card => (
              <div key={card.id} style={{ width: 155, flexShrink: 0, borderRadius: 16, overflow: 'hidden', background: card.gradient, cursor: 'pointer' }}>
                {/* Illustration */}
                <div style={{ height: 110, position: 'relative', overflow: 'hidden' }}>
                  <MountainSVG />
                  <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(4px)', borderRadius: 100, padding: '3px 8px' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{card.nights}</span>
                  </div>
                </div>
                {/* Info */}
                <div style={{ padding: '10px 12px 12px', background: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 3 }}>
                    <MapPin size={10} color='#9E9E9E' />
                    <span style={{ fontSize: 10, color: '#9E9E9E' }}>{card.location}</span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 800, color: DARK, lineHeight: 1.2, marginBottom: 6 }}>{card.name}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Star size={11} fill="#FBBF24" color="#FBBF24" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: DARK }}>{card.rating}</span>
                    </div>
                    <span style={{ fontSize: 11, color: '#9E9E9E' }}>desde <span style={{ color: TEAL, fontWeight: 800 }}>{card.priceFrom}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOTELS RECOMMENDATION ───────────────────────────────────── */}
        <div style={{ padding: '20px 0 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 12 }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: DARK, letterSpacing: '-0.3px' }}>Alojamiento para ti</span>
            <button style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 13, fontWeight: 600, color: TEAL, background: 'none', border: 'none', cursor: 'pointer' }}>
              Ver todos <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px' }}>
            {HOTELS.map(hotel => (
              <div key={hotel.id} style={{ display: 'flex', gap: 12, background: '#fff', borderRadius: 14, padding: '12px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, background: `linear-gradient(135deg,${TEAL},#0d5a5a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                  {hotel.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: DARK, marginBottom: 2 }}>{hotel.name}</p>
                  <p style={{ fontSize: 11, color: '#9E9E9E', marginBottom: 4 }}>{hotel.type}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={11} fill="#FBBF24" color="#FBBF24" />
                    <span style={{ fontSize: 11, fontWeight: 700, color: DARK }}>{hotel.rating}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 12, color: '#9E9E9E' }}>desde</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: TEAL }}>{hotel.priceFrom}</p>
                  <p style={{ fontSize: 10, color: '#9E9E9E' }}>por noche</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 90 }} />
      </div>

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────── */}
      <nav style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: '#fff', paddingBottom: 'env(safe-area-inset-bottom, 8px)', paddingTop: 8, borderTop: '1px solid #F0F0F0', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
        {([
          { id: 'home' as NavTab, icon: <Home size={22} />, label: 'Inicio' },
          { id: 'orders' as NavTab, icon: <ShoppingBag size={22} />, label: 'Pedidos' },
          { id: 'deals' as NavTab, icon: <Tag size={22} />, label: 'Ofertas' },
          { id: 'account' as NavTab, icon: <User size={22} />, label: 'Cuenta' },
        ]).map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 20px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <span style={{ color: isActive ? TEAL : '#BDBDBD', transition: 'color 0.2s' }}>{tab.icon}</span>
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? TEAL : '#BDBDBD' }}>{tab.label}</span>
              {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: TEAL }} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function MountainSVG() {
  return (
    <svg viewBox="0 0 155 110" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="120" cy="25" r="18" fill="rgba(255,255,255,0.15)" />
      <circle cx="120" cy="25" r="10" fill="rgba(255,255,255,0.3)" />
      <polygon points="0,110 45,30 90,110" fill="rgba(255,255,255,0.06)" />
      <polygon points="30,110 78,20 126,110" fill="rgba(255,255,255,0.08)" />
      <polygon points="65,110 110,35 155,110" fill="rgba(255,255,255,0.06)" />
      <polygon points="0,110 38,55 76,110" fill="rgba(255,255,255,0.09)" />
      <polygon points="40,110 88,48 136,110" fill="rgba(255,255,255,0.11)" />
      <polygon points="80,110 120,60 155,110" fill="rgba(255,255,255,0.09)" />
      <polygon points="72,20 78,20 75,12" fill="rgba(255,255,255,0.7)" />
      <polygon points="33,55 40,55 36,46" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}
