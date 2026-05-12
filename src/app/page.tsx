import Link from "next/link";
import { Metadata } from "next";
import {
  Brain, Sparkles, Heart, BookOpen, Shield, Users, ArrowRight,
  Check, Star, Zap, Play, ChevronRight,
} from "lucide-react";
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Brain,    emoji: "🧠",
    title: "AI Emotional Check-ins",
    desc:  "Spark AI detects mood patterns and provides real-time support and regulation strategies tailored to each child.",
    color: "text-brand-600", bg: "bg-brand-50", border: "border-brand-100",
  },
  {
    icon: BookOpen, emoji: "📚",
    title: "Adaptive Learning Pathways",
    desc:  "Lessons that automatically adjust to each child's pace, learning style, and sensory preferences.",
    color: "text-calm-600", bg: "bg-calm-50", border: "border-calm-100",
  },
  {
    icon: Heart,    emoji: "🌿",
    title: "Wellbeing Center",
    desc:  "Breathing exercises, sensory reset tools, and guided meditation designed specifically for neurodiverse minds.",
    color: "text-warm-600", bg: "bg-warm-50", border: "border-warm-100",
  },
  {
    icon: Sparkles, emoji: "🎨",
    title: "Creativity Studio",
    desc:  "Drawing, music, storytelling, and animation tools for safe self-expression and imagination.",
    color: "text-joy-600", bg: "bg-joy-50", border: "border-joy-100",
  },
  {
    icon: Users,    emoji: "👨‍👩‍👧",
    title: "Parent & Teacher Portals",
    desc:  "Real-time insights, mood trends, progress analytics, and direct communication tools.",
    color: "text-brand-600", bg: "bg-brand-50", border: "border-brand-100",
  },
  {
    icon: Shield,   emoji: "🔒",
    title: "COPPA & GDPR Compliant",
    desc:  "Enterprise-grade child data protection with end-to-end encryption and comprehensive audit logging.",
    color: "text-calm-600", bg: "bg-calm-50", border: "border-calm-100",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Parent of 9-year-old with ADHD",
    avatar: "S",
    color: "from-brand-400 to-calm-400",
    text: "DivergentEd transformed our mornings. Alex actually looks forward to learning now. The mood check-ins are incredible — I finally understand what he's feeling.",
    rating: 5,
  },
  {
    name: "Ms. Chen",
    role: "Special Education Teacher",
    avatar: "C",
    color: "from-calm-400 to-brand-400",
    text: "The behavioral insights help me adapt lessons in real-time. I've never had a tool this powerful for my students. It's like having a co-teacher who never sleeps.",
    rating: 5,
  },
  {
    name: "Dr. Patel",
    role: "Child Psychologist",
    avatar: "P",
    color: "from-warm-400 to-joy-400",
    text: "The sensory-safe design is exceptional. My clients feel genuinely safe and understood. This is the platform I've been recommending to every family I work with.",
    rating: 5,
  },
];

