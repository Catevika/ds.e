import React from "react";
import ReactDOM from "react-dom";

import { /* Button, */ Color } from "@ds.e/react/src";

// import "@ds.e/scss/lib/Button.css";
import "@ds.e/scss/lib/Utilities.css";

ReactDOM.render(
	<>
		{/* <Button label='Example Button' /> */}
		<Color hexCode='#000' width='xl' height='xl' />
	</>,
	document.querySelector("#root")
);
