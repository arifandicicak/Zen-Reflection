import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- PERBAIKAN DI SINI ---
  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Ang Coach", href: "#ang" }, // GANTI dari #zen ke #ang biar sinkron sama ZenCoach.tsx
    { name: "Certificates", href: "#certificates" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Tutup menu dulu buat mobile

    // Pake setTimeout dikit biar menu nutup dulu baru scroll (mencegah glitch di HP)
    setTimeout(() => {
      const id = href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Jarak biar gak ketutupan navbar pas berenti
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${ // Z-index naikin ke 100
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-3 group relative z-[101]"
          >
            <motion.div whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}>
              <img 
                src="/file_0000000071f472069cb82d1e93db1760.png" 
                alt="Reflection Logo" 
                className="w-10 h-10 object-cover rounded-xl shadow-sm border border-[#87EBA0]/30 bg-white"
              />
            </motion.div>

            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#2D4F3F] leading-none">
                Reflection
              </span>
              <span className="text-[10px] font-bold text-[#4CAF50] uppercase tracking-[0.2em] mt-1">
                Ang AI Coach
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-semibold text-gray-600 hover:text-[#4CAF50] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#87EBA0] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="ml-2 px-5 py-2.5 rounded-xl bg-[#4CAF50] text-white text-sm font-bold shadow-lg hover:bg-[#2D4F3F] transition-all active:scale-95"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#2D4F3F] relative z-[101] active:scale-90 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 h-screen bg-white z-[99] flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-2xl font-bold text-[#2D4F3F] hover:text-[#4CAF50] transition-all"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="mt-4 px-10 py-4 rounded-2xl bg-[#4CAF50] text-white text-lg font-bold"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
