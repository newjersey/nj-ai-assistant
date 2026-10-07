// Tailwind v4 subsumes the rest of this pipeline: `@tailwindcss/postcss` handles `@import`
// inlining (postcss-import), vendor prefixing and modern-CSS lowering (autoprefixer,
// postcss-preset-env) through Lightning CSS. Adding them back would process the output twice.
module.exports = {
<<<<<<< HEAD
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
=======
  plugins: [require('@tailwindcss/postcss')],
>>>>>>> upstream/main
};
