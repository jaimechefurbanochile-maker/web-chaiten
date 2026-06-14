import { useState } from 'react';
import {
  Search, Home, ShoppingBag, Tag, User,
  Plane, Building2, Train, Ship, Bus, ChevronRight, Star, MapPin,
  AlertCircle,
  Fuel, Banknote, Stethoscope, ShieldCheck, Wifi, MessageCircle
} from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

const T = {
  teal:      '#0DA5A0',
  tealDark:  '#0A7A75',
  tealBg:    '#E6F7F7',
  white:     '#FFFFFF',
  bg:        '#F5F6FA',
  dark:      '#1C1C1E',
  gray:      '#9E9EA7',
  grayLight: '#F0F0F0',
  star:      '#FBBF24',
  accent:    '#C8F135',
};

type NavTab = 'home' | 'rutas' | 'pudi' | 'ofertas' | 'cuenta';

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMO_LLEGAR = [
  { id:'ferry', emoji:'⛴️', titulo:'Ferry', sub:'Quellón → Chaitén', detalle:'Navimag · TMC', duracion:'4h 30m', precio:'desde $35', color:'#0d4a7a' },
  { id:'bus',   emoji:'🚌', titulo:'Bus',   sub:'Puerto Montt → Chaitén', detalle:'Tur-Bus · Queilen Bus', duracion:'8h', precio:'desde $18', color:'#1a4a2a' },
  { id:'avion', emoji:'✈️', titulo:'Avión', sub:'Puerto Montt → Chaitén', detalle:'Aerocord · charter', duracion:'45 min', precio:'desde $120', color:'#3a1a6a' },
];

const DONDE_DORMIR = [
  { id:'d1', nombre:'Hospedaje Mi Casa',     tipo:'Hospedaje familiar',  rating:4.8, precio:'$35', img:'https://picsum.photos/seed/hospedaje-mc/300/180'  },
  { id:'d2', nombre:'Cabañas Bosque Verde',  tipo:'Cabaña de montaña',   rating:4.9, precio:'$55', img:'https://picsum.photos/seed/cabana-bv/300/180'     },
  { id:'d3', nombre:'Hotel Los Volcanes',    tipo:'Hotel céntrico',      rating:4.6, precio:'$48', img:'https://picsum.photos/seed/hotel-lv/300/180'      },
  { id:'d4', nombre:'Camping Pumalín',       tipo:'Camping con servicios',rating:4.7, precio:'$8',  img:'https://picsum.photos/seed/camping-pm/300/180'  },
];

const DONDE_COMER = [
  { id:'c1', nombre:'Restobar El Volcán',   tipo:'Mariscos · Cocina local', rating:4.7, precio:'$$', img:'https://picsum.photos/seed/resto-ev/300/180' },
  { id:'c2', nombre:'Café Patagonia',        tipo:'Café · Desayunos',       rating:4.8, precio:'$',  img:'https://picsum.photos/seed/cafe-pt/300/180'  },
  { id:'c3', nombre:'Picada Don Jaime',      tipo:'Comida casera',           rating:4.6, precio:'$',  img:'https://picsum.photos/seed/picada-dj/300/180'},
  { id:'c4', nombre:'Marisquería El Puerto', tipo:'Mariscos · Vista al mar', rating:4.9, precio:'$$', img:'https://picsum.photos/seed/marisq-ep/300/180'},
];

const COMO_MOVERSE = [
  { id:'m1', emoji:'🚕', titulo:'Remis / Taxi', sub:'Servicio local 24h' },
  { id:'m2', emoji:'🚲', titulo:'Bicicleta',    sub:'Arriendo en el centro' },
  { id:'m3', emoji:'🚗', titulo:'Auto arriendo', sub:'Desde $45/día' },
  { id:'m4', emoji:'🥾', titulo:'A pie',         sub:'Centro compacto' },
  { id:'m5', emoji:'🛻', titulo:'Transfer',      sub:'Al Pumalín y rutas' },
];

