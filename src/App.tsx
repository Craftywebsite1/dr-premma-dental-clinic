/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ArrowRight, 
  Star,
  ChevronDown,
  Sparkles,
  Activity,
  Sticker,
  ShieldCheck,
  Sun,
  Scissors
} from "lucide-react";
import { CLINIC_INFO, SERVICES, TESTIMONIALS, BLOG_POSTS, FAQS } from "./constants";
import { SEO } from "./components/SEO";

// Helper for WhatsApp link
const getWhatsAppLink = (text: string) => `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
const getTelLink = () => `tel:${CLINIC_INFO.phone}`;

const iconMap: Record<string, any> = {
  Sparkles,
  Activity,
  Sticker,
  ShieldCheck,
  Sun,
  Scissors
};

// WhatsApp SVG Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.6-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.6-16-14.7-27.4-33-30.4-38.6-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

// Version 1.0.3 - GitHub Pages Subfolder Pathing - Force Update 2026-04-21T12:18Z
// Deployment Sync: Final path verification applied.
export default function App() {
  useEffect(() => {
    console.log("Clinic App Loaded Successfully");
  }, []);
  const [activePage, setActivePage] = useState<"home" | string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasHeroAnimated, setHasHeroAnimated] = useState(false);
  const [hasServicesAnimated, setHasServicesAnimated] = useState(false);
  const [hasAboutAnimated, setHasAboutAnimated] = useState(false);
  const [hasReviewsAnimated, setHasReviewsAnimated] = useState(false);
  const [hasBlogAnimated, setHasBlogAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (activePage !== "home") {
      setActivePage("home");
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const Nav = () => (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => { setActivePage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="w-10 h-10 bg-clinic-primary rounded-xl flex items-center justify-center text-white">
            <Activity size={24} />
          </div>
          <div>
            <span className="block font-display font-bold text-lg leading-none text-slate-800">Dr. Premma</span>
            <span className="block text-xs font-semibold tracking-wider uppercase text-clinic-primary">Dental Clinic</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Services", "About", "Reviews", "Blog", "Contact"].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-slate-600 hover:text-clinic-primary transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
          <a 
            href={getWhatsAppLink(CLINIC_INFO.whatsappMessage)} 
            className="bg-clinic-primary text-white px-5 py-2.5 rounded-full hover:bg-clinic-accent transition-all shadow-md shadow-clinic-primary/20"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 text-lg font-medium">
              {["Services", "About", "Reviews", "Blog", "Contact"].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-slate-600 py-2 border-b border-slate-50"
                >
                  {item}
                </button>
              ))}
              <a 
                href={getWhatsAppLink(CLINIC_INFO.whatsappMessage)} 
                className="bg-clinic-primary text-white text-center py-4 rounded-xl mt-2"
              >
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  const Hero = () => (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden hero-gradient">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={hasHeroAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          onAnimationComplete={() => setHasHeroAnimated(true)}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-clinic-secondary text-clinic-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clinic-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-clinic-primary"></span>
            </span>
            Best Dentist in Virar West
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-slate-900 leading-[1.1] mb-6">
            Your Smile, <br />
            <span className="text-clinic-primary">Our Priority.</span>
          </h1>
          <p className="text-xl text-clinic-muted mb-8 max-w-lg leading-relaxed">
            Advanced and gentle dental care tailored for your family. Experience the perfect blend of technology and compassion at Dr. Premma Kshirsagar's Dental Clinic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={getWhatsAppLink(CLINIC_INFO.whatsappMessage)}
              className="flex items-center justify-center gap-2 bg-clinic-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-clinic-accent transition-all shadow-xl shadow-clinic-primary/20"
            >
              Book Appointment <ArrowRight size={20} />
            </a>
            <a 
              href={getTelLink()}
              onClick={(e) => e.preventDefault()}
              className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-800 px-8 py-4 rounded-full text-lg font-bold hover:border-clinic-primary hover:text-clinic-primary transition-all"
            >
              <Phone size={20} /> Call Now
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={hasHeroAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl z-10 border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop" 
              alt="Dental Clinic Interior" 
              className="w-full h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinic-secondary rounded-full -z-0 blur-3xl opacity-60"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-clinic-accent/20 rounded-full -z-0 blur-3xl opacity-40"></div>
          
          <div className="absolute bottom-10 -right-5 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-slate-50">
            <div className="bg-clinic-secondary p-3 rounded-xl text-clinic-primary">
              <Star fill="currentColor" size={24} />
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">4.9/5 Rating</div>
              <div className="text-sm text-clinic-muted italic">on Google Maps</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  const ServiceSection = () => (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Comprehensive Services</h2>
        <p className="text-clinic-muted max-w-2xl mx-auto text-lg leading-relaxed">
          From routine checkups to advanced restorations, we provide a full range of dental services using state-of-the-art technology.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.id}
              initial={hasServicesAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onAnimationComplete={() => setHasServicesAnimated(true)}
              viewport={{ once: true }}
              transition={{ delay: hasServicesAnimated ? 0 : index * 0.1 }}
              className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-clinic-primary/30 hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-clinic-primary shadow-sm mb-6 group-hover:bg-clinic-primary group-hover:text-white transition-colors">
                <Icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-clinic-primary transition-colors">{service.title}</h3>
              <p className="text-clinic-muted leading-relaxed">{service.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );

  const AboutSection = () => (
    <section id="about" className="py-24 bg-clinic-bg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={hasAboutAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          onAnimationComplete={() => setHasAboutAnimated(true)}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop" 
              alt="Professional Dentist Dr. Premma" 
              className="rounded-[3rem] w-full h-[600px] object-cover shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-4 border-clinic-primary rounded-[3rem]"></div>
          </div>
        </motion.div>
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Expertise You Can Trust</h2>
          <h3 className="text-2xl text-clinic-primary font-semibold mb-6">Meet Dr. Premma Kshirsagar</h3>
          <p className="text-lg text-clinic-muted mb-6 leading-relaxed">
            With years of experience in clinical dentistry, Dr. Premma Kshirsagar has built a reputation for excellence in Virar West. Her philosophy centers on patient comfort and long-term oral health.
          </p>
          <p className="text-lg text-clinic-muted mb-8 leading-relaxed">
            At our clinic, we believe every patient deserves a personalized treatment plan. Whether it's your child's first checkup or a complex smile restoration, we ensure a stress-free environment and crystal-clear communication.
          </p>
          <ul className="space-y-4 mb-10">
            {["International Hygiene Standards", "Latest Equipment & Tech", "Compassionate Patient Care", "Transparent Treatment Costs"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-lg font-medium text-slate-700">
                <div className="w-6 h-6 bg-clinic-primary text-white rounded-full flex items-center justify-center p-1">
                  <ShieldCheck size={16} />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <a 
            href={getWhatsAppLink("Hello Dr. Premma, I would like to know more about your services.")}
            className="inline-flex items-center gap-2 text-clinic-primary font-bold text-lg hover:gap-4 transition-all"
          >
            Learn more about our doctor <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section id="reviews" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Patient Experiences</h2>
          <p className="text-clinic-muted text-lg">Hear what our patients have to say about their journey with us.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="text-center px-4 border-r border-slate-200">
            <div className="text-3xl font-bold">4.9</div>
            <div className="text-xs text-clinic-muted font-bold uppercase tracking-widest">Score</div>
          </div>
          <div className="flex flex-col">
            <div className="flex text-amber-400 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <div className="text-xs text-clinic-muted font-semibold">Based on 150+ Reviews</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((review, index) => (
          <motion.div 
            key={review.id} 
            initial={hasReviewsAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            onAnimationComplete={() => setHasReviewsAnimated(true)}
            viewport={{ once: true }}
            transition={{ delay: hasReviewsAnimated ? 0 : index * 0.1 }}
            className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm flex flex-col"
          >
            <div className="flex text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-300"} />
              ))}
            </div>
            <p className="text-lg italic text-slate-700 mb-8 flex-grow">"{review.text}"</p>
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <div className="font-bold text-slate-900">{review.name}</div>
              <div className="text-sm text-clinic-muted font-medium">{review.date}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );

  const BlogSection = () => (
    <section id="blog" className="py-24 bg-clinic-bg">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Dental Health Insights</h2>
        <p className="text-clinic-muted text-lg max-w-2xl mx-auto">Expert tips and latest trends in oral healthcare to help you maintain a beautiful smile at home.</p>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <motion.div 
            key={post.id} 
            initial={hasBlogAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            onAnimationComplete={() => setHasBlogAnimated(true)}
            viewport={{ once: true }}
            transition={{ delay: hasBlogAnimated ? 0 : index * 0.1 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all cursor-pointer"
            onClick={() => { setActivePage(post.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-clinic-primary uppercase">
                {post.category}
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-xs font-semibold text-clinic-muted mb-4 uppercase tracking-widest">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-clinic-muted rounded-full"></span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-clinic-primary transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-clinic-muted mb-6 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-clinic-primary font-bold group-hover:gap-4 transition-all">
                Read Article <ArrowRight size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );

  const FAQSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-clinic-muted">Got questions? We've got answers. If you don't see your question here, feel free to reach out.</p>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div 
              key={i}
              initial={false}
              className="border border-slate-100 rounded-2xl overflow-hidden"
            >
              <button 
                className="w-full flex items-center justify-between p-6 text-left font-bold text-lg text-slate-800 hover:bg-slate-50 transition-colors"
                onClick={() => {}} // Simple list for now
              >
                {faq.question}
                <ChevronDown size={20} className="text-clinic-primary" />
              </button>
              <div className="px-6 pb-6 text-clinic-muted leading-relaxed">
                {faq.answer}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section id="contact" className="py-24 bg-clinic-bg">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold mb-8">Visit Our Clinic</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-clinic-primary shadow-sm flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <div className="font-bold text-lg mb-1 italic">Location</div>
                <p className="text-clinic-muted text-lg leading-relaxed">{CLINIC_INFO.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-clinic-primary shadow-sm flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <div className="font-bold text-lg mb-1 italic">Phone & WhatsApp</div>
                <p className="text-clinic-muted text-lg font-bold text-slate-800 tracking-tight">{CLINIC_INFO.phoneDisplay}</p>
                <a href={getWhatsAppLink("")} onClick={(e) => e.preventDefault()} className="text-clinic-primary hover:underline font-bold mt-1 inline-block">Click to message us</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-clinic-primary shadow-sm flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <div className="font-bold text-lg mb-1 italic">Opening Hours</div>
                <p className="text-clinic-muted text-lg">{CLINIC_INFO.hours}</p>
                <div className="mt-2 text-sm font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full inline-block">Closed on Sundays</div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-[450px] relative group cursor-pointer" 
             onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_INFO.address)}`, '_blank')}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.341819586043!2d72.8016423!3d19.4623101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9cf733e3877%3A0xe5493b8e7e1f49!2sDr%20Premma%20Kshirsagar%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1713697500000!5m2!1sen!2sin"
            width="100%" 
            height="100%" 
            style={{ border: 0, pointerEvents: 'none' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Clinic Location Map"
          ></iframe>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
             <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-slate-900 font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
               <MapPin size={18} className="text-clinic-primary" /> Click to Locate in Google Maps
             </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-clinic-primary rounded-xl flex items-center justify-center text-white">
              <Activity size={24} />
            </div>
            <div>
              <span className="block font-display font-bold text-lg leading-none">Dr. Premma</span>
              <span className="block text-xs font-semibold tracking-wider uppercase text-clinic-primary">Dental Clinic</span>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed mb-8">
            Providing compassionate and expert dental care to the community of Virar West for several years. Your smile is our greatest achievement.
          </p>
          <div className="flex gap-4">
            <a href={getWhatsAppLink("")} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-clinic-primary transition-colors">
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-clinic-primary transition-colors">
              <Phone size={18} />
            </button>
            <button onClick={() => scrollToSection('contact')} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-clinic-primary transition-colors">
              <MapPin size={18} />
            </button>
          </div>
        </div>
        
        <div className="md:pl-8">
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            {[
              { label: "Home", id: "home" },
              { label: "Services", id: "services" },
              { label: "About Us", id: "about" },
              { label: "Patient Reviews", id: "reviews" },
              { label: "Contact", id: "contact" }
            ].map(item => (
              <li key={item.label}>
                <button 
                  onClick={() => item.id === "home" ? window.scrollTo({ top:0, behavior: "smooth" }) : scrollToSection(item.id)} 
                  className="hover:text-clinic-primary transition-colors cursor-pointer text-sm"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Our Services</h4>
          <ul className="space-y-4 text-slate-400">
            {SERVICES.map(service => (
              <li key={service.id}>
                <button onClick={() => scrollToSection("services")} className="hover:text-clinic-primary transition-colors cursor-pointer text-sm text-left leading-tight">
                  {service.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact Info</h4>
          <ul className="space-y-6 text-slate-400 text-sm">
            <li className="flex gap-3">
              <MapPin size={20} className="text-clinic-primary shrink-0" />
              <span className="leading-relaxed">
                {CLINIC_INFO.address}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={20} className="text-clinic-primary shrink-0" />
              <span className="font-bold text-slate-200">{CLINIC_INFO.phoneDisplay}</span>
            </li>
            <li className="flex gap-3">
              <Clock size={20} className="text-clinic-primary shrink-0" />
              <div>
                <p>Mon - Sat: 5:00 PM - 9:00 PM</p>
                <p className="text-rose-400 text-xs mt-1">Closed on Sundays</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
        <div className="text-center md:text-left">
          <p>© 2026 {CLINIC_INFO.name}. All rights reserved.</p>
          <p className="mt-2 text-xs text-slate-600">
            Developed by <span className="text-slate-400">{CLINIC_INFO.developer}</span> owner of <span className="text-slate-400">{CLINIC_INFO.agency.toLowerCase()}</span>
          </p>
        </div>
        <div className="flex gap-8">
          <button className="hover:text-white transition-colors">Terms of Service</button>
          <button className="hover:text-white transition-colors">Privacy Guide</button>
        </div>
      </div>
    </footer>
  );

  const BlogPostView = ({ postId }: { postId: string }) => {
    const post = BLOG_POSTS.find(p => p.id === postId);
    if (!post) return <div className="pt-40 text-center">Post not found</div>;

    // Content generation for SEO blogs
    const getContent = (id: string) => {
      switch(id) {
        case "signs-visit-dentist":
          return (
            <>
              <h2>1. Persistent Toothache</h2>
              <p>Physical pain is your body's way of telling you something is wrong. A persistent toothache could indicate a cavity, gum disease, or even a dental abscess. If the pain radiates to your jaw or ears, seek professional help immediately.</p>
              <h2>2. Swollen or Bleeding Gums</h2>
              <p>While occasional bleeding from aggressive brushing might happen, consistent bleeding when flossing or brushing is a hallmark sign of gingivitis or periodontitis (gum disease). Healthy gums should never bleed easily.</p>
              <h2>3. Sensitivity to Temperature</h2>
              <p>If hot coffee or cold ice cream makes you wince, you might have exposed roots, worn enamel, or a fractured tooth. Professional fluoride treatments or bonding can often resolve this sensitivity.</p>
              <h2>4. Lingering Bad Breath</h2>
              <p>Halitosis that doesn't go away with mouthwash or brushing is often caused by bacteria living in deep dental pockets or decaying food particles. It's more than a social issue; it's a health indicator.</p>
              <h2>5. Changes in the Mouth's Lining</h2>
              <p>Any white or red patches, lumps, or sores that don't heal within 10-14 days should be examined by a dentist to rule out oral infections or more serious conditions.</p>
              <h2>Conclusion</h2>
              <p>Regular dental check-ups are the best way to catch these issues early. Dr. Premma Kshirsagar's clinic in Virar West specializes in gentle screenings and early intervention for all dental concerns.</p>
            </>
          );
        case "oral-hygiene-home":
          return (
            <>
              <h2>The 2x2 Rule</h2>
              <p>The foundation of oral hygiene is brushing twice a day for at least two minutes each time. Most people rush through this process, missing hard-to-reach areas like the backs of their molars.</p>
              <h2>Don't Skip the Floss</h2>
              <p>Brushing only cleans about 60% of your tooth's surface. The remaining 40% is hidden between teeth, where only floss or interdental brushes can reach. Flossing once a day is non-negotiable for gum health.</p>
              <h2>Tongue Cleaning</h2>
              <p>Bacteria love to hide in the tiny bumps on your tongue. Using a tongue scraper or your toothbrush to clean your tongue every morning reduces bad breath and plaque levels drastically.</p>
              <h2>Mind Your Diet</h2>
              <p>Sugary and acidic foods fuel the bacteria that produce enamel-destroying acid. Try to limit snacking between meals to give your saliva time to neutralize oral pH levels and remineralize your teeth.</p>
              <h2>Stay Hydrated</h2>
              <p>Water is the best beverage for your teeth. It helps wash away food particles and keeps your saliva production high, which is your mouth's natural defense mechanism.</p>
            </>
          );
        case "teeth-whitening-guide":
          return (
            <>
              <h2>Why Do Teeth Discolor?</h2>
              <p>Over time, external factors like coffee, tea, red wine, and smoking stain the outer enamel. Internal factors like aging or certain medications can also cause teeth to appear yellow or gray from within.</p>
              <h2>Professional vs. Over-the-Counter</h2>
              <p>While drugstore whitening strips are tempting, they often contain lower concentrations of active ingredients and may not fit your teeth correctly, leading to gum irritation. Professional whitening at Dr. Premma's clinic offers faster results, safer application, and customized intensity.</p>
              <h2>Is It Safe?</h2>
              <p>Under professional supervision, teeth whitening is perfectly safe. We use protective barriers for your gums and specialized gels that minimize sensitivity while maximizing brightness.</p>
              <h2>Maintaining the Results</h2>
              <p>To keep your smile bright, avoid staining foods for 48 hours after treatment. Regular professional cleanings and good home care can extend your results for up to a year or more.</p>
              <h2>Is It Right for You?</h2>
              <p>Not everyone is a candidate for whitening—for instance, veneers, crowns, and fillings do not whiten. A consultation with Dr. Premma Kshirsagar is the first step to determining the best brightening plan for you.</p>
            </>
          );
        default: return <p>Coming soon...</p>;
      }
    };

    return (
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={() => setActivePage("home")}
            className="flex items-center gap-2 text-clinic-primary font-bold mb-10 hover:gap-4 transition-all"
          >
            <ArrowRight className="rotate-180" size={20} /> Back to Home
          </button>
          
          <div className="inline-block bg-clinic-secondary text-clinic-primary px-3 py-1 rounded-full text-xs font-bold uppercase mb-6 tracking-widest">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{post.title}</h1>
          
          <div className="flex items-center gap-6 mb-12 border-y border-slate-100 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-clinic-secondary rounded-full flex items-center justify-center text-clinic-primary font-bold">
                PK
              </div>
              <div>
                <div className="font-bold text-slate-900">Dr. Premma Kshirsagar</div>
                <div className="text-xs text-clinic-muted uppercase font-bold">Chief Dentist</div>
              </div>
            </div>
            <div className="text-clinic-muted font-medium text-sm">
              {post.date} • {post.readTime}
            </div>
          </div>

          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-[500px] object-cover rounded-[3rem] shadow-xl mb-16"
            referrerPolicy="no-referrer"
          />

          <div className="prose-clinic">
            {getContent(postId)}
          </div>
          
          <div className="mt-20 p-12 bg-clinic-primary/5 rounded-[3rem] border border-clinic-primary/10 text-center">
            <h3 className="text-3xl font-bold mb-4 italic">Experience the Best Dental Care in Virar</h3>
            <p className="text-clinic-muted text-lg mb-8 max-w-xl mx-auto">Don't wait for dental issues to get worse. Book a consultation with Dr. Premma Kshirsagar today and join thousands of happy patients.</p>
            <a 
              href={getWhatsAppLink("")}
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-3 bg-clinic-primary text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-clinic-accent transition-all shadow-xl shadow-clinic-primary/20"
            >
              Book via WhatsApp <WhatsAppIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <SEO />
      <Nav />
      
      <main>
        <AnimatePresence mode="wait">
          {activePage === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <ServiceSection />
              <AboutSection />
              <Testimonials />
              <BlogSection />
              <FAQSection />
              <ContactSection />
            </motion.div>
          ) : (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <BlogPostView postId={activePage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Floating WhatsApp */}
      <a 
        href="#"
        onClick={(e) => e.preventDefault()}
        className="whatsapp-float group"
      >
        <WhatsAppIcon className="w-8 h-8" />
        <span className="absolute right-16 bg-white text-slate-800 px-4 py-2 rounded-xl text-sm font-bold shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none">
          Book Appointment
        </span>
      </a>

    </div>
  );
}
