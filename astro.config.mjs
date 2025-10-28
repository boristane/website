import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import vue from '@astrojs/vue';
import mermaid from 'astro-mermaid';


import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

// https://astro.build/config
export default defineConfig({
  site: "https://boristane.com",
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    wasmModuleImports: true
  }),
  integrations: [
    mermaid({
      autoTheme: true
    }),
    expressiveCode({
      themes: ['catppuccin-latte'],
      plugins: [pluginLineNumbers()],
      styleOverrides: {
        frames: {
          frameBoxShadowCssValue: '',
        },
      },
    }),
    mdx(), sitemap(),
    UnoCSS({
      injectReset: true
    }),
    vue(),
  ],
});