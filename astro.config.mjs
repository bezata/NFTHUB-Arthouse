import react from "@astrojs/react";
// https://astro.build/config
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";

export default defineConfig({
  output: "server",
  adapter: netlify(),
});
