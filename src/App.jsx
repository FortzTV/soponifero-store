import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, ArrowLeft, Users, Plane, Truck, 
  ShieldCheck, MessageCircle, X, Trash2, Lock, Search, ChevronDown, Zap, Globe, User, CreditCard, CheckCircle
} from 'lucide-react';

/**
 * NOIR - TOKYO HUB v35.0 (THE FINAL INTEGRATION)
 * Base: v32.0 (Diseño Recto + Logo PNG + 18 Productos + Admin + Rastreo)
 * Agregados: Login, Ficha Técnica Detallada, Pasarela de Pago con Tarjeta.
 */

export default function App() {
  // 1. ESTADOS DE GESTIÓN
  const [view, setView] = useState('HOME');
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // NUEVO: Estado para el Login
  const [activeMenu, setActiveMenu] = useState(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // NUEVO: Usuario logueado
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Estados para el Checkout (Pasarela de Pago)
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: Lista, 1: Datos, 2: Pago
  const [shippingData, setShippingData] = useState({ nombre: '', direccion: '', dni: '', tarjeta: '' });

  const heroImages = useMemo(() => [
    "https://m.media-amazon.com/images/I/815v7eZFlVL._AC_UY900_.jpg",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2000"
  ], []);

  // 2. FILTROS MEGA MENÚ (INTACTOS)
  const menuContent = {
    "LO ÚLTIMO": { "ZAPATILLAS": ["Novedades Hub", "Hype Releases"], "ROPA": ["Novedades", "Lookbook"], "ACCESORIOS": ["Gorras", "Medias"] },
    "HOMBRE": { "ZAPATILLAS": ["Lifestyle", "Basketball"], "ROPA": ["Polos", "Casacas"], "ACCESORIOS": ["Mochilas"] },
    "MUJER": { "ZAPATILLAS": ["Lifestyle Hub"], "ROPA": ["Tops", "Leggings"], "ACCESORIOS": ["Bolsos"] }
  };

  // 3. CATÁLOGO MAESTRO (18 PRODUCTOS INTACTOS)
  const productos = useMemo(() => [
    { id: 1, marca: "ADIDAS", nombre: "SAMBA OG WHITE", precio: "429.00", img: "/samba.png", tag: "01", desc: "La silueta definitiva del 2026. Construida con cuero de grano superior italiano y suela gum natural reforzada.", tallas: ["38", "39", "40", "41", "42"] },
    { id: 2, marca: "ADIDAS", nombre: "SAMBA CORE BLACK", precio: "429.00", img: "/samba.png", tag: "02", desc: "Elegancia y rudeza urbana. Cuero premium negro azabache con tratamiento resistente al agua.", tallas: ["39", "40", "41", "42"] },
    { id: 3, marca: "ADIDAS", nombre: "CAMPUS 00S GREY", precio: "449.00", img: "/samba.png", tag: "03", desc: "Estética chunky skate inspirada en los años 2000. Gamuza cepillada de alta densidad.", tallas: ["38", "40", "41", "42"] },
    { id: 4, marca: "ADIDAS", nombre: "GAZELLE INDOOR BLUE", precio: "419.00", img: "/samba.png", tag: "04", desc: "Gamuza de seda azul eléctrico y suela traslúcida.", tallas: ["40", "41", "42"] },
    { id: 5, marca: "ADIDAS", nombre: "YEEZY BOOST 350 ONYX", precio: "999.00", img: "/samba.png", tag: "05", desc: "Tecnología Boost patentada con tejido Primeknit.", tallas: ["41", "42", "43", "44"] },
    { id: 6, marca: "ADIDAS", nombre: "CAMPUS 00S BLACK", precio: "449.00", img: "/samba.png", tag: "06", desc: "El par más viral con lengüeta ultra acolchada.", tallas: ["39", "40", "41", "42"] },
    { id: 7, marca: "ADIDAS", nombre: "YEEZY SLIDE BONE", precio: "499.00", img: "/samba.png", tag: "07", desc: "Minimalismo extremo inyectado en espuma EVA.", tallas: ["38", "40", "42"] },
    { id: 8, marca: "ADIDAS", nombre: "BAD BUNNY RESPONSE", precio: "650.00", img: "/samba.png", tag: "08", desc: "Colaboración exclusiva con Benito Martínez.", tallas: ["40", "41", "42"] },
    { id: 9, marca: "ADIDAS", nombre: "FORUM LOW WHITE", precio: "440.00", img: "/samba.png", tag: "09", desc: "Silueta icónica de basket de 1984.", tallas: ["39", "40", "41", "42"] },
    { id: 21, marca: "NIKE", nombre: "AF1 WHITE", precio: "459.00", img: "/samba.png", tag: "10", desc: "Pilar de la moda global. Triple White Cuero.", tallas: ["7", "8", "9", "10", "11"] },
    { id: 22, marca: "NIKE", nombre: "DUNK LOW PANDA", precio: "480.00", img: "/samba.png", tag: "11", desc: "Estética monocromática atemporal.", tallas: ["8", "9", "10", "11", "12"] },
    { id: 23, marca: "NIKE", nombre: "JORDAN 1 LOW UNC", precio: "599.00", img: "/samba.png", tag: "12", desc: "Homenaje al alma mater de Jordan.", tallas: ["8", "9", "10", "11"] },
    { id: 24, marca: "NIKE", nombre: "JORDAN 4 BRED", precio: "1200.00", img: "/samba.png", tag: "13", desc: "Reimagined Heritage con Nike Air Heel.", tallas: ["9", "10", "11"] },
    { id: 25, marca: "NIKE", nombre: "DUNK LOW GREY", precio: "520.00", img: "/samba.png", tag: "14", desc: "Elegancia minimalista en tonos grises.", tallas: ["8", "9", "10", "11"] },
    { id: 26, marca: "NIKE", nombre: "JORDAN 1 CHICAGO", precio: "1850.00", img: "/samba.png", tag: "15", desc: "La leyenda de 1985. Varsity Red/Black.", tallas: ["9", "10", "11"] },
    { id: 27, marca: "NIKE", nombre: "AIR MAX 1 '86", precio: "650.00", img: "/samba.png", tag: "16", desc: "La burbuja de aire original de 1986.", tallas: ["8", "9", "10", "11"] },
    { id: 28, marca: "NIKE", nombre: "JORDAN 3 CEMENT", precio: "1100.00", img: "/samba.png", tag: "17", desc: "Elephant Print icónico con Nike Air.", tallas: ["9", "10", "11"] },
    { id: 29, marca: "NIKE", nombre: "AF1 NOCTA", precio: "720.00", img: "/samba.png", tag: "18", desc: "Colaboración exclusiva con Drake Nocta Hub.", tallas: ["8", "9", "10", "11"] }
  ], []);

  const [orders, setOrders] = useState([
    { id: "72654321", cliente: "Muestra USIL", items: "Samba OG White", total: "429.00", status: "EN VUELO" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentHeroIndex((p) => (p + 1) % heroImages.length), 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  const totalCart = cart.reduce((acc, curr) => acc + parseFloat(curr.precio), 0).toFixed(2);

  // Lógica de Pago Final (Simulación de Tarjeta)
  const processPayment = () => {
    if(!shippingData.nombre || !shippingData.direccion || !shippingData.tarjeta) return alert("Completa los datos de pago y envío.");
    
    // Simular proceso
    setTimeout(() => {
        const itemsList = cart.map(i => `${i.nombre} (Talla: ${i.size})`).join(", ");
        setOrders([{ id: shippingData.dni || "99999999", cliente: shippingData.nombre, items: itemsList, total: totalCart, status: "PAGO APROBADO" }, ...orders]);
        window.open(`https://wa.me/519XXXXXXXX?text=PEDIDO PAGADO WEB:%0A${itemsList}%0ATotal: S/ ${totalCart}%0ACliente: ${shippingData.nombre}`, '_blank');
        setCart([]);
        setCheckoutStep(0);
        setIsCartOpen(false);
        setView('SUCCESS');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 italic overflow-x-hidden leading-none">
      
      {/* MARQUEE */}
      <div className="bg-black text-white py-2 overflow-hidden border-b border-red-600 text-[9px] font-black uppercase tracking-[0.5em] relative z-[110]">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="whitespace-nowrap inline-block">
          NOIR ノワール TOKYO HUB • STOCK REAL LIMA 2026 • 100% LEGIT CHECKED • USA IMPORT HUB • ORIGINAL HUB •
        </motion.div>
      </div>

      {/* HEADER CON LOGO PNG Y USUARIO */}
      <header className="bg-white sticky top-0 z-[100] border-b border-black" onMouseLeave={() => setActiveMenu(null)}>
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center relative">
          
          <div className="flex flex-col items-start cursor-pointer group" onClick={() => setView('HOME')}>
            <img src="/NOIR1.png" alt="NOIR LOGO" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
            <div className="flex gap-3 items-center mt-1">
              <span className="text-[8px] tracking-[0.4em] font-bold text-gray-300 uppercase italic">ノワール HUB</span>
              <div className="h-[1px] w-8 bg-gray-100"></div>
              <span className="text-[8px] font-black text-red-600 uppercase">EST. 2026</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center h-full text-[11px] font-black uppercase tracking-[0.2em]">
            <button onClick={() => setView('HOME')} className="px-6 hover:text-red-600 transition-colors">HOME</button>
            <button onMouseEnter={() => setActiveMenu("LO ÚLTIMO")} className="px-6 hover:text-red-600 transition-colors">LO ÚLTIMO</button>
            <button onMouseEnter={() => setActiveMenu("HOMBRE")} className="px-6 hover:text-red-600 transition-colors">HOMBRE</button>
            <button onMouseEnter={() => setActiveMenu("MUJER")} className="px-6 hover:text-red-600 transition-colors">MUJER</button>
            <button onClick={() => setView('TRACKING')} className="px-6 text-gray-400 hover:text-black uppercase">Rastreo</button>
          </nav>

          <div className="flex items-center gap-6 border-l border-gray-100 pl-8">
            <Search size={18} className="cursor-pointer text-gray-300 hover:text-black" />
            
            {/* NUEVO: ICONO DE USUARIO PARA LOGIN */}
            <div className="cursor-pointer text-gray-300 hover:text-black flex items-center gap-2" onClick={() => user ? alert("Ya iniciaste sesión") : setIsLoginOpen(true)}>
                <User size={18} />
                {user && <span className="text-[9px] text-black font-bold uppercase">{user}</span>}
            </div>

            <Users size={18} className="cursor-pointer text-gray-300 hover:text-black" onClick={() => setView('ADMIN')} />
            <div className="relative cursor-pointer group" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={22} className="text-black group-hover:scale-110 transition-transform" />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">!</span>}
            </div>
          </div>
        </div>

        {/* MEGA MENÚ */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0 w-full bg-white border-b-2 border-black shadow-2xl py-14 px-24 z-40">
              <div className="max-w-6xl mx-auto grid grid-cols-4 gap-12 text-left">
                {Object.entries(menuContent[activeMenu] || {}).map(([cat, items]) => (
                  <div key={cat}>
                    <h4 className="text-[14px] font-black uppercase text-black border-b-2 border-red-600 w-fit pb-1 mb-6">{cat}</h4>
                    <ul className="space-y-4">{items.map(i => <li key={i} className="text-[11px] font-bold text-gray-400 hover:text-black cursor-pointer uppercase tracking-widest leading-none">/ {i}</li>)}</ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto border-x border-black min-h-screen">
        {view === 'HOME' && (
          <>
            {/* HERO BANNER RECTO */}
            <div className="flex border-b border-black h-[400px] relative">
              <div className="flex-1 bg-white border-r border-black relative overflow-hidden group">
                <img src={heroImages[currentHeroIndex]} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute top-6 left-6 bg-black text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest">HUB LIMA / STOCK</div>
              </div>
              <div className="flex-1 bg-black relative flex flex-col justify-center items-center text-center p-12 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                  {[...Array(10)].map((_, i) => <div key={i} className="text-white text-[120px] font-black leading-none italic uppercase">NOIR</div>)}
                </div>
                <h2 className="text-white text-7xl font-black tracking-tighter uppercase italic z-10 leading-none">LA <span className="text-red-600">REAL</span><br/>GRASA</h2>
                <div className="mt-8 flex items-center gap-4 z-20">
                    <div className="h-[2px] w-12 bg-red-600"></div>
                    <span className="text-white font-black tracking-[0.8em] text-[9px] uppercase">Authentic 2026</span>
                    <div className="h-[2px] w-12 bg-red-600"></div>
                </div>
              </div>
            </div>

            {/* GRID PRODUCTOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {productos.map(p => (
                <div key={p.id} onClick={() => {setProduct(p); setView('DETAIL'); window.scrollTo(0,0)}} className="bg-white border-r border-b border-black p-8 group cursor-pointer relative transition-all hover:bg-gray-50 overflow-hidden">
                  <div className="absolute top-8 right-8 border border-red-600/20 text-red-600/20 px-2 py-1 text-[8px] font-black uppercase rotate-12">本物</div>
                  <span className="absolute top-6 left-8 text-black font-black text-[12px] italic tracking-tighter opacity-20 group-hover:opacity-100 transition-all">#{p.tag}</span>
                  <div className="aspect-square flex items-center justify-center p-6 mb-8 relative">
                    <img src={p.img} className="w-full h-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 z-10" />
                  </div>
                  <div className="text-left space-y-4 relative z-10">
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-red-600 mb-1 italic">{p.marca}</h4>
                      <h3 className="text-[15px] font-black uppercase text-black leading-none truncate">{p.nombre}</h3>
                    </div>
                    <div className="flex justify-between items-end border-t border-black pt-5 mt-2">
                      <p className="text-3xl font-black italic text-black tracking-tighter leading-none">S/ {p.precio}</p>
                      <button className="border-2 border-black p-2 group-hover:bg-black group-hover:text-white transition-all shadow-[4px_4px_0px_rgba(220,38,38,1)]"><ShoppingBag size={18}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* INFO BLOCKS */}
            <section className="p-16 grid grid-cols-1 md:grid-cols-3 gap-12 bg-white border-b border-black italic">
              <div className="space-y-4 group">
                <ShieldCheck size={32} className="text-red-600" />
                <h4 className="text-4xl font-black uppercase tracking-tighter leading-none italic">LEGIT <br/>DE LEY</h4>
                <p className="text-[9px] text-gray-400 font-bold uppercase leading-relaxed tracking-widest italic">Verificación manual de autenticidad.</p>
              </div>
              <div className="space-y-4 group">
                <Truck size={32} className="text-black" />
                <h4 className="text-4xl font-black uppercase tracking-tighter leading-none italic">LOGÍSTICA <br/>DIRECTA</h4>
                <p className="text-[9px] text-gray-400 font-bold uppercase leading-relaxed tracking-widest italic">Importación semanal desde USA Hub a Lima.</p>
              </div>
              <div className="bg-black text-white p-10 flex flex-col justify-between shadow-[20px_20px_0px_rgba(220,38,38,1)] relative overflow-hidden">
                <Zap size={30} className="text-red-600" />
                <h3 className="text-4xl font-black uppercase mt-12 leading-[0.8] tracking-tighter italic">LA REAL <br/>GRASA.</h3>
              </div>
            </section>
          </>
        )}

        {/* DETALLE CON DESCRIPCIÓN TÉCNICA MEJORADA */}
        {view === 'DETAIL' && product && (
          <div className="p-16 animate-fadeIn italic border-b border-black">
            <button onClick={() => setView('HOME')} className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase text-gray-300 hover:text-black transition-all italic leading-none"><ArrowLeft size={16}/> REGRESAR AL ARCHIVO</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start italic leading-none">
              <div className="bg-white border border-black p-16 aspect-square flex items-center justify-center relative group shadow-sm">
                <img src={product.img} className="w-full h-auto drop-shadow-2xl" />
                <div className="absolute bottom-8 right-8 border border-gray-100 px-4 py-2 text-[8px] font-black uppercase text-gray-200">NOIR_HUB_VERIFIED</div>
              </div>
              <div className="flex flex-col space-y-12 italic leading-none">
                <div className="space-y-4 italic leading-none">
                  <span className="bg-red-600 text-white px-2 py-1 text-[8px] font-black uppercase shadow-md italic leading-none">LIMITED HUB RELEASE</span>
                  <h2 className="text-8xl font-black uppercase italic leading-[0.8] tracking-tighter">{product.nombre}</h2>
                  <p className="text-7xl font-black italic text-black tracking-tighter leading-none mt-4 italic leading-none">S/ {product.precio}</p>
                </div>
                
                {/* NUEVA SECCIÓN DE DESCRIPCIÓN TÉCNICA */}
                <div className="border-l-8 border-black pl-8 py-4 bg-gray-50/50 shadow-inner italic leading-none">
                  <h3 className="text-[12px] font-black uppercase mb-2">ESPECIFICACIONES TÉCNICAS:</h3>
                  <p className="text-gray-500 text-[14px] font-bold uppercase leading-relaxed tracking-widest italic leading-none">{product.desc}</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                     <div className="border border-black p-2 text-center"><span className="block text-[8px] text-gray-400 font-black">MATERIAL</span>CUERO PREMIUM</div>
                     <div className="border border-black p-2 text-center"><span className="block text-[8px] text-gray-400 font-black">SKU</span>NR-{product.id}-2026</div>
                  </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-widest italic flex items-center gap-4 italic leading-none">SELECT SIZE HUB (US)</h3>
                   <div className="flex flex-wrap gap-3 italic leading-none">
                     {product.tallas.map(t => (
                       <button key={t} onClick={() => setSelectedSize(t)} className={`w-14 h-14 border-2 border-black font-black transition-all ${selectedSize === t ? 'bg-black text-white shadow-[8px_8px_0px_rgba(220,38,38,1)]' : 'hover:bg-gray-100'}`}>{t}</button>
                     ))}
                   </div>
                </div>
                <button onClick={() => {if(!selectedSize) return alert("Selecciona talla"); setCart([...cart, {...product, size: selectedSize}]); setIsCartOpen(true)}} className="w-full bg-black text-white py-6 font-black uppercase italic text-sm border-2 border-black hover:bg-white hover:text-black transition-all shadow-[15px_15px_0px_rgba(220,38,38,1)] italic leading-none">AÑADIR A LA BOLSA / カート</button>
              </div>
            </div>
          </div>
        )}

        {/* VISTA RASTREO */}
        {view === 'TRACKING' && (
          <section className="py-20 max-w-2xl mx-auto text-center italic border-b border-black">
             <h2 className="text-8xl font-black uppercase mb-4 tracking-tighter italic leading-none">追跡 <span className="text-red-600">HUB</span></h2>
             <div className="bg-white p-12 border-4 border-black shadow-[20px_20px_0px_rgba(0,0,0,1)] relative overflow-hidden leading-none">
                <Plane size={80} className="mx-auto mb-10 text-red-600 leading-none" />
                <input type="text" placeholder="INGRESA TU DNI..." className="w-full bg-[#F8F8F8] border-b-4 border-black p-4 font-black text-center mb-8 outline-none focus:border-red-600 text-3xl transition-all uppercase" value={trackingInput} onChange={(e)=>setTrackingInput(e.target.value)} />
                <button onClick={() => {const f = orders.find(o => o.id === trackingInput); setTrackingResult(f || null); if(!f) alert("DNI NO REGISTRADO");}} className="w-full bg-black text-white py-5 font-black uppercase italic hover:bg-red-600 transition-all shadow-xl italic leading-none">RASTREAR PEDIDO / 追跡</button>
             </div>
             {trackingResult && (
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-12 bg-black text-white p-12 border-l-[12px] border-red-600 shadow-2xl italic text-left leading-none">
                 <h4 className="text-5xl font-black uppercase italic mb-4">{trackingResult.status}</h4>
                 <p className="text-red-600 font-black uppercase tracking-widest mb-4 italic leading-none">CLIENTE: {trackingResult.cliente} | {trackingResult.items}</p>
                 <div className="text-white/40 font-bold uppercase tracking-widest text-[10px] leading-none">ESTIMATED ETA: 15 DAYS HUB</div>
               </motion.div>
             )}
          </section>
        )}

        {/* VISTA ADMIN */}
        {view === 'ADMIN' && (
          <section className="py-20 max-w-2xl mx-auto italic border-b border-black">
            {!isAdminAuthenticated ? (
              <div className="bg-white p-12 border-4 border-black text-center shadow-[20px_20px_0px_rgba(220,38,38,1)] italic">
                <Lock size={60} className="mx-auto mb-8 text-red-600 leading-none" />
                <h3 className="text-4xl font-black uppercase mb-10 italic leading-none">HUB CONTROL <br/><span className="text-red-600">ADMIN</span></h3>
                <input type="password" placeholder="PASSWORD..." className="w-full bg-gray-50 border-b-4 border-black p-4 rounded-xl font-black text-center mb-10 outline-none focus:border-red-600 text-xl leading-none" value={adminPass} onChange={(e)=>setAdminPass(e.target.value)} />
                <button onClick={() => adminPass === 'SOPONIFERO2025' ? setIsAdminAuthenticated(true) : alert('PASSWORD INCORRECTO')} className="w-full bg-black text-white py-5 font-black uppercase italic hover:bg-red-600 shadow-xl transition-all italic leading-none">ENTRAR AL HUB</button>
              </div>
            ) : (
              <div className="space-y-8 italic leading-none">
                <div className="flex justify-between items-end mb-12 border-b-4 border-black pb-8 leading-none"><h2 className="text-5xl font-black uppercase italic leading-none">LOGÍSTICA <span className="text-red-600">HUB</span></h2><button onClick={()=>setIsAdminAuthenticated(false)} className="text-xs font-black uppercase hover:text-red-600 transition-colors italic leading-none">LOGOUT</button></div>
                {orders.map(o => (
                  <div key={o.id} className="bg-white border-4 border-black p-10 flex justify-between items-center shadow-xl italic leading-none">
                    <div className="text-left leading-tight italic leading-none">
                      <span className="bg-red-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase mb-4 inline-block shadow-md italic leading-none">PEDIDO VERIFICADO</span>
                      <h4 className="text-3xl font-black uppercase italic mb-2 leading-none">{o.cliente}</h4>
                      <p className="text-red-600 font-black text-xl italic mb-4 tracking-tighter leading-none italic">S/ {o.total} | Wsp: {o.whatsapp}</p>
                      <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest italic leading-none">{o.items}</p>
                    </div>
                    <button onClick={()=>setOrders(orders.filter(ord => ord.id !== o.id))} className="text-gray-200 hover:text-red-600 transition-colors italic leading-none"><Trash2 size={32}/></button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white py-24 text-center italic relative overflow-hidden border-t border-black leading-none">
         <h2 className="text-6xl font-black text-black tracking-tighter mb-6 uppercase italic leading-none">NOIR TOKYO HUB</h2>
         <p className="text-[10px] font-black uppercase text-gray-300 tracking-[1em] italic leading-none">NOIR HUB 2026 • 東京リマ • LIMA PERU</p>
      </footer>

      {/* --- MODAL DE LOGIN / REGISTRO (NUEVO) --- */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[3000] flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white border-4 border-black p-12 w-full max-w-md shadow-[15px_15px_0px_rgba(220,38,38,1)] text-center relative italic">
                <button onClick={() => setIsLoginOpen(false)} className="absolute top-4 right-4 hover:text-red-600"><X size={24}/></button>
                <h2 className="text-4xl font-black uppercase mb-8 italic">NOIR ID <span className="text-red-600">ACCESS</span></h2>
                <input type="email" placeholder="CORREO ELECTRÓNICO" className="w-full border-b-4 border-black p-4 mb-4 font-black text-center outline-none focus:border-red-600" />
                <input type="password" placeholder="CONTRASEÑA" className="w-full border-b-4 border-black p-4 mb-8 font-black text-center outline-none focus:border-red-600" />
                <button onClick={() => {setUser('SAMURAI'); setIsLoginOpen(false)}} className="w-full bg-black text-white py-4 font-black uppercase italic hover:bg-red-600 transition-colors shadow-lg">INGRESAR / REGISTRARSE</button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- BOLSA HUB MODAL CON PASARELA DE PAGO (MEJORADO) --- */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[3000] flex justify-end">
            <motion.div initial={{ x: 600 }} animate={{ x: 0 }} exit={{ x: 600 }} className="bg-white w-full max-w-md h-full flex flex-col italic border-l-[12px] border-red-600 italic">
              
              {/* Encabezado Bolsa */}
              <div className="flex justify-between items-center p-12 border-b-4 border-gray-100">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">BOLSA HUB</h2>
                <button onClick={() => {setIsCartOpen(false); setCheckoutStep(0)}} className="bg-black text-white p-2 rounded-full hover:bg-red-600 transition-colors"><X size={24}/></button>
              </div>

              {/* VISTA 1: LISTA DE PRODUCTOS */}
              {checkoutStep === 0 && (
                <>
                  <div className="flex-1 overflow-y-auto space-y-8 p-12 custom-scroll italic">
                    {cart.length === 0 ? <p className="text-gray-300 font-black uppercase text-2xl">Bolsa vacía.</p> : cart.map((item, i) => (
                      <div key={i} className="flex gap-6 border-b border-gray-100 pb-6 items-center relative group">
                        <img src={item.img} className="w-20 h-20 object-contain italic drop-shadow-xl" />
                        <div className="flex-1 leading-none">
                          <h4 className="text-[12px] font-black uppercase italic mb-2">{item.nombre}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">SIZE: {item.size}</p>
                          <p className="text-2xl text-red-600 font-black italic mt-2">S/ {item.precio}</p>
                        </div>
                        <button onClick={()=>setCart(cart.filter((_, idx)=>idx!==i))} className="text-gray-200 hover:text-red-600"><Trash2 size={20}/></button>
                      </div>
                    ))}
                  </div>
                  {cart.length > 0 && (
                     <div className="p-12 border-t-8 border-black bg-gray-50">
                        <div className="flex justify-between items-end mb-8 font-black uppercase"><span className="text-gray-400 text-sm">TOTAL</span><span className="text-5xl text-red-600">S/ {totalCart}</span></div>
                        <button onClick={() => setCheckoutStep(1)} className="w-full bg-black text-white py-5 rounded-full font-black uppercase text-xs hover:bg-red-600 shadow-xl tracking-widest">IR A PAGAR</button>
                     </div>
                  )}
                </>
              )}

              {/* VISTA 2: DATOS DE ENVÍO Y PAGO */}
              {checkoutStep === 1 && (
                <div className="flex-1 p-12 overflow-y-auto bg-gray-50">
                   <button onClick={() => setCheckoutStep(0)} className="flex items-center gap-2 text-[10px] font-black uppercase mb-8 hover:text-red-600"><ArrowLeft size={12}/> Volver</button>
                   <h3 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-2">Datos de Envío</h3>
                   <div className="space-y-4 mb-8">
                      <input type="text" placeholder="NOMBRE COMPLETO" className="w-full p-4 border-2 border-black font-bold text-xs uppercase" onChange={(e) => setShippingData({...shippingData, nombre: e.target.value})} />
                      <input type="text" placeholder="DNI" className="w-full p-4 border-2 border-black font-bold text-xs uppercase" onChange={(e) => setShippingData({...shippingData, dni: e.target.value})} />
                      <input type="text" placeholder="DIRECCIÓN DE ENTREGA" className="w-full p-4 border-2 border-black font-bold text-xs uppercase" onChange={(e) => setShippingData({...shippingData, direccion: e.target.value})} />
                   </div>

                   <h3 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-2">Método de Pago</h3>
                   <div className="bg-white border-2 border-black p-6 space-y-4 mb-8 shadow-md">
                      <div className="flex justify-between items-center mb-2"><CreditCard size={24} /><span className="text-[10px] font-black">TARJETA CRÉDITO/DÉBITO</span></div>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-b border-gray-300 p-2 font-mono text-lg outline-none" onChange={(e) => setShippingData({...shippingData, tarjeta: e.target.value})} />
                      <div className="flex gap-4">
                         <input type="text" placeholder="MM/YY" className="w-1/2 border-b border-gray-300 p-2 font-mono outline-none" />
                         <input type="text" placeholder="CVC" className="w-1/2 border-b border-gray-300 p-2 font-mono outline-none" />
                      </div>
                   </div>
                   <button onClick={processPayment} className="w-full bg-red-600 text-white py-5 rounded-full font-black uppercase text-xs hover:bg-black shadow-[10px_10px_0px_rgba(0,0,0,1)] tracking-widest">PAGAR S/ {totalCart}</button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/519XXXXXXXX" target="_blank" className="fixed bottom-10 right-10 z-[5000] group italic leading-none">
        <div className="bg-white p-6 rounded-full border-2 border-black shadow-[10px_10px_0px_rgba(37,211,102,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all italic leading-none">
           <MessageCircle size={32} fill="#25D366" />
        </div>
      </a>
    </div>
  );
}