import Sidebar from "../parts/Sidebar";
import useGlobal from "../parts/GlobalData";
import DoneIcon from "../../static/done_icon.svg";

export default function RightSidebar() {
	const global = useGlobal();

	return (
		<Sidebar
			open={global.data.rightNavOpen}
			Icon={DoneIcon}
			alignRight={true}
			onNavToggle={() => global.update({ rightNavOpen: !global.data.rightNavOpen })}
		>

		</Sidebar>
	);
}