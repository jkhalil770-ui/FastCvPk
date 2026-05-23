import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "success" | "warning" | "secondary";
  className?: string;
}

/**
 * Reusable stylized Glassmorphism status indicator.
 */
export function Badge({ children, variant = "accent", className = "" }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all duration-300";
  
  const variantStyles = {
    accent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    secondary: "bg-white/5 text-textSecondary border-white/10",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
export default Badge;
