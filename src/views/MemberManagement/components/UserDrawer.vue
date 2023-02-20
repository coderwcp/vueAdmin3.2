<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用戶`">
		<el-form
			ref="formRef"
			laber-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:mode="drawerProps.rowData"
		>
		</el-form>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}

const rules = reactive({
	email: [
		{ min: 1, max: 34, message: "长度应为1~34个字符", trigger: "blur" },
		{
			validator: (rule, value, callback) => {
				if (!regularVerify(value, 1) && this.nowInfo.email !== value) {
					callback(new Error(this.$t("member.wrongMailFormat")));
				} else {
					callback();
				}
			},
			trigger: ["change", "blur"]
		}
	]
});

// drawer显示状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({ title: "", isView: false });

const acceptParams = (params: DrawerProps): void => {
	drawerProps.value = params;
	drawerVisible.value = true;
};

defineExpose({
	acceptParams
});
</script>

<style lang="scss" scoped></style>
