import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isUrdu?: boolean;
}

/**
 * Reusable modal overlay with smooth entry animation and scrolling isolation.
 */
export function Modal({ isOpen, onClose, title, children, isUrdu = false }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur overlay */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal surface */}
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-surface/90 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in zoom-in-95"
        dir={isUrdu ? "rtl" : "ltr"}
      >
        {/* Header container */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
          <h3 className={`text-lg font-bold text-white ${isUrdu ? "font-urdu" : "font-inter"}`}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-textSecondary hover:text-white hover:bg-white/5 transition-colors touch-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal body */}
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}
export default Modal;
