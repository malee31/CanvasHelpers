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
		if(!course.id) return;

		Promise.resolve()
			.then(() => {
				setAssignments([
					{
						name: "Test Assignment",
						id: 9999
					}
				]);
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