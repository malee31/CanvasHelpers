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
	const [outputAssignmentGroup, setOutputAssignmentGroup] = useState("");
	const assignments = course.assignments.all && course.assignments.all
		.filter(assignment => assignment.group.toString() === selectedAssignmentGroup);

	const [listData, setListData] = useState({});

	const newListData = {};
	assignments && assignments.map(assignment => {
		const importListData = listData[assignment.id];
		if(importListData) {
			newListData[assignment.id] = importListData;
		} else {
			newListData[assignment.id] = {
				selected: false,
				points: NaN,
				targetGroup: null
			};
		}
	});

	const onCreate = () => {
		display.addLog({
				message: `Scoring Kudos for [${course.name}]`
			}, ({ setStatus, setError }) => {
				const data = {
					assignmentGroup: selectedAssignmentGroup,
					outputAssignmentGroup: outputAssignmentGroup,
					scoreTargets: Object.keys(listData)
						.filter(key => listData[key].selected)
						.map(key => {
							const current = { ...listData[key] };
							current.points = current.points || 0;
							return current;
						})
				};

				return fetch(`${SERVER_URL}/course/${course.id}/kudos/results`, {
					method: "POST",
					headers: {
						...apiHeader,
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
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
			maxHeight="30rem"
			showError={false}
		>
			<AssignmentGroupSelect
				placeholderText="Select Output Assignment Group"
				style={{ margin: "0 0 .5rem 0" }}
				setSelectedAssignmentGroup={setOutputAssignmentGroup}
			/>
			<AssignmentGroupSelect
				placeholderText="Select Kudos Assignment Group"
				style={{ margin: "0 0 .5rem 0" }}
				setSelectedAssignmentGroup={setSelectedAssignmentGroup}
			/>
			{selectedAssignmentGroup && assignments && (
				<div className="score-kudos-assignment-list">
					<input
						className="score-kudos-assignment-list-check"
						type="checkbox"
						onChange={e => {
							Object.keys(newListData).forEach(key => newListData[key].selected = e.target.checked);
							setListData(newListData);
						}}
					/>
					<div className="score-kudos-assignment-list-name">Assignment Name</div>
					<div>Target Study Group</div>
					<div className="score-kudos-assignment-list-points">Points</div>

					{assignments
						.map(assignment => {
							const listEntry = newListData[assignment.id];

							return (
								<Fragment key={assignment.id}>
									<input
										className="score-kudos-assignment-list-check"
										type="checkbox"
										checked={listEntry.selected}
										onChange={e => {
											listEntry.selected = e.target.checked;
											setListData(newListData);
										}}
									/>
									<div className="score-kudos-assignment-list-name">{assignment.name}</div>
									<GroupCategorySelect
										value={listEntry.targetGroup}
										setSelectedGroupCategory={(selectedGroupCategory => {
											listEntry.targetGroup = selectedGroupCategory;
											setListData(newListData);
										})}
										onBlur={() => {
											if(Object.keys(newListData)
												.every(key => key === assignment.id.toString() || newListData[key].targetGroup === null)) {
												Object.keys(newListData).forEach(key =>
													newListData[key].targetGroup = newListData[assignment.id].targetGroup
												);
												setListData(newListData);
											}
										}}
									/>
									<input
										className="score-kudos-assignment-list-points-input"
										type="number"
										min={0}
										value={listEntry.points || 0}
										onChange={e => {
											listEntry.points = Number(e.target.value) || 0;
											setListData(newListData);
										}}
										onBlur={() => {
											if(Object.keys(newListData)
												.every(key => key === assignment.id.toString() || isNaN(newListData[key].points))) {
												Object.keys(newListData).forEach(key =>
													newListData[key].points = newListData[assignment.id].points
												);
												setListData(newListData);
											}
										}}
									/>
								</Fragment>
							);
						})
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