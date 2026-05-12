import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6366f1",
};

export const metadata: Metadata = {
  title: "DivergentEd — AI-Powered Learning for Neurodiverse Minds",
  description: "The world's most intelligent learning platform for children with ASD and ADHD. Emotionally safe, beautifully designed, and powered by AI.",
  keywords: ["ASD", "ADHD", "neurodiverse", "learning", "education", "AI", "children", "special education"],
  authors: [{ name: "DivergentEd Team" }],
  openGraph: {
    title: "DivergentEd — AI-Powered Learning for Neurodiverse Minds",
    description: "Emotionally safe, beautifully designed learning for children with ASD and ADHD.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DivergentEd — AI-Powered Learning for Neurodiverse Minds",
    description: "Emotionally safe, beautifully designed learning for children with ASD and ADHD.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
