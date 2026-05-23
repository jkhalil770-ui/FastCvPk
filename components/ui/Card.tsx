import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverGlow?: boolean;
  className?: string;
}

/**
 * Reusable dark glassmorphism Card container.
 */
export function Card({
  children,
  hoverGlow = true,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`${
        hoverGlow ? "glass-card" : "glass-panel"
      } rounded-xl p-6 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 pb-4 border-b border-white/5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`text-textSecondary text-sm ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-4 pt-4 border-t border-white/5 flex items-center justify-end gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
}
export default Card;
