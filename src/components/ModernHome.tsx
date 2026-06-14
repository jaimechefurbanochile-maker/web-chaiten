import { useState } from 'react';
import {
  Search, Home, ShoppingBag, Tag, User,
  Plane, Building2, Train, Ship, Bus, ChevronRight, Star, MapPin
} from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

// ─── Paleta exacta Travelin ───────────────────────────────────────────────────
const T = {
  teal:      '#0DA5A0',   // fondo header
  tealDark:  '#0A7A75',   // badge "próximo viaje" + badge noches
  white:     '#FFFFFF',
  bg:        '#F5F6FA',
  dark:      '#1C1C1E',
  gray:      '#9E9EA7',
  grayLight: '#F0F0F0',
  star:      '#FBBF24',
};

type NavTab = 'home' | 'orders' | 'deals' | 'account';

interface JCard { id:string; name:string; location:string; rating:number; price:string; nights:string; img:string; }
interface HCard { id:string; name:string; type:string; rating:number; price:string; img:string; }

const JOURNEYS: JCard[] = [
  { id:'corcovado', name:'Volcán Corcovado',    location:'Chaitén, Chile',  rating:4.9, price:'$ 45/pax', nights:'3D2N', img:'https://picsum.photos/seed/corcovado/320/190' },
  { id:'pumalin',   name:'Parque Pumalín',       location:'Chaitén, Chile',  rating:4.8, price:'$ 30/pax', nights:'2D1N', img:'https://picsum.photos/seed/pumalin/320/190'   },
  { id:'fiordos',   name:'Fiordos Patagónicos',  location:'Palena, Chile',   rating:4.9, price:'$ 80/pax', nights:'4D3N', img:'https://picsum.photos/seed/fiordos/320/190'   },
  { id:'termas',    name:'Termas El Amarillo',   location:'Chaitén, Chile',  rating:4.7, price:'$ 18/pax', nights:'1D',   img:'https://picsum.photos/seed/termas/320/190'    },
];

const HOTELS: HCard[] = [
  { id:'h1', name:'Hospedaje Mi Casa',     type:'Hospedaje familiar · Chaitén',   rating:4.8, price:'$ 35', img:'https://picsum.photos/seed/hospedaje1/80/80' },
  { id:'h2', name:'Cabañas Bosque Verde',  type:'Cabaña de montaña · Pumalín',    rating:4.9, price:'$ 55', img:'https://picsum.photos/seed/cabana1/80/80'    },
  { id:'h3', name:'Hotel Los Volcanes',    type:'Hotel · Chaitén centro',         rating:4.6, price:'$ 48', img:'https://picsum.photos/seed/hotel1/80/80'     },
];

const CATS = [
  { label:'Vuelos',  Icon: Plane     },
  { label:'Hoteles', Icon: Building2 },
  { label:'Trenes',  Icon: Train     },
  { label:'Ferry',   Icon: Ship      },
  { label:'Buses',   Icon: Bus       },
];

interface Deal {
  id: string; name: string; sub: string;
  price: string; original: string; timer: string; gradient: string;
}
interface Activity {
  id: string; name: string; duration: string; rating: number; price: string; emoji: string;
}

const DEALS: Deal[] = [
  { id:'d1', name:'Ferry Quellón → Chaitén', sub:'Navimag · Ida y vuelta', price:'$55', original:'$90', timer:'03:42:18', gradient:`linear-gradient(135deg,${T.tealDark},#065f46)` },
  { id:'d2', name:'Paquete 3 días Pumalín',  sub:'Incluye guía + camping',  price:'$89', original:'$140', timer:'05:20:00', gradient:`linear-gradient(135deg,#1a4a5a,#0d3040)` },
];

const ACTIVITIES: Activity[] = [
  { id:'a1', name:'Trekking Volcán Corcovado', duration:'8h · Guiado', rating:4.9, price:'$45', emoji:'🌋' },
  { id:'a2', name:'Kayak en los Fiordos',      duration:'4h · Grupal',  rating:4.8, price:'$30', emoji:'🛶' },
  { id:'a3', name:'Avistamiento de Pudú',      duration:'3h · Guiado',  rating:4.7, price:'$25', emoji:'🦌' },
  { id:'a4', name:'Baño en Termas Amarillo',   duration:'Todo el día',  rating:4.8, price:'$18', emoji:'♨️' },
];

