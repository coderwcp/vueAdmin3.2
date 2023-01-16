<template>
	<el-container class="layout">
		<el-aside>
			<div class="menu" :style="{ width: isCollapse ? '65px' : '210px' }">
				<div class="logo flx-center">
					<img src="@/assets/images/logo.svg" alt="logo" />
					<span v-show="!isCollapse">Admin</span>
				</div>
				<el-scrollbar>
					<el-menu
						:default-active="activeMenu"
						:router="false"
						:collapse="isCollapse"
						:collapse-transition="false"
						:unique-opened="true"
						background-color="#191a20"
						text-color="#bdbdc0"
						active-text-color="#ffffff"
					>
						<SubMenu :menuList="menuList" />
					</el-menu>
				</el-scrollbar>
			</div>
		</el-aside>
		<el-container>
			<el-header>
				<ToolBarLeft />
				<ToolBarRight />
			</el-header>
			<Main />
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="LayoutVertical">
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/module/auth";
import { computed } from "vue";
import { useRoute } from "vue-router";
import SubMenu from "../components/Menu/SubMenu.vue";
import ToolBarLeft from "../components/Header/ToolBarLeft.vue";
import ToolBarRight from "../components/Header/ToolBarRight.vue";
import Main from "../components/Main/index.vue";
const globalStore = GlobalStore();
const authStore = AuthStore();
const route = useRoute();

const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
const menuList = computed(() => authStore.showMenuListGet);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

<style lang="scss">
.vertical {
	.el-menu,
	.el-menu--popup {
		.el-menu-item {
			&.is-active {
				background: #060708;
				&::before {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					width: 4px;
					content: "";
					background: var(--el-color-primary);
				}
			}
		}
	}
}
</style>
