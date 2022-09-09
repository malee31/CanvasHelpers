import AddIcon from "../../../static/add.svg";
import { useCourse, useDisplay, useEnvironment } from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import GroupCategorySelect from "../../mechanisms/GroupCategorySelect";
import { useState } from "react";
import "./CreateKudos.css";
import AssignmentGroupSelect from "../../mechanisms/AssignmentGroupSelect";

export default function CreateKudos() {
	const display = useDisplay();
	const { SERVER_URL, apiHeader } = useEnvironment();
	const { course } = useCourse();
	const [open, setOpen] = useState(false);
	const [selectedGroupCategory, setSelectedGroupCategory] = useState(null);
	const [selectedAssignmentGroup, setSelectedAssignmentGroup] = useState(null);
	const [kudosName, setKudosName] = useState("Kudos Assignment");
	const [points, setPoints] = useState(2);
	const [openDate, setOpenDate] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [closeDate, setCloseDate] = useState("");

	const onCreate = () => {
		display.addLog({
				message: `Creating Kudos for [${course.name}]`
			}, ({ setStatus, setError }) => {
				const data = {
					studyGroup: selectedGroupCategory,
					assignmentGroup: selectedAssignmentGroup,
					assignmentName: kudosName,
					points: points,
					openDate: openDate,
					dueDate: dueDate,
					closeDate: closeDate
				};

				fetch(`${SERVER_URL}/course/${course.id}/kudos/create`, {
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
		)
	};

	const defaultDates = defaultVal => {
		if(!openDate) setOpenDate(defaultVal);
		if(!dueDate) setDueDate(defaultVal);
		if(!closeDate) setCloseDate(defaultVal);
	}

	return (course.id &&
		<CollapsibleCard
			id="create-kudos"
			Icon={AddIcon}
			pad={true}
			open={open}
			setOpen={setOpen}
			cardText="Create Kudos"
			maxHeight="35rem"
			showError={false}
		>
			<GroupCategorySelect
				setSelectedGroupCategory={setSelectedGroupCategory}
				style={{ marginBottom: ".5rem" }}
			/>
			<AssignmentGroupSelect
				setSelectedAssignmentGroup={setSelectedAssignmentGroup}
			/>

			<div
				className="create-kudos-card-grid"
			>
				<label>Kudos Name: </label>
				<input
					className="create-kudos-card-grid-input"
					type="text"
					value={kudosName}
					onChange={e => setKudosName(e.target.value)}
				/>

				<label>Number of Points: </label>
				<input
					className="create-kudos-card-grid-input"
					type="number"
					onChange={e => setPoints(e.target.value)}
				/>

				<label>Open Date: </label>
				<input
					className="create-kudos-card-grid-input"
					type="datetime-local"
					value={openDate}
					onChange={e => setOpenDate(e.target.value)}
					onBlur={e => defaultDates(e.target.value)}
				/>

				<label>Due Date: </label>
				<input
					className="create-kudos-card-grid-input"
					type="datetime-local"
					value={dueDate}
					onChange={e => setDueDate(e.target.value)}
					onBlur={e => defaultDates(e.target.value)}
				/>

				<label>Close Date: </label>
				<input
					className="create-kudos-card-grid-input"
					type="datetime-local"
					value={closeDate}
					onChange={e => setCloseDate(e.target.value)}
					onBlur={e => defaultDates(e.target.value)}
				/>
			</div>

			<BetterButton
				style={{ marginTop: ".5rem" }}
				onClick={onCreate}
			>
				Create Kudos Assignment
			</BetterButton>
		</CollapsibleCard>
	);
}