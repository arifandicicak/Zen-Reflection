// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Send, User, Sparkles, Clock, Activity, Coffee, Brain, 
  PenTool, Dumbbell, Users, Palette, MessageSquare, Calendar 
} from "lucide-react";

// Helper buat icon kategori schedule
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "meditation": return <Brain className="w-4 h-4" />;
    case "journaling": return <PenTool className="w-4 h-4" />;
    case "affirmation": return <Sparkles className="w-4 h-4" />;
    case "movement": return <Dumbbell className="w-4 h-4" />;
    case "rest": return <Coffee className="w-4 h-4" />;
    case "social": return <Users className="w-4 h-4" />;
    case "creative": return <Palette className="w-4 h-4" />;
    default: return <Activity className="w-4 h-4" />;
  }
};

export function ZenCoach() {
  // --- STATE ---
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm Ang. I'm here to help you find a moment of peace. How are you feeling today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [concern, setConcern] = useState("");
  const [schedule, setSchedule] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [isPending, setIsPending] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat ke bawah
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isPending]);

  // Load status checklist schedule dari local storage
  useEffect(() => {
    const saved = localStorage.getItem("ang-schedule-checked");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history checklist");
      }
    }
  }, []);

  const saveChecked = (newChecked: Record<string, boolean>) => {
    setCheckedItems(newChecked);
    localStorage.setItem("ang-schedule-checked", JSON.stringify(newChecked));
  };

  // --- HANDLER CHAT (Gemini 3 Power) ---
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isPending) return;

    const userMessage = { role: "user", content: inputValue };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInputValue("");
    setIsPending(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          messages: newMessages
        })
      });

      const data = await res.json();

      if (!res.ok) {
        // Tampilkan error kalau API Key salah atau limit abis
        alert(data.details);
        return;
      }

      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      alert("Connection problem: " + err.message);
    } finally {
      setIsPending(false);
    }
  };

  // --- HANDLER SCHEDULE ---
  const handleGenerateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concern.trim() || isPending) return;

    setIsPending(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "schedule",
          concern: concern
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Failed to generate schedule: ${data.details || data.error}`);
        return;
      }

      setSchedule(data);
      saveChecked({}); // Reset checklist
    } catch (err: any) {
      alert("Failed to connect to AI: " + err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section id="ang" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Meet Zeno</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Your personal AI Ang Coach. Chat for immediate guidance or generate a daily schedule to find balance.
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-muted/50 p-1 rounded-full">
              <TabsTrigger value="chat" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Chat
              </TabsTrigger>
              <TabsTrigger value="schedule" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Schedule
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-0 outline-none">
              <Card className="border-border/50 bg-white/70 backdrop-blur-md shadow-lg overflow-hidden h-[600px] flex flex-col">
                <div className="bg-primary/5 p-4 border-b border-border/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Ang</h3>
                    <p className="text-xs text-muted-foreground">AI Ang Coach</p>
                  </div>
                </div>

                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence initial={false}>
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                      >
                        <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                          msg.role === "user" ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary"
                        }`}>
                          {msg.role === "user" ? <User size={16} /> : <Sparkles size={16} />}
                        </div>
                        <div className={`p-4 rounded-2xl ${
                          msg.role === "user" 
                            ? "bg-foreground text-background rounded-tr-sm" 
                            : "bg-white border border-border/50 shadow-sm rounded-tl-sm text-foreground"
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isPending && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 shrink-0 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                          <Sparkles size={16} />
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-border/50 shadow-sm rounded-tl-sm flex items-center gap-1">
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-primary/40 rounded-full" />
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-primary/60 rounded-full" />
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-primary/80 rounded-full" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-4 bg-white/50 border-t border-border/50">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask Ang anything..."
                      className="rounded-full bg-white border-border/50"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="rounded-full shrink-0 bg-primary text-white"
                      disabled={isPending || !inputValue.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-0 outline-none">
              <Card className="border-border/50 bg-white/70 backdrop-blur-md shadow-lg p-6">
                {!schedule ? (
                  <form onSubmit={handleGenerateSchedule} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        How are you feeling today? Ang will build a schedule for you.
                      </label>
                      <Textarea
                        value={concern}
                        onChange={(e) => setConcern(e.target.value)}
                        placeholder="e.g., Feeling stressed about exams..."
                        className="min-h-[120px] bg-white resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl"
                      disabled={isPending || !concern.trim()}
                    >
                      {isPending ? "Ang is thinking..." : "Generate Ang Schedule"}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-primary/10 text-foreground p-4 rounded-xl text-sm leading-relaxed italic">
                      "{schedule.message}"
                    </div>

                    <div className="space-y-3">
                      {schedule.items?.map((item, idx) => {
                        const id = `item-${idx}`;
                        const isChecked = checkedItems[id] || false;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                              isChecked ? "bg-muted/50 opacity-70" : "bg-white shadow-sm"
                            }`}
                          >
                            <Checkbox 
                              id={id} 
                              checked={isChecked}
                              onCheckedChange={(checked) => saveChecked({ ...checkedItems, [id]: !!checked })}
                            />
                            <div className="flex-1 min-w-0">
                              <label htmlFor={id} className={`block text-sm font-semibold mb-1 cursor-pointer ${isChecked ? "line-through text-muted-foreground" : ""}`}>
                                {item.activity}
                              </label>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time} ({item.duration})</span>
                                <span className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full capitalize">
                                  {getCategoryIcon(item.category)} {item.category}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    <Button variant="outline" onClick={() => setSchedule(null)} className="w-full rounded-xl">Create New Schedule</Button>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
                          
