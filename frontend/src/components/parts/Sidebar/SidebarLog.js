import "./SidebarLog.css";

export default function SidebarLog(props) {
	const {
		className = "",
		children,
		...args
	} = props;
	return (
		<div
			className={`sidebar-log ${className}`}
			{...args}
		>
			{children}
		</div>
	);
};