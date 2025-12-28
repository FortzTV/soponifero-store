import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, ArrowRight, ShieldCheck, Instagram, Search,
  MessageCircle, Truck, ShoppingBag, ChevronRight, Zap, Heart, 
  ArrowLeft, Users, CheckCircle2, Plane, Award, Star, Activity, Home, Lock, X, CreditCard, Check, MapPin, Package, Trash2, Plus
} from 'lucide-react';

export default function App() {
  // === 1. ESTADOS DE NAVEGACIÓN Y UX ===
  const [view, setView] = useState('HOME');
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // === 2. CAPTURA DE DATOS PARA IMPORTACIÓN (USA HUB) ===
  const [customerData, setCustomerData] = useState({ nombre: '', whatsapp: '', direccion: '', dni: '' });

  // === 3. HERO SLIDER AUTOMÁTICO (5 IMÁGENES / 5 SEGUNDOS / 60VH) ===
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroImages = useMemo(() => [
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=2000"
  ], []);

  // === 4. SISTEMA DE ÓRDENES Y PANEL ADMIN (CLAVE: SOPONIFERO2025) ===
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  const [orders, setOrders] = useState([
    { id: "72654321", cliente: "Muestra USIL", whatsapp: "999888777", items: "Samba OG White", total: "429.00", status: "EN VUELO", location: "MIAMI HUB -> LIMA", eta: "30 DIC" }
  ]);

  // === 5. EFECTOS GLOBALES (PERSISTENCIA Y ANIMACIONES) ===
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  useEffect(() => {
    const sc = localStorage.getItem('soponifero_cart');
    const so = localStorage.getItem('soponifero_orders');
    if (sc) setCart(JSON.parse(sc));
    if (so) setOrders(JSON.parse(so));
  }, []);

  useEffect(() => {
    localStorage.setItem('soponifero_cart', JSON.stringify(cart));
    localStorage.setItem('soponifero_orders', JSON.stringify(orders));
  }, [cart, orders]);

  // === 6. DATA INTEGRA (15 PRODUCTOS CON DESCRIPCIONES LARGAS) ===
  const productos = useMemo(() => [
    { 
      id: 1, marca: "ADIDAS", nombre: "SAMBA OG WHITE", precio: "429.00", img: "/samba.png", tag: "HYPE", 
      desc: "Originalmente diseñada para canchas de fútbol sala en los años 50, la Adidas Samba se ha convertido en la silueta definitiva del streetstyle global en 2025. Este par presenta un cuero de grano superior impecable, la mítica puntera T-Toe de gamuza en color gris claro y una suela de caucho color caramelo (gum sole) que ofrece una tracción excepcional y un look retro inigualable. Ideal para combinar con jeans rectos o pantalones de vestir. Producto importado directamente de los mejores retailers de USA.", 
      detalles: ["Cuero de Grano Superior", "Puntera T-Toe de Gamuza", "Suela de Caucho Natural", "Plantilla OrthoLite®", "Stock Real en Lima"], tallas: ["38", "39", "40", "41", "42"] 
    },
    { 
      id: 2, marca: "ADIDAS", nombre: "SPONGEBOB FREIZEIT", precio: "529.00", img: "/samba.png", tag: "LIMITADO", 
      desc: "Una de las colaboraciones más raras y buscadas por coleccionistas. La Adidas Freizeit se reinventa con la estética de Bob Esponja en un colorway 'Black Stealth'. Este modelo destaca por su construcción robusta y materiales sintéticos de alta resistencia que mantienen un brillo sutil bajo la luz. Cuenta con detalles grabados en bajorrelieve y una comodidad superior diseñada para el uso diario intenso. Un 'grail' que no verás repetido en las calles de Lima.", 
      detalles: ["Material Sintético Premium", "Detalles de Bob Esponja", "Edición Coleccionista", "Acolchado de Doble Densidad"], tallas: ["39", "40", "41"] 
    },
    { 
      id: 3, marca: "ADIDAS", nombre: "CAMPUS 00S GREY", precio: "449.00", img: "/samba.png", tag: "TREND", 
      desc: "Inspirada en la era dorada del skate de los años 2000, la Campus 00s lleva la silueta clásica de Adidas a una dimensión mucho más robusta y audaz. Presenta una capellada de gamuza de pelo corto en color gris humo, lengüeta ultra acolchada para mayor soporte y cordones planos extra anchos que definen su carácter 'chunky'. La suela de copa cosida garantiza una durabilidad extrema tanto para el skate como para el uso urbano.", 
      detalles: ["Gamuza de Pelo Corto", "Lengüeta Acolchada Pro", "Cordones Planos 'Fat Laces'", "Entresuela de EVA"], tallas: ["38", "40", "41", "42"] 
    },
    { 
      id: 4, marca: "ADIDAS", nombre: "GAZELLE INDOOR BLUE", precio: "419.00", img: "/samba.png", tag: "CLASSIC", 
      desc: "La Gazelle Indoor nació en los años 70 como una zapatilla de entrenamiento para atletas en interiores, pero rápidamente fue adoptada por la cultura terraza en el Reino Unido. Esta versión destaca por su color azul eléctrico vibrante sobre gamuza de seda y las tres rayas en cuero blanco crema. Lo que la hace única es su suela de caucho traslúcida que se extiende por los laterales, dándole un toque moderno.", 
      detalles: ["Suede Azul Real", "Suela Traslúcida Envolvente", "Forro Interno Sintético", "Logotipo Trefoil Dorado"], tallas: ["40", "41", "42"] 
    },
    { 
      id: 5, marca: "ADIDAS", nombre: "YEEZY BOOST 350 ONYX", precio: "999.00", img: "/samba.png", tag: "GRAIL", 
      desc: "Diseñada por Kanye West, la Yeezy Boost 350 V2 'Onyx' es la definición de comodidad futurista. Construida con una parte superior de Primeknit reingenierizado que se adapta a la forma del pie como una segunda piel, este colorway negro triple ofrece una estética minimalista y poderosa. La mediasuela utiliza la tecnología Boost patentada de Adidas.", 
      detalles: ["Tecnología Boost de Cuerpo Completo", "Tejido Primeknit Transpirable", "Tira de Talón Reforzada", "Cordones Reflectantes"], tallas: ["41", "42", "43"] 
    },
    { 
      id: 6, marca: "ADIDAS", nombre: "BAD BUNNY RESPONSE CL", precio: "659.00", img: "/samba.png", tag: "DROP", 
      desc: "Benito Martínez Ocasio reniega del estilo retro-running con su interpretación de la Response CL. Inspirada en la fluidez del tiempo, esta silueta presenta superposiciones de cuero 'derretido' sobre una base de mesh. Los tonos tierra y el icónico 'ojo' de Bad Bunny en el talón hacen de este par una pieza de arte caminable.", 
      detalles: ["Superposiciones de Cuero", "Amortiguación Adiprene", "Detalles Bad Bunny", "Mesh Doble Capa"], tallas: ["39", "40", "41", "42"] 
    },
    { 
      id: 7, marca: "ADIDAS", nombre: "SAMBA OG CORE BLACK", precio: "429.00", img: "/samba.png", tag: "STREET", 
      desc: "La versión invertida del clásico. Cuero negro profundo con las tres rayas en blanco nítido. Mantiene la suela gum que define a la silueta. Es el par más versátil para el uso rudo diario sin perder el estilo de la cultura Terrace europea.", 
      detalles: ["Cuero Premium Negro", "Suela Gum", "Puntera de Gamuza"], tallas: ["38", "39", "40", "41", "42"] 
    },
    { 
      id: 8, marca: "ADIDAS", nombre: "CAMPUS 00S CORE BLACK", precio: "449.00", img: "/samba.png", tag: "BEST", 
      desc: "Negro absoluto sobre una silueta chunky. Los cordones blancos anchos rompen la monocromía para crear un contraste visual poderoso. Diseñada para durar y para destacar en cualquier escenario urbano de Lima.", 
      detalles: ["Suede Negro", "Cordones Fat White", "Suela de Goma"], tallas: ["40", "41", "42", "43"] 
    },
    { 
      id: 9, marca: "ADIDAS", nombre: "YEEZY SLIDE BONE", precio: "499.00", img: "/samba.png", tag: "RESTOCK", 
      desc: "La sandalia que cambió la industria. Inyectada con espuma EVA de alta densidad para una ligereza y durabilidad extremas. El diseño minimalista y la suela con dientes de sierra ofrecen una tracción y confort superiores.", 
      detalles: ["Espuma EVA Inyectada", "Suela de Tracción", "Diseño Minimalista"], tallas: ["39", "40", "41", "42"] 
    },
    { 
      id: 21, marca: "NIKE", nombre: "AIR FORCE 1 WHITE", precio: "459.00", img: "/samba.png", tag: "ESSENTIAL", 
      desc: "El clásico de clásicos. Desde su debut en 1982, el Air Force 1 ha trascendido el baloncesto para convertirse en un pilar de la moda global. Este modelo 'Triple White' cuenta con un acabado de cuero premium impecable y la revolucionaria unidad Nike Air encapsulada.", 
      detalles: ["Unidad Nike Air", "Piel de Grano Completo", "Suela Non-Marking"], tallas: ["7", "8", "9", "10", "11"] 
    },
    { 
      id: 22, marca: "NIKE", nombre: "DUNK LOW PANDA", precio: "480.00", img: "/samba.png", tag: "TREND", 
      desc: "El par más viral de los últimos años. Las Nike Dunk Low 'Panda' ofrecen una estética monocromática infalible que combina con cualquier outfit urbano. Construidas con una base de cuero blanco y superposiciones en negro obsidiana.", 
      detalles: ["Cuero Liso", "Bloques de Color BN", "Suela de Tracción"], tallas: ["8", "9", "10", "11"] 
    },
    { 
      id: 23, marca: "NIKE", nombre: "JORDAN 1 LOW UNC", precio: "599.00", img: "/samba.png", tag: "HYPE", 
      desc: "Homenaje a la Universidad de Carolina del Norte. Azul celeste vibrante sobre cuero premium blanco. El icónico logotipo Wings en el talón completa este diseño atemporal que fusiona la herencia del basket con el lujo moderno.", 
      detalles: ["University Blue", "Air-Sole Encapsulada", "Wings Logo"], tallas: ["8", "9", "10", "11"] 
    },
    { 
      id: 24, marca: "NIKE", nombre: "JORDAN 4 BRED REIMAGINED", precio: "1200.00", img: "/samba.png", tag: "GRAIL", 
      desc: "Aniversario 35 de un diseño icónico de Tinker Hatfield. Esta edición utiliza un cuero negro de calidad suprema que envejece con elegancia. Mantiene los logotipos 'Nike Air' originales en el talón y la malla lateral transpirable.", 
      detalles: ["Cuero Premium", "Nike Air OG", "Cápsula Air Visible", "Caja Especial"], tallas: ["9", "10", "11"] 
    },
    { 
      id: 25, marca: "NIKE", nombre: "DUNK LOW GREY FOG", precio: "520.00", img: "/samba.png", tag: "CLEAN", 
      desc: "Elegancia en tonos neutros. El Grey Fog ofrece una alternativa sofisticada al Panda, con superposiciones de color gris niebla sobre una base blanca. Perfecto para quienes buscan un look más sutil pero de alto impacto.", 
      detalles: ["Gris Niebla", "Construcción de Cuero", "Suela de Copa"], tallas: ["8", "9", "10", "11"] 
    },
    { 
      id: 26, marca: "NIKE", nombre: "AIR JORDAN 1 HIGH CHICAGO", precio: "1800.00", img: "/samba.png", tag: "ULTIMATE", 
      desc: "La zapatilla más importante de todos los tiempos. Los colores de los Chicago Bulls en la silueta que lo inició todo en 1985. Un 'must-have' absoluto para cualquier coleccionista serio que entienda el valor de la cultura.", 
      detalles: ["Varsity Red", "Cuero de Alta Gama", "Estética OG 1985"], tallas: ["9", "10", "11"] 
    }
  ], []);

  // === 7. LÓGICA DE PROCESAMIENTO AUTOMÁTICO ===
  const totalCart = cart.reduce((acc, curr) => acc + parseFloat(curr.precio), 0).toFixed(2);

  const handleFinalPayment = () => {
    if(!customerData.nombre || !customerData.whatsapp || !customerData.dni) return alert("Mano, completa todos los datos para la importación.");
    const items = cart.map(i => `${i.nombre} (Talla: ${i.size})`).join(", ");
    const newOrder = { id: customerData.dni, cliente: customerData.nombre, whatsapp: customerData.whatsapp, total: totalCart, items, status: "PAGO RECIBIDO", location: "MIAMI HUB -> LIMA", eta: "15 DÍAS" };
    setOrders([newOrder, ...orders]);
    const msg = `¡Hola Soponifero Store! Acabo de pedir: ${items}. Total: S/ ${totalCart}. Mi DNI: ${customerData.dni}. Espero confirmación.`;
    window.open(`https://wa.me/519XXXXXXXX?text=${encodeURIComponent(msg)}`, '_blank');
    setCart([]); setView('SUCCESS');
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans cursor-none selection:bg-red-600">
      {/* 8. CURSOR PERSONALIZADO (INGENIERÍA UX) */}
      <motion.div className="fixed top-0 left-0 w-8 h-8 border-2 border-red-600 rounded-full pointer-events-none z-[9999] hidden lg:block" animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }} transition={{ type: 'spring', damping: 20 }} />

      {/* 9. MARQUEE NEGRO (RESTAURADO) */}
      <div className="bg-black text-white py-3 overflow-hidden border-b border-red-600/30 italic">
        <motion.div initial={{ x: "100%" }} animate={{ x: "-100%" }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="inline-block text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">
          • STOCK REAL LIMA 2025 • IMPORTACIÓN DIRECTA USA • INVERSIÓN S/ 11,000 • SOPONIFERO STORE • LEGIT CHECK 100% • LIMA NORTE ENVÍOS •
        </motion.div>
      </div>

      {/* 10. NAVBAR (ESTÉTICA PROFESIONAL) */}
      <nav className="sticky top-0 w-full z-50 bg-white border-b border-gray-100 h-24 flex items-center justify-between px-6 lg:px-12">
        <button onClick={() => setView('HOME')} className="flex flex-col items-start leading-none font-black italic tracking-tighter group">
          <span className="text-2xl text-red-600 group-hover:tracking-widest transition-all">SOPONIFERO</span><span className="text-2xl">STORE</span>
        </button>
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.3em]">
          <button onClick={() => setView('HOME')} className="hover:text-red-600 transition-colors">Inicio</button>
          <button onClick={() => setView('TRACKING')} className="hover:text-red-600 transition-colors">Rastrear</button>
          <button className="bg-red-600 text-white px-8 py-10 -my-10 hover:bg-black transition-all shadow-xl">Sale</button>
        </div>
        <div className="flex items-center gap-8">
          <Users size={22} className="cursor-pointer hover:text-red-600" onClick={() => setView('ADMIN')} />
          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={24} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg shadow-red-600/30">{cart.length}</span>}
          </div>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto px-6 lg:px-12 pt-0">
        
        {/* 11. VISTA HOME: SLIDER AUTOMÁTICO (RESTAURADO) */}
        {view === 'HOME' && (
          <>
            <section className="relative w-full h-[60vh] bg-gray-100 overflow-hidden -mx-6 lg:-mx-12">
              <AnimatePresence mode='wait'>
                <motion.img key={currentHeroIndex} src={heroImages[currentHeroIndex]} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 w-full h-full object-cover" />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-12 lg:px-24">
                <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-white text-6xl md:text-[120px] font-black italic uppercase leading-[0.8] tracking-tighter drop-shadow-2xl">THE <br/><span className="text-red-600">GRAILS</span></motion.h2>
                <div className="flex gap-4 mt-12">
                   <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="bg-red-600 text-white px-12 py-5 font-black uppercase text-xs italic shadow-2xl hover:bg-white hover:text-red-600 transition-all">Explorar Stock</button>
                   <button onClick={() => setView('TRACKING')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 font-black uppercase text-xs italic hover:bg-white hover:text-black transition-all">Rastrear Importación</button>
                </div>
              </div>
            </section>

            {/* SECCIÓN ADIDAS (LOGOS RESTAURADOS) */}
            <section className="mt-32 mb-20">
               <div className="flex items-center gap-6 mb-16 italic">
                  <div className="h-1 flex-1 bg-gray-100" /><h3 className="text-4xl font-black uppercase tracking-tighter">ADIDAS <span className="text-red-600">VAULT</span></h3><div className="h-1 flex-1 bg-gray-100" />
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24">
                 {productos.filter(p => p.marca === "ADIDAS").map(p => <ProductCard key={p.id} prod={p} onClick={() => {setProduct(p); setView('DETAIL'); window.scrollTo(0,0)}} />)}
               </div>
            </section>

            {/* SECCIÓN NIKE (LOGOS RESTAURADOS) */}
            <section className="mt-40 mb-40">
               <div className="flex items-center gap-6 mb-16 italic">
                  <div className="h-1 flex-1 bg-gray-100" /><h3 className="text-4xl font-black uppercase tracking-tighter">NIKE <span className="text-red-600">LAB</span></h3><div className="h-1 flex-1 bg-gray-100" />
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24">
                 {productos.filter(p => p.marca === "NIKE").map(p => <ProductCard key={p.id} prod={p} onClick={() => {setProduct(p); setView('DETAIL'); window.scrollTo(0,0)}} />)}
               </div>
            </section>

            {/* INFO BLOCKS (S/ 11K) */}
            <section className="mb-40 grid grid-cols-1 md:grid-cols-4 gap-8 italic">
              <div className="md:col-span-2 bg-black rounded-[56px] p-20 text-white relative overflow-hidden">
                 <h3 className="text-6xl font-black uppercase mb-8 leading-none tracking-tighter">HECHOS NO <br/><span className="text-red-600">PALABRAS.</span></h3>
                 <p className="text-xs font-bold opacity-40 uppercase tracking-widest leading-loose max-w-sm">Inversión real de S/ 11,000 en stock físico para Lima Norte. No somos dropshipping, somos importación directa verificada.</p>
                 <Zap size={250} className="absolute -bottom-20 -right-20 text-white/5" />
              </div>
              <div className="bg-red-600 rounded-[56px] p-16 text-white flex flex-col justify-between shadow-3xl hover:scale-[1.02] transition-transform">
                <ShieldCheck size={50} /><h4 className="text-3xl font-black uppercase tracking-tighter leading-none">LEGIT CHECK <br/>AL 100%</h4>
              </div>
              <div className="bg-gray-50 rounded-[56px] p-16 flex flex-col justify-between border border-gray-100 hover:scale-[1.02] transition-transform">
                <Truck size={50} className="text-red-600" /><h4 className="text-3xl font-black uppercase tracking-tighter leading-none">LIMA NORTE <br/>ENTREGA PRO</h4>
              </div>
            </section>
          </>
        )}

        {/* 12. VISTA DETALLE (DESCRIPCIONES LARGAS INTEGRADAS) */}
        {view === 'DETAIL' && product && (
          <div className="py-24 min-h-screen text-left">
            <button onClick={() => setView('HOME')} className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-red-600 transition-all"><ArrowLeft size={16} /> Volver a Colección</button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start italic">
              <div className="bg-gray-50 rounded-[64px] p-20 flex items-center justify-center aspect-square shadow-inner relative group overflow-hidden">
                <img src={product.img} className="w-full h-auto drop-shadow-3xl group-hover:scale-110 transition-transform duration-1000" alt={product.nombre} />
                <Zap className="absolute -bottom-20 -right-20 text-black/[0.03] w-96 h-96" />
              </div>
              <div className="flex flex-col">
                <span className="text-red-600 font-black uppercase text-[13px] mb-4 tracking-[0.5em]">{product.marca}</span>
                <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.85] mb-8 tracking-tighter">{product.nombre}</h2>
                <p className="text-6xl font-black text-black mb-12 underline decoration-red-600 decoration-8 underline-offset-8">S/ {product.precio}</p>
                <div className="mb-12">
                   <h3 className="text-[11px] font-black uppercase tracking-widest mb-6 text-gray-400">Tallas Disponibles (US)</h3>
                   <div className="grid grid-cols-4 gap-4 max-w-sm">
                     {product.tallas.map(t => (
                       <button key={t} onClick={() => setSelectedSize(t)} className={`py-5 border-2 ${selectedSize === t ? 'border-red-600 text-red-600 bg-red-50 shadow-xl scale-105' : 'border-gray-100 text-gray-400'} font-black text-xs rounded-2xl transition-all`}>[ {t} ]</button>
                     ))}
                   </div>
                </div>
                <button onClick={() => {if(!selectedSize) return alert("Selecciona tu talla, mano."); setCart([...cart, {...product, size: selectedSize, cid: Date.now()}]); setIsCartOpen(true)}} className="bg-black text-white py-8 rounded-full font-black uppercase italic tracking-[0.3em] hover:bg-red-600 transition-all shadow-2xl flex gap-4 items-center justify-center text-sm shadow-inner group">
                  <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform"/> Agregar a la Bolsa
                </button>
                <div className="mt-20 border-t border-gray-100 pt-16">
                   <h3 className="text-xs font-black uppercase mb-6 text-red-600 tracking-widest">Anatomía del Producto</h3>
                   <p className="text-gray-400 text-[13px] font-bold uppercase tracking-widest leading-loose max-w-md">{product.desc}</p>
                   <div className="mt-12 space-y-4">
                     {product.detalles.map((d, i) => <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase text-black"><CheckCircle2 size={16} className="text-red-600"/> {d}</div>)}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 13. VISTA CHECKOUT AUTOMÁTICO (PUENTE A WHATSAPP) */}
        {view === 'CHECKOUT' && (
          <section className="py-32 min-h-screen max-w-2xl mx-auto italic text-left">
            <h2 className="text-7xl font-black uppercase mb-16 tracking-tighter">Finalizar <br/><span className="text-red-600">Importación</span></h2>
            <div className="space-y-6 bg-gray-50 p-16 rounded-[64px] border border-gray-100 shadow-inner">
               <div className="space-y-2"><span className="text-[10px] font-black uppercase text-red-600 ml-4">Nombre de Receptor</span><input type="text" placeholder="EJ: JEFERSON ..." className="w-full p-8 rounded-2xl bg-white border font-black uppercase text-xs outline-none focus:ring-2 ring-red-600 transition-all shadow-sm" value={customerData.nombre} onChange={(e)=>setCustomerData({...customerData, nombre: e.target.value})} /></div>
               <div className="space-y-2"><span className="text-[10px] font-black uppercase text-red-600 ml-4">DNI (Para Rastreo)</span><input type="text" placeholder="DNI..." className="w-full p-8 rounded-2xl bg-white border font-black uppercase text-xs outline-none focus:ring-2 ring-red-600 transition-all shadow-sm" value={customerData.dni} onChange={(e)=>setCustomerData({...customerData, dni: e.target.value})} /></div>
               <div className="space-y-2"><span className="text-[10px] font-black uppercase text-red-600 ml-4">WhatsApp de Contacto</span><input type="text" placeholder="987 ..." className="w-full p-8 rounded-2xl bg-white border font-black uppercase text-xs outline-none focus:ring-2 ring-red-600 transition-all shadow-sm" value={customerData.whatsapp} onChange={(e)=>setCustomerData({...customerData, whatsapp: e.target.value})} /></div>
               <button onClick={handleFinalPayment} className="w-full bg-black text-white py-10 rounded-full font-black uppercase italic tracking-[0.5em] hover:bg-red-600 transition shadow-3xl text-xs mt-12">Confirmar y Pagar S/ {totalCart}</button>
            </div>
          </section>
        )}

        {/* 14. VISTA SUCCESS (ESTADO LOGÍSTICO) */}
        {view === 'SUCCESS' && (
          <section className="py-48 text-center italic">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-44 h-44 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-12 shadow-3xl shadow-green-500/20"><Check size={90} className="text-white" /></motion.div>
            <h2 className="text-7xl font-black uppercase mb-6 tracking-tighter">¡HECHO, MANO!</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-16 max-w-sm mx-auto">Tu pedido ha sido procesado. Los datos están en el panel admin y se abrió WhatsApp.</p>
            <button onClick={() => setView('HOME')} className="bg-black text-white px-16 py-6 rounded-full font-black uppercase italic hover:bg-red-600 transition shadow-2xl">Regresar a Inicio</button>
          </section>
        )}

        {/* 15. VISTA RASTREO (HUB USA) */}
        {view === 'TRACKING' && (
          <section className="py-32 min-h-screen max-w-4xl mx-auto italic text-left">
            <h2 className="text-7xl font-black uppercase mb-20 tracking-tighter">Hub <span className="text-red-600">Rastreo</span></h2>
            <div className="bg-gray-50 rounded-[64px] p-24 text-center mb-16 shadow-inner">
              <Plane size={80} className="mx-auto mb-10 text-red-600" />
              <div className="flex gap-6 mt-12">
                <input type="text" placeholder="DNI..." className="flex-1 bg-white border-2 p-8 rounded-2xl font-black uppercase text-sm outline-none focus:ring-2 ring-red-600" value={trackingInput} onChange={(e)=>setTrackingInput(e.target.value)} />
                <button onClick={() => {const f = orders.find(o => o.id === trackingInput); setTrackingResult(f || null); if(!f) alert("DNI no registrado en el HUB USA.");}} className="bg-black text-white px-12 rounded-2xl font-black text-xs uppercase hover:bg-red-600 transition shadow-xl">Rastrear</button>
              </div>
            </div>
            {trackingResult && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-black text-white rounded-[56px] p-16 flex justify-between items-center shadow-3xl relative overflow-hidden">
                 <div className="relative z-10 text-left">
                   <span className="text-red-600 font-black uppercase text-[10px] block tracking-[0.6em] mb-4">LOGÍSTICA INTERNACIONAL</span>
                   <h4 className="text-5xl font-black uppercase leading-none italic">{trackingResult.status}</h4>
                   <p className="text-white/40 text-[12px] font-bold mt-8 uppercase tracking-widest"><MapPin size={18} className="inline mr-3 text-red-600"/> {trackingResult.location}</p>
                 </div>
                 <div className="text-right border-l border-white/10 pl-16 z-10">
                    <span className="text-white/30 text-[10px] font-black uppercase block mb-4">Entrega Estimada</span>
                    <p className="text-4xl font-black uppercase text-red-600">{trackingResult.eta}</p>
                 </div>
                 <Zap className="absolute -right-20 -bottom-20 text-white/[0.03] w-96 h-96" />
              </motion.div>
            )}
          </section>
        )}

        {/* 16. VISTA ADMIN SECRETA (GESTIÓN S/ 11K) */}
        {view === 'ADMIN' && (
          <section className="py-32 min-h-screen text-left italic">
            {!isAdminAuthenticated ? (
              <div className="max-w-md mx-auto py-24 text-center bg-gray-50 rounded-[56px] p-16 border border-gray-100 shadow-inner">
                <Lock size={64} className="mx-auto mb-12 text-red-600" />
                <h3 className="text-4xl font-black uppercase mb-12 tracking-tighter">Dueño Access</h3>
                <input type="password" placeholder="CLAVE (SOPONIFERO2025)..." className="w-full bg-white border-2 p-8 rounded-2xl font-black text-center mb-8 outline-none focus:ring-2 ring-red-600 transition-all" value={adminPass} onChange={(e)=>setAdminPass(e.target.value)} />
                <button onClick={() => adminPass === 'SOPONIFERO2025' ? setIsAdminAuthenticated(true) : alert('Clave Incorrecta, mano.')} className="w-full bg-black text-white py-8 rounded-full font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-2xl">Acceder al Control</button>
              </div>
            ) : (
              <div className="space-y-16 text-left">
                 <div className="flex justify-between items-end border-b-2 border-gray-100 pb-16">
                   <h2 className="text-6xl font-black uppercase text-red-600 tracking-tighter leading-none">PEDIDOS WEB</h2>
                   <button onClick={() => setIsAdminAuthenticated(false)} className="text-[11px] font-black uppercase text-gray-400 hover:text-black">Cerrar Sesión</button>
                 </div>
                 <div className="grid grid-cols-1 gap-8">
                    {orders.map(o => (
                      <div key={o.id} className="bg-white border-2 border-gray-100 p-12 rounded-[56px] flex justify-between items-center hover:shadow-3xl transition-all duration-1000 group relative overflow-hidden">
                         <div className="text-left relative z-10">
                           <span className="bg-green-100 text-green-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Venta Web Confirmada</span>
                           <h4 className="text-4xl font-black uppercase mb-4">{o.cliente} | DNI: {o.id}</h4>
                           <p className="text-red-600 font-black uppercase text-xl mb-4 italic">S/ {o.total} | Wsp: {o.whatsapp}</p>
                           <p className="text-gray-400 font-bold uppercase text-[11px] tracking-widest">{o.items}</p>
                         </div>
                         <button onClick={()=>setOrders(orders.filter(ord => ord.id !== o.id))} className="text-gray-100 hover:text-red-600 transition-colors z-20"><Trash2 size={36}/></button>
                         <div className="absolute top-0 right-0 w-3 h-full bg-red-600 group-hover:w-6 transition-all duration-700" />
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </section>
        )}

        {/* 17. FOOTER INTEGRO (CON TODA LA DATA) */}
        <footer className="bg-gray-50 -mx-12 px-12 pt-48 pb-24 border-t border-gray-100 mt-48 text-left relative overflow-hidden italic">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24 mb-32 z-10 relative">
            <div className="col-span-2">
              <h2 className="text-8xl font-black text-red-600 mb-10 uppercase tracking-tighter leading-none">SOPONIFERO <br/> STORE</h2>
              <p className="text-[13px] font-bold text-gray-400 uppercase leading-loose max-w-sm mb-16 italic">Especialistas en la importación de 'Grails' certificados de USA. Inversión real de S/ 11,000 en stock. Operaciones en Lima Norte 2025.</p>
              <div className="flex gap-14 grayscale opacity-30 hover:opacity-100 transition-all duration-1000 items-center">
                <img src="/visa.png" className="h-8" alt="Visa" onError={(e)=>e.target.style.display='none'} />
                <img src="/mastercard.png" className="h-16" alt="Mastercard" onError={(e)=>e.target.style.display='none'} />
                <img src="/izipay.png" className="h-14" alt="Izipay" onError={(e)=>e.target.style.display='none'} />
              </div>
            </div>
            <div className="flex flex-col gap-8">
               <h4 className="font-black text-xs uppercase tracking-[0.5em] text-black">Navegación</h4>
               <button onClick={()=>setView('HOME')} className="text-[12px] font-bold text-gray-400 text-left uppercase hover:text-red-600 transition">Colección Real</button>
               <button onClick={()=>setView('ADMIN')} className="text-[12px] font-bold text-gray-400 text-left uppercase hover:text-red-600 transition">Dueño Login</button>
               <button onClick={()=>setView('TRACKING')} className="text-[12px] font-bold text-gray-400 text-left uppercase hover:text-red-600 transition">Rastreo de Pedido</button>
            </div>
          </div>
          <div className="text-center opacity-20 text-[11px] font-black uppercase tracking-[1.5em] border-t border-gray-200 pt-20">SOPONIFERO STORE © 2025 • HECHOS NO PALABRAS • LIMA, PE</div>
          <Zap size={700} className="absolute -bottom-60 -right-60 text-black/[0.02]" />
        </footer>

        {/* 18. MODAL CARRITO (UX AUTOMÁTICA) */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-3xl z-[3000] flex justify-end">
              <motion.div initial={{ x: 600 }} animate={{ x: 0 }} exit={{ x: 600 }} className="bg-white w-full max-w-2xl h-full p-20 flex flex-col text-left shadow-3xl italic">
                <div className="flex justify-between items-center mb-24 font-black uppercase text-6xl tracking-tighter italic"><h2>MI BOLSA</h2><button onClick={() => setIsCartOpen(false)}><X size={48} className="hover:rotate-90 transition-transform duration-500"/></button></div>
                <div className="flex-1 overflow-y-auto space-y-14 pr-6">
                  {cart.length === 0 ? <p className="text-gray-200 font-black uppercase text-2xl">Nada en la bolsa, mano.</p> : cart.map((item, i) => (
                    <div key={i} className="flex gap-10 border-b-2 border-gray-50 pb-12 relative group">
                      <div className="w-44 h-44 bg-gray-50 rounded-[48px] overflow-hidden flex items-center justify-center p-8 shadow-inner"><img src={item.img} className="w-full h-auto object-contain drop-shadow-3xl" /></div>
                      <div className="flex flex-col justify-center text-left">
                        <h4 className="text-[16px] font-black uppercase text-black mb-3">{item.nombre}</h4>
                        <p className="text-[12px] text-gray-400 font-bold uppercase mb-6">Talla: [ {item.size} ]</p>
                        <p className="text-[24px] text-red-600 font-black">S/ {item.precio}</p>
                      </div>
                      <button onClick={()=>setCart(cart.filter((_, idx)=>idx!==i))} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-200 hover:text-red-600 transition-colors"><Trash2 size={28}/></button>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div className="pt-20 border-t-2 border-gray-100">
                    <div className="flex justify-between items-end mb-12 font-black uppercase">
                       <span className="text-gray-400 text-xl">Subtotal</span>
                       <span className="text-6xl text-black">S/ {totalCart}</span>
                    </div>
                    {/* ACCIÓN HACIA EL CHECKOUT */}
                    <button onClick={() => {setView('CHECKOUT'); setIsCartOpen(false)}} className="w-full bg-red-600 text-white py-10 rounded-full font-black uppercase italic tracking-[0.5em] hover:bg-black transition-all shadow-3xl text-sm">Ir al Checkout Seguro</button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 19. NOTIFICACIÓN VENTA (INGENIERÍA SOCIAL) */}
        <AnimatePresence>{showNotification && (
          <motion.div initial={{ x: -400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -400, opacity: 0 }} className="fixed bottom-12 left-12 bg-white/95 backdrop-blur-3xl border-2 border-gray-100 shadow-3xl p-12 rounded-[56px] flex items-center gap-10 z-[100] italic">
            <div className="w-24 h-24 bg-red-600 rounded-[28px] flex items-center justify-center text-white font-black text-3xl shadow-3xl shadow-red-600/30">SS</div>
            <div className="text-left"><p className="text-[16px] font-black uppercase tracking-tighter text-black">Venta Confirmada</p><p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest italic">Un cliente en Los Olivos compró unas Jordan 4</p></div>
          </motion.div>
        )}</AnimatePresence>
      </main>

      {/* 20. WHATSAPP FLOAT (BOTÓN DE CIERRE) */}
      <a href="https://wa.me/519XXXXXXXX" target="_blank" className="fixed bottom-12 right-12 z-[5000] bg-[#25D366] text-white p-10 rounded-full shadow-[0_30px_70px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-500 flex items-center justify-center shadow-inner"><MessageCircle size={48} fill="white" /></a>
    </div>
  );
}

// 21. PRODUCT CARD COMPONENT (DISEÑO BOUTIQUE)
function ProductCard({ prod, onClick }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} onClick={onClick} className="group cursor-pointer flex flex-col text-center italic">
      <div className="relative aspect-[4/5] bg-gray-50 rounded-[72px] overflow-hidden flex items-center justify-center p-20 border border-gray-100 transition-all duration-1000 group-hover:bg-white group-hover:shadow-3xl shadow-inner">
        <div className="absolute top-14 left-14 z-10 bg-black text-white text-[10px] font-black px-8 py-3 rounded-full tracking-widest uppercase shadow-2xl group-hover:bg-red-600 transition-colors">{prod.tag}</div>
        <img src={prod.img} className="w-full h-auto group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-[1800ms] drop-shadow-3xl" alt={prod.nombre} />
      </div>
      <div className="mt-12 text-center px-8">
        <h4 className="text-[16px] font-black uppercase italic text-black tracking-tight group-hover:text-red-600 transition-colors truncate">{prod.nombre}</h4>
        <div className="flex items-center justify-center gap-6 mt-4">
           <div className="h-[2px] w-8 bg-red-600/20 group-hover:w-14 transition-all duration-1000"/>
           <p className="text-red-600 font-black text-3xl leading-none">S/ {prod.precio}</p>
           <div className="h-[2px] w-8 bg-red-600/20 group-hover:w-14 transition-all duration-1000"/>
        </div>
      </div>
    </motion.div>
  );
}