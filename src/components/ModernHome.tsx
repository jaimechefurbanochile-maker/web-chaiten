import { useState } from 'react';
import {
  Search, Home, Compass, Info, ShieldCheck as NavShield,
  ChevronRight, Star, Building2, Ship, Bus, Plane,
  AlertCircle, Fuel, Banknote, Stethoscope, ShieldCheck, Wifi, MessageCircle,
  Utensils, Car, Phone, Send, MapPin, TreePine, Clock,
  Mountain, Waves, Droplets, Flame, Pill, HeartPulse,
  Bike, Footprints, Truck, CloudRain, Thermometer, Sun, Sunrise, Route, DollarSign,
  CalendarDays, Wind, Users, ShoppingCart, Landmark, Navigation,
  ArrowLeft, Globe, Share2, Mail,
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
type Page = { type: 'lugar'; id: string } | { type: 'ruta'; id: string } | { type: 'itinerario'; id: string } | { type: 'alojamiento'; id: string } | { type: 'restaurante'; id: string } | null;
type Navigate = (page: Page) => void;

// ─── Data ────────────────────────────────────────────────────────────────────

const ATRACTIVOS = [
  { id:'a1', nombre:'Volcán Corcovado',    sub:'Icono patagónico',          tipo:'Naturaleza', img:'https://picsum.photos/id/29/400/240',  rating:4.9, precio:'Gratis',    dias:'1 día'    },
  { id:'a2', nombre:'Parque Pumalín',      sub:'Bosque valdiviano virgen',  tipo:'Naturaleza', img:'https://picsum.photos/id/15/400/240',  rating:4.9, precio:'Gratis',    dias:'1-3 días' },
  { id:'a3', nombre:'Fiordos Patagónicos', sub:'Paisajes únicos en bote',   tipo:'Aventura',   img:'https://picsum.photos/id/64/400/240',  rating:4.8, precio:'desde $45', dias:'4h'       },
  { id:'a4', nombre:'Termas El Amarillo',  sub:'Aguas termales naturales',  tipo:'Naturaleza', img:'https://picsum.photos/id/76/400/240',  rating:4.7, precio:'desde $8',  dias:'Día'      },
  { id:'a5', nombre:'Río Yelcho',          sub:'Pesca y rafting',           tipo:'Aventura',   img:'https://picsum.photos/id/10/400/240',  rating:4.6, precio:'desde $30', dias:'Medio día' },
  { id:'a6', nombre:'Centro Histórico',    sub:'Patrimonio post-erupción',  tipo:'Cultura',    img:'https://picsum.photos/id/96/400/240',  rating:4.4, precio:'Gratis',    dias:'2h'       },
];

const COMO_LLEGAR = [
  { id:'ferry', Icon: Ship,  titulo:'Ferry',  sub:'Quellón → Chaitén',      detalle:'Navimag · TMC',         duracion:'4h 30m', precio:'desde $35',  color:'#0d4a7a' },
  { id:'bus',   Icon: Bus,   titulo:'Bus',    sub:'Puerto Montt → Chaitén', detalle:'Tur-Bus · Queilen Bus', duracion:'8h',     precio:'desde $18',  color:'#1a4a2a' },
  { id:'avion', Icon: Plane, titulo:'Avión',  sub:'Puerto Montt → Chaitén', detalle:'Aerocord · charter',    duracion:'45 min', precio:'desde $120', color:'#3a1a6a' },
];

const ALOJAMIENTOS = [
  { id:'d1', nombre:'Hospedaje Mi Casa',    tipo:'Hospedaje familiar',    rating:4.8, precio:'$35', img:'https://picsum.photos/id/164/160/160' },
  { id:'d2', nombre:'Cabañas Bosque Verde', tipo:'Cabaña de montaña',     rating:4.9, precio:'$55', img:'https://picsum.photos/id/119/160/160'  },
  { id:'d3', nombre:'Hotel Los Volcanes',   tipo:'Hotel céntrico',        rating:4.6, precio:'$48', img:'https://picsum.photos/id/175/160/160'  },
  { id:'d4', nombre:'Camping Pumalín',      tipo:'Camping con servicios', rating:4.7, precio:'$8',  img:'https://picsum.photos/id/325/160/160'  },
];

const GASTRONOMIA = [
  { id:'c1', nombre:'Restobar El Volcán',    tipo:'Mariscos · Cocina local', rating:4.7, precio:'$$', img:'https://picsum.photos/id/292/160/160', horario:'12:00–22:00' },
  { id:'c2', nombre:'Café Patagonia',        tipo:'Café · Desayunos',        rating:4.8, precio:'$',  img:'https://picsum.photos/id/431/160/160', horario:'08:00–20:00' },
  { id:'c3', nombre:'Picada Don Jaime',      tipo:'Comida casera',            rating:4.6, precio:'$',  img:'https://picsum.photos/id/429/160/160', horario:'11:00–21:00' },
  { id:'c4', nombre:'Marisquería El Puerto', tipo:'Mariscos · Vista al mar',  rating:4.9, precio:'$$', img:'https://picsum.photos/id/488/160/160', horario:'12:00–23:00' },
];

const RUTAS = [
  { id:'r1', nombre:'Sendero Volcán Corcovado',  distancia:'18 km', tiempo:'8h',        dificultad:'Alta'  as Dificultad, Icon: Flame,    color:'#7a1a1a' },
  { id:'r2', nombre:'Trekking Pumalín Cascadas', distancia:'6 km',  tiempo:'3h',        dificultad:'Fácil' as Dificultad, Icon: TreePine, color:'#1a5a2a' },
  { id:'r3', nombre:'Ruta Costera Chaitén',      distancia:'12 km', tiempo:'5h',        dificultad:'Media' as Dificultad, Icon: Waves,    color:'#0a3a6a' },
  { id:'r4', nombre:'Sendero Río Blanco',        distancia:'8 km',  tiempo:'4h',        dificultad:'Media' as Dificultad, Icon: Mountain, color:'#2a4a1a' },
  { id:'r5', nombre:'Sendero Los Alerces',       distancia:'5 km',  tiempo:'3h',        dificultad:'Fácil' as Dificultad, Icon: TreePine, color:'#1a4a1a' },
  { id:'r6', nombre:'Cascadas Escondidas',       distancia:'4 km',  tiempo:'2h',        dificultad:'Fácil' as Dificultad, Icon: Droplets, color:'#0a2a5a' },
  { id:'r7', nombre:'Termas El Amarillo',        distancia:'52 km', tiempo:'1h (auto)', dificultad:'Fácil' as Dificultad, Icon: Droplets, color:'#5a3a0a' },
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

const DONDE_COMPRAR = [
  { titulo:'Supermercado Belén',   sub:'Av. Norte · mejor surtido del pueblo',  horario:'9–21h',   Icon: ShoppingCart },
  { titulo:'Supermercado Norte',   sub:'Centro · buen surtido',                 horario:'9–20h',   Icon: ShoppingCart },
  { titulo:'Feria Municipal',      sub:'Plaza de Armas · sábado y domingo',     horario:'Fin sem', Icon: Landmark     },
  { titulo:'Artesanías Patagonia', sub:'Av. Costanera 34 · productos locales',  horario:'10–19h',  Icon: ShoppingCart },
  { titulo:'Farmacia Cruz Verde',  sub:"O'Higgins 44 · medicamentos y más",     horario:'9–21h',   Icon: Pill         },
];

const EN_PUEBLO = [
  { titulo:'Borde Costero',      desc:'Paseo frente al mar · ideal al atardecer', Icon: Waves        },
  { titulo:'Plaza de Armas',     desc:'Centro del pueblo · mercado y artesanías', Icon: Landmark     },
  { titulo:'Zona Exclusión',     desc:'Historia viva de la erupción del 2008',    Icon: Flame        },
  { titulo:'Mirador Volcán',     desc:'Vista del Corcovado desde el pueblo',      Icon: Mountain     },
  { titulo:'Feria Artesanos',    desc:'Productos locales · recuerdos auténticos', Icon: ShoppingCart },
  { titulo:'Museo Histórico',    desc:'Fotos y relatos del pueblo renacido',       Icon: Landmark     },
];

const DESTINOS_CERCANOS = [
  { nombre:'Caleta Gonzalo',     desc:'Entrada Pumalín',   Icon: TreePine,  color:T.teal,    distancia:'60 km',  tiempo:'1h'   },
  { nombre:'Lago Yelcho',        desc:'Pesca · Kayak',     Icon: Waves,     color:'#0a3a6a', distancia:'32 km',  tiempo:'40m'  },
  { nombre:'Termas El Amarillo', desc:'Aguas termales',    Icon: Droplets,  color:'#5a3a0a', distancia:'52 km',  tiempo:'1h'   },
  { nombre:'Futaleufú',          desc:'Rafting clase V',   Icon: Mountain,  color:'#7a1a1a', distancia:'155 km', tiempo:'3h'   },
  { nombre:'Villa S. Lucía',     desc:'Conexión sur',      Icon: Route,     color:T.tealDark,distancia:'90 km',  tiempo:'1.5h' },
  { nombre:'La Junta',           desc:'Lago Rosselot',     Icon: Car,       color:'#3a2a6a', distancia:'150 km', tiempo:'2.5h' },
];

const HISTORIA_ITEMS = [
  { año:'Antes 2008',  texto:'Chaitén era un tranquilo pueblo pesquero de 7.000 habitantes, puerta natural a la Patagonia.' },
  { año:'Mayo 2008',   texto:'El volcán Chaitén entró en erupción por primera vez en 9.500 años. Columna de ceniza de 30 km de altura. Evacuación total en 24 horas.' },
  { año:'2009–2011',   texto:'La lahar del río Blanco destruyó el Barrio Nuevo. El río cambió su cauce y atravesó el centro histórico. Gran parte quedó sepultada.' },
  { año:'2012–hoy',    texto:'Los habitantes regresaron poco a poco. La ciudad renació con resiliencia. Hoy es un símbolo de la Patagonia viva y en reconstrucción.' },
];

const DISTANCIAS = [
  { destino:'Caleta Gonzalo (Pumalín)', via:'Ruta 7 Norte',         Icon: TreePine,  distancia:'60 km',   tiempo:'~1h'    },
  { destino:'Lago Yelcho',              via:'Ruta 7 Sur',            Icon: Waves,     distancia:'32 km',   tiempo:'~40 min'},
  { destino:'Termas El Amarillo',       via:'Ruta 7 Sur',            Icon: Droplets,  distancia:'52 km',   tiempo:'~1h'   },
  { destino:'Futaleufú',                via:'Ruta 7 + 235',          Icon: Mountain,  distancia:'155 km',  tiempo:'~3h'   },
  { destino:'Villa Santa Lucía',        via:'Ruta 7 Sur',            Icon: Route,     distancia:'90 km',   tiempo:'~1.5h' },
  { destino:'La Junta',                 via:'Ruta 7 Sur',            Icon: Car,       distancia:'150 km',  tiempo:'~2.5h' },
  { destino:'Puyuhuapi',                via:'Ruta 7 Sur',            Icon: Car,       distancia:'180 km',  tiempo:'~3h'   },
  { destino:'Puerto Montt (ferry)',     via:'Ferry + Quellón',       Icon: Ship,      distancia:'~500 km', tiempo:'12h+'  },
];

const TIPS = [
  { Icon: CloudRain,    titulo:'Lleva capas',       texto:'El clima cambia rápido. Siempre lleva ropa impermeable y de abrigo.' },
  { Icon: Banknote,     titulo:'Lleva efectivo',    texto:'Los cajeros son limitados. BancoEstado es el más confiable.' },
  { Icon: Fuel,         titulo:'Carga combustible', texto:'En la Carretera Austral las estaciones son escasas. Carga en Chaitén.' },
  { Icon: Wifi,         titulo:'Señal limitada',    texto:'Claro y Entel tienen cobertura básica. El WiFi municipal es gratuito.' },
  { Icon: CalendarDays, titulo:'Mejor época',       texto:'Nov–Mar para senderismo. Abr–Oct para tranquilidad y precios bajos.' },
  { Icon: Car,          titulo:'Arriendo 4x4',      texto:'Para rutas fuera del pueblo se recomienda vehículo de doble tracción.' },
  { Icon: Navigation,   titulo:'Sin señal GPS',     texto:'Descarga mapas offline (Maps.me) antes de salir del pueblo. La cobertura móvil es escasa.' },
  { Icon: Footprints,   titulo:'Permisos Pumalín',  texto:'Algunos senderos requieren registro en CONAF. Consulta en la entrada de Caleta Gonzalo.' },
];

const ITINERARIOS = [
  { id:'i1', tipo:'Viajero solo',      dias:'2–3 días',   Icon: Footprints, color:'#2a4a7a', desc:'Aventura independiente',   pasos:['Zona Exclusión volcán','Sendero Los Alerces','Termas El Amarillo','Borde Costero al atardecer'] },
  { id:'i2', tipo:'En familia',        dias:'2 días',     Icon: Users,      color:'#1a5a2a', desc:'Cómodo y accesible',       pasos:['Cascadas Escondidas','Plaza de Armas · Feria','Lago Yelcho (picnic)','Museo Histórico'] },
  { id:'i3', tipo:'Poco tiempo',       dias:'1 día',      Icon: CalendarDays, color:'#0DA5A0', desc:'Lo esencial en Chaitén', pasos:['Zona Exclusión mañana','Borde Costero · almuerzo','Feria de artesanos','Café Patagonia'] },
  { id:'i4', tipo:'Solo en el pueblo', dias:'Medio día',  Icon: Landmark,   color:'#5a3a0a', desc:'Sin auto necesario',       pasos:['Plaza de Armas','Museo Histórico','Borde Costero','Feria artesanal'] },
  { id:'i5', tipo:'Trekker extremo',   dias:'3–5 días',   Icon: Mountain,   color:'#7a1a1a', desc:'Volcán y glaciares',       pasos:['Volcán Corcovado (8h)','Sendero Río Blanco (4h)','Alerces milenarios','Cascadas Escondidas'] },
  { id:'i6', tipo:'Pumalín completo',  dias:'2–3 días',   Icon: TreePine,   color:'#0a3a1a', desc:'Bosque y cascadas',        pasos:['Caleta Gonzalo (60 km)','Sendero Los Alerces (4h)','Cascadas Escondidas (2h)','Termas El Amarillo'] },
];

const TEMPORADAS = [
  { mes:'Verano',    periodo:'Dic–Mar', Icon: Sun,       desc:'Ideal para trekking y actividades al aire libre. Días largos (hasta 17h de luz).', color:'#f59e0b' },
  { mes:'Otoño',     periodo:'Abr–May', Icon: Wind,      desc:'Colores del bosque, menos visitantes. Buen clima en general.',                      color:'#d97706' },
  { mes:'Invierno',  periodo:'Jun–Ago', Icon: CloudRain, desc:'Lluvia y frío. Algunos senderos cerrados. Poca concurrencia y precios bajos.',      color:'#0a3a6a' },
  { mes:'Primavera', periodo:'Sep–Nov', Icon: TreePine,  desc:'Flora renace. Aguas abundantes. Prepárate para lluvia también.',                    color:T.teal   },
];

// ─── Detail Data ─────────────────────────────────────────────────────────────

const LUGAR_DETAILS: Record<string, { descripcion: string; comoLlegar: string; tips: string[]; destacados: string[] }> = {
  'a1': { descripcion: 'El Volcán Corcovado (2.300 m) es el ícono visual de Chaitén, visible desde el pueblo en días despejados. Estratovolcán activo monitoreado por SERNAGEOMIN, con última gran actividad en 1835. Una experiencia de montaña única en toda la Patagonia.', comoLlegar: 'Ruta 7 Norte desde Chaitén por 35 km hasta sector Los Tepuales. Sendero base sin permiso especial. Guía certificado obligatorio para la cima y permiso CONAF.', tips: ['Solo para montañistas con experiencia', 'Permiso obligatorio en CONAF Chaitén', 'Salida antes de las 6 AM', 'Mejor visibilidad en verano (Dic–Mar)'], destacados: ['Vista 360° de fiordos y bosque', 'Flora de alta montaña única', 'Glaciar lateral accesible', 'Zona volcánica activa'] },
  'a2': { descripcion: 'Parque Nacional Pumalín es una de las mayores reservas de bosque templado lluvioso del planeta, donado al Estado chileno por Doug Tompkins en 2017. Alberga alerces de 4.000 años, cascadas espectaculares y ecosistemas únicos en perfecto estado.', comoLlegar: 'Entrada principal en Caleta Gonzalo, 60 km al norte por Ruta 7 (1h). Abierto todo el año. Registro gratuito en CONAF a la entrada del parque.', tips: ['Entrada gratuita · Horario 8–20h', 'Lleva efectivo para café y artesanías', 'Senderos bien señalizados, sin guía', 'Campings con servicios en Caleta Gonzalo'], destacados: ['Alerce de +4.000 años', 'Cascadas Escondidas (30 m)', 'Vista al fiordo desde senderos', 'Café y artesanías locales'] },
  'a3': { descripcion: 'Los fiordos patagónicos son canales naturales tallados por glaciares que rodean Chaitén. Navegarlos revela una Patagonia sin igual: montañas verticales al mar, delfines australes, ballenas y aves marinas únicas del hemisferio sur.', comoLlegar: 'Excursiones en lancha parten desde el muelle de Chaitén. Operadores locales ofrecen salidas desde $45 USD. El ferry Navimag también ofrece travesías panorámicas.', tips: ['Reserva con 2 días de anticipación', 'Ropa impermeable y de abrigo obligatoria', 'Nov–Mar: mejor temporada', 'Mínimo 4 personas para tours grupales'], destacados: ['Avistamiento de delfines australes', 'Glaciares accesibles en lancha', 'Aves marinas del hemisferio sur', 'Atardeceres únicos sobre el fiordo'] },
  'a4': { descripcion: 'Aguas termales naturales de origen volcánico a 52 km al sur de Chaitén. El complejo El Amarillo tiene piscinas de 35°C a 45°C rodeadas de bosque nativo junto al río Blanco. Una de las experiencias más reparadoras de la Patagonia.', comoLlegar: 'Ruta 7 Sur desde Chaitén, 52 km (1h). Pavimento hasta Villa Santa Lucía, luego ripio. Transfer organizado disponible desde Chaitén con operadores locales.', tips: ['Entrada ~$8–12 USD por persona', 'Lleva traje de baño y toalla', 'Abierto todo el año (mejor en invierno)', 'Restaurant disponible en el complejo'], destacados: ['Piscinas 35°C–45°C volcánicas', 'Bosque nativo en torno al río', 'Varias piscinas a distintas temperaturas', 'Restaurant con vista al río Blanco'] },
  'a5': { descripcion: 'El Río Yelcho a 32 km al sur es uno de los destinos de pesca con mosca más reconocidos de Sudamérica. Sus aguas cristalinas albergan truchas arcoíris y marrón de gran tamaño. También ideal para kayak y rafting.', comoLlegar: 'Ruta 7 Sur desde Chaitén, 32 km (40 min). Varios accesos públicos al lago. Guías de pesca con licencia disponibles en Chaitén para excursiones completas.', tips: ['Licencia de pesca obligatoria (SERNAPESCA)', 'Temporada principal: Nov–Abr', 'Guías certificados disponibles localmente', 'Campamentos privados con full service'], destacados: ['Truchas arcoíris y marrón grandes', 'Kayak en aguas calmas del lago', 'Rafting según nivel de experiencia', 'Pesca con mosca de clase mundial'] },
  'a6': { descripcion: 'El Centro Histórico post-erupción es un sitio de memoria único en el mundo. El Barrio Nuevo destruido por la lahar de 2008 se puede visitar hoy: casas semi-enterradas, el cauce que atraviesa el antiguo barrio y el silencio son una experiencia irrepetible.', comoLlegar: 'A pie desde el centro, cruzando el puente hacia el antiguo barrio. Solo 1 km desde la Plaza de Armas. Visita libre, sin costo.', tips: ['Visita guiada recomendada para contexto', 'Respetar señalización de zonas peligrosas', 'Mejor en la mañana con buena luz', 'Combinar con el Museo Histórico'], destacados: ['Casas sepultadas por lahar volcánico', 'Cauce del río Blanco histórico', 'Zona de exclusión original 2008', 'Sitio de memoria colectiva viva'] },
};

const RUTA_DETAILS: Record<string, { descripcion: string; puntos: string[]; equipamiento: string[]; tips: string[]; inicio: string }> = {
  'r1': { descripcion: 'La travesía al Volcán Corcovado (2.300 m) es la más exigente de la zona. 18 km de ida y vuelta con ascenso desde bosque valdiviano hasta roca volcánica. La vista desde la cima: fiordos, glaciares y bosque infinito.', puntos: ['Inicio: Sector Los Tepuales, Ruta 7 Norte km 35', 'Bosque valdiviano hasta 800 m s.n.m.', 'Transición a zona volcánica (800–1.600 m)', 'Cima volcánica: 2.300 m · Vista 360°'], equipamiento: ['Botas técnicas de montaña', 'Ropa impermeable de alta montaña', 'Bastones de trekking', 'Comida y agua 3L mínimo', 'Mapa físico (sin señal GPS en cima)'], tips: ['Salida antes de las 7 AM obligatorio', 'Solo con guía certificado de montaña', 'Consulta SERNAGEOMIN antes de salir', 'Cancelar con lluvia intensa o viento fuerte'], inicio: 'Sector Los Tepuales · Ruta 7 Norte km 35 desde Chaitén' },
  'r2': { descripcion: 'El sendero más popular del Parque Pumalín. Parte de Caleta Gonzalo entre bosque templado lluvioso hasta las impresionantes Cascadas Escondidas. Accesible para todos los niveles.', puntos: ['Inicio: Centro de Visitantes Caleta Gonzalo', 'Sendero señalizado por bosque nativo', 'Miradores con vista al fiordo patagónico', 'Meta: Cascadas Escondidas — caída de 30 m'], equipamiento: ['Zapatillas de trekking con agarre', 'Ropa impermeable (siempre hay neblina)', 'Agua 2L mínimo', 'Snack energético', 'Repelente de insectos'], tips: ['Registro gratuito en CONAF', 'Apto para niños mayores de 8 años', 'Regresa por el mismo camino', 'Lleva almuerzo para comer en las cascadas'], inicio: 'Centro de Visitantes Caleta Gonzalo · 60 km norte de Chaitén por Ruta 7' },
  'r3': { descripcion: 'Ruta semi-circular costera al norte de Chaitén siguiendo el borde del fiordo. Vistas permanentes al mar, playas de piedras negras y vegetación nativa costera. Perfecto para atardecer.', puntos: ['Inicio: Borde Costero de Chaitén', 'Playa de piedras negras sector norte', 'Mirador elevado sobre el fiordo', 'Regreso por sendero interior'], equipamiento: ['Zapatillas cómodas con agarre', 'Ropa de abrigo y cortaviento', 'Agua 1.5L', 'Protector solar'], tips: ['Mejor al atardecer en verano (18–20h)', 'Terreno irregular en algunos tramos', 'Lleva algo para picar en el mirador', 'Sigue el camino costero, no la Ruta 7'], inicio: 'Muelle principal de Chaitén · Borde Costero centro' },
  'r4': { descripcion: 'Recorre la ribera del Río Blanco que cambió su cauce en la erupción de 2008 y destruyó parte del pueblo. Una caminata única cargada de historia y paisaje volcánico transformado.', puntos: ['Inicio: Puente del antiguo barrio', 'Ribera del Río Blanco volcánico', 'Zona de exclusión con casas sepultadas', 'Mirador sobre el delta volcánico'], equipamiento: ['Botas resistentes (barro posible)', 'Ropa impermeable', 'Agua 1.5L', 'Repelente'], tips: ['Evitar con lluvia intensa', 'Respetar señalización de peligro', 'Lleva cámara: paisaje único', 'Guía local recomendado para contexto'], inicio: 'Puente antiguo barrio · 500 m del centro de Chaitén' },
  'r5': { descripcion: 'El Sendero Los Alerces conduce hasta especímenes de 4.000 años de antigüedad, el árbol más longevo de Chile. Corto pero de profundo valor natural, cultural y filosófico.', puntos: ['Inicio: Caleta Gonzalo', 'Bosque mixto de coigüe y canelo', 'Zona de alerces de 500–1.000 años', 'Alerce milenario de +4.000 años (marcado)'], equipamiento: ['Zapatillas de trekking', 'Ropa impermeable', 'Agua 1.5L', 'Snack liviano'], tips: ['Silencio en el bosque (fauna sensible)', 'No salir del sendero señalizado', 'Combinar con Cascadas Escondidas el mismo día', 'CONAF provee material informativo'], inicio: 'Caleta Gonzalo · 60 km norte de Chaitén por Ruta 7' },
  'r6': { descripcion: 'Las Cascadas Escondidas son el destino más fotogénico de Pumalín. Una cascada de 30 metros cae sobre roca volcánica entre helechos gigantes. Ideal para toda la familia.', puntos: ['Inicio: Caleta Gonzalo', 'Sendero por bosque nativo muy denso', 'Zona de helechos y musgos excepcionales', 'Cascada de 30 m sobre roca volcánica'], equipamiento: ['Zapatillas de trekking impermeables', 'Ropa impermeable (neblina constante)', 'Agua 1L', 'Cámara preferiblemente impermeable'], tips: ['Apto para toda la familia', 'Mayor caudal en primavera e invierno', 'La neblina de la cascada es parte de la experiencia', 'Combinar con Sendero Los Alerces'], inicio: 'Caleta Gonzalo · 60 km norte de Chaitén por Ruta 7' },
  'r7': { descripcion: 'Las Termas El Amarillo son la excursión de relax más popular desde Chaitén. Aguas termales volcánicas de 35–45°C con restaurant, piscinas techadas y al aire libre. Ideal para recuperarse después del trekking.', puntos: ['Salida desde el centro de Chaitén', 'Ruta 7 Sur pavimentada (52 km · 1h)', 'Cruce Puente sector El Amarillo', 'Complejo con 4 piscinas a diferentes temperaturas'], equipamiento: ['Auto propio o transfer', 'Traje de baño (obligatorio)', 'Toalla', 'Efectivo para entrada y restaurant'], tips: ['Entrada ~$8–12 USD por persona', 'Abierto todos los días del año', 'Mejor en días fríos y lluviosos', 'Llegar antes de las 11 AM en temporada alta'], inicio: 'Chaitén → Ruta 7 Sur → 52 km → Sector El Amarillo (señalizado)' },
};

const ITINERARIO_DETAILS: Record<string, { descripcion: string; programa: { dia: string; items: { hora: string; texto: string }[] }[]; queTraer: string[]; presupuesto: string }> = {
  'i1': { descripcion: 'Para el viajero independiente que quiere vivir Chaitén a fondo. Combina historia, naturaleza y aventura con total libertad de horarios.', programa: [{ dia: 'Día 1 · Pueblo e historia', items: [{ hora: '09:00', texto: 'Zona Exclusión — Barrio destruido por el volcán' }, { hora: '11:00', texto: 'Museo Histórico — Fotos y relatos de 2008' }, { hora: '13:00', texto: 'Almuerzo en Picada Don Jaime' }, { hora: '15:00', texto: 'Borde Costero y Mirador del Volcán' }, { hora: '19:00', texto: 'Cena en Restobar El Volcán' }] }, { dia: 'Día 2 · Pumalín', items: [{ hora: '07:30', texto: 'Salida norte → Caleta Gonzalo (60 km · 1h)' }, { hora: '09:30', texto: 'Sendero Los Alerces — 5 km · 3h · Árbol 4.000 años' }, { hora: '13:30', texto: 'Almuerzo en Café del parque' }, { hora: '15:00', texto: 'Cascadas Escondidas — 4 km · 2h' }, { hora: '19:00', texto: 'Regreso a Chaitén' }] }, { dia: 'Día 3 · Termas', items: [{ hora: '09:00', texto: 'Ruta 7 Sur → Termas El Amarillo (52 km · 1h)' }, { hora: '11:00', texto: 'Relax en aguas termales volcánicas' }, { hora: '14:00', texto: 'Almuerzo en restaurant del complejo' }, { hora: '16:00', texto: 'Regreso a Chaitén para el ferry' }] }], queTraer: ['Mochila 30L', 'Ropa impermeable', 'Botas trekking', 'Efectivo mín. $100 USD', 'Mapas offline (Maps.me)'], presupuesto: '~$80–120 USD/día (todo incluido)' },
  'i2': { descripcion: 'Pensado para familias con niños. Actividades cómodas y accesibles con mucha naturaleza sin grandes esfuerzos físicos.', programa: [{ dia: 'Día 1 · Pueblo y cultura', items: [{ hora: '10:00', texto: 'Museo Histórico — Historia del volcán con los niños' }, { hora: '12:00', texto: 'Feria Plaza de Armas — Artesanías y productos' }, { hora: '14:00', texto: 'Almuerzo en Café Patagonia' }, { hora: '16:00', texto: 'Borde Costero — Paseo accesible frente al mar' }] }, { dia: 'Día 2 · Pumalín express', items: [{ hora: '08:00', texto: 'Salida norte (60 km · 1h por Ruta 7)' }, { hora: '09:30', texto: 'Cascadas Escondidas — Fácil, apto niños (2h)' }, { hora: '13:00', texto: 'Picnic o Café del parque en Caleta Gonzalo' }, { hora: '15:30', texto: 'Regreso con parada en Lago Yelcho' }] }], queTraer: ['Ropa abrigada para niños', 'Snacks y agua extra', 'Zapatillas trekking ligeras', 'Protector solar', 'Traje de baño'], presupuesto: '~$60–90 USD/día (2 adultos + 2 niños)' },
  'i3': { descripcion: 'El itinerario perfecto si solo tienes 24h en Chaitén. Todo lo esencial a pie sin necesitar auto ni gran presupuesto.', programa: [{ dia: 'El día completo', items: [{ hora: '08:30', texto: 'Desayuno en Café Patagonia' }, { hora: '09:30', texto: 'Zona Exclusión — Barrio volcánico histórico (1h)' }, { hora: '11:00', texto: 'Museo Histórico — Relatos del 2008 (45 min)' }, { hora: '12:30', texto: 'Almuerzo en Marisquería El Puerto' }, { hora: '14:30', texto: 'Borde Costero — Caminata al muelle' }, { hora: '16:00', texto: 'Feria Artesanos — Recuerdos auténticos' }, { hora: '18:00', texto: 'Mirador Volcán — Atardecer sobre el Corcovado' }, { hora: '20:00', texto: 'Cena en Restobar El Volcán' }] }], queTraer: ['Calzado cómodo', 'Ropa de abrigo', 'Cámara', 'Efectivo ~$30 USD'], presupuesto: '~$40–60 USD el día completo (sin alojamiento)' },
  'i4': { descripcion: 'Para quien llega de paso o tiene solo unas horas. Todo a pie desde el centro, sin vehículo ni guía necesarios.', programa: [{ dia: 'Medio día (4–5h)', items: [{ hora: '10:00', texto: 'Plaza de Armas — Punto de partida' }, { hora: '10:30', texto: 'Museo Histórico — Historia de la erupción (45 min)' }, { hora: '11:30', texto: 'Borde Costero — 15 min a pie' }, { hora: '12:30', texto: 'Feria Artesanal — Productos locales únicos' }, { hora: '13:30', texto: 'Almuerzo en Café Patagonia o Picada Don Jaime' }] }], queTraer: ['Calzado cómodo', 'Efectivo para artesanías', 'Cámara'], presupuesto: '~$20–30 USD (almuerzo + recuerdos)' },
  'i5': { descripcion: 'Para montañistas y trekkers que buscan desafíos reales. El volcán Corcovado y los senderos de Pumalín ofrecen experiencias únicas en Sudamérica.', programa: [{ dia: 'Día 1 · Preparación', items: [{ hora: '14:00', texto: 'Instalación y Museo Histórico' }, { hora: '16:00', texto: 'Permisos CONAF y verificación de equipo' }, { hora: '19:00', texto: 'Reunión con guía certificado' }] }, { dia: 'Día 2 · Volcán Corcovado', items: [{ hora: '05:30', texto: 'Transfer al inicio del sendero (35 km norte)' }, { hora: '06:30', texto: 'Inicio ascenso — 18 km · 8h con guía' }, { hora: '12:00', texto: 'Cima 2.300 m — Vista 360° de Patagonia' }, { hora: '18:30', texto: 'Descenso y regreso a Chaitén' }] }, { dia: 'Días 3–5 · Pumalín', items: [{ hora: 'Full day', texto: 'Sendero Los Alerces (5 km · 3h) · Árbol 4.000 años' }, { hora: 'Full day', texto: 'Sendero Río Blanco (8 km · 4h) · Historia volcánica' }, { hora: 'Noche', texto: 'Camping con servicios en Caleta Gonzalo' }] }], queTraer: ['Botas técnicas de montaña', 'Ropa alta montaña y capas', 'Bastones trekking', 'Guía certificado (contratar en Chaitén)', 'Permiso CONAF'], presupuesto: '~$150–250 USD/día (guía + equipo + alojamiento)' },
  'i6': { descripcion: 'Una inmersión total en el Parque Nacional Pumalín. Bosque milenario, cascadas, termas y campamentos en pura naturaleza patagónica.', programa: [{ dia: 'Día 1 · Caleta Gonzalo', items: [{ hora: '08:00', texto: 'Salida desde Chaitén (60 km · 1h por Ruta 7)' }, { hora: '09:30', texto: 'Registro en CONAF y orientación' }, { hora: '11:00', texto: 'Cascadas Escondidas — Sendero 2h' }, { hora: '14:00', texto: 'Almuerzo en Café del parque' }, { hora: '16:00', texto: 'Instalación en Camping Caleta Gonzalo' }] }, { dia: 'Día 2 · Alerces', items: [{ hora: '09:00', texto: 'Sendero Los Alerces — 5 km · 3h · 4.000 años' }, { hora: '14:00', texto: 'Exploración libre: orillas del fiordo' }, { hora: '18:00', texto: 'Atardecer sobre el fiordo desde el campamento' }] }, { dia: 'Día 3 · Termas y regreso', items: [{ hora: '08:00', texto: 'Levantamiento campamento · regreso sur' }, { hora: '10:00', texto: 'Termas El Amarillo (52 km desde Chaitén)' }, { hora: '14:00', texto: 'Almuerzo en el complejo termal' }, { hora: '16:00', texto: 'Regreso a Chaitén (1h)' }] }], queTraer: ['Carpa o reserva camping', 'Saco dormir -5°C', 'Comida 3 días', 'Traje de baño', 'Zapatillas trekking', 'Repelente'], presupuesto: '~$50–80 USD/día (camping + comida + termas)' },
};

const ALOJAMIENTO_DETAILS: Record<string, { descripcion: string; comodidades: string[]; politicas: string[]; direccion: string; contacto: string }> = {
  'd1': { descripcion: 'Hospedaje familiar en el corazón de Chaitén. La familia González lleva 15 años recibiendo viajeros con habitaciones cálidas, desayuno con productos locales y recomendaciones de primera mano sobre la zona.', comodidades: ['WiFi gratuito', 'Desayuno incluido', 'Cocina compartida', 'Estacionamiento', 'Lavandería'], politicas: ['Check-in: 14:00', 'Check-out: 11:00', 'Mascotas: consultar', 'No fumadores en habitaciones'], direccion: 'Av. Norte 234, Chaitén Centro', contacto: '+56 9 9876 5432' },
  'd2': { descripcion: 'Cabañas de madera rodeadas de bosque nativo a 3 km del centro. Cada cabaña tiene chimenea, cocina equipada y vista al volcán Corcovado. Ideal para parejas o familias que buscan desconectarse.', comodidades: ['Chimenea en cabaña', 'Cocina equipada', 'WiFi', 'Leña incluida', 'BBQ compartido'], politicas: ['Check-in: 15:00', 'Check-out: 12:00', 'Mascotas bienvenidos', 'Mínimo 2 noches'], direccion: 'Sector Bosque Verde, km 3 Ruta 7 Norte', contacto: '+56 9 8765 4321' },
  'd3': { descripcion: 'El único hotel del centro con recepción 24h. Habitaciones confortables y restaurant propio con cocina local. Estacionamiento amplio para vehículos de doble tracción y motos.', comodidades: ['Restaurant propio', 'Recepción 24h', 'WiFi', 'Estacionamiento amplio', 'Calefacción central'], politicas: ['Check-in: 14:00', 'Check-out: 11:00', 'Sin mascotas', 'Reserva anticipada recomendada'], direccion: 'Av. Corcovado 45, Chaitén Centro', contacto: '+56 65 2 731 123' },
  'd4': { descripcion: 'Camping con servicios básicos en el Parque Pumalín, a 60 km de Chaitén. Administrado por CONAF. Sitios para carpa y furgoneta con baños, duchas y agua caliente, rodeados de bosque milenario.', comodidades: ['Duchas con agua caliente', 'Áreas de fogata', 'Agua potable', 'Café y snacks CONAF', 'Acceso directo a senderos'], politicas: ['Sin reservas previas', 'Mascotas con correa', 'Fuego solo en zonas habilitadas', 'Silencio nocturno obligatorio'], direccion: 'Caleta Gonzalo, Parque Pumalín (60 km norte de Chaitén)', contacto: 'CONAF (65) 2 731 500' },
};

const RESTAURANTE_DETAILS: Record<string, { descripcion: string; especialidades: string[]; info: string[]; horario: string; contacto: string }> = {
  'c1': { descripcion: 'El restaurante con más historia de Chaitén. Especializado en mariscos frescos del fiordo y cocina chilena tradicional. Vista al volcán desde las mesas del fondo. Ambiente cálido con fotos de la erupción de 2008.', especialidades: ['Merluza austral al vapor', 'Centolla patagónica', 'Cazuela de vacuno', 'Empanadas de mariscos', 'Caldillo de congrio'], info: ['Reservas recomendadas en temporada alta', 'Menú del día $8–12 USD', 'Acepta tarjetas de crédito', 'Opción vegetariana disponible'], horario: 'Martes a Domingo · 12:00–22:00', contacto: '+56 9 7654 3210' },
  'c2': { descripcion: 'El café de referencia en Chaitén. Conocido por desayunos generosos y pastelería casera. Punto de encuentro de viajeros y locales. WiFi gratuito y la mejor señal del pueblo.', especialidades: ['Desayuno patagónico completo', 'Café de especialidad', 'Tortas y pasteles caseros', 'Sándwich de ave local', 'Jugos naturales'], info: ['WiFi gratuito para clientes', 'Menú en español e inglés', 'Espacio para grupos', 'Ideal para planificar rutas'], horario: 'Todos los días · 08:00–20:00', contacto: '+56 9 6543 2109' },
  'c3': { descripcion: 'Comida casera chilena sin pretensiones y sin igual en precio. La señora Carmen cocina lo mismo desde hace 20 años: sopa caliente, cazuela y guisos abundantes. Favorito de los lugareños.', especialidades: ['Sopa de ave casera', 'Cazuela de cordero', 'Guiso de lentejas', 'Sopaipillas con pebre', 'Postre casero del día'], info: ['Menú del día: $5–8 USD', 'Solo efectivo', 'Sin reservas · llegar temprano', 'Porciones muy abundantes'], horario: 'Lunes a Sábado · 11:00–21:00', contacto: '+56 9 5432 1098' },
  'c4': { descripcion: 'La mejor marisquería de Chaitén con vista directa al mar y al muelle. Los mariscos llegan frescos cada mañana desde los propios botes. Ideal para el último almuerzo antes del ferry.', especialidades: ['Ostras frescas del fiordo', 'Congrio frito', 'Mariscal (ceviche caliente)', 'Centolla al pil-pil', 'Paila marina'], info: ['Mariscos frescos a diario', 'Vista al muelle y al mar', 'Reservas por WhatsApp', 'Menú del día incluye bebida'], horario: 'Todos los días · 12:00–23:00', contacto: '+56 9 4321 0987' },
};

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

function AttractivoCard({ a, onClick }: { a: typeof ATRACTIVOS[0]; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ width:220, flexShrink:0, borderRadius:20, overflow:'hidden', background:T.white, boxShadow:'0 6px 24px rgba(0,0,0,0.12)', cursor:'pointer' }}>
      <div style={{ height:150, overflow:'hidden', position:'relative' }}>
        <img src={a.img} alt={a.nombre} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <span style={{ position:'absolute', top:10, left:10, background:'rgba(0,0,0,0.35)', color:'#fff', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100, backdropFilter:'blur(4px)' }}>{a.tipo}</span>
        <span style={{ position:'absolute', bottom:10, right:10, background:'#16a34a', color:'#fff', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100 }}>{a.dias}</span>
      </div>
      <div style={{ padding:'12px 14px 14px' }}>
        <p style={{ fontSize:14, fontWeight:800, color:T.teal, marginBottom:2 }}>{a.nombre}</p>
        <p style={{ fontSize:11, color:T.gray, marginBottom:10 }}>{a.sub}</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Stars v={a.rating} />
          <span style={{ fontSize:11, color:T.gray }}>Desde <span style={{ fontWeight:800, color:T.dark }}>{a.precio}</span></span>
        </div>
      </div>
    </div>
  );
}

