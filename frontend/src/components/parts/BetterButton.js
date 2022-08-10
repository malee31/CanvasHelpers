import "./BetterButton.css";

export default function BetterButton(props) {
	const {
		className = "",
		children,
		...args
	} = props;

	return (
		<button
			className={`better-button ${className}`}
			{...args}
		>
			{children}
		</button>
	)
}