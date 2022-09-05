import BetterButton from "../BetterButton";
import { useEffect, useState } from "react";
import "./SidebarLog.css";

export default function SidebarLog(props) {
	const {
		className = "",
		children,
		fire,
		...args
	} = props;

	const [status, setStatus] = useState("Running...");
	const [error, setError] = useState(false);

	const refire = fire ? () => {
		if(error) setError(false);
		fire({ setStatus, setError });
	} : () => {};

	useEffect(refire, []);

	return (
		<div
			className={`sidebar-log ${className}`}
			{...args}
		>
			{children}
			<p className={`sidebar-log-status ${error ? "sidebar-log-error" : ""}`}>{status}</p>
			{fire ? (
				<BetterButton onClick={() => {
					setStatus("Rerunning...");
					refire();
				}}>
					Rerun
				</BetterButton>
			) : null}
		</div>
	);
};