import { defineConfig, envField, fontProviders } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import vue from "@astrojs/vue"
import vercel from "@astrojs/vercel"

export default defineConfig({
    output: "server",
    env: {
        schema: {
            PRISMIC_REPO_NAME: envField.string({ context: "server", access: "public", optional: false, url: true }),
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
    experimental: {
        fonts: [
            {
                provider: fontProviders.google(),
                name: "Albert Sans",
                weights: ["300", "400", "500", "600", "700", "800"],
                cssVariable: "--font-albert-sans",
                fallbacks: ["sans-serif"],
            },
        ],
    },
    adapter: vercel(),
    integrations: [vue()],
})
