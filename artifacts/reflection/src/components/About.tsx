import { motion } from "framer-motion";
import { Code2, Smartphone, Heart } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-white/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">My Story</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-accent relative flex items-center justify-center">
                {/* Abstract avatar/placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 h-48 bg-white/50 backdrop-blur-md rounded-full border border-white/20 shadow-xl flex items-center justify-center"
                >
                  <Code2 size={64} className="text-primary/60" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-foreground">
                Coding from the palm of my hand
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a high school student who discovered the magic of coding entirely through my smartphone. While most developers have multi-monitor setups, I learned to craft digital experiences using just a tiny screen and a lot of determination.
                </p>
                <p>
                  My journey taught me that constraints breed creativity. I don't just write code; I try to build things that bring a little more peace and utility into the world.
                </p>
                <p>
                  Whether it's creating an AI companion to help you destress or building games that spark joy, my mission is to use technology as a force for good.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Smartphone size={20} />
                  </div>
                  <span className="font-medium text-sm text-foreground">Mobile-First Coder</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Heart size={20} />
                  </div>
                  <span className="font-medium text-sm text-foreground">Wellness Focused</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
