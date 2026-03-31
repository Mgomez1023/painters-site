import { useState, useEffect } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  CheckCircle2, 
  Paintbrush, 
  Hammer, 
  Layers, 
  ShieldCheck, 
  Clock, 
  MessageSquare,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  MapPin,
  Mail,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import workPhoto5958 from './WorkPhotos/WorkPhotos/IMG_6036.png';
import workPhoto5959 from './WorkPhotos/WorkPhotos/IMG_5992.png';
import workPhoto5960 from './WorkPhotos/WorkPhotos/IMG_5954.png';
import workPhoto5971 from './WorkPhotos/WorkPhotos/IMG_5975.png';
import workPhoto5976 from './WorkPhotos/WorkPhotos/IMG_5976.png';
import workPhoto5990 from './WorkPhotos/WorkPhotos/IMG_5955.png';
import aboutPhoto6038 from './WorkPhotos/WorkPhotos/IMG_5973.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-3'}`}>
      <div className="section-container">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex flex-col">
              <span className={`text-xl md:text-2xl font-bold tracking-tighter transition-colors duration-500 ${scrolled ? 'text-primary' : 'text-white'}`}>Gomez Painting</span>
              <span className={`text-[9px] md:text-[10px] tracking-[0.3em] font-bold uppercase transition-colors duration-500 ${scrolled ? 'text-primary-light' : 'text-gold-accent'}`}>Painting & Trim</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {['Services', 'Work', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className={`text-[11px] font-bold uppercase tracking-widest transition-colors duration-500 ${scrolled ? 'text-ink hover:text-primary' : 'text-white hover:text-gold-accent'}`}
                >
                  {item}
                </a>
              ))}
            </div>
            <div className={`h-4 w-px transition-colors duration-500 ${scrolled ? 'bg-blue-border' : 'bg-white/20'}`}></div>
            <div className={`flex items-center gap-2 font-bold transition-colors duration-500 ${scrolled ? 'text-ink' : 'text-white'}`}>
              <Phone size={14} className="text-gold-accent" />
              <span className="text-sm tracking-tight">(708) 420-1260</span>
            </div>
            <button className={`${scrolled ? 'btn-gold py-2 px-6 text-[10px]' : 'px-6 py-2 bg-white text-primary font-semibold hover:bg-gold-accent hover:text-white transition-all duration-300 uppercase text-[10px] tracking-widest'}`}>
              Get Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 transition-colors duration-500 ${scrolled ? 'text-ink' : 'text-white'}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-gray shadow-xl overflow-hidden"
          >
            <div className="px-6 py-8 space-y-5">
              {['Services', 'Work', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="block text-lg font-bold text-ink uppercase tracking-tight" 
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-6 border-t border-neutral-gray">
                <div className="flex items-center gap-3 text-ink font-bold mb-6">
                  <Phone size={20} className="text-primary" />
                  <span className="text-lg">(708) 420-1260</span>
                </div>
                <button className="w-full btn-primary">Get Free Quote</button>
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
    <section className="relative h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=1920" 
          alt="Professional painter rolling a wall" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>
      
      <div className="relative z-10 section-container w-full">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gold-accent"></div>
              <span className="text-gold-accent font-bold uppercase tracking-[0.4em] text-[10px]">
                Premium Interior Craftsmanship
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-4 text-balance">
              Chicago Interior Painting <span className="text-gold-accent">Refined.</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-6 leading-relaxed max-w-xl">
              Specializing in high-end interior finishes and detailed trim work for Chicago's most discerning homeowners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-gold">Request a Quote</button>
              <button className="px-8 py-4 border border-white/30 text-white font-semibold hover:bg-white hover:text-primary transition-all duration-300 uppercase text-xs tracking-widest">
                Our Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const QuoteFormSection = () => {
  return (
    <section className="relative -mt-10 z-20 pb-6">
      <div className="section-container">
        <div className="bg-white shadow-2xl p-6 md:p-8 border-t-4 border-gold-accent">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-gold-accent rounded-full"></div>
                <h2 className="text-xl font-bold text-primary">Request a Free Quote</h2>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-5">
                Tell us about your project and we'll get back to you within 24 hours with a detailed estimate.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-wider">
                  <CheckCircle2 size={16} className="text-primary-light" />
                  <span>No-obligation consultation</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-wider">
                  <CheckCircle2 size={16} className="text-primary-light" />
                  <span>Detailed project breakdown</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-wider">
                  <CheckCircle2 size={16} className="text-primary-light" />
                  <span>Fixed price guarantee</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Full Name" className="form-input" required />
                <input type="tel" placeholder="Phone Number" className="form-input" required />
                <input type="email" placeholder="Email Address" className="form-input" required />
                <select className="form-input appearance-none bg-no-repeat bg-[right_1rem_center]" required>
                  <option value="">Project Type</option>
                  <option value="interior">Interior Painting</option>
                  <option value="trim">Trim & Molding</option>
                  <option value="accent">Accent Walls</option>
                  <option value="full">Full Home Refresh</option>
                </select>
                <textarea placeholder="Tell us about your project..." className="form-input md:col-span-2 h-20 resize-none" required></textarea>
                <button type="submit" className="btn-gold md:col-span-2 flex items-center justify-center gap-3 text-[11px]">
                  Send Request <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => {
  const features = [
    { icon: <ShieldCheck size={20} />, title: "Impeccable Prep", desc: "Total protection for your home." },
    { icon: <Clock size={20} />, title: "On-Time Delivery", desc: "We respect your schedule." },
    { icon: <CheckCircle2 size={20} />, title: "Master Finish", desc: "Sharp lines, smooth surfaces." },
    { icon: <MessageSquare size={20} />, title: "Clear Pricing", desc: "No hidden costs or surprises." },
  ];

  return (
    <section className="py-8 bg-blue-bg/30 border-y border-blue-border/50">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="mb-2 text-primary-light transition-transform duration-300 group-hover:scale-110">
                {f.icon}
              </div>
              <h3 className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">{f.title}</h3>
              <p className="text-gray-400 text-[8px] font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { 
      title: "Interior Painting", 
      desc: "Flawless application using premium low-VOC paints for a durable, beautiful finish.",
      img: "https://picsum.photos/seed/interior-paint/800/600"
    },
    { 
      title: "Custom Trim Work", 
      desc: "Expert installation and finishing of crown molding, wainscoting, and baseboards.",
      img: "https://picsum.photos/seed/trim-work/800/600"
    },
    { 
      title: "Accent Walls", 
      desc: "Transformative color and texture that creates a sophisticated focal point in any room.",
      img: "https://picsum.photos/seed/accent-wall/800/600"
    },
    { 
      title: "Detail & Prep", 
      desc: "Meticulous surface preparation, drywall repair, and sanding for a perfect foundation.",
      img: "https://picsum.photos/seed/prep-work/800/600"
    },
  ];

  return (
    <section id="services" className="py-10 bg-blue-bg/40 border-b border-blue-border/30">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-px bg-primary-light"></div>
              <span className="text-primary-light font-bold uppercase tracking-widest text-[9px]">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">Professional finishes for every surface.</h2>
          </div>
          <button className="btn-outline py-2 px-6 text-[10px]">All Services</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-blue-border/50 border border-blue-border/50 overflow-hidden shadow-sm">
          {services.map((s, i) => (
            <div key={i} className="group relative bg-white p-6 lg:p-8 transition-all duration-500 hover:bg-primary">
              <div className="relative z-10">
                <span className="text-primary-light font-bold text-[9px] uppercase tracking-widest mb-3 block transition-colors group-hover:text-gold-accent">0{i + 1}</span>
                <h4 className="text-xl font-bold text-primary mb-2 group-hover:text-white transition-colors">{s.title}</h4>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed group-hover:text-white/70 transition-colors">{s.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-primary-light group-hover:text-gold-accent transition-colors">
                  Learn More <ArrowRight size={14} />
                </a>
              </div>
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <img src={s.img} alt="" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    workPhoto5958,
    workPhoto5959,
    workPhoto5960,
    workPhoto5971,
    workPhoto5976,
    workPhoto5990,
  ];

  return (
    <section id="work" className="py-10 bg-white">
      <div className="section-container">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-4 h-px bg-primary-light"></div>
            <span className="text-primary-light font-bold uppercase tracking-widest text-[9px]">Portfolio</span>
            <div className="w-4 h-px bg-primary-light"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Recent Transformations</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 0.99 }}
              className="aspect-square overflow-hidden bg-gray-100 group relative cursor-pointer"
            >
              <img src={img} alt={`Project ${i+1}`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-90" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const steps = [
    'Fill Out The Form',
    'Set Up A Walkthrough',
    'Sign The Agreement',
    'Get The Job Done',
  ];

  return (
    <section id="about" className="py-10 bg-blue-bg/20 border-y border-blue-border/30">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] overflow-hidden shadow-xl">
            <img 
              src={aboutPhoto6038}
              alt="Professional painter in action" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 w-full h-full border border-gold-accent -z-10 translate-x-2 translate-y-2"></div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-primary-light"></div>
              <span className="text-primary-light font-bold uppercase tracking-widest text-[9px]">Our Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">A simple path from first quote to finished work.</h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Tell us about the project, meet with us for the details, approve the plan, and we handle the rest with a clean professional finish.
            </p>
            <div className="grid grid-cols-1 gap-3.5 mb-8 sm:grid-cols-2 sm:grid-rows-2 sm:grid-flow-col">
              {steps.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-gold-accent text-[10px] font-bold uppercase tracking-widest text-primary-light">
                    {i + 1}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{item}</span>
                </div>
              ))}
            </div>
            <button className="btn-outline py-2 px-8 text-[10px]">Our Process</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-10 bg-blue-bg/40 border-t border-blue-border/30">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-primary-light"></div>
              <span className="text-primary-light font-bold uppercase tracking-widest text-[9px]">Get In Touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Let's discuss your next project.</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Have a specific question or ready to schedule a walkthrough? Send us a message and our team will be in touch shortly.
            </p>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-white shadow-sm border-t-2 border-gold-accent flex items-center justify-center text-primary-light shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Call Us</h4>
                  <p className="text-sm font-bold text-primary">(708) 420-1260</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-white shadow-sm border-t-2 border-gold-accent flex items-center justify-center text-primary-light shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Email Us</h4>
                  <p className="text-sm font-bold text-primary">martin2mvp@yahoo.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-white shadow-sm border-t-2 border-gold-accent flex items-center justify-center text-primary-light shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Service Area</h4>
                  <p className="text-sm font-bold text-primary">Chicago & North Shore Suburbs</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 md:p-7 shadow-lg border-t-4 border-primary">
            <form className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  <input type="text" className="form-input" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <input type="email" className="form-input" required />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Subject</label>
                <input type="text" className="form-input" required />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea className="form-input h-28 resize-none" required></textarea>
              </div>
              <button type="submit" className="w-full btn-gold flex items-center justify-center gap-3 text-[11px]">
                Send Message <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-1">
            <div className="flex flex-col mb-4">
              <span className="text-xl font-bold tracking-tighter">CHICAGO ELITE</span>
              <span className="text-[10px] tracking-[0.3em] text-gold-accent font-bold uppercase">Painting & Trim</span>
            </div>
            <p className="text-white/50 text-[10px] leading-relaxed mb-6 max-w-xs">
              Elevating Chicago interiors through meticulous craftsmanship and professional service since 2012.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/30 hover:text-gold-accent transition-colors"><Instagram size={16} /></a>
              <a href="#" className="text-white/30 hover:text-gold-accent transition-colors"><Facebook size={16} /></a>
              <a href="#" className="text-white/30 hover:text-gold-accent transition-colors"><Linkedin size={16} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4 text-white/30">Services</h4>
            <ul className="space-y-2 text-[9px] font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-gold-accent transition-colors">Interior Painting</a></li>
              <li><a href="#" className="hover:text-gold-accent transition-colors">Custom Trim</a></li>
              <li><a href="#" className="hover:text-gold-accent transition-colors">Accent Walls</a></li>
              <li><a href="#" className="hover:text-gold-accent transition-colors">Cabinetry</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4 text-white/30">Quick Links</h4>
            <ul className="space-y-2 text-[9px] font-bold uppercase tracking-widest">
              <li><a href="#work" className="hover:text-gold-accent transition-colors">Our Work</a></li>
              <li><a href="#about" className="hover:text-gold-accent transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-gold-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gold-accent transition-colors">Get A Quote</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4 text-white/30">Newsletter</h4>
            <p className="text-[9px] text-white/40 mb-3 leading-relaxed">Join for seasonal maintenance tips and project inspiration.</p>
            <div className="flex">
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 px-3 py-2.5 text-[9px] w-full focus:outline-none focus:border-gold-accent text-white" />
              <button className="bg-gold-accent text-white px-3 py-2.5 hover:bg-white hover:text-primary transition-all"><ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] font-bold uppercase tracking-widest text-white/20">
          <p>© 2026 Chicago Elite Painting & Trim. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent-blue selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <QuoteFormSection />
        <TrustSection />
        <Services />
        <Gallery />
        <About />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
