import GroupIcon from "../../../static/group.svg";
import { useCourse, useDisplay, useEnvironment } from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import GroupCategorySelect from "../../mechanisms/GroupCategorySelect";
import { useState } from "react";

export default function GroupCategoryCard() {
	const display = useDisplay();
	const { SERVER_URL, apiHeader } = useEnvironment();
	const { course } = useCourse();
	const [open, setOpen] = useState(false);
	const [selectedGroupCategory, setSelectedGroupCategory] = useState("");

	const onSync = () => {
		if(!selectedGroupCategory) return;

		display.addLog({
				message: `Synchronizing Group Category: [${selectedGroupCategory}]`
			}, ({ setStatus, setError }) => {
				fetch(`${SERVER_URL}/course/${course.id}/groups/category/${selectedGroupCategory}`, {
					method: "POST",
					headers: apiHeader
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
			id="sync-group-category"
			Icon={GroupIcon}
			pad={true}
			open={open}
			setOpen={setOpen}
			cardText="Sync Group Category"
			maxHeight="8rem"
		>
			<GroupCategorySelect
				selectedGroupCategory={selectedGroupCategory}
				setSelectedGroupCategory={setSelectedGroupCategory}
				onChange={e => setSelectedGroupCategory(e.currentTarget.value)}
			/>
			<BetterButton
				style={{ marginTop: ".5rem" }}
				disabled={!Boolean(selectedGroupCategory)}
				onClick={onSync}
			>
				Sync
			</BetterButton>
		</CollapsibleCard>
	);
}