const STATS = [
  { value: "50,000+", label: "Learners supported",   emoji: "🧒" },
  { value: "94%",     label: "Improved focus scores", emoji: "🎯" },
  { value: "200+",    label: "Schools onboarded",     emoji: "🏫" },
  { value: "4.9★",    label: "Average rating",        emoji: "⭐" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Create your profile",    desc: "Tell us about your child's needs, learning style, and sensory preferences.",  emoji: "👤" },
  { step: "02", title: "AI personalizes the experience", desc: "Spark AI builds a custom learning pathway and wellbeing plan.",         emoji: "🤖" },
  { step: "03", title: "Learn, create & grow",   desc: "Engage with adaptive lessons, creativity tools, and daily check-ins.",         emoji: "🌱" },
  { step: "04", title: "Track progress together",desc: "Parents and teachers get real-time insights and AI-powered recommendations.",   emoji: "📊" },
];

// ─── Components ───────────────────────────────────────────────────────────────

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-ink-muted hover:text-ink transition-colors duration-150"
    >
      {children}
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 border-b border-surface-border bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-glow-sm">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-ink">DivergentEd</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-7">
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Get started free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-muted via-white to-white pt-20 pb-24 px-4 sm:px-6">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-brand-100/60 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-calm-100/60 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-joy-50/40 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Pill badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-brand-500" />
            AI-Powered · Sensory-Safe · Globally Trusted
            <ChevronRight className="h-3.5 w-3.5 text-brand-400" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-ink leading-[1.1] tracking-tight">
            Learning designed for{" "}
            <span className="gradient-text">every mind</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-ink-muted leading-relaxed">
            The world&apos;s most intelligent platform for children with ASD and ADHD.
            Emotionally safe, beautifully designed, and powered by AI that truly understands neurodiverse learners.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button
                size="xl"
                className="shadow-glow w-full sm:w-auto"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Start free — no credit card
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="secondary"
                size="xl"
                className="w-full sm:w-auto"
                leftIcon={<Play className="h-4 w-4" />}
              >
                Watch demo
              </Button>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-subtle">
            {["14-day free trial", "COPPA & GDPR compliant", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-calm-500" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Dashboard preview ── */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Browser chrome */}
          <div className="rounded-3xl border border-surface-border bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 border-b border-surface-border bg-surface-muted px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-joy-400" />
                <div className="h-3 w-3 rounded-full bg-calm-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="mx-auto max-w-xs rounded-lg bg-surface-subtle px-3 py-1 text-xs text-ink-subtle text-center">
                  divergented.com/dashboard
                </div>
              </div>
            </div>

            {/* Mock dashboard */}
            <div className="bg-surface-muted p-4 sm:p-6">
              {/* Greeting */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="h-5 w-40 rounded-lg bg-ink/10 mb-1.5" />
                  <div className="h-3.5 w-28 rounded-lg bg-ink/6" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-20 rounded-full bg-warm-100 border border-warm-200" />
                  <div className="h-12 w-12 rounded-full bg-gradient-hero shadow-glow-sm" />
                </div>
              </div>

              {/* Stat cards */}
              <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { emoji: "😊", label: "Mood",   value: "Good",   bg: "bg-calm-50",  border: "border-calm-100"  },
                  { emoji: "🔥", label: "Streak", value: "7 days", bg: "bg-warm-50",  border: "border-warm-100"  },
                  { emoji: "⭐", label: "XP",     value: "1,250",  bg: "bg-joy-50",   border: "border-joy-100"   },
                  { emoji: "🎯", label: "Focus",  value: "87%",    bg: "bg-brand-50", border: "border-brand-100" },
                ].map(({ emoji, label, value, bg, border }) => (
                  <div key={label} className={`rounded-2xl border ${border} ${bg} p-3 sm:p-4`}>
                    <div className="text-xl sm:text-2xl mb-1">{emoji}</div>
                    <div className="text-sm sm:text-base font-extrabold text-ink">{value}</div>
                    <div className="text-xs text-ink-subtle">{label}</div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { emoji: "📚", label: "Learn",  bg: "bg-brand-50 border-brand-100"  },
                  { emoji: "🎨", label: "Create", bg: "bg-warm-50 border-warm-100"    },
                  { emoji: "🌿", label: "Calm",   bg: "bg-calm-50 border-calm-100"    },
                  { emoji: "🤖", label: "AI",     bg: "bg-joy-50 border-joy-100"      },
                ].map(({ emoji, label, bg }) => (
                  <div key={label} className={`rounded-xl border ${bg} p-2 sm:p-3 text-center`}>
                    <div className="text-lg sm:text-xl mb-0.5">{emoji}</div>
                    <div className="text-xs font-semibold text-ink-muted">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -left-4 top-1/3 hidden lg:flex items-center gap-2 rounded-2xl border border-surface-border bg-white px-4 py-3 shadow-lg">
            <span className="text-2xl">🧠</span>
            <div>
              <p className="text-xs font-bold text-ink">AI Insight</p>
              <p className="text-2xs text-ink-subtle">Focus peak: 9–11am</p>
            </div>
          </div>
          <div className="absolute -right-4 bottom-1/3 hidden lg:flex items-center gap-2 rounded-2xl border border-surface-border bg-white px-4 py-3 shadow-lg">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-xs font-bold text-ink">Achievement!</p>
              <p className="text-2xs text-ink-subtle">7-Day Streak unlocked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-surface-border bg-white py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
          {STATS.map(({ value, label, emoji }) => (
            <div key={label} className="group">
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">{emoji}</div>
              <p className="text-2xl sm:text-3xl font-extrabold text-brand-600 tracking-tight">{value}</p>
              <p className="text-sm text-ink-subtle mt-0.5 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-surface-muted">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-5">
              <Zap className="h-3.5 w-3.5" /> Everything they need
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Built for neurodiverse learners,<br className="hidden sm:block" /> by experts who care
            </h2>
            <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
              Designed with input from child psychologists, special educators, and families of children with ASD and ADHD.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, emoji, title, desc, color, bg, border }) => (
              <div
                key={title}
                className={`group rounded-2xl border ${border} bg-white p-6 shadow-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${bg} transition-transform duration-200 group-hover:scale-110`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <h3 className="text-base font-bold text-ink mb-2">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Up and running in minutes
            </h2>
            <p className="mt-4 text-lg text-ink-muted">Simple setup, powerful results.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map(({ step, title, desc, emoji }, i) => (
              <div key={step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    className="absolute left-[calc(3rem+0.5rem)] top-6 hidden h-px w-[calc(100%-3rem-0.5rem)] bg-surface-border lg:block"
                    aria-hidden
                  />
                )}
                <div className="flex flex-col items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50">
                    <span className="text-2xl leading-none">{emoji}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-400">{step}</span>
                    <h3 className="mt-1 text-base font-bold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-surface-muted">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Loved by families & educators
            </h2>
            <p className="mt-4 text-lg text-ink-muted">Real stories from real people.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map(({ name, role, avatar, color, text, rating }) => (
              <div
                key={name}
                className="flex flex-col rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-joy-400 text-joy-400" />
                  ))}
                </div>
                {/* Quote */}
                <p className="mb-6 flex-1 text-sm leading-relaxed text-ink-muted">
                  &ldquo;{text}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} text-sm font-bold text-white`}>
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{name}</p>
                    <p className="text-xs text-ink-subtle">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden />
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4" /> Join 50,000+ learners worldwide
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ready to transform learning?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-white/80 sm:text-xl">
            Start your free trial today. No credit card required.
            Cancel anytime.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button
                variant="joy"
                size="xl"
                className="w-full sm:w-auto shadow-glow-joy font-bold"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Start free trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="glass"
                size="xl"
                className="w-full sm:w-auto border-white/25 text-white hover:bg-white/15"
              >
                View pricing
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            {["14-day free trial", "No credit card required", "COPPA compliant", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-white/60" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-surface-border bg-white py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <span className="font-extrabold text-ink">DivergentEd</span>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed">
                AI-powered learning for neurodiverse minds. Safe, calm, and beautifully designed.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {[
                { title: "Product",  links: ["Features", "Pricing", "Demo", "Changelog"] },
                { title: "Company",  links: ["About", "Blog", "Careers", "Contact"]      },
                { title: "Legal",    links: ["Privacy", "Terms", "COPPA", "GDPR"]        },
              ].map(({ title, links }) => (
                <div key={title}>
                  <p className="mb-4 text-xs font-bold uppercase tracking-wider text-ink">{title}</p>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <Link href="#" className="text-sm text-ink-muted hover:text-ink transition-colors">
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between border-t border-surface-border pt-8">
            <p className="text-sm text-ink-subtle">© 2025 DivergentEd. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm text-ink-subtle">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-calm-500" /> COPPA Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-brand-500" /> GDPR Ready
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