const RUTAS = [
  { id:'r1', nombre:'Sendero al Volcán Corcovado', distancia:'18 km', tiempo:'8h', dificultad:'Alta',   emoji:'🌋', color:'#7a1a1a' },
  { id:'r2', nombre:'Trekking Pumalín Cascadas',   distancia:'6 km',  tiempo:'3h', dificultad:'Fácil',  emoji:'🌿', color:'#1a5a2a' },
  { id:'r3', nombre:'Ruta Costera Chaitén',        distancia:'12 km', tiempo:'5h', dificultad:'Media',  emoji:'🌊', color:'#0a3a6a' },
  { id:'r4', nombre:'Sendero Río Blanco',          distancia:'8 km',  tiempo:'4h', dificultad:'Media',  emoji:'🏞️', color:'#2a4a1a' },
  { id:'r5', nombre:'Termas El Amarillo',          distancia:'52 km', tiempo:'1h (auto)', dificultad:'Fácil', emoji:'♨️', color:'#5a3a0a' },
];

const ATRACTIVOS = [
  { id:'a1', nombre:'Volcán Corcovado',     sub:'Icono patagónico',        emoji:'🌋', img:'https://picsum.photos/seed/volcan-co/320/190', rating:4.9 },
  { id:'a2', nombre:'Parque Pumalín',       sub:'Bosque valdiviano virgen',emoji:'🌿', img:'https://picsum.photos/seed/pumalin-at/320/190',rating:4.9 },
  { id:'a3', nombre:'Fiordos Patagónicos',  sub:'Paisajes únicos en bote', emoji:'🌊', img:'https://picsum.photos/seed/fiordos-at/320/190', rating:4.8 },
  { id:'a4', nombre:'Termas El Amarillo',   sub:'Aguas termales naturales', emoji:'♨️', img:'https://picsum.photos/seed/termas-at/320/190',  rating:4.7 },
  { id:'a5', nombre:'Río Yelcho',           sub:'Pesca y rafting',          emoji:'🎣', img:'https://picsum.photos/seed/yelcho-at/320/190',  rating:4.6 },
];

