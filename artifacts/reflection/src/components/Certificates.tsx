import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Award, ExternalLink } from "lucide-react";

const certificates = [
  {
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    year: "2023",
    category: "Web Dev",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Belajar Membuat Aplikasi Front-End Web",
    issuer: "Dicoding Indonesia",
    year: "2024",
    category: "Frontend",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Olimpiade Sains Nasional (OSN) Tingkat Kabupaten",
    issuer: "Puspresnas",
    year: "2023",
    category: "Science",
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Google Digital Garage: Fundamentals of Digital Marketing",
    issuer: "Google",
    year: "2024",
    category: "Marketing",
    color: "bg-emerald-100 text-emerald-700",
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
    <section id="certificates" className="py-24 bg-white/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Certificates & Achievements</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {certificates.map((cert, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 h-full bg-white/70 backdrop-blur-md border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Award size={24} />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${cert.color}`}>
                    {cert.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                  {cert.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4">
                  <span className="font-medium">{cert.issuer}</span>
                  <span>{cert.year}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
