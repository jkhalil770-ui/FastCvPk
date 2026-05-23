"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { AlertTriangle, RotateCw } from "lucide-react";

/**
 * Global application error boundary.
 */
export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global boundary catch:", error);
  }, [error]);

  return (
    <div className="flex-grow w-full bg-[#0F172A] relative flex flex-col justify-center items-center py-20 px-4">
      <div className="absolute top-[25%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md p-8 border-white/10 text-center relative z-10">
        <div className="mx-auto w-12 h-12 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center text-warning mb-6 animate-bounce">
          <AlertTriangle size={22} />
        </div>
        
        <h1 className="text-xl font-bold text-white mb-2">Unexpected Application Crash</h1>
        <p className="text-xs text-textSecondary leading-relaxed mb-6">
          A runtime exception occurred. Don't worry, your progress is secure. Click refresh to recover the terminal workspace.
        </p>

        <div className="flex flex-col gap-2">
          <Button 
            onClick={() => reset()} 
            className="w-full gap-2 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold"
          >
            <RotateCw size={15} />
            Recover Workspace
          </Button>
          <a href="/" className="text-xs text-textSecondary hover:underline pt-2">
            Return to Home
          </a>
        </div>
      </Card>
    </div>
  );
}
