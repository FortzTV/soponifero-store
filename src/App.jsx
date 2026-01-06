import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Search, Users, ArrowLeft, X, Trash2, 
  Filter, Play, ArrowRight
} from 'lucide-react';

/* NOIR - TOKYO HUB v79.0 (MOBILE ALIGNMENT FIX)
   - FIX MÓVIL: Texto y Botón alineados a la izquierda (Start) con separación clara.
   - LAYOUT: Evita que el botón se monte "al medio" del texto.
   - ESTILO: Todo oblicuo, fuente Bank Gothic, Poster de video.
*/

export default function App() {
  // --- ESTILOS GLOBALES ---
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap');
    
    @font-face {
      font-family: 'BankGothic';
      src: url('/fonts/BankGothic.otf') format('opentype');
      font-weight: normal;
      font-style: normal;
    }

    body { 
      font-family: 'BankGothic', sans-serif; 
      font-style: oblique; 
      background-color: #000000; 
      color: #fff; 
      margin: 0; 
      padding: 0; 
      overflow-x: hidden; 
    }
    
    h1, h2, h3, h4, p, button, span, input {
      font-style: oblique !important;
    }

    .nav-item { 
      font-size: 12px; 
      letter-spacing: 0.15em; 
      font-weight: 500; 
      text-transform: uppercase; 
      cursor: pointer; 
      transition: opacity 0.3s;
    }
    .nav-item:hover { opacity: 0.6; }
    
    .video-bg { 
      object-fit: cover; 
      width: 100%; 
      height: 100%; 
      position: absolute; 
      top: 0; 
      left: 0; 
      z-index: 0; 
      opacity: 0.65; 
    }
    
    .campaign-section { 
      height: 100vh; 
      width: 100%; 
      position: relative; 
      overflow: hidden; 
      display: flex; 
      align-items: flex-end; 
      padding-bottom: 80px; 
      background-color: #111; 
    }
    
    /* Ajuste específico para móvil */
    @media (max-width: 768px) {
        .campaign-section { 
            padding-bottom: 140px; /* Más espacio abajo en celular */
            align-items: flex-end; 
        }
    }

    .btn-glass { 
      background: rgba(255,255,255,0.05); 
      backdrop-filter: blur(10px); 
      border: 1px solid rgba(255,255,255,0.3); 
      color: white; 
      padding: 16px 40px; 
      font-size: 11px; 
      font-weight: 700; 
      letter-spacing: 0.25em; 
      text-transform: uppercase; 
      transition: all 0.4s; 
      cursor: pointer;
      width: auto; /* No ocupa todo el ancho */
      display: inline-block;
    }
    .btn-glass:hover { background: white; color: black; box-shadow: 0 0 30px rgba(255,255,255,0.2); }
    
    .hide-scroll::-webkit-scrollbar { display: none; }
    
    .payment-logo {
        height: 20px;
        width: auto;
        filter: brightness(0) invert(1);
        opacity: 0.6;
    }
  `;

  // --- ESTADOS ---
  const [loading, setLoading] = useState(true); 
  const [view, setView] = useState('HOME');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [shippingData, setShippingData] = useState({ nombre: '', direccion: '', dni: '', tarjeta: '' });
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- CATÁLOGO ---
  const productos = useMemo(() => [
    { id: 1, marca: "NIKE", linea: "JORDAN", nombre: "AIR JORDAN 1 CHICAGO", precio: "1850.00", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop", sku: "DZ5485-612", desc: "La leyenda de 1985.", tallas: ["9", "10", "11"] },
    { id: 2, marca: "ADIDAS", linea: "YEEZY", nombre: "YEEZY BOOST 350 BONE", precio: "1200.00", img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=800&auto=format&fit=crop", sku: "HQ6316", desc: "Tecnología Boost.", tallas: ["40", "41", "42"] },
    { id: 3, marca: "NIKE", linea: "DUNK", nombre: "DUNK LOW PANDA", precio: "480.00", img: "https://images.unsplash.com/photo-1637844527273-a6c88b403363?q=80&w=800&auto=format&fit=crop", sku: "DD1391-100", desc: "Versatilidad pura.", tallas: ["8", "9", "10"] },
    { id: 4, marca: "ADIDAS", linea: "ORIGINALS", nombre: "SAMBA OG BLACK", precio: "450.00", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop", sku: "B75807", desc: "Icono del fútbol.", tallas: ["38", "39", "40"] },
    { id: 5, marca: "NIKE", linea: "AIR MAX", nombre: "AIR MAX 90 INFRARED", precio: "550.00", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop", sku: "CT1685-100", desc: "Diseño clásico.", tallas: ["40", "41", "42"] },
    { id: 7, marca: "NIKE", linea: "JORDAN", nombre: "JORDAN 4 BLACK CANVAS", precio: "1450.00", img: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=800&auto=format&fit=crop", sku: "DH7138-006", desc: "Lona resistente.", tallas: ["9", "10"] },
    { id: 9, marca: "NIKE", linea: "AF1", nombre: "AF1 TRIPLE WHITE", precio: "459.00", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop", sku: "CW2288-111", desc: "El lienzo blanco.", tallas: ["8", "9", "10"] },
    { id: 11, marca: "NIKE", linea: "JORDAN", nombre: "JORDAN 1 LOW TRAVIS", precio: "2800.00", img: "https://images.unsplash.com/photo-1586525198428-225f6f12c240?q=80&w=800&auto=format&fit=crop", sku: "DM7866-162", desc: "Swoosh invertido.", tallas: ["9", "10"] },
    { id: 12, marca: "ADIDAS", linea: "YEEZY", nombre: "YEEZY SLIDE PURE", precio: "550.00", img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop", sku: "GW1934", desc: "Confort total.", tallas: ["38", "40", "42"] },
  ], []);

  // --- NAVEGACIÓN ---
  const goToShop = (category) => {
    setActiveCategory(category);
    setView('SHOP'); 
    window.scrollTo(0, 0);
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'ALL') return productos;
    if (activeCategory === 'JORDAN') return productos.filter(p => p.linea === 'JORDAN' || p.nombre.includes('JORDAN'));
    if (activeCategory === 'ADIDAS') return productos.filter(p => p.marca === 'ADIDAS');
    if (activeCategory === 'YEEZY') return productos.filter(p => p.linea === 'YEEZY');
    return productos;
  }, [activeCategory, productos]);

  const totalCart = cart.reduce((acc, curr) => acc + parseFloat(curr.precio), 0).toFixed(2);

  const processPayment = () => {
    if(!shippingData.nombre) return alert("Completa los datos.");
    const itemList = cart.map(i => `${i.nombre} (${i.size})`).join(", ");
    setOrders([{ id: "NOIR-" + Date.now().toString().slice(-4), cliente: shippingData.nombre, items: itemList, total: totalCart, status: "PAGADO" }, ...orders]);
    window.open(`https://wa.me/519XXXXXXXX?text=ORDEN NOIR:%0A${itemList}%0ATotal: S/ ${totalCart}`, '_blank');
    setCart([]); setCheckoutStep(0); setIsCartOpen(false); setView('SUCCESS');
  };

  const getCategoryTitle = () => {
    if (activeCategory === 'ALL') return "COLECCIÓN";
    if (activeCategory === 'JORDAN') return "JORDAN";
    if (activeCategory === 'ADIDAS') return "ADIDAS";
    if (activeCategory === 'YEEZY') return "YEEZY";
    return "CATÁLOGO";
  };

  return (
    <div className="min-h-screen">
      <style>{globalStyles}</style>

      {/* PRELOADER */}
      <AnimatePresence>
        {loading && (
            <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            >
                <motion.img 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    src="/NOIR1.png" 
                    className="h-16 w-auto brightness-0 invert" 
                />
            </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || view !== 'HOME' ? 'bg-white border-b border-gray-100 py-4 shadow-sm' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="w-auto md:w-1/4 cursor-pointer" onClick={() => setView('HOME')}>
            <img 
              src="/NOIR1.png" 
              alt="NOIR" 
              className={`h-10 md:h-14 w-auto object-contain transition-all duration-300 ${scrolled || view !== 'HOME' ? 'brightness-0' : 'brightness-0 invert'}`} 
            />
          </div>
          <nav className="hidden lg:flex items-center justify-center gap-16 w-2/4">
            {['ZAPATILLAS', 'JORDAN', 'ADIDAS', 'HISTORIA'].map((item, i) => (
                <button 
                    key={i}
                    onClick={() => goToShop(item === 'HISTORIA' ? 'YEEZY' : item === 'ZAPATILLAS' ? 'ALL' : item)} 
                    className={`nav-item ${scrolled || view !== 'HOME' ? 'text-black' : 'text-white'}`}
                >
                    {item}
                </button>
            ))}
          </nav>
          <div className={`flex items-center justify-end gap-4 md:gap-8 w-auto md:w-1/4 ${scrolled || view !== 'HOME' ? 'text-black' : 'text-white'}`}>
            <div className={`hidden md:flex items-center gap-2 text-[10px] font-bold tracking-widest border px-3 py-1.5 rounded-sm opacity-60 ${scrolled || view !== 'HOME' ? 'border-black' : 'border-white'}`}>
                PEN
            </div>
            <Search size={18} strokeWidth={1.5} className="cursor-pointer hover:opacity-50" onClick={() => setIsSearchOpen(true)} />
            <Users size={18} strokeWidth={1.5} className="cursor-pointer hover:opacity-50" onClick={() => setView('ADMIN')} />
            <div className="relative cursor-pointer hover:opacity-50" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cart.length > 0 && <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[8px] w-3 h-3 md:w-4 md:h-4 flex items-center justify-center rounded-full font-bold">{cart.length}</span>}
            </div>
          </div>
        </div>
      </header>

      <main>
        <AnimatePresence mode="wait">
            
            {/* === VISTA HOME (VIDEOS FIX MÓVIL) === */}
            {view === 'HOME' && !loading && (
              <motion.div 
                key="home"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col w-full"
              >
                {/* HERO 1: MP1 */}
                <section className="campaign-section bg-black">
                    <video autoPlay loop muted playsInline className="video-bg" poster="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2025&auto=format&fit=crop"><source src="/mp1.mp4" type="video/mp4" /></video>
                    
                    {/* CONTENEDOR MÓVIL: Flex Col para apilar, items-start para izquierda, gap-8 para separar */}
                    <div className="relative z-10 w-full px-6 md:px-12 pb-12 md:pb-0 flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-white max-w-[1800px] mx-auto gap-8 md:gap-0">
                        <div>
                            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] mb-2 md:mb-4 text-red-500">NUEVOS MODELOS</h2>
                            <h1 className="text-6xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none shadow-black drop-shadow-lg">NOIR<br/>LIMA</h1>
                        </div>
                        {/* Botón debajo del texto, alineado a la izquierda */}
                        <button onClick={() => goToShop('ALL')} className="btn-glass">VER TODO</button>
                    </div>
                </section>

                {/* HERO 2: MP2 */}
                <section className="campaign-section bg-gray-900">
                    <video autoPlay loop muted playsInline className="video-bg" poster="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop"><source src="/mp2.mp4" type="video/mp4" /></video>
                    <div className="relative z-10 w-full px-6 md:px-12 pb-12 md:pb-0 flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-white max-w-[1800px] mx-auto gap-8 md:gap-0">
                        <div>
                            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] mb-2 md:mb-4">EXCLUSIVOS</h2>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter">JORDAN</h1>
                        </div>
                        <button onClick={() => goToShop('JORDAN')} className="btn-glass">VER JORDANS</button>
                    </div>
                </section>

                {/* HERO 3: MP3 */}
                <section className="campaign-section bg-gray-800">
                    <video autoPlay loop muted playsInline className="video-bg" poster="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2070&auto=format&fit=crop"><source src="/mp3.mp4" type="video/mp4" /></video>
                    <div className="relative z-10 w-full px-6 md:px-12 pb-12 md:pb-0 flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-white max-w-[1800px] mx-auto gap-8 md:gap-0">
                        <div>
                            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] mb-2 md:mb-4">Originales</h2>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter">ADIDAS</h1>
                        </div>
                        <button onClick={() => goToShop('ADIDAS')} className="btn-glass">VER ADIDAS</button>
                    </div>
                </section>

                {/* MARQUEE */}
                <div className="py-10 bg-black text-white overflow-hidden border-t border-gray-900">
                    <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="whitespace-nowrap flex gap-12 md:gap-20">
                        {[...Array(6)].map((_, i) => (
                            <h2 key={i} className="text-3xl md:text-5xl font-black uppercase tracking-widest text-gray-800">NOIR LIMA <span className="text-white">2026</span></h2>
                        ))}
                    </motion.div>
                </div>
              </motion.div>
            )}

            {/* === VISTA SHOP === */}
            {view === 'SHOP' && (
                <motion.div 
                    key="shop"
                    initial={{ opacity: 0, y: 100 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-white min-h-screen"
                >
                    <div className="bg-black text-white pt-32 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 flex flex-col justify-end items-start h-[40vh] md:h-[50vh] border-b border-gray-900">
                        <div className="max-w-[1800px] mx-auto w-full">
                            <p className="text-red-500 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] mb-2 md:mb-4 uppercase">Explorando</p>
                            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none">{getCategoryTitle()}</h1>
                        </div>
                    </div>

                    <div className="bg-white text-black pt-12 md:pt-20 pb-20 px-6 md:px-8">
                        <div className="max-w-[1800px] mx-auto">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 border-b border-gray-200 pb-6 gap-4">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{filteredProducts.length} MODELOS EXCLUSIVOS</p>
                                <div className="flex gap-4 cursor-pointer">
                                    <Filter size={16} />
                                    <span className="text-[10px] uppercase font-bold">FILTRAR</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-24">
                                {filteredProducts.map((p) => (
                                    <div key={p.id} className="group cursor-pointer" onClick={() => {setProduct(p); setView('DETAIL'); window.scrollTo(0,0)}}>
                                        <div className="relative aspect-[3/4] bg-[#f5f5f5] mb-4 md:mb-6 overflow-hidden flex items-center justify-center">
                                            <img src={p.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={p.nombre} />
                                            {p.id <= 3 && <span className="absolute top-2 left-2 md:top-4 md:left-4 text-[8px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1 md:px-3">HOT</span>}
                                            <button onClick={(e) => {e.stopPropagation(); setProduct(p); setSelectedSize(p.tallas[0]); setCart([...cart, {...p, size: p.tallas[0]}]); setIsCartOpen(true)}} className="hidden md:block absolute bottom-0 left-0 w-full bg-black text-white py-4 text-[9px] font-bold uppercase tracking-widest opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">COMPRA RÁPIDA</button>
                                        </div>
                                        <div className="text-left space-y-1 md:space-y-2">
                                            <h4 className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest">{p.marca}</h4>
                                            <h3 className="text-[10px] md:text-[12px] font-bold uppercase tracking-widest text-black truncate">{p.nombre}</h3>
                                            <p className="text-[10px] md:text-[12px] font-medium text-gray-900">S/ {p.precio}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* VISTA DETALLE */}
            {view === 'DETAIL' && product && (
                <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white text-black min-h-screen pt-24 md:pt-32 pb-20 px-6">
                    <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
                        <div className="relative bg-[#f5f5f5] aspect-square flex items-center justify-center p-8 md:p-12">
                            <button onClick={() => setView('SHOP')} className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors cursor-pointer"><ArrowLeft size={16}/> VOLVER</button>
                            <img src={product.img} className="w-full h-auto object-contain mix-blend-multiply drop-shadow-2xl" />
                        </div>
                        <div className="flex flex-col justify-center lg:pr-20">
                            <div className="mb-8 md:mb-10 border-b border-gray-100 pb-8 md:pb-10">
                                <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{product.marca} / {product.sku}</p>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-black">{product.nombre}</h1>
                                <p className="text-2xl md:text-3xl font-medium text-black">S/ {product.precio}</p>
                            </div>
                            <div className="space-y-8 md:space-y-12">
                                <div>
                                    <div className="flex justify-between mb-4"><span className="text-[11px] font-bold uppercase tracking-widest">Talla (US)</span></div>
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {product.tallas.map(t => (
                                            <button key={t} onClick={() => setSelectedSize(t)} className={`w-12 h-10 md:w-16 md:h-14 border text-[10px] md:text-[12px] font-bold transition-all cursor-pointer ${selectedSize === t ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}`}>{t}</button>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={() => {if(!selectedSize) return alert("Selecciona Talla"); setCart([...cart, {...product, size: selectedSize}]); setIsCartOpen(true)}} className="w-full bg-black text-white py-5 md:py-6 text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors shadow-2xl cursor-pointer">AÑADIR A LA BOLSA</button>
                                <p className="text-[10px] md:text-[11px] text-gray-500 leading-relaxed uppercase tracking-wide">{product.desc} — SKU: {product.sku}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TRACKING */}
            {view === 'TRACKING' && (
                <motion.div key="tracking" initial={{opacity:0}} animate={{opacity:1}} className="bg-white text-black min-h-screen flex flex-col items-center justify-center p-6 text-center pt-32">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Rastreo</h2>
                    <div className="max-w-md w-full border-b-2 border-black flex items-center">
                        <input type="text" placeholder="NOIR-XXXX" className="flex-1 py-5 text-center outline-none uppercase text-sm tracking-widest bg-transparent font-bold" value={trackingInput} onChange={(e)=>setTrackingInput(e.target.value)} />
                        <button onClick={() => {const f = orders.find(o => o.id === trackingInput); setTrackingResult(f || null);}} className="text-xs font-bold uppercase hover:text-gray-500 cursor-pointer">BUSCAR</button>
                    </div>
                    {trackingResult && <div className="mt-12 p-8 bg-black text-white w-full max-w-md text-left"><p className="text-3xl font-black uppercase mb-2">{trackingResult.status}</p><p className="text-[10px] uppercase tracking-widest">{trackingResult.cliente}</p></div>}
                </motion.div>
            )}

            {/* ADMIN */}
            {view === 'ADMIN' && (
                <motion.div key="admin" initial={{opacity:0}} animate={{opacity:1}} className="bg-white text-black min-h-screen flex flex-col items-center justify-center p-6 pt-32">
                    {!isAdminAuthenticated ? (
                        <div className="max-w-sm w-full text-center">
                            <h2 className="text-3xl font-black uppercase tracking-tight mb-10">Admin Access</h2>
                            <input type="password" placeholder="CLAVE" className="w-full border-b-2 border-black py-4 text-center outline-none uppercase text-xs tracking-widest mb-10 font-bold" value={adminPass} onChange={(e)=>setAdminPass(e.target.value)} />
                            <button onClick={() => adminPass === 'JADE23' ? setIsAdminAuthenticated(true) : null} className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-widest cursor-pointer">ENTRAR</button>
                        </div>
                    ) : (
                        <div className="w-full max-w-5xl">
                            <div className="flex justify-between border-b border-gray-100 pb-6 mb-10"><h2 className="text-3xl font-black uppercase">Panel</h2><button onClick={()=>setIsAdminAuthenticated(false)} className="text-[10px] font-bold uppercase cursor-pointer">SALIR</button></div>
                            {orders.map(o => <div key={o.id} className="flex justify-between items-center p-6 border-b border-gray-100 hover:bg-gray-50"><p className="text-xs font-bold uppercase">{o.cliente} — {o.total}</p><Trash2 size={18} className="cursor-pointer text-gray-400 hover:text-red-600" onClick={()=>setOrders(orders.filter(x => x.id !== o.id))}/></div>)}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-20 md:py-40 border-t border-gray-900">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 uppercase">
            <div>
                <h4 className="text-[10px] font-bold tracking-widest mb-6 md:mb-10 text-gray-500">NOVEDADES</h4>
                <div className="flex border-b border-gray-700 pb-4">
                    <input type="email" placeholder="CORREO ELECTRONICO" className="flex-1 bg-transparent outline-none text-[10px] text-white placeholder:text-gray-700" />
                    <button className="text-[10px] font-bold cursor-pointer">→</button>
                </div>
            </div>
            <div className="col-span-3 flex flex-col items-start md:items-end">
                <img src="/NOIR1.png" alt="NOIR" className="h-10 md:h-12 w-auto brightness-0 invert mb-6" />
                <p className="text-[9px] text-gray-600 tracking-widest mb-8">© 2026 NOIR LIMA. RESERVA AHORA</p>
                <div className="flex gap-5 items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="payment-logo" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="payment-logo" style={{height: '20px'}} />
                    <img src="https://seeklogo.com/images/I/izipay-logo-3B2D12C19C-seeklogo.com.png" alt="Izipay" className="payment-logo" style={{height: '18px'}} />
                </div>
            </div>
        </div>
      </footer>

      {/* CARRITO Y CHECKOUT */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.4 }} className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white text-black z-[2001] flex flex-col shadow-2xl">
                <div className="p-8 md:p-10 border-b border-gray-100 flex justify-between items-center"><h2 className="text-[12px] font-bold uppercase tracking-[0.3em]">Tu Bolsa ({cart.length})</h2><X size={20} className="cursor-pointer" onClick={() => setIsCartOpen(false)} /></div>
                <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-8 hide-scroll">{cart.map((item, i) => (<div key={i} className="flex gap-6 items-center"><img src={item.img} className="w-20 h-24 object-cover" /><div className="flex-1"><h4 className="text-[11px] font-bold uppercase tracking-widest">{item.nombre}</h4><p className="text-[10px] text-gray-400 uppercase mt-1">Talla: {item.size}</p><p className="text-[11px] font-bold mt-2">S/ {item.precio}</p></div><Trash2 size={14} className="cursor-pointer text-gray-300 hover:text-black" onClick={()=>setCart(cart.filter((_, idx)=>idx!==i))}/></div>))}</div>
                {cart.length > 0 && <div className="p-8 md:p-10 border-t border-gray-100 bg-[#fafafa]"><div className="flex justify-between items-end mb-8 uppercase font-bold text-[11px] tracking-widest"><span>Total</span><span className="text-xl">S/ {totalCart}</span></div><button onClick={() => setCheckoutStep(1)} className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors cursor-pointer">PROCESAR PAGO</button></div>}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutStep === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-white/95 backdrop-blur-md z-[3000] flex items-center justify-center p-6 text-black">
                <div className="w-full max-w-xl text-center relative bg-white p-8 md:p-12 shadow-2xl border border-gray-100">
                    <button onClick={() => setCheckoutStep(0)} className="absolute top-0 left-0"><ArrowLeft size={24}/></button>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-12 md:mb-16">Pago Seguro</h2>
                    <div className="space-y-8">
                        <input type="text" placeholder="NOMBRE COMPLETO" className="w-full border-b-2 border-gray-100 py-5 text-center text-sm outline-none uppercase font-bold tracking-widest" onChange={e => setShippingData({...shippingData, nombre: e.target.value})} />
                        <input type="text" placeholder="DIRECCIÓN DE ENVÍO" className="w-full border-b-2 border-gray-100 py-5 text-center text-sm outline-none uppercase font-bold tracking-widest" onChange={e => setShippingData({...shippingData, direccion: e.target.value})} />
                        <button onClick={processPayment} className="w-full bg-black text-white py-6 font-black uppercase tracking-widest mt-10 hover:scale-105 transition-transform cursor-pointer">CONFIRMAR PEDIDO</button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}