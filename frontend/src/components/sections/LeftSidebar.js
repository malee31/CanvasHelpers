import Sidebar from "../parts/Sidebar";
import MenuIcon from "../../static/menu_icon.svg";
import useGlobal from "../parts/GlobalData";
import SidebarLabel from "../parts/SidebarLabel";
import CardButton from "../parts/CardButton";
import KeyIcon from "../../static/key_icon.svg"
import SyncIcon from "../../static/sync.svg";
import ClipboardIcon from "../../static/clipboard.svg";
import HandshakeIcon from "../../static/handshake.svg";
import AddIcon from "../../static/add.svg";
import "./LeftSidebar.css";

export default function LeftSidebar() {
	const global = useGlobal();

	return (
		<Sidebar
			Icon={MenuIcon}
			open={global.data.leftNavOpen}
			onNavToggle={() => global.update({ leftNavOpen: !global.data.leftNavOpen })}
		>
			<SidebarLabel>General</SidebarLabel>
			<CardButton Icon={KeyIcon} pad={true}>Change API Key</CardButton>

			<SidebarLabel>Qualtrics</SidebarLabel>
			<CardButton Icon={SyncIcon}>Sync Students</CardButton>
			<CardButton Icon={ClipboardIcon} pad={true}>Sync Survey Participation</CardButton>

			<SidebarLabel>Kudos</SidebarLabel>
			<CardButton Icon={AddIcon} pad={true}>Create Kudos</CardButton>
			<CardButton Icon={HandshakeIcon}>Count Kudos</CardButton>
		</Sidebar>
	);
}