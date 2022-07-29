import Sidebar from "./Sidebar";
import useGlobal from "../parts/GlobalData";

export default function RightSidebar() {
	const global = useGlobal();

	return (
		<Sidebar open={global.data.rightNavOpen} alignRight={true}>

		</Sidebar>
	);
}