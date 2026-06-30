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
      },
      backgroundImage: {
        main: "var(--bg-image)"
      },

      colors: {
        bg1: "var(--bg-1)",
        bg2: "var(--bg-2)",
        bg3: "var(--bg-3)",
        bg4: "var(--bg-4)",
        bg5:"var(--bg-5)",
        text1: "var(--text-1)",
        text2: "var(--text-2)",
        text3: "var(--text-3)",
        text4: "var(--text-4)",
        text5: "var(--text-5)",
        iconStroke:"var(--icon-stroke)",
        border1: "var(--border-1)",
        border2: "var(--border-2)",
        hoverText1: "var(--hover-text1)",
        hoverText2:"var(--hover-text2)",
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

