import HandshakeIcon from "../../../static/handshake.svg";
import { useCourse, useDisplay, useEnvironment } from "../../parts/GlobalData";
import AssignmentGroupSelect from "../../mechanisms/AssignmentGroupSelect";
import GroupCategorySelect from "../../mechanisms/GroupCategorySelect";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import { Fragment, useState } from "react";
import "./ScoreKudos.css";

export default function ScoreKudos() {
	const display = useDisplay();
	const { SERVER_URL, apiHeader } = useEnvironment();
	const { course } = useCourse();
	const [open, setOpen] = useState(false);
	const [selectedAssignmentGroup, setSelectedAssignmentGroup] = useState("");
	const assignments = course.assignments.all;

	const onCreate = () => {
		display.addLog({
				message: `Scoring Kudos for [${course.name}]`
			}, ({ setStatus, setError }) => {
				return fetch(`${SERVER_URL}/course/${course.id}/kudos/results`, {
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
			<AssignmentGroupSelect
				placeholderText="Select Kudos Assignment Group"
				style={{ margin: "0 0 .5rem 0" }}
				setSelectedAssignmentGroup={setSelectedAssignmentGroup}
			/>
			{selectedAssignmentGroup && (
				<div className="score-kudos-assignment-list">
					{assignments
						.filter(assignment => assignment.group.toString() === selectedAssignmentGroup)
						.map(assignment => (
							<Fragment key={assignment.id}>
								<input type="checkbox" className="score-kudos-assignment-list-check"/>
								<div className="score-kudos-assignment-list-name">{assignment.name}</div>
								<GroupCategorySelect
									setSelectedGroupCategory={(() => {})}
								/>
								<label className="score-kudos-assignment-list-points">
									<span>Points</span>
									<input type="number"/>
								</label>
							</Fragment>
						))
					}
				</div>
			)}
			<BetterButton
				style={{ marginTop: ".5rem" }}
				onClick={onCreate}
			>
				Score Kudos Assignment
			</BetterButton>
		</CollapsibleCard>
	);
}