// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.js", "./content/**/*.mdx"],
  theme: {
    colors: {
      transparent: "transparent",
      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
      primary: {
        100: "#6492A6",
        200: "#59879b",
        300: "#527b8e",
        400: "#4A7082",
        500: "#3C5A68",
        600: "#344F5B",
        700: "#2D444E",
        800: "#253941",
        900: "#1E2E34",
      },
    },
    customForms: (theme) => ({
      default: {
        input: {
          borderRadius: theme("borderRadius.lg"),
          backgroundColor: theme("colors.gray.200"),
          "&:focus": {
            backgroundColor: theme("colors.gray.800"),
            color: theme("colors.gray.100"),
          },
        },
        radio: {
          borderColor: theme("colors.gray.700"),
          borderWidth: 1,
          icon:
            '<svg fill="#aee" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>',
        },
      },
    }),
  },
  variants: {},
  plugins: [
    // require("@tailwindcss/ui")
    require("@tailwindcss/custom-forms"),
  ],
};
