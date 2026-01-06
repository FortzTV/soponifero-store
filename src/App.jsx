import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Search, Menu, ArrowLeft, X, Trash2, 
  CreditCard, Plus, Minus, Users, CloudRain, Mail, Play, ArrowRight, Filter
} from 'lucide-react';

/* NOIR - TOKYO HUB v69.0 (LANDING PURA + TIENDA SEPARADA)
   - HOME: Solo 3 Secciones de Video (Mp1, Mp2, Mp3). Nada más.
   - NAVEGACIÓN: Los links del menú te llevan a una vista de "Tienda" separada.
   - LOGO: Vuelve al Home.
*/

export default function App() {
  // --- ESTILOS GLOBALES ---
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap');
    
    body { font-family: 'Inter', sans-serif; background-color: #000000; color: #fff; margin: 0; padding: 0; overflow-x: hidden; }
    
    .nav-item { font-size: 10px; letter-spacing: 0.2em; font-weight: 600; text-transform: uppercase; cursor: pointer; transition: opacity 0.3s; }
    .nav-item:hover { opacity: 0.5; }
    .nav-item.active { border-bottom: 1px solid white; padding-bottom: 2px; }
    
    .hide-scroll::-webkit-scrollbar { display: none; }
    
    .video-bg { 
      object-fit: cover; 
      width: 100%; 
      height: 100%; 
      position: absolute; 
      top: 0; 
      left: 0; 
      z-index: 0; 
      opacity: 0.7; 
    }
    
    .campaign-section { 
      height: 100vh; /* Ocupa toda la pantalla */
      width: 100%; 
      position: relative; 
      overflow: hidden; 
      display: flex; 
      align-items: flex-end; 
      padding-bottom: 80px; 
      background-color: #000; 
    }

    .btn-glass { 
      background: rgba(255,255,255,0.1); 
      backdrop-filter: blur(10px); 
      border: 1px solid rgba(255,255,255,0.3); 
      color: white; 
      padding: 16px 40px; 
      font-size: 11px; 
      font-weight: 700; 
      letter-spacing: 0.2em; 
      text-transform: uppercase; 
      transition: all 0.3s; 
      cursor: pointer;
    }
    .btn-glass:hover { background: white; color: black; }
  `;

  // --- ESTADOS ---
  const [view, setView] = useState('HOME'); // HOME (Videos) | SHOP (Productos) | DETAIL | CART...
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Admin & Checkout
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [shippingData, setShippingData] = useState({ nombre: '', direccion: '', dni: '', tarjeta: '' });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- CATÁLOGO ---
  const productos = useMemo(() => [
    { id: 1, marca: "NIKE", linea: "JORDAN", nombre: "AIR JORDAN 1 CHICAGO", precio: "1850.00", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop", sku: "DZ5485-612", desc: "La leyenda de 1985. Varsity Red/Black.", tallas: ["9", "10", "11"] },
    { id: 2, marca: "ADIDAS", linea: "YEEZY", nombre: "YEEZY BOOST 350 BONE", precio: "1200.00", img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=800&auto=format&fit=crop", sku: "HQ6316", desc: "Tecnología Boost y tejido Primeknit.", tallas: ["40", "41", "42"] },
    { id: 3, marca: "NIKE", linea: "DUNK", nombre: "DUNK LOW PANDA", precio: "480.00", img: "https://images.unsplash.com/photo-1637844527273-a6c88b403363?q=80&w=800&auto=format&fit=crop", sku: "DD1391-100", desc: "El colorway más versátil.", tallas: ["8", "9", "10"] },
    { id: 4, marca: "ADIDAS", linea: "ORIGINALS", nombre: "SAMBA OG BLACK", precio: "450.00", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop", sku: "B75807", desc: "Icono del fútbol convertido en rey del streetwear.", tallas: ["38", "39", "40"] },
    { id: 5, marca: "NIKE", linea: "AIR MAX", nombre: "AIR MAX 90 INFRARED", precio: "550.00", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop", sku: "CT1685-100", desc: "Diseño Tinker Hatfield original.", tallas: ["40", "41", "42"] },
    { id: 7, marca: "NIKE", linea: "JORDAN", nombre: "JORDAN 4 BLACK CANVAS", precio: "1450.00", img: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=800&auto=format&fit=crop", sku: "DH7138-006", desc: "Lona resistente y detalles en gamuza.", tallas: ["9", "10"] },
    { id: 9, marca: "NIKE", linea: "AF1", nombre: "AF1 TRIPLE WHITE", precio: "459.00", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop", sku: "CW2288-111", desc: "El lienzo en blanco definitivo.", tallas: ["8", "9", "10"] },
    { id: 11, marca: "NIKE", linea: "JORDAN", nombre: "JORDAN 1 LOW TRAVIS", precio: "2800.00", img: "https://images.unsplash.com/photo-1586525198428-225f6f12c240?q=80&w=800&auto=format&fit=crop", sku: "DM7866-162", desc: "Swoosh invertido característico.", tallas: ["9", "10"] },
    { id: 12, marca: "ADIDAS", linea: "YEEZY", nombre: "YEEZY SLIDE PURE", precio: "550.00", img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop", sku: "GW1934", desc: "Minimalismo extremo.", tallas: ["38", "40", "42"] },
  ], []);

  // --- NAVEGACIÓN ---
  // Esta función cambia la vista a "SHOP" y aplica el filtro
  const goToShop = (category) => {
    setActiveCategory(category);
    setView('SHOP'); 
    window.scrollTo(0, 0); // Ir al inicio de la página de tienda
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

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <style>{globalStyles}</style>

      {/* 1. HEADER (FIJO) */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || view !== 'HOME' ? 'bg-white border-b border-gray-100 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1800px] mx-auto px-12 flex items-center justify-between">
          
          {/* LOGO: Clic aquí lleva al HOME (Landing) */}
          <div className="w-1/4 cursor-pointer" onClick={() => setView('HOME')}>
            <img 
              src="/NOIR1.png" 
              alt="NOIR" 
              className={`h-12 w-auto object-contain transition-all duration-300 ${scrolled || view !== 'HOME' ? 'brightness-0' : 'brightness-0 invert'}`} 
            />
          </div>

          {/* MENÚ: Estos links llevan a la "Otra Página" (SHOP) */}
          <nav className="hidden lg:flex items-center justify-center gap-16 w-2/4">
            <button onClick={() => goToShop('ALL')} className={`nav-item ${scrolled || view !== 'HOME' ? 'text-black' : 'text-white'}`}>ZAPATILLAS</button>
            <button onClick={() => goToShop('JORDAN')} className={`nav-item ${scrolled || view !== 'HOME' ? 'text-black' : 'text-white'}`}>JORDAN</button>
            <button onClick={() => goToShop('ADIDAS')} className={`nav-item ${scrolled || view !== 'HOME' ? 'text-black' : 'text-white'}`}>ADIDAS</button>
            <button onClick={() => goToShop('YEEZY')} className={`nav-item ${scrolled || view !== 'HOME' ? 'text-black' : 'text-white'}`}>YEEZY</button>
          </nav>

          <div className={`flex items-center justify-end gap-8 w-1/4 ${scrolled || view !== 'HOME' ? 'text-black' : 'text-white'}`}>
            <div className={`hidden md:flex items-center gap-2 text-[10px] font-bold tracking-widest border px-3 py-1.5 rounded-sm ${scrolled || view !== 'HOME' ? 'border-black/20' : 'border-white/40'}`}>
                PEN/USD
            </div>
            <Search size={20} strokeWidth={1.5} className="cursor-pointer hover:opacity-50" onClick={() => setIsSearchOpen(true)} />
            <Users size={20} strokeWidth={1.5} className="cursor-pointer hover:opacity-50" onClick={() => setView('ADMIN')} />
            <div className="relative cursor-pointer hover:opacity-50" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cart.length}
                </span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* === VISTA HOME: SOLO 3 VIDEOS === */}
        {view === 'HOME' && (
          <div className="flex flex-col w-full">
            {/* HERO 1: VIDEO MP1 */}
            <section className="campaign-section bg-black">
                <video autoPlay loop muted playsInline className="video-bg"><source src="/mp1.mp4" type="video/mp4" /></video>
                <div className="relative z-10 w-full px-12 flex justify-between items-end text-white max-w-[1800px] mx-auto">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.5em] mb-4 text-red-500">NEW ARRIVALS</h2>
                        <h1 className="text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none shadow-black drop-shadow-lg">TOKYO<br/>HUB</h1>
                    </div>
                    <button onClick={() => goToShop('ALL')} className="btn-glass mb-4">VER TIENDA</button>
                </div>
            </section>

            {/* HERO 2: VIDEO MP2 */}
            <section className="campaign-section bg-gray-900">
                <video autoPlay loop muted playsInline className="video-bg"><source src="/mp2.mp4" type="video/mp4" /></video>
                <div className="relative z-10 w-full px-12 flex justify-between items-end text-white max-w-[1800px] mx-auto">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.5em] mb-4">Archive</h2>
                        <h1 className="text-6xl font-black uppercase tracking-tighter">JORDAN BRAND</h1>
                    </div>
                    <button onClick={() => goToShop('JORDAN')} className="btn-glass mb-4">VER JORDANS</button>
                </div>
            </section>

            {/* HERO 3: VIDEO MP3 */}
            <section className="campaign-section bg-gray-800">
                <video autoPlay loop muted playsInline className="video-bg"><source src="/mp3.mp4" type="video/mp4" /></video>
                <div className="relative z-10 w-full px-12 flex justify-between items-end text-white max-w-[1800px] mx-auto">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.5em] mb-4">Originals</h2>
                        <h1 className="text-6xl font-black uppercase tracking-tighter">ADIDAS SAMBA</h1>
                    </div>
                    <button onClick={() => goToShop('ADIDAS')} className="btn-glass mb-4">VER ADIDAS</button>
                </div>
            </section>
          </div>
        )}

        {/* === VISTA SHOP: CATALOGO COMPLETO (LA "OTRA PÁGINA") === */}
        {view === 'SHOP' && (
            <div className="bg-white min-h-screen pt-32 pb-20 px-8">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex items-center justify-between mb-12 border-b border-gray-200 pb-6">
                        <div>
                            <h2 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">
                                {activeCategory === 'ALL' ? 'Catálogo Completo' : `${activeCategory} COLLECTION`}
                            </h2>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{filteredProducts.length} PRODUCTOS</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="text-xs font-bold text-black border border-gray-200 px-4 py-2 uppercase tracking-widest hover:bg-black hover:text-white transition-colors">Filtrar</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {filteredProducts.map((p) => (
                            <div key={p.id} className="group cursor-pointer" onClick={() => {setProduct(p); setView('DETAIL'); window.scrollTo(0,0)}}>
                                <div className="relative aspect-[3/4] bg-[#f5f5f5] mb-4 overflow-hidden rounded-sm flex items-center justify-center">
                                    <img src={p.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={p.nombre} />
                                    {p.id <= 3 && <span className="absolute top-3 left-3 text-[8px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1">HOT</span>}
                                    <button onClick={(e) => {e.stopPropagation(); setProduct(p); setSelectedSize(p.tallas[0]); setCart([...cart, {...p, size: p.tallas[0]}]); setIsCartOpen(true)}} className="absolute bottom-0 left-0 w-full bg-black text-white py-4 text-[9px] font-bold uppercase tracking-widest opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">AÑADIR +</button>
                                </div>
                                <div className="text-left">
                                    <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{p.marca}</h4>
                                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-black truncate">{p.nombre}</h3>
                                    <p className="text-[11px] font-medium text-gray-800 mt-1">S/ {p.precio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* VISTA DETALLE */}
        {view === 'DETAIL' && product && (
            <div className="bg-white text-black min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 animate-fadeIn">
                    <div className="relative bg-[#f5f5f5] aspect-square flex items-center justify-center p-12 rounded-sm">
                        <button onClick={() => setView('SHOP')} className="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"><ArrowLeft size={16}/> VOLVER</button>
                        <img src={product.img} className="w-full h-auto object-contain mix-blend-multiply drop-shadow-2xl" />
                    </div>
                    <div className="flex flex-col justify-center lg:pr-20">
                        <div className="mb-10 border-b border-gray-100 pb-10">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{product.marca} / {product.sku}</p>
                            <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-black">{product.nombre}</h1>
                            <p className="text-3xl font-medium text-black">S/ {product.precio}</p>
                        </div>
                        <div className="space-y-12">
                            <div>
                                <div className="flex justify-between mb-4"><span className="text-[11px] font-bold uppercase tracking-widest">Seleccionar Talla</span></div>
                                <div className="flex flex-wrap gap-3">
                                    {product.tallas.map(t => (
                                        <button key={t} onClick={() => setSelectedSize(t)} className={`w-16 h-14 border text-[12px] font-bold transition-all ${selectedSize === t ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}`}>{t}</button>
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => {if(!selectedSize) return alert("Selecciona Talla"); setCart([...cart, {...product, size: selectedSize}]); setIsCartOpen(true)}} className="w-full bg-black text-white py-6 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors shadow-2xl">AÑADIR A LA BOLSA</button>
                            <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-wide">{product.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* TRACKING VIEW */}
        {view === 'TRACKING' && ( /* ... Mismo código de rastreo ... */ 
            <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center p-6 text-center pt-32">
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">Rastreo Global</h2>
                <div className="max-w-md w-full border-b-2 border-black flex items-center">
                    <input type="text" placeholder="NOIR-XXXX" className="flex-1 py-5 text-center outline-none uppercase text-sm tracking-widest bg-transparent font-bold" value={trackingInput} onChange={(e)=>setTrackingInput(e.target.value)} />
                    <button onClick={() => {const f = orders.find(o => o.id === trackingInput); setTrackingResult(f || null);}} className="text-xs font-bold uppercase hover:text-gray-500">LOCALIZAR</button>
                </div>
                {trackingResult && <div className="mt-12 p-8 bg-black text-white w-full max-w-md text-left"><p className="text-3xl font-black uppercase mb-2">{trackingResult.status}</p><p className="text-[10px] uppercase tracking-widest">{trackingResult.cliente}</p></div>}
            </div>
        )}

        {/* ADMIN VIEW */}
        {view === 'ADMIN' && ( /* ... Mismo código de admin ... */ 
            <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center p-6 pt-32">
                {!isAdminAuthenticated ? (
                    <div className="max-w-sm w-full text-center">
                        <h2 className="text-3xl font-black uppercase tracking-tight mb-10">Admin Access</h2>
                        <input type="password" placeholder="CLAVE" className="w-full border-b-2 border-black py-4 text-center outline-none uppercase text-xs tracking-widest mb-10 font-bold" value={adminPass} onChange={(e)=>setAdminPass(e.target.value)} />
                        <button onClick={() => adminPass === 'SOPONIFERO2025' ? setIsAdminAuthenticated(true) : null} className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-widest">ENTRAR</button>
                    </div>
                ) : (
                    <div className="w-full max-w-5xl">
                        <div className="flex justify-between border-b border-gray-100 pb-6 mb-10"><h2 className="text-3xl font-black uppercase">Panel de Control</h2><button onClick={()=>setIsAdminAuthenticated(false)} className="text-[10px] font-bold uppercase">SALIR</button></div>
                        {orders.map(o => <div key={o.id} className="flex justify-between items-center p-6 border-b border-gray-100 hover:bg-gray-50"><p className="text-xs font-bold uppercase">{o.cliente} — {o.total}</p><Trash2 size={18} className="cursor-pointer text-gray-400 hover:text-red-600" onClick={()=>setOrders(orders.filter(x => x.id !== o.id))}/></div>)}
                    </div>
                )}
            </div>
        )}
      </main>

      {/* FOOTER (Solo visible si no es la Home, opcional, o siempre visible) */}
      <footer className="bg-black text-white py-40 border-t border-gray-900">
        <div className="max-w-[1800px] mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-20 uppercase">
            <div>
                <h4 className="text-[10px] font-bold tracking-widest mb-10 text-gray-500">Newsletter</h4>
                <div className="flex border-b border-gray-700 pb-4">
                    <input type="email" placeholder="EMAIL ADDRESS" className="flex-1 bg-transparent outline-none text-[10px] text-white placeholder:text-gray-700" />
                    <button className="text-[10px] font-bold">→</button>
                </div>
            </div>
            <div className="col-span-3 flex flex-col items-end">
                <h2 className="text-4xl font-black tracking-tighter mb-4 text-white">NOIR</h2>
                <p className="text-[9px] text-gray-600 tracking-widest">© 2026 TOKYO HUB. ALL RIGHTS RESERVED.</p>
            </div>
        </div>
      </footer>

      {/* CARRITO Y CHECKOUT (Mismo código de siempre) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.4 }} className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white text-black z-[2001] flex flex-col shadow-2xl">
                <div className="p-10 border-b border-gray-100 flex justify-between items-center"><h2 className="text-[12px] font-bold uppercase tracking-[0.3em]">Tu Bolsa ({cart.length})</h2><X size={20} className="cursor-pointer" onClick={() => setIsCartOpen(false)} /></div>
                <div className="flex-1 overflow-y-auto p-10 space-y-8 hide-scroll">{cart.map((item, i) => (<div key={i} className="flex gap-6 items-center"><img src={item.img} className="w-20 h-24 object-cover" /><div className="flex-1"><h4 className="text-[11px] font-bold uppercase tracking-widest">{item.nombre}</h4><p className="text-[10px] text-gray-400 uppercase mt-1">Talla: {item.size}</p><p className="text-[11px] font-bold mt-2">S/ {item.precio}</p></div><Trash2 size={14} className="cursor-pointer text-gray-300 hover:text-black" onClick={()=>setCart(cart.filter((_, idx)=>idx!==i))}/></div>))}</div>
                {cart.length > 0 && <div className="p-10 border-t border-gray-100 bg-[#fafafa]"><div className="flex justify-between items-end mb-8 uppercase font-bold text-[11px] tracking-widest"><span>Total</span><span className="text-xl">S/ {totalCart}</span></div><button onClick={() => setCheckoutStep(1)} className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors">PROCESAR PAGO</button></div>}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutStep === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-white/95 backdrop-blur-md z-[3000] flex items-center justify-center p-6 text-black">
                <div className="w-full max-w-xl text-center relative bg-white p-12 shadow-2xl border border-gray-100">
                    <button onClick={() => setCheckoutStep(0)} className="absolute top-0 left-0"><ArrowLeft size={24}/></button>
                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-16">Pago Seguro</h2>
                    <div className="space-y-8">
                        <input type="text" placeholder="NOMBRE COMPLETO" className="w-full border-b-2 border-gray-100 py-5 text-center text-sm outline-none uppercase font-bold tracking-widest" onChange={e => setShippingData({...shippingData, nombre: e.target.value})} />
                        <input type="text" placeholder="DIRECCIÓN DE ENVÍO" className="w-full border-b-2 border-gray-100 py-5 text-center text-sm outline-none uppercase font-bold tracking-widest" onChange={e => setShippingData({...shippingData, direccion: e.target.value})} />
                        <button onClick={processPayment} className="w-full bg-black text-white py-6 font-black uppercase tracking-widest mt-10 hover:scale-105 transition-transform">CONFIRMAR PEDIDO</button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}