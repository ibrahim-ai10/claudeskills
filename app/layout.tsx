import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ClaudeSkills — Claude AI Skills Directory",
    template: "%s | ClaudeSkills",
  },
  description:
    "A curated directory of Claude AI Skills, Prompts, and Integrations to supercharge your workflow. Browse, copy, and use battle-tested prompts for any task.",
  keywords: ["Claude", "AI", "prompts", "skills", "Anthropic", "automation", "productivity"],
  authors: [{ name: "ClaudeSkills" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://claudeskills.com",
    siteName: "ClaudeSkills",
    title: "ClaudeSkills — Claude AI Skills Directory",
    description:
      "Browse 100+ curated Claude AI prompts and skills for productivity, code, writing, research, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClaudeSkills — Claude AI Skills Directory",
    description: "Browse curated Claude AI prompts and skills for any task.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
