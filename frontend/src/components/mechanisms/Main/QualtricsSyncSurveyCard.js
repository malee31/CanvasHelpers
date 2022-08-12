import ClipboardIcon from "../../../static/clipboard.svg";
import useGlobal from "../../parts/GlobalData";
import CollapsibleCard from "../CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import BetterFileUpload from "../../parts/BetterFileUpload";
import BetterSelect from "../../parts/BetterSelect";
import { useEffect, useState } from "react";

export default function QualtricsSyncSurveyCard() {
	const global = useGlobal();
	const { SERVER_URL, apiKey, course } = global.data;
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);
	const [assignments, setAssignments] = useState(null);
	const [selectedAssignment, setSelectedAssignment] = useState(null);

	useEffect(() => {
		Promise.resolve()
			.then(() => {
				setTimeout(() => {
					setAssignments([
						{
							name: "Test Assignment",
							id: 9999
						}
					]);
				}, 2000);
			})
	}, [apiKey]);

	const onFile = e => setFile(e.target.files[0]);
	const onSync = () => {
		if(!file || !selectedAssignment) return;

		global.addLog({
				message: `Synchronizing Qualtrics Survey for [${selectedAssignment}]`
			}, () => {
				fetch(`${SERVER_URL}/course/${course.id}/surveycredit/${selectedAssignment}`, {
					method: "POST",
					headers: apiKey ? {
						"Authorization": `Bearer ${apiKey}`,
						"Content-Type": "text/csv"
					} : {},
					body: file
				}).then(res => {
					if(res.status === 200) {
						console.log("Successfully Synchronized");
						return;
					}
					console.log("Unable to synchronize: ", res);
				});
			}
		)
	};

	return (course.id &&
		<CollapsibleCard
			Icon={ClipboardIcon}
			pad={true}
			open={open}
			setOpen={setOpen}
			cardText="Sync Qualtrics Survey"
			maxHeight="15rem"
			showError={false}
		>
			<BetterSelect
				placeholderText="Select Corresponding Survey Assignment"
				style={{ margin: ".5rem 0" }}
				onChange={e => setSelectedAssignment(e.target.value)}
			>
				{Array.isArray(assignments) && (
					assignments.map(assignment => (
						<option value={assignment.id}>{assignment.name}</option>
					))
				)}
			</BetterSelect>
			<BetterFileUpload
				type="file"
				accept="text/csv"
				onChange={onFile}
				disabled={assignments === null}
			>
				Upload Survey CSV
			</BetterFileUpload>
			<BetterButton
				style={{ marginTop: ".5rem" }}
				disabled={!file}
				onClick={onSync}
			>
				Sync from CSV
			</BetterButton>
		</CollapsibleCard>
	);
}