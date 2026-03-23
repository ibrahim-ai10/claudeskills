"use client";

import { useState, useRef, useEffect } from "react";

interface ShareButtonProps {
  skillId: string;
  skillName: string;
  /** Render a compact icon-only button (for use on skill cards) */
  compact?: boolean;
  className?: string;
}

export function ShareButton({
  skillId,
  skillName,
  compact = false,
  className = "",
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const shareUrl = `https://claudeskills.com/skills/${skillId}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${skillName} from claudeskills `);

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=claude,skills`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const el = document.createElement("textarea");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setOpen(false);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        title="Share this skill"
        aria-label="Share this skill"
        className={
          compact
            ? "flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 hover:border-zinc-600 text-zinc-400 hover:text-zinc-200 transition-all"
            : "flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white transition-all text-sm font-medium"
        }
      >
        {/* Share2 icon (two nodes + lines) */}
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        {!compact && <span>Share</span>}
      </button>

      {/* Copy confirmation toast */}
      {copied && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-green-950 border border-green-800 text-green-400 text-xs whitespace-nowrap z-50 shadow-lg pointer-events-none">
          ✓ Link copied!
        </div>
      )}

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl z-50 overflow-hidden animate-fade-in">
          <a
            href={twitterHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            {/* X / Twitter logo */}
            <svg className="w-4 h-4 text-sky-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.263 5.633 5.901-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
          </a>

          <a
            href={linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors border-t border-zinc-800"
          >
            {/* LinkedIn logo */}
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Share on LinkedIn
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors border-t border-zinc-800 w-full text-left"
          >
            {/* Copy icon */}
            <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Copy link
          </button>
        </div>
      )}
    </div>
  );
}
