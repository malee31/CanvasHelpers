import Sidebar from "../parts/Sidebar/Sidebar";
import { useDisplay } from "../parts/GlobalData";
import DoneIcon from "../../static/done_icon.svg";
import SidebarLog from "../parts/Sidebar/SidebarLog";
import SidebarLabel from "../parts/Sidebar/SidebarLabel";
import "./RightSidebar.css";

export default function RightSidebar() {
	const display = useDisplay();
	const { rightNavOpen, logEvents } = display;

	return (
		<Sidebar
			className="right-sidebar"
			open={rightNavOpen}
			Icon={DoneIcon}
			alignRight={true}
			onNavToggle={() => display.update({ rightNavOpen: !rightNavOpen })}
		>
			<SidebarLabel>Logs</SidebarLabel>
			{logEvents.length > 0
				? ([...logEvents].reverse().map((logEvent, index) => (
						<SidebarLog key={index} fire={logEvent.fire}>
							<p>{logEvent.message}</p>
						</SidebarLog>
					)
				))
				: (<SidebarLog>No Logs</SidebarLog>)
			}
		</Sidebar>
	);
}