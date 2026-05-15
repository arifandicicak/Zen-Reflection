import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-10 overflow-hidden bg-white">
      {/* Background Decor - Pointer events none is key! */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-5%] w-72 h-72 rounded-full bg-primary/10 blur-3xl opacity-60"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[-5%] w-96 h-96 rounded-full bg-[#87EBA0]/20 blur-3xl opacity-60"
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        {/* Badge Intro */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0FFF4] border border-[#87EBA0]/30 text-[#2D4F3F] font-bold text-[10px] md:text-xs mb-6 shadow-sm uppercase tracking-wider"
        >
          <Leaf size={14} className="text-[#4CAF50]" />
          <span>Indie Developer & AI Enthusiast</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight text-[#2D4F3F] mb-6 leading-[1.1] px-2"
        >
          Hi, I'm Arifandi
          <span className="block text-[#4CAF50] mt-1">
            Creator of Ang AI
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-[650px] text-sm md:text-xl text-gray-600 mb-10 leading-relaxed px-4"
        >
          Building peaceful digital experiences to help people find their balance. 
          Everything you see here is <span className="font-bold text-[#2D4F3F]">coded entirely from my smartphone</span> in Fakfak, West Papua.
        </motion.p>

        {/* Action Buttons - Fixed sizing for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-[320px] sm:max-w-none sm:w-auto"
        >
          <Button
            size="lg"
            className="rounded-xl px-8 py-6 bg-[#4CAF50] hover:bg-[#2D4F3F] text-white font-bold text-base shadow-lg shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-2"
            onClick={() => scrollToSection("#ang")}
          >
            Meet Ang AI <Sparkles size={18} />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="rounded-xl px-8 py-6 border-2 border-gray-100 hover:border-[#4CAF50] hover:bg-white text-gray-600 hover:text-[#4CAF50] font-bold text-base transition-all flex items-center justify-center gap-2"
            onClick={() => scrollToSection("#projects")}
          >
            See My Work <ArrowRight size={18} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
