<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder="用户名：admin / user">
				<template #prefix>
					<el-icon class="el-input__icon"><user /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" v-model="loginForm.password" placeholder="密码：123456" show-password autocomplete="new-password">
				<template #prefix>
					<el-icon class="el-input__icon"><lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button round @click="resetForm(loginFormRef)" size="large">重置</el-button>
		<el-button round @click="login(loginFormRef)" size="large" type="primary" :loading="loading"> 登录 </el-button>
	</div>
</template>

<script setup lang="ts" name="loginForm">
import { ElForm, ElNotification } from "element-plus";
import { ref, reactive } from "vue";
import { Login } from "@/api/interface";
import { loginApi } from "@/api/user";
import { useRouter } from "vue-router";
import { GlobalStore } from "@/stores";
import { initDynamicRouter } from "@/router/module/dynamicRouter";
import { getTimeState } from "@/utils";
const router = useRouter();
const globalStore = GlobalStore();

// 定义 form
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});
const loginForm = reactive<Login.LoginParams>({
	username: "admin",
	password: "123456"
});

const loading = ref(false);

const resetForm = (fromEl: FormInstance | undefined) => {
	fromEl;
};
const login = (fromEl: FormInstance | undefined) => {
	if (!fromEl) return;
	fromEl.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			// 调用登录接口
			const {
				data: { access_token, user_info }
			} = await loginApi(loginForm);
			globalStore.setToken(access_token);
			globalStore.setUserInfo(user_info);

			await initDynamicRouter(user_info.roleId);

			router.push("/Home");

			ElNotification({
				title: getTimeState(),
				message: `欢迎登录 ${user_info.nickname || user_info.username}`,
				type: "success",
				duration: 3000
			});
		} catch (error) {
		} finally {
			setTimeout(() => {
				loading.value = false;
			}, 3000);
		}
	});
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
