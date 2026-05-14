import { motion } from "framer-motion";
import { Smartphone, Sparkles, BookOpen, Trophy, MapPin } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-[#F0FFF4]/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D4F3F]">The Journey of Jangkrik</h2>
            <div className="w-20 h-1.5 bg-[#87EBA0] mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bagian Visual/Avatar */}
            <motion.div

              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
              >
              <div className="aspect-square rounded-[2rem] overflow-hidden bg-[#E8F5E9] relative flex items-center justify-center border-4 border-white shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10" />
    
                {/* FOTO MUKA LO DI SINI */}
                <motion.img
                  src="/codingcamp2026-5bef26bf-f53e-4c1d-96e9-c3008146228f.jpg"
                  alt="Arifandi (Jangkrik)"
                  className="z-10 w-full h-full object-cover rounded-[1.8rem]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  />
                {/* Efek Sparkles biar tetep ada aura AI nya */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4 z-20 bg-[#87EBA0] p-2 rounded-full shadow-lg"
                  >
                  <Sparkles size={24} className="text-white" />
                </motion.div>
              </div>
              {/* Badge Lokasi */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg flex items-center gap-2 border border-[#E8F5E9] z-30">
                <MapPin size={18} className="text-red-400" />
                <span className="text-sm font-bold text-gray-700">SMA N 1 Fakfak</span>
              </div>
            </motion.div>
            
            
            

            {/* Bagian Cerita */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-[#2D4F3F] leading-tight">
                Building a World from a 6-Inch Screen
              </h3>
              
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  Hello! I'm Arifandi, but in the digital world I'm known as <strong>Jangkrik</strong>. My journey didn't start with an expensive gaming PC, but with a smartphone in my school uniform pocket.
                </p>
                <p>
                  I believe that skills don't require a large monitor, they only require a broad will. From coding the indie game &quot;Mala&quot; to breaking into the National Informatics Olympiad (OSN), I've done it all.
                </p>
                <p>
                  Now, my focus is on building a &ldquo;Digital Monk&rdquo;&mdash;an AI system that is not only smart, but also brings peace and helps mental health for fellow teenagers.
                </p>
              </div>

              {/* Stats/Achievements Small Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-3 rounded-xl bg-[#F1F8E9] border border-[#C8E6C9] flex items-center gap-3">
                  <Trophy size={20} className="text-[#4CAF50]" />
                  <span className="text-xs font-semibold text-[#1B5E20]">OSN Participant</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F1F8E9] border border-[#C8E6C9] flex items-center gap-3">
                  <BookOpen size={20} className="text-[#4CAF50]" />
                  <span className="text-xs font-semibold text-[#1B5E20]">Dicoding Certified</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
