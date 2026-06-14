import { useState } from 'react';
import {
  Search, Home, ShoppingBag, Tag, User,
  Plane, Hotel, Bus, Ship, Car, ChevronRight, Star, MapPin
} from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

type NavTab = 'home' | 'orders' | 'deals' | 'account';

const TEAL = '#0D9488';
const TEAL_DARK = '#0A7A6E';
const TEAL_BADGE = '#0F766E';

interface JourneyCard {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: string;
  nights: string;
  photo: string;
}

interface Hotel {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: string;
  photo: string;
}

const JOURNEYS: JourneyCard[] = [
  {
    id: 'bromo',
    name: 'Volcán Corcovado',
    location: 'Chaitén, Chile',
    rating: 4.9,
    price: '$ 45/pax',
    nights: '3D2N',
    photo: 'https://picsum.photos/seed/volcano-patagonia/300/180',
  },
  {
    id: 'sombori',
    name: 'Parque Pumalín',
    location: 'Chaitén, Chile',
    rating: 4.8,
    price: '$ 30/pax',
    nights: '2D1N',
    photo: 'https://picsum.photos/seed/forest-patagonia/300/180',
  },
  {
    id: 'fiordos',
    name: 'Fiordos Patagónicos',
    location: 'Palena, Chile',
    rating: 4.9,
    price: '$ 80/pax',
    nights: '4D3N',
    photo: 'https://picsum.photos/seed/fjord-chile/300/180',
  },
  {
    id: 'termas',
    name: 'Termas El Amarillo',
    location: 'Chaitén, Chile',
    rating: 4.7,
    price: '$ 18/pax',
    nights: '1D',
    photo: 'https://picsum.photos/seed/hotspring-chile/300/180',
  },
];

const HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'Hospedaje Mi Casa',
    type: 'Hospedaje familiar · Chaitén',
    rating: 4.8,
    price: '$ 35',
    photo: 'https://picsum.photos/seed/hospedaje-chaiten/80/80',
  },
  {
    id: 'h2',
    name: 'Cabañas Bosque Verde',
    type: 'Cabaña de montaña · Pumalín',
    rating: 4.9,
    price: '$ 55',
    photo: 'https://picsum.photos/seed/cabana-pumalin/80/80',
  },
  {
    id: 'h3',
    name: 'Hotel Los Volcanes',
    type: 'Hotel · Chaitén centro',
    rating: 4.6,
    price: '$ 48',
    photo: 'https://picsum.photos/seed/hotel-chaiten/80/80',
  },
];

