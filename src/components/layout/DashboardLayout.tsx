"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { cn } from "@/lib/utils";

const pageVariants = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { darkMode, sensoryMode, sidebarOpen, setSidebarOpen } = useUIStore();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  return (
    <div
      className={cn("flex h-screen overflow-hidden", darkMode && "dark")}
      data-sensory-safe={sensoryMode}
    >
      <Sidebar />

      {/* Main content */}
      <div className={cn(
        "flex flex-1 flex-col overflow-hidden",
        "transition-all duration-250 ease-smooth",
        // On mobile, add left padding when sidebar is closed to account for toggle button
        "pl-0 md:pl-0"
      )}>
        <TopNav />

        <main
          className={cn(
            "flex-1 overflow-y-auto",
            "bg-surface-muted dark:bg-surface-dark-DEFAULT",
            /*
             * 8pt grid padding contract:
             * mobile:  px-4  (16px) py-6  (24px)
             * sm+:     px-6  (24px) py-8  (32px)
             * lg+:     px-8  (32px) py-8  (32px)
             *
             * max-w-screen-xl on page content keeps lines readable
             * on ultra-wide displays without over-padding the shell.
             */
            "px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-8",
          )}
          id="main-content"
          tabIndex={-1}
        >
          {/* Skip to content link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-semibold"
          >
            Skip to main content
          </a>

          <motion.div
            variants={sensoryMode ? undefined : pageVariants}
            initial="hidden"
            animate="show"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
