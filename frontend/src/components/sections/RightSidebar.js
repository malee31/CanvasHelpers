import Sidebar from "../parts/Sidebar/Sidebar";
import useGlobal from "../parts/GlobalData";
import DoneIcon from "../../static/done_icon.svg";
import SidebarLog from "../parts/Sidebar/SidebarLog";
import SidebarLabel from "../parts/Sidebar/SidebarLabel";
import "./RightSidebar.css";
import BetterButton from "../parts/BetterButton";

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