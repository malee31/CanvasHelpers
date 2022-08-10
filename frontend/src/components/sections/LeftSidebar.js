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
import { useState } from "react";
import "./LeftSidebar.css";

export default function LeftSidebar() {
	const global = useGlobal();
	const closeAfter = cb => () => {
		cb && cb();
		global.update({ leftNavOpen: false });
	};

	const [apiKeyInput, setApiKeyInput] = useState(null);
	const saveApiKey = val => {
		setApiKeyInput(val);
		localStorage.setItem("CANVAS_API_KEY", val);
		global.update({
			apiKey: val
		});
	};

	return (
		<Sidebar
			className="left-side-bar"
			Icon={MenuIcon}
			open={global.data.leftNavOpen}
			onNavToggle={() => global.update({ leftNavOpen: !global.data.leftNavOpen })}
		>
			<SidebarLabel>General</SidebarLabel>
			<CardButton
				Icon={KeyIcon}
				pad={true}
				tabIndex={0}
				onClick={() => {
					if(apiKeyInput === null) {
						setApiKeyInput(global.data.apiKey);
					}
				}}
			>
				{apiKeyInput === null
					? (global.data.apiKey ? "Change API Key" : "Set API Key")
					: (
						<input
							type="text"
							className="api-key-input"
							autoFocus={true}
							value={apiKeyInput.toString()}
							onChange={e => setApiKeyInput(e.currentTarget.value)}
							onBlur={closeAfter(() => {
								saveApiKey(apiKeyInput);
								setApiKeyInput(null);
							})}
						/>
					)
				}
			</CardButton>

			<SidebarLabel>Qualtrics</SidebarLabel>
			<CardButton
				Icon={SyncIcon}
				onClick={closeAfter()}
			>Sync Students</CardButton>
			<CardButton
				Icon={ClipboardIcon}
				pad={true}
				onClick={closeAfter()}
			>Sync Survey Participation</CardButton>

			<SidebarLabel>Canvas Groups</SidebarLabel>
			<CardButton
				Icon={GroupIcon}
				pad={true}
				onClick={closeAfter()}
			>Fetch Group Categories</CardButton>
			<CardButton
				Icon={GroupIcon}
				pad={true}
				onClick={closeAfter()}
			>Sync Group Category</CardButton>

			<SidebarLabel>Kudos</SidebarLabel>
			<CardButton
				Icon={AddIcon}
				pad={true}
				onClick={closeAfter()}
			>Create Kudos</CardButton>
			<CardButton
				Icon={HandshakeIcon}
				onClick={closeAfter()}
			>Count Kudos</CardButton>
		</Sidebar>
	);
}