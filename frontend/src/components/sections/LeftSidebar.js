import Sidebar from "./Sidebar";
import useGlobal from "../parts/GlobalData";
import KeyIcon from "../../static/key_icon.svg"
import "./LeftSidebar.css";

export default function LeftSidebar() {
	const global = useGlobal();

	return (
		<Sidebar open={global.data.leftNavOpen}>
			<div className="nav-drawer-item">
				<KeyIcon style={{display: "inline", marginRight: "1rem"}} width="2em" height="100%"/>
				API Key
			</div>
		</Sidebar>
	);
}