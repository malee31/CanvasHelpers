import SyncIcon from "../../../static/sync.svg";
import { useCourse, useDisplay, useEnvironment } from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import BetterFileUpload from "../../parts/BetterFileUpload";
import { useState } from "react";

export default function QualtricsSyncStudentCard() {
	const display = useDisplay();
	const { SERVER_URL, apiHeader } = useEnvironment();
	const course = useCourse();
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);

	const onFile = e => setFile(e.target.files[0]);
	const onSync = () => {
		if(!file) return;

		display.addLog({
				message: `Synchronizing Qualtrics Members for ${course.name}`,
			}, ({ setStatus, setError }) => {
				fetch(`${SERVER_URL}/course/${course.id}/qualtrics`, {
					method: "POST",
					headers: {
						...apiHeader,
						"Content-Type": "text/csv"
					},
					body: file
				}).then(res => {
					if(res.status === 200) {
						setStatus("Successfully Synchronized");
						return;
					}
					setError(true);
					setStatus(`Unable to synchronize: [${res.status}] ${res.statusText}`);
				});
			}
		)
	};

	return (course.id &&
		<CollapsibleCard
			id="sync-qualtrics-students"
			Icon={SyncIcon}
			pad={true}
			open={open}
			setOpen={setOpen}
			cardText="Sync Qualtrics Members"
			maxHeight="8rem"
			showError={false}
		>
			<BetterFileUpload
				type="file"
				accept="text/csv"
				onChange={onFile}
			>
				{file ? `Selected CSV [${file.name}]` : "Upload Student CSV"}
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