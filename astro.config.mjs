import { defineConfig } from "astro/config";
import react from "@astrojs/react";
// https://astro.build/config
import { defineConfig } from "astro/config";
import vercelEdge from "@astrojs/vercel/edge";
export default defineConfig({
  output: "server",
  adapter: vercelEdge(),
});
