import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, SensoryPreferences } from "@/types";

// ─── Auth Store ───────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setLoading: (v: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    { name: "auth-store", partialize: (s) => ({ user: s.user, accessToken: s.accessToken }) }
  )
);

// ─── UI Store ─────────────────────────────────────────────────────────────────

interface UIState {
  sidebarOpen: boolean;
  darkMode: boolean;
  sensoryMode: boolean; // reduces all visual noise
  sensoryPrefs: SensoryPreferences;
  setSidebarOpen: (v: boolean) => void;
  toggleDarkMode: () => void;
  toggleSensoryMode: () => void;
  updateSensoryPrefs: (prefs: Partial<SensoryPreferences>) => void;
}

const defaultSensoryPrefs: SensoryPreferences = {
  reducedMotion: false,
  highContrast:  false,
  largeText:     false,
  soundEnabled:  true,
  colorTheme:    "calm",
  uiIntensity:   "moderate",
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen:  true,
      darkMode:     false,
      sensoryMode:  false,
      sensoryPrefs: defaultSensoryPrefs,
      setSidebarOpen:  (v) => set({ sidebarOpen: v }),
      toggleDarkMode:  () => set((s) => ({ darkMode: !s.darkMode })),
      toggleSensoryMode: () => set((s) => ({ sensoryMode: !s.sensoryMode })),
      updateSensoryPrefs: (prefs) =>
        set((s) => ({ sensoryPrefs: { ...s.sensoryPrefs, ...prefs } })),
    }),
    { name: "ui-store" }
  )
);

// ─── Mood Store ───────────────────────────────────────────────────────────────

interface MoodState {
  todayMood: number | null;
  setTodayMood: (mood: number) => void;
}

export const useMoodStore = create<MoodState>()((set) => ({
  todayMood: null,
  setTodayMood: (mood) => set({ todayMood: mood }),
}));

// ─── Notification Store ───────────────────────────────────────────────────────

interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
}

interface NotificationState {
  notifications: Notification[];
  add: (n: Omit<Notification, "id">) => void;
  remove: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],
  add: (n) =>
    set((s) => ({
      notifications: [...s.notifications, { ...n, id: crypto.randomUUID() }],
    })),
  remove: (id) =>
    set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
}));
