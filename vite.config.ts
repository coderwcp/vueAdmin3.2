import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { createHtmlPlugin } from "vite-plugin-html";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		base: "./",
		resolve: {
			alias: {
				"@": resolve(__dirname, "src"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.scss";`
				}
			}
		},
		server: {
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			host: "0.0.0.0",
			cors: true,
			proxy: {
				"/api": {
					target: viteEnv.VITE_API_URL,
					changeOrigin: true,
					rewrite(path) {
						return path.replace(/^\/api/, "");
					}
				}
			}
		},
		plugins: [
			vue(),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOBAL_TITLE
					}
				}
			}),
			// * vite 可以使用 jsx/tsx 语法
			vueJsx(),
			// * name 可以写在 script 标签上
			VueSetupExtend()
		]
	};
});
