import { Component } from "vue";

export namespace Form {
	type ItemType = "password" | "text" | "textarea" | "radio" | "checkbox" | "select" | "treeselect";
	type slotName = "prefix" | "suffix" | "prepend" | "append";

	// 当FiledItem的type === 'radio' | 'checkbox'时，options的参数类型
	export interface IFieldOptions {
		labelkey?: string;
		valueKey?: string;
		nodeKey?: string;
		// label	指定节点标签为节点对象的某个属性值	string, function(data, node)	—	—
		// children	指定子树为节点对象的某个属性值	string	—	—
		// disabled	指定节点选择框是否禁用为节点对象的某个属性值	string, function(data, node)	—	—
		// isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	string, function(data, node)	—	—
		// class	自定义节点类名	string, function(data, node)	—	—
		props?: Partial<Record<"label" | "children" | "disabled" | "isLeaf" | "class", any>>;
		placeholder?: string;
		showCheckbox?: boolean;
		multiple?: boolean;
		collapseTags?: boolean;
		checkStrictly?: boolean; // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
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

	export interface FieldItem<T = any> {
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
		render?: (scope: { row: T }) => any;
		rules?: import("element-plus").FormItemRule[];
		clearable?: boolean; // 是否可清空
		showPassword?: boolean; // 是否显示切换密码图标
		enterable?: boolean; // 当为输入框时，是否启用回车触发提交功能
		handleNodeClick?: (data: T) => any;
	}
}
