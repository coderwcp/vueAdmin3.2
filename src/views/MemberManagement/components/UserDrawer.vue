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
			<el-form-item label="用户头像" prop="avatar">
				<UploadImg v-model:imageUrl="drawerProps.rowData!.avatar" width="135px" height="135px" :file-size="3">
					<template #empty>
						<el-icon><Avatar /></el-icon>
						<span>请上传头像</span>
					</template>
					<template #tip> 头像大小不能超过 3M </template>
				</UploadImg>
			</el-form-item>
			<!-- <el-form-item label="用户照片" prop="photo">
				<UploadImgs v-model:fileList="drawerProps.rowData!.photo" height="140px" width="140px" border-radius="50%">
					<template #empty>
						<el-icon><Picture /></el-icon>
						<span>请上传照片</span>
					</template>
					<template #tip> 照片大小不能超过 5M </template>
				</UploadImgs>
			</el-form-item> -->

			<el-form-item label="用户账号" prop="account_number">
				<el-input v-model="drawerProps.rowData!.account_number" placeholder="请填写账号" clearable></el-input>
			</el-form-item>
			<el-form-item label="用户邮箱" prop="email">
				<el-input v-model="drawerProps.rowData!.email" placeholder="请填写邮箱" clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import UploadImg from "@/components/Upload/Img.vue";
// import UploadImgs from "@/components/Upload/Imgs.vue";

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData?: any;
	api?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}

const rules = reactive({
	account_number: [{ required: true, message: "请上传用户头像" }],
	email: [{ required: true, message: "请上传用户头像" }]
});

// drawer显示状态
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({ title: "", isView: false });

const acceptParams = (params: DrawerProps): void => {
	drawerProps.value = params;
	drawerVisible.value = true;
};

const handleSubmit = () => {};

defineExpose({
	acceptParams
});
</script>

<style lang="scss" scoped></style>
