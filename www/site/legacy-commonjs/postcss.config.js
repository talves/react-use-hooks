module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss")("./legacy-commonjs/tailwind.config.js"),
    require("autoprefixer"),
  ],
};
