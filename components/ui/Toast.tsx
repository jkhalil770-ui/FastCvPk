"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextProps {
  toast: (title: string, type?: ToastType, description?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const toast = useCallback(
    (title: string, type: ToastType = "info", description?: string, duration = 3500) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newMessage: ToastMessage = { id, title, description, type };
      
      setMessages((prev) => [...prev, newMessage]);

      // Automatically clear after custom duration
      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast Render Panel */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-300"
          >
            <div className="mt-0.5">
              {msg.type === "success" && <CheckCircle size={18} className="text-success" />}
              {msg.type === "error" && <XCircle size={18} className="text-red-500" />}
              {msg.type === "warning" && <AlertCircle size={18} className="text-warning" />}
              {msg.type === "info" && <Info size={18} className="text-blue-400" />}
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">{msg.title}</h4>
              {msg.description && (
                <p className="text-xs text-textSecondary mt-1 leading-relaxed">{msg.description}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(msg.id)}
              className="text-textSecondary hover:text-white transition-colors"
            >
              <XCircle size={14} className="opacity-50 hover:opacity-100" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
