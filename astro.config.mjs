import react from "@astrojs/react";
// https://astro.build/config
import { defineConfig } from "astro/config";
import vercelServerless from "@astrojs/vercel/serverless";
export default defineConfig({
  output: "server",
  adapter: vercelServerless(),
});
