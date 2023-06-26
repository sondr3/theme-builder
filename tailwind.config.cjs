/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "color-row": "1fr 1fr 1fr 50px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
