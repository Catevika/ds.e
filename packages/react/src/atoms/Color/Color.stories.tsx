import React from "react";
import Color from "./Color";

import { Spacing } from "@ds.e/foundation";
import { text, select } from "@storybook/addon-knobs";

import "@ds.e/scss/lib/Utilities.css";

export default {
	title: "atoms/Color"
};

export const Common = () => <Color hexCode={text("HexCode", "pink")} />;
export const CustomDimensions = () => (
	<Color
		hexCode={text("HexCode", "pink")}
		width={select("Width", Object.values(Spacing), "xxl")}
		height={select("Height", Object.values(Spacing), "xxl")}
	/>
);
