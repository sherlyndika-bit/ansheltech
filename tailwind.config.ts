import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gaming: {
          dark: "#080c14",
          card: "#0f172a",
          border: "#1e293b",
          accent: "#00f0ff",
          purple: "#9d4edd",
          pink: "#ff007f",
          green: "#00ff88",
          yellow: "#ffbe0b",
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 15px -2px rgba(0, 240, 255, 0.4)",
        "neon-purple": "0 0 15px -2px rgba(157, 78, 221, 0.4)",
        "neon-green": "0 0 15px -2px rgba(0, 255, 136, 0.4)",
        "neon-pink": "0 0 15px -2px rgba(255, 0, 127, 0.4)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
