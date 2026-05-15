import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Gamepad2, Sparkles, Layout } from "lucide-react";

const projects = [
  {
    title: "Mala",
    description: "A 2D action-RPG platformer game. Experience a world built with mobile-first controls and soothing aesthetics.",
    tech: ["GDScript", "C#", "Game Design"],
    link: "https://ariikksss.itch.io/mala",
    color: "bg-[#E8F5E9]",
    icon: <Gamepad2 className="text-[#4CAF50]" size={40} />,
  },
  {
    title: "Jangkrik AI",
    description: "An advanced AI-powered personal assistant and portfolio that helps mobile developers master coding.",
    tech: ["TypeScript", "Gemini AI", "Node.js"],
    link: "https://jangkrik02.vercel.app/",
    color: "bg-[#F1F8E9]",
    icon: <Sparkles className="text-[#87EBA0]" size={40} />,
  },
  {
    title: "Reflection",
    description: "The Ang Coach & Portfolio platform you're exploring. Designed for mental wellness and professional showcasing.",
    tech: ["React", "Framer Motion", "Tailwind"],
    link: "#", // Current site
    color: "bg-white",
    icon: <Layout className="text-gray-400" size={40} />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D4F3F]">Selected Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Innovative digital experiences crafted entirely from a smartphone.
          </p>
          <div className="w-20 h-1.5 bg-[#87EBA0] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border border-[#E8F5E9] h-full flex flex-col group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-[2rem]">
                {/* Project Header/Icon Area */}
                <div className={`h-48 ${project.color} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="z-10 bg-white/50 p-6 rounded-3xl backdrop-blur-sm shadow-sm"
                  >
                    {project.icon}
                  </motion.div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#1B5E20] mb-2">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 bg-[#F1F8E9] text-[#4CAF50] rounded-lg border border-[#E8F5E9]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full h-12 rounded-xl border-[#87EBA0] text-[#2D4F3F] font-bold hover:bg-[#4CAF50] hover:text-white hover:border-[#4CAF50] transition-all duration-300 active:scale-95 shadow-sm"
                    >
                      View Project <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
                      
