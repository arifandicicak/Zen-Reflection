import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Mala",
    description: "A calming puzzle game designed to help users destress. Built with mobile-first controls and soothing visuals.",
    tech: ["React", "Framer Motion", "Tailwind"],
    link: "#",
    color: "bg-blue-50",
  },
  {
    title: "Jangkrik AI",
    description: "A personal assistant bot that helps manage schedules and provides coding tips for smartphone development.",
    tech: ["TypeScript", "OpenAI", "Node.js"],
    link: "#",
    color: "bg-emerald-50",
  },
  {
    title: "Reflection",
    description: "The portfolio and Zen Coach platform you are currently exploring. A serene digital space.",
    tech: ["React", "React Query", "Tailwind"],
    link: "#",
    color: "bg-purple-50",
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
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Selected Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Things I've built from my smartphone.
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
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
              <Card className="overflow-hidden bg-white/70 backdrop-blur-md border-border/50 h-full flex flex-col group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className={`h-48 ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                  <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                    <span className="text-4xl font-bold text-foreground/20">{project.title.charAt(0)}</span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full rounded-xl group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    View Project <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
