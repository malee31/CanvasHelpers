import "./SidebarLabel.css";

export default function SidebarLabel(props) {
	const {
		children,
		...args
	} = props;

	return (
		<div className="sidebar-label" {...args}>
			{children}
		</div>
	);
}