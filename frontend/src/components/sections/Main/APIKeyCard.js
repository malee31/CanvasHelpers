import KeyIcon from "../../../static/key_icon.svg";
import useGlobal from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import { useState } from "react";

export default function APIKeyCard() {
	const global = useGlobal();
	const { apiKey, course } = global.data;
	const [newAPIKey, setNewAPIKey] = useState("");

	if(apiKey || course.id) return null;
	const saveAPIKey = () => {
		if(!newAPIKey) return;
		global.update({ apiKey: newAPIKey });
	};

	return (
		<CollapsibleCard
			Icon={KeyIcon}
			pad={true}
			cardText="Update API Key"
			maxHeight="8rem"
		>
			<p>You can update this from the menu any time</p>
			<input
				type="password"
				placeholder="Enter API Key Here"
				value={newAPIKey}
				onChange={e => setNewAPIKey(e.target.value)}
				onBlur={saveAPIKey}
			/>
		</CollapsibleCard>
	);
}