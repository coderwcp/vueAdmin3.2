<template>
	<el-dropdown trigger="click" @command="handleSetLanguage">
		<i :class="'iconfont icon-zhongyingwen'" class="toolBar-icon"></i>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item :disabled="language && language === 'zh'" command="zh">简体中文</el-dropdown-item>
				<el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts" name="Language">
import { GlobalStore } from "@/store";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { getBrowserLang } from "@/utils";
const globalStore = GlobalStore();
const i18n = useI18n();
const handleSetLanguage = (lang: string) => {
	i18n.locale.value = lang;
	globalStore.updateLanguage(lang);
};
const language = computed(() => globalStore.language);

onMounted(() => {
	handleSetLanguage(language.value || getBrowserLang());
});
</script>

<style lang="scss" scoped></style>
