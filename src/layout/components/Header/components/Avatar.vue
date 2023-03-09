<template>
	<el-dropdown trigger="click">
		<div class="avatar">
			<img src="@/assets/images/avatar.gif" alt="avatar" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="openDialog('infoRef')">
					<el-icon><User /></el-icon>{{ $t("header.personalData") }}
				</el-dropdown-item>
				<el-dropdown-item @click="openDialog('passwordRef')">
					<el-icon><Edit /></el-icon>{{ $t("header.changePassword") }}
				</el-dropdown-item>
				<el-dropdown-item @click="logout" divided>
					<el-icon><SwitchButton /></el-icon>{{ $t("header.logout") }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<InfoDialog ref="infoRef" />
	<PasswordDialog ref="passwordRef" />
</template>

<script setup lang="ts" name="Avatar">
import { GlobalStore } from "@/stores";
import { TabStore } from "@/stores/module/tabs";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";
const globalStore = GlobalStore();
const tabStore = TabStore();
const router = useRouter();
interface DialogExpose {
	openDialog: () => void;
}

const infoRef = ref<null | DialogExpose>();
const passwordRef = ref<null | DialogExpose>();
const openDialog = (refName: string) => {
	if (refName === "infoRef") infoRef.value?.openDialog();
	else passwordRef.value?.openDialog();
};
const logout = () => {
	ElMessageBox.confirm("您是否确认退出登录？", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	})
		.then(() => {
			globalStore.setToken("");
			globalStore.clearUserInfo();
			tabStore.setTabs([]);
			router.push("/login");
			ElMessage.success("退出登录成功！");
		})
		.catch(error => error);
};
</script>

<style lang="scss" scoped>
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 50%;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
