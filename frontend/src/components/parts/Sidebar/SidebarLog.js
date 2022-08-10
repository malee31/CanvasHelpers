import "./SidebarLog.css";

export default function SidebarLog(props) {
	const {
		classNames = "",
		children,
		...args
	} = props;
	return (
		<div
			className={`sidebar-log ${classNames}`}
			{...args}
		>
			{children}
		</div>
	);
};