import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { cn } from "../lib/utils";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: "user" | "bot";
  content: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Oi tudo bem, me chamo Irae, sou a assistente de comunicação da campanha, como posso ajudar voce nesse contato?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }]
          })),
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: "Seu nome é Irae e você é a assistente de comunicação da campanha 'Bumbá Patrimônio Vivo'. Sua missão é ajudar usuários a navegar pelo site, fornecer informações sobre o Boi-Bumbá de Parintins (Garantido e Caprichoso) e engajá-los na petição pública para o reconhecimento oficial como Patrimônio Imaterial da Humanidade. O tom deve ser respeitoso, culturalmente sensível, porém argumentativo e firme sobre a importância deste título mundial para a Amazônia. Responda em Português do Brasil.",
        }
      });

      const botReply = response.text || "Desculpe, não consegui processar sua solicitação agora.";
      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      console.error("ChatBot error:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "Houve um erro técnico. Por favor, tente novamente mais tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-heritage-cream border border-heritage-ink/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-heritage-ink p-4 flex justify-between items-center text-heritage-cream">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-serif italic font-bold tracking-tight">Irae - Comunicação</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 transition-transform duration-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex gap-2 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === "user" ? "bg-heritage-blue text-white" : "bg-heritage-red text-white"
                  )}>
                    {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-heritage-ink text-heritage-cream rounded-tr-none" 
                      : "bg-white border border-heritage-ink/5 rounded-tl-none shadow-sm"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 mr-auto">
                  <div className="w-8 h-8 rounded-full bg-heritage-red text-white flex items-center justify-center">
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                  <div className="bg-white border border-heritage-ink/5 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <span className="flex gap-1">
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-4 border-t border-heritage-ink/5 bg-white"
            >
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre as tradições..."
                  className="w-full bg-heritage-cream/50 border-none rounded-full px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-heritage-ink outline-none"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1 w-8 h-8 rounded-full bg-heritage-ink text-heritage-cream flex items-center justify-center hover:bg-heritage-red transition-colors disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-heritage-ink text-heritage-cream rounded-full shadow-2xl flex items-center justify-center hover:bg-heritage-red transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};
