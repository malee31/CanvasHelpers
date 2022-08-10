import GroupIcon from "../../../static/group.svg";
import useGlobal from "../GlobalData";
import CollapsibleCard from "../Cards/CollapsibleCard";
import { useEffect, useState } from "react";
import "./GroupCategoryCard.css";

export default function GroupCategoryCard() {
	const global = useGlobal();
	const { SERVER_URL, apiKey, course } = global.data;
	const [open, setOpen] = useState(false);
	const [selectedGroupCategory, setSelectedGroupCategory] = useState("");
	const [groupCategories, setGroupCategories] = useState(null);
	const [errorMessage, setErrorMessage] = useState("Select a course first");

	useEffect(() => {
		if(!course.id) return;

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
					<select
						className="group-category-card-select-dropdown"
						onChange={e => setSelectedGroupCategory(e.currentTarget.value)}
						defaultValue={-1}
					>
						<option disabled={true} value={-1}>Select a Group Category</option>
						{groupCategories.map(groupCategory => (
							<option key={groupCategory.id} value={groupCategory.id}>{groupCategory.name}</option>
						))}
					</select>
					<button
						className="group-category-card-sync-button"
						disabled={!Boolean(selectedGroupCategory)}
						onClick={onSync}
					>Sync
					</button>
				</>
			)}
		</CollapsibleCard>
	);
}