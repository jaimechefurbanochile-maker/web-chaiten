import { useState } from 'react';
import {
  Search, Home, Compass, Info, ShieldCheck as NavShield,
  ChevronRight, Star, Building2, Ship, Bus, Plane,
  AlertCircle, Fuel, Banknote, Stethoscope, ShieldCheck, Wifi, MessageCircle,
  Utensils, Car, Phone, Send, MapPin, TreePine, Clock,
  Mountain, Waves, Droplets, Flame, Pill, HeartPulse,
  Bike, Footprints, Truck, CloudRain, Thermometer, Sun, Sunrise, Route, DollarSign,
  CalendarDays, Wind, Users,
} from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

const T = {
  teal:      '#0DA5A0',
  tealDark:  '#0A7A75',
  tealBg:    '#E8F6F6',
  white:     '#FFFFFF',
  bg:        '#F5F6FA',
  dark:      '#1C2E3A',
  gray:      '#9E9EA7',
  grayLight: '#EAEAEA',
  star:      '#FBBF24',
  accent:    '#C8F135',
  green:     '#16a34a',
  red:       '#dc2626',
  orange:    '#d97706',
};

type NavTab = 'home' | 'explorar' | 'pudi' | 'servicios' | 'info';
type Dificultad = 'Fácil' | 'Media' | 'Alta';

// ─── Data ────────────────────────────────────────────────────────────────────

const ATRACTIVOS = [
  { id:'a1', nombre:'Volcán Corcovado',    sub:'Icono patagónico',          tipo:'Naturaleza', img:'https://picsum.photos/seed/volcan-co/400/240',  rating:4.9, precio:'Gratis',    dias:'1 día'    },
  { id:'a2', nombre:'Parque Pumalín',      sub:'Bosque valdiviano virgen',  tipo:'Naturaleza', img:'https://picsum.photos/seed/pumalin-at/400/240', rating:4.9, precio:'Gratis',    dias:'1-3 días' },
  { id:'a3', nombre:'Fiordos Patagónicos', sub:'Paisajes únicos en bote',   tipo:'Aventura',   img:'https://picsum.photos/seed/fiordos-at/400/240', rating:4.8, precio:'desde $45', dias:'4h'       },
  { id:'a4', nombre:'Termas El Amarillo',  sub:'Aguas termales naturales',  tipo:'Naturaleza', img:'https://picsum.photos/seed/termas-at/400/240',  rating:4.7, precio:'desde $8',  dias:'Día'      },
  { id:'a5', nombre:'Río Yelcho',          sub:'Pesca y rafting',           tipo:'Aventura',   img:'https://picsum.photos/seed/yelcho-at/400/240',  rating:4.6, precio:'desde $30', dias:'Medio día' },
  { id:'a6', nombre:'Centro Histórico',    sub:'Patrimonio post-erupción',  tipo:'Cultura',    img:'https://picsum.photos/seed/centro-ch/400/240',  rating:4.4, precio:'Gratis',    dias:'2h'       },
];

const COMO_LLEGAR = [
  { id:'ferry', Icon: Ship,  titulo:'Ferry',  sub:'Quellón → Chaitén',      detalle:'Navimag · TMC',         duracion:'4h 30m', precio:'desde $35',  color:'#0d4a7a' },
  { id:'bus',   Icon: Bus,   titulo:'Bus',    sub:'Puerto Montt → Chaitén', detalle:'Tur-Bus · Queilen Bus', duracion:'8h',     precio:'desde $18',  color:'#1a4a2a' },
  { id:'avion', Icon: Plane, titulo:'Avión',  sub:'Puerto Montt → Chaitén', detalle:'Aerocord · charter',    duracion:'45 min', precio:'desde $120', color:'#3a1a6a' },
];

const ALOJAMIENTOS = [
  { id:'d1', nombre:'Hospedaje Mi Casa',    tipo:'Hospedaje familiar',    rating:4.8, precio:'$35', img:'https://picsum.photos/seed/hospedaje-mc/160/160' },
  { id:'d2', nombre:'Cabañas Bosque Verde', tipo:'Cabaña de montaña',     rating:4.9, precio:'$55', img:'https://picsum.photos/seed/cabana-bv/160/160'    },
  { id:'d3', nombre:'Hotel Los Volcanes',   tipo:'Hotel céntrico',        rating:4.6, precio:'$48', img:'https://picsum.photos/seed/hotel-lv/160/160'     },
  { id:'d4', nombre:'Camping Pumalín',      tipo:'Camping con servicios', rating:4.7, precio:'$8',  img:'https://picsum.photos/seed/camping-pm/160/160'   },
];

const GASTRONOMIA = [
  { id:'c1', nombre:'Restobar El Volcán',    tipo:'Mariscos · Cocina local', rating:4.7, precio:'$$', img:'https://picsum.photos/seed/resto-ev/160/160',  horario:'12:00–22:00' },
  { id:'c2', nombre:'Café Patagonia',        tipo:'Café · Desayunos',        rating:4.8, precio:'$',  img:'https://picsum.photos/seed/cafe-pt/160/160',   horario:'08:00–20:00' },
  { id:'c3', nombre:'Picada Don Jaime',      tipo:'Comida casera',            rating:4.6, precio:'$',  img:'https://picsum.photos/seed/picada-dj/160/160', horario:'11:00–21:00' },
  { id:'c4', nombre:'Marisquería El Puerto', tipo:'Mariscos · Vista al mar',  rating:4.9, precio:'$$', img:'https://picsum.photos/seed/marisq-ep/160/160', horario:'12:00–23:00' },
];

