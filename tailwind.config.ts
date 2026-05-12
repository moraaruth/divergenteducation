import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand (Indigo) — primary actions, navigation ──
        brand: {
          25:  "#f8f9ff",
          50:  "#f0f4ff",
          100: "#e0eaff",
          200: "#c7d7fe",
          300: "#a5b8fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        // ── Calm (Teal) — wellbeing, success ──
        calm: {
          25:  "#f0fdfb",
          50:  "#f0fdf9",
          100: "#ccfbef",
          200: "#99f6e0",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        // ── Warm (Amber-Orange) — streaks, energy ──
        warm: {
          25:  "#fffbf5",
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        // ── Joy (Yellow) — XP, achievements ──
        joy: {
          25:  "#fffef0",
          50:  "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
        },
        // ── Rose — alerts, important ──
        rose: {
          50:  "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
        },
        // ── Surfaces ──
        surface: {
          DEFAULT: "#ffffff",
          muted:   "#f8fafc",
          subtle:  "#f1f5f9",
          border:  "#e2e8f0",
          "border-strong": "#cbd5e1",
        },
        "surface-dark": {
          DEFAULT: "#0a0f1e",
          muted:   "#111827",
          card:    "#1a2235",
          subtle:  "#1e293b",
          border:  "#2d3748",
          "border-strong": "#374151",
        },
        // ── Text ──
        ink: {
          DEFAULT: "#0f172a",
          muted:   "#475569",
          subtle:  "#94a3b8",
          faint:   "#cbd5e1",
        },
      },

      fontFamily: {
        sans:    ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-nunito)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem",    letterSpacing: "0.02em" }],
        xs:    ["0.75rem",  { lineHeight: "1.125rem", letterSpacing: "0.01em" }],
        sm:    ["0.875rem", { lineHeight: "1.375rem" }],
        base:  ["1rem",     { lineHeight: "1.625rem" }],
        lg:    ["1.125rem", { lineHeight: "1.75rem"  }],
        xl:    ["1.25rem",  { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem",   { lineHeight: "2rem"     }],
        "3xl": ["1.875rem", { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem",  { lineHeight: "2.75rem"  }],
        "5xl": ["3rem",     { lineHeight: "3.5rem"   }],
        "6xl": ["3.75rem",  { lineHeight: "4.25rem"  }],
        "7xl": ["4.5rem",   { lineHeight: "5rem"     }],
      },

      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "13":  "3.25rem",
        "15":  "3.75rem",
        "18":  "4.5rem",
        "22":  "5.5rem",
        "26":  "6.5rem",
        "30":  "7.5rem",
      },

      borderRadius: {
        "xs":  "0.25rem",
        "sm":  "0.375rem",
        DEFAULT: "0.5rem",
        "md":  "0.625rem",
        "lg":  "0.75rem",
        "xl":  "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },

      boxShadow: {
        // Elevation system
        "xs":    "0 1px 2px rgba(0,0,0,0.04)",
        "sm":    "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        DEFAULT: "0 2px 6px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        "md":    "0 4px 12px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)",
        "lg":    "0 8px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)",
        "xl":    "0 16px 40px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.05)",
        "2xl":   "0 24px 64px rgba(0,0,0,0.12), 0 12px 24px rgba(0,0,0,0.06)",
        // Semantic
        "card":  "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05)",
        "soft":  "0 2px 20px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.04)",
        "float": "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        // Glow effects
        "glow":         "0 0 0 1px rgba(99,102,241,0.1), 0 4px 24px rgba(99,102,241,0.15)",
        "glow-sm":      "0 0 0 1px rgba(99,102,241,0.08), 0 2px 12px rgba(99,102,241,0.12)",
        "glow-calm":    "0 0 0 1px rgba(20,184,166,0.1), 0 4px 24px rgba(20,184,166,0.15)",
        "glow-warm":    "0 0 0 1px rgba(249,115,22,0.1), 0 4px 24px rgba(249,115,22,0.12)",
        "glow-joy":     "0 0 0 1px rgba(234,179,8,0.1), 0 4px 24px rgba(234,179,8,0.12)",
        // Inner
        "inner-sm": "inset 0 1px 2px rgba(0,0,0,0.06)",
        "inner":    "inset 0 2px 4px rgba(0,0,0,0.06)",
      },

      backgroundImage: {
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-calm":     "linear-gradient(135deg, #f0f4ff 0%, #f0fdf9 100%)",
        "gradient-warm":     "linear-gradient(135deg, #fff7ed 0%, #fefce8 100%)",
        "gradient-hero":     "linear-gradient(135deg, #6366f1 0%, #14b8a6 100%)",
        "gradient-hero-soft":"linear-gradient(135deg, #818cf8 0%, #2dd4bf 100%)",
        "gradient-dark":     "linear-gradient(135deg, #0a0f1e 0%, #1a2235 100%)",
        "gradient-brand":    "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        "gradient-joy":      "linear-gradient(135deg, #facc15 0%, #fb923c 100%)",
        "gradient-mesh":     "radial-gradient(at 40% 20%, #e0eaff 0px, transparent 50%), radial-gradient(at 80% 0%, #ccfbef 0px, transparent 50%), radial-gradient(at 0% 50%, #f0f4ff 0px, transparent 50%)",
        "shimmer":           "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
      },

      animation: {
        "fade-in":      "fadeIn 0.35s ease-out",
        "fade-up":      "fadeUp 0.4s ease-out",
        "fade-down":    "fadeDown 0.3s ease-out",
        "scale-in":     "scaleIn 0.25s ease-out",
        "slide-in-left":"slideInLeft 0.3s ease-out",
        "slide-in-right":"slideInRight 0.3s ease-out",
        "pulse-soft":   "pulseSoft 3s ease-in-out infinite",
        "float":        "float 6s ease-in-out infinite",
        "float-slow":   "float 9s ease-in-out infinite",
        "shimmer":      "shimmer 2s linear infinite",
        "spin-slow":    "spin 3s linear infinite",
        "bounce-soft":  "bounceSoft 2s ease-in-out infinite",
        "glow-pulse":   "glowPulse 2s ease-in-out infinite",
      },

      keyframes: {
        fadeIn:       { from: { opacity: "0" }, to: { opacity: "1" } },
        fadeUp:       { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeDown:     { from: { opacity: "0", transform: "translateY(-12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scaleIn:      { from: { opacity: "0", transform: "scale(0.96)" }, to: { opacity: "1", transform: "scale(1)" } },
        slideInLeft:  { from: { opacity: "0", transform: "translateX(-16px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        slideInRight: { from: { opacity: "0", transform: "translateX(16px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        pulseSoft:    { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.65" } },
        float:        { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-8px)" } },
        shimmer:      { from: { backgroundPosition: "-200% 0" }, to: { backgroundPosition: "200% 0" } },
        bounceSoft:   { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-4px)" } },
        glowPulse:    { "0%,100%": { boxShadow: "0 0 8px rgba(99,102,241,0.2)" }, "50%": { boxShadow: "0 0 20px rgba(99,102,241,0.4)" } },
      },

      transitionTimingFunction: {
        "spring":  "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth":  "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-in-expo":  "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },

      transitionDuration: {
        "50":  "50ms",
        "150": "150ms",
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },

      screens: {
        "xs": "480px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },

      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [],
};

export default config;
