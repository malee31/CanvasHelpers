import { useCourse, useEnvironment } from "../parts/GlobalData";
import BetterSelect from "../parts/BetterSelect";
import { useEffect, useState } from "react";

export default function AssignmentSelect(props) {
	const {
		selectedAssignment,
		setSelectedAssignment,
		placeholderText,
		...args
	} = props;
	const environment = useEnvironment();
	const { course } = useCourse();
	const { SERVER_URL, apiHeader } = environment;
	const [groupFilter, setGroupFilter] = useState("");
	const [assignments, setAssignments] = useState(null);
	const [assignmentGroups, setAssignmentGroups] = useState(null);

	useEffect(() => {
		if(assignments) setAssignments(null);
		if(assignmentGroups) setAssignmentGroups(null);
	}, [course.id]);

	useEffect(() => {
		if(!course.id) return;

		fetch(`${SERVER_URL}/course/${course.id}/assignments`, {
			headers: apiHeader
		})
			.then(async res => {
				if(res.status === 200) {
					const assignmentsList = await res.json();
					const sortedAssignmentsList = assignmentsList.sort((assignmentA, assignmentB) => {
						if(assignmentA.group !== assignmentB.group) {
							return assignmentA.group - assignmentB.group;
						}
						return assignmentA.group_position - assignmentB.group_position;
					});
					setAssignments(assignmentsList);

					const newGroups = [];
					for(const assignment of assignmentsList) {
						if(!newGroups.find(group => group.id === assignment.group)) {
							newGroups.push({ name: assignment.group_name, id: assignment.group });
						}
					}
					setAssignmentGroups(newGroups);

					return;
				}
				if(assignments) setAssignments(null);
				console.log(`Unable to load: [${res.status}] ${res.statusText}`)
			}).catch(err => {
			if(assignments) setAssignments(null);
			console.log(`${err.code}: ${err.message}`);
		});
	}, [apiHeader, course.id]);

	return (
		<>
			<BetterSelect
				placeholderText={"Filter by Group"}
				defaultValue=""
				onChange={e => {
					console.log("FILTER")
					setGroupFilter(e.target.value)}}
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