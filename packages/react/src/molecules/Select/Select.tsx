import React, {
	createRef,
	KeyboardEventHandler,
	useEffect,
	useRef,
	useState
} from "react";
import Text from "../../atoms/Text";

const KEY_CODES = {
	ENTER: "Enter",
	SPACE: "Space",
	DOWN_ARROW: "ArrowDown",
	ESC: "Escape",
	UP_ARROW: "ArrowUp"
};

interface SelectOption {
	label: string;
	value: string;
}

interface RenderOptionProps {
	isSelected: boolean;
	option: SelectOption;
	getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

export interface SelectProps {
	onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
	options?: SelectOption[];
	label?: string;
	renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const getPreviousOptionIndex = (
	currentIndex: number | null,
	options: Array<SelectOption>
) => {
	if (currentIndex === null) return 0;
	if (currentIndex === 0) return options.length - 1;
	return currentIndex - 1;
};

const getNextOptionIndex = (
	currentIndex: number | null,
	options: Array<SelectOption>
) => {
	if (currentIndex === null) return 0;
	if (currentIndex === options.length - 1) return 0;
	return currentIndex + 1;
};

const Select: React.FC<SelectProps> = ({
	options = [],
	label = "Please select an option ...",
	onOptionSelected: handler,
	renderOption
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
	const [highlightedIndex, setHighlightedIndex] = useState<null | number>(null);
	const labelRef = useRef<HTMLButtonElement>(null);
	const [optionRefs, setOptionRefs] = useState<
		React.RefObject<HTMLLIElement>[]
	>([]);
	const [overlayTop, setOverlayTop] = useState<number>(0);

	const onOptionSelected = (option: SelectOption, optionIndex: number) => {
		if (handler) {
			handler(option, optionIndex);
		}

		setSelectedIndex(optionIndex);
		setIsOpen(false);
	};

	const onLabelClick = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
	}, [labelRef.current?.offsetHeight]);

	let selectedOption: SelectOption | null = null;

	if (selectedIndex !== null) {
		selectedOption = options[selectedIndex];
	}

	const highlightOption = (optionIndex: number | null) => {
		setHighlightedIndex(optionIndex);
	};

	const onButtonKeyDown: KeyboardEventHandler = (event) => {
		event.preventDefault();
		if (
			[KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(
				event.code
			)
		) {
			setIsOpen(true);
			highlightOption(0);
		}
	};

	useEffect(() => {
		setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
	}, [options.length]);

	useEffect(() => {
		if (highlightedIndex !== null && isOpen) {
			const ref = optionRefs[highlightedIndex];

			if (ref && ref.current) {
				ref.current.focus();
			}
		}
	}, [isOpen, highlightedIndex]);

	const onOptionKeyDown: KeyboardEventHandler = (event) => {
		if (event.key === KEY_CODES.ESC) {
			setIsOpen(false);
			return;
		}

		if (event.key === KEY_CODES.DOWN_ARROW) {
			highlightOption(getNextOptionIndex(highlightedIndex, options));
		}

		if (event.key === KEY_CODES.UP_ARROW) {
			highlightOption(getPreviousOptionIndex(highlightedIndex, options));
		}

		if (event.key === KEY_CODES.ENTER) {
			onOptionSelected(options[highlightedIndex!], highlightedIndex!);
		}
	};

	return (
		<div className='dse-select'>
			<button
				data-testid='DseSelectButton'
				onKeyDown={onButtonKeyDown}
				aria-controls='dse-select-list'
				aria-haspopup={true}
				aria-expanded={isOpen ? true : undefined}
				ref={labelRef}
				className='dse-select__label'
				onClick={() => onLabelClick()}
			>
				<Text>
					<span>{selectedOption === null ? label : selectedOption.label}</span>
				</Text>
				<svg
					className={`dse-select__caret ${
						isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"
					}`}
					width='1rem'
					height='1rem'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 9l-7 7-7-7'
					/>
				</svg>
			</button>
			{isOpen ? (
				<ul
					role='menu'
					aria-hidden={isOpen ? undefined : false}
					id='dse-select-list'
					style={{ top: overlayTop }}
					className={`dse-select__overlay ${
						isOpen ? "dse-select__overlay--open" : ""
					}`}
				>
					{options.map((option, optionIndex) => {
						const isSelected = selectedIndex === optionIndex;
						const isHighlighted = highlightedIndex === optionIndex;
						const ref = optionRefs[optionIndex];
						const renderOptionProps = {
							ref,
							option,
							isSelected,
							getOptionRecommendedProps: (overrideProps = {}) => {
								return {
									ref,
									role: "menuitemradio",
									"aria-label": option.label,
									"aria-checked": isSelected ? true : undefined,
									onKeyDown: onOptionKeyDown,
									tabIndex: isHighlighted ? -1 : 0,
									onMouseEnter: () => highlightOption(optionIndex),
									onMouseLeave: () => highlightOption(null),
									className: `dse-select__option
											${isSelected ? "dse-select__option--selected" : ""}
											${isHighlighted ? "dse-select__option--highlighted" : ""}
									`,
									key: option.value,
									onClick: () => onOptionSelected(option, optionIndex),
									...overrideProps
								};
							}
						};

						if (renderOption) {
							return renderOption(renderOptionProps);
						}

						return (
							<li {...renderOptionProps.getOptionRecommendedProps()}>
								<Text>{option.label}</Text>
								{isSelected ? (
									<svg
										width='1rem'
										height='1rem'
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'
										/>
									</svg>
								) : null}
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
};

export default Select;
