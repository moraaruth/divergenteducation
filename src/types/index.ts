// ─── User & Auth ────────────────────────────────────────────────────────────

export type UserRole = "child" | "parent" | "teacher" | "school_admin" | "super_admin";

export type SubscriptionTier = "free" | "starter" | "pro" | "enterprise";

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  tenantId: string;
  subscriptionTier: SubscriptionTier;
  profile: UserProfile;
  settings: UserSettings;
  stats?: UserStats;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  dateOfBirth?: string;
  diagnoses?: ("ASD" | "ADHD" | "both" | "other")[];
  sensoryPreferences?: SensoryPreferences;
  learningStyle?: "visual" | "auditory" | "kinesthetic" | "reading";
  communicationLevel?: 1 | 2 | 3; // 1=minimal, 2=moderate, 3=full
  interests?: string[];
  avatarColor?: string;
  pronouns?: string;
}

export interface SensoryPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  soundEnabled: boolean;
  colorTheme: "calm" | "warm" | "cool" | "neutral";
  uiIntensity: "minimal" | "moderate" | "full";
}

export interface UserSettings {
  notifications: boolean;
  emailDigest: boolean;
  language: string;
  timezone: string;
  darkMode: boolean;
}

// ─── Tenant / School ─────────────────────────────────────────────────────────

export interface Tenant {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: "active" | "trialing" | "past_due" | "canceled";
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  settings: TenantSettings;
  createdAt: string;
}

export interface TenantSettings {
  allowedRoles: UserRole[];
  maxUsers: number;
  features: string[];
  customBranding?: { primaryColor: string; logo: string };
}

// ─── Mood & Wellbeing ────────────────────────────────────────────────────────

export type MoodLevel = 1 | 2 | 3 | 4 | 5;
export type MoodLabel = "overwhelmed" | "sad" | "okay" | "good" | "amazing";

export interface MoodEntry {
  _id: string;
  userId: string;
  mood: MoodLevel;
  label: MoodLabel;
  note?: string;
  triggers?: string[];
  aiInsight?: string;
  createdAt: string;
}

export interface WellbeingScore {
  overall: number;
  emotional: number;
  focus: number;
  social: number;
  sleep: number;
}

// ─── Learning ────────────────────────────────────────────────────────────────

export type LessonType = "visual" | "audio" | "interactive" | "story" | "stem" | "life_skills" | "emotional_iq";

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  type: LessonType;
  difficulty: 1 | 2 | 3;
  duration: number; // minutes
  xpReward: number;
  tags: string[];
  content: LessonContent[];
  tenantId?: string;
  createdAt: string;
}

export interface LessonContent {
  type: "text" | "image" | "video" | "audio" | "quiz" | "activity";
  data: Record<string, unknown>;
}

export interface LearningProgress {
  _id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  timeSpent: number;
  completedAt?: string;
}

// ─── Routine ─────────────────────────────────────────────────────────────────

export interface Routine {
  _id: string;
  userId: string;
  name: string;
  type: "morning" | "evening" | "school" | "custom";
  steps: RoutineStep[];
  aiGenerated: boolean;
  active: boolean;
  createdAt: string;
}

export interface RoutineStep {
  id: string;
  title: string;
  duration: number; // minutes
  icon: string;
  completed?: boolean;
  order: number;
}

// ─── Gamification ────────────────────────────────────────────────────────────

export interface Achievement {
  _id: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  unlockedAt: string;
}

export interface UserStats {
  totalXp: number;
  level: number;
  streak: number;
  lessonsCompleted: number;
  badges: string[];
  focusMinutes: number;
}

// ─── AI ──────────────────────────────────────────────────────────────────────

export interface AIRecommendation {
  type: "lesson" | "activity" | "routine" | "sensory" | "focus";
  title: string;
  description: string;
  reason: string;
  priority: "high" | "medium" | "low";
  data?: Record<string, unknown>;
}

export interface AIInsight {
  userId: string;
  period: "daily" | "weekly" | "monthly";
  moodTrend: "improving" | "stable" | "declining";
  focusTrend: "improving" | "stable" | "declining";
  recommendations: AIRecommendation[];
  summary: string;
  generatedAt: string;
}

// ─── Messaging ───────────────────────────────────────────────────────────────

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  userId: string;
  role: UserRole;
  tenantId: string;
  iat: number;
  exp: number;
}