export default function ModernHome() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const weather = useWeather();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: '#F5F6FA', overflow: 'hidden' }}>

      {/* ── SCROLL AREA ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }} className="hide-scrollbar">

        {/* ══ TEAL HEADER SECTION ══════════════════════════════════════════ */}
        <div style={{ background: TEAL, paddingTop: 52, paddingBottom: 24, paddingLeft: 20, paddingRight: 20 }}>

          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 4 }}>
                Hola, viajero
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 14 }}>⭐</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                  {weather.loading ? 'Cargando clima...' : `${weather.temp}°C · ${weather.description}`}
                </span>
              </div>
            </div>
            <div style={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              🧑‍🌿
            </div>
          </div>

          {/* Search bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 12, padding: '12px 16px', marginTop: 16 }}>
            <Search size={18} color='#9E9E9E' />
            <span style={{ fontSize: 14, color: '#BDBDBD' }}>¿A dónde vas?</span>
          </div>

          {/* Upcoming trip card */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: TEAL_BADGE, padding: '4px 10px', borderRadius: 100 }}>
                Próximo viaje
              </span>
              <span style={{ fontSize: 11, color: '#9E9E9E' }}>14 Jun 2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ textAlign: 'center', minWidth: 52 }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.5px' }}>QCH</p>
                <p style={{ fontSize: 11, color: '#9E9E9E', marginTop: 2 }}>09:00</p>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Ship size={16} color={TEAL} />
                <div style={{ position: 'relative', width: '100%', height: 1, background: '#E0E0E0' }}>
                  {[0, 25, 50, 75, 100].map(p => (
                    <div key={p} style={{ position: 'absolute', left: `${p}%`, top: -2, width: 5, height: 5, borderRadius: '50%', background: p === 0 || p === 100 ? TEAL : '#E0E0E0', transform: 'translateX(-50%)' }} />
                  ))}
                </div>
                <p style={{ fontSize: 10, color: '#9E9E9E' }}>4h 30m</p>
              </div>
              <div style={{ textAlign: 'center', minWidth: 52 }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.5px' }}>CHT</p>
                <p style={{ fontSize: 11, color: '#9E9E9E', marginTop: 2 }}>13:30</p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #F0F0F0', marginTop: 12, paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: '#9E9E9E' }}>Navimag · Económico · Directo</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1A2E', letterSpacing: 1 }}>NV2026</span>
            </div>
          </div>

          {/* Category icons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            {[
              { label: 'Vuelos', icon: <Plane size={20} color={TEAL} /> },
              { label: 'Hoteles', icon: <Hotel size={20} color={TEAL} /> },
              { label: 'Buses', icon: <Bus size={20} color={TEAL} /> },
              { label: 'Ferry', icon: <Ship size={20} color={TEAL} /> },
              { label: 'Autos', icon: <Car size={20} color={TEAL} /> },
            ].map(cat => (
              <button key={cat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cat.icon}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ══ WHITE CONTENT SECTION ═════════════════════════════════════════ */}
        <div style={{ background: '#F5F6FA' }}>

          {/* ── Journey Together ──────────────────────────────────────────── */}
          <div style={{ paddingTop: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 14 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.3px' }}>Viaja por la Patagonia</span>
              <button style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 13, fontWeight: 600, color: TEAL, background: 'none', border: 'none', cursor: 'pointer' }}>
                Ver todos <ChevronRight size={14} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px 4px' }} className="hide-scrollbar">
              {JOURNEYS.map(card => (
                <div key={card.id} style={{ width: 158, flexShrink: 0, borderRadius: 16, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
                  {/* Photo */}
                  <div style={{ position: 'relative', height: 115 }}>
                    <img
                      src={card.photo}
                      alt={card.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)' }} />
                  </div>
                  {/* Info */}
                  <div style={{ padding: '10px 12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 3 }}>
                      <MapPin size={10} color='#9E9E9E' />
                      <span style={{ fontSize: 10, color: '#9E9E9E' }}>{card.location}</span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 800, color: '#1A1A2E', lineHeight: 1.3, marginBottom: 8 }}>{card.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                      <Star size={11} fill="#FBBF24" color="#FBBF24" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1A2E' }}>{card.rating}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: 10, color: '#9E9E9E' }}>Desde</p>
                        <p style={{ fontSize: 13, fontWeight: 800, color: '#1A1A2E' }}>{card.price}</p>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: TEAL_DARK, padding: '4px 8px', borderRadius: 100 }}>{card.nights}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Hotels Recommendation ─────────────────────────────────────── */}
          <div style={{ paddingTop: 22, paddingBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 14 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.3px' }}>Alojamiento recomendado</span>
              <button style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 13, fontWeight: 600, color: TEAL, background: 'none', border: 'none', cursor: 'pointer' }}>
                Ver todos <ChevronRight size={14} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px' }}>
              {HOTELS.map(hotel => (
                <div key={hotel.id} style={{ display: 'flex', gap: 12, background: '#fff', borderRadius: 14, padding: 12, alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                  <img
                    src={hotel.photo}
                    alt={hotel.name}
                    style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', flexShrink: 0, background: '#E0E0E0' }}
                    onError={e => { (e.target as HTMLImageElement).style.background = TEAL; }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A2E', marginBottom: 3 }}>{hotel.name}</p>
                    <p style={{ fontSize: 11, color: '#9E9E9E', marginBottom: 5 }}>{hotel.type}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={11} fill="#FBBF24" color="#FBBF24" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1A2E' }}>{hotel.rating}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: 11, color: '#9E9E9E' }}>desde</p>
                    <p style={{ fontSize: 16, fontWeight: 800, color: TEAL }}>{hotel.price}</p>
                    <p style={{ fontSize: 10, color: '#9E9E9E' }}>por noche</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: 90 }} />
        </div>
      </div>

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────── */}
      <nav style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: '#fff', paddingBottom: 'env(safe-area-inset-bottom, 8px)', paddingTop: 8, borderTop: '1px solid #F0F0F0', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}>
        {([
          { id: 'home' as NavTab, icon: Home, label: 'Inicio' },
          { id: 'orders' as NavTab, icon: ShoppingBag, label: 'Pedidos' },
          { id: 'deals' as NavTab, icon: Tag, label: 'Ofertas' },
          { id: 'account' as NavTab, icon: User, label: 'Cuenta' },
        ]).map(({ id, icon: Icon, label }) => {
          const active = activeTab === id;
          return (
            <button key={id} onClick={() => setActiveTab(id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 20px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <Icon size={22} color={active ? TEAL : '#BDBDBD'} />
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? TEAL : '#BDBDBD' }}>{label}</span>
              {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: TEAL }} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
