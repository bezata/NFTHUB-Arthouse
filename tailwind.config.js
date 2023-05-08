/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/web3stuff/NFTHUB.jsx",
    "./src/web3stuff/NFTCard.jsx",
    "./src/web3stuff/FetchData.jsx",
    "./src/web3stuff/WagmiApp.jsx",
    "./src/pages/index.astro",
    "./src/pages/login.astro",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          300: "#FFB347",
          400: "#FFA133",
        },
      },
    },
  },
};