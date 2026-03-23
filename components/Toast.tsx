"use client";

import { useContext } from "react";
import { Check, X } from "lucide-react";
import { ToastContext, useToastState, type Toast } from "@/hooks/useToast";

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-green-500 text-white text-sm font-medium"
    >
      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        <Check className="w-3 h-3" strokeWidth={3} />
      </span>
      <span className="flex-1 min-w-0 truncate">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function ToastContainer() {
  const ctx = useContext(ToastContext);
  if (!ctx || ctx.toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-72 pointer-events-none">
      {ctx.toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onDismiss={ctx.dismissToast} />
        </div>
      ))}
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const value = useToastState();

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}
