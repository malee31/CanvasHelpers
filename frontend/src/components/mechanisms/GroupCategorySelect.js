import BetterSelect from "../parts/BetterSelect";
import { useEffect, useState } from "react";
import useGlobal from "../parts/GlobalData";

export default function GroupCategorySelect(props) {
	const {
		selectedGroupCategory,
		setSelectedGroupCategory,
		...args
	} = props;
	const global = useGlobal();
	const { SERVER_URL, apiKey, course } = global.data;
	const [groupCategories, setGroupCategories] = useState(null);
	const [errorMessage, setErrorMessage] = useState("Select A Course First");

	useEffect(() => {
		if(!course.id) {
			if(groupCategories) setGroupCategories(null);
			return;
		}

		if(selectedGroupCategory) setSelectedGroupCategory("");
		fetch(`${SERVER_URL}/course/${course.id}/groups/categories`, apiKey ? {
			headers: {
				"Authorization": `Bearer ${apiKey}`
			}
		} : undefined).then(async res => {
			if(res.status === 200) {
				const newGroupCategories = await res.json();
				setGroupCategories(newGroupCategories);
				if(errorMessage) setErrorMessage(null);
				return;
			}
			if(groupCategories) setGroupCategories(null);
			setErrorMessage(`Unable to load: [${res.status}] ${res.statusText}`)
		}).catch(err => {
			if(groupCategories) setGroupCategories(null);
			setErrorMessage(`${err.code}: ${err.message}`);
		});
	}, [course.id]);

	return (
		<BetterSelect
			placeholderText={errorMessage || "Select a Group Category"}
			{...args}
		>
			{Array.isArray(groupCategories) && (
				groupCategories.map(groupCategory => (
					<option key={groupCategory.id} value={groupCategory.id}>{groupCategory.name}</option>
				))
			)}
		</BetterSelect>
	)
}