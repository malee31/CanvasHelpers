import Sidebar from "../parts/Sidebar/Sidebar";
import useGlobal from "../parts/GlobalData";
import DoneIcon from "../../static/done_icon.svg";
import SidebarLog from "../parts/Sidebar/SidebarLog";
import SidebarLabel from "../parts/Sidebar/SidebarLabel";
import "./RightSidebar.css";

export default function RightSidebar() {
	const global = useGlobal();
	const { rightNavOpen, logEvents } = global.data;

	return (
		<Sidebar
			className="right-sidebar"
			open={rightNavOpen}
			Icon={DoneIcon}
			alignRight={true}
			onNavToggle={() => global.update({ rightNavOpen: !rightNavOpen })}
		>
			<SidebarLabel>Logs</SidebarLabel>
			{logEvents.length > 0
				? (logEvents.map((logEvent, index) => (
						<SidebarLog key={index}>
							<p>{logEvent.message}</p>
							{logEvent.fire ? (
								<button
									style={{
										background: "white",
										cursor: "pointer",
										border: "1px solid #E0E0E0",
										borderRadius: ".25rem"
									}}
									onClick={logEvent.fire}
								>Rerun</button>
							) : null}
						</SidebarLog>
					)
				))
				: (<SidebarLog>No Logs</SidebarLog>)

			}
		</Sidebar>
	);
}