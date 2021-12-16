import React from "react";
import Select from "./Select";

import "@ds.e/scss/lib/Select.css";

const options = [
	{ label: "Strict Black", value: "Black" },
	{ label: "Heavenly Green", value: "Green" },
	{ label: "Sweet Pink", value: "Pink" }
];

export default {
	title: "molecules/Select"
};

export const Common = () => <Select options={options} />;
export const RenderOption = () => (
	<Select
		options={options}
		renderOption={({ getOptionRecommendedProps, option, isSelected }) => (
			<span {...getOptionRecommendedProps()}>
				{option.label} {isSelected ? " - SELECTED!" : ""}
			</span>
		)}
	/>
);

export const CustomLabel = () => (
	<Select label='Select a color' options={options} />
);
