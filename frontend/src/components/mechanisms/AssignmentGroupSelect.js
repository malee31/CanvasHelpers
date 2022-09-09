import { useCourse } from "../parts/GlobalData";
import BetterSelect from "../parts/BetterSelect";
import { useEffect, useState } from "react";

export default function AssignmentGroupSelect(props) {
	const {
		setSelectedAssignmentGroup,
		placeholderText,
		onChange,
		children,
		...args
	} = props;
	const { course } = useCourse();
	const assignmentGroups = course.assignments.groups;

	useEffect(() => {
		setSelectedAssignmentGroup(null);
	}, [course.id]);

	return (
		<>
			<BetterSelect
				placeholderText="Select Assignment Group"
				onChange={e => setSelectedAssignmentGroup(e.target.value)}
				{...args}
			>
				{children}
				{Array.isArray(assignmentGroups) && (
					assignmentGroups
						.map(group => (
							<option value={group.id} key={group.id}>{group.name}</option>
						))
				)}
			</BetterSelect>
		</>
	)
}