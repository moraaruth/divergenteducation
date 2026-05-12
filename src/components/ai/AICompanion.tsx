"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Sparkles, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Message {
  id:        string;
  role:      "user" | "assistant";
  content:   string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  { label: "I'm overwhelmed 😰", value: "I'm feeling overwhelmed 😰" },
  { label: "Help me focus 🎯",   value: "Help me focus 🎯"           },
  { label: "I need a break 🌿",  value: "I need a break 🌿"          },
  { label: "What to learn? 📚",  value: "What should I learn today? 📚" },
];

const INITIAL_MESSAGE: Message = {
  id:        "init",
  role:      "assistant",
  content:   "Hi! I'm Spark, your AI learning companion! 🌟 How are you feeling today?",
  timestamp: new Date(),
};

export function AICompanion() {
  const [open,      setOpen]      = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input,     setInput]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [messages,  setMessages]  = useState<Message[]>([INITIAL_MESSAGE]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!minimized) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, minimized]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, minimized]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res  = await fetch("/api/ai/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message: content }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", content: data.reply ?? "Let me think about that... 🌟", timestamp: new Date() },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", content: "Oops! I had a little hiccup. Try again? 🌈", timestamp: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-hero shadow-glow text-white"
            aria-label="Open Spark AI companion"
          >
            <Sparkles className="h-6 w-6" />
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-brand-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-3xl bg-white border border-surface-border shadow-float dark:bg-surface-dark-card dark:border-surface-dark-border overflow-hidden"
            role="dialog"
            aria-label="Spark AI companion"
            aria-modal="true"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 bg-gradient-hero px-4 py-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-none">Spark AI</p>
                <p className="text-xs text-white/70 mt-0.5">Your learning companion</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors"
                  aria-label={minimized ? "Expand" : "Minimize"}
                >
                  {minimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {/* Messages */}
                  <div
                    className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-hide"
                    role="log"
                    aria-live="polite"
                    aria-label="Conversation"
                  >
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                      >
                        {msg.role === "assistant" && (
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-hero mr-2 mt-0.5">
                            <Sparkles className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                            msg.role === "user"
                              ? "bg-brand-500 text-white rounded-br-sm"
                              : "bg-surface-subtle text-ink rounded-bl-sm dark:bg-surface-dark-subtle dark:text-slate-200"
                          )}
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-hero mr-2">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-surface-subtle dark:bg-surface-dark-subtle rounded-2xl rounded-bl-sm px-4 py-3">
                          <div className="flex gap-1 items-center">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="h-1.5 w-1.5 rounded-full bg-ink-subtle"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  {/* Quick prompts */}
                  <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                    {QUICK_PROMPTS.map(({ label, value }) => (
                      <button
                        key={label}
                        onClick={() => sendMessage(value)}
                        disabled={loading}
                        className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 hover:bg-brand-100 transition-colors disabled:opacity-50 dark:bg-brand-950/30 dark:border-brand-800 dark:text-brand-300"
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2 p-3 pt-1 border-t border-surface-border dark:border-surface-dark-border">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                      placeholder="Type a message..."
                      className="flex-1 h-9 text-sm"
                      aria-label="Message input"
                    />
                    <Button
                      size="icon-sm"
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      aria-label="Send message"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
