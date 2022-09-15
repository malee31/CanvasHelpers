import "./BetterSelect.css";

export default function BetterSelect(props) {
	const {
		className = "",
		children,
		placeholderText,
		value,
		...args
	} = props;

	return (
		<select
			className={`better-select ${className}`}
			defaultValue={typeof value === "undefined" ? -1 : undefined}
			value={value !== null ? value : -1 }
			{...args}
		>
			<option disabled={true} value={-1}>{placeholderText || "Select an Option"}</option>
			{children}
		</select>
	);
}