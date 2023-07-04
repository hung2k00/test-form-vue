const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    fontSize: {
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    screens: {
      aa: "1408px",
      ab: "431px",
      bb: "720px",
      cc: "581px",
      dd: "961px",
      ee: "807px",
      ff: "1600px",
      gg: "2000px",
      hh: "2100px",
      abc: "500px",
      smd: "1300px",
      ipad: "820px",
      phone: "500px",
      ...defaultTheme.screens,
    },
    extend: {
      margin: {
        15: "3.8rem",
        17: "4.25rem",
        31: "136px",
        102: "982px",
        101: "550px",
        100: "850px",
        ...defaultTheme.margin,
      },
      height: {
        102: "967px",
        101: "807px",
        100: "700px",
        103: "983px",
        ...defaultTheme.height,
      },
      width: {
        100: "505.3px",
        99: "431px",
        101: "900px",
        ...defaultTheme.width,
      },
      maxWidth: {
        smd: "452px",
        99: "431px",
        ...defaultTheme.maxWidth,
      },
    },
  },
  plugins: [],
};
