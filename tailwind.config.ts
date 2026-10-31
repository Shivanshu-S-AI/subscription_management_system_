import type { Config } from "tailwindcss";

const config: Config = {
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
          DEFAULT: "#171717",
          foreground: "#ffffff",
        },
        ink: "#171717",
        body: "#4d4d4d",
        mute: "#8f8f8f",
        faint: "#a1a1a1",
        hairline: {
          DEFAULT: "#ebebeb",
          soft: "#f2f2f2",
        },
        canvas: {
          DEFAULT: "#fafafa",
          elevated: "#ffffff",
        },
        link: {
          DEFAULT: "#0070f3",
          deep: "#0761d1",
          soft: "#d3e5ff",
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
