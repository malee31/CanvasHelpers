import DownloadIcon from "../../static/download_icon.svg";
import "./DropdownItem.css";

/*
	Type can be "download", "select", or default (anything else).
	TODO: Make variants into enum or separate exports
 */
export default function DropdownItem({ type, text, value, onClick, selected }) {
	const onItemClick = type !== "download" ? () => onClick(value) : undefined;

	return (
		<div className={`dropdown-item ${selected ? "dropdown-item-selected" : ""}`} onClick={onItemClick}>
			{type === "select" && (
				<input
					type="checkbox"
					checked={selected}
					className="dropdown-item-checkbox"
					onChange={onItemClick}
				/>
			)}
			<div className="dropdown-item-text">
				{text}
			</div>
			{type === "download" && (
				<button className="dropdown-item-download">
					<DownloadIcon/>
				</button>
			)}
		</div>
	);
}