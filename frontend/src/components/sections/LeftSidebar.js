import Sidebar from "../parts/Sidebar/Sidebar";
import MenuIcon from "../../static/menu_icon.svg";
import useGlobal from "../parts/GlobalData";
import SidebarLabel from "../parts/Sidebar/SidebarLabel";
import CardButton from "../parts/Cards/CardButton";
import KeyIcon from "../../static/key_icon.svg"
import SyncIcon from "../../static/sync.svg";
import ClipboardIcon from "../../static/clipboard.svg";
import GroupIcon from "../../static/group.svg";
import HandshakeIcon from "../../static/handshake.svg";
import AddIcon from "../../static/add.svg";
import "./LeftSidebar.css";

export default function LeftSidebar() {
	const global = useGlobal();
	const closeAfter = cb => () => {
		cb && cb();
		global.update({leftNavOpen: false});
	};

	return (
		<Sidebar
			className="left-side-bar"
			Icon={MenuIcon}
			open={global.data.leftNavOpen}
			onNavToggle={() => global.update({ leftNavOpen: !global.data.leftNavOpen })}
		>
			<SidebarLabel>General</SidebarLabel>
			<CardButton Icon={KeyIcon} pad={true}>Change API Key</CardButton>

			<SidebarLabel>Qualtrics</SidebarLabel>
			<CardButton Icon={SyncIcon}>Sync Students</CardButton>
			<CardButton Icon={ClipboardIcon} pad={true}>Sync Survey Participation</CardButton>

			<SidebarLabel>Canvas Groups</SidebarLabel>
			<CardButton Icon={GroupIcon} pad={true} onClick={closeAfter()}>Fetch Group Categories</CardButton>
			<CardButton Icon={GroupIcon} pad={true}>Sync Group Category</CardButton>


			<SidebarLabel>Kudos</SidebarLabel>
			<CardButton Icon={AddIcon} pad={true}>Create Kudos</CardButton>
			<CardButton Icon={HandshakeIcon}>Count Kudos</CardButton>
		</Sidebar>
	);
}