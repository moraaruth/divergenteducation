import Link from "next/link";
import { Metadata } from "next";
import { Brain, Sparkles, Heart, BookOpen, Shield, Users, ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "DivergentEd — AI-Powered Learning for Neurodiverse Minds",
  description: "The world's most intelligent learning platform for children with ASD and ADHD. Emotionally safe, beautifully designed, and powered by AI.",
  openGraph: {
    title: "DivergentEd — AI-Powered Learning for Neurodiverse Minds",
    description: "Emotionally safe, beautifully designed learning for children with ASD and ADHD.",
    type: "website",
  },
};

const FEATURES = [
  { icon: Brain,    title: "AI Emotional Check-ins",       desc: "Spark AI detects mood patterns and provides real-time support and regulation strategies.",          color: "bg-brand-100 text-brand-600"  },
  { icon: BookOpen, title: "Adaptive Learning Pathways",   desc: "Lessons that adjust to each child's pace, learning style, and sensory preferences automatically.", color: "bg-calm-100 text-calm-600"    },
  { icon: Heart,    title: "Wellbeing Center",             desc: "Breathing exercises, sensory reset tools, and guided meditation designed for neurodiverse minds.",  color: "bg-warm-100 text-warm-600"    },
  { icon: Sparkles, title: "Creativity Studio",            desc: "Drawing, music, storytelling, and animation tools for safe self-expression and imagination.",       color: "bg-joy-100 text-joy-600"      },
  { icon: Users,    title: "Parent & Teacher Portals",     desc: "Real-time insights, mood trends, progress analytics, and direct communication tools.",             color: "bg-brand-100 text-brand-600"  },
  { icon: Shield,   title: "COPPA & GDPR Compliant",       desc: "Enterprise-grade child data protection with end-to-end encryption and audit logging.",             color: "bg-calm-100 text-calm-600"    },
];

const TESTIMONIALS = [
  { name: "Sarah M.", role: "Parent of 9-year-old with ADHD",  text: "DivergentEd transformed our mornings. Alex actually looks forward to learning now. The mood check-ins are incredible.",  rating: 5 },
  { name: "Ms. Chen", role: "Special Education Teacher",        text: "The behavioral insights help me adapt lessons in real-time. I've never had a tool this powerful for my students.",       rating: 5 },
  { name: "Dr. Patel", role: "Child Psychologist",              text: "The sensory-safe design is exceptional. My clients feel genuinely safe and understood using this platform.",              rating: 5 },
];

const STATS = [
  { value: "50,000+", label: "Learners supported"   },
  { value: "94%",     label: "Improved focus scores" },
  { value: "200+",    label: "Schools onboarded"     },
  { value: "4.9★",    label: "Average rating"        },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark-DEFAULT">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-surface-border bg-white/80 backdrop-blur-sm dark:bg-surface-dark-DEFAULT/80 dark:border-surface-dark-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-slate-800 dark:text-white">DivergentEd</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link href="/features" className="hover:text-brand-600 transition-colors">Features</Link>
            <Link href="/pricing"  className="hover:text-brand-600 transition-colors">Pricing</Link>
            <Link href="/about"    className="hover:text-brand-600 transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get started free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-calm py-24 px-6">
        {/* Background blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-calm-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">
            <Sparkles className="h-4 w-4" />
            AI-Powered · Sensory-Safe · Globally Trusted
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Learning designed for{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              every mind
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600 leading-relaxed">
            The world&apos;s most intelligent platform for children with ASD and ADHD.
            Emotionally safe, beautifully designed, and powered by AI that truly understands neurodiverse learners.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="xl" className="gap-3 shadow-glow">
                Start free — no credit card <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="xl">
                Watch demo 🎬
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-500">14-day free trial · COPPA & GDPR compliant · Cancel anytime</p>
        </div>

        {/* Hero dashboard preview */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-3xl border border-surface-border bg-white shadow-soft overflow-hidden">
            <div className="flex items-center gap-2 border-b border-surface-border bg-surface-muted px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-slate-400">divergented.com/dashboard</span>
            </div>
            <div className="grid grid-cols-4 gap-4 p-6 bg-surface-muted">
              {[
                { emoji: "😊", label: "Mood", value: "Good",   color: "bg-green-100"  },
                { emoji: "🔥", label: "Streak", value: "7 days", color: "bg-warm-100"   },
                { emoji: "⭐", label: "XP",    value: "1,250",  color: "bg-joy-100"    },
                { emoji: "🎯", label: "Focus", value: "87%",    color: "bg-brand-100"  },
              ].map(({ emoji, label, value, color }) => (
                <div key={label} className={`rounded-2xl ${color} p-4 text-center`}>
                  <div className="text-2xl mb-1">{emoji}</div>
                  <div className="text-lg font-extrabold text-slate-800">{value}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-surface-border bg-white py-12 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-brand-600">{value}</p>
              <p className="text-sm text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-surface-muted">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900">Everything a neurodiverse learner needs</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Built with input from child psychologists, special educators, and families of children with ASD and ADHD.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-card hover:shadow-soft transition-shadow">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900">Loved by families & educators</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map(({ name, role, text, rating }) => (
              <div key={name} className="rounded-2xl bg-surface-muted p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-joy-400 text-joy-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div>
                  <p className="font-bold text-slate-800">{name}</p>
                  <p className="text-sm text-slate-500">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-hero">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to transform learning?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Join 50,000+ learners and 200+ schools already using DivergentEd.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button variant="joy" size="xl" className="gap-2">
                Start free trial <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                View pricing
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/70">
            {["14-day free trial", "No credit card required", "COPPA compliant", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border bg-white py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span className="font-extrabold text-slate-800">DivergentEd</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-slate-800">Privacy</Link>
            <Link href="/terms"   className="hover:text-slate-800">Terms</Link>
            <Link href="/contact" className="hover:text-slate-800">Contact</Link>
          </div>
          <p className="text-sm text-slate-400">© 2025 DivergentEd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
