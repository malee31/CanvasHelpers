import "./Sidebar.css";

export default function Sidebar(props) {
	const {
		open,
		children,
		alignRight = false,
		...args
	} = props;

	return (
		<aside className={`sidebar ${open ? "sidebar-open" : ""}`} {...args}>
			<div className={`sidebar-content ${alignRight ? "sidebar-content-right" : "sidebar-content-left"}`}>
				{children}
			</div>
		</aside>
	);
}