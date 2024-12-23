/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        contactUsCard: "0px 0px 18.1px 0px #0000000F",
        logoCard: "0px 2.59px 52.2px 0px #00000040",
        chooseUs: "0px 4px 48.8px 0px #E3FDFD",
        serviceShadow: "0.5px 0.5px 20px 0px #ffffff",
      },
      colors: {
        "mint-cream": "#ECFFFF",
        "cyan-blue": "#001F33",
        "bluish-cyan": "#6F8893",
        "cyan-light-blue": "#CAFFFF",
        "navy-blue": "#012841",
        "tron-blue": "#41FDFE",
        "tron-blue-100": "#1683D7",
        "tron-blue-200": "#E3FDFD",
        "dark-blue": "#060C30",
        ghost: "#C2CCD2",
        "light-yellow": "#FFF9D2",
        "grey-cloud": "#B5B5B5",
        brown: "#BCBCBC",
        "white-100": "#F1F1F1",
        casal: "#345367",
        red: "#F50A23",
        pink: "#E20074",
      },
      fontSize: {
        64: "64px",
      },
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        inter: '"Inter", sans-serif',
        jost: '"Jost", sans-serif',
      },
      borderRadius: {
        br_5: "5px",
        br_10: "10px",
        br_14: "14px",
        br_20: "20px",
      },
      lineHeight: {
        lh_120: "120%",
        lh_145: "145%",
        lh_122: "122%",
        lh_150: "150%",
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
