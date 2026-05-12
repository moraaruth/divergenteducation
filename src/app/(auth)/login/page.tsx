"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setAccessToken } = useAuthStore();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); return; }

      setUser(data.data.user);
      setAccessToken(data.data.accessToken);

      const roleRoutes: Record<string, string> = {
        child:        "/dashboard/child",
        parent:       "/dashboard/parent",
        teacher:      "/dashboard/teacher",
        school_admin: "/dashboard/admin",
        super_admin:  "/dashboard/admin",
      };
      router.push(roleRoutes[data.data.user.role] ?? "/dashboard/child");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero shadow-glow">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">Welcome back!</h1>
          <p className="mt-1.5 text-sm text-ink-muted">Sign in to DivergentEd</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink-muted transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </motion.p>
            )}

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign in
            </Button>

            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-brand-600 hover:underline">
                Forgot password?
              </Link>
              <Link href="/register" className="text-brand-600 hover:underline">
                Create account
              </Link>
            </div>
          </form>
        </Card>

        {/* Demo accounts */}
        <Card className="mt-6 bg-brand-50 border-brand-100" padding="md">
          <p className="mb-3 text-xs font-bold text-brand-700">Try a demo account</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Child",   email: "child@demo.com"   },
              { label: "Parent",  email: "parent@demo.com"  },
              { label: "Teacher", email: "teacher@demo.com" },
              { label: "Admin",   email: "admin@demo.com"   },
            ].map(({ label, email: demoEmail }) => (
              <button
                key={label}
                type="button"
                onClick={() => { setEmail(demoEmail); setPassword("demo1234"); }}
                className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-brand-600 hover:bg-brand-100 transition-colors border border-brand-100"
              >
                {label}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
