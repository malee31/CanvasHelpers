import GroupIcon from "../../../static/group.svg";
import useGlobal from "../../parts/GlobalData";
import CollapsibleCard from "../../mechanisms/CollapsibleCard";
import BetterButton from "../../parts/BetterButton";
import GroupCategorySelect from "../../mechanisms/GroupCategorySelect";
import { useState } from "react";

export default function GroupCategoryCard() {
	const global = useGlobal();
	const { SERVER_URL, apiKey, course } = global.data;
	const [open, setOpen] = useState(false);
	const [selectedGroupCategory, setSelectedGroupCategory] = useState("");

	const onSync = () => {
		if(!selectedGroupCategory) return;

		global.addLog({
				message: `Synchronizing Group Category: [${selectedGroupCategory}]`
			}, () => {
				fetch(`${SERVER_URL}/course/${course.id}/groups/category/${selectedGroupCategory}`, {
					method: "POST",
					headers: apiKey ? {
						"Authorization": `Bearer ${apiKey}`
					} : {}
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