// ─── List Row ─────────────────────────────────────────────────────────────────

function ListRow({ img, title, sub, rating, right, last = false, onClick }: {
  img: string; title: string; sub: string; rating: number; right?: string; last?: boolean; onClick?: () => void;
}) {
  return (
    <div onClick={onClick} style={{ display:'flex', alignItems:'center', gap:14, background:T.white, padding:'14px', borderBottom:last?'none':`1px solid ${T.grayLight}`, cursor:'pointer' }}>
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

// ─── Detail Pages ─────────────────────────────────────────────────────────────

function LugarDetailPage({ id, onBack }: { id: string; onBack: () => void }) {
  const lugar = ATRACTIVOS.find(a => a.id === id)!;
  const det = LUGAR_DETAILS[id];
  return (
    <div style={{ height:'100dvh', overflowY:'auto', background:T.bg }} className="hide-scrollbar">
      <div style={{ position:'relative', height:300, flexShrink:0 }}>
        <img src={lugar.img.replace('/400/240','/430/300')} alt={lugar.nombre} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.22) 0%,transparent 40%,rgba(0,0,0,0.72) 100%)' }} />
        <button onClick={onBack} style={{ position:'absolute', top:52, left:20, width:42, height:42, borderRadius:'50%', background:'rgba(0,0,0,0.4)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)' }}>
          <ArrowLeft size={20} color='#fff' />
        </button>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px' }}>
          <span style={{ background:'rgba(0,0,0,0.4)', color:'#fff', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100, backdropFilter:'blur(4px)', marginBottom:8, display:'inline-block' }}>{lugar.tipo}</span>
          <h1 style={{ fontSize:26, fontWeight:800, color:'#fff', lineHeight:1.2, marginBottom:4 }}>{lugar.nombre}</h1>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.85)' }}>{lugar.sub}</p>
        </div>
      </div>
      <div style={{ background:T.white, margin:'0 16px', borderRadius:'0 0 20px 20px', padding:'16px', boxShadow:'0 6px 24px rgba(0,0,0,0.10)', marginBottom:20 }}>
        <div style={{ display:'flex', gap:8 }}>
          {[{ label:'Rating', val:`${lugar.rating} ★`, color:T.star }, { label:'Precio', val:lugar.precio, color:T.teal }, { label:'Duración', val:lugar.dias, color:T.dark }].map(s => (
            <div key={s.label} style={{ flex:1, textAlign:'center', background:T.bg, borderRadius:12, padding:'10px 6px' }}>
              <p style={{ fontSize:13, fontWeight:800, color:s.color }}>{s.val}</p>
              <p style={{ fontSize:10, color:T.gray }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{ background:T.white, borderRadius:16, padding:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize:13, color:T.dark, lineHeight:1.8 }}>{det.descripcion}</p>
        </div>
      </div>
      <div style={{ padding:'0 20px 16px' }}>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Destacados</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {det.destacados.map((d, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8, background:T.white, borderRadius:12, padding:'10px 12px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:T.teal, flexShrink:0 }} />
              <p style={{ fontSize:11, color:T.dark, fontWeight:600, lineHeight:1.3 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 20px 16px' }}>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Cómo llegar</p>
        <div style={{ background:T.white, borderRadius:16, padding:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', display:'flex', gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
            <MapPin size={18} color={T.teal} />
          </div>
          <p style={{ fontSize:13, color:T.dark, lineHeight:1.7 }}>{det.comoLlegar}</p>
        </div>
      </div>
      <div style={{ padding:'0 20px 40px' }}>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Tips importantes</p>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {det.tips.map((tip, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, background:T.white, borderRadius:12, padding:'12px 14px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width:24, height:24, borderRadius:'50%', background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontSize:10, fontWeight:800, color:T.teal }}>{i + 1}</span>
              </div>
              <p style={{ fontSize:12, color:T.dark }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RutaDetailPage({ id, onBack }: { id: string; onBack: () => void }) {
  const ruta = RUTAS.find(r => r.id === id)!;
  const det = RUTA_DETAILS[id];
  return (
    <div style={{ height:'100dvh', overflowY:'auto', background:T.bg }} className="hide-scrollbar">
      <div style={{ background:`linear-gradient(145deg,${ruta.color},${ruta.color}cc)`, padding:'52px 20px 28px', position:'relative' }}>
        <button onClick={onBack} style={{ position:'absolute', top:52, left:20, width:42, height:42, borderRadius:'50%', background:'rgba(255,255,255,0.18)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <ArrowLeft size={20} color='#fff' />
        </button>
        <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
          <div style={{ width:54, height:54, borderRadius:14, background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <ruta.Icon size={28} color='#fff' />
          </div>
          <div>
            <h1 style={{ fontSize:22, fontWeight:800, color:'#fff', lineHeight:1.2, marginBottom:6 }}>{ruta.nombre}</h1>
            <DiffBadge d={ruta.dificultad} />
          </div>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          {[{ label:'Distancia', val:ruta.distancia }, { label:'Tiempo estimado', val:ruta.tiempo }].map(s => (
            <div key={s.label} style={{ background:'rgba(255,255,255,0.15)', borderRadius:10, padding:'8px 16px' }}>
              <p style={{ fontSize:10, color:'rgba(255,255,255,0.7)', marginBottom:2 }}>{s.label}</p>
              <p style={{ fontSize:14, fontWeight:800, color:'#fff' }}>{s.val}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'20px 20px 0' }}>
        <div style={{ background:T.white, borderRadius:16, padding:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', marginBottom:20 }}>
          <p style={{ fontSize:13, color:T.dark, lineHeight:1.8 }}>{det.descripcion}</p>
        </div>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Puntos del recorrido</p>
        <div style={{ background:T.white, borderRadius:16, overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', marginBottom:20 }}>
          {det.puntos.map((p, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 16px', borderBottom: i < det.puntos.length - 1 ? `1px solid ${T.grayLight}` : 'none' }}>
              <div style={{ width:28, height:28, borderRadius:'50%', background:`${ruta.color}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontSize:11, fontWeight:800, color:ruta.color }}>{i + 1}</span>
              </div>
              <p style={{ fontSize:12, color:T.dark }}>{p}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Equipamiento necesario</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
          {det.equipamiento.map((e, i) => (
            <span key={i} style={{ background:T.white, border:`1px solid ${T.grayLight}`, color:T.dark, fontSize:11, fontWeight:600, padding:'7px 12px', borderRadius:100, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>{e}</span>
          ))}
        </div>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Tips importantes</p>
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
          {det.tips.map((tip, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, background:T.white, borderRadius:12, padding:'12px 14px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width:24, height:24, borderRadius:'50%', background:`${ruta.color}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontSize:10, fontWeight:800, color:ruta.color }}>{i + 1}</span>
              </div>
              <p style={{ fontSize:12, color:T.dark }}>{tip}</p>
            </div>
          ))}
        </div>
        <div style={{ background:`${ruta.color}11`, borderRadius:16, padding:'14px 16px', marginBottom:40, border:`1px solid ${ruta.color}33` }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
            <MapPin size={14} color={ruta.color} />
            <p style={{ fontSize:11, fontWeight:700, color:ruta.color }}>Punto de inicio</p>
          </div>
          <p style={{ fontSize:12, color:T.dark }}>{det.inicio}</p>
        </div>
      </div>
    </div>
  );
}

function ItinerarioDetailPage({ id, onBack }: { id: string; onBack: () => void }) {
  const it = ITINERARIOS.find(i => i.id === id)!;
  const det = ITINERARIO_DETAILS[id];
  return (
    <div style={{ height:'100dvh', overflowY:'auto', background:T.bg }} className="hide-scrollbar">
      <div style={{ background:`linear-gradient(145deg,${it.color},${it.color}cc)`, padding:'52px 20px 28px', position:'relative' }}>
        <button onClick={onBack} style={{ position:'absolute', top:52, left:20, width:42, height:42, borderRadius:'50%', background:'rgba(255,255,255,0.18)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <ArrowLeft size={20} color='#fff' />
        </button>
        <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
          <div style={{ width:54, height:54, borderRadius:14, background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <it.Icon size={28} color='#fff' />
          </div>
          <div>
            <h1 style={{ fontSize:22, fontWeight:800, color:'#fff', lineHeight:1.2, marginBottom:6 }}>{it.tipo}</h1>
            <span style={{ background:'rgba(255,255,255,0.25)', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:100, display:'inline-block' }}>{it.dias}</span>
          </div>
        </div>
        <p style={{ fontSize:13, color:'rgba(255,255,255,0.85)', lineHeight:1.5 }}>{det.descripcion}</p>
      </div>
      <div style={{ padding:'20px 20px 0' }}>
        {det.programa.map((dia, di) => (
          <div key={di} style={{ marginBottom:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:`${it.color}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <CalendarDays size={14} color={it.color} />
              </div>
              <p style={{ fontSize:14, fontWeight:800, color:T.dark }}>{dia.dia}</p>
            </div>
            <div style={{ background:T.white, borderRadius:16, overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
              {dia.items.map((item, ii) => (
                <div key={ii} style={{ display:'flex', gap:12, padding:'12px 14px', borderBottom: ii < dia.items.length - 1 ? `1px solid ${T.grayLight}` : 'none' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:it.color, minWidth:44, flexShrink:0, paddingTop:1 }}>{item.hora}</span>
                  <p style={{ fontSize:12, color:T.dark, lineHeight:1.5 }}>{item.texto}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Qué llevar</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
          {det.queTraer.map((item, i) => (
            <span key={i} style={{ background:T.white, border:`1px solid ${T.grayLight}`, color:T.dark, fontSize:11, fontWeight:600, padding:'7px 12px', borderRadius:100, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>{item}</span>
          ))}
        </div>
        <div style={{ background:`${it.color}11`, borderRadius:16, padding:'14px 16px', marginBottom:40, border:`1px solid ${it.color}33` }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
            <DollarSign size={14} color={it.color} />
            <p style={{ fontSize:11, fontWeight:700, color:it.color }}>Presupuesto estimado</p>
          </div>
          <p style={{ fontSize:13, fontWeight:700, color:T.dark }}>{det.presupuesto}</p>
        </div>
      </div>
    </div>
  );
}

function AlojamientoDetailPage({ id, onBack }: { id: string; onBack: () => void }) {
  const a = ALOJAMIENTOS.find(x => x.id === id)!;
  const det = ALOJAMIENTO_DETAILS[id];
  return (
    <div style={{ height:'100dvh', overflowY:'auto', background:T.bg }} className="hide-scrollbar">
      <div style={{ position:'relative', height:260 }}>
        <img src={a.img.replace('/160/160','/430/280')} alt={a.nombre} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.2) 0%,transparent 35%,rgba(0,0,0,0.65) 100%)' }} />
        <button onClick={onBack} style={{ position:'absolute', top:52, left:20, width:42, height:42, borderRadius:'50%', background:'rgba(0,0,0,0.4)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)' }}>
          <ArrowLeft size={20} color='#fff' />
        </button>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px' }}>
          <h1 style={{ fontSize:24, fontWeight:800, color:'#fff', lineHeight:1.2, marginBottom:3 }}>{a.nombre}</h1>
          <p style={{ fontSize:12, color:'rgba(255,255,255,0.85)' }}>{a.tipo}</p>
        </div>
      </div>
      <div style={{ background:T.white, margin:'0 16px', borderRadius:'0 0 20px 20px', padding:'14px', boxShadow:'0 6px 24px rgba(0,0,0,0.10)', marginBottom:20 }}>
        <div style={{ display:'flex', gap:8 }}>
          {[{ label:'Rating', val:`${a.rating} ★`, color:T.star }, { label:'Precio/noche', val:a.precio, color:T.teal }].map(s => (
            <div key={s.label} style={{ flex:1, textAlign:'center', background:T.bg, borderRadius:12, padding:'10px 6px' }}>
              <p style={{ fontSize:14, fontWeight:800, color:s.color }}>{s.val}</p>
              <p style={{ fontSize:10, color:T.gray }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{ background:T.white, borderRadius:16, padding:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize:13, color:T.dark, lineHeight:1.8 }}>{det.descripcion}</p>
        </div>
      </div>
      <div style={{ padding:'0 20px 16px' }}>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Comodidades</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {det.comodidades.map((c, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:6, background:T.white, borderRadius:100, padding:'7px 14px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', border:`1px solid ${T.grayLight}` }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:T.teal, flexShrink:0 }} />
              <p style={{ fontSize:11, color:T.dark, fontWeight:600 }}>{c}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 20px 16px' }}>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Políticas</p>
        <div style={{ background:T.white, borderRadius:16, overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
          {det.politicas.map((p, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', borderBottom: i < det.politicas.length - 1 ? `1px solid ${T.grayLight}` : 'none' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:T.teal, flexShrink:0 }} />
              <p style={{ fontSize:12, color:T.dark }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 20px 40px' }}>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Cómo llegar · Contacto</p>
        <div style={{ background:T.white, borderRadius:16, padding:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <MapPin size={18} color={T.teal} />
            </div>
            <p style={{ fontSize:13, color:T.dark }}>{det.direccion}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Phone size={18} color={T.teal} />
            </div>
            <p style={{ fontSize:13, fontWeight:700, color:T.teal }}>{det.contacto}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestauranteDetailPage({ id, onBack }: { id: string; onBack: () => void }) {
  const r = GASTRONOMIA.find(x => x.id === id)!;
  const det = RESTAURANTE_DETAILS[id];
  return (
    <div style={{ height:'100dvh', overflowY:'auto', background:T.bg }} className="hide-scrollbar">
      <div style={{ position:'relative', height:260 }}>
        <img src={r.img.replace('/160/160','/430/280')} alt={r.nombre} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.2) 0%,transparent 35%,rgba(0,0,0,0.65) 100%)' }} />
        <button onClick={onBack} style={{ position:'absolute', top:52, left:20, width:42, height:42, borderRadius:'50%', background:'rgba(0,0,0,0.4)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)' }}>
          <ArrowLeft size={20} color='#fff' />
        </button>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px' }}>
          <span style={{ background:'rgba(0,0,0,0.35)', color:'#fff', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100, backdropFilter:'blur(4px)', marginBottom:8, display:'inline-block' }}>{r.precio}</span>
          <h1 style={{ fontSize:24, fontWeight:800, color:'#fff', lineHeight:1.2, marginBottom:3 }}>{r.nombre}</h1>
          <p style={{ fontSize:12, color:'rgba(255,255,255,0.85)' }}>{r.tipo}</p>
        </div>
      </div>
      <div style={{ background:T.white, margin:'0 16px', borderRadius:'0 0 20px 20px', padding:'14px', boxShadow:'0 6px 24px rgba(0,0,0,0.10)', marginBottom:20 }}>
        <div style={{ display:'flex', gap:8 }}>
          {[{ label:'Rating', val:`${r.rating} ★`, color:T.star }, { label:'Precio', val:r.precio, color:T.dark }, { label:'Horario', val:det.horario.split('·')[0].trim(), color:T.teal }].map(s => (
            <div key={s.label} style={{ flex:1, textAlign:'center', background:T.bg, borderRadius:12, padding:'10px 4px' }}>
              <p style={{ fontSize:12, fontWeight:800, color:s.color, lineHeight:1.2 }}>{s.val}</p>
              <p style={{ fontSize:10, color:T.gray }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 20px 16px' }}>
        <div style={{ background:T.white, borderRadius:16, padding:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize:13, color:T.dark, lineHeight:1.8 }}>{det.descripcion}</p>
        </div>
      </div>
      <div style={{ padding:'0 20px 16px' }}>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Especialidades</p>
        <div style={{ display:'flex', flexDirection:'column', gap:0, background:T.white, borderRadius:16, overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
          {det.especialidades.map((e, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderBottom: i < det.especialidades.length - 1 ? `1px solid ${T.grayLight}` : 'none' }}>
              <Utensils size={14} color={T.teal} />
              <p style={{ fontSize:12, color:T.dark }}>{e}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 20px 16px' }}>
        <p style={{ fontSize:14, fontWeight:800, color:T.dark, marginBottom:12 }}>Info útil</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {det.info.map((info, i) => (
            <div key={i} style={{ background:T.white, border:`1px solid ${T.grayLight}`, color:T.dark, fontSize:11, fontWeight:600, padding:'7px 12px', borderRadius:100, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>{info}</div>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 20px 40px' }}>
        <div style={{ background:T.white, borderRadius:16, padding:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Clock size={18} color={T.teal} />
            </div>
            <p style={{ fontSize:13, color:T.dark }}>{det.horario}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Phone size={18} color={T.teal} />
            </div>
            <p style={{ fontSize:13, fontWeight:700, color:T.teal }}>{det.contacto}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HOME TAB ─────────────────────────────────────────────────────────────────

function HomeTab({ wx, navigate, onTabChange }: { wx: ReturnType<typeof useWeather>; navigate: Navigate; onTabChange: (tab: NavTab) => void }) {
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
            { Icon: Thermometer, label:'Temperatura',      value: wx.loading ? '...' : `${wx.temp}°C · ${wx.description}`, color: T.dark  },
            { Icon: Route,       label:'Carretera Austral', value:'Transitable',  color: T.green },
            { Icon: Ship,        label:'Ferry Navimag',    value:'Operativo',     color: T.green },
            { Icon: Sunrise,     label:'Amanecer · Puesta',value:'07:42 · 17:18', color: T.dark },
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

      {/* Categorías */}
      <div style={{ padding:'26px 20px 0' }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          {[
            { label:'Qué hacer', Icon:Compass    },
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
          {ATRACTIVOS.map(a => <AttractivoCard key={a.id} a={a} onClick={() => navigate({ type:'lugar', id:a.id })} />)}
        </div>
      </div>

      {/* Itinerarios recomendados */}
      <div style={{ paddingTop:28 }}>
        <SectionHeader title="Itinerarios recomendados" />
        <div style={{ display:'flex', gap:14, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
          {ITINERARIOS.map(it => (
            <div key={it.id} onClick={() => navigate({ type:'itinerario', id:it.id })} style={{ width:200, flexShrink:0, borderRadius:20, overflow:'hidden', background:T.white, boxShadow:'0 6px 24px rgba(0,0,0,0.10)', cursor:'pointer' }}>
              <div style={{ background:`linear-gradient(135deg,${it.color},${it.color}cc)`, padding:'16px 16px 14px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <it.Icon size={20} color='#fff' />
                  </div>
                  <span style={{ background:'rgba(255,255,255,0.25)', color:'#fff', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100 }}>{it.dias}</span>
                </div>
                <p style={{ fontSize:14, fontWeight:800, color:'#fff', lineHeight:1.2, marginBottom:2 }}>{it.tipo}</p>
                <p style={{ fontSize:10, color:'rgba(255,255,255,0.75)' }}>{it.desc}</p>
              </div>
              <div style={{ padding:'12px 14px 14px' }}>
                {it.pasos.map((paso, idx) => (
                  <div key={idx} style={{ display:'flex', alignItems:'flex-start', gap:7, marginBottom: idx < it.pasos.length-1 ? 7 : 0 }}>
                    <div style={{ width:16, height:16, borderRadius:'50%', background:`${it.color}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                      <span style={{ fontSize:8, fontWeight:800, color:it.color }}>{idx+1}</span>
                    </div>
                    <p style={{ fontSize:11, color:T.dark, lineHeight:1.35 }}>{paso}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PARQUE PUMALÍN — hero section */}
      <div style={{ padding:'28px 20px 0' }}>
        <div style={{ borderRadius:20, background:'linear-gradient(145deg,#0D3020,#1a5a35)', overflow:'hidden', position:'relative' }}>
          <img src="https://picsum.photos/id/15/420/200" alt="Pumalín" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.3 }} />
          <div style={{ position:'relative', zIndex:1, padding:'22px 20px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <span style={{ background:'#C8F135', borderRadius:6, padding:'3px 10px', fontSize:10, fontWeight:700, color:'#0D3020' }}>PARQUE NACIONAL</span>
            </div>
            <p style={{ fontSize:24, fontWeight:800, color:'#fff', marginBottom:6, lineHeight:1.2 }}>Parque Pumalín</p>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.8)', lineHeight:1.6, marginBottom:18 }}>
              Una de las reservas de bosque templado más grandes del mundo. Alerzales milenarios de 4.000 años, cascadas y senderos vírgenes. Antes privado (fundado por Doug Tompkins), hoy Parque Nacional administrado por CONAF.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
              {[
                { Icon: TreePine,  label:'Caleta Gonzalo',      sub:'Entrada principal · 60 km norte' },
                { Icon: Droplets,  label:'Cascadas Escondidas',  sub:'Sendero 2h · fácil'              },
                { Icon: TreePine,  label:'Sendero Los Alerces',  sub:'Alerce 4.000 años · 4h'         },
                { Icon: Droplets,  label:'Termas El Amarillo',   sub:'Aguas termales · 52 km sur'     },
              ].map(({ Icon, label, sub }) => (
                <div key={label} style={{ background:'rgba(255,255,255,0.1)', borderRadius:12, padding:'10px 12px', display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:'rgba(200,241,53,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={16} color='#C8F135' />
                  </div>
                  <div>
                    <p style={{ fontSize:11, fontWeight:700, color:'#fff' }}>{label}</p>
                    <p style={{ fontSize:9, color:'rgba(255,255,255,0.6)' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {[['Entrada','Gratuita'],['Horario','8:00–20:00'],['CONAF','Caleta Gonzalo']].map(([l,v]) => (
                <div key={l} style={{ background:'rgba(255,255,255,0.1)', borderRadius:10, padding:'8px 12px', flexShrink:0 }}>
                  <p style={{ fontSize:9, color:'rgba(255,255,255,0.6)' }}>{l}</p>
                  <p style={{ fontSize:12, fontWeight:700, color:'#fff' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Destinos cercanos */}
      <div style={{ paddingTop:28 }}>
        <SectionHeader title="Destinos cercanos" />
        <div style={{ display:'flex', gap:12, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
          {DESTINOS_CERCANOS.map(d => (
            <div key={d.nombre} style={{ width:144, flexShrink:0, background:T.white, borderRadius:16, padding:'14px 12px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', cursor:'pointer' }}>
              <div style={{ width:44, height:44, borderRadius:12, background:`${d.color}22`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10 }}>
                <d.Icon size={22} color={d.color} />
              </div>
              <p style={{ fontSize:12, fontWeight:800, color:T.dark, marginBottom:2, lineHeight:1.3 }}>{d.nombre}</p>
              <p style={{ fontSize:10, color:T.gray, marginBottom:8 }}>{d.desc}</p>
              <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                <Route size={10} color={T.teal} />
                <span style={{ fontSize:11, fontWeight:700, color:T.teal }}>{d.distancia}</span>
              </div>
              <p style={{ fontSize:10, color:T.gray }}>{d.tiempo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Qué hacer en el pueblo */}
      <div style={{ paddingTop:28 }}>
        <SectionHeader title="Qué hacer en el pueblo" />
        <div style={{ display:'flex', gap:10, overflowX:'auto', padding:'0 20px 4px' }} className="hide-scrollbar">
          {EN_PUEBLO.map(item => (
            <div key={item.titulo} style={{ width:138, flexShrink:0, background:T.white, borderRadius:16, padding:'14px 12px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', cursor:'pointer' }}>
              <div style={{ width:44, height:44, borderRadius:12, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10 }}>
                <item.Icon size={22} color={T.teal} />
              </div>
              <p style={{ fontSize:12, fontWeight:700, color:T.dark, marginBottom:4, lineHeight:1.3 }}>{item.titulo}</p>
              <p style={{ fontSize:10, color:T.gray, lineHeight:1.4 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rutas destacadas (preview — ver todas en Explorar) */}
      <div style={{ paddingTop:28 }}>
        <SectionHeader title="Rutas destacadas" onSeeAll={() => onTabChange('explorar')} />
        <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'0 20px' }}>
          {RUTAS.slice(0, 3).map(r => (
            <div key={r.id} onClick={() => navigate({ type:'ruta', id:r.id })} style={{ display:'flex', alignItems:'center', gap:12, background:T.white, borderRadius:16, padding:'12px 14px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', cursor:'pointer' }}>
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
        <div style={{ padding:'12px 20px 0', textAlign:'center' }}>
          <button onClick={() => onTabChange('explorar')} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:T.teal, background:'none', border:`1.5px solid ${T.teal}`, borderRadius:100, padding:'10px 22px', cursor:'pointer', fontFamily:'inherit' }}>
            <Compass size={14} /> Ver todas las rutas
          </button>
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
              <ListRow key={d.id} img={d.img} title={d.nombre} sub={d.tipo} rating={d.rating} right={`${d.precio}/noche`} last={i === ALOJAMIENTOS.length - 1} onClick={() => navigate({ type:'alojamiento', id:d.id })} />
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
              <div key={c.id} onClick={() => navigate({ type:'restaurante', id:c.id })} style={{ display:'flex', alignItems:'center', gap:14, background:T.white, padding:'14px', borderBottom:i < GASTRONOMIA.length-1 ? `1px solid ${T.grayLight}` : 'none', cursor:'pointer' }}>
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

      {/* Pudi */}
      <div style={{ padding:'28px 20px 0' }}>
        <div style={{ background:T.white, borderRadius:24, overflow:'hidden', boxShadow:'0 6px 24px rgba(0,0,0,0.10)' }}>
          <div style={{ background:T.teal, padding:'20px 20px 18px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:50, height:50, borderRadius:'50%', background:'rgba(255,255,255,0.2)', border:'2px solid rgba(255,255,255,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>🦌</div>
              <div>
                <p style={{ fontSize:17, fontWeight:800, color:T.white, marginBottom:2 }}>Asistente Pudi</p>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:'#C8F135' }} />
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.75)' }}>En línea · Tu guía local</p>
                </div>
              </div>
            </div>
            <span style={{ background:'rgba(255,255,255,0.2)', color:T.white, fontSize:10, fontWeight:700, padding:'5px 12px', borderRadius:100, border:'1px solid rgba(255,255,255,0.3)' }}>IA</span>
          </div>
          <div style={{ padding:'16px 20px 20px' }}>
            <div style={{ background:T.bg, borderRadius:14, padding:'14px 16px', marginBottom:14 }}>
              <p style={{ fontSize:13, color:T.dark, lineHeight:1.6 }}>
                "¿Rutas para tu nivel? ¿Dónde comer bien? ¿Cómo llegar al Pumalín? Pregúntame lo que quieras sobre Chaitén 🌿"
              </p>
            </div>
            <div style={{ display:'flex', gap:7, marginBottom:16, flexWrap:'wrap' }}>
              {['¿Cómo llegar?','¿Qué hacer hoy?','Rutas Pumalín','Emergencias'].map(q => (
                <span key={q} style={{ background:T.tealBg, color:T.teal, fontSize:11, fontWeight:600, padding:'6px 12px', borderRadius:100, border:`1px solid ${T.teal}30`, cursor:'pointer' }}>{q}</span>
              ))}
            </div>
            <button style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, width:'100%', background:T.teal, color:T.white, fontWeight:800, fontSize:14, padding:'14px 20px', borderRadius:100, border:'none', cursor:'pointer', fontFamily:'inherit' }}>
              <MessageCircle size={18} />Pregúntale a Pudi
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop:28 }}>
        <div style={{ background:T.white, padding:'18px 20px', boxShadow:'0 -2px 12px rgba(0,0,0,0.06)', borderTop:`3px solid ${T.teal}` }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <TreePine size={16} color={T.teal} />
              <div>
                <p style={{ fontSize:13, fontWeight:800, color:T.dark }}>Chaitén Patagonia</p>
                <p style={{ fontSize:10, color:T.gray }}>Patagonia Norte · Chile</p>
              </div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              {([Globe, Share2, Mail] as const).map((Icon, i) => (
                <button key={i} style={{ width:30, height:30, borderRadius:'50%', background:T.tealBg, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={13} color={T.teal} />
                </button>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
            {[
              { label:'Emergencias', val:'131 · 133'      },
              { label:'Hospital',    val:'(65) 2 731 244' },
              { label:'Ferry',       val:'(65) 2 270 430' },
            ].map(({ label, val }) => (
              <div key={label} style={{ background:T.bg, borderRadius:100, padding:'5px 12px', display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ fontSize:10, color:T.gray }}>{label}</span>
                <span style={{ fontSize:10, fontWeight:700, color:T.dark }}>· {val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize:10, color:T.grayLight, textAlign:'center' }}>© 2026 Chaitén Patagonia</p>
        </div>
      </div>
      <div style={{ height:16 }} />
    </>
  );
}

// ─── EXPLORAR TAB ─────────────────────────────────────────────────────────────

function ExplorarTab({ navigate }: { navigate: Navigate }) {
  const [filtro, setFiltro] = useState('Todo');
  const filtros = ['Todo','Naturaleza','Aventura','Cultura','Gastronomía'];
  const filtrados = filtro === 'Todo' || filtro === 'Gastronomía'
    ? ATRACTIVOS
    : ATRACTIVOS.filter(a => a.tipo === filtro);

  return (
    <>
      <TealHeader title="Explorar Chaitén" subtitle="Descubre todo lo que ofrece la Patagonia" searchPlaceholder="Busca lugares, rutas, comida…" />

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

      <div style={{ padding:'20px 20px 0', display:'flex', flexDirection:'column', gap:10 }}>
        {(filtro === 'Gastronomía' ? GASTRONOMIA : filtrados).map(a => (
          <div key={a.id} onClick={() => 'tipo' in a && a.tipo !== 'Gastronomía' ? navigate({ type:'lugar', id:a.id }) : undefined} style={{ borderRadius:18, overflow:'hidden', background:T.white, boxShadow:'0 4px 16px rgba(0,0,0,0.08)', cursor:'pointer' }}>
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

      {(filtro === 'Todo' || filtro === 'Aventura') && (
        <div style={{ paddingTop:24 }}>
          <SectionHeader title="Rutas y senderos" />
          <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'0 20px' }}>
            {RUTAS.map(r => (
              <div key={r.id} onClick={() => navigate({ type:'ruta', id:r.id })} style={{ display:'flex', alignItems:'center', gap:12, background:T.white, borderRadius:16, padding:'12px 14px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', cursor:'pointer' }}>
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
  { from:'pudi', text:'Puedo orientarte sobre rutas, alojamiento, gastronomía, transporte, servicios de emergencia o historia del pueblo.' },
];

const QUICK_Q = ['¿Cómo llegar?','¿Qué hacer hoy?','Rutas Pumalín','Restaurantes cerca','Destinos cercanos','Emergencias'];

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

      <div style={{ padding:'12px 16px 0', flexShrink:0 }}>
        <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:8 }} className="hide-scrollbar">
          {QUICK_Q.map(q => (
            <button key={q} onClick={() => send(q)} style={{ flexShrink:0, padding:'7px 14px', borderRadius:100, fontSize:11, fontWeight:600, background:T.tealBg, color:T.teal, border:`1px solid ${T.teal}`, cursor:'pointer' }}>{q}</button>
          ))}
        </div>
      </div>

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
            { Icon: HeartPulse,  label:'Ambulancia',  num:'131'            },
            { Icon: Flame,       label:'Bomberos',    num:'132'            },
            { Icon: ShieldCheck, label:'Carabineros', num:'133'            },
            { Icon: Stethoscope, label:'Urgencia',    num:'(65) 2 731 244' },
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

      {/* Servicios locales */}
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

      {/* Dónde comprar */}
      <div style={{ paddingTop:24 }}>
        <SectionHeader title="Dónde comprar" />
        <div style={{ padding:'0 20px' }}>
          <ListCard first last>
            {DONDE_COMPRAR.map((c, i) => (
              <div key={c.titulo} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px', borderBottom: i < DONDE_COMPRAR.length-1 ? `1px solid ${T.grayLight}` : 'none', cursor:'pointer' }}>
                <div style={{ width:48, height:48, borderRadius:12, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <c.Icon size={22} color={T.teal} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:T.dark, marginBottom:2 }}>{c.titulo}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <MapPin size={10} color={T.gray} />
                    <p style={{ fontSize:11, color:T.gray }}>{c.sub}</p>
                  </div>
                </div>
                <span style={{ fontSize:10, color:T.gray, background:T.grayLight, padding:'4px 8px', borderRadius:100, flexShrink:0 }}>{c.horario}</span>
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

      {/* Transporte al destino */}
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

      {/* Hero stats */}
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

      {/* ¿Qué es Chaitén? */}
      <div style={{ padding:'28px 20px 0' }}>
        <SectionHeader title="¿Qué es Chaitén?" />
        <div style={{ padding:'0 20px' }}>
          <div style={{ background:T.white, borderRadius:16, padding:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize:13, color:T.dark, lineHeight:1.8 }}>
              Chaitén es una pequeña ciudad en la Región de Los Lagos, al norte de la Patagonia chilena. Es la puerta de entrada a la mítica <strong>Carretera Austral</strong> y al <strong>Parque Pumalín</strong>, una de las reservas de bosque templado más grande del mundo.
            </p>
            <p style={{ fontSize:13, color:T.dark, lineHeight:1.8, marginTop:10 }}>
              En 2008 el volcán Chaitén hizo erupción, destruyendo gran parte del pueblo. Hoy renace como un destino auténtico, sostenible y de naturaleza prístina — un símbolo de resiliencia patagónica.
            </p>
          </div>
        </div>
      </div>

      {/* Historia del volcán */}
      <div style={{ paddingTop:24 }}>
        <SectionHeader title="Historia del volcán" />
        <div style={{ padding:'0 20px' }}>
          <div style={{ borderRadius:20, background:'linear-gradient(145deg,#1a0808,#5a1a1a)', overflow:'hidden' }}>
            <div style={{ padding:'20px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:'rgba(255,100,50,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Flame size={22} color='#ff6432' />
                </div>
                <div>
                  <p style={{ fontSize:16, fontWeight:800, color:'#fff' }}>Erupción 2008</p>
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.55)' }}>Un evento que cambió la historia</p>
                </div>
              </div>
              {HISTORIA_ITEMS.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:14, marginBottom: i < HISTORIA_ITEMS.length-1 ? 16 : 0 }}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                    <div style={{ width:10, height:10, borderRadius:'50%', background:'#ff6432', flexShrink:0 }} />
                    {i < HISTORIA_ITEMS.length-1 && <div style={{ width:2, flex:1, background:'rgba(255,100,50,0.3)', marginTop:4 }} />}
                  </div>
                  <div style={{ paddingBottom: i < HISTORIA_ITEMS.length-1 ? 0 : 0 }}>
                    <p style={{ fontSize:11, fontWeight:700, color:'#ff9472', marginBottom:4 }}>{item.año}</p>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,0.8)', lineHeight:1.6 }}>{item.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mapa del pueblo */}
      <div style={{ paddingTop:24 }}>
        <SectionHeader title="Mapa de Chaitén" />
        <div style={{ padding:'0 20px' }}>
          <div style={{ borderRadius:16, overflow:'hidden', boxShadow:'0 4px 16px rgba(0,0,0,0.10)', height:240 }}>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-72.7620%2C-42.9280%2C-72.6980%2C-42.9060&layer=mapnik&marker=-42.9167%2C-72.7167"
              style={{ width:'100%', height:'100%', border:'none' }}
              title="Mapa de Chaitén"
            />
          </div>
          <a
            href="https://www.openstreetmap.org/?mlat=-42.9167&mlon=-72.7167#map=14/-42.9167/-72.7167"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display:'block', textAlign:'center', padding:'10px', fontSize:12, color:T.teal, fontWeight:600 }}
          >
            Ver mapa completo →
          </a>
        </div>
      </div>

      {/* Distancias desde Chaitén */}
      <div style={{ paddingTop:24 }}>
        <SectionHeader title="Distancias desde Chaitén" />
        <div style={{ padding:'0 20px' }}>
          <ListCard first last>
            {DISTANCIAS.map((d, i, arr) => (
              <div key={d.destino} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 14px', borderBottom: i < arr.length-1 ? `1px solid ${T.grayLight}` : 'none' }}>
                <div style={{ width:36, height:36, borderRadius:10, background:T.tealBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <d.Icon size={18} color={T.teal} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:T.dark }}>{d.destino}</p>
                  <p style={{ fontSize:10, color:T.gray }}>{d.via}</p>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <p style={{ fontSize:13, fontWeight:800, color:T.teal }}>{d.distancia}</p>
                  <p style={{ fontSize:10, color:T.gray }}>{d.tiempo}</p>
                </div>
              </div>
            ))}
          </ListCard>
        </div>
      </div>

      {/* Cuándo visitar */}
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

      {/* Tips del viajero */}
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
  const [page, setPage] = useState<Page>(null);
  const wx = useWeather();

  if (page) {
    if (page.type === 'lugar')        return <LugarDetailPage        id={page.id} onBack={() => setPage(null)} />;
    if (page.type === 'ruta')         return <RutaDetailPage         id={page.id} onBack={() => setPage(null)} />;
    if (page.type === 'itinerario')   return <ItinerarioDetailPage   id={page.id} onBack={() => setPage(null)} />;
    if (page.type === 'alojamiento')  return <AlojamientoDetailPage  id={page.id} onBack={() => setPage(null)} />;
    if (page.type === 'restaurante')  return <RestauranteDetailPage  id={page.id} onBack={() => setPage(null)} />;
  }

  const isPudi = tab === 'pudi';

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh', background:T.bg, overflow:'hidden' }}>
      <div style={{ flex:1, overflowY: isPudi ? 'hidden' : 'auto', overflowX:'hidden', display: isPudi ? 'flex' : 'block', flexDirection:'column' }} className={isPudi ? '' : 'hide-scrollbar'}>
        {tab === 'home'      && <HomeTab wx={wx} navigate={setPage} onTabChange={setTab} />}
        {tab === 'explorar'  && <ExplorarTab navigate={setPage} />}
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
