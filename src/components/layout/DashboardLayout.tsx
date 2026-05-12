"use client";
import { useUIStore } from "@/store";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { cn } from "@/lib/utils";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { darkMode, sensoryMode } = useUIStore();

  return (
    <div
      className={cn("flex h-screen overflow-hidden", darkMode && "dark")}
      data-sensory-safe={sensoryMode}
    >
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto bg-surface-muted dark:bg-surface-dark-DEFAULT p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
