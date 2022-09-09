import AddIcon from "../../../static/add.svg";
import { useCourse, useDisplay, useEnvironment } from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import GroupCategorySelect from "../../mechanisms/GroupCategorySelect";
import { useState } from "react";
import "./CreateKudos.css";

export default function CreateKudos() {
	const display = useDisplay();
	const { SERVER_URL, apiHeader } = useEnvironment();
	const { course } = useCourse();
	const [open, setOpen] = useState(false);
	const [selectedGroupCategory, setSelectedGroupCategory] = useState(null);
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

	return (course.id &&
		<CollapsibleCard
			id="create-kudos"
			Icon={AddIcon}
			pad={true}
			open={open}
			setOpen={setOpen}
			cardText="Create Kudos"
			maxHeight="20rem"
			showError={false}
		>
			<GroupCategorySelect
				selectedGroupCategory={selectedGroupCategory}
				setSelectedGroupCategory={setSelectedGroupCategory}
				onChange={e => setSelectedGroupCategory(e.currentTarget.value)}
			/>

			<div
				className="create-kudos-card-grid"
			>
				<label>Kudos Name: </label>
				<input
					className="create-kudos-card-grid-input"
					type="text"
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
					onChange={e => setOpenDate(e.target.value)}
				/>

				<label>Due Date: </label>
				<input
					className="create-kudos-card-grid-input"
					type="datetime-local"
					defaultValue={openDate}
					onChange={e => setDueDate(e.target.value)}
				/>

				<label>Close Date: </label>
				<input
					className="create-kudos-card-grid-input"
					type="datetime-local"
					defaultValue={dueDate || openDate}
					onChange={e => setCloseDate(e.target.value)}
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