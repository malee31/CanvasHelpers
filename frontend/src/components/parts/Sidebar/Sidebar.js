import "./Sidebar.css";

export default function Sidebar(props) {
	const {
		open,
		className = "",
		children,
		Icon,
		alignRight = false,
		onNavToggle,
		...args
	} = props;

	return (
		<aside className={`sidebar ${open ? "sidebar-open" : ""} ${className}`} {...args}>
			<button
				className={`sidebar-toggle ${alignRight ? "sidebar-toggle-right" : "sidebar-toggle-left"}`}
				onClick={onNavToggle}
			>
				<Icon className="sidebar-toggle-icon" width="100%" height="100%"/>
			</button>
			<div className={`sidebar-content ${alignRight ? "sidebar-content-right" : "sidebar-content-left"}`}>
				{children}
			</div>
		</aside>
	);
}