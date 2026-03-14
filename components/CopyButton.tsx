"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = "Copy prompt", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150",
        copied
          ? "bg-green-500/10 text-green-400 border border-green-500/20"
          : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 border border-zinc-700",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          {label}
        </>
      )}
    </button>
  );
}
