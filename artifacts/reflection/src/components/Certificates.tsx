import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

const certificates = [
  {
    title: "AI Engineer",
    issuer: "Dicoding Indonesia",
    year: "2026",
    category: "Artificial Intelligence",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "AI Development with Python",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Programming",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Machine Learning Mastery",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Machine Learning",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Deep Learning Fundamentals",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "Deep Learning",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "National Informatics Olympiad (OSN)",
    issuer: "Puspresnas",
    year: "2024",
    category: "Competition",
    color: "bg-amber-100 text-amber-700",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Certificates() {
  return (
    <section id="certificates" className="py-24 bg-gradient-to-b from-[#F0FFF4] to-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D4F3F]">Certificates & Achievements</h2>
          <div className="w-20 h-1.5 bg-[#87EBA0] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {certificates.map((cert, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 h-full bg-white/80 backdrop-blur-sm border border-[#E8F5E9] hover:border-[#87EBA0] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F1F8E9] flex items-center justify-center text-[#2D4F3F] shrink-0 group-hover:bg-[#87EBA0] group-hover:text-white transition-colors duration-300">
                    <Award size={24} />
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${cert.color}`}>
                    {cert.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-[#1B5E20] mb-2 leading-tight">
                  {cert.title}
                </h3>
                
                <div className="text-sm text-gray-500 mt-4 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{cert.issuer}</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{cert.year}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
