import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, Github, Instagram, Mail, MapPin } from "lucide-react";

// Ikon TikTok Kustom agar seragam dengan Lucide
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out, Arifandi will get back to you soon.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-[#F0FFF4] relative overflow-hidden">
      {/* Dekorasi Background Hijau Mint */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#87EBA0]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D4F3F]">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Have a project in mind or want to collaborate? I'm always open to new opportunities!
          </p>
          <div className="w-20 h-1.5 bg-[#87EBA0] mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-[#1B5E20] mb-4">Contact Information</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Based in Fakfak, Papua Barat. I'm available for remote work and global collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:arifandicicak@gmail.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#4CAF50] shadow-sm border border-[#E8F5E9] group-hover:bg-[#87EBA0] group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-[#2D4F3F]">arifandicicak@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#4CAF50] shadow-sm border border-[#E8F5E9]">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-medium">Fakfak, West Papua, Indonesia</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#2D4F3F] mb-4 uppercase tracking-widest">Connect with me</h4>
              <div className="flex gap-3">
                {[
                  { icon: <Github size={18} />, href: "https://github.com/arifandicicak", label: "Github" },
                  { icon: <Instagram size={18} />, href: "https://www.instagram.com/look.arix?igsh=MWc3Z3lreGl0ZmNpOQ==", label: "Instagram" },
                  { icon: <TikTokIcon size={18} />, href: "https://www.tiktok.com/@jangkrikdevs?_r=1&_t=ZS-96M9kOcedkm", label: "TikTok" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 border border-[#E8F5E9] hover:text-[#4CAF50] hover:border-[#87EBA0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-md border-[#E8F5E9] shadow-xl rounded-[2rem]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#2D4F3F] uppercase ml-1">Name</label>
                    <Input required placeholder="Arifandi" className="rounded-xl border-[#E8F5E9] focus:border-[#87EBA0] focus:ring-[#87EBA0]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#2D4F3F] uppercase ml-1">Email</label>
                    <Input type="email" required placeholder="your@email.com" className="rounded-xl border-[#E8F5E9] focus:border-[#87EBA0] focus:ring-[#87EBA0]" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#2D4F3F] uppercase ml-1">Message</label>
                  <Textarea 
                    required 
                    placeholder="Let's build something amazing together..." 
                    className="min-h-[120px] rounded-2xl border-[#E8F5E9] focus:border-[#87EBA0] focus:ring-[#87EBA0] resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl bg-[#4CAF50] hover:bg-[#2D4F3F] text-white font-bold shadow-lg shadow-green-200 transition-all active:scale-95"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : (
                    <span className="flex items-center gap-2">
                      Send Message <Send size={16} />
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
