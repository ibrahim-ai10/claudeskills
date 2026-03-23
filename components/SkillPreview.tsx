"use client";

import { useState } from "react";

interface SkillPreviewProps {
  demoGif: string;
  name: string;
}

export function SkillPreview({ demoGif, name }: SkillPreviewProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-zinc-800 bg-zinc-900">
          <span className="text-zinc-400 text-sm font-medium">Demo Preview</span>
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-zinc-600 gap-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">Preview unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-zinc-800 bg-zinc-900 flex items-center gap-2">
        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-zinc-400 text-sm font-medium">Demo Preview</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={demoGif}
        alt={`${name} demo`}
        className="w-full object-cover max-h-80"
        onError={() => setFailed(true)}
        loading="lazy"
      />
    </div>
  );
}
