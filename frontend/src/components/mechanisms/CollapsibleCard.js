import CardButton from "../parts/Cards/CardButton";
import "./CollapsibleCard.css";
import { useEffect } from "react";

export default function CollapsibleCard(props) {
	const {
		className = "",
		Icon,
		pad,
		open = true,
		setOpen = ((newOpen) => {}),
		cardText,
		maxHeight,
		showError,
		errorMessage,
		children,
		id,
		...args
	} = props;

	useEffect(() => {
		const listener = e => {
			if(!window.location.hash || window.location.hash.length < 1) return;
			if(window.location.hash.slice(1) === id) setOpen(true);
			else if(!window.location.hash.slice(1).endsWith("-open")) setOpen(false);
		};

		window.addEventListener("hashchange", listener);
		return () => window.removeEventListener("hashchange", listener);
	}, []);

	return (
		<div id={id} {...args}>
			<CardButton
				className="collapsible-card-display"
				Icon={Icon}
				pad={pad}
				id={id && `${id}-open`}
				href={id && open && `#${id}-open`}
				onClick={() => setOpen(!open)}
			>
				{cardText}
			</CardButton>
			<div
				className={`collapsible-card-select-wrapper ${!open ? "collapsible-card-select-wrapper-closed" : ""} ${className}`}
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
		</div>
	);
}