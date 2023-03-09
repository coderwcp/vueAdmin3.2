<template>
	<el-config-provider :locale="i18nLocale">
		<RouterView />
	</el-config-provider>
</template>

<script setup lang="ts" name="App">
import { computed } from "vue";
import { GlobalStore } from "./stores";
import { getBrowserLang } from "./utils";
import { useTheme } from "@/hooks/useTheme";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";

// 初始化主题配置
const { initTheme } = useTheme();
initTheme();

const globalStore = GlobalStore();

// element 语言配置
const i18nLocale = computed(() => {
	if (globalStore.language && globalStore.language == "zh") return zhCn;
	if (globalStore.language == "en") return en;
	return getBrowserLang() == "zh" ? zhCn : en;
});
</script>

<style lang="scss" scoped></style>
