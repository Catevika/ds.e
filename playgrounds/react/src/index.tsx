import React from "react";
import ReactDOM from "react-dom";

import { /* Button, Color, Text, Margin, */ Select } from "@ds.e/react/src";

import "@ds.e/scss/lib/Global.css";
import "@ds.e/scss/lib/Utilities.css";
import "@ds.e/scss/lib/Button.css";
import "@ds.e/scss/lib/Text.css";
import "@ds.e/scss/lib/Margin.css";

const options = [
	{ label: "Strict Black", value: "strict-black" },
	{ label: "Heavenly Green", value: "heavenly-green" },
	{ label: "Sweet Pink", value: "pink" }
];

ReactDOM.render(
	<>
		{/* <Button hexCode='#000' />
		<Color width='xl' height='xl' />
		<Margin left space='none'>
			<Text size='xl'>This is some text</Text>
		</Margin> */}
		<Select options={options} />
	</>,
	document.querySelector("#root")
);