const RUTAS = [
  { id:'r1', nombre:'Sendero Volcán Corcovado',  distancia:'18 km', tiempo:'8h',        dificultad:'Alta'  as Dificultad, Icon: Flame,    color:'#7a1a1a' },
  { id:'r2', nombre:'Trekking Pumalín Cascadas', distancia:'6 km',  tiempo:'3h',        dificultad:'Fácil' as Dificultad, Icon: TreePine, color:'#1a5a2a' },
  { id:'r3', nombre:'Ruta Costera Chaitén',      distancia:'12 km', tiempo:'5h',        dificultad:'Media' as Dificultad, Icon: Waves,    color:'#0a3a6a' },
  { id:'r4', nombre:'Sendero Río Blanco',        distancia:'8 km',  tiempo:'4h',        dificultad:'Media' as Dificultad, Icon: Mountain, color:'#2a4a1a' },
  { id:'r5', nombre:'Termas El Amarillo',        distancia:'52 km', tiempo:'1h (auto)', dificultad:'Fácil' as Dificultad, Icon: Droplets, color:'#5a3a0a' },
];

const SERVICIOS_ESENCIALES = [
  { id:'s1', titulo:'Hospital de Chaitén', sub:'Av. Carretera 123',       tel:'(65) 2 731 244', Icon: Stethoscope },
  { id:'s2', titulo:'Farmacia Cruz Verde', sub:"Calle O'Higgins 44",      tel:'(65) 2 730 521', Icon: Pill        },
  { id:'s3', titulo:'Carabineros',         sub:'Comisaría central',        tel:'133',            Icon: ShieldCheck },
  { id:'s4', titulo:'Bomberos',            sub:'Cuerpo de Bomberos',       tel:'132',            Icon: Flame       },
  { id:'s5', titulo:'BancoEstado / ATM',   sub:'Av. Corcovado s/n',        tel: null,            Icon: Banknote    },
  { id:'s6', titulo:'Copec',               sub:'Ruta 7 km 1',              tel: null,            Icon: Fuel        },
  { id:'s7', titulo:'ENAP',                sub:'Acceso Norte',             tel: null,            Icon: Fuel        },
  { id:'s8', titulo:'WiFi Municipal',      sub:'Plaza de Armas y Centro',  tel: null,            Icon: Wifi        },
];

const TIPS = [
  { Icon: CloudRain,    titulo:'Lleva capas',       texto:'El clima cambia rápido. Siempre lleva ropa impermeable y de abrigo.' },
  { Icon: Banknote,     titulo:'Lleva efectivo',    texto:'Los cajeros son limitados. BancoEstado es el más confiable.' },
  { Icon: Fuel,         titulo:'Carga combustible', texto:'En la Carretera Austral las estaciones son escasas. Carga en Chaitén.' },
  { Icon: Wifi,         titulo:'Señal limitada',    texto:'Claro y Entel tienen cobertura básica. El WiFi municipal es gratuito.' },
  { Icon: CalendarDays, titulo:'Mejor época',       texto:'Nov–Mar para senderismo. Abr–Oct para tranquilidad y precios bajos.' },
  { Icon: Car,          titulo:'Arriendo 4x4',      texto:'Para rutas fuera del pueblo se recomienda vehículo de doble tracción.' },
];

const TEMPORADAS = [
  { mes:'Verano',    periodo:'Dic–Mar', Icon: Sun,       desc:'Ideal para trekking y actividades al aire libre. Días largos.', color:'#f59e0b' },
  { mes:'Otoño',     periodo:'Abr–May', Icon: Wind,      desc:'Colores del bosque, menos visitantes. Buen clima en general.',  color:'#d97706' },
  { mes:'Invierno',  periodo:'Jun–Ago', Icon: CloudRain, desc:'Lluvia y frío. Algunos senderos cerrados. Poca concurrencia.', color:'#0a3a6a' },
  { mes:'Primavera', periodo:'Sep–Nov', Icon: TreePine,  desc:'Flora renace. Aguas abundantes. Prepárate para lluvia también.', color:T.teal   },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

function DiffBadge({ d }: { d: Dificultad }) {
  const c: Record<Dificultad, string> = { 'Fácil':T.green, 'Media':T.orange, 'Alta':T.red };
  return <span style={{ fontSize:10, fontWeight:700, color:'#fff', background:c[d], padding:'3px 8px', borderRadius:100 }}>{d}</span>;
}

// ─── Teal Header ─────────────────────────────────────────────────────────────

function TealHeader({ title, subtitle, showSearch = true, searchPlaceholder = '¿Qué estás buscando?' }: {
  title: string; subtitle?: string; showSearch?: boolean; searchPlaceholder?: string;
}) {
  return (
    <div style={{ background:T.teal, paddingBottom:showSearch ? 36 : 28 }}>
      <div style={{ padding:'52px 20px 0' }}>
        <h1 style={{ fontSize:28, fontWeight:800, color:T.white, letterSpacing:'-0.5px', lineHeight:1.2, margin:0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize:13, color:'rgba(255,255,255,0.8)', marginTop:4 }}>{subtitle}</p>}
      </div>
      {showSearch && (
        <div style={{ margin:'16px 20px 0', display:'flex', alignItems:'center', gap:10, background:T.white, borderRadius:14, padding:'14px 18px' }}>
          <Search size={18} color='#C0C0C0' />
          <span style={{ fontSize:14, color:'#C0C0C0' }}>{searchPlaceholder}</span>
        </div>
      )}
    </div>
  );
}

// ─── Attraction Card ──────────────────────────────────────────────────────────

