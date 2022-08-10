import GroupIcon from "../../../static/group.svg";
import useGlobal from "../GlobalData";
import CollapsibleCard from "../Cards/CollapsibleCard";
import { useEffect, useState } from "react";
import "./GroupCategoryCard.css";
import BetterSelect from "../BetterSelect";
import BetterButton from "../BetterButton";

export default function GroupCategoryCard() {
	const global = useGlobal();
	const { SERVER_URL, apiKey, course } = global.data;
	const [open, setOpen] = useState(false);
	const [selectedGroupCategory, setSelectedGroupCategory] = useState("");
	const [groupCategories, setGroupCategories] = useState(null);
	const [errorMessage, setErrorMessage] = useState("Select a course first");

	useEffect(() => {
		if(!course.id) return;

		if(selectedGroupCategory) setSelectedGroupCategory("");
		fetch(`${SERVER_URL}/course/${course.id}/groups/categories`, apiKey ? {
			headers: {
				"Authorization": `Bearer ${apiKey}`
			}
		} : undefined).then(async res => {
			if(res.status === 200) {
				const newGroupCategories = await res.json();
				setGroupCategories(newGroupCategories);
				return;
			}
			if(groupCategories) setGroupCategories(null);
			setErrorMessage(`Unable to load: [${res.status}] ${res.statusText}`)
		}).catch(err => {
			if(groupCategories) setGroupCategories(null);
			setErrorMessage(`${err.code}: ${err.message}`);
		});
	}, [course.id]);

	const onSync = () => {
		if(!selectedGroupCategory) return;

		global.addLog({
			message: `Synchronizing Group Category: [${selectedGroupCategory}]`,
			fire: () => {
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
		});
	};

	return (course.id &&
		<CollapsibleCard
			Icon={GroupIcon}
			pad={true}
			open={open}
			setOpen={setOpen}
			cardText="Sync Group Category"
			maxHeight="8rem"
			showError={!Array.isArray(groupCategories)}
			errorMessage={errorMessage}
		>
			{Array.isArray(groupCategories) && (
				<>
					<BetterSelect
						placeholderText="Select a Group Category"
						onChange={e => setSelectedGroupCategory(e.currentTarget.value)}
					>
						{groupCategories.map(groupCategory => (
							<option key={groupCategory.id} value={groupCategory.id}>{groupCategory.name}</option>
						))}
					</BetterSelect>
					<BetterButton
						className="group-category-card-sync-button"
						disabled={!Boolean(selectedGroupCategory)}
						onClick={onSync}
					>
						Sync
					</BetterButton>
				</>
			)}
		</CollapsibleCard>
	);
}