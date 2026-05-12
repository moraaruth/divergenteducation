import Link from "next/link";
import { Metadata } from "next";
import { Check, Brain, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing — DivergentEd",
  description: "Simple, transparent pricing for families, schools, and enterprises.",
};

const PLANS = [
  {
    name:        "Starter",
    price:       "$9",
    period:      "/month",
    description: "Perfect for individual families",
    color:       "border-surface-border",
    badge:       null,
    features: [
      "1 child profile",
      "AI mood check-ins",
      "Basic learning hub",
      "Wellbeing center",
      "Parent dashboard",
      "Email support",
    ],
    cta:     "Start free trial",
    plan:    "starter",
    variant: "secondary" as const,
  },
  {
    name:        "Pro",
    price:       "$29",
    period:      "/month",
    description: "For families & small schools",
    color:       "border-brand-500 ring-2 ring-brand-500",
    badge:       "Most Popular",
    features: [
      "Up to 5 child profiles",
      "Full AI companion (Spark)",
      "Adaptive learning pathways",
      "Creativity studio",
      "Teacher portal access",
      "Advanced analytics",
      "Priority support",
      "Custom routines",
    ],
    cta:     "Start free trial",
    plan:    "pro",
    variant: "primary" as const,
  },
  {
    name:        "Enterprise",
    price:       "$79",
    period:      "/month",
    description: "For schools & organizations",
    color:       "border-surface-border",
    badge:       null,
    features: [
      "Unlimited students",
      "Multi-teacher accounts",
      "School admin dashboard",
      "Custom branding",
      "SSO / SAML",
      "API access",
      "Dedicated success manager",
      "SLA guarantee",
      "Audit logging",
      "GDPR data processing agreement",
    ],
    cta:     "Contact sales",
    plan:    "enterprise",
    variant: "calm" as const,
  },
];

const FAQ = [
  { q: "Is there a free trial?",                  a: "Yes! All plans include a 14-day free trial. No credit card required to start." },
  { q: "Is DivergentEd COPPA compliant?",         a: "Absolutely. We are fully COPPA and GDPR compliant with enterprise-grade child data protection." },
  { q: "Can I switch plans anytime?",             a: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately." },
  { q: "Do you offer discounts for nonprofits?",  a: "Yes! We offer 50% discounts for registered nonprofits and public schools. Contact us." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-surface-border bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-ink">DivergentEd</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link href="/register"><Button size="sm">Get started</Button></Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-calm px-4 py-20 text-center sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">
            <Sparkles className="h-4 w-4" /> Simple, transparent pricing
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Invest in every child&apos;s potential
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-muted">
            Start free. Scale as you grow. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map(({ name, price, period, description, color, badge, features, cta, plan, variant }) => (
            <div
              key={name}
              className={`relative rounded-3xl border-2 bg-white p-8 shadow-card ${color}`}
            >
              {badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1.5 text-xs font-bold text-white shadow-glow">
                  {badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-extrabold text-ink">{name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{description}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-5xl font-extrabold tracking-tight text-ink">{price}</span>
                  <span className="mb-1 text-ink-muted">{period}</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-ink-muted">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-calm-100">
                      <Check className="h-3 w-3 text-calm-600" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={plan === "enterprise" ? "/contact" : `/register?plan=${plan}`}>
                <Button variant={variant} size="lg" className="w-full gap-2">
                  {cta} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-muted px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-ink">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-2xl bg-white p-6 shadow-card">
                <h3 className="mb-2 font-bold text-ink">{q}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border bg-white px-4 py-8 text-center sm:px-6">
        <p className="text-sm text-ink-subtle">© 2025 DivergentEd. All rights reserved.</p>
      </footer>
    </div>
  );
}
