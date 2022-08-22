import useGlobal from "../parts/GlobalData";
import BetterSelect from "../parts/BetterSelect";
import { useEffect, useState } from "react";

export default function AssignmentSelect(props) {
	const {
		selectedAssignment,
		setSelectedAssignment,
		placeholderText,
		...args
	} = props;
	const global = useGlobal();
	const { SERVER_URL, apiKey, course } = global.data;
	const [assignments, setAssignments] = useState(null);

	useEffect(() => {
		if(assignments) setAssignments(null);
	}, [course.id]);

	useEffect(() => {
		if(!course.id) return;

		fetch(`${SERVER_URL}/course/${course.id}/assignments`, apiKey ? {
			headers: { "Authorization": `Bearer ${apiKey}` }
		} : undefined)
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
					return;
				}
				if(assignments) setAssignments(null);
				console.log(`Unable to load: [${res.status}] ${res.statusText}`)
			}).catch(err => {
				if(assignments) setAssignments(null);
				console.log(`${err.code}: ${err.message}`);
			});
	}, [apiKey, course.id]);

	return (
		<BetterSelect
			placeholderText={placeholderText || "Select an Assignment"}
			{...args}
		>
			{Array.isArray(assignments) && (
				assignments.map(assignment => (
					<option value={assignment.id} key={assignment.id}>{assignment.name}</option>
				))
			)}
		</BetterSelect>
	)
}