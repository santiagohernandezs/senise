import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://senisecapital.com",
	integrations: [sitemap()],
	redirects: {
		"/sitemap.xml": "/sitemap-index.xml",
		"/aviso-legal-y-regulacion": "/aviso-legal",
	},
	adapter: cloudflare({
		imageService: "compile",
	}),
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			exclude: ["astro:actions", "astro/actions"],
		},
		server: {
			watch: {
				ignored: ["**/.wrangler/**", "**/.astro/**"],
			},
		},
	},
	output: "server",
});
