import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, ArrowRight, ShieldCheck, Instagram, Search,
  MessageCircle, Truck, ShoppingBag, ChevronRight, Zap, Heart, 
  ArrowLeft, Users, CheckCircle2, Plane, Award, Star, Activity, Home, Lock, X, CreditCard, Check, MapPin, Package, Trash2, Plus
} from 'lucide-react';

/**
 * SOPONIFERO STORE - HUB DE IMPORTACIONES USA v2.0 (LIMA NORTE)
 * ESTADO: PRODUCCIÓN OPTIMIZADA PARA MAC Y MÓVIL
 * TOTAL LÍNEAS ESTIMADAS: 530+
 */

export default function App() {
  // ==========================================
  // 1. ESTADOS PRINCIPALES DE LA APLICACIÓN
  // ==========================================
  const [view, setView] = useState('HOME');
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // DATOS DE CLIENTE PARA WHATSAPP AUTOMÁTICO
  const [customerData, setCustomerData] = useState({ 
    nombre: '', 
    whatsapp: '', 
    dni: '', 
    direccion: 'LIMA NORTE' 
  });

  // ==========================================
  // 2. HERO SLIDER (5 IMÁGENES / 5 SEGUNDOS)
  // ==========================================
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroImages = useMemo(() => [
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=1600"
  ], []);

  // ==========================================
  // 3. SISTEMA DE GESTIÓN Y RASTREO (ADMIN)
  // ==========================================
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // ÓRDENES SIMULADAS PARA PANEL DE DUEÑO
  const [orders, setOrders] = useState([
    { id: "72654321", cliente: "Demo USIL", whatsapp: "999888777", items: "Samba OG White", total: "429.00", status: "EN LIMA", location: "CENTRO DISTRIBUCIÓN", eta: "MAÑANA" }
  ]);

  // ==========================================
  // 4. EFECTOS Y OPTIMIZACIÓN DE RENDIMIENTO
  // ==========================================
  
  // SEGUIMIENTO DE MOUSE (SOLO PC)
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // NOTIFICACIÓN AUTOMÁTICA DE VENTA
  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  // INTERVALO DEL SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  // PERSISTENCIA DE DATOS
  useEffect(() => {
    const so = localStorage.getItem('soponifero_orders');
    if (so) setOrders(JSON.parse(so));
  }, []);

  useEffect(() => {
    localStorage.setItem('soponifero_orders', JSON.stringify(orders));
  }, [orders]);

  // ==========================================
  // 5. CATÁLOGO MAESTRO (20 PRODUCTOS DETALLADOS)
  // ==========================================
  const productos = useMemo(() => [
    { 
      id: 1, marca: "ADIDAS", nombre: "SAMBA OG WHITE", precio: "429.00", img: "/samba.png", tag: "HYPE", 
      desc: "El icono de 1950 reimaginado para el 2025. Cuero de grano superior, puntera de gamuza gris y la clásica suela de caucho caramelo. Importación directa de USA verificada.", 
      detalles: ["Cuero de Grano", "Suela Gum", "Stock Real"], tallas: ["38", "39", "40", "41", "42"] 
    },
    { 
      id: 2, marca: "ADIDAS", nombre: "SAMBA OG CORE BLACK", precio: "429.00", img: "/samba.png", tag: "BEST", 
      desc: "Versatilidad total. El colorway negro azabache con las tres rayas blancas. Ideal para cualquier outfit urbano en Lima Norte.", 
      detalles: ["Cuero Premium", "Suela Oscura", "Resistente"], tallas: ["39", "40", "41", "42"] 
    },
    { 
      id: 3, marca: "ADIDAS", nombre: "CAMPUS 00S GREY", precio: "449.00", img: "/samba.png", tag: "CHUNKY", 
      desc: "Estética Y2K masiva. Lengüeta ultra acolchada y cordones fat white. La silueta que define el volumen en el streetwear actual.", 
      detalles: ["Suede Gris", "Fat Laces", "Estilo 2000s"], tallas: ["38", "40", "41", "42"] 
    },
    { 
      id: 4, marca: "ADIDAS", nombre: "CAMPUS 00S BLACK", precio: "449.00", img: "/samba.png", tag: "STREET", 
      desc: "Negro absoluto sobre una construcción robusta. El par más buscado por su durabilidad y estilo imponente.", 
      detalles: ["Gamuza Premium", "Cordones Blancos", "Look Chunky"], tallas: ["39", "40", "41", "42"] 
    },
    { 
      id: 5, marca: "ADIDAS", nombre: "GAZELLE INDOOR BLUE", precio: "419.00", img: "/samba.png", tag: "VINTAGE", 
      desc: "Gamuza azul real y suela traslúcida envolvente. Un clásico de los 70 que regresa con materiales de lujo.", 
      detalles: ["Suede Royal", "Suela Gum Traslúcida", "Drop 2025"], tallas: ["40", "41", "42"] 
    },
    { 
      id: 6, marca: "ADIDAS", nombre: "GAZELLE INDOOR GREEN", precio: "419.00", img: "/samba.png", tag: "STYLE", 
      desc: "El colorway 'Collegiate Green' que todos quieren. Contraste perfecto con las tres rayas blancas y suela caramelo.", 
      detalles: ["Gamuza Verde", "Look Retro", "Importado"], tallas: ["39", "40", "41", "42"] 
    },
    { 
      id: 7, marca: "ADIDAS", nombre: "SPONGEBOB FREIZEIT", precio: "529.00", img: "/samba.png", tag: "RARE", 
      desc: "Colaboración exclusiva limitada verificada en Miami Hub. Detalles estéticos de Bob Esponja en silueta Freizeit de alta gama.", 
      detalles: ["Edición Limitada", "Box Especial", "Legit Check"], tallas: ["39", "40", "41"] 
    },
    { 
      id: 8, marca: "ADIDAS", nombre: "YEEZY 350 ONYX", precio: "999.00", img: "/samba.png", tag: "GRAIL", 
      desc: "Máxima tecnología Boost. Primeknit que se adapta como una media para una comodidad futurista sin precedentes.", 
      detalles: ["Boost Full Length", "Tejido Primeknit", "Color Onyx"], tallas: ["41", "42", "43", "44"] 
    },
    { 
      id: 9, marca: "ADIDAS", nombre: "YEEZY 350 BONE", precio: "999.00", img: "/samba.png", tag: "CLEAN", 
      desc: "Blanco puro con amortiguación de alta respuesta. El par definitivo para el verano y looks minimalistas.", 
      detalles: ["Color Bone", "Amortiguación Pro", "Respirable"], tallas: ["40", "41", "42", "43"] 
    },
    { 
      id: 10, marca: "ADIDAS", nombre: "YEEZY SLIDE BONE", precio: "499.00", img: "/samba.png", tag: "COMFORT", 
      desc: "La sandalia que cambió el juego. Espuma EVA inyectada para ligereza y un diseño ergonómico de vanguardia.", 
      detalles: ["EVA Inyectada", "Diseño Minimal", "Suela Dentada"], tallas: ["38", "40", "42"] 
    },
    { 
      id: 21, marca: "NIKE", nombre: "AIR FORCE 1 WHITE", precio: "459.00", img: "/samba.png", tag: "ESSENTIAL", 
      desc: "Piel de grano completo y unidad Air encapsulada. El inicio de la cultura sneaker global en su versión más nítida.", 
      detalles: ["Cuero Genuino", "Air-Sole", "Icono Mundial"], tallas: ["7", "8", "9", "10", "11"] 
    },
    { 
      id: 22, marca: "NIKE", nombre: "DUNK LOW PANDA", precio: "480.00", img: "/samba.png", tag: "VIRAL", 
      desc: "El par más vendido. Blanco y negro monocromático que funciona con absolutamente todo. Importado de retailers USA.", 
      detalles: ["Cuero Liso", "Panda Colorway", "Tracción de Copa"], tallas: ["8", "9", "10", "11", "12"] 
    },
    { 
      id: 23, marca: "NIKE", nombre: "JORDAN 1 LOW UNC", precio: "599.00", img: "/samba.png", tag: "HYPE", 
      desc: "Colores universitarios de MJ. Azul celeste sobre cuero blanco de alta calidad. Wings logo bordado en el talón.", 
      detalles: ["University Blue", "Wings Logo", "Corte Low"], tallas: ["8", "9", "10", "11"] 
    },
    { 
      id: 24, marca: "NIKE", nombre: "JORDAN 4 BRED REIMAGINED", precio: "1200.00", img: "/samba.png", tag: "GRAIL", 
      desc: "Cuero negro de calidad suprema 'Reimagined'. La joya de la corona con logotipos Nike Air originales.", 
      detalles: ["Cuero Premium", "Nike Air OG", "Caja Especial"], tallas: ["9", "10", "11"] 
    },
    { 
      id: 25, marca: "NIKE", nombre: "DUNK LOW GREY FOG", precio: "520.00", img: "/samba.png", tag: "CLEAN", 
      desc: "Alternativa sofisticada al Panda. Gris niebla sobre base blanca para una rotación más elegante y sutil.", 
      detalles: ["Gris Fog", "Suela de Copa", "Leather Premium"], tallas: ["8", "9", "10", "11"] 
    },
    { 
      id: 26, marca: "NIKE", nombre: "JORDAN 1 HIGH CHICAGO", precio: "1850.00", img: "/samba.png", tag: "ULTIMATE", 
      desc: "Historia pura de 1985. El par que lo inició todo, certificado por retailers de Miami. Coleccionismo puro.", 
      detalles: ["Varsity Red", "Corte High OG", "Hype Máximo"], tallas: ["9", "10", "11"] 
    },
    { 
      id: 27, marca: "NIKE", nombre: "AIR MAX 1 '86 BIG BUBBLE", precio: "650.00", img: "/samba.png", tag: "RETRO", 
      desc: "La burbuja de aire original masiva. Tecnología visible y confort histórico de la era dorada de Nike.", 
      detalles: ["Big Bubble", "Mesh & Suede", "Estilo 80s"], tallas: ["8", "9", "10", "11"] 
    },
    { 
      id: 28, marca: "NIKE", nombre: "JORDAN 3 WHITE CEMENT", precio: "1100.00", img: "/samba.png", tag: "CLASSIC", 
      desc: "Famosa por su Elephant Print. El balance perfecto entre calzado deportivo de lujo y herencia Jordan.", 
      detalles: ["Elephant Print", "Nike Air Branding", "Piel de Lujo"], tallas: ["9", "10", "11"] 
    },
    { 
      id: 29, marca: "NIKE", nombre: "AIR FORCE 1 NOCTA", precio: "720.00", img: "/samba.png", tag: "COLAB", 
      desc: "Colaboración con Drake. Cuero premium y detalles exclusivos en la entresuela. Un par de estatus.", 
      detalles: ["Love You Forever", "Cuero de Grano", "Caja Nocta"], tallas: ["8", "9", "10", "11"] 
    },
    { 
      id: 30, marca: "NIKE", nombre: "JORDAN 1 LOW TRAVIS SCOTT", precio: "2500.00", img: "/samba.png", tag: "ELITE", 
      desc: "Swoosh invertido y materiales de ultra-lujo. El nivel más alto de importación directa de USA.", 
      detalles: ["Swoosh Invertido", "Travis Scott Colab", "Máximo Estatus"], tallas: ["9", "10", "11"] 
    }
  ], []);

  // ==========================================
  // 6. LÓGICA DE NEGOCIO Y FILTRADO
  // ==========================================
  const totalCart = useMemo(() => cart.reduce((acc, curr) => acc + parseFloat(curr.precio), 0).toFixed(2), [cart]);

  const handleFinalPayment = useCallback(() => {
    if(!customerData.nombre || !customerData.whatsapp || !customerData.dni) return alert("Mano, completa tus datos para el envío.");
    const items = cart.map(i => `${i.nombre} (${i.size})`).join(", ");
    const newOrder = { id: customerData.dni, cliente: customerData.nombre, whatsapp: customerData.whatsapp, total: totalCart, items, status: "EN PROCESO", location: "MIAMI HUB" };
    setOrders(prev => [newOrder, ...prev]);
    const message = `¡Hola Soponifero Store! Acabo de pedir: ${items}. Total: S/ ${totalCart}. Mi DNI: ${customerData.dni}`;
    window.open(`https://wa.me/519XXXXXXXX?text=${encodeURIComponent(message)}`, '_blank');
    setCart([]); setView('SUCCESS');
  }, [customerData, cart, totalCart]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 overflow-x-hidden antialiased">
      
      {/* CURSOR - GPU ACCELERATED PARA MAC */}
      <motion.div className="fixed top-0 left-0 w-8 h-8 border-2 border-red-600 rounded-full pointer-events-none z-[9999] hidden lg:block transform-gpu" animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }} transition={{ type: 'spring', damping: 25, stiffness: 250 }} />

      {/* MARQUEE DINÁMICO */}
      <div className="bg-black text-white py-3 overflow-hidden border-b border-red-600/30 italic transform-gpu">
        <motion.div initial={{ x: "100%" }} animate={{ x: "-100%" }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="inline-block text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">
          • STOCK REAL LIMA 2025 • IMPORTACIÓN USA • INVERSIÓN S/ 11,000 • SOPONIFERO STORE • LEGIT CHECK 100% • LIMA NORTE •
        </motion.div>
      </div>

      {/* NAVBAR RESPONSIVA */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 h-20 md:h-24 flex items-center justify-between px-4 md:px-12">
        <button onClick={() => setView('HOME')} className="flex flex-col items-start leading-none font-black italic tracking-tighter group">
          <span className="text-xl md:text-2xl text-red-600 group-hover:tracking-widest transition-all">SOPONIFERO</span>
          <span className="text-xl md:text-2xl">STORE</span>
        </button>
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.3em]">
          <button onClick={() => setView('HOME')} className="hover:text-red-600 transition-colors">Colecciones</button>
          <button onClick={() => setView('TRACKING')} className="hover:text-red-600 transition-colors">Rastreo USA</button>
          <button className="bg-red-600 text-white px-8 py-10 -my-10 shadow-2xl hover:bg-black transition-all">Sale</button>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <Users size={22} className="cursor-pointer hover:text-red-600" onClick={() => setView('ADMIN')} />
          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={26} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg">{cart.length}</span>}
          </div>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto px-4 md:px-12 pt-0 text-left">
        
        {/* VISTA HOME */}
        {view === 'HOME' && (
          <>
            {/* HERO SLIDER 60VH / OPTIMIZADO PARA MÓVIL */}
            <section className="relative w-full h-[45vh] md:h-[65vh] bg-gray-100 overflow-hidden -mx-4 md:-mx-12 transform-gpu">
              <AnimatePresence mode='wait'>
                <motion.img 
                  key={currentHeroIndex} src={heroImages[currentHeroIndex]} 
                  initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} 
                  className="absolute inset-0 w-full h-full object-cover will-change-transform"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-8 md:px-24">
                <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-white text-5xl md:text-[140px] font-black italic uppercase leading-[0.8] tracking-tighter drop-shadow-2xl italic">THE <br/><span className="text-red-600">GRAILS</span></motion.h2>
                <div className="flex gap-4 mt-8 md:mt-12">
                   <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="bg-red-600 text-white px-8 md:px-12 py-4 md:py-6 font-black uppercase text-[10px] md:text-xs italic shadow-2xl hover:bg-white hover:text-red-600 transition-all">Explorar Stock</button>
                </div>
              </div>
            </section>

            {/* GRILLA DE PRODUCTOS - FIX CELULAR (1 COL) / TABLET (2 COL) / PC (4 COL) */}
            <section className="mt-16 md:mt-32 mb-20 md:mb-40">
               <div className="flex items-center gap-6 md:gap-10 mb-12 md:mb-24 italic border-b border-gray-100 pb-10">
                  <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tighter italic">LATEST <span className="text-red-600">HUB</span></h3>
                  <div className="h-[2px] flex-1 bg-gray-100 hidden md:block" />
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest hidden md:block">Importación USA 2025</div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-16 md:gap-y-32">
                 {productos.map(p => <ProductCard key={p.id} prod={p} onClick={() => {setProduct(p); setView('DETAIL'); window.scrollTo(0,0)}} />)}
               </div>
            </section>

            {/* INFO BLOCKS - FIX CELULAR (VERTICAL) */}
            <section className="mb-40 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 italic text-left">
              <div className="md:col-span-2 bg-black rounded-[40px] md:rounded-[80px] p-12 md:p-24 text-white relative overflow-hidden transform-gpu">
                 <h3 className="text-5xl md:text-8xl font-black uppercase mb-8 md:mb-12 leading-none tracking-tighter italic">HECHOS NO <br/><span className="text-red-600">PALABRAS.</span></h3>
                 <p className="text-[12px] md:text-[15px] font-bold opacity-40 uppercase tracking-[0.2em] max-w-md leading-loose">Inversión real de S/ 11,000 en stock físico para Lima Norte. No somos dropshipping, somos ingeniería de importación.</p>
                 <Zap size={350} className="absolute -bottom-20 -right-20 text-white/[0.03] hidden lg:block" />
              </div>
              <div className="bg-red-600 rounded-[40px] md:rounded-[80px] p-12 md:p-16 text-white flex flex-col justify-between shadow-3xl hover:translate-y-[-10px] transition-transform duration-700">
                <ShieldCheck size={50} md:size={80} /><h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">LEGIT <br/>CHECKED</h4>
              </div>
              <div className="bg-gray-50 rounded-[40px] md:rounded-[80px] p-12 md:p-16 flex flex-col justify-between border shadow-inner hover:translate-y-[-10px] transition-transform duration-700">
                <Truck size={50} md:size={80} className="text-red-600" /><h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">LIMA <br/>LOGISTICS</h4>
              </div>
            </section>
          </>
        )}

        {/* VISTA DETALLE PRODUCTO */}
        {view === 'DETAIL' && product && (
          <div className="py-12 md:py-24 min-h-screen text-left italic">
            <button onClick={() => setView('HOME')} className="mb-12 flex items-center gap-3 text-[10px] md:text-[11px] font-black uppercase text-gray-400 hover:text-red-600 transition-all tracking-widest"><ArrowLeft size={18} /> Volver a Colección</button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-40 items-start">
              <div className="bg-gray-50 rounded-[40px] md:rounded-[100px] p-12 md:p-24 flex items-center justify-center aspect-square shadow-inner relative overflow-hidden transform-gpu">
                <img src={product.img} className="w-full h-auto drop-shadow-4xl will-change-transform group-hover:scale-110 transition-transform duration-1000" alt={product.nombre} />
                <Zap className="absolute -bottom-20 -right-20 text-black/[0.04] w-[400px] h-[400px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-red-600 font-black uppercase text-[12px] md:text-[16px] mb-4 md:mb-8 tracking-[0.6em]">{product.marca}</span>
                <h2 className="text-5xl md:text-[130px] font-black uppercase leading-[0.85] mb-8 md:mb-12 tracking-tighter italic">{product.nombre}</h2>
                <p className="text-6xl md:text-9xl font-black text-black mb-12 md:mb-20 italic underline decoration-red-600 decoration-[8px] md:decoration-[12px] underline-offset-[16px]">S/ {product.precio}</p>
                <div className="mb-12 md:mb-20">
                   <h3 className="text-[11px] md:text-[13px] font-black uppercase tracking-widest mb-8 md:mb-12 text-gray-400">Tallas Disponibles (US)</h3>
                   <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-lg">
                     {product.tallas.map(t => (
                       <button key={t} onClick={() => setSelectedSize(t)} className={`py-5 md:py-8 border-2 ${selectedSize === t ? 'border-red-600 text-red-600 bg-red-50 shadow-2xl scale-105' : 'border-gray-100 text-gray-400'} font-black text-xs md:text-lg rounded-[20px] md:rounded-[32px] transition-all`}>[ {t} ]</button>
                     ))}
                   </div>
                </div>
                <button onClick={() => {if(!selectedSize) return alert("Selecciona tu talla, mano."); setCart([...cart, {...product, size: selectedSize, cid: Date.now()}]); setIsCartOpen(true)}} className="bg-black text-white py-8 md:py-12 rounded-full font-black uppercase italic tracking-[0.4em] hover:bg-red-600 transition-all shadow-4xl flex gap-6 items-center justify-center text-[10px] md:text-sm">
                  <ShoppingBag size={28} /> Agregar a la Bolsa
                </button>
                <div className="mt-20 md:mt-32 border-t pt-16 md:pt-24 pb-20">
                   <h3 className="text-xs font-black uppercase mb-8 text-red-600 tracking-[0.3em]">Especificaciones Técnicas</h3>
                   <p className="text-gray-400 text-[14px] md:text-[18px] font-bold uppercase tracking-widest leading-loose italic max-w-xl">{product.desc}</p>
                   <div className="mt-12 md:mt-20 space-y-5 md:space-y-8">
                     {product.detalles.map((d, i) => <div key={i} className="flex items-center gap-4 text-[11px] md:text-[13px] font-black uppercase text-black"><CheckCircle2 size={24} className="text-red-600"/> {d}</div>)}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VISTA CHECKOUT AUTOMÁTICO */}
        {view === 'CHECKOUT' && (
          <section className="py-20 md:py-40 min-h-screen max-w-3xl mx-auto italic text-left">
            <h2 className="text-6xl md:text-[110px] font-black uppercase mb-16 md:mb-24 tracking-tighter italic">Finalizar <br/><span className="text-red-600">Pedido</span></h2>
            <div className="space-y-8 md:space-y-12 bg-gray-50 p-10 md:p-24 rounded-[40px] md:rounded-[100px] border shadow-inner">
               <input type="text" placeholder="NOMBRE COMPLETO" className="w-full p-8 md:p-12 rounded-[24px] md:rounded-[48px] bg-white border font-black uppercase text-xs md:text-sm outline-none focus:ring-4 ring-red-600" value={customerData.nombre} onChange={(e)=>setCustomerData({...customerData, nombre: e.target.value})} />
               <input type="text" placeholder="DNI (RASTREO HUB)" className="w-full p-8 md:p-12 rounded-[24px] md:rounded-[48px] bg-white border font-black uppercase text-xs md:text-sm outline-none focus:ring-4 ring-red-600" value={customerData.dni} onChange={(e)=>setCustomerData({...customerData, dni: e.target.value})} />
               <input type="text" placeholder="WHATSAPP DESTINO" className="w-full p-8 md:p-12 rounded-[24px] md:rounded-[48px] bg-white border font-black uppercase text-xs md:text-sm outline-none focus:ring-4 ring-red-600" value={customerData.whatsapp} onChange={(e)=>setCustomerData({...customerData, whatsapp: e.target.value})} />
               <button onClick={handleFinalPayment} className="w-full bg-black text-white py-10 md:py-16 rounded-full font-black uppercase italic tracking-[0.5em] md:tracking-[0.8em] hover:bg-red-600 transition-all shadow-4xl text-[10px] md:text-xs">Confirmar Pedido S/ {totalCart}</button>
            </div>
          </section>
        )}

        {/* VISTA ADMIN PROFESIONAL */}
        {view === 'ADMIN' && (
          <section className="py-20 md:py-40 min-h-screen italic text-left">
            {!isAdminAuthenticated ? (
              <div className="max-w-md mx-auto py-24 text-center bg-gray-50 rounded-[40px] md:rounded-[100px] p-12 md:p-24 border shadow-inner">
                <Lock size={60} md:size={100} className="mx-auto mb-12 text-red-600" />
                <h3 className="text-4xl md:text-6xl font-black uppercase mb-12 tracking-tighter italic">Dueño HUB</h3>
                <input type="password" placeholder="CLAVE..." className="w-full bg-white border-2 p-8 md:p-12 rounded-[32px] md:rounded-[48px] font-black text-center text-lg md:text-2xl outline-none focus:ring-4 ring-red-600 transition-all" value={adminPass} onChange={(e)=>setAdminPass(e.target.value)} />
                <button onClick={() => adminPass === 'SOPONIFERO2025' ? setIsAdminAuthenticated(true) : alert('Clave Incorrecta')} className="w-full bg-black text-white py-8 md:py-12 rounded-full font-black uppercase tracking-widest mt-12 hover:bg-red-600 transition-all shadow-3xl">Entrar al Panel</button>
              </div>
            ) : (
              <div className="space-y-12 md:space-y-24 text-left">
                 <div className="flex justify-between items-end border-b-4 pb-12 md:pb-24">
                   <h2 className="text-5xl md:text-[130px] font-black uppercase text-red-600 tracking-tighter italic">HUB LOGÍSTICO</h2>
                   <button onClick={() => setIsAdminAuthenticated(false)} className="text-[10px] md:text-[14px] font-black uppercase text-gray-400 hover:text-black tracking-[0.4em]">Logout</button>
                 </div>
                 <div className="grid grid-cols-1 gap-8 md:gap-12">
                    {orders.map(o => (
                      <div key={o.id} className="bg-white border-4 border-gray-100 p-8 md:p-20 rounded-[40px] md:rounded-[100px] flex justify-between items-center group relative overflow-hidden transform-gpu">
                         <div className="text-left relative z-10">
                           <span className="bg-green-100 text-green-600 px-6 py-2 rounded-full text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] mb-8 inline-block italic">ORDEN CONFIRMADA</span>
                           <h4 className="text-3xl md:text-8xl font-black uppercase mb-4 tracking-tighter italic">{o.cliente} | DNI: {o.id}</h4>
                           <p className="text-red-600 font-black uppercase text-lg md:text-4xl italic tracking-tighter">S/ {o.total} | Wsp: {o.whatsapp}</p>
                           <p className="text-gray-400 font-bold uppercase text-[10px] md:text-[16px] mt-6 tracking-widest">{o.items}</p>
                         </div>
                         <button onClick={()=>setOrders(orders.filter(ord => ord.id !== o.id))} className="text-gray-100 hover:text-red-600 transition-all z-20"><Trash2 size={40} md:size={64}/></button>
                         <div className="absolute top-0 right-0 w-4 h-full bg-red-600 group-hover:w-8 transition-all duration-1000" />
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </section>
        )}

        {/* FOOTER INTEGRO (S/ 11K) */}
        <footer className="bg-gray-50 -mx-4 md:-mx-12 px-6 md:px-12 pt-40 md:pt-80 pb-24 md:pb-48 border-t border-gray-100 mt-40 md:mt-80 text-left relative overflow-hidden italic transform-gpu">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24 md:gap-48 z-10 relative">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-7xl md:text-[160px] font-black text-red-600 mb-12 md:mb-24 uppercase tracking-tighter leading-none italic">SOPONIFERO <br/> STORE</h2>
              <p className="text-[15px] md:text-[22px] font-bold text-gray-400 uppercase leading-loose max-w-2xl mb-16 md:mb-32 italic tracking-[0.1em]">Centro Logístico de Grails Certificados. Inversión real de S/ 11,000 en stock físico 2025. Somos el hub oficial de importación directa USA para Lima Norte. Hechos, no palabras.</p>
              <div className="flex flex-wrap gap-12 md:gap-24 grayscale opacity-40 hover:opacity-100 transition-all duration-[3s] items-center">
                <img src="/visa.png" className="h-8 md:h-16" alt="Visa" onError={(e)=>e.target.style.display='none'} />
                <img src="/mastercard.png" className="h-16 md:h-32" alt="Mastercard" onError={(e)=>e.target.style.display='none'} />
                <img src="/izipay.png" className="h-14 md:h-28" alt="Izipay" onError={(e)=>e.target.style.display='none'} />
              </div>
            </div>
            <div className="flex flex-col gap-10 md:gap-16">
               <h4 className="font-black text-[13px] md:text-[18px] uppercase tracking-[0.8em] text-black italic">Arquitectura HUB</h4>
               <button onClick={()=>setView('HOME')} className="text-[15px] md:text-[20px] font-bold text-gray-400 text-left uppercase hover:text-red-600 transition-all italic">Hype 2025</button>
               <button onClick={()=>setView('ADMIN')} className="text-[15px] md:text-[20px] font-bold text-gray-400 text-left uppercase hover:text-red-600 transition-all italic">Acceso Dueño</button>
               <button onClick={()=>setView('TRACKING')} className="text-[15px] md:text-[20px] font-bold text-gray-400 text-left uppercase hover:text-red-600 transition-all italic">Rastreo Internacional</button>
            </div>
          </div>
          <div className="text-center opacity-10 text-[11px] md:text-[16px] font-black uppercase tracking-[3em] border-t border-gray-200 pt-32 mt-60">SOPONIFERO STORE © 2025 • LIMA, PERÚ</div>
          <Zap size={1400} className="absolute -bottom-[400px] -right-[400px] text-black/[0.01] hidden lg:block" />
        </footer>

        {/* SIDEBAR BOLSA - FIX CELULAR (FULL WIDTH) */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-3xl z-[3000] flex justify-end transform-gpu">
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="bg-white w-full max-w-3xl h-full p-8 md:p-24 flex flex-col text-left shadow-5xl italic will-change-transform">
                <div className="flex justify-between items-center mb-16 md:mb-32 font-black uppercase text-5xl md:text-9xl tracking-tighter italic"><h2>MI BOLSA</h2><button onClick={() => setIsCartOpen(false)}><X size={48} md:size={100}/></button></div>
                <div className="flex-1 overflow-y-auto space-y-12 md:space-y-20 pr-4 md:pr-10 custom-scroll">
                  {cart.length === 0 ? <p className="text-gray-200 font-black uppercase text-3xl md:text-6xl tracking-tighter italic">Nada aquí, mano.</p> : cart.map((item, i) => (
                    <div key={i} className="flex gap-8 md:gap-20 border-b-4 border-gray-50 pb-12 relative group text-left transform-gpu">
                      <div className="w-28 md:w-64 h-28 md:h-64 bg-gray-50 rounded-[28px] md:rounded-[72px] overflow-hidden flex items-center justify-center p-6 md:p-14 shadow-inner"><img src={item.img} className="w-full h-auto object-contain drop-shadow-5xl" /></div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-[14px] md:text-[28px] font-black uppercase text-black mb-2 md:mb-4 italic tracking-tight">{item.nombre}</h4>
                        <p className="text-[11px] md:text-[18px] text-gray-400 font-bold uppercase mb-4 md:mb-12 italic">Size: [ {item.size} ]</p>
                        <p className="text-[24px] md:text-[50px] text-red-600 font-black italic tracking-tighter leading-none">S/ {item.precio}</p>
                      </div>
                      <button onClick={()=>setCart(cart.filter((_, idx)=>idx!==i))} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-200 hover:text-red-600 transition-all duration-[0.8s]"><Trash2 size={28} md:size={50}/></button>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div className="pt-16 md:pt-32 border-t-4 border-gray-100 italic">
                    <div className="flex justify-between items-end mb-16 md:mb-24 font-black uppercase">
                       <span className="text-gray-400 text-2xl md:text-4xl tracking-tighter italic">Subtotal</span>
                       <span className="text-5xl md:text-[120px] text-black tracking-tighter leading-none italic">S/ {totalCart}</span>
                    </div>
                    <button onClick={() => {setView('CHECKOUT'); setIsCartOpen(false)}} className="w-full bg-red-600 text-white py-12 md:py-20 rounded-full font-black uppercase italic tracking-[0.5em] md:tracking-[1em] hover:bg-black transition-all shadow-5xl text-[10px] md:text-sm italic">Ir al Checkout Seguro</button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NOTIFICACIÓN VENTA - FIX Z-INDEX (Hardware Accelerated) */}
        <AnimatePresence>{showNotification && (
          <motion.div initial={{ x: -600, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -600, opacity: 0 }} className="fixed bottom-6 md:bottom-12 left-6 md:left-12 bg-white/95 backdrop-blur-5xl border-4 border-gray-100 shadow-5xl p-8 md:p-20 rounded-[40px] md:rounded-[80px] flex items-center gap-8 md:gap-16 z-[100] italic transform-gpu">
            <div className="w-20 md:w-44 h-20 md:h-44 bg-red-600 rounded-[28px] md:rounded-[56px] flex items-center justify-center text-white font-black text-3xl md:text-7xl shadow-5xl shadow-red-600/30">SS</div>
            <div className="text-left"><p className="text-[16px] md:text-[32px] font-black uppercase tracking-tighter text-black italic leading-none">Venta Confirmada</p><p className="text-[11px] md:text-[20px] text-gray-400 font-bold uppercase tracking-[0.4em] italic mt-2 md:mt-4">Cliente en Comas compró unas Samba</p></div>
          </motion.div>
        )}</AnimatePresence>
      </main>

      {/* WHATSAPP FLOAT - FIX Z-INDEX (Hardware Accelerated) */}
      <a href="https://wa.me/519XXXXXXXX" target="_blank" className="fixed bottom-6 md:bottom-12 right-6 md:right-12 z-[5000] bg-[#25D366] text-white p-8 md:p-16 rounded-full shadow-4xl hover:scale-110 transition-transform duration-[0.8s] flex items-center justify-center shadow-inner group transform-gpu">
        <MessageCircle size={40} md:size={100} fill="white" className="group-hover:rotate-[20deg] transition-transform duration-700" />
      </a>
    </div>
  );
}

// COMPONENTE TARJETA DE PRODUCTO (FIX RESPONSIVE Y PERFORMANCE)
function ProductCard({ prod, onClick }) {
  return (
    <motion.div whileHover={{ y: -15 }} onClick={onClick} className="group cursor-pointer flex flex-col text-center italic transform-gpu">
      <div className="relative aspect-[4/5] bg-gray-50 rounded-[48px] md:rounded-[100px] overflow-hidden flex items-center justify-center p-12 md:p-24 border-2 border-gray-50 transition-all duration-[1s] group-hover:bg-white group-hover:shadow-5xl shadow-inner will-change-transform">
        <div className="absolute top-10 md:top-24 left-10 md:left-24 z-10 bg-black text-white text-[9px] md:text-[14px] font-black px-8 py-3 rounded-full tracking-[0.4em] uppercase italic shadow-4xl group-hover:bg-red-600 transition-all duration-[1s]">{prod.tag}</div>
        <img src={prod.img} className="w-full h-auto group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-[2s] drop-shadow-5xl will-change-transform" alt={prod.nombre} />
      </div>
      <div className="mt-10 md:mt-20 text-center px-8 md:px-16">
        <h4 className="text-[16px] md:text-[32px] font-black uppercase italic text-black tracking-tight group-hover:text-red-600 transition-all duration-[0.8s] truncate italic">{prod.nombre}</h4>
        <div className="flex items-center justify-center gap-8 md:gap-14 mt-4 md:mt-10">
           <div className="h-[3px] w-10 bg-red-600/20 group-hover:w-20 transition-all duration-[1.2s]"/>
           <p className="text-red-600 font-black italic text-3xl md:text-8xl leading-none tracking-tighter italic">S/ {prod.precio}</p>
           <div className="h-[3px] w-10 bg-red-600/20 group-hover:w-10 transition-all duration-[1.2s]"/>
        </div>
      </div>
    </motion.div>
  );
}