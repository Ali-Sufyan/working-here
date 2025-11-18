/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
    

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          lighter: "hsl(var(--primary-lighter))",
          lightest: "hsl(var(--primary-lightest))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          darker: "hsl(var(--primary-darker))",
          darkest: "hsl(var(--primary-darkest))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          1: "hsl(var(--secondary-1))",
          2: "hsl(var(--secondary-2))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          1: "hsl(var(--accent-1))",
          2: "hsl(var(--accent-2))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          light: "hsl(var(--error-light))",
          dark: "hsl(var(--error-dark))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          light: "hsl(var(--success-light))",
          dark: "hsl(var(--success-dark))",
        },
        warning: {
          light: "hsl(var(--warning-light))",
          dark: "hsl(var(--warning-dark))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        gray: {
          "00": "hsl(var(--gray-00))",
          0: "hsl(var(--gray-0))",
          1: "hsl(var(--gray-1))",
          2: "hsl(var(--gray-2))",
          3: "hsl(var(--gray-3))",
          4: "hsl(var(--gray-4))",
          5: "hsl(var(--gray-5))",
          6: "hsl(var(--gray-6))",
        },
        dark: {
          0: "hsl(var(--dark-0))",
          1: "hsl(var(--dark-1))",
          2: "hsl(var(--dark-2))",
        },
      },
    },
    screen: {
      xs: "400px",
      xsm: {
        max: "400px",
      },
      smm: {
        max: "640px",
      },
      mdm: {
        max: "768px",
      },
      lgm: {
        max: "1024px",
      },
      xlm: {
        max: "1280px",
      },
      "2xlm": {
        max: "1536px",
      },
    },
  },
  important: "#root",
  plugins: [require("tailwindcss-animate")],
};
