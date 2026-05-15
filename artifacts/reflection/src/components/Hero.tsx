import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

export function Hero() {
  // Fungsi scroll yang lebih smooth dan presisi
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; // Biar gak ketutup navbar
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
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-16 overflow-hidden bg-white">
      {/* Animated background elements - Ditambah pointer-events-none agar tidak menutupi tombol */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] right-[5%] w-80 h-80 rounded-full bg-[#87EBA0]/20 blur-3xl"
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        {/* Badge Intro */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0FFF4] border border-[#87EBA0]/30 text-[#2D4F3F] font-bold text-xs md:text-sm mb-8 shadow-sm"
        >
          <Leaf size={16} className="text-[#4CAF50]" />
          <span>INDIE DEVELOPER & AI ENTHUSIAST</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight text-[#2D4F3F] mb-6 leading-[1.1]"
        >
          Hi, I'm Arifandi
          <span className="block text-[#4CAF50] mt-2 drop-shadow-sm">
            Creator of Ang AI
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-[700px] text-base md:text-xl text-gray-600 mb-10 leading-relaxed px-4"
        >
          Building peaceful digital experiences to help people find their inner balance. 
          Everything you see here is <span className="font-bold text-[#2D4F3F]">coded entirely from my smartphone</span> in Fakfak, West Papua.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6"
        >
          <Button
            size="lg"
            className="rounded-2xl px-10 py-7 bg-[#4CAF50] hover:bg-[#2D4F3F] text-white font-bold text-lg shadow-xl shadow-green-100 transition-all hover:-translate-y-1 active:scale-95"
            onClick={() => scrollToSection("#ang")} // SINKRON DENGAN ID BARU
            data-testid="button-meet-ang"
          >
            Meet Ang AI <Sparkles className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl px-10 py-7 border-2 border-gray-200 hover:border-[#4CAF50] hover:bg-white text-gray-600 hover:text-[#4CAF50] font-bold text-lg transition-all"
            onClick={() => scrollToSection("#projects")}
            data-testid="button-see-work"
          >
            See My Work <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-gray-300 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
