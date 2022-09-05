import BetterSelect from "../parts/BetterSelect";
import { useEffect, useState } from "react";
import { useCourse, useEnvironment } from "../parts/GlobalData";

export default function GroupCategorySelect(props) {
	const {
		selectedGroupCategory,
		setSelectedGroupCategory,
		...args
	} = props;
	const { course } = useCourse();
	const placeholderMessage = course.id ? "Select a Group Category" : "Select A Course First";

	useEffect(() => {
		setSelectedGroupCategory(null);
	}, [course.id]);

	return (
		<BetterSelect
			placeholderText={placeholderMessage}
			{...args}
		>
			{Array.isArray(course.userGroups) && (
				course.userGroups.map(groupCategory => (
					<option key={groupCategory.id} value={groupCategory.id}>{groupCategory.name}</option>
				))
			)}
		</BetterSelect>
	)
}