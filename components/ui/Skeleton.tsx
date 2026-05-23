import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Reusable pulse-skeleton loading state component.
 */
export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`bg-white/5 animate-skeleton rounded ${className}`}
      {...props}
    />
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-10 w-2/3 rounded-lg" />
    </div>
  );
}

export function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="glass-panel p-6 rounded-xl space-y-4">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-16 w-full rounded-lg" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-8 w-20 rounded" />
            <Skeleton className="h-8 w-24 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default Skeleton;
