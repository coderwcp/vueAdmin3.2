import { Component } from "vue";

export namespace Form {
	type ItemType = "password" | "text" | "textarea" | "radio" | "checkbox" | "select" | "treeselect";
	type slotName = "prefix" | "suffix" | "prepend" | "append";

	// 当FiledItem的type === 'radio' | 'checkbox'时，options的参数类型
	export interface IFieldOptions {
		labelkey?: string;
		valueKey?: string;
		nodeKey?: string;
		props?: Partial<Record<"label" | "children", any>>;
		placeholder?: string;
		data: any;
	}
	export interface Options {
		inline?: boolean;
		labelWidth?: string | number;
		labelPosition?: "left" | "right" | "top";
		labelSuffix?: string;
		disabled?: boolean;
		size?: "large" | "small" | "default";
		showResetButton?: boolean; // 是否展示重置按钮
		showCancelButton?: boolean; // 是否展示取消按钮
		submitButtonText?: string;
		resetButtonText?: string;
		cancelButtonText?: string;
		scrollToError?: boolean;
	}
	export interface SlotOptions {
		slotName: slotName;
		render: () => Component; // 自定义单元格内容渲染（tsx语法）
	}

	export interface FieldItem {
		label?: string;
		labelWidth?: string | number; // 标签宽度，例如 '50px'。 可以使用 auto。
		prop: string | string[];
		type?: ItemType;
		value?: any;
		bind?: any;
		prefixIcon?: Component;
		suffixIcon?: Component;
		slotOption?: SlotOptions[];
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		options?: IFieldOptions;
		render?: () => any;
		rules?: import("element-plus").FormItemRule[];
		clearable?: boolean; // 是否可清空
		showPassword?: boolean; // 是否显示切换密码图标
		enterable?: boolean; // 当为输入框时，是否启用回车触发提交功能
	}
}