function AttractivoCard({ a }: { a: typeof ATRACTIVOS[0] }) {
  return (
    <div style={{ width:210, flexShrink:0, borderRadius:18, overflow:'hidden', background:T.white, boxShadow:'0 4px 20px rgba(0,0,0,0.10)', cursor:'pointer' }}>
      <div style={{ height:130, overflow:'hidden', position:'relative' }}>
        <img src={a.img} alt={a.nombre} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.35) 0%,transparent 55%)' }} />
        <span style={{ position:'absolute', bottom:10, right:10, background:T.teal, color:'#fff', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100 }}>{a.dias}</span>
      </div>
      <div style={{ padding:'12px 14px 14px' }}>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:3 }}>{a.nombre}</p>
        <p style={{ fontSize:11, color:T.gray, marginBottom:10 }}>{a.sub}</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Stars v={a.rating} />
          <span style={{ fontSize:11, color:T.gray }}>Desde <span style={{ fontWeight:800, color:T.teal }}>{a.precio}</span></span>
        </div>
      </div>
    </div>
  );
}

// ─── List Row ─────────────────────────────────────────────────────────────────

function ListRow({ img, title, sub, rating, right, last = false }: {
  img: string; title: string; sub: string; rating: number; right?: string; last?: boolean;
}) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, background:T.white, padding:'14px', borderBottom:last?'none':`1px solid ${T.grayLight}`, cursor:'pointer' }}>
      <div style={{ width:74, height:74, borderRadius:12, overflow:'hidden', flexShrink:0 }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ fontSize:14, fontWeight:700, color:T.teal, marginBottom:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{title}</p>
        <p style={{ fontSize:11, color:T.gray, marginBottom:8 }}>{sub}</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Stars v={rating} />
          {right && <span style={{ fontSize:12, fontWeight:700, color:T.dark }}>{right}</span>}
        </div>
      </div>
    </div>
  );
}

function ListCard({ children, first = false, last = false }: { children: React.ReactNode; first?: boolean; last?: boolean }) {
  return (
    <div style={{
      background:T.white,
      borderRadius: first && last ? 16 : first ? '16px 16px 0 0' : last ? '0 0 16px 16px' : 0,
      overflow:'hidden',
      boxShadow: first ? '0 4px 16px rgba(0,0,0,0.07)' : 'none',
    }}>
      {children}
    </div>
  );
}

// ─── HOME TAB ─────────────────────────────────────────────────────────────────

