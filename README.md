# DivergentEd 🧠✨

> AI-Powered Neurodiverse Learning & Wellbeing Platform for children, teens, and young adults with ASD and ADHD.

---

## Architecture Overview

```
divergenteducation/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (auth)/                   # Auth pages (login, register, onboarding)
│   │   ├── api/                      # API routes
│   │   │   ├── auth/                 # register, login, refresh, logout
│   │   │   ├── ai/                   # chat (Spark), insights
│   │   │   ├── mood/                 # mood check-ins & history
│   │   │   ├── learning/lessons/     # lesson CRUD
│   │   │   ├── users/me/             # profile management
│   │   │   └── billing/             # Stripe checkout & webhook
│   │   ├── dashboard/
│   │   │   ├── child/               # Child learner dashboard
│   │   │   ├── parent/              # Parent portal
│   │   │   ├── teacher/             # Teacher/therapist portal
│   │   │   └── admin/               # School & super admin
│   │   ├── pricing/                 # Pricing page
│   │   └── page.tsx                 # Landing page
│   ├── components/
│   │   ├── ui/                      # Design system components
│   │   ├── layout/                  # Sidebar, TopNav, DashboardLayout
│   │   └── ai/                      # AICompanion, MoodCheckIn
│   ├── lib/                         # db, auth, utils
│   ├── models/                      # MongoDB schemas
│   ├── store/                       # Zustand stores
│   ├── types/                       # TypeScript types
│   └── middleware.ts                # Route protection
├── public/
│   └── manifest.json                # PWA manifest
├── .env.local                       # Environment variables
├── next.config.ts                   # Next.js config + security headers
└── tailwind.config.ts               # Design system tokens
```

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|------------------------------------------------|
| Frontend    | Next.js 15, TypeScript, Tailwind CSS           |
| Animation   | Framer Motion                                  |
| State       | Zustand + React Query                          |
| UI          | Radix UI primitives + custom design system     |
| Charts      | Recharts                                       |
| Backend     | Next.js API Routes (Server)                    |
| Database    | MongoDB Atlas + Mongoose                       |
| Auth        | JWT (access 15m + refresh 30d, httpOnly cookie)|
| AI          | OpenAI GPT-4o-mini (with fallback responses)   |
| Payments    | Stripe (subscriptions + webhooks)              |
| Media       | Cloudinary                                     |
| PWA         | next-pwa + Web App Manifest                    |

---

## Database Schema

### User
- email, password (bcrypt), name, avatar
- role: child | parent | teacher | school_admin | super_admin
- tenantId → Tenant
- profile: diagnoses, sensoryPreferences, learningStyle
- settings: darkMode, notifications, language
- stats: totalXp, level, streak, focusMinutes
- linkedUsers: parent↔child, teacher↔student

### Tenant (School/Organization)
- name, slug, logo
- subscriptionTier: free | starter | pro | enterprise
- subscriptionStatus: active | trialing | past_due | canceled
- stripeCustomerId, stripeSubscriptionId

### MoodEntry
- userId, tenantId, mood (1-5), label, note, triggers
- aiInsight (AI-generated support message)
- energy, focus scores

### Lesson
- title, type, difficulty, duration, xpReward
- content: array of blocks (text, image, video, quiz, activity)
- tenantId (null = global library)

### LearningProgress
- userId, lessonId, completed, score, timeSpent

### Routine
- userId, name, type, steps[], aiGenerated, schedule

### Achievement
- userId, type, title, icon, xp, unlockedAt

### Message
- senderId, receiverId, tenantId, content, read

---

## User Roles & Access

| Role         | Access                                              |
|--------------|-----------------------------------------------------|
| child        | Own dashboard, learning, wellbeing, AI companion    |
| parent       | Child analytics, mood trends, messaging, routines   |
| teacher      | Classroom monitoring, lesson management, insights   |
| school_admin | All users in tenant, analytics, billing             |
| super_admin  | All tenants, platform analytics, billing            |

---

## AI Features

### Spark AI Companion
- Real-time chat with emotional support
- Quick prompts for common needs (overwhelmed, focus, break)
- OpenAI GPT-4o-mini with sensory-safe fallback responses
- Floating widget on all dashboard pages

### Mood Check-In
- 5-level emoji mood picker
- Optional journaling note
- AI-generated personalized insight
- Stored for trend analysis

### AI Insights (Parent/Teacher)
- Weekly mood trend analysis
- Focus and engagement patterns
- Personalized recommendations
- Behavioral alerts

---

## Authentication Flow

```
Register → Create Tenant → Hash Password → Issue JWT pair
Login    → Verify Password → Issue JWT pair → Set httpOnly cookie
Request  → Bearer token in Authorization header
Refresh  → POST /api/auth/refresh → New access token
Logout   → Clear refreshToken from DB + delete cookie
```

---

## Multi-Tenant Architecture

- Every user belongs to a `Tenant` (school or family)
- All data queries are scoped by `tenantId`
- Lessons can be global (tenantId: null) or school-specific
- Stripe billing is per-tenant
- Custom branding per tenant (Enterprise tier)

---

## Subscription Plans

| Plan       | Price   | Users    | Features                          |
|------------|---------|----------|-----------------------------------|
| Free       | $0      | 1        | Basic dashboard, mood check-ins   |
| Starter    | $9/mo   | 1 child  | + Learning hub, wellbeing center  |
| Pro        | $29/mo  | 5 users  | + Full AI, creativity studio      |
| Enterprise | $79/mo  | Unlimited| + Custom branding, SSO, API       |

---

## Design System

### Color Palette
- **brand** (indigo): Primary actions, navigation
- **calm** (teal): Wellbeing, success states
- **warm** (orange): Streaks, energy, alerts
- **joy** (yellow): XP, achievements, rewards

### Typography
- **Nunito** — dyslexia-friendly, rounded, warm
- Letter-spacing: 0.02em for readability
- Word-spacing: 0.05em for dyslexia support

### Sensory Safety
- `data-sensory-safe="true"` disables all animations
- `prefers-reduced-motion` respected globally
- Adjustable UI intensity: minimal | moderate | full
- High contrast mode available

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.local .env.local
# Fill in all values in .env.local
```

### 3. Seed database (optional)
```bash
npm run seed
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

Set all environment variables in Vercel dashboard.

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables Required
```
MONGODB_URI              # MongoDB Atlas connection string
JWT_SECRET               # Min 32 chars
JWT_REFRESH_SECRET       # Min 32 chars
STRIPE_SECRET_KEY        # Stripe secret key
STRIPE_WEBHOOK_SECRET    # Stripe webhook signing secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
OPENAI_API_KEY           # Optional — fallback responses work without it
RESEND_API_KEY           # For email automation
NEXT_PUBLIC_APP_URL      # Your production URL
```

---

## Security Checklist

- [x] COPPA-compliant architecture
- [x] GDPR data handling
- [x] JWT with short-lived access tokens (15m)
- [x] httpOnly refresh token cookies
- [x] bcrypt password hashing (12 rounds)
- [x] Role-based access control
- [x] Input validation with Zod
- [x] Security headers (CSP, X-Frame-Options, etc.)
- [x] Rate limiting (add via middleware)
- [x] Audit logging (extend Message model)
- [x] Child data protection (no PII in AI prompts)

---

## Accessibility (AAA)

- Focus-visible outlines on all interactive elements
- ARIA labels on all icon buttons
- Semantic HTML throughout
- Dyslexia-friendly typography (Nunito + spacing)
- Reduced motion support
- High contrast mode
- Screen reader compatible
- Keyboard navigation throughout

---

## License

MIT © 2025 DivergentEd
