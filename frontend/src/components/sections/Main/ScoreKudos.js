import HandshakeIcon from "../../../static/handshake.svg";
import useGlobal from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import { useState } from "react";

export default function ScoreKudos() {
	const global = useGlobal();
	const { SERVER_URL, apiKey, course } = global.data;
	const [open, setOpen] = useState(false);

	const onCreate = () => {
		global.addLog({
				message: `Scoring Kudos for [${course.name}]`
			}, () => {
				fetch(`${SERVER_URL}/course/${course.id}/kudos/results`, {
					method: "POST",
					headers: apiKey ? {
						"Authorization": `Bearer ${apiKey}`
					} : {},
				}).then(res => {
					if(res.status === 200) {
						console.log("Kudos Created");
						return;
					}
					console.log("Unable to Create Kudos: ", res);
				});
			}
		)
	};

	return (course.id &&
		<CollapsibleCard
			Icon={HandshakeIcon}
			pad={true}
			open={open}
			setOpen={setOpen}
			cardText="Score Kudos"
			maxHeight="15rem"
			showError={false}
		>
			<BetterButton
				style={{ marginTop: ".5rem" }}
				onClick={onCreate}
			>
				Score Kudos Assignment
			</BetterButton>
		</CollapsibleCard>
	);
}