function HomeTab({ wx }: { wx: ReturnType<typeof useWeather> }) {
  return (
    <>
      {/* Header */}
      <div style={{ background:T.teal, paddingBottom:36 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'52px 20px 0' }}>
          <div>
            <h1 style={{ fontSize:34, fontWeight:800, color:T.white, letterSpacing:'-0.5px', lineHeight:1.1, margin:0 }}>Hola, viajero</h1>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:5 }}>
              <Sun size={14} color="#FBBF24" />
              <span style={{ fontSize:13, color:'rgba(255,255,255,0.9)', fontWeight:500 }}>
                {wx.loading ? '...' : `${wx.temp}°C · ${wx.description}`}
              </span>
            </div>
          </div>
          <div style={{ width:50, height:50, borderRadius:'50%', background:'rgba(255,255,255,0.25)', border:'2px solid rgba(255,255,255,0.5)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Users size={24} color="rgba(255,255,255,0.9)" />
          </div>
        </div>
        <div style={{ margin:'18px 20px 0', display:'flex', alignItems:'center', gap:10, background:T.white, borderRadius:14, padding:'14px 18px' }}>
          <Search size={18} color='#C0C0C0' />
          <span style={{ fontSize:14, color:'#C0C0C0' }}>¿Qué quieres explorar?</span>
        </div>
      </div>

      {/* Tarjeta "Chaitén hoy" */}
      <div style={{ margin:'-22px 16px 0', background:T.white, borderRadius:20, padding:'16px 18px 18px', boxShadow:'0 6px 32px rgba(0,0,0,0.12)', position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <span style={{ fontSize:11, fontWeight:700, color:T.white, background:T.teal, padding:'4px 14px', borderRadius:100 }}>Chaitén hoy</span>
          <span style={{ fontSize:11, color:T.gray }}>Patagonia Norte · Chile</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {[
            { Icon: Thermometer, label:'Temperatura',     value: wx.loading ? '...' : `${wx.temp}°C · ${wx.description}`, color: T.dark  },
            { Icon: Route,       label:'Carretera Austral', value:'Transitable',  color: T.green },
            { Icon: Ship,        label:'Ferry Navimag',   value:'Operativo',     color: T.green },
            { Icon: Sunrise,     label:'Amanecer · Puesta', value:'07:42 · 17:18', color: T.dark },
          ].map(item => (
            <div key={item.label} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:34, height:34, borderRadius:8, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <item.Icon size={18} color={T.teal} />
              </div>
              <div>
                <p style={{ fontSize:10, color:T.gray, marginBottom:1 }}>{item.label}</p>
                <p style={{ fontSize:12, fontWeight:700, color:item.color, lineHeight:1.3 }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categorías del destino */}
      <div style={{ padding:'26px 20px 0' }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          {[
            { label:'Qué hacer', Icon:Compass   },
            { label:'Dormir',    Icon:Building2  },
            { label:'Comer',     Icon:Utensils   },
            { label:'Naturaleza',Icon:TreePine   },
            { label:'Moverse',   Icon:Car        },
          ].map(({ label, Icon }) => (
            <button key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7, background:'none', border:'none', cursor:'pointer' }}>
              <div style={{ width:54, height:54, borderRadius:'50%', border:`1.5px solid ${T.teal}`, background:'rgba(13,165,160,0.07)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon size={22} color={T.teal} />
              </div>
              <span style={{ fontSize:10, fontWeight:600, color:T.dark, textAlign:'center', lineHeight:1.2 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Principales atractivos */}
      <div style={{ paddingTop:28 }}>
        <SectionHeader title="Principales atractivos" onSeeAll={() => {}} />
        <div style={{ display:'flex', gap:14, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
          {ATRACTIVOS.map(a => <AttractivoCard key={a.id} a={a} />)}
        </div>
      </div>

      {/* Cómo llegar */}
      <div style={{ paddingTop:28 }}>
        <SectionHeader title="Cómo llegar" />
        <div style={{ display:'flex', gap:12, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
          {COMO_LLEGAR.map(c => (
            <div key={c.id} style={{ width:168, flexShrink:0, borderRadius:18, overflow:'hidden', background:T.white, boxShadow:'0 4px 16px rgba(0,0,0,0.08)', cursor:'pointer' }}>
              <div style={{ height:72, background:`linear-gradient(135deg,${c.color},${c.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <c.Icon size={34} color="rgba(255,255,255,0.9)" />
              </div>
              <div style={{ padding:'12px 14px 14px' }}>
                <p style={{ fontSize:15, fontWeight:800, color:T.dark, marginBottom:3 }}>{c.titulo}</p>
                <p style={{ fontSize:11, color:T.teal, fontWeight:600, marginBottom:4 }}>{c.sub}</p>
                <p style={{ fontSize:10, color:T.gray, marginBottom:8 }}>{c.detalle}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:3, fontSize:10, color:T.gray }}>
                    <Clock size={10} color={T.gray} /> {c.duracion}
                  </span>
                  <span style={{ fontSize:12, fontWeight:800, color:T.teal }}>{c.precio}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alojamientos */}
      <div style={{ paddingTop:28 }}>
        <SectionHeader title="Alojamientos recomendados" onSeeAll={() => {}} />
        <div style={{ padding:'0 20px' }}>
          <ListCard first last>
            {ALOJAMIENTOS.map((d, i) => (
              <ListRow key={d.id} img={d.img} title={d.nombre} sub={d.tipo} rating={d.rating} right={`${d.precio}/noche`} last={i === ALOJAMIENTOS.length - 1} />
            ))}
          </ListCard>
        </div>
      </div>

      {/* Gastronomía */}
      <div style={{ paddingTop:28 }}>
        <SectionHeader title="Gastronomía local" onSeeAll={() => {}} />
        <div style={{ padding:'0 20px' }}>
          <ListCard first last>
            {GASTRONOMIA.map((c, i) => (
              <div key={c.id} style={{ display:'flex', alignItems:'center', gap:14, background:T.white, padding:'14px', borderBottom:i < GASTRONOMIA.length-1 ? `1px solid ${T.grayLight}` : 'none', cursor:'pointer' }}>
                <div style={{ width:74, height:74, borderRadius:12, overflow:'hidden', flexShrink:0 }}>
                  <img src={c.img} alt={c.nombre} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:14, fontWeight:700, color:T.teal, marginBottom:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.nombre}</p>
                  <p style={{ fontSize:11, color:T.gray, marginBottom:6 }}>{c.tipo}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <Stars v={c.rating} />
                    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <Clock size={10} color={T.gray} />
                      <span style={{ fontSize:10, color:T.gray }}>{c.horario}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ListCard>
        </div>
      </div>

      {/* Rutas y senderos */}
      <div style={{ paddingTop:28 }}>
        <SectionHeader title="Rutas y senderos" onSeeAll={() => {}} />
        <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'0 20px' }}>
          {RUTAS.map(r => (
            <div key={r.id} style={{ display:'flex', alignItems:'center', gap:12, background:T.white, borderRadius:16, padding:'12px 14px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', cursor:'pointer' }}>
              <div style={{ width:48, height:48, borderRadius:12, background:`${r.color}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <r.Icon size={24} color={r.color} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:13, fontWeight:700, color:T.dark, marginBottom:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.nombre}</p>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:3, fontSize:10, color:T.gray }}><MapPin size={10} color={T.gray} /> {r.distancia}</span>
                  <span style={{ display:'flex', alignItems:'center', gap:3, fontSize:10, color:T.gray }}><Clock size={10} color={T.gray} /> {r.tiempo}</span>
                </div>
              </div>
              <DiffBadge d={r.dificultad} />
            </div>
          ))}
        </div>
      </div>

      {/* Pudi */}
      <div style={{ padding:'28px 20px 0' }}>
        <div style={{ borderRadius:20, background:`linear-gradient(135deg,#0D1F17,${T.tealDark})`, padding:'22px 20px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, borderRadius:'50%', background:'rgba(200,241,53,0.1)' }} />
          <div style={{ position:'absolute', bottom:-30, right:20, width:70, height:70, borderRadius:'50%', background:'rgba(200,241,53,0.08)' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <div style={{ width:44, height:44, borderRadius:'50%', background:'#C8F135', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>🦌</div>
              <div>
                <p style={{ fontSize:16, fontWeight:800, color:T.white, marginBottom:2 }}>Asistente Pudi</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.65)' }}>Tu guía local de Patagonia</p>
              </div>
            </div>
            <div style={{ background:'rgba(255,255,255,0.12)', borderRadius:14, padding:'12px 14px', marginBottom:14 }}>
              <p style={{ fontSize:13, color:T.white, lineHeight:1.5 }}>
                "¡Hola! Soy Pudi 🦌 ¿Qué quieres saber sobre Chaitén? Rutas, alojamiento, transporte y más."
              </p>
            </div>
            <button style={{ display:'flex', alignItems:'center', gap:8, background:'#C8F135', color:'#0D1F17', fontWeight:800, fontSize:14, padding:'12px 20px', borderRadius:100, border:'none', cursor:'pointer', width:'100%', justifyContent:'center' }}>
              <MessageCircle size={18} />Pregúntale a Pudi
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding:'28px 20px 0' }}>
        <div style={{ background:'#0D1F17', borderRadius:20, padding:'24px 20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <TreePine size={22} color={T.accent} />
            </div>
            <div>
              <p style={{ fontSize:16, fontWeight:800, color:T.white }}>Chaitén Patagonia</p>
              <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)' }}>Puerta a la Patagonia Norte</p>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
            {[
              { Icon: Phone,       label:'Emergencias',   val:'131 · 133'      },
              { Icon: Stethoscope, label:'Hospital',      val:'(65) 2 731 244' },
              { Icon: Ship,        label:'Ferry Navimag', val:'(65) 2 270 430' },
              { Icon: Plane,       label:'Aerocord',      val:'(65) 2 254 411' },
            ].map(({ Icon, label, val }) => (
              <div key={label} style={{ background:'rgba(255,255,255,0.07)', borderRadius:10, padding:'10px 12px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:2 }}>
                  <Icon size={10} color='rgba(255,255,255,0.5)' />
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)' }}>{label}</p>
                </div>
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
      <div style={{ height:16 }} />
    </>
  );
}

// ─── EXPLORAR TAB ─────────────────────────────────────────────────────────────

function ExplorarTab() {
  const [filtro, setFiltro] = useState('Todo');
  const filtros = ['Todo','Naturaleza','Aventura','Cultura','Gastronomía'];
  const filtrados = filtro === 'Todo' || filtro === 'Gastronomía'
    ? ATRACTIVOS
    : ATRACTIVOS.filter(a => a.tipo === filtro);

  return (
    <>
      <TealHeader title="Explorar Chaitén" subtitle="Descubre todo lo que ofrece la Patagonia" searchPlaceholder="Busca lugares, rutas, comida…" />

      {/* Filter pills */}
      <div style={{ padding:'20px 20px 0', display:'flex', gap:8, overflowX:'auto' }} className="hide-scrollbar">
        {filtros.map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            style={{
              flexShrink:0, padding:'8px 16px', borderRadius:100, fontSize:12, fontWeight:600, border:'none', cursor:'pointer',
              background: filtro === f ? T.teal : T.white,
              color: filtro === f ? T.white : T.dark,
              boxShadow: filtro === f ? '0 2px 8px rgba(13,165,160,0.3)' : '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Atractivos grid */}
      <div style={{ padding:'20px 20px 0', display:'flex', flexDirection:'column', gap:10 }}>
        {(filtro === 'Gastronomía' ? GASTRONOMIA : filtrados).map(a => (
          <div key={a.id} style={{ borderRadius:18, overflow:'hidden', background:T.white, boxShadow:'0 4px 16px rgba(0,0,0,0.08)', cursor:'pointer' }}>
            <div style={{ height:160, overflow:'hidden', position:'relative' }}>
              <img src={a.img} alt={a.nombre} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 50%)' }} />
              <span style={{ position:'absolute', top:12, left:12, background:'rgba(0,0,0,0.4)', color:'#fff', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100, backdropFilter:'blur(4px)' }}>{a.tipo}</span>
              {'dias' in a && a.dias && (
                <span style={{ position:'absolute', bottom:12, right:12, background:T.teal, color:'#fff', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100 }}>{(a as typeof ATRACTIVOS[0]).dias}</span>
              )}
              <div style={{ position:'absolute', bottom:12, left:12 }}>
                <p style={{ fontSize:16, fontWeight:800, color:'#fff' }}>{a.nombre}</p>
                <p style={{ fontSize:12, color:'rgba(255,255,255,0.85)' }}>{'sub' in a ? (a as typeof ATRACTIVOS[0]).sub : (a as typeof GASTRONOMIA[0]).tipo}</p>
              </div>
            </div>
            <div style={{ padding:'12px 16px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <Stars v={a.rating} />
              <span style={{ fontSize:12, fontWeight:700, color:T.teal }}>Desde {a.precio}</span>
            </div>
          </div>
        ))}
        {filtrados.length === 0 && filtro !== 'Gastronomía' && (
          <div style={{ textAlign:'center', padding:'40px 20px', color:T.gray }}>
            <div style={{ width:56, height:56, borderRadius:16, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
              <Search size={28} color={T.gray} />
            </div>
            <p style={{ fontSize:14 }}>No hay resultados para este filtro</p>
          </div>
        )}
      </div>

      {/* Rutas section */}
      {(filtro === 'Todo' || filtro === 'Aventura') && (
        <div style={{ paddingTop:24 }}>
          <SectionHeader title="Rutas y senderos" />
          <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'0 20px' }}>
            {RUTAS.map(r => (
              <div key={r.id} style={{ display:'flex', alignItems:'center', gap:12, background:T.white, borderRadius:16, padding:'12px 14px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', cursor:'pointer' }}>
                <div style={{ width:48, height:48, borderRadius:12, background:`${r.color}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <r.Icon size={24} color={r.color} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:T.dark, marginBottom:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.nombre}</p>
                  <div style={{ display:'flex', gap:8 }}>
                    <span style={{ display:'flex', alignItems:'center', gap:3, fontSize:10, color:T.gray }}><MapPin size={10} color={T.gray} /> {r.distancia}</span>
                    <span style={{ display:'flex', alignItems:'center', gap:3, fontSize:10, color:T.gray }}><Clock size={10} color={T.gray} /> {r.tiempo}</span>
                  </div>
                </div>
                <DiffBadge d={r.dificultad} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ height:24 }} />
    </>
  );
}

// ─── PUDI TAB ─────────────────────────────────────────────────────────────────

const PUDI_MSGS = [
  { from:'pudi', text:'¡Hola! Soy Pudi 🦌, tu guía local en Chaitén. ¿En qué puedo ayudarte hoy?' },
  { from:'pudi', text:'Puedo orientarte sobre rutas, alojamiento, gastronomía, transporte o servicios de emergencia.' },
];

const QUICK_Q = ['¿Cómo llegar?','¿Qué hacer hoy?','Mejor ruta para mañana','Restaurantes cerca','Número de emergencias'];

function PudiTab() {
  const [msgs, setMsgs] = useState(PUDI_MSGS);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m,
      { from:'user', text },
      { from:'pudi', text:'Gracias por tu pregunta. Estamos trabajando para que Pudi pueda responderte en tiempo real. Por ahora, explora las secciones de la app para encontrar lo que buscas. 🌿' },
    ]);
    setInput('');
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,#0D1F17,${T.tealDark})`, padding:'52px 20px 20px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:52, height:52, borderRadius:'50%', background:'#C8F135', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>🦌</div>
          <div>
            <p style={{ fontSize:20, fontWeight:800, color:T.white }}>Asistente Pudi</p>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'#C8F135' }} />
              <p style={{ fontSize:12, color:'rgba(255,255,255,0.7)' }}>Guía local de Patagonia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'16px 16px 0', display:'flex', flexDirection:'column', gap:10 }} className="hide-scrollbar">
        {msgs.map((m, i) => (
          <div key={i} style={{ display:'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start', gap:8, alignItems:'flex-end' }}>
            {m.from === 'pudi' && (
              <div style={{ width:30, height:30, borderRadius:'50%', background:'#C8F135', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>🦌</div>
            )}
            <div style={{
              maxWidth:'78%', padding:'10px 14px', borderRadius: m.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.from === 'user' ? T.teal : T.white,
              color: m.from === 'user' ? T.white : T.dark,
              fontSize:13, lineHeight:1.5,
              boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
            }}>
              {m.text}
            </div>
          </div>
        ))}
        <div style={{ height:8 }} />
      </div>

      {/* Quick questions */}
      <div style={{ padding:'12px 16px 0', flexShrink:0 }}>
        <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:8 }} className="hide-scrollbar">
          {QUICK_Q.map(q => (
            <button key={q} onClick={() => send(q)} style={{ flexShrink:0, padding:'7px 14px', borderRadius:100, fontSize:11, fontWeight:600, background:T.tealBg, color:T.teal, border:`1px solid ${T.teal}`, cursor:'pointer' }}>{q}</button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ padding:'8px 16px 12px', display:'flex', gap:10, alignItems:'center', background:T.white, borderTop:`1px solid ${T.grayLight}`, flexShrink:0 }}>
        <input
          className="app-input"
          style={{ flex:1, padding:'12px 16px', borderRadius:24 }}
          placeholder="Escribe tu pregunta…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
        />
        <button onClick={() => send(input)} style={{ width:44, height:44, borderRadius:'50%', background:T.teal, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Send size={18} color={T.white} />
        </button>
      </div>
    </div>
  );
}

// ─── SERVICIOS TAB ────────────────────────────────────────────────────────────

function ServiciosTab() {
  return (
    <>
      <TealHeader title="Servicios en Chaitén" subtitle="Todo lo que necesitas en el destino" showSearch={false} />

      {/* Emergencias banner */}
      <div style={{ margin:'20px 20px 0', background:'#FEF2F2', borderRadius:16, padding:'16px', border:`1.5px solid #FECACA` }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'#FECACA', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <AlertCircle size={20} color={T.red} />
          </div>
          <p style={{ fontSize:15, fontWeight:800, color:T.red }}>Números de emergencia</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {[
            { Icon: HeartPulse,  label:'Ambulancia',  num:'131'             },
            { Icon: Flame,       label:'Bomberos',    num:'132'             },
            { Icon: ShieldCheck, label:'Carabineros', num:'133'             },
            { Icon: Stethoscope, label:'Urgencia',    num:'(65) 2 731 244'  },
          ].map(({ Icon, label, num }) => (
            <button key={label} style={{ display:'flex', alignItems:'center', gap:8, background:T.white, borderRadius:10, padding:'10px 12px', border:`1px solid #FECACA`, cursor:'pointer' }}>
              <div style={{ width:32, height:32, borderRadius:8, background:'#FEF2F2', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={16} color={T.red} />
              </div>
              <div style={{ textAlign:'left' }}>
                <p style={{ fontSize:10, color:T.gray }}>{label}</p>
                <p style={{ fontSize:14, fontWeight:800, color:T.red }}>{num}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Servicios grid */}
      <div style={{ paddingTop:24 }}>
        <SectionHeader title="Servicios locales" />
        <div style={{ padding:'0 20px' }}>
          <ListCard first last>
            {SERVICIOS_ESENCIALES.map((s, i) => (
              <div key={s.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px', borderBottom: i < SERVICIOS_ESENCIALES.length-1 ? `1px solid ${T.grayLight}` : 'none', cursor:'pointer' }}>
                <div style={{ width:48, height:48, borderRadius:12, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <s.Icon size={22} color={T.teal} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:T.dark, marginBottom:2 }}>{s.titulo}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <MapPin size={10} color={T.gray} />
                    <p style={{ fontSize:11, color:T.gray }}>{s.sub}</p>
                  </div>
                </div>
                {s.tel && (
                  <button style={{ display:'flex', alignItems:'center', gap:4, background:T.tealBg, border:`1px solid ${T.teal}`, borderRadius:100, padding:'6px 12px', cursor:'pointer', color:T.teal, fontSize:12, fontWeight:600, flexShrink:0 }}>
                    <Phone size={12} color={T.teal} />
                    {s.tel}
                  </button>
                )}
              </div>
            ))}
          </ListCard>
        </div>
      </div>

      {/* Cómo moverse */}
      <div style={{ paddingTop:24 }}>
        <SectionHeader title="Cómo moverse" />
        <div style={{ display:'flex', gap:10, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
          {[
            { Icon: Car,        titulo:'Remis / Taxi', sub:'Servicio local 24h'    },
            { Icon: Bike,       titulo:'Bicicleta',    sub:'Arriendo en el centro' },
            { Icon: Car,        titulo:'Auto arriendo',sub:'Desde $45/día'         },
            { Icon: Footprints, titulo:'A pie',        sub:'Centro compacto'       },
            { Icon: Truck,      titulo:'Transfer',     sub:'Al Pumalín y rutas'    },
          ].map(m => (
            <div key={m.titulo} style={{ flexShrink:0, background:T.white, borderRadius:16, padding:'14px 16px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', cursor:'pointer', minWidth:118, textAlign:'center' }}>
              <div style={{ width:48, height:48, borderRadius:12, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 8px' }}>
                <m.Icon size={22} color={T.teal} />
              </div>
              <p style={{ fontSize:12, fontWeight:700, color:T.dark, marginBottom:3 }}>{m.titulo}</p>
              <p style={{ fontSize:10, color:T.gray }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transporte desde/hacia */}
      <div style={{ paddingTop:24 }}>
        <SectionHeader title="Transporte al destino" />
        <div style={{ padding:'0 20px' }}>
          <ListCard first last>
            {[
              { Icon: Ship,  titulo:'Ferry Navimag', sub:'Quellón–Chaitén',          tel:'(65) 2 270 430' },
              { Icon: Ship,  titulo:'TMC Ferry',     sub:'Puerto Montt–Chaitén',      tel:'(65) 2 253 318' },
              { Icon: Bus,   titulo:'Tur-Bus',       sub:'Puerto Montt → Carretera',  tel:'600 660 6600'   },
              { Icon: Plane, titulo:'Aerocord',      sub:'Puerto Montt–Chaitén',      tel:'(65) 2 254 411' },
            ].map((t, i, arr) => (
              <div key={t.titulo} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px', borderBottom: i < arr.length-1 ? `1px solid ${T.grayLight}` : 'none', cursor:'pointer' }}>
                <div style={{ width:44, height:44, borderRadius:12, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <t.Icon size={20} color={T.teal} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:T.dark, marginBottom:2 }}>{t.titulo}</p>
                  <p style={{ fontSize:11, color:T.gray }}>{t.sub}</p>
                </div>
                <button style={{ display:'flex', alignItems:'center', gap:4, background:T.tealBg, border:`1px solid ${T.teal}`, borderRadius:100, padding:'6px 12px', cursor:'pointer', color:T.teal, fontSize:11, fontWeight:600, flexShrink:0 }}>
                  <Phone size={11} color={T.teal} />{t.tel}
                </button>
              </div>
            ))}
          </ListCard>
        </div>
      </div>
      <div style={{ height:24 }} />
    </>
  );
}

// ─── INFO TAB ────────────────────────────────────────────────────────────────

function InfoTab() {
  return (
    <>
      <TealHeader title="Sobre Chaitén" subtitle="Patagonia Norte · Los Lagos, Chile" showSearch={false} />

      {/* Hero info card */}
      <div style={{ margin:'-22px 16px 0', background:T.white, borderRadius:20, padding:'16px 18px', boxShadow:'0 6px 32px rgba(0,0,0,0.12)', position:'relative', zIndex:2 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, textAlign:'center' }}>
          {[
            { Icon: Users,    value:'~8.000',  label:'Habitantes' },
            { Icon: Waves,    value:"42°55'S", label:'Latitud'    },
            { Icon: Mountain, value:'2.300 m', label:'Corcovado'  },
          ].map(s => (
            <div key={s.label}>
              <div style={{ width:48, height:48, borderRadius:12, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 8px' }}>
                <s.Icon size={22} color={T.teal} />
              </div>
              <p style={{ fontSize:14, fontWeight:800, color:T.dark }}>{s.value}</p>
              <p style={{ fontSize:10, color:T.gray }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Descripción */}
      <div style={{ padding:'28px 20px 0' }}>
        <SectionHeader title="¿Qué es Chaitén?" />
        <div style={{ padding:'0 20px' }}>
          <div style={{ background:T.white, borderRadius:16, padding:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize:13, color:T.dark, lineHeight:1.7 }}>
              Chaitén es una pequeña ciudad en la Región de Los Lagos, al norte de la Patagonia chilena. Es la puerta de entrada a la mítica <strong>Carretera Austral</strong> y al <strong>Parque Pumalín</strong>, uno de los parques privados más grandes del mundo.{'\n\n'}
              En 2008, el volcán Chaitén hizo erupción, destruyendo gran parte del pueblo. Hoy renace como un destino auténtico, sostenible y de naturaleza prístina.
            </p>
          </div>
        </div>
      </div>

      {/* Temporadas */}
      <div style={{ paddingTop:24 }}>
        <SectionHeader title="Cuándo visitar" />
        <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'0 20px' }}>
          {TEMPORADAS.map(t => (
            <div key={t.mes} style={{ display:'flex', alignItems:'center', gap:14, background:T.white, borderRadius:16, padding:'14px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', cursor:'pointer' }}>
              <div style={{ width:52, height:52, borderRadius:12, background:`${t.color}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <t.Icon size={26} color={t.color} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <p style={{ fontSize:14, fontWeight:800, color:T.dark }}>{t.mes}</p>
                  <span style={{ fontSize:10, fontWeight:600, color:t.color, background:`${t.color}22`, padding:'2px 8px', borderRadius:100 }}>{t.periodo}</span>
                </div>
                <p style={{ fontSize:12, color:T.gray, lineHeight:1.4 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div style={{ paddingTop:24 }}>
        <SectionHeader title="Tips del viajero" />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, padding:'0 20px' }}>
          {TIPS.map(t => (
            <div key={t.titulo} style={{ background:T.white, borderRadius:16, padding:'14px 12px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', cursor:'pointer' }}>
              <div style={{ width:40, height:40, borderRadius:10, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10 }}>
                <t.Icon size={20} color={T.teal} />
              </div>
              <p style={{ fontSize:12, fontWeight:700, color:T.dark, marginBottom:4 }}>{t.titulo}</p>
              <p style={{ fontSize:11, color:T.gray, lineHeight:1.4 }}>{t.texto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Datos del destino */}
      <div style={{ paddingTop:24 }}>
        <SectionHeader title="Datos del destino" />
        <div style={{ padding:'0 20px' }}>
          <ListCard first last>
            {[
              { Icon: MapPin,      label:'Ubicación',           value:'Patagonia Norte, Los Lagos, Chile'    },
              { Icon: Mountain,    label:'Volcán Corcovado',    value:'2.300 m · Estratovolcán activo'       },
              { Icon: Route,       label:'Carretera Austral',   value:'Ruta 7 · 1.240 km total'             },
              { Icon: Thermometer, label:'Temperatura promedio',value:'5°C (invierno) · 18°C (verano)'      },
              { Icon: CloudRain,   label:'Precipitaciones',     value:'~2.500 mm/año · Lluvia frecuente'    },
              { Icon: DollarSign,  label:'Moneda',              value:'Peso chileno (CLP) · USD aceptado'   },
            ].map((d, i, arr) => (
              <div key={d.label} style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 14px', borderBottom: i < arr.length-1 ? `1px solid ${T.grayLight}` : 'none' }}>
                <div style={{ width:36, height:36, borderRadius:10, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <d.Icon size={18} color={T.teal} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:11, color:T.gray }}>{d.label}</p>
                  <p style={{ fontSize:13, fontWeight:600, color:T.dark }}>{d.value}</p>
                </div>
              </div>
            ))}
          </ListCard>
        </div>
      </div>
      <div style={{ height:24 }} />
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ModernHome() {
  const [tab, setTab] = useState<NavTab>('home');
  const wx = useWeather();

  const isPudi = tab === 'pudi';

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh', background:T.bg, overflow:'hidden' }}>
      <div style={{ flex:1, overflowY: isPudi ? 'hidden' : 'auto', overflowX:'hidden', display: isPudi ? 'flex' : 'block', flexDirection:'column' }} className={isPudi ? '' : 'hide-scrollbar'}>
        {tab === 'home'      && <HomeTab wx={wx} />}
        {tab === 'explorar'  && <ExplorarTab />}
        {tab === 'pudi'      && <PudiTab />}
        {tab === 'servicios' && <ServiciosTab />}
        {tab === 'info'      && <InfoTab />}
      </div>

      {/* Bottom Nav */}
      <nav style={{ display:'flex', justifyContent:'space-around', alignItems:'flex-end', background:T.white, paddingBottom:'env(safe-area-inset-bottom,8px)', paddingTop:8, borderTop:`1px solid ${T.grayLight}`, boxShadow:'0 -4px 24px rgba(0,0,0,0.06)', flexShrink:0, position:'relative' }}>
        {([
          { id:'home'     as NavTab, Icon:Home,       label:'Inicio'   },
          { id:'explorar' as NavTab, Icon:Compass,    label:'Explorar' },
        ]).map(({ id, Icon, label }) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'4px 18px', background:'none', border:'none', cursor:'pointer' }}>
              <Icon size={22} color={active ? T.teal : '#C0C0C0'} />
              <span style={{ fontSize:10, fontWeight:active?700:500, color:active?T.teal:'#C0C0C0' }}>{label}</span>
            </button>
          );
        })}

        <button onClick={() => setTab('pudi')} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, background:'none', border:'none', cursor:'pointer', marginBottom:4 }}>
          <div style={{
            width:58, height:58, borderRadius:'50%',
            background: tab==='pudi' ? `linear-gradient(135deg,#0D1F17,${T.tealDark})` : 'linear-gradient(135deg,#C8F135,#a8d020)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:26,
            boxShadow: tab==='pudi' ? '0 4px 18px rgba(13,165,160,0.45)' : '0 4px 18px rgba(200,241,53,0.5)',
            border:`3px solid ${T.white}`,
            marginTop:-22,
          }}>🦌</div>
          <span style={{ fontSize:10, fontWeight:700, color:tab==='pudi'?T.teal:'#C0C0C0' }}>Pudi</span>
        </button>

        {([
          { id:'servicios' as NavTab, Icon:NavShield, label:'Servicios' },
          { id:'info'      as NavTab, Icon:Info,      label:'Info'      },
        ]).map(({ id, Icon, label }) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'4px 18px', background:'none', border:'none', cursor:'pointer' }}>
              <Icon size={22} color={active ? T.teal : '#C0C0C0'} />
              <span style={{ fontSize:10, fontWeight:active?700:500, color:active?T.teal:'#C0C0C0' }}>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
