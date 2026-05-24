import React, { useId } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  isUrdu?: boolean;
}

/**
 * Reusable Floating Label select component supporting custom styling and blue arrow.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, isUrdu = false, className = "", placeholder, ...props }, ref) => {
    const uniqueId = useId();

    return (
      <div className="w-full mb-4">
        <div className="relative">
          <select
            ref={ref}
            id={uniqueId}
            dir={isUrdu ? "rtl" : "ltr"}
            className={`peer w-full rounded-lg bg-surface border appearance-none ${
              error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-blue-500"
            } px-4 py-3 pr-10 text-white text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-blue-500/20 ${
              isUrdu ? "font-urdu text-right leading-loose pr-4 pl-10" : "font-inter text-left"
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-slate-900 text-slate-400">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>

          {/* Custom Blue Dropdown Arrow */}
          <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-blue-500 ${isUrdu ? "left-3" : "right-3"}`}>
            <ChevronDown size={16} strokeWidth={2.5} />
          </div>

          {/* Floating Label */}
          <label
            htmlFor={uniqueId}
            className={`absolute text-xs duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface px-2 ${
              isUrdu
                ? "right-2 left-auto font-urdu text-right text-textSecondary peer-focus:text-blue-400"
                : "left-2 right-auto font-inter text-left text-textSecondary peer-focus:text-blue-400"
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

Select.displayName = "Select";
export default Select;
