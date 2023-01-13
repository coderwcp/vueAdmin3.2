<template>
	<div :class="['breadcrumb-box', !breadcrumbIcon && 'no-icon']"></div>
	<el-breadcrumb :separator-icon="ArrowRight">
		<transition-group name="breadcrumb" mode="out-in">
			<template v-if="breadcrumbList">
				<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
					<div class="el-breadcrumb__inner is-link" @click="onBreadcrumbClick(item, index)">
						<el-icon class="breadcrumb-icon" v-if="item.meta.icon && breadcrumbIcon">
							<component :is="item.meta.icon"></component>
						</el-icon>
						<span class="breadcrumb-title">{{ item.meta.title }}</span>
					</div>
				</el-breadcrumb-item></template
			>
		</transition-group>
	</el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/module/auth";
import { ArrowRight } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const globalStore = GlobalStore();
const authStore = AuthStore();
const route = useRoute();
const router = useRouter();

const breadcrumbIcon = computed(() => globalStore.themeConfig.breadcrumbIcon);
const breadcrumbList = computed(() => authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path]);

const onBreadcrumbClick = (item: any, index: number) => {
	if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style scoped lang="scss">
.breadcrumb-box {
	display: flex;
	align-items: center;
	padding-right: 50px;
	overflow: hidden;
	mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
	.el-breadcrumb {
		white-space: nowrap;
		.el-breadcrumb__item {
			position: relative;
			display: inline-block;
			float: none;
			.el-breadcrumb__inner {
				display: inline-flex;
				.breadcrumb-icon {
					margin-top: 2px;
					margin-right: 6px;
					font-size: 16px;
				}
				.breadcrumb-title {
					margin-top: 3px;
				}
			}
			:deep(.el-breadcrumb__separator) {
				position: relative;
				top: -1px;
			}
		}
	}
}
.no-icon {
	.el-breadcrumb {
		.el-breadcrumb__item {
			top: -2px;
			:deep(.el-breadcrumb__separator) {
				top: 2px;
			}
		}
	}
}
</style>
