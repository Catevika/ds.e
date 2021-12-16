import React from "react";
import ReactDOM from "react-dom";

import { /* Button, Color, Text, Margin, */ Select } from "@ds.e/react/src";

import "@ds.e/scss/lib/Global.css";
import "@ds.e/scss/lib/Utilities.css";
import "@ds.e/scss/lib/Button.css";
import "@ds.e/scss/lib/Text.css";
import "@ds.e/scss/lib/Margin.css";
import "@ds.e/scss/lib/Select.css";
import { CheckIcon } from "@heroicons/react/solid";

const options = [
	{ label: "Strict Black", value: "Black" },
	{ label: "Heavenly Green", value: "Green" },
	{ label: "Sweet Pink", value: "Pink" }
];

ReactDOM.render(
	<div style={{ padding: "40px" }}>
		{/* <Button hexCode='#000' />
		<Color width='xl' height='xl' />
		<Margin left space='none'>
			<Text size='xl'>This is some text</Text>
		</Margin> */}
		<Select
			options={options}
			renderOption={({ option, getOptionRecommendedProps, isSelected }) => (
				<p {...getOptionRecommendedProps()}>
					{option.label}{" "}
					{isSelected ? (
						<CheckIcon color='#fff' width='1rem' height='1rem' />
					) : null}
				</p>
			)}
		/>
	</div>,
	document.querySelector("#root")
);
