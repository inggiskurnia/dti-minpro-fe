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
        background: "var(--background)",
        foreground: "var(--foreground)",
        eventureMainBg: "#152955",
        eventureMainBg2: "#1d3976",
        eventureBgWhite: "#fbfbfb",
      },
    },
  },
  plugins: [],
} satisfies Config;
