import { text } from "@fortawesome/fontawesome-svg-core";

export default {
  darkMode: 'class',

  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],

  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        lexendExa: ['Lexend Exa', 'sans-serif'],
        bellefair: ['Bellefair', 'serif'],
        corinthia: ['Corinthia', 'cursive'],
      },
      backgroundImage: {
        main: "var(--bg-image)"
      },

      colors: {
        bg1: "var(--bg-1)",
        bg2: "var(--bg-2)",
        bg3: "var(--bg-3)",
        bg4: "var(--bg-4)",
        text1: "var(--text-1)",
        text2: "var(--text-2)",
        text3: "var(--text-3)",
        text4: "var(--text-4)",
        border1: "var(--border-1)",
        border2: "var(--border-2)",
        hoverText: "var(--hover-text)",
        boxShadow: "var(--shadow)",
        placeholder: "var(--placeholder)",
        hoverBorder1: "var(--hover-border-1)",
        hoverBorder2: "var(--hover-border-2)",
        hoverBg: "var(--hover-bg)"
      }
    }
  },

  plugins: [],
}

