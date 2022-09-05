import HandshakeIcon from "../../../static/handshake.svg";
import useGlobal from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import GroupCategorySelect from "../../mechanisms/GroupCategorySelect";
import { useState } from "react";
import AssignmentSelect from "../../mechanisms/AssignmentSelect";

export default function ScoreKudos() {
	const global = useGlobal();
	const { SERVER_URL, apiHeader, course } = global.data;
	const [open, setOpen] = useState(false);
	const [selectedGroupCategory, setSelectedGroupCategory] = useState("");
	const [selectedAssignment, setSelectedAssignment] = useState("");

	const onCreate = () => {
		global.addLog({
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
			<GroupCategorySelect
				selectedGroupCategory={selectedGroupCategory}
				setSelectedGroupCategory={setSelectedGroupCategory}
				onChange={e => setSelectedGroupCategory(e.currentTarget.value)}
			/>
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