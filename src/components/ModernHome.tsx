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
