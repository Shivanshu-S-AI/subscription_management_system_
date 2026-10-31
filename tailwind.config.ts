import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--on-primary) / <alpha-value>)",
        },
        ink: "rgb(var(--ink) / <alpha-value>)",
        body: "rgb(var(--body) / <alpha-value>)",
        mute: "rgb(var(--mute) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        hairline: {
          DEFAULT: "rgb(var(--hairline) / <alpha-value>)",
          soft: "rgb(var(--hairline-soft) / <alpha-value>)",
        },
        canvas: {
          DEFAULT: "rgb(var(--canvas) / <alpha-value>)",
          elevated: "rgb(var(--canvas-elevated) / <alpha-value>)",
        },
        link: {
          DEFAULT: "rgb(var(--link) / <alpha-value>)",
          deep: "rgb(var(--link-deep) / <alpha-value>)",
          soft: "rgb(var(--link-soft) / <alpha-value>)",
        },
        error: {
          DEFAULT: "#ee0000",
          deep: "#c50000",
        },
        warning: {
          DEFAULT: "#f5a623",
          soft: "#ffefcf",
          deep: "#ab570a",
        },
        violet: {
          DEFAULT: "#7928ca",
          soft: "#d8ccf1",
        },
        cyan: {
          DEFAULT: "#50e3c2",
          soft: "#aaffec",
        },
        pink: "#ff0080",
        magenta: "#eb367f",
        "gradient-develop-start": "#007cf0",
        "gradient-develop-end": "#00dfd8",
        "gradient-preview-start": "#7928ca",
        "gradient-preview-end": "#ff0080",
        "gradient-ship-start": "#ff4d4d",
        "gradient-ship-end": "#f9cb28",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "16px",
        "pill-category": "64px",
        pill: "100px",
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "64px",
        "4xl": "96px",
        section: "128px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Geist", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        "display-xl": "-2.4px",
        "heading-lg": "-1.28px",
        "heading-md": "-0.4px",
        "label-sm": "-0.28px",
      },
      boxShadow: {
        whisper: "0 1px 1px rgba(0, 0, 0, 0.04)",
        floating: "0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 16px -4px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

