import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/rdpUtilities/**/*.{js,ts,jsx,tsx,md}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#00799f",
        },
        warning: {
          DEFAULT: "#ff0000",
        },
        green: {
          DEFAULT: "#028202",
          light: "#4be94b",
        },
        blue: {
          DEFAULT: "#00799F",
          light: "#BFDEE8",
        },
        grey: {
          DEFAULT: "#707070",
          light: "#cccccc",
        },
        print: {
          red: {
            DEFAULT: "#d81a00",
          },
          blue: {
            DEFAULT: "#0156f6",
            light: { DEFAULT: "#4683f6", 1: "#e7e7ff" },
            dark: "#18069e",
          },
          grey: {
            DEFAULT: "#707070",
            light: {
              DEFAULT: "#f2f2f2",
              1: "#d6d6d6",
            },
            imgBg: "#1c1c1c",
          },
          green: {
            DEFAULT: "#028202",
            light: "#4be94b",
          },
        },
      },
      borderRadius: {
        DEFAULT: "5px",
        md: "10px",
        lr: "15px",
      },
      gridTemplateColumns: {
        "auto-300": "repeat(auto-fit, 300px)",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
      screens: {
        xsm: "375px",
        sm: "425px",
        md: "768px",
        lr: "1024px",
        xl: "1440px",
        "2xl": "2560px",
      },
    },
  },
  plugins: [
    plugin(function ({
      addComponents,
      theme,
    }: {
      addComponents: any;
      theme: any;
    }) {
      addComponents({
        ".form-input": {
          backgroundColor: theme("colors.print.grey.light.DEFAULT"),
          borderRadius: theme("borderRadius.DEFAULT"),
          padding: "2px 5px",
          marginBottom: "5px",
          width: "100%",
          borderBottomWidth: "2px",
          borderColor: theme("colors.grey.DEFAULT"),
        },
        ".form-button": {
          backgroundColor: theme("colors.print.blue.DEFAULT"),
          borderRadius: theme("borderRadius.DEFAULT"),
          color: "white",
          fontSize: "1.2rem",
          width: "100%",
          marginTop: "25px",
          paddingBlock: "5px",
        },
        ".form-button:hover": {
          backgroundColor: theme("colors.print.blue.light"),
        },
        ".form-radio": {
          appearance: "none",
          width: "15px",
          height: "15px",
          borderWidth: "1px",
          borderColor: theme("colors.grey.DEFAULT"),
          borderRadius: "3px",
          backgroundColor: "white",
          marginInline: "7px",
        },
        ".form-radio:checked": {
          backgroundColor: theme("colors.print.blue.DEFAULT"),
        },
      });
    }),
  ],
};
export default config;
