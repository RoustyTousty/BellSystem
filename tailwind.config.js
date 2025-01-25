/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        trvgTheme: {
          primary: "#1e6e13", // Green for primary buttons and accents
          secondary: "#2b4a1b", // Darker green for secondary accents
          accent: "#e7f6e5", // Light green for highlights or backgrounds
          neutral: "#ffffff", // White for background
          "base-100": "#f8f9fa", // Off-white for subtle backgrounds

          // Extras
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
