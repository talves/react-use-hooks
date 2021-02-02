// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.js"],
  theme: {
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