// ─── Stars helper ─────────────────────────────────────────────────────────────
function Stars({ v }: { v: number }) {
  return (
    <span style={{ display:'flex', alignItems:'center', gap:3 }}>
      <Star size={12} fill={T.star} color={T.star} />
      <span style={{ fontSize:12, fontWeight:700, color:T.dark }}>{v}</span>
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ModernHome() {
  const [tab, setTab] = useState<NavTab>('home');
  const wx = useWeather();

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh', background:T.bg, overflow:'hidden' }}>

      {/* ════ SCROLL AREA ══════════════════════════════════════════════════ */}
      <div style={{ flex:1, overflowY:'auto', overflowX:'hidden' }} className="hide-scrollbar">

        {/* ══ TEAL HEADER ═══════════════════════════════════════════════════ */}
        <div style={{ background:T.teal, paddingBottom:28 }}>

          {/* Greeting row */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'52px 20px 0' }}>
            <div>
              <h1 style={{ fontSize:30, fontWeight:800, color:T.white, letterSpacing:'-0.5px', lineHeight:1.1, margin:0 }}>
                Hola, viajero
              </h1>
              <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:5 }}>
                {/* Coin icon */}
                <span style={{ width:18, height:18, borderRadius:'50%', background:'#FBBF24', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11 }}>✦</span>
                <span style={{ fontSize:13, color:'rgba(255,255,255,0.9)', fontWeight:600 }}>
                  {wx.loading ? '...' : `${wx.temp}°C · Chaitén`}
                </span>
              </div>
            </div>
            <div style={{ width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,0.25)', border:'2px solid rgba(255,255,255,0.5)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>
              🧑‍🌿
            </div>
          </div>

          {/* Search bar */}
          <div style={{ margin:'16px 20px 0', display:'flex', alignItems:'center', gap:10, background:T.white, borderRadius:12, padding:'13px 16px' }}>
            <Search size={18} color='#BDBDBD' />
            <span style={{ fontSize:14, color:'#BDBDBD', fontWeight:400 }}>¿A dónde vas?</span>
          </div>

          {/* Upcoming card */}
          <div style={{ margin:'14px 20px 0', background:T.white, borderRadius:16, overflow:'hidden' }}>
            {/* Card header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px 12px' }}>
              <span style={{ fontSize:11, fontWeight:700, color:T.white, background:T.tealDark, padding:'4px 12px', borderRadius:100 }}>
                Próximo viaje
              </span>
              <span style={{ fontSize:11, color:T.gray }}>14 Jun 2026</span>
            </div>

            {/* Route row */}
            <div style={{ display:'flex', alignItems:'center', padding:'0 16px' }}>
              {/* Origin */}
              <div style={{ minWidth:52 }}>
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  <span style={{ fontSize:24, fontWeight:800, color:T.dark, letterSpacing:'-0.5px' }}>QCH</span>
                  <Plane size={14} color={T.gray} style={{ transform:'rotate(0deg)' }} />
                </div>
                <p style={{ fontSize:11, color:T.gray, marginTop:2 }}>09:00</p>
              </div>

              {/* Dashed line */}
              <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'0 8px' }}>
                <span style={{ fontSize:11, color:T.gray, marginBottom:2 }}>4h 30m</span>
                <div style={{ width:'100%', position:'relative', height:1 }}>
                  <div style={{ position:'absolute', inset:0, borderTop:'1.5px dashed #D0D0D0' }} />
                  <div style={{ position:'absolute', right:-4, top:-5, fontSize:10, color:T.gray }}>›</div>
                </div>
              </div>

              {/* Destination */}
              <div style={{ minWidth:52, textAlign:'right' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:4 }}>
                  <Ship size={14} color={T.gray} />
                  <span style={{ fontSize:24, fontWeight:800, color:T.dark, letterSpacing:'-0.5px' }}>CHT</span>
                </div>
                <p style={{ fontSize:11, color:T.gray, marginTop:2 }}>13:30</p>
              </div>
            </div>

            {/* Airline row */}
            <p style={{ fontSize:11, color:T.gray, padding:'8px 16px 0' }}>
              Navimag · Económico · Directo
            </p>

            {/* Booking ID row */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:`1px solid #F0F0F0`, margin:'12px 16px 0', padding:'10px 0 14px' }}>
              <span style={{ fontSize:12, color:T.gray }}>Booking ID</span>
              <span style={{ fontSize:12, fontWeight:800, color:T.dark, letterSpacing:1 }}>NV2026</span>
            </div>
          </div>

          {/* Category icons */}
          <div style={{ display:'flex', justifyContent:'space-between', padding:'20px 20px 0' }}>
            {CATS.map(({ label, Icon }) => (
              <button key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, background:'none', border:'none', cursor:'pointer' }}>
                <div style={{ width:52, height:52, borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={22} color={T.white} />
                </div>
                <span style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.95)' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ══ WHITE CONTENT ════════════════════════════════════════════════ */}

        {/* Journey together */}
        <div style={{ paddingTop:22 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 20px 14px' }}>
            <span style={{ fontSize:17, fontWeight:800, color:T.dark }}>Viaja por la Patagonia</span>
            <button style={{ display:'flex', alignItems:'center', gap:2, fontSize:13, fontWeight:600, color:T.teal, background:'none', border:'none', cursor:'pointer' }}>
              Ver todos <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display:'flex', gap:14, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
            {JOURNEYS.map(c => (
              <div key={c.id} style={{ width:156, flexShrink:0, borderRadius:16, overflow:'hidden', background:T.white, boxShadow:'0 2px 14px rgba(0,0,0,0.09)', cursor:'pointer' }}>
                {/* Photo */}
                <div style={{ height:110, overflow:'hidden', position:'relative' }}>
                  <img src={c.img} alt={c.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                </div>
                {/* Info */}
                <div style={{ padding:'10px 12px 12px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:3, marginBottom:3 }}>
                    <MapPin size={10} color={T.gray} />
                    <span style={{ fontSize:10, color:T.gray }}>{c.location}</span>
                  </div>
                  <p style={{ fontSize:13, fontWeight:800, color:T.dark, lineHeight:1.25, marginBottom:7 }}>{c.name}</p>
                  <Stars v={c.rating} />
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:7 }}>
                    <div>
                      <p style={{ fontSize:10, color:T.gray, marginBottom:1 }}>Start from</p>
                      <p style={{ fontSize:13, fontWeight:800, color:T.dark }}>{c.price}</p>
                    </div>
                    <span style={{ fontSize:10, fontWeight:700, color:T.white, background:T.tealDark, padding:'4px 9px', borderRadius:100 }}>
                      {c.nights}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hotels recommendation */}
        <div style={{ paddingTop:22, paddingBottom:8 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 20px 14px' }}>
            <span style={{ fontSize:17, fontWeight:800, color:T.dark }}>Alojamiento para ti</span>
            <button style={{ display:'flex', alignItems:'center', gap:2, fontSize:13, fontWeight:600, color:T.teal, background:'none', border:'none', cursor:'pointer' }}>
              Ver todos <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'0 20px' }}>
            {HOTELS.map(h => (
              <div key={h.id} style={{ display:'flex', gap:12, background:T.white, borderRadius:14, padding:12, alignItems:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', cursor:'pointer' }}>
                <img src={h.img} alt={h.name} style={{ width:64, height:64, borderRadius:12, objectFit:'cover', flexShrink:0, background:T.grayLight }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:14, fontWeight:700, color:T.dark, marginBottom:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{h.name}</p>
                  <p style={{ fontSize:11, color:T.gray, marginBottom:5 }}>{h.type}</p>
                  <Stars v={h.rating} />
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <p style={{ fontSize:10, color:T.gray }}>desde</p>
                  <p style={{ fontSize:17, fontWeight:800, color:T.teal }}>{h.price}</p>
                  <p style={{ fontSize:10, color:T.gray }}>/ noche</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Ofertas especiales ────────────────────────────────────────── */}
        <div style={{ paddingTop:22 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 20px 14px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:17, fontWeight:800, color:T.dark }}>Ofertas especiales</span>
              <span style={{ fontSize:10, fontWeight:700, color:'#fff', background:'#EF4444', padding:'3px 8px', borderRadius:100 }}>🔥 HOY</span>
            </div>
            <button style={{ display:'flex', alignItems:'center', gap:2, fontSize:13, fontWeight:600, color:T.teal, background:'none', border:'none', cursor:'pointer' }}>
              Ver más <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'0 20px' }}>
            {DEALS.map(d => (
              <div key={d.id} style={{ borderRadius:16, padding:'16px 18px', background:d.gradient, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <p style={{ fontSize:14, fontWeight:800, color:'#fff', marginBottom:3 }}>{d.name}</p>
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.65)', marginBottom:8 }}>{d.sub}</p>
                  <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
                    <span style={{ fontSize:20, fontWeight:800, color:'#C8F135' }}>{d.price}</span>
                    <span style={{ fontSize:12, color:'rgba(255,255,255,0.4)', textDecoration:'line-through' }}>{d.original}</span>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:'#fff', fontVariantNumeric:'tabular-nums' }}>⏱ {d.timer}</span>
                  <button style={{ background:'#C8F135', color:'#0a3030', fontSize:12, fontWeight:800, padding:'7px 16px', borderRadius:100, border:'none', cursor:'pointer' }}>
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Actividades populares ─────────────────────────────────────── */}
        <div style={{ paddingTop:22 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 20px 14px' }}>
            <span style={{ fontSize:17, fontWeight:800, color:T.dark }}>Actividades populares</span>
            <button style={{ display:'flex', alignItems:'center', gap:2, fontSize:13, fontWeight:600, color:T.teal, background:'none', border:'none', cursor:'pointer' }}>
              Ver todos <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display:'flex', gap:12, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
            {ACTIVITIES.map(a => (
              <div key={a.id} style={{ width:140, flexShrink:0, background:T.white, borderRadius:16, padding:'14px 14px 14px', boxShadow:'0 2px 10px rgba(0,0,0,0.07)', cursor:'pointer' }}>
                <div style={{ width:44, height:44, borderRadius:12, background:T.grayLight, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, marginBottom:10 }}>
                  {a.emoji}
                </div>
                <p style={{ fontSize:13, fontWeight:800, color:T.dark, lineHeight:1.25, marginBottom:5 }}>{a.name}</p>
                <p style={{ fontSize:11, color:T.gray, marginBottom:8 }}>{a.duration}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <Stars v={a.rating} />
                  <span style={{ fontSize:13, fontWeight:800, color:T.teal }}>{a.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Banner info ───────────────────────────────────────────────── */}
        <div style={{ padding:'22px 20px 0' }}>
          <div style={{ borderRadius:20, overflow:'hidden', background:`linear-gradient(135deg,${T.teal},${T.tealDark})`, padding:'20px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)', marginBottom:5, letterSpacing:'0.5px' }}>NUEVA RUTA</p>
              <p style={{ fontSize:16, fontWeight:800, color:'#fff', lineHeight:1.3, marginBottom:12 }}>Trekking Costero<br />Chaitén · Pumalín</p>
              <button style={{ background:'#fff', color:T.tealDark, fontSize:12, fontWeight:800, padding:'8px 18px', borderRadius:100, border:'none', cursor:'pointer' }}>
                Explorar →
              </button>
            </div>
            <span style={{ fontSize:56, lineHeight:1 }}>🗺️</span>
          </div>
        </div>

        <div style={{ height:90 }} />
      </div>

      {/* ════ BOTTOM NAV ════════════════════════════════════════════════════ */}
      <nav style={{ display:'flex', justifyContent:'space-around', alignItems:'center', background:T.white, paddingBottom:'env(safe-area-inset-bottom,8px)', paddingTop:8, borderTop:`1px solid ${T.grayLight}`, boxShadow:'0 -4px 20px rgba(0,0,0,0.06)', flexShrink:0 }}>
        {([
          { id:'home'   as NavTab, Icon:Home,        label:'Inicio'  },
          { id:'orders' as NavTab, Icon:ShoppingBag,  label:'Pedidos' },
          { id:'deals'  as NavTab, Icon:Tag,          label:'Ofertas' },
          { id:'account'as NavTab, Icon:User,         label:'Cuenta'  },
        ]).map(({ id, Icon, label }) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'6px 20px', background:'none', border:'none', cursor:'pointer' }}>
              <Icon size={22} color={active ? T.teal : '#BDBDBD'} />
              <span style={{ fontSize:10, fontWeight: active ? 700 : 400, color: active ? T.teal : '#BDBDBD' }}>{label}</span>
              {active && <div style={{ width:4, height:4, borderRadius:'50%', background:T.teal }} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
