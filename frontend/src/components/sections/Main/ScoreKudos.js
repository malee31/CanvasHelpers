import HandshakeIcon from "../../../static/handshake.svg";
import { useCourse, useDisplay, useEnvironment } from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import AssignmentSelect from "../../mechanisms/AssignmentSelect";
import { useState } from "react";

export default function ScoreKudos() {
	const display = useDisplay();
	const { SERVER_URL, apiHeader } = useEnvironment();
	const { course } = useCourse();
	const [open, setOpen] = useState(false);
	const [selectedAssignment, setSelectedAssignment] = useState("");

	const onCreate = () => {
		display.addLog({
				message: `Scoring Kudos for [${course.name}]`
			}, ({ setStatus, setError }) => {
				fetch(`${SERVER_URL}/course/${course.id}/kudos/results`, {
					method: "POST",
					headers: apiHeader,
				}).then(res => {
					if(res.status === 200) {
						setStatus("Kudos Created");
						return;
					}
					setError(true);
					setStatus(`Unable to Create Kudos: [${res.status}] ${res.statusText}`);
				});
			}
		);
	};

	return (course.id &&
		<CollapsibleCard
			id="score-kudos"
			Icon={HandshakeIcon}
			pad={true}
			open={open}
			setOpen={setOpen}
			cardText="Score Kudos"
			maxHeight="15rem"
			showError={false}
		>
			<AssignmentSelect
				placeholderText="Select Kudos Assignment"
				style={{ margin: "0 0 .5rem 0" }}
				selectedAssignment={selectedAssignment}
				setSelectedAssignment={setSelectedAssignment}
				onChange={e => setSelectedAssignment(e.currentTarget.value)}
			/>
			<BetterButton
				style={{ marginTop: ".5rem" }}
				onClick={onCreate}
			>
				Score Kudos Assignment
			</BetterButton>
		</CollapsibleCard>
	);
}