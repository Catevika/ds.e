import React from "react";
import FontSizes from "../../foundation/fontSize";

interface TextProps {
	size?: keyof typeof FontSizes;
}

const Text: React.FC<TextProps> = ({ size = FontSizes.base, children }) => {
	const className = `dse-text dse-text-${size}`;

	return <p className={className}>{children}</p>;
};

export default Text;
