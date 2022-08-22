import "./CardButton.css";

export default function CardButton(props) {
	const {
		Icon,
		pad,
		children,
		className = "",
		...args
	} = props;

	return (
		<a className={`card-button ${className}`} {...args}>
			<div className={`card-button-image ${pad ? "card-button-image-pad" : ""}`}>
				<Icon/>
			</div>
			<div className="card-button-content">
				{children}
			</div>
		</a>
	)
};