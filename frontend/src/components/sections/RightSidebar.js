import Sidebar from "../parts/Sidebar/Sidebar";
import useGlobal from "../parts/GlobalData";
import DoneIcon from "../../static/done_icon.svg";
import SidebarLog from "../parts/Sidebar/SidebarLog";
import SidebarLabel from "../parts/Sidebar/SidebarLabel";
import "./RightSidebar.css";

export default function RightSidebar() {
	const global = useGlobal();

	return (
		<Sidebar
			className="right-sidebar"
			open={global.data.rightNavOpen}
			Icon={DoneIcon}
			alignRight={true}
			onNavToggle={() => global.update({ rightNavOpen: !global.data.rightNavOpen })}
		>
			<SidebarLabel>Logs</SidebarLabel>
			<SidebarLog>No Logs</SidebarLog>
		</Sidebar>
	);
}