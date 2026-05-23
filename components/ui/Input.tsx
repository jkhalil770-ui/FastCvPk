import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isUrdu?: boolean;
}

/**
 * Reusable Floating Label input supporting Urdu/English RTL/LTR toggles.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, isUrdu = false, className = "", placeholder = " ", ...props }, ref) => {
    const uniqueId = useId();

    return (
      <div className="w-full mb-4">
        <div className="relative">
          <input
            ref={ref}
            id={uniqueId}
            placeholder={placeholder}
            dir={isUrdu ? "rtl" : "ltr"}
            className={`peer w-full rounded-lg bg-surface border ${
              error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-blue-500"
            } px-4 py-3 text-white text-sm outline-none transition-all duration-300 placeholder-transparent focus:ring-1 focus:ring-blue-500/20 ${
              isUrdu ? "font-urdu text-right leading-loose" : "font-inter text-left"
            } ${className}`}
            {...props}
          />
          
          {/* Floating Label */}
          <label
            htmlFor={uniqueId}
            className={`absolute text-xs duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 ${
              isUrdu
                ? "right-2 left-auto peer-focus:right-2 peer-placeholder-shown:right-4 font-urdu text-right text-textSecondary peer-focus:text-blue-400"
                : "left-2 right-auto peer-focus:left-2 peer-placeholder-shown:left-4 font-inter text-left text-textSecondary peer-focus:text-blue-400"
            }`}
          >
            {label}
          </label>
        </div>
        
        {error && (
          <p className={`text-xs text-red-400 mt-1 ${isUrdu ? "text-right font-urdu" : "text-left font-inter"}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
