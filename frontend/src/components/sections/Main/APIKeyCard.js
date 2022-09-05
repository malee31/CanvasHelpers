import KeyIcon from "../../../static/key_icon.svg";
import { useCourse, useEnvironment } from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import { useState } from "react";

export default function APIKeyCard() {
	const environment = useEnvironment();
	const { course } = useCourse();
	const [newAPIKey, setNewAPIKey] = useState("");

	if(environment.apiKey || course.id) return null;
	const onAPIBlur = () => {
		environment.saveAPIKey(newAPIKey);
		setNewAPIKey("");
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
				onBlur={onAPIBlur}
			/>
		</CollapsibleCard>
	);
}