'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Box, Shield, Zap, MapPin, Phone, Mail, ArrowRight, ChevronRight, Factory, Droplets, Thermometer, FlaskConical, Milk, Beaker, CookingPot } from 'lucide-react';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants: any = {
    primary: 'bg-industrial-blue text-white border-2 border-industrial-blue hover:bg-industrial-black hover:border-industrial-black',
    outline: 'bg-transparent text-industrial-blue border-2 border-industrial-blue hover:bg-industrial-blue hover:text-white hover:border-industrial-blue',
    ghost: 'bg-transparent text-industrial-black border-2 border-transparent hover:border-industrial-blue hover:text-industrial-blue',
  };

  return (
    <button
      className={`px-6 py-3 font-display text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 relative group ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="absolute top-0 left-0 w-1 h-1 bg-current opacity-20" />
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-current opacity-20" />
      {children}
    </button>
  );
};

const MicroLabel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`font-mono text-[10px] tracking-[0.2em] uppercase text-industrial-black/60 ${className}`}>
    {children}
  </span>
);

const StatCounter = ({ value, label, prefix = '' }: { value: string; label: string; prefix?: string }) => (
  <div className="border-l-4 border-industrial-blue pl-6 py-2">
    <div className="font-display text-5xl md:text-6xl font-black text-industrial-blue leading-none mb-2">
      {prefix}{value}
    </div>
    <MicroLabel>{label}</MicroLabel>
  </div>
);

const SectionIndex = ({ num }: { num: string }) => (
  <div className="absolute top-0 left-0 -translate-x-full pr-8 hidden xl:block">
    <div className="font-mono text-[10px] font-bold text-industrial-black/10 rotate-180 [writing-mode:vertical-rl] tracking-widest">
      SEC_REF_{num}
    </div>
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = ['products', 'technology', 'about', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
      else if (window.scrollY < 100) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md py-2 border-b-2 border-industrial-black/10 shadow-sm' 
        : 'bg-transparent py-4 border-b-2 border-transparent'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`h-10 w-1.5 transition-colors duration-500 ${scrolled ? 'bg-industrial-red' : 'bg-industrial-blue'}`} />
          <div className="flex flex-col">
            <span className={`font-display font-black text-2xl leading-none tracking-tighter transition-colors duration-500 ${scrolled ? 'text-industrial-blue' : 'text-industrial-black'}`}>OASIS</span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-industrial-black font-bold uppercase">Preforms Synergy Ltd.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Products', 'Technology', 'About', 'Contact'].map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <Link 
                key={item} 
                href={`#${id}`} 
                className={`font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 relative py-2 ${
                  isActive ? 'text-industrial-red' : 'text-industrial-black hover:text-industrial-blue'
                }`}
              >
                {item}
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-industrial-red"
                  />
                )}
              </Link>
            );
          })}
          <Button variant={scrolled ? 'primary' : 'outline'} className="h-10 px-4 text-xs">Request Quote</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-industrial-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-industrial-black text-white p-8 flex flex-col justify-between md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-industrial-red" />
                <span className="font-display font-black text-xl tracking-tighter uppercase">Oasis</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 border border-white/20 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {['Products', 'Technology', 'About', 'Contact'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="font-display text-4xl font-black uppercase tracking-tighter hover:text-industrial-red transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10">
              <Button className="w-full h-14 text-lg" onClick={() => setIsOpen(false)}>Request Quote</Button>
              <div className="mt-8 font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
                Oasis Preforms Synergy Ltd. <br />
                Port Harcourt, Nigeria
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <MicroLabel className="mb-4 md:mb-6 block">Industrial Manufacturing Specialist</MicroLabel>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-6 md:mb-8 text-industrial-blue">
            PRECISION <br />
            <span className="text-industrial-black">ENGINEERED</span> <br />
            <span className="text-industrial-accent">SYNERGY</span>
          </h1>
          <p className="text-base md:text-xl text-industrial-black/80 max-w-lg mb-8 md:mb-10 leading-relaxed">
            Delivering world-class PET preforms manufactured with Husky HPET technology. 
            Mission-control precision for heavy-duty packaging requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="group w-full sm:w-auto justify-center">
              Explore Inventory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="w-full sm:w-auto justify-center">Technical Specs</Button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative aspect-square md:aspect-square bg-industrial-black/5 border-2 border-industrial-black/10 overflow-hidden"
        >
           <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-20">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-industrial-black/20" />
              ))}
           </div>
           {/* Placeholder for high-res architectural image */}
           <Image 
              src="https://oasispreform.com/wp-content/uploads/2025/10/Gemini_Generated_Image_1pip5m1pip5m1pip.png" 
              alt="Oasis Preforms Manufacturing Facility" 
              fill
              className="object-cover grayscale contrast-125"
              referrerPolicy="no-referrer"
           />
           <div className="absolute bottom-0 left-0 bg-industrial-red text-white p-6 w-full md:w-auto">
              <MicroLabel className="text-white/70 mb-2 block">Current Status</MicroLabel>
              <div className="font-display text-2xl font-black">OPERATIONAL 24/7</div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className="bg-white border-y-2 border-industrial-black/10 py-16 relative">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        <StatCounter value="07" label="Product Categories" />
        <StatCounter value="100" label="Husky Technology" prefix="%" />
        <StatCounter value="24" label="Production Cycles" prefix="H/" />
        <StatCounter value="01" label="Industry Leader" prefix="#" />
      </div>
    </section>
  );
};

const Products = () => {
  const products = [
    { id: '01', title: 'Soft Drinks', icon: Droplets, desc: 'High-pressure CSD preforms for carbonated soft drinks.' },
    { id: '02', title: 'Bottled Water', icon: Beaker, desc: 'Standard food-grade preforms for mineral and purified water.' },
    { id: '03', title: 'Aseptic Juice', icon: FlaskConical, desc: 'Sterile preforms for aseptic filling lines and juice products.' },
    { id: '04', title: 'Hot Fill', icon: Thermometer, desc: 'Heat-resistant preforms for beverages filled up to 85°C.' },
    { id: '05', title: 'Dairy', icon: Milk, desc: 'Specialized preforms for yoghurt, milk, and dairy beverages.' },
    { id: '06', title: 'Pharma', icon: Shield, desc: 'Pharmaceutical-grade PET for syrups and healthcare liquids.' },
    { id: '07', title: 'Cooking Oil', icon: CookingPot, desc: 'Oil-resistant preforms for edible oil packaging solutions.' },
  ];

  return (
    <section id="products" className="py-24 bg-industrial-white relative">
      <div className="max-w-[1440px] mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <MicroLabel className="mb-4 block">Product Inventory</MicroLabel>
            <h2 className="text-5xl md:text-7xl font-black text-industrial-blue">THE SPECIALIST <br /> RANGE</h2>
          </div>
          <p className="text-industrial-black/70 max-w-sm font-medium leading-relaxed">
            Our product range varies depending on our customers&apos; product design. 
            Engineered for durability and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-industrial-black/10 border-2 border-industrial-black/10">
          {products.map((p, index) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.03, 
                zIndex: 20,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
              }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: index * 0.05 
              }}
              className="bg-white p-8 group hover:bg-industrial-blue transition-colors duration-500 relative cursor-pointer"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-xs font-bold text-industrial-blue group-hover:text-white transition-colors">{p.id}</span>
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <p.icon className="w-8 h-8 text-industrial-blue group-hover:text-white transition-colors" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors">{p.title}</h3>
              <p className="text-sm text-industrial-black/60 group-hover:text-white/70 transition-colors mb-8">
                {p.desc}
              </p>
              <Link href="#contact" className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase text-industrial-blue group-hover:text-white transition-colors border-b border-transparent hover:border-current pb-1">
                Technical Data <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: products.length * 0.1 }}
            className="bg-industrial-accent p-8 flex flex-col justify-center items-center text-center text-white"
          >
            <Factory className="w-12 h-12 mb-6" />
            <h3 className="text-2xl font-black mb-4">CUSTOM SPECS</h3>
            <p className="text-sm text-white/80 mb-8">Don&apos;t see your requirement? We engineer custom preform solutions.</p>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-industrial-blue w-full">Inquire Now</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Technology = () => {
  return (
    <section id="technology" className="py-24 bg-industrial-black text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full grid-bg" />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <SectionIndex num="02" />
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MicroLabel className="text-industrial-blue mb-6 block">Advanced Engineering</MicroLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-tight">WORLD-CLASS <br /> HUSKY HPET</h2>
            <p className="text-base md:text-lg text-white/70 mb-10 leading-relaxed">
              Oasis Preforms Synergy Limited is a leading manufacturer of PET preforms made by world-class Husky HPET injection molding machines. 
              This technology ensures mission-critical consistency and high-speed production cycles.
            </p>
            <div className="space-y-6">
              {[
                'High-speed injection molding',
                'Consistent neck finish precision',
                'Optimized cycle times',
                'Energy efficient production',
              ].map((item, index) => (
                <motion.div 
                  key={item} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 border-b border-white/10 pb-4"
                >
                  <span className="font-mono text-xs uppercase tracking-widest">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="border-4 border-industrial-blue p-2 aspect-[4/5] relative overflow-hidden">
              <Image 
                src="https://oasispreform.com/wp-content/uploads/2025/10/Gemini_Generated_Image_ck73ddck73ddck73.png" 
                alt="Husky HPET Injection Molding Machine" 
                fill
                className="object-cover grayscale brightness-75"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-industrial-red p-10 hidden lg:block">
              <div className="font-display text-6xl font-black">99.9%</div>
              <MicroLabel className="text-white/70">Precision Rating</MicroLabel>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-industrial-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative">
        <SectionIndex num="03" />
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-video bg-industrial-black relative overflow-hidden border-2 border-industrial-black/10">
              <Image 
                src="https://oasispreform.com/wp-content/uploads/2025/10/Gemini_Generated_Image_1pip5m1pip5m1pip.png" 
                alt="Oasis Preforms Synergy Team" 
                fill
                className="object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-industrial-blue text-white p-8 hidden md:block">
              <div className="font-display text-4xl font-black italic">EST. 2024</div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <MicroLabel className="mb-6 block">Corporate Identity</MicroLabel>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-industrial-blue mb-8 uppercase leading-tight">SYNERGY IN <br /> MOTION</h2>
            <p className="text-base md:text-lg text-industrial-black/80 mb-6 leading-relaxed">
              Oasis Preforms Synergy Ltd. was founded on the principle of technical excellence. 
              We don&apos;t just manufacture preforms; we engineer the foundation of your product&apos;s physical identity.
            </p>
            <p className="text-lg text-industrial-black/80 mb-10 leading-relaxed">
              Based in Port Harcourt, our facility serves as a hub for industrial innovation, 
              utilizing the latest in precision molding technology to serve the African market and beyond.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="font-display text-3xl font-black text-industrial-blue mb-2">VISION</div>
                <p className="text-sm text-industrial-black/60">To be the undisputed leader in high-precision PET solutions across the continent.</p>
              </div>
              <div>
                <div className="font-display text-3xl font-black text-industrial-blue mb-2">MISSION</div>
                <p className="text-sm text-industrial-black/60">Delivering uncompromising quality through technical synergy and operational discipline.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 relative">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <MicroLabel className="mb-6 block">Contact Division</MicroLabel>
            <h2 className="text-5xl font-black text-industrial-blue mb-8">GET IN <br /> TOUCH</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="text-industrial-blue shrink-0" />
                <div>
                  <MicroLabel className="mb-2 block">Headquarters</MicroLabel>
                  <p className="font-bold text-industrial-black">
                    106A Rotary Club Road, <br />
                    Trans-Amadi Industrial Layout, <br />
                    Port Harcourt, Rivers State, Nigeria
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-industrial-blue shrink-0" />
                <div>
                  <MicroLabel className="mb-2 block">Direct Line</MicroLabel>
                  <p className="font-bold text-industrial-black">09050640425</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="text-industrial-blue shrink-0" />
                <div>
                  <MicroLabel className="mb-2 block">Email Support</MicroLabel>
                  <p className="font-bold text-industrial-black">info@oasispreform.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-industrial-black/5 p-8 md:p-12 border-2 border-industrial-black/10">
            <form className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <MicroLabel>Full Name</MicroLabel>
                <input type="text" className="w-full bg-white border-2 border-industrial-black/10 p-4 font-mono text-sm focus:border-industrial-blue outline-none transition-colors" placeholder="ENTER NAME" />
              </div>
              <div className="space-y-2">
                <MicroLabel>Company</MicroLabel>
                <input type="text" className="w-full bg-white border-2 border-industrial-black/10 p-4 font-mono text-sm focus:border-industrial-blue outline-none transition-colors" placeholder="ENTER COMPANY" />
              </div>
              <div className="space-y-2">
                <MicroLabel>Email Address</MicroLabel>
                <input type="email" className="w-full bg-white border-2 border-industrial-black/10 p-4 font-mono text-sm focus:border-industrial-blue outline-none transition-colors" placeholder="EMAIL@DOMAIN.COM" />
              </div>
              <div className="space-y-2">
                <MicroLabel>Phone Number</MicroLabel>
                <input type="tel" className="w-full bg-white border-2 border-industrial-black/10 p-4 font-mono text-sm focus:border-industrial-blue outline-none transition-colors" placeholder="+234 ..." />
              </div>
              <div className="md:col-span-2 space-y-2">
                <MicroLabel>Technical Requirements</MicroLabel>
                <textarea rows={4} className="w-full bg-white border-2 border-industrial-black/10 p-4 font-mono text-sm focus:border-industrial-blue outline-none transition-colors" placeholder="DESCRIBE SPECIFICATIONS..."></textarea>
              </div>
              <div className="md:col-span-2">
                <Button className="w-full md:w-auto">Transmit Inquiry</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-industrial-black text-white py-16 border-t-4 border-industrial-red">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
          <div className="flex items-center gap-3">
            <div className="h-10 w-1.5 bg-industrial-red" />
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl leading-none tracking-tighter uppercase">Oasis</span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-white/40 uppercase">Preforms Synergy Ltd.</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            <div className="space-y-4">
              <MicroLabel className="text-white/40">Navigation</MicroLabel>
              <ul className="space-y-2 font-mono text-[10px] tracking-widest uppercase">
                <li><Link href="#products" className="hover:text-industrial-red transition-colors">Products</Link></li>
                <li><Link href="#technology" className="hover:text-industrial-red transition-colors">Technology</Link></li>
                <li><Link href="#about" className="hover:text-industrial-red transition-colors">About</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <MicroLabel className="text-white/40">Connect</MicroLabel>
              <ul className="space-y-2 font-mono text-[10px] tracking-widest uppercase">
                <li><Link href="#" className="hover:text-industrial-red transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-industrial-red transition-colors">Instagram</Link></li>
                <li><Link href="#" className="hover:text-industrial-red transition-colors">Twitter</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest text-center md:text-left">
            © 2026 Oasis Preforms Synergy Ltd. | All Rights Reserved.
          </div>
          <div className="flex gap-6 font-mono text-[9px] text-white/20 uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main Page ---

export default function LandingPage() {
  return (
    <main className="min-h-screen selection:bg-industrial-blue selection:text-white">
      <Navbar />
      <Hero />
      <Stats />
      <Products />
      <Technology />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
