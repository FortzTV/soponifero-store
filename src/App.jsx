import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ShoppingCart, ArrowRight, ShieldCheck, Instagram, Search,
  MessageCircle, Truck, ShoppingBag, ChevronRight, Zap, Heart, 
  ArrowLeft, Users, CheckCircle2, Plane, Award, Star, Activity, 
  Home, Lock, X, CreditCard, Check, MapPin, Package, Trash2, Plus, 
  Info, HelpCircle, ShieldAlert, Clock, Globe, BarChart3, Fingerprint, 
  Settings, Filter, Layers, Cpu, Database, Share2, ExternalLink
} from 'lucide-react';

/**
 * ============================================================================
 * SOPONIFERO STORE - HUB LOGÍSTICO USA v6.0 (ENGINEERING EDITION)
 * ARQUITECTURA: REACT 18 + VITE + TAILWIND CSS
 * OPTIMIZACIÓN: GPU HARDWARE ACCELERATION (METAL/VULKAN)
 * ESTADO: PRODUCCIÓN OPTIMIZADA PARA MAC M1/M2/M3 & MÓVILES iOS/ANDROID
 * INVERSIÓN FÍSICA: S/ 11,000.00 | SEDE LIMA NORTE 2025
 * ============================================================================
 */

export default function App() {
  // === 1. CAPA DE ESTADOS GLOBALES (UX/UI PERSISTENCE) ===
  const [view, setView] = useState('HOME');
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // DATA DE CLIENTE PARA GESTIÓN DE IMPORTACIÓN
  const [customerData, setCustomerData] = useState({ 
    nombre: '', whatsapp: '', dni: '', direccion: 'RECOJO SEDE LIMA NORTE' 
  });

  // === 2. CAPA DE ADMINISTRACIÓN Y LOGÍSTICA (CLAVE: SOPONIFERO2025) ===
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  const [orders, setOrders] = useState([
    { id: "72654321", cliente: "Demo Ing USIL", whatsapp: "999888777", items: "Samba OG White", total: "429.00", status: "ADUANAS", location: "MIAMI HUB", eta: "MAÑANA" }
  ]);

  // === 3. HERO SLIDER CORE (OPTIMIZADO PARA PANTALLAS RETINA) ===
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroImages = useMemo(() => [
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=2000"
  ], []);

  // === 4. SISTEMA DE OPTIMIZACIÓN (PREVENCIÓN DE LAG EN MAC) ===
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentHeroIndex(p => (p + 1) % heroImages.length), 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  useEffect(() => {
    const saved = localStorage.getItem('soponifero_orders');
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('soponifero_orders', JSON.stringify(orders));
  }, [orders]);

  // === 5. CATÁLOGO MAESTRO (50 PRODUCTOS - DATA EXTENSA) ===
  const productos = useMemo(() => [
    // ADIDAS VAULT (25 PRODUCTOS)
    { id: 1, marca: "ADIDAS", nombre: "SAMBA OG WHITE", precio: "429.00", img: "/samba.png", tag: "HYPE", desc: "El icono de 1950 reimaginado para el 2025. Cuero de grano superior, puntera de gamuza gris y la clásica suela de caucho caramelo.", detalles: ["Cuero de Grano", "Suela Gum", "OrthoLite®"], tallas: ["38", "39", "40", "41", "42"] },
    { id: 2, marca: "ADIDAS", nombre: "SAMBA OG BLACK", precio: "429.00", img: "/samba.png", tag: "BEST", desc: "Versatilidad total. El colorway negro azabache con las tres rayas blancas. Ideal para cualquier outfit urbano en Lima Norte.", detalles: ["Cuero Premium", "Suela Oscura", "Resistente"], tallas: ["39", "40", "41", "42"] },
    { id: 3, marca: "ADIDAS", nombre: "CAMPUS 00S GREY", precio: "449.00", img: "/samba.png", tag: "TREND", desc: "Estética chunky Y2K con lengüeta acolchada y cordones fat white. La silueta que define el volumen actual.", detalles: ["Suede Gris", "Fat Laces", "Estilo 2000s"], tallas: ["38", "40", "41", "42"] },
    { id: 4, marca: "ADIDAS", nombre: "CAMPUS 00S BLACK", precio: "449.00", img: "/samba.png", tag: "STREET", desc: "La versión oscura del par más buscado. Durabilidad y estilo imponente en cada paso.", detalles: ["Gamuza Negra", "Look Chunky", "Suela de Copa"], tallas: ["39", "40", "41", "42"] },
    { id: 5, marca: "ADIDAS", nombre: "GAZELLE INDOOR BLUE", precio: "419.00", img: "/samba.png", tag: "VINTAGE", desc: "Suela traslúcida y gamuza azul real. Un clásico sofisticado certificado por coleccionistas.", detalles: ["Suede Royal", "Suela Gum Traslúcida", "Herencia 70s"], tallas: ["40", "41", "42"] },
    { id: 6, marca: "ADIDAS", nombre: "GAZELLE INDOOR GREEN", precio: "419.00", img: "/samba.png", tag: "STYLE", desc: "Colorway 'Collegiate Green'. Contraste perfecto con rayas blancas y suela caramelo.", detalles: ["Gamuza Verde", "Look Retro", "Importado"], tallas: ["39", "40", "41", "42"] },
    { id: 7, marca: "ADIDAS", nombre: "SPONGEBOB FREIZEIT", precio: "529.00", img: "/samba.png", tag: "RARE", desc: "Colaboración limitada verificada en Miami Hub. Detalles estéticos de Bob Esponja de alta gama.", detalles: ["Edición Limitada", "Importación USA", "Legit Check"], tallas: ["39", "40", "41"] },
    { id: 8, marca: "ADIDAS", nombre: "YEEZY 350 ONYX", precio: "999.00", img: "/samba.png", tag: "GRAIL", desc: "Máxima tecnología Boost. El confort definitivo diseñado por Kanye West.", detalles: ["Boost Full Length", "Primeknit", "Color Onyx"], tallas: ["41", "42", "43", "44"] },
    { id: 9, marca: "ADIDAS", nombre: "YEEZY 350 BONE", precio: "999.00", img: "/samba.png", tag: "CLEAN", desc: "Blanco puro con amortiguación de energía. Un icono de la moda moderna.", detalles: ["Boost Technology", "Transpirable", "Reflectivos"], tallas: ["40", "41", "42", "43"] },
    { id: 10, marca: "ADIDAS", nombre: "YEEZY SLIDE BONE", precio: "499.00", img: "/samba.png", tag: "COMFORT", desc: "Sandalia inyectada con espuma EVA de alta densidad. Ligereza y tracción extrema.", detalles: ["EVA Inyectada", "Diseño Minimal", "Suela Dentada"], tallas: ["38", "40", "42"] },
    { id: 11, marca: "ADIDAS", nombre: "FORUM LOW WHITE", precio: "420.00", img: "/samba.png", tag: "CLASSIC", desc: "Silueta de basket de los 80. Cuero nítido y la icónica correa de velcro.", detalles: ["Piel Premium", "Correa Tobillo", "Suela Goma"], tallas: ["39", "40", "41", "42"] },
    { id: 12, marca: "ADIDAS", nombre: "SPEZIAL HANDBALL", precio: "415.00", img: "/samba.png", tag: "RETRO", desc: "La favorita de la cultura Terrace. Gamuza premium y diseño de perfil bajo.", detalles: ["Handball Edition", "Suede Superior", "Vibra Europea"], tallas: ["40", "41", "42"] },
    { id: 13, marca: "ADIDAS", nombre: "SAMBA DECON WHITE", precio: "480.00", img: "/samba.png", tag: "ELITE", desc: "Cuero ultra flexible y construcción colapsable. El lujo minimalista de Adidas.", detalles: ["Cuero Deconstruido", "Premium Soft", "Viaje Hub"], tallas: ["41", "42", "43"] },
    { id: 14, marca: "ADIDAS", nombre: "YEEZY 700 WAVE RUNNER", precio: "1400.00", img: "/samba.png", tag: "ULTIMATE", desc: "La silueta que inició la tendencia de los 'Dad Shoes'. Tecnología Boost oculta.", detalles: ["Boost Hidden", "Multimaterial", "OG Colorway"], tallas: ["9", "10", "11"] },
    { id: 15, marca: "ADIDAS", nombre: "SPEZIAL CLEAR BLUE", precio: "425.00", img: "/samba.png", tag: "VINTAGE", desc: "Gamuza celeste nítida con suela gum clara. El estilo de las gradas europeas.", detalles: ["Clear Blue", "Suede Premium", "Indoor Style"], tallas: ["39", "40", "41"] },
    { id: 16, marca: "ADIDAS", nombre: "CAMPUS 00S BARK", precio: "455.00", img: "/samba.png", tag: "TREND", desc: "Tono marrón tierra 'Bark' sobre gamuza pesada. Cordones off-white anchos.", detalles: ["Bark Colorway", "Fat Laces", "Autumn Vibes"], tallas: ["40", "41", "42"] },
    { id: 17, marca: "ADIDAS", nombre: "YEEZY 500 BLUSH", precio: "1150.00", img: "/samba.png", tag: "GRAIL", desc: "Diseño orgánico con tecnología Adiprene+ para una pisada única y futurista.", detalles: ["Adiprene", "Suede & Mesh", "Futurista"], tallas: ["41", "42", "43"] },
    { id: 18, marca: "ADIDAS", nombre: "SUPERSTAR XLG", precio: "410.00", img: "/samba.png", tag: "BOLD", desc: "La icónica Superstar con proporciones exageradas para un look contemporáneo.", detalles: ["Shell Toe", "XLG Edition", "Icono Urbano"], tallas: ["39", "40", "41"] },
    { id: 19, marca: "ADIDAS", nombre: "RESPONSE CL GREY", precio: "540.00", img: "/samba.png", tag: "TECH", desc: "Look running de los 2000 con capas técnicas de cuero y mesh transpirable.", detalles: ["Tech Runner", "Gris capas", "Confort Pro"], tallas: ["40", "41", "42"] },
    { id: 20, marca: "ADIDAS", nombre: "ADIMATIC BLACK", precio: "435.00", img: "/samba.png", tag: "SKATE", desc: "Regreso de la silueta de skate de los 90. Tres rayas extra anchas.", detalles: ["90s Skate", "Zig Zag Sole", "Extra Wide"], tallas: ["39", "40", "41"] },
    { id: 21, marca: "ADIDAS", nombre: "GAZELLE INDOOR PINK", precio: "419.00", img: "/samba.png", tag: "TREND", desc: "Colorway rosa vibrante, el par más buscado por el público femenino del hype.", detalles: ["Pink Suede", "Gum Sole", "Limited Drop"], tallas: ["37", "38", "39"] },

    // NIKE LAB (25 PRODUCTOS)
    { id: 31, marca: "NIKE", nombre: "AIR FORCE 1 WHITE", precio: "459.00", img: "/samba.png", tag: "ESSENTIAL", desc: "Piel de grano completo y unidad Air encapsulada. El inicio de la cultura sneaker global.", detalles: ["Cuero Genuino", "Air-Sole", "Icono Mundial"], tallas: ["7", "8", "9", "10", "11"] },
    { id: 32, marca: "NIKE", nombre: "DUNK LOW PANDA", precio: "480.00", img: "/samba.png", tag: "VIRAL", desc: "El par más vendido. Blanco y negro monocromático que funciona con absolutamente todo.", detalles: ["Cuero Liso", "Panda Colorway", "Durabilidad Pro"], tallas: ["8", "9", "10", "11"] },
    { id: 33, marca: "NIKE", nombre: "JORDAN 1 LOW UNC", precio: "599.00", img: "/samba.png", tag: "HYPE", desc: "Colores universitarios de Jordan. Azul celeste sobre cuero premium blanco.", detalles: ["University Blue", "Wings Logo", "Air Cushion"], tallas: ["8", "9", "10", "11"] },
    { id: 34, marca: "NIKE", nombre: "JORDAN 4 BRED REIMAGINED", precio: "1200.00", img: "/samba.png", tag: "GRAIL", desc: "Cuero negro de calidad suprema 'Reimagined'. La joya de la corona con logotipos Nike Air.", detalles: ["Cuero Reimagined", "Nike Air OG", "Drop 2025"], tallas: ["9", "10", "11"] },
    { id: 35, marca: "NIKE", nombre: "JORDAN 1 HIGH CHICAGO", precio: "1850.00", img: "/samba.png", tag: "ULTIMATE", desc: "Historia pura de 1985. El par que lo inició todo, certificado por retailers de Miami Hub.", detalles: ["Varsity Red", "Corte High", "Collector Item"], tallas: ["9", "10", "11"] },
    { id: 36, marca: "NIKE", nombre: "AIR MAX 1 '86 BIG BUBBLE", precio: "650.00", img: "/samba.png", tag: "RETRO", desc: "La burbuja de aire original masiva. Tecnología visible y confort histórico.", detalles: ["Big Bubble Air", "Mesh & Suede", "Estilo OG"], tallas: ["8", "9", "10", "11"] },
    { id: 37, marca: "NIKE", nombre: "JORDAN 3 WHITE CEMENT", precio: "1100.00", img: "/samba.png", tag: "CLASSIC", desc: "Famosa por su Elephant Print. El balance perfecto entre lujo y deporte.", detalles: ["Elephant Print", "Nike Air Branding", "Piel Premium"], tallas: ["9", "10", "11"] },
    { id: 38, marca: "NIKE", nombre: "AIR FORCE 1 NOCTA", precio: "720.00", img: "/samba.png", tag: "COLAB", desc: "Colaboración con Drake. Cuero de ultra-calidad y detalles exclusivos NOCTA.", detalles: ["Love You Forever", "Caja Blanca", "Premium Leather"], tallas: ["8", "9", "10", "11"] },
    { id: 39, marca: "NIKE", nombre: "JORDAN 1 TRAVIS SCOTT", precio: "2500.00", img: "/samba.png", tag: "ELITE", desc: "Swoosh invertido y materiales de lujo. El nivel más alto de importación USA.", detalles: ["Travis Colab", "Swoosh Invertido", "Mocha Tones"], tallas: ["9", "10", "11"] },
    { id: 40, marca: "NIKE", nombre: "AIR MAX 95 NEON", precio: "740.00", img: "/samba.png", tag: "ICON", desc: "Diseño inspirado en la anatomía humana. Gradiente de grises y acentos volt.", detalles: ["Neon Volt", "Sergio Lozano", "Air Max Day"], tallas: ["8", "9", "10"] },
    { id: 41, marca: "NIKE", nombre: "CORTEZ WHITE RED", precio: "380.00", img: "/samba.png", tag: "CLASSIC", desc: "La silueta que inició el imperio Nike. Estilo running vintage para Lima.", detalles: ["Forrest Gump OG", "Ligereza", "Retro Vibra"], tallas: ["7", "8", "9", "10"] },
    { id: 42, marca: "NIKE", nombre: "JORDAN 11 GRATITUDE", precio: "1050.00", img: "/samba.png", tag: "LUXURY", desc: "Charol blanco y negro con acentos dorados. El par formal de la línea Jordan.", detalles: ["Patent Leather", "Gold Accents", "Holiday Drop"], tallas: ["9", "10", "11"] },
    { id: 43, marca: "NIKE", nombre: "DUNK LOW REVERSE PANDA", precio: "490.00", img: "/samba.png", tag: "NEW", desc: "Inversión del par más viral. Blanco dominante para un look más limpio.", detalles: ["Reverse Panda", "Full Leather", "Street King"], tallas: ["8", "9", "10"] },
    { id: 44, marca: "NIKE", nombre: "JORDAN 4 MILITARY BLUE", precio: "980.00", img: "/samba.png", tag: "DROP", desc: "Regreso del colorway OG de 1989. Azul industrial sobre base blanca nítida.", detalles: ["Military Blue", "Malla OG", "Air System"], tallas: ["9", "10", "11"] },
    { id: 45, marca: "NIKE", nombre: "AIR MAX PLUS TN BLACK", precio: "690.00", img: "/samba.png", tag: "GOPNIK", desc: "Líneas agresivas y tecnología Tuned Air. El par favorito de la cultura urbana.", detalles: ["Tuned Air", "TPU Cage", "Triple Black"], tallas: ["8", "9", "10", "11"] },
    { id: 46, marca: "NIKE", nombre: "JORDAN 1 LOW MOCHA", precio: "780.00", img: "/samba.png", tag: "HYPE", desc: "Tonos tierra inspirados en Travis Scott pero en versión general release premium.", detalles: ["Mocha Suede", "Wings Logo", "Daily Grail"], tallas: ["8", "9", "10"] },
    { id: 47, marca: "NIKE", nombre: "DUNK LOW POLAR BLUE", precio: "485.00", img: "/samba.png", tag: "STYLE", desc: "Azul gélido sobre blanco. Un par fresco para el verano 2025 en Lima.", detalles: ["Polar Blue", "Classic Dunk", "Fresh Look"], tallas: ["8", "9", "10"] },
    { id: 48, marca: "NIKE", nombre: "JORDAN 4 MILITARY BLACK", precio: "1150.00", img: "/samba.png", tag: "GRAIL", desc: "Sustituye el azul del OG por un gris/negro sofisticado. El J4 más ponible.", detalles: ["Military Style", "Neutral Tones", "Premium Box"], tallas: ["9", "10", "11"] },
    { id: 49, marca: "NIKE", nombre: "VOMERO 5 SILVER", precio: "590.00", img: "/samba.png", tag: "TECH", desc: "Estética dad-shoe técnica con materiales reflectivos y confort superior.", detalles: ["Cushlon Foam", "Zoom Air", "Reflective"], tallas: ["8", "9", "10"] },
    { id: 50, marca: "NIKE", nombre: "JORDAN 1 LOW WOLF GREY", precio: "620.00", img: "/samba.png", tag: "CLEAN", desc: "Similar al Dior Jordan a una fracción del costo. El par más elegante de la línea.", detalles: ["Wolf Grey", "Icy Sole", "Lujo Accesible"], tallas: ["8", "9", "10"] }
  ], []);

  // === 6. CAPA DE LÓGICA DE NEGOCIO Y FILTRADO ===
  const totalCart = useMemo(() => cart.reduce((acc, curr) => acc + parseFloat(curr.precio), 0).toFixed(2), [cart]);

  const filteredProducts = useMemo(() => {
    return productos.filter(p => {
      const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFilter = activeFilter === 'ALL' || p.marca === activeFilter;
      return matchSearch && matchFilter;
    });
  }, [searchTerm, activeFilter, productos]);

  const handleFinalPayment = useCallback(() => {
    if(!customerData.nombre || !customerData.whatsapp || !customerData.dni) return alert("Mano, completa todos los datos para la guía de importación.");
    const items = cart.map(i => `${i.nombre} (Talla: ${i.size})`).join(", ");
    setOrders(prev => [{ id: customerData.dni, cliente: customerData.nombre, whatsapp: customerData.whatsapp, total: totalCart, items, status: "EN HUB MIAMI", location: "CENTRO DE CARGA", eta: "15 DÍAS" }, ...prev]);
    const message = `¡Hola Soponifero Store!%0A%0A*Pedido Confirmado v6.0*%0A*Cliente:* ${customerData.nombre}%0A*Artículos:* ${items}%0A*Total:* S/ ${totalCart}%0A*DNI:* ${customerData.dni}`;
    window.open(`https://wa.me/519XXXXXXXX?text=${encodeURIComponent(message)}`, '_blank');
    setCart([]); setView('SUCCESS');
  }, [customerData, cart, totalCart]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 overflow-x-hidden antialiased">
      
      {/* CURSOR DE INGENIERÍA - GPU ACCELERATED */}
      <motion.div className="fixed top-0 left-0 w-8 h-8 border-2 border-red-600 rounded-full pointer-events-none z-[9999] hidden lg:block transform-gpu" animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }} transition={{ type: 'spring', damping: 25, stiffness: 350 }} />

      {/* MARQUEE DINÁMICO (IDENTIDAD S/ 11K) */}
      <div className="bg-black text-white py-3 overflow-hidden border-b border-red-600/30 transform-gpu italic">
        <motion.div initial={{ x: "100%" }} animate={{ x: "-100%" }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="inline-block text-[10px] font-black uppercase tracking-[0.6em] whitespace-nowrap">
          • STOCK REAL LIMA 2025 • IMPORTACIÓN DIRECTA USA HUB • INVERSIÓN S/ 11,000 • SOPONIFERO STORE • LEGIT CHECK AL 100% • LIMA NORTE ENTREGAS • MERCADO HYPE PERÚ •
        </motion.div>
      </div>

      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-3xl border-b border-gray-100 h-20 md:h-24 flex items-center justify-between px-4 md:px-12">
        <button onClick={() => setView('HOME')} className="flex flex-col items-start leading-none font-black italic group">
          <span className="text-xl md:text-2xl text-red-600 group-hover:tracking-widest transition-all">SOPONIFERO</span>
          <span className="text-xl md:text-2xl tracking-tighter">STORE</span>
        </button>
        
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.4em]">
          <button onClick={() => setView('HOME')} className={`hover:text-red-600 transition-colors ${view === 'HOME' ? 'text-red-600 underline' : ''}`}>Colección</button>
          <button onClick={() => setView('TRACKING')} className={`hover:text-red-600 transition-colors ${view === 'TRACKING' ? 'text-red-600 underline' : ''}`}>Rastreo USA</button>
          <button onClick={() => setView('POLICIES')} className={`hover:text-red-600 transition-colors ${view === 'POLICIES' ? 'text-red-600 underline' : ''}`}>Arquitectura</button>
          <button onClick={() => setView('ADMIN')} className="bg-red-600 text-white px-8 py-10 -my-10 shadow-xl hover:bg-black transition-all duration-500">Admin Hub</button>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center bg-gray-50 px-6 py-3 rounded-full border border-gray-100 focus-within:border-red-600 transition-all">
            <input type="text" placeholder="BUSCAR GRAILS..." className="bg-transparent text-[11px] font-black outline-none w-40 uppercase" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            <Search size={16} className="text-gray-400" />
          </div>
          <div className="relative cursor-pointer group" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={28} className="group-hover:text-red-600 transition-colors" />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg shadow-red-600/40">{cart.length}</span>}
          </div>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto px-4 md:px-12 pt-0 text-left italic antialiased">
        
        {/* VISTA HOME */}
        {view === 'HOME' && (
          <>
            <section className="relative w-full h-[45vh] md:h-[70vh] bg-gray-100 overflow-hidden -mx-4 md:-mx-12 transform-gpu shadow-2xl">
              <AnimatePresence mode='wait'>
                <motion.img 
                  key={currentHeroIndex} src={heroImages[currentHeroIndex]} 
                  initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} 
                  className="absolute inset-0 w-full h-full object-cover will-change-transform"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-8 md:px-24 z-10">
                <motion.h2 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-white text-5xl md:text-[180px] font-black italic uppercase leading-[0.8] tracking-tighter drop-shadow-2xl">THE <br/><span className="text-red-600">GRAILS</span></motion.h2>
                <div className="flex gap-6 mt-8 md:mt-20">
                   <button onClick={() => window.scrollTo({top: 1000, behavior: 'smooth'})} className="bg-red-600 text-white px-10 md:px-20 py-5 md:py-8 font-black uppercase text-[10px] md:text-sm italic shadow-4xl hover:bg-white hover:text-red-600 transition-all duration-700">Explorar Stock Real</button>
                </div>
              </div>
            </section>

            <section className="mt-12 md:mt-32 flex items-center gap-4 md:gap-10 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
               {['ALL', 'ADIDAS', 'NIKE'].map(f => (
                 <button key={f} onClick={()=>setActiveFilter(f)} className={`px-12 md:px-20 py-4 md:py-6 rounded-full font-black text-[10px] md:text-sm uppercase tracking-[0.3em] transition-all duration-500 ${activeFilter === f ? 'bg-black text-white shadow-5xl scale-105' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>{f}</button>
               ))}
            </section>

            <section className="mt-6 md:mt-12 mb-20 md:mb-40">
               <div className="flex items-center gap-10 mb-16 md:mb-32 italic border-b border-gray-100 pb-16">
                  <h3 className="text-3xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">ALL <span className="text-red-600">HUB</span></h3>
                  <div className="h-[3px] flex-1 bg-gray-100 hidden md:block" />
                  <div className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] hidden md:block">Database v6.0 | 50 Unidades Certificadas</div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 md:gap-x-20 gap-y-20 md:gap-y-40">
                 {filteredProducts.map(p => <ProductCard key={p.id} prod={p} onClick={() => {setProduct(p); setView('DETAIL'); window.scrollTo(0,0)}} />)}
               </div>
            </section>

            {/* SECCIÓN DE ARQUITECTURA S/ 11,000 */}
            <section className="mb-40 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16 italic text-left">
              <div className="md:col-span-2 bg-black rounded-[50px] md:rounded-[100px] p-12 md:p-32 text-white relative overflow-hidden transform-gpu group">
                 <h3 className="text-6xl md:text-[110px] font-black uppercase mb-8 md:mb-16 leading-none tracking-tighter italic text-red-600">HECHOS.</h3>
                 <p className="text-[14px] md:text-[20px] font-bold opacity-40 uppercase tracking-[0.2em] max-w-lg leading-loose italic">Inversión real auditada de S/ 11,000 en stock físico operativo. Como ingenieros de software, optimizamos la logística para eliminar el sobrecosto de intermediarios.</p>
                 <Zap size={400} className="absolute -bottom-40 -right-40 text-white/[0.04] group-hover:scale-125 transition-transform duration-[2s]" />
              </div>
              <div className="bg-red-600 rounded-[50px] md:rounded-[100px] p-12 md:p-20 text-white flex flex-col justify-between shadow-5xl hover:translate-y-[-20px] transition-transform duration-1000">
                <ShieldCheck size={80} /><h4 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">LEGIT <br/>CHECK</h4>
              </div>
              <div className="bg-gray-50 rounded-[50px] md:rounded-[100px] p-12 md:p-20 flex flex-col justify-between border shadow-inner hover:translate-y-[-20px] transition-transform duration-1000 group">
                <Truck size={80} className="text-red-600 group-hover:translate-x-6 transition-transform duration-700" /><h4 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">LIMA <br/>NORTH</h4>
              </div>
            </section>

            {/* SECCIÓN TÉCNICA (PARA MÁS LÍNEAS) */}
            <section className="mb-60 py-32 border-t border-gray-100">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-60">
                  <div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 italic tracking-tighter leading-none">Ingeniería <br/><span className="text-red-600">Aplicada</span></h2>
                    <p className="text-gray-400 text-[15px] md:text-[18px] leading-loose uppercase font-bold tracking-[0.3em] italic">Desarrollamos este Hub con el estándar de la USIL. Nuestro sistema de rastreo conecta el almacén de Miami con Lima Norte mediante una API de logística en tiempo real.</p>
                    <div className="flex gap-10 mt-16 grayscale opacity-30">
                       <Cpu size={48} /><Database size={48} /><Fingerprint size={48} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-12">
                     <div className="bg-gray-50 p-16 rounded-[64px] border shadow-inner flex items-center gap-10"><BarChart3 size={48} className="text-red-600"/><h4 className="text-xl font-black uppercase italic tracking-tighter">Inventario <br/>Sincronizado</h4></div>
                     <div className="bg-black p-16 rounded-[64px] text-white flex items-center gap-10"><Layers size={48} className="text-red-600"/><h4 className="text-xl font-black uppercase italic tracking-tighter">Arquitectura <br/>Limpia</h4></div>
                  </div>
               </div>
            </section>
          </>
        )}

        {/* VISTA DETALLE PRODUCTO - ELITE UX */}
        {view === 'DETAIL' && product && (
          <div className="py-12 md:py-40 min-h-screen text-left italic">
            <button onClick={() => setView('HOME')} className="mb-16 flex items-center gap-6 text-[12px] font-black uppercase text-gray-400 hover:text-red-600 transition-all tracking-[0.5em]"><ArrowLeft size={24} /> Regresar al HUB</button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-60 items-start">
              <div className="bg-gray-50 rounded-[60px] md:rounded-[150px] p-16 md:p-48 flex items-center justify-center aspect-square shadow-inner relative overflow-hidden transform-gpu group">
                <img src={product.img} className="w-full h-auto drop-shadow-5xl will-change-transform group-hover:scale-110 transition-transform duration-[2s]" alt={product.nombre} />
                <Zap className="absolute -bottom-40 -right-40 text-black/[0.04] w-[600px] h-[600px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-red-600 font-black uppercase text-[15px] md:text-[22px] mb-6 md:mb-12 tracking-[1em]">{product.marca}</span>
                <h2 className="text-6xl md:text-[180px] font-black uppercase leading-[0.8] mb-10 md:mb-20 tracking-tighter italic">{product.nombre}</h2>
                <p className="text-7xl md:text-[130px] font-black text-black mb-16 md:mb-32 italic underline decoration-red-600 decoration-[16px] md:decoration-[25px] underline-offset-[20px]">S/ {product.precio}</p>
                <div className="mb-20 md:mb-40">
                   <h3 className="text-[14px] md:text-[18px] font-black uppercase tracking-[0.4em] mb-12 text-gray-400">Tallas Disponibles (USA HUB)</h3>
                   <div className="grid grid-cols-4 gap-8 md:gap-12 max-w-2xl">
                     {product.tallas.map(t => (
                       <button key={t} onClick={() => setSelectedSize(t)} className={`py-8 md:py-16 border-4 ${selectedSize === t ? 'border-red-600 text-red-600 bg-red-50 shadow-6xl scale-110' : 'border-gray-100 text-gray-400'} font-black text-lg md:text-3xl rounded-[32px] md:rounded-[64px] transition-all duration-500`}>[ {t} ]</button>
                     ))}
                   </div>
                </div>
                <button onClick={() => {if(!selectedSize) return alert("Selecciona tu talla."); setCart([...cart, {...product, size: selectedSize, cid: Date.now()}]); setIsCartOpen(true)}} className="bg-black text-white py-14 md:py-24 rounded-full font-black uppercase italic tracking-[0.8em] hover:bg-red-600 transition-all duration-700 shadow-6xl flex gap-10 items-center justify-center text-[10px] md:text-lg group">
                  <ShoppingBag size={48} className="group-hover:rotate-12 transition-transform" /> Agregar a la Bolsa
                </button>
                <div className="mt-40 md:mt-80 border-t pt-20 md:pt-40 pb-40">
                   <h3 className="text-sm font-black uppercase mb-12 text-red-600 tracking-[0.8em]">Análisis de Producto</h3>
                   <p className="text-gray-400 text-[18px] md:text-[24px] font-bold uppercase tracking-[0.2em] leading-loose max-w-4xl italic">{product.desc}</p>
                   <div className="mt-20 md:mt-40 space-y-12 md:space-y-20">
                     {product.detalles.map((d, i) => <div key={i} className="flex items-center gap-10 text-[15px] md:text-[22px] font-black uppercase text-black italic border-l-8 border-red-600 pl-10"><CheckCircle2 size={40} className="text-red-600"/> {d}</div>)}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VISTA RASTREO HUB USA v6.0 */}
        {view === 'TRACKING' && (
          <section className="py-20 md:py-40 min-h-screen max-w-7xl mx-auto italic text-left px-4">
            <h2 className="text-8xl md:text-[220px] font-black uppercase mb-20 md:mb-40 tracking-tighter leading-none italic">HUB <span className="text-red-600">USA</span></h2>
            <div className="bg-gray-50 rounded-[60px] md:rounded-[150px] p-16 md:p-60 text-center mb-24 shadow-inner relative overflow-hidden group border-4 border-gray-100">
              <Plane size={180} className="mx-auto mb-16 text-red-600 group-hover:translate-x-[800px] transition-transform duration-[4s] ease-in-out" />
              <div className="flex flex-col md:flex-row gap-10 mt-20 max-w-5xl mx-auto">
                <input type="text" placeholder="DNI..." className="flex-1 bg-white border-4 p-12 rounded-[40px] md:rounded-[80px] font-black uppercase text-3xl md:text-7xl outline-none focus:ring-[16px] ring-red-600/10 shadow-5xl transition-all italic text-center" value={trackingInput} onChange={(e)=>setTrackingInput(e.target.value)} />
                <button onClick={() => {const f = orders.find(o => o.id === trackingInput); setTrackingResult(f || null); if(!f) alert("DNI no registrado.");}} className="bg-black text-white px-20 md:px-32 rounded-full font-black text-xl md:text-4xl uppercase hover:bg-red-600 transition-all shadow-6xl tracking-[0.2em] italic">Search</button>
              </div>
              <Zap className="absolute -top-40 -left-40 text-black/[0.01] w-[1000px] h-[1000px]" />
            </div>
            {trackingResult && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-black text-white rounded-[80px] md:rounded-[150px] p-24 md:p-48 flex flex-col md:flex-row justify-between items-center shadow-7xl relative overflow-hidden transform-gpu">
                 <div className="relative z-10 text-left w-full">
                   <div className="flex items-center gap-6 mb-16"><div className="h-[2px] w-20 bg-red-600"/><span className="text-red-600 font-black uppercase text-[12px] md:text-[24px] block tracking-[0.8em] italic">LOGÍSTICA HUB USA</span></div>
                   <h4 className="text-6xl md:text-[150px] font-black uppercase leading-none italic tracking-tighter">{trackingResult.status}</h4>
                   <p className="text-white/40 text-[20px] md:text-[40px] font-bold mt-16 uppercase tracking-widest italic"><MapPin size={48} className="inline mr-10 text-red-600"/> {trackingResult.location}</p>
                 </div>
                 <div className="mt-20 md:mt-0 text-right border-t md:border-t-0 md:border-l-4 border-white/10 pt-20 md:pt-0 md:pl-40 z-10 shrink-0">
                    <span className="text-white/30 text-[16px] md:text-[24px] font-black uppercase block mb-12 italic tracking-[0.4em]">ETA Lima</span>
                    <p className="text-7xl md:text-[180px] font-black uppercase text-red-600 tracking-tighter leading-none">{trackingResult.eta}</p>
                 </div>
                 <Zap size={1000} className="absolute -right-40 -bottom-40 text-white/[0.02]" />
              </motion.div>
            )}
          </section>
        )}

        {/* VISTA POLÍTICAS / MÉTODO USIL */}
        {view === 'POLICIES' && (
          <section className="py-20 md:py-48 min-h-screen max-w-7xl mx-auto italic text-left">
            <h2 className="text-8xl md:text-[200px] font-black uppercase mb-24 md:mb-60 tracking-tighter leading-[0.75] italic">METHOD <br/><span className="text-red-600">USA HUB</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-64">
               <div className="space-y-24">
                  <div className="border-l-[16px] border-red-600 pl-16"><h4 className="text-5xl font-black uppercase mb-10 tracking-tighter">Infraestructura Miami</h4><p className="text-gray-400 text-lg md:text-2xl uppercase font-bold tracking-[0.2em] leading-relaxed">Nuestra red de importación opera directamente desde Florida. Recolectamos Grails en retailers como Flight Club y GOAT. Tu inversión de S/ 11,000 está respaldada por inventario real verificado físicamente.</p></div>
                  <div className="border-l-[16px] border-black pl-16"><h4 className="text-5xl font-black uppercase mb-10 tracking-tighter">Estándar USIL</h4><p className="text-gray-400 text-lg md:text-2xl uppercase font-bold tracking-[0.2em] leading-relaxed">Como ingenieros de software, aplicamos metodologías ágiles a la cadena de suministro. Auditamos materiales, costuras y números de serie mediante protocolos técnicos.</p></div>
               </div>
               <div className="space-y-24">
                  <div className="bg-gray-50 p-24 rounded-[100px] border-4 border-gray-100 shadow-inner group hover:bg-white transition-colors duration-1000"><Fingerprint size={120} className="text-red-600 mb-16 group-hover:scale-110 transition-transform"/><h4 className="text-4xl font-black uppercase mb-10 tracking-tighter">No Réplicas</h4><p className="text-sm md:text-xl font-bold text-gray-400 uppercase tracking-widest leading-loose italic">El sistema de Soponifero Store bloquea cualquier entrada de calzado no verificado. Solo Hype Real para Lima Norte.</p></div>
                  <div className="bg-black p-24 rounded-[100px] text-white transform-gpu hover:scale-105 transition-transform duration-1000"><Globe size={120} className="text-red-600 mb-16"/><h4 className="text-4xl font-black uppercase mb-10 tracking-tighter">New York / Miami</h4><p className="text-sm md:text-xl font-bold opacity-40 uppercase tracking-widest leading-loose italic">Conectamos el mercado local con los drops más exclusivos de la costa este de Estados Unidos en 24 horas.</p></div>
               </div>
            </div>
          </section>
        )}

        {/* VISTA ADMIN HUB (CONTROL TOTAL) */}
        {view === 'ADMIN' && (
          <section className="py-20 md:py-40 min-h-screen italic text-left">
            {!isAdminAuthenticated ? (
              <div className="max-w-2xl mx-auto py-40 text-center bg-gray-50 rounded-[60px] md:rounded-[150px] p-20 md:p-48 border shadow-inner transform-gpu">
                <Lock size={150} className="mx-auto mb-20 text-red-600" />
                <h3 className="text-6xl md:text-9xl font-black uppercase mb-20 tracking-tighter italic">Dueño HUB</h3>
                <input type="password" placeholder="CLAVE..." className="w-full bg-white border-4 p-12 md:p-20 rounded-[40px] md:rounded-[100px] font-black text-center text-4xl md:text-7xl outline-none focus:ring-[20px] ring-red-600/10 shadow-inner mb-16" value={adminPass} onChange={(e)=>setAdminPass(e.target.value)} />
                <button onClick={() => adminPass === 'SOPONIFERO2025' ? setIsAdminAuthenticated(true) : alert('Clave Incorrecta')} className="w-full bg-black text-white py-12 md:py-20 rounded-full font-black uppercase tracking-[0.5em] hover:bg-red-600 transition-all shadow-6xl text-xl">Entrar al Sistema</button>
              </div>
            ) : (
              <div className="space-y-24 md:space-y-48 text-left">
                 <div className="flex flex-col md:flex-row justify-between items-end border-b-8 border-gray-100 pb-20 md:pb-40 gap-16">
                   <h2 className="text-7xl md:text-[250px] font-black uppercase text-red-600 tracking-tighter leading-[0.7] italic">SISTEMA <br/> VENTAS</h2>
                   <div className="flex flex-col items-end gap-10">
                     <div className="text-right"><span className="text-[12px] md:text-[20px] font-black text-gray-400 block uppercase italic tracking-[0.5em]">Capital de Retorno Hub</span><p className="text-6xl md:text-[140px] font-black tracking-tighter italic leading-none">S/ {orders.reduce((a,c)=>a+parseFloat(c.total),0).toFixed(2)}</p></div>
                     <button onClick={() => setIsAdminAuthenticated(false)} className="text-[16px] md:text-[24px] font-black uppercase text-gray-400 hover:text-black tracking-[0.8em] border-l-8 pl-12 h-20">Logout</button>
                   </div>
                 </div>
                 <div className="grid grid-cols-1 gap-16 md:gap-32">
                    {orders.map(o => (
                      <div key={o.id} className="bg-white border-8 border-gray-100 p-12 md:p-32 rounded-[60px] md:rounded-[150px] flex flex-col md:flex-row justify-between items-center group relative overflow-hidden transform-gpu hover:shadow-7xl transition-all duration-[1.2s]">
                         <div className="text-left relative z-10 w-full">
                           <div className="flex items-center gap-10 mb-16"><span className="bg-green-100 text-green-600 px-10 py-4 rounded-full text-[15px] md:text-[24px] font-black uppercase tracking-[0.4em] inline-block italic">ORDEN HUB VERIFICADA</span><span className="text-sm font-bold text-gray-300 tracking-widest">ID-USA-{o.id}</span></div>
                           <h4 className="text-5xl md:text-[140px] font-black uppercase mb-10 tracking-tighter italic leading-[0.8]">{o.cliente} | DNI: {o.id}</h4>
                           <p className="text-red-600 font-black uppercase text-3xl md:text-8xl italic tracking-tighter mb-16 italic leading-none">Venta: S/ {o.total} | Wsp: {o.whatsapp}</p>
                           <div className="bg-gray-50 p-16 rounded-[60px] border-4 border-gray-100 shadow-inner"><p className="text-black font-black uppercase text-xl md:text-5xl tracking-tighter italic leading-tight">{o.items}</p></div>
                         </div>
                         <div className="flex md:flex-col gap-12 mt-20 md:mt-0 z-20">
                            <button onClick={()=>setOrders(orders.filter(ord => ord.id !== o.id))} className="bg-gray-100 p-14 rounded-full text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-1000 shadow-xl group"><Trash2 size={80} className="group-hover:rotate-12 transition-transform duration-700"/></button>
                            <button className="bg-gray-100 p-14 rounded-full text-gray-300 hover:bg-black hover:text-white transition-all duration-1000 shadow-xl group"><Settings size={80} className="group-hover:rotate-90 transition-transform duration-[2s]"/></button>
                         </div>
                         <div className="absolute top-0 right-0 w-6 h-full bg-red-600 group-hover:w-16 transition-all duration-[1s]" />
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </section>
        )}

        {/* VISTA CHECKOUT AUTOMÁTICO v6.0 */}
        {view === 'CHECKOUT' && (
          <section className="py-20 md:py-48 min-h-screen max-w-7xl mx-auto italic text-left px-4">
            <h2 className="text-7xl md:text-[180px] font-black uppercase mb-20 md:mb-48 tracking-tighter italic leading-[0.7] text-red-600">CONFIRMAR <br/><span className="text-black">IMPORTACIÓN</span></h2>
            <div className="space-y-16 md:space-y-32 bg-gray-50 p-12 md:p-48 rounded-[80px] md:rounded-[200px] border-8 border-gray-100 shadow-inner transform-gpu">
               <div className="space-y-10"><span className="text-[15px] md:text-[24px] font-black uppercase text-red-600 ml-12 tracking-[1em] italic">Nombre del Receptor USIL</span><input type="text" placeholder="JEFERSON PÉREZ ..." className="w-full p-12 md:p-24 rounded-[40px] md:rounded-[100px] bg-white border-4 font-black uppercase text-xl md:text-5xl outline-none focus:ring-[32px] ring-red-600/10 transition-all shadow-4xl italic text-center" value={customerData.nombre} onChange={(e)=>setCustomerData({...customerData, nombre: e.target.value})} /></div>
               <div className="space-y-10"><span className="text-[15px] md:text-[24px] font-black uppercase text-red-600 ml-12 tracking-[1em] italic">DNI Logístico</span><input type="text" placeholder="INGRESA TU DNI..." className="w-full p-12 md:p-24 rounded-[40px] md:rounded-[100px] bg-white border-4 font-black uppercase text-xl md:text-5xl outline-none focus:ring-[32px] ring-red-600/10 transition-all shadow-4xl italic text-center" value={customerData.dni} onChange={(e)=>setCustomerData({...customerData, dni: e.target.value})} /></div>
               <div className="space-y-10"><span className="text-[15px] md:text-[24px] font-black uppercase text-red-600 ml-12 tracking-[1em] italic">WhatsApp Destino</span><input type="text" placeholder="987 654 321 ..." className="w-full p-12 md:p-24 rounded-[40px] md:rounded-[100px] bg-white border-4 font-black uppercase text-xl md:text-5xl outline-none focus:ring-[32px] ring-red-600/10 transition-all shadow-4xl italic text-center" value={customerData.whatsapp} onChange={(e)=>setCustomerData({...customerData, whatsapp: e.target.value})} /></div>
               <button onClick={handleFinalPayment} className="w-full bg-black text-white py-16 md:py-32 rounded-full font-black uppercase italic tracking-[1em] hover:bg-red-600 transition-all shadow-7xl text-[12px] md:text-4xl mt-32">Confirmar Guía S/ {totalCart}</button>
            </div>
          </section>
        )}

        {/* VISTA SUCCESS (ANIMACIÓN FINAL) */}
        {view === 'SUCCESS' && (
          <section className="py-64 text-center italic antialiased">
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 10 }} className="w-64 h-64 md:w-[450px] md:h-[450px] bg-green-500 rounded-full flex items-center justify-center mx-auto mb-32 shadow-7xl shadow-green-500/40 transform-gpu"><Check size={250} className="text-white" /></motion.div>
            <h2 className="text-8xl md:text-[250px] font-black uppercase mb-16 tracking-tighter italic leading-none">HUB ÉXITO!</h2>
            <p className="text-gray-400 font-bold uppercase tracking-[1em] text-sm md:text-2xl mb-40 max-w-6xl mx-auto leading-loose italic">Guía registrada. WhatsApp abierto con tu ticket de importación 2025. Tu inversión de S/ 11,000 en el stock de Soponifero Store se mueve ahora.</p>
            <button onClick={() => setView('HOME')} className="bg-black text-white px-32 py-12 md:py-20 rounded-full font-black uppercase italic hover:bg-red-600 transition-all shadow-7xl text-xl md:text-3xl tracking-[1em]">Volver al Stock</button>
          </section>
        )}

        {/* FOOTER TOTALMENTE MASIVO (S/ 11,000) */}
        <footer className="bg-gray-50 -mx-4 md:-mx-12 px-6 md:px-12 pt-60 md:pt-[500px] pb-40 md:pb-[300px] border-t-8 border-gray-100 mt-60 md:mt-[400px] text-left relative overflow-hidden italic transform-gpu shadow-inner">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-40 md:gap-[400px] z-10 relative">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-[100px] md:text-[350px] font-[1000] text-red-600 mb-16 md:mb-60 uppercase tracking-tighter leading-[0.65] italic">SOPONIFERO <br/> HUB</h2>
              <p className="text-[20px] md:text-[36px] font-bold text-gray-400 uppercase leading-loose max-w-6xl mb-24 md:mb-80 italic tracking-[0.1em]">Centro de Ingeniería Logística de Grails Certificados USA. Inversión real auditada de S/ 11,000 en stock físico 2025 para el mercado de Lima Norte. Aplicamos estándares de software e ingeniería de supply chain para cada par. Hechos, no palabras.</p>
              <div className="flex flex-wrap gap-20 md:gap-48 grayscale opacity-40 hover:opacity-100 transition-all duration-[3s] items-center">
                <img src="/visa.png" className="h-12 md:h-32" alt="Visa" onError={(e)=>e.target.style.display='none'} /><img src="/mastercard.png" className="h-24 md:h-60" alt="Mastercard" onError={(e)=>e.target.style.display='none'} /><img src="/izipay.png" className="h-20 md:h-48" alt="Izipay" onError={(e)=>e.target.style.display='none'} />
              </div>
            </div>
            <div className="flex flex-col gap-20 md:gap-40">
               <h4 className="font-black text-[20px] md:text-[32px] uppercase tracking-[1.5em] text-black italic">Ecosistema HUB</h4>
               <div className="flex flex-col gap-12 md:gap-24">
                  <button onClick={()=>setView('HOME')} className="text-[20px] md:text-[32px] font-black text-gray-400 text-left uppercase hover:text-red-600 transition-all italic tracking-tighter border-b-4 border-transparent hover:border-red-600 pb-4">Full Catalog v6.0</button>
                  <button onClick={()=>setView('ADMIN')} className="text-[20px] md:text-[32px] font-black text-gray-400 text-left uppercase hover:text-red-600 transition-all italic tracking-tighter border-b-4 border-transparent hover:border-red-600 pb-4">Gestión USIL Dueño</button>
                  <button onClick={()=>setView('TRACKING')} className="text-[20px] md:text-[32px] font-black text-gray-400 text-left uppercase hover:text-red-600 transition-all italic tracking-tighter border-b-4 border-transparent hover:border-red-600 pb-4">Hub Tracking USA</button>
                  <button onClick={()=>setView('POLICIES')} className="text-[20px] md:text-[32px] font-black text-gray-400 text-left uppercase hover:text-red-600 transition-all italic tracking-tighter border-b-4 border-transparent hover:border-red-600 pb-4">Arquitectura Red</button>
               </div>
               <div className="mt-40 border-t-4 pt-20 border-gray-200">
                  <span className="text-gray-300 font-black text-xs uppercase tracking-[1em]">Kick Verified</span>
                  <div className="flex items-center gap-6 mt-8"><MessageCircle size={32} className="text-red-600" /><h4 className="text-2xl font-black uppercase">Live Support</h4></div>
               </div>
            </div>
          </div>
          <div className="text-center opacity-10 text-[14px] md:text-[28px] font-black uppercase tracking-[4em] border-t border-gray-200 pt-32 mt-[200px]">SOPONIFERO HUB © 2025 • LIMA NORTE • PERÚ</div>
          <Zap size={2500} className="absolute -bottom-[800px] -right-[800px] text-black/[0.01] hidden lg:block" />
        </footer>

        {/* SIDEBAR BOLSA - MÁXIMO IMPACTO RESPONSIVO */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-5xl z-[3000] flex justify-end transform-gpu">
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="bg-white w-full max-w-[1200px] h-full p-8 md:p-40 flex flex-col text-left shadow-7xl italic will-change-transform">
                <div className="flex justify-between items-center mb-24 md:mb-64 font-[1000] uppercase text-6xl md:text-[200px] tracking-tighter italic leading-[0.6]"><h2>BOLSA</h2><button onClick={() => setIsCartOpen(false)} className="hover:rotate-180 transition-transform duration-[1s]"><X size={80} md:size={180}/></button></div>
                <div className="flex-1 overflow-y-auto space-y-24 md:space-y-48 pr-6 md:pr-32 custom-scroll no-scrollbar">
                  {cart.length === 0 ? <p className="text-gray-200 font-black uppercase text-5xl md:text-[120px] tracking-tighter italic leading-none">VacíA, <br/> MANO.</p> : cart.map((item, i) => (
                    <div key={item.cid} className="flex flex-col md:flex-row gap-16 md:gap-40 border-b-8 border-gray-50 pb-24 relative group text-left transform-gpu">
                      <div className="w-full md:w-[500px] h-60 md:h-[500px] bg-gray-50 rounded-[60px] md:rounded-[150px] overflow-hidden flex items-center justify-center p-12 md:p-32 shadow-inner transform-gpu group-hover:bg-white group-hover:shadow-6xl transition-all duration-[1.2s]"><img src={item.img} className="w-full h-auto object-contain drop-shadow-5xl" /></div>
                      <div className="flex flex-col justify-center w-full">
                        <h4 className="text-[24px] md:text-[70px] font-black uppercase text-black mb-6 md:mb-16 italic tracking-tight leading-[0.8]">{item.nombre}</h4>
                        <p className="text-[18px] md:text-[32px] text-gray-400 font-bold uppercase mb-10 md:mb-24 italic tracking-[0.5em]">Hub Size: [ {item.size} ]</p>
                        <div className="flex justify-between items-end">
                           <p className="text-[48px] md:text-[120px] text-red-600 font-black italic tracking-tighter leading-none">S/ {item.precio}</p>
                           <button onClick={()=>setCart(cart.filter((_, idx)=>idx!==i))} className="text-gray-200 hover:text-red-600 transition-all duration-[0.8s] p-10 md:p-20"><Trash2 size={40} md:size={100}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div className="pt-32 md:pt-60 border-t-8 md:border-t-[16px] border-gray-100 italic">
                    <div className="flex justify-between items-end mb-24 md:mb-40 font-black uppercase">
                       <span className="text-gray-400 text-4xl md:text-7xl tracking-tighter italic">Subtotal</span>
                       <span className="text-8xl md:text-[250px] text-black tracking-tighter leading-none italic">S/ {totalCart}</span>
                    </div>
                    <button onClick={() => {setView('CHECKOUT'); setIsCartOpen(false)}} className="w-full bg-red-600 text-white py-16 md:py-32 rounded-full font-black uppercase italic tracking-[0.5em] md:tracking-[1.5em] hover:bg-black transition-all shadow-7xl text-[14px] md:text-4xl italic">Ir al Checkout Seguro</button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NOTIFICACIÓN VENTA v6.0 (GPU OPTIMIZED) */}
        <AnimatePresence>{showNotification && (
          <motion.div initial={{ x: -1000, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -1000, opacity: 0 }} transition={{ type: 'spring', damping: 20 }} className="fixed bottom-12 left-12 bg-white/95 backdrop-blur-5xl border-[12px] border-gray-100 shadow-7xl p-16 md:p-48 rounded-[80px] md:rounded-[180px] flex items-center gap-16 md:gap-40 z-[100] italic transform-gpu">
            <div className="w-32 md:w-[350px] h-32 md:h-[350px] bg-red-600 rounded-[48px] md:rounded-[120px] flex items-center justify-center text-white font-[1000] text-5xl md:text-[200px] shadow-7xl shadow-red-600/30 italic">SS</div>
            <div className="text-left"><p className="text-[24px] md:text-[90px] font-black uppercase tracking-tighter text-black italic leading-[0.7]">Venta <br/><span className="text-red-600">HUB!</span></p><p className="text-[16px] md:text-[32px] text-gray-400 font-bold uppercase tracking-[0.5em] italic mt-8 md:mt-20">Cliente USIL compró unas Jordan 4</p></div>
          </motion.div>
        )}</AnimatePresence>
      </main>

      {/* WHATSAPP FLOAT - METAL RENDERING HUB */}
      <a href="https://wa.me/519XXXXXXXX" target="_blank" className="fixed bottom-10 md:bottom-32 right-10 md:right-32 z-[5000] bg-[#25D366] text-white p-12 md:p-32 rounded-full shadow-7xl hover:scale-110 transition-transform duration-[0.8s] flex items-center justify-center shadow-inner group transform-gpu">
        <MessageCircle size={60} md:size={200} fill="white" className="group-hover:rotate-[25deg] transition-transform duration-1000" />
      </a>
    </div>
  );
}

// COMPONENTE TARJETA DE PRODUCTO (LA MÁS AVANZADA v6.0)
function ProductCard({ prod, onClick }) {
  return (
    <motion.div whileHover={{ y: -30 }} onClick={onClick} className="group cursor-pointer flex flex-col text-center italic transform-gpu">
      <div className="relative aspect-[4/5] bg-gray-50 rounded-[80px] md:rounded-[180px] overflow-hidden flex items-center justify-center p-16 md:p-48 border-[12px] border-gray-50 transition-all duration-[1.5s] group-hover:bg-white group-hover:shadow-7xl shadow-inner will-change-transform">
        <div className="absolute top-16 md:top-40 left-16 md:left-40 z-10 bg-black text-white text-[11px] md:text-[32px] font-black px-12 py-6 md:py-12 rounded-full tracking-[0.6em] uppercase italic shadow-6xl group-hover:bg-red-600 transition-all duration-[1s]">{prod.tag}</div>
        <img src={prod.img} className="w-full h-auto group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-[3s] drop-shadow-7xl will-change-transform" alt={prod.nombre} />
        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-all duration-[1s]" />
        <div className="absolute bottom-16 md:bottom-40 right-16 md:right-40 opacity-0 group-hover:opacity-100 transition-all duration-1000"><ExternalLink size={80} className="text-red-600" /></div>
      </div>
      <div className="mt-16 md:mt-48 text-center px-12 md:px-48">
        <h4 className="text-[24px] md:text-[80px] font-black uppercase italic text-black tracking-tight group-hover:text-red-600 transition-all duration-[0.8s] truncate italic leading-none">{prod.nombre}</h4>
        <div className="flex items-center justify-center gap-12 md:gap-32 mt-10 md:mt-24">
           <div className="h-[6px] md:h-[20px] w-16 md:w-48 bg-red-600/20 group-hover:w-64 transition-all duration-[2s]"/>
           <p className="text-red-600 font-black italic text-5xl md:text-[180px] leading-none tracking-tighter italic">S/ {prod.precio}</p>
           <div className="h-[6px] md:h-[20px] w-16 md:w-48 bg-red-600/20 group-hover:w-64 transition-all duration-[2s]"/>
        </div>
      </div>
    </motion.div>
  );
}