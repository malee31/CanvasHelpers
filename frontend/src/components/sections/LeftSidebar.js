import Sidebar from "../parts/Sidebar/Sidebar";
import MenuIcon from "../../static/menu_icon.svg";
import { useDisplay, useEnvironment } from "../parts/GlobalData";
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
	const environment = useEnvironment();
	const display = useDisplay();
	const closeAfter = cb => () => {
		cb && cb();
		display.update({ leftNavOpen: false });
	};

	const [apiKeyInput, setApiKeyInput] = useState(null);
	const onAPIKeyBlur = closeAfter(() => {
		environment.saveAPIKey(apiKeyInput);
		setApiKeyInput(null);
	});

	return (
		<Sidebar
			className="left-side-bar"
			Icon={MenuIcon}
			open={display.leftNavOpen}
			onNavToggle={() => display.update({ leftNavOpen: !display.leftNavOpen })}
		>
			<SidebarLabel>General</SidebarLabel>
			<CardButton
				Icon={KeyIcon}
				pad={true}
				tabIndex={0}
				onClick={() => {
					if(apiKeyInput === null) {
						setApiKeyInput(environment.apiKey);
					}
				}}
			>
				{apiKeyInput === null
					? (environment.apiKey ? "Change API Key" : "Set API Key")
					: (
						<input
							type="password"
							className="api-key-input"
							autoFocus={true}
							value={apiKeyInput.toString()}
							onChange={e => setApiKeyInput(e.currentTarget.value)}
							onKeyDown={e => e.key === "Enter" && onAPIKeyBlur()}
							onBlur={onAPIKeyBlur}
						/>
					)
				}
			</CardButton>

			<SidebarLabel>Qualtrics</SidebarLabel>
			<CardButton
				href="#sync-qualtrics-students"
				Icon={SyncIcon}
				onClick={closeAfter()}
			>Sync Students</CardButton>
			<CardButton
				href="#sync-qualtrics-surveys"
				Icon={ClipboardIcon}
				pad={true}
				onClick={closeAfter()}
			>Sync Survey Participation</CardButton>

			<SidebarLabel>Canvas Groups</SidebarLabel>
			<CardButton
				href="#sync-group-category"
				Icon={GroupIcon}
				pad={true}
				onClick={closeAfter()}
			>Sync Group Category</CardButton>

			<SidebarLabel>Kudos</SidebarLabel>
			<CardButton
				href="#create-kudos"
				Icon={AddIcon}
				pad={true}
				onClick={closeAfter()}
			>Create Kudos</CardButton>
			<CardButton
				href="#score-kudos"
				Icon={HandshakeIcon}
				onClick={closeAfter()}
			>Count Kudos</CardButton>
		</Sidebar>
	);
}