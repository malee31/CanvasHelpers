import ClipboardIcon from "../../../static/clipboard.svg";
import useGlobal from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import BetterFileUpload from "../../parts/BetterFileUpload";
import AssignmentSelect from "../../mechanisms/AssignmentSelect";
import { useState } from "react";

export default function QualtricsSyncSurveyCard() {
	const global = useGlobal();
	const { SERVER_URL, apiKey, course } = global.data;
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);
	const [selectedAssignment, setSelectedAssignment] = useState(null);

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
			<AssignmentSelect
				placeholderText="Select Survey Assignment to Score"
				style={{ margin: ".5rem 0" }}
				selectedAssignment={selectedAssignment}
				setSelectedAssignment={setSelectedAssignment}
				onChange={e => setSelectedAssignment(e.currentTarget.value)}
			/>
			<BetterFileUpload
				type="file"
				accept="text/csv"
				onChange={onFile}
				disabled={selectedAssignment === null}
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