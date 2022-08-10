import "./BetterSelect.css";

export default function BetterSelect(props) {
	const {
		className,
		children,
		placeholderText,
		...args
	} = props;

	return (
		<select
			className={`better-select ${className}`}
			defaultValue={-1}
			{...args}
		>
			<option disabled={true} value={-1}>{placeholderText || "Select an Option"}</option>
			{children}
		</select>
	)
}