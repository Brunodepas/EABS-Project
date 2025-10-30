// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(4deg)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(6deg)" },
        },
        "float-sway": {
          "0%,100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(10px,-14px) rotate(6deg)" },
        },
        "float-sway-rev": {
          "0%,100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(-10px,-14px) rotate(-6deg)" },
        },
        parallax: {
          "0%,100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(12px)" },
        },
        "parallax-rev": {
          "0%,100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(-12px)" },
        },
        fadein: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "float-sway": "float-sway 10s ease-in-out infinite",
        "float-sway-rev": "float-sway-rev 11s ease-in-out infinite",
        parallax: "parallax 14s ease-in-out infinite",
        "parallax-rev": "parallax-rev 16s ease-in-out infinite",
        "fade-in": "fadein 0.9s ease-in forwards",
      },
    },
  },
  plugins: [],
};
