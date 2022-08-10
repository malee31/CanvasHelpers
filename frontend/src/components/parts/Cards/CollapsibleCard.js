import CardButton from "./CardButton";
import "./CollapsibleCard.css";

export default function CollapsibleCard(props) {
	const {
		className,
		Icon,
		pad,
		open,
		setOpen,
		cardText,
		maxHeight,
		showError,
		errorMessage,
		children
	} = props;

	return (
		<>
			<CardButton
				className="collapsible-card-display"
				Icon={Icon}
				pad={pad}
				onClick={() => setOpen(!open)}
			>
				{cardText}
			</CardButton>
			<div
				className={`collapsible-card-select-wrapper ${!open ? "collapsible-card-select-wrapper-closed" : ""}`}
				style={{ maxHeight: maxHeight }}
			>
				<div
					className="collapsible-card-select"
					style={{ maxHeight: maxHeight }}
				>
					{showError
						? (<p className="collapsible-card-error-message">{errorMessage}</p>)
						: children
					}
				</div>
			</div>
		</>
	);
}