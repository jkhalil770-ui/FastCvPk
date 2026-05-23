import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        surface: "#1E293B",
        accent: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
        },
        success: "#10B981",
        warning: "#F59E0B",
        textPrimary: "#F8FAFC",
        textSecondary: "#94A3B8",
        glassEffect: "rgba(255, 255, 255, 0.03)",
        glassBorder: "rgba(255, 255, 255, 0.08)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
export default config;
