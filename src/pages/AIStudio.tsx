import { useState, useRef, useCallback } from "react";
import { Sparkles, Image, MessageCircle, Upload, Send, Download, Loader2, Camera, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import VirtualTryOn from "@/components/ai/VirtualTryOn";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type ChatMsg = { role: "user" | "assistant"; content: string };

const AIStudio = () => {
  const { toast } = useToast();

  // Chatbot state
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Image generator state
  const [genPrompt, setGenPrompt] = useState("");
  const [genImage, setGenImage] = useState<string | null>(null);
  const [genLoading, setGenLoading] = useState(false);
  const [genText, setGenText] = useState("");


  // Stream chat
  const sendChat = useCallback(async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg: ChatMsg = { role: "user", content: chatInput.trim() };
    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);
    setChatInput("");
    setChatLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/ai-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Failed" }));
        throw new Error(err.error || "Chat failed");
      }

      const reader = resp.body?.getReader();
      if (!reader) throw new Error("No stream");
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setChatMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e: any) {
      toast({ title: "Chat Error", description: e.message, variant: "destructive" });
    } finally {
      setChatLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [chatInput, chatMessages, chatLoading, toast]);

  // Generate image
  const generateImage = async () => {
    if (!genPrompt.trim() || genLoading) return;
    setGenLoading(true);
    setGenImage(null);
    setGenText("");
    try {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/ai-generate-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_KEY}` },
        body: JSON.stringify({ prompt: genPrompt }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Failed" }));
        throw new Error(err.error || "Generation failed");
      }
      const data = await resp.json();
      if (data.imageUrl) setGenImage(data.imageUrl);
      if (data.text) setGenText(data.text);
    } catch (e: any) {
      toast({ title: "Generation Error", description: e.message, variant: "destructive" });
    } finally {
      setGenLoading(false);
    }
  };


  return (
    <Layout>
      <section className="py-8 md:py-12 bg-background min-h-screen">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-body tracking-wider uppercase mb-4">
              <Sparkles className="h-3.5 w-3.5" /> Powered by AI
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold">AI Studio</h1>
            <p className="text-muted-foreground font-body mt-2 max-w-lg mx-auto">
              Explore jewelry with AI — try on pieces virtually, generate custom designs, or chat with our assistant.
            </p>
          </motion.div>

          <Tabs defaultValue="tryon" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-12 bg-muted/50 rounded-xl p-1">
              <TabsTrigger value="tryon" className="font-body text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
                <Camera className="h-4 w-4" /> Virtual Try-On
              </TabsTrigger>
              <TabsTrigger value="generate" className="font-body text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
                <Wand2 className="h-4 w-4" /> Design Generator
              </TabsTrigger>
              <TabsTrigger value="chat" className="font-body text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
                <MessageCircle className="h-4 w-4" /> AI Assistant
              </TabsTrigger>
            </TabsList>

            {/* Virtual Try-On */}
            <TabsContent value="tryon" className="mt-8">
              <VirtualTryOn />
            </TabsContent>

            {/* Design Generator */}
            <TabsContent value="generate" className="mt-8">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center">
                  <h3 className="font-display text-xl font-semibold">AI Jewelry Designer</h3>
                  <p className="text-sm text-muted-foreground font-body mt-1">Describe your dream jewelry piece and AI will create a concept design.</p>
                </div>

                <div className="flex gap-3">
                  <Input
                    placeholder="e.g., A rose gold ring with intertwining vines and small diamonds..."
                    value={genPrompt}
                    onChange={(e) => setGenPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && generateImage()}
                    className="font-body flex-1"
                  />
                  <Button onClick={generateImage} disabled={!genPrompt.trim() || genLoading} className="bg-primary text-primary-foreground hover:bg-gold-dark font-body">
                    {genLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Art Deco diamond ring", "Traditional Rajasthani gold necklace", "Modern minimalist platinum earrings", "Kundan bridal set with emeralds"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setGenPrompt(p)}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors font-body"
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {genLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3 py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground font-body">Creating your design...</p>
                    </motion.div>
                  )}
                  {genImage && !genLoading && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                      <div className="rounded-xl overflow-hidden border border-border">
                        <img src={genImage} alt="AI generated jewelry" className="w-full" />
                      </div>
                      {genText && <p className="text-sm text-muted-foreground font-body">{genText}</p>}
                      <div className="flex gap-3">
                        <a href={genImage} download="tanishq-design.png">
                          <Button variant="outline" size="sm" className="font-body gap-2">
                            <Download className="h-4 w-4" /> Download
                          </Button>
                        </a>
                        <Button variant="outline" size="sm" className="font-body" onClick={() => { setGenImage(null); setGenPrompt(""); }}>
                          Generate Another
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TabsContent>

            {/* AI Chatbot */}
            <TabsContent value="chat" className="mt-8">
              <div className="max-w-2xl mx-auto">
                <div className="rounded-xl border border-border overflow-hidden bg-card">
                  {/* Chat messages */}
                  <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center py-12">
                        <MessageCircle className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground font-body">Ask me anything about our jewelry collections, gold rates, diamond certifications, or styling advice.</p>
                        <div className="flex flex-wrap gap-2 justify-center mt-4">
                          {["What's the difference between 22K and 18K gold?", "Suggest bridal jewelry under ₹5 lakhs", "How to check diamond certification?"].map((q) => (
                            <button
                              key={q}
                              onClick={() => { setChatInput(q); }}
                              className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors font-body"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted rounded-bl-md"
                        }`}>
                          {msg.role === "assistant" ? (
                            <div className="prose prose-sm max-w-none text-foreground font-body">
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-sm font-body">{msg.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {chatLoading && chatMessages[chatMessages.length - 1]?.role === "user" && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input */}
                  <div className="border-t border-border p-3 flex gap-2">
                    <Input
                      placeholder="Ask about jewelry, gold rates, styling..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendChat()}
                      className="font-body"
                      disabled={chatLoading}
                    />
                    <Button onClick={sendChat} disabled={!chatInput.trim() || chatLoading} size="icon" className="bg-primary text-primary-foreground hover:bg-gold-dark shrink-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default AIStudio;
