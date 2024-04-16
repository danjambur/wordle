import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // not the best naming convention, but for this example it's fine
        correct: "#538D4E",
        miss: "#BEA11F",
        absent: "#3A3A3C",
      },
    },
  },
  plugins: [require("tailwindcss-react-aria-components")],
} satisfies Config;
