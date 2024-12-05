import type { Config } from "tailwindcss";
const { fontFamily, colors } = require("tailwindcss/defaultTheme");


const tailwindColors = [
  "red", "yellow", "green", "blue", "indigo", "purple", "pink", "gray", "white", "black", "slate", "zinc", "neutral", "stone", "orange", "amber", "lime", "emerald", "teal", "cyan", "sky", "violet", "fuchsia", "rose"
];

const tailwindShades = [
  100, 200, 300, 400, 500, 600, 700, 800, 900
];

const safelist = tailwindColors.flatMap(color => 
  tailwindShades.map(shade => `bg-${color}-${shade}`)
);

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        "vsm": "500px"
      },
      backgroundImage: {
        "fade-right": "linear-gradient(to right, rgb(225, 225, 225) 100%, rgb(225, 225, 225))",
        "fade-left": "linear-gradient(to left, rgba(225, 225, 225, 1), rgba(225, 225, 225, 0))"
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2563EB",
          foreground: "hsl(var(--primary-foreground))",
          "100": "#E0EAFD",
          "200": "#B3CFFA",
          "300": "#80B4F7",
          "400": "#4D99F4",
          "500": "#2563EB",
          "600": "#1D4ED8",
          "700": "#1E40AF",
          "800": "#1C3686",
          "900": "#152E5A",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        cinzel: ["Cinzel Decorative"]
      },
    },
  },
  safelist,
  plugins: [
    require("tailwindcss-animate"), 
    require('@tailwindcss/forms')
  ],
  
} satisfies Config;

export default config;
