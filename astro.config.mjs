import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
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
