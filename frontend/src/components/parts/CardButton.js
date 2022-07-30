import "./CardButton.css";

export default function CardButton(props) {
	const {
		Icon,
		pad,
		children,
		...args
	} = props;

	return (
		<button className="card-button" {...args}>
			<div className={`card-button-image ${pad ? "card-button-image-pad" : ""}`}>
				<Icon/>
			</div>
			<div className="card-button-content">
				{children}
			</div>
		</button>
	)
};