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
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm Ang AI. I'm here to help you find your inner peace. How are you feeling today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [concern, setConcern] = useState("");
  const [schedule, setSchedule] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [isPending, setIsPending] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isPending]);

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
        alert(data.details || "I'm currently resting. Please try again in a moment.");
        return;
      }
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      alert("Connection issue: " + err.message);
    } finally {
      setIsPending(false);
    }
  };

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
        alert(`Failed to create schedule: ${data.details || data.error}`);
        return;
      }
      setSchedule(data);
      saveChecked({});
    } catch (err: any) {
      alert("Failed to connect to AI: " + err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section id="ang" className="py-20 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#2D4F3F]">Meet Ang AI</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm md:text-lg px-2">
            Your personal AI companion for mental wellness. Share your thoughts or generate a mindful daily schedule.
          </p>
          <div className="w-16 h-1.5 bg-[#4CAF50] mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="chat" className="w-full">
            {/* FIXED TAB LIST: h-auto and items-stretch ensures background fits buttons */}
            <TabsList className="grid w-full max-w-[340px] md:max-w-md mx-auto grid-cols-2 mb-10 bg-gray-100 p-1.5 rounded-2xl border border-gray-200/50 h-auto items-stretch">
              <TabsTrigger 
                value="chat" 
                className="rounded-xl py-3 text-xs md:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#4CAF50] data-[state=active]:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Counseling
              </TabsTrigger>
              <TabsTrigger 
                value="schedule" 
                className="rounded-xl py-3 text-xs md:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#4CAF50] data-[state=active]:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" /> Ang Schedule
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-0 outline-none">
              <Card className="border-2 border-gray-100 bg-white shadow-2xl rounded-3xl overflow-hidden h-[550px] md:h-[650px] flex flex-col">
                <div className="bg-[#F0FFF4] p-5 border-b border-border/50 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#4CAF50] text-white flex items-center justify-center shadow-lg shadow-green-100">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D4F3F] text-base md:text-lg leading-tight">Ang AI</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Now</p>
                    </div>
                  </div>
                </div>

                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[#FCFEFC]">
                  <AnimatePresence initial={false}>
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`flex gap-3 max-w-[90%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                      >
                        <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center shadow-sm ${
                          msg.role === "user" ? "bg-gray-100 text-gray-600" : "bg-[#4CAF50] text-white"
                        }`}>
                          {msg.role === "user" ? <User size={16} /> : <Sparkles size={16} />}
                        </div>
                        <div className={`p-3.5 rounded-2xl text-sm md:text-base leading-relaxed ${
                          msg.role === "user" 
                            ? "bg-[#2D4F3F] text-white rounded-tr-none" 
                            : "bg-white border-2 border-gray-100 shadow-sm rounded-tl-none text-[#2D4F3F]"
                        }`}>
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                    {isPending && (
                       <div className="flex gap-3 max-w-[85%]">
                          <div className="w-8 h-8 rounded-lg bg-[#4CAF50] text-white flex items-center justify-center animate-bounce"><Sparkles size={16} /></div>
                          <div className="p-3.5 rounded-2xl bg-white border-2 border-gray-50 text-gray-400 italic text-xs">Ang is typing...</div>
                       </div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-4 bg-white border-t border-border/50">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type a message..."
                      className="rounded-xl bg-gray-50 border-none h-12 px-4 focus-visible:ring-[#4CAF50]"
                    />
                    <Button 
                      type="submit" 
                      className="rounded-xl h-12 w-12 shrink-0 bg-[#4CAF50] hover:bg-[#2D4F3F] text-white shadow-lg transition-transform active:scale-90"
                      disabled={isPending || !inputValue.trim()}
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-0 outline-none">
              <Card className="border-2 border-gray-100 bg-white shadow-2xl p-6 md:p-8 rounded-3xl min-h-[500px]">
                {!schedule ? (
                  <form onSubmit={handleGenerateSchedule} className="space-y-6">
                    <div>
                      <label className="block text-sm md:text-base font-bold text-[#2D4F3F] mb-3 text-center">
                        Need help designing a peaceful day?
                      </label>
                      <Textarea
                        value={concern}
                        onChange={(e) => setConcern(e.target.value)}
                        placeholder="e.g., I'm feeling stressed about school..."
                        className="min-h-[120px] md:min-h-[150px] bg-gray-50 border-none rounded-xl p-4 focus-visible:ring-[#4CAF50] text-sm"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#4CAF50] hover:bg-[#2D4F3F] text-white h-12 rounded-xl font-bold text-base shadow-xl shadow-green-100 transition-all active:scale-95"
                      disabled={isPending || !concern.trim()}
                    >
                      {isPending ? "Generating..." : "Get Ang Schedule"}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-[#F0FFF4] text-[#2D4F3F] p-4 rounded-xl text-xs md:text-sm leading-relaxed italic border-l-4 border-[#4CAF50]">
                      "{schedule.message}"
                    </div>
                    <div className="space-y-3">
                      {schedule.items?.map((item, idx) => {
                        const id = `item-${idx}`;
                        const isChecked = checkedItems[id] || false;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${
                              isChecked ? "bg-gray-50 border-gray-100 opacity-60" : "bg-white border-gray-100 shadow-sm"
                            }`}
                          >
                            <Checkbox 
                              id={id} 
                              checked={isChecked}
                              onCheckedChange={(checked) => saveChecked({ ...checkedItems, [id]: !!checked })}
                              className="mt-1 border-2 border-[#4CAF50]"
                            />
                            <div className="flex-1">
                              <label htmlFor={id} className={`block text-sm font-bold mb-0.5 ${isChecked ? "line-through text-gray-400" : "text-[#2D4F3F]"}`}>
                                {item.activity}
                              </label>
                              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-[#4CAF50] mb-1">
                                <span className="flex items-center gap-1 uppercase tracking-tight tracking-widest"><Clock className="w-2.5 h-2.5" /> {item.time}</span>
                              </div>
                              <p className="text-[10px] text-gray-500 leading-normal">{item.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    <Button variant="outline" onClick={() => setSchedule(null)} className="w-full h-11 rounded-xl border-2 font-bold hover:bg-gray-50 text-sm">Create New</Button>
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
