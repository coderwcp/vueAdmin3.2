<template>
	<el-form @submit.prevent :model="model" v-bind="_options" ref="formRef">
		<template v-for="(item, index) in formItem" :key="index">
			<el-form-item
				v-if="!Array.isArray(item.prop)"
				:label="item.label"
				:prop="item.prop"
				:rules="item.rules"
				:label-width="item.labelWidth || 100"
			>
				<component :is="item.render" v-if="item.render" />
				<!-- 树形选择 -->
				<el-tree-select
					v-else-if="item.type === 'treeselect'"
					v-model="model[item.prop]"
					:data="item.options?.data"
					check-strictly
					:render-after-expand="false"
					show-checkbox
					:clearable="item.clearable"
					:props="item.options?.props ?? { label: 'label', children: 'children' }"
					:node-key="item.options?.nodeKey ?? 'id'"
				/>
				<!-- 多选框 -->
				<el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="model[item.prop]">
					<el-checkbox
						:label="check[item.options?.labelkey || 'label']"
						v-for="(check, cIdx) in item.options?.data"
						:key="cIdx"
					></el-checkbox>
				</el-checkbox-group>
				<!-- 单选框组 -->
				<el-radio-group v-else-if="item.type === 'radio'" :disabled="item.disabled" v-model="model[item.prop]">
					<el-radio
						v-for="(radio, rIdx) in item.options?.data"
						:key="rIdx"
						:label="radio[item.options?.labelkey || 'label']"
						:disabled="radio.disabled"
					></el-radio>
				</el-radio-group>
				<!-- 默认输入框 -->
				<el-input
					v-else
					:type="item.type ?? 'text'"
					v-model="model[item.prop]"
					v-bind="item.bind"
					:placeholder="item.placeholder || item.label"
					:clearable="item.clearable"
					:disabled="item.disabled"
					:readonly="item.readonly"
					:show-password="item.showPassword"
					:prefix-icon="item.prefixIcon"
					:suffix-icon="item.suffixIcon"
					@keyyp.enter="handleKeyUp(item.enterable)"
				>
					<template v-for="({ slotName, render }, sIdx) in item.slotOption" :key="sIdx" #[slotName]>
						<component :is="render()" />
					</template>
				</el-input>
			</el-form-item>
			<el-form-item v-else :label="item.label" :prop="item.prop" :rules="item.rules" :label-width="item.labelWidth || 100">
				<component :is="item.render()" v-if="item.render" />
				<!-- 单选框组 -->
				<el-radio-group
					v-else-if="item.type === 'radio'"
					:disabled="item.disabled"
					v-model="model[item.prop[0]][item.prop[1]]"
					aria-label="123"
				>
					<el-radio
						v-for="(radio, rIdx) in item.options?.data"
						:key="rIdx"
						:label="radio[item.options?.valueKey || 'value']"
						:value="12313"
						:disabled="radio.disabled"
						>{{ radio[item.options?.labelkey || "label"] }}</el-radio
					>
				</el-radio-group>
				<el-input
					v-else
					:type="item.type ?? 'text'"
					v-model="model[item.prop[0]][item.prop[1]]"
					v-bind="item.bind"
					:placeholder="item.placeholder || item.label"
					:clearable="item.clearable"
					:disabled="item.disabled"
					:readonly="item.readonly"
					:show-password="item.showPassword"
					:prefix-icon="item.prefixIcon"
					:suffix-icon="item.suffixIcon"
					@keyyp.enter="handleKeyUp(item.enterable)"
				>
					<template v-for="({ slotName, render }, sIdx) in item.slotOption" :key="sIdx" #[slotName]>
						<component :is="render()" />
					</template>
				</el-input>
			</el-form-item>
		</template>
	</el-form>
</template>

<script setup lang="ts" name="ProForm">
import { FormInstance } from "element-plus";
import { ref, ComputedRef, computed } from "vue";
import { Form } from "./interface";

interface Props {
	formItem: Form.FieldItem[];
	model?: Record<string, any>;
	options?: Form.Options;
}

// 表单的数据
const model = ref<Record<string, any>>({});
const formRef = ref<FormInstance>();
const props = defineProps<Props>();
// 设置option默认值，如果传入自定义的配置则合并option配置项
const _options: ComputedRef<Form.Options> = computed(() => {
	const option: Form.Options = {
		labelSuffix: ":",
		labelPosition: "right",
		disabled: false,
		submitButtonText: "提交",
		resetButtonText: "重置",
		cancelButtonText: "取消"
	};
	return Object.assign(option, props?.options);
});
interface EmitEvent {
	(e: "submit", params: any): void;
	(e: "reset"): void;
	(e: "cancel"): void;
}
const emit = defineEmits<EmitEvent>();
defineExpose({
	formRef
});
// const model = ref<Record<string, any>>({})
// 根据fieldList初始化model， 如果model有传值就用传递的model数据模型，否则就给上面声明的model设置相应的(key,value) [item.field]， item.value是表单的默认值（选填）
props.formItem.map((item: Form.FieldItem) => {
	// 如果类型为checkbox，默认值需要设置一个空数组
	const value = item.type === "checkbox" ? [] : "";
	props.model ? (model.value = props.model) : (model.value[item.prop as string] = item.value || value);
});
// 提交按钮
const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(valid => {
		if (valid) {
			emit("submit", model.value);
		} else {
			return false;
		}
	});
};
// 输入框回车事件
const handleKeyUp = (enterable: boolean | undefined) => {
	if (!enterable) return;
	onSubmit(formRef.value);
};
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
console.log(resetForm);
</script>

<style lang="scss" scoped></style>
