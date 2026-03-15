import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d9f2ff",
          200: "#bce9ff",
          300: "#8edaff",
          400: "#59c2ff",
          500: "#2fa4ff",
          600: "#1882f6",
          700: "#1568e2",
          800: "#1855b7",
          900: "#19488f"
        },
        clinic: {
          navy: "#10223d",
          sky: "#e9f6ff",
          mint: "#dff8ef",
          peach: "#fff1e8"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)"
      },
      backgroundImage: {
        hero: "linear-gradient(135deg, rgba(16,34,61,0.98), rgba(24,130,246,0.88))"
      }
    }
  },
  plugins: []
};

export default config;
