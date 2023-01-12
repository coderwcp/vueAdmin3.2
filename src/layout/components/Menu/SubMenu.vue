<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
			<template #title>
				<span>{{ subItem.meta.title }}</span>
				<SubMenu :menuList="subItem.children" />
			</template>
		</el-sub-menu>

		<el-menu-item v-else :index="subItem.path">
			<template #title>
				<span>{{ subItem.meta.title }}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup lang="ts" name="SubMenu">
defineProps<{ menuList: Menu.MenuOptions[] }>();
</script>

<style lang="scss" scoped></style>
