"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store";
import { cn } from "@/lib/utils";

const ROLES = [
  { value: "child",        label: "I'm a Learner",   emoji: "🧒", desc: "Ages 5–18, learning & growing"     },
  { value: "parent",       label: "I'm a Parent",    emoji: "👨‍👩‍👧", desc: "Supporting my child's journey"    },
  { value: "teacher",      label: "I'm a Teacher",   emoji: "👩‍🏫", desc: "Educator or therapist"             },
  { value: "school_admin", label: "I'm a School",    emoji: "🏫", desc: "Setting up for my organization"    },
];

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setAccessToken } = useAuthStore();
  const [step, setStep]         = useState<"role" | "details">("role");
  const [role, setRole]         = useState("");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, schoolName: schoolName || undefined }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); return; }

      setUser(data.data.user);
      setAccessToken(data.data.accessToken);
      router.push(`/onboarding?role=${role}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero shadow-glow mb-4">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800">Join DivergentEd</h1>
          <p className="text-slate-500 mt-1">A safe space to learn and grow 🌱</p>
        </div>

        <Card>
          <AnimatePresence mode="wait">
            {step === "role" && (
              <motion.div key="role" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-lg font-bold text-slate-800 mb-4">Who are you? 👋</h2>
                <div className="grid grid-cols-2 gap-3">
                  {ROLES.map(({ value, label, emoji, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRole(value)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all",
                        role === value
                          ? "border-brand-500 bg-brand-50"
                          : "border-surface-border hover:border-brand-200 hover:bg-brand-50/50"
                      )}
                    >
                      <span className="text-3xl">{emoji}</span>
                      <span className="text-sm font-bold text-slate-800">{label}</span>
                      <span className="text-xs text-slate-500">{desc}</span>
                      {role === value && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => setStep("details")}
                  disabled={!role}
                  className="w-full mt-5"
                  size="lg"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {step === "details" && (
              <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep("role")} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <h2 className="text-lg font-bold text-slate-800 mb-4">Create your account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{role === "school_admin" ? "Your name" : "Full name"}</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Johnson" required />
                  </div>
                  {role === "school_admin" && (
                    <div>
                      <Label htmlFor="school">School / Organization name</Label>
                      <Input id="school" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="Sunrise Academy" required />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" minLength={8} required />
                  </div>
                  {error && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
                  )}
                  <Button type="submit" loading={loading} className="w-full" size="lg">
                    Create account 🚀
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