const SERVICIOS = [
  { id:'s1', emoji:'🏥', titulo:'Hospital',    sub:'Av. Carretera 123',    Icon: Stethoscope },
  { id:'s2', emoji:'💊', titulo:'Farmacia',    sub:'Cruz Verde · SalcoBrand', Icon: AlertCircle },
  { id:'s3', emoji:'🚔', titulo:'Carabineros', sub:'Comisaría central',    Icon: ShieldCheck  },
  { id:'s4', emoji:'🏦', titulo:'Banco / ATM', sub:'BancoEstado · Redbanc', Icon: Banknote    },
  { id:'s5', emoji:'⛽', titulo:'Bencina',     sub:'Copec · ENAP',         Icon: Fuel         },
  { id:'s6', emoji:'📶', titulo:'WiFi',        sub:'Municipalidad gratis',  Icon: Wifi         },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 20px 14px' }}>
      <span style={{ fontSize:17, fontWeight:800, color:T.dark }}>{title}</span>
      {onSeeAll && (
        <button onClick={onSeeAll} style={{ display:'flex', alignItems:'center', gap:2, fontSize:13, fontWeight:600, color:T.teal, background:'none', border:'none', cursor:'pointer' }}>
          Ver todos <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function Stars({ v }: { v: number }) {
  return (
    <span style={{ display:'flex', alignItems:'center', gap:3 }}>
      <Star size={11} fill={T.star} color={T.star} />
      <span style={{ fontSize:11, fontWeight:700, color:T.dark }}>{v}</span>
    </span>
  );
}

function DiffBadge({ d }: { d: string }) {
  const colors: Record<string,string> = { 'Fácil':'#16a34a', 'Media':'#d97706', 'Alta':'#dc2626' };
  return <span style={{ fontSize:10, fontWeight:700, color:'#fff', background: colors[d] ?? T.teal, padding:'3px 8px', borderRadius:100 }}>{d}</span>;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ModernHome() {
  const [tab, setTab] = useState<NavTab>('home');
  const wx = useWeather();

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh', background:T.bg, overflow:'hidden' }}>

      {/* ════ SCROLL ══════════════════════════════════════════════════════ */}
      <div style={{ flex:1, overflowY:'auto', overflowX:'hidden' }} className="hide-scrollbar">

        {/* ══ HEADER TEAL (fiel al Travelin) ══════════════════════════════ */}
        <div style={{ background:'linear-gradient(170deg,#0D2F25 0%,#0A7A75 100%)', paddingBottom:24 }}>

          {/* ── Greeting row ── */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'52px 20px 0' }}>
            <div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.65)', fontWeight:500, marginBottom:3 }}>
                {wx.loading ? '' : `${wx.icon ?? '🌤️'} ${wx.temp}°C · Chaitén`}
              </p>
              <h1 style={{ fontSize:26, fontWeight:800, color:T.white, lineHeight:1.15, letterSpacing:'-0.3px', margin:0 }}>
                ¿A dónde quieres ir?
              </h1>
            </div>
            <div style={{ width:46, height:46, borderRadius:'50%', background:'rgba(255,255,255,0.18)', border:'2px solid rgba(255,255,255,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
              🧑‍🌿
            </div>
          </div>

          {/* ── Search bar ── */}
          <div style={{ margin:'16px 20px 0', display:'flex', alignItems:'center', gap:10, background:T.white, borderRadius:14, padding:'13px 16px', boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }}>
            <Search size={17} color={T.teal} />
            <span style={{ fontSize:14, color:'#BDBDBD', flex:1 }}>Buscar destinos, rutas…</span>
            <div style={{ width:32, height:32, borderRadius:8, background:T.teal, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <MapPin size={15} color={T.white} />
            </div>
          </div>

          {/* ── Upcoming trip card ── */}
          <div style={{ margin:'16px 20px 0', background:T.white, borderRadius:20, overflow:'hidden', boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}>
            {/* Photo */}
            <div style={{ position:'relative', height:130 }}>
              <img
                src="https://picsum.photos/seed/chaiten-trip/390/130"
                alt="Chaitén"
                style={{ width:'100%', height:'100%', objectFit:'cover' }}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
              <span style={{ position:'absolute', top:12, left:14, fontSize:10, fontWeight:700, color:T.white, background:T.teal, padding:'4px 10px', borderRadius:100 }}>
                Próximo viaje
              </span>
              <span style={{ position:'absolute', top:12, right:14, fontSize:10, fontWeight:600, color:T.white }}>
                14 Jun 2026
              </span>
            </div>
            {/* Route info */}
            <div style={{ padding:'14px 16px' }}>
              <div style={{ display:'flex', alignItems:'center' }}>
                <div>
                  <p style={{ fontSize:22, fontWeight:900, color:T.dark, letterSpacing:'-0.5px' }}>QCH</p>
                  <p style={{ fontSize:11, color:T.gray, marginTop:1 }}>09:00</p>
                </div>
                <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', padding:'0 12px' }}>
                  <p style={{ fontSize:10, color:T.gray, marginBottom:4 }}>4h 30m</p>
                  <div style={{ width:'100%', display:'flex', alignItems:'center', gap:0 }}>
                    <div style={{ flex:1, borderTop:'1.5px dashed #D0D5DD' }} />
                    <Ship size={14} color={T.teal} style={{ margin:'0 4px' }} />
                    <div style={{ flex:1, borderTop:'1.5px dashed #D0D5DD' }} />
                  </div>
                  <p style={{ fontSize:9, color:T.gray, marginTop:4 }}>Navimag · Directo</p>
                </div>
                <div style={{ textAlign:'right' }}>
                  <p style={{ fontSize:22, fontWeight:900, color:T.dark, letterSpacing:'-0.5px' }}>CHT</p>
                  <p style={{ fontSize:11, color:T.gray, marginTop:1 }}>13:30</p>
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:`1px solid ${T.grayLight}`, marginTop:12, paddingTop:10 }}>
                <span style={{ fontSize:11, color:T.gray }}>Booking ID</span>
                <span style={{ fontSize:11, fontWeight:800, color:T.dark, letterSpacing:1 }}>NV-2026</span>
              </div>
            </div>
          </div>

          {/* ── Category icons ── */}
          <div style={{ display:'flex', justifyContent:'space-between', padding:'20px 20px 0' }}>
            {[
              { label:'Vuelos',  Icon: Plane     },
              { label:'Hoteles', Icon: Building2 },
              { label:'Trenes',  Icon: Train     },
              { label:'Ferry',   Icon: Ship      },
              { label:'Buses',   Icon: Bus       },
            ].map(({ label, Icon }) => (
              <button key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, background:'none', border:'none', cursor:'pointer' }}>
                <div style={{ width:52, height:52, borderRadius:'50%', background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={22} color={T.white} />
                </div>
                <span style={{ fontSize:10, fontWeight:600, color:'rgba(255,255,255,0.9)' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ══ 1 · CÓMO LLEGAR ══════════════════════════════════════════════ */}
        <div style={{ paddingTop:24 }}>
          <SectionHeader title="🗺️ Cómo llegar" />
          <div style={{ display:'flex', gap:12, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
            {COMO_LLEGAR.map(c => (
              <div key={c.id} style={{ width:165, flexShrink:0, borderRadius:16, overflow:'hidden', background:T.white, boxShadow:'0 2px 12px rgba(0,0,0,0.08)', cursor:'pointer' }}>
                <div style={{ height:70, background:`linear-gradient(135deg,${c.color},${c.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>
                  {c.emoji}
                </div>
                <div style={{ padding:'12px 14px' }}>
                  <p style={{ fontSize:15, fontWeight:800, color:T.dark, marginBottom:2 }}>{c.titulo}</p>
                  <p style={{ fontSize:11, color:T.teal, fontWeight:600, marginBottom:4 }}>{c.sub}</p>
                  <p style={{ fontSize:10, color:T.gray, marginBottom:6 }}>{c.detalle}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:10, color:T.gray }}>⏱ {c.duracion}</span>
                    <span style={{ fontSize:12, fontWeight:800, color:T.teal }}>{c.precio}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 2 · DÓNDE DORMIR ═════════════════════════════════════════════ */}
        <div style={{ paddingTop:24 }}>
          <SectionHeader title="🛏️ Dónde dormir" onSeeAll={() => {}} />
          <div style={{ display:'flex', gap:14, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
            {DONDE_DORMIR.map(d => (
              <div key={d.id} style={{ width:156, flexShrink:0, borderRadius:16, overflow:'hidden', background:T.white, boxShadow:'0 2px 14px rgba(0,0,0,0.09)', cursor:'pointer' }}>
                <div style={{ height:105, overflow:'hidden' }}>
                  <img src={d.img} alt={d.nombre} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
                <div style={{ padding:'10px 12px 12px' }}>
                  <p style={{ fontSize:13, fontWeight:800, color:T.dark, lineHeight:1.25, marginBottom:3 }}>{d.nombre}</p>
                  <p style={{ fontSize:10, color:T.gray, marginBottom:7 }}>{d.tipo}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <Stars v={d.rating} />
                    <span style={{ fontSize:13, fontWeight:800, color:T.teal }}>{d.precio}<span style={{ fontSize:10, fontWeight:400, color:T.gray }}>/noche</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 3 · DÓNDE COMER ══════════════════════════════════════════════ */}
        <div style={{ paddingTop:24 }}>
          <SectionHeader title="🍽️ Dónde comer" onSeeAll={() => {}} />
          <div style={{ display:'flex', gap:14, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
            {DONDE_COMER.map(c => (
              <div key={c.id} style={{ width:156, flexShrink:0, borderRadius:16, overflow:'hidden', background:T.white, boxShadow:'0 2px 14px rgba(0,0,0,0.09)', cursor:'pointer' }}>
                <div style={{ height:105, overflow:'hidden' }}>
                  <img src={c.img} alt={c.nombre} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
                <div style={{ padding:'10px 12px 12px' }}>
                  <p style={{ fontSize:13, fontWeight:800, color:T.dark, lineHeight:1.25, marginBottom:3 }}>{c.nombre}</p>
                  <p style={{ fontSize:10, color:T.gray, marginBottom:7 }}>{c.tipo}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <Stars v={c.rating} />
                    <span style={{ fontSize:13, fontWeight:700, color:T.teal }}>{c.precio}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 4 · CÓMO MOVERSE ═════════════════════════════════════════════ */}
        <div style={{ paddingTop:24 }}>
          <SectionHeader title="🚗 Cómo moverse" />
          <div style={{ display:'flex', gap:10, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
            {COMO_MOVERSE.map(m => (
              <div key={m.id} style={{ flexShrink:0, background:T.white, borderRadius:14, padding:'14px 16px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', cursor:'pointer', minWidth:120, textAlign:'center' }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{m.emoji}</div>
                <p style={{ fontSize:12, fontWeight:700, color:T.dark, marginBottom:3 }}>{m.titulo}</p>
                <p style={{ fontSize:10, color:T.gray }}>{m.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 5 · RUTAS COMPROBADAS ════════════════════════════════════════ */}
        <div style={{ paddingTop:24 }}>
          <SectionHeader title="🥾 Rutas comprobadas" onSeeAll={() => {}} />
          <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'0 20px' }}>
            {RUTAS.map(r => (
              <div key={r.id} style={{ display:'flex', alignItems:'center', gap:12, background:T.white, borderRadius:14, padding:'12px 14px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', cursor:'pointer' }}>
                <div style={{ width:48, height:48, borderRadius:12, background:`${r.color}22`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>
                  {r.emoji}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:T.dark, marginBottom:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.nombre}</p>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <span style={{ fontSize:10, color:T.gray }}>📍 {r.distancia}</span>
                    <span style={{ fontSize:10, color:T.gray }}>⏱ {r.tiempo}</span>
                  </div>
                </div>
                <DiffBadge d={r.dificultad} />
              </div>
            ))}
          </div>
        </div>

        {/* ══ 6 · PRINCIPALES ATRACTIVOS ═══════════════════════════════════ */}
        <div style={{ paddingTop:24 }}>
          <SectionHeader title="⭐ Principales atractivos" onSeeAll={() => {}} />
          <div style={{ display:'flex', gap:14, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
            {ATRACTIVOS.map(a => (
              <div key={a.id} style={{ width:156, flexShrink:0, borderRadius:16, overflow:'hidden', background:T.white, boxShadow:'0 2px 14px rgba(0,0,0,0.09)', cursor:'pointer' }}>
                <div style={{ height:105, overflow:'hidden', position:'relative' }}>
                  <img src={a.img} alt={a.nombre} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)' }} />
                </div>
                <div style={{ padding:'10px 12px 12px' }}>
                  <p style={{ fontSize:13, fontWeight:800, color:T.dark, lineHeight:1.25, marginBottom:3 }}>{a.nombre}</p>
                  <p style={{ fontSize:10, color:T.gray, marginBottom:7 }}>{a.sub}</p>
                  <Stars v={a.rating} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 7 · SERVICIOS ════════════════════════════════════════════════ */}
        <div style={{ paddingTop:24 }}>
          <SectionHeader title="🏥 Servicios" />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, padding:'0 20px' }}>
            {SERVICIOS.map(s => (
              <div key={s.id} style={{ background:T.white, borderRadius:14, padding:'14px 10px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', cursor:'pointer' }}>
                <div style={{ fontSize:24, marginBottom:6 }}>{s.emoji}</div>
                <p style={{ fontSize:12, fontWeight:700, color:T.dark, marginBottom:2 }}>{s.titulo}</p>
                <p style={{ fontSize:10, color:T.gray, lineHeight:1.3 }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 8 · ASISTENTE PUDI ═══════════════════════════════════════════ */}
        <div style={{ padding:'24px 20px 0' }}>
          <div style={{ borderRadius:20, background:`linear-gradient(135deg,#0D1F17,${T.tealDark})`, padding:'22px 20px', position:'relative', overflow:'hidden' }}>
            {/* Decorative circles */}
            <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, borderRadius:'50%', background:'rgba(200,241,53,0.1)' }} />
            <div style={{ position:'absolute', bottom:-30, right:20, width:70, height:70, borderRadius:'50%', background:'rgba(200,241,53,0.08)' }} />

            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                <div style={{ width:44, height:44, borderRadius:'50%', background:'#C8F135', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                  🦌
                </div>
                <div>
                  <p style={{ fontSize:16, fontWeight:800, color:T.white, marginBottom:2 }}>Asistente Pudi</p>
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.65)' }}>Tu guía local de Patagonia</p>
                </div>
              </div>

              {/* Chat bubble */}
              <div style={{ background:'rgba(255,255,255,0.12)', borderRadius:14, padding:'12px 14px', marginBottom:14 }}>
                <p style={{ fontSize:13, color:T.white, lineHeight:1.5 }}>
                  "¡Hola! Soy Pudi 🦌 ¿Qué quieres saber sobre Chaitén? Puedo ayudarte con rutas, alojamiento, transporte y más."
                </p>
              </div>

              <button style={{ display:'flex', alignItems:'center', gap:8, background:'#C8F135', color:'#0D1F17', fontWeight:800, fontSize:14, padding:'12px 20px', borderRadius:100, border:'none', cursor:'pointer', width:'100%', justifyContent:'center' }}>
                <MessageCircle size={18} />
                Pregúntale a Pudi
              </button>
            </div>
          </div>
        </div>

        {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
        <div style={{ padding:'28px 20px 0', background:T.bg }}>
          <div style={{ background:'#0D1F17', borderRadius:20, padding:'24px 20px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <span style={{ fontSize:28 }}>🌿</span>
              <div>
                <p style={{ fontSize:16, fontWeight:800, color:T.white }}>Chaitén Patagonia</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)' }}>Puerta a la Patagonia Norte</p>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
              {[
                ['📞','Emergencias','131 · 133'],
                ['🏥','Hospital','(65) 2 731 244'],
                ['⛴️','Ferry Navimag','(65) 2 270 430'],
                ['✈️','Aerocord','(65) 2 254 411'],
              ].map(([emoji, label, val]) => (
                <div key={label as string} style={{ background:'rgba(255,255,255,0.07)', borderRadius:10, padding:'10px 12px' }}>
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginBottom:2 }}>{emoji} {label}</p>
                  <p style={{ fontSize:12, fontWeight:700, color:T.white }}>{val}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:14, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <p style={{ fontSize:10, color:'rgba(255,255,255,0.35)' }}>© 2026 Chaitén Patagonia</p>
              <div style={{ display:'flex', gap:10 }}>
                {['🌐','📘','📷'].map(e => (
                  <button key={e} style={{ width:30, height:30, borderRadius:'50%', background:'rgba(255,255,255,0.1)', border:'none', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>{e}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height:90 }} />
      </div>

      {/* ════ BOTTOM NAV ══════════════════════════════════════════════════ */}
      <nav style={{ display:'flex', justifyContent:'space-around', alignItems:'flex-end', background:T.white, paddingBottom:'env(safe-area-inset-bottom,8px)', paddingTop:8, borderTop:`1px solid ${T.grayLight}`, boxShadow:'0 -4px 20px rgba(0,0,0,0.06)', flexShrink:0, position:'relative' }}>
        {([
          { id:'home'   as NavTab, Icon:Home,        label:'Inicio'  },
          { id:'rutas'  as NavTab, Icon:ShoppingBag, label:'Rutas'   },
        ]).map(({ id, Icon, label }) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'6px 18px', background:'none', border:'none', cursor:'pointer' }}>
              <Icon size={22} color={active ? T.teal : '#BDBDBD'} />
              <span style={{ fontSize:10, fontWeight:active?700:400, color:active?T.teal:'#BDBDBD' }}>{label}</span>
              {active && <div style={{ width:4, height:4, borderRadius:'50%', background:T.teal }} />}
            </button>
          );
        })}

        {/* ── PUDI centro elevado ── */}
        <button
          onClick={() => setTab('pudi')}
          style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:4,
            background:'none', border:'none', cursor:'pointer',
            position:'relative', marginBottom:4,
          }}
        >
          <div style={{
            width:58, height:58, borderRadius:'50%',
            background: tab === 'pudi'
              ? 'linear-gradient(135deg,#0D1F17,#0A7A75)'
              : 'linear-gradient(135deg,#C8F135,#a8d020)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:26,
            boxShadow: tab === 'pudi'
              ? '0 4px 18px rgba(13,165,160,0.45)'
              : '0 4px 18px rgba(200,241,53,0.5)',
            border:`3px solid ${T.white}`,
            marginTop:-22,
          }}>
            🦌
          </div>
          <span style={{ fontSize:10, fontWeight:700, color: tab === 'pudi' ? T.teal : T.gray }}>Pudi</span>
        </button>

        {([
          { id:'ofertas' as NavTab, Icon:Tag,  label:'Ofertas' },
          { id:'cuenta'  as NavTab, Icon:User, label:'Cuenta'  },
        ]).map(({ id, Icon, label }) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'6px 18px', background:'none', border:'none', cursor:'pointer' }}>
              <Icon size={22} color={active ? T.teal : '#BDBDBD'} />
              <span style={{ fontSize:10, fontWeight:active?700:400, color:active?T.teal:'#BDBDBD' }}>{label}</span>
              {active && <div style={{ width:4, height:4, borderRadius:'50%', background:T.teal }} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
