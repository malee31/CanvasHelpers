import { useCourse } from "../parts/GlobalData";
import BetterSelect from "../parts/BetterSelect";
import { useEffect, useState } from "react";

export default function AssignmentSelect(props) {
	const {
		selectedAssignment,
		setSelectedAssignment,
		placeholderText,
		...args
	} = props;
	const { course } = useCourse();
	const [groupFilter, setGroupFilter] = useState("");
	const assignments = course.assignments.all;
	const assignmentGroups = course.assignments.groups;

	useEffect(() => {
		setSelectedAssignment(null);
	}, [course.id]);

	return (
		<>
			<BetterSelect
				placeholderText={"Filter by Group"}
				defaultValue=""
				onChange={e => {
					console.log("FILTER")
					setGroupFilter(e.target.value)
				}}
				{...args}
			>
				<option value="">Any</option>
				{Array.isArray(assignmentGroups) && (
					assignmentGroups
						.map(group => (
							<option value={group.id} key={group.id}>{group.name}</option>
						))
				)}
			</BetterSelect>
			<BetterSelect
				placeholderText={placeholderText || "Select an Assignment"}
				onChange={e => setSelectedAssignment(e.target.value)}
				{...args}
			>
				{Array.isArray(assignments) && (
					assignments
						.filter(assignment => !groupFilter || assignment.group === groupFilter)
						.map(assignment => (
							<option value={assignment.id} key={assignment.id}>{assignment.name}</option>
						))
				)}
			</BetterSelect>
		</>
	)
}