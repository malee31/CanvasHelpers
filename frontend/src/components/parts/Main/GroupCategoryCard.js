import GroupIcon from "../../../static/group.svg";
import CardButton from "../Cards/CardButton";
import useGlobal from "../GlobalData";
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
				console.log(newGroupCategories);
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
		fetch(`${SERVER_URL}/course/${course.id}/groups/category/${selectedGroupCategory}`, {
			method: "POST",
			headers: apiKey ? {
				"Authorization": `Bearer ${apiKey}`
			} : {}
		}).then(res => {
			// TODO: Add progress response to right sidebar
			if(res.status === 200) {
				console.log("Successfully Synchronized");
				return;
			}
			console.log("Unable to synchronize: ", res);
		});
	};

	return (
		<>
			<CardButton
				className="group-category-card-display"
				Icon={GroupIcon}
				pad={true}
				onClick={() => setOpen(!open)}
			>
				Sync Group Category
			</CardButton>
			<div className={`group-category-card-select-wrapper ${open ? "group-category-card-select-wrapper-open" : ""}`}>
				<div className="group-category-card-select">
					{!Array.isArray(groupCategories) && (
						<p className="group-category-card-error-message">{errorMessage}</p>
					)}
					{Array.isArray(groupCategories) && (
						<>
							<select
								className="group-category-card-select-dropdown"
								onChange={e => setSelectedGroupCategory(e.currentTarget.value)}
							>
								{groupCategories.map(groupCategory => (
									<option key={groupCategory.id} value={groupCategory.id}>{groupCategory.name}</option>
								))}
							</select>
							<button
								className="group-category-card-sync-button"
								disabled={!Boolean(selectedGroupCategory)}
								onClick={onSync}
							>Sync</button>
						</>
					)}
				</div>
			</div>
		</>
	);
}