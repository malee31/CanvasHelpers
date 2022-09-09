import { useCourse } from "../parts/GlobalData";
import BetterSelect from "../parts/BetterSelect";
import { useEffect } from "react";

export default function AssignmentSelect(props) {
	const {
		setSelectedAssignment,
		placeholderText,
		filter,
		...args
	} = props;
	const { course } = useCourse();
	const assignments = course.assignments.all;

	useEffect(() => {
		setSelectedAssignment(null);
	}, [course.id]);

	return (
		<>
			<BetterSelect
				placeholderText={placeholderText || "Select an Assignment"}
				onChange={e => setSelectedAssignment(e.target.value)}
				{...args}
			>
				{Array.isArray(assignments) && (
					assignments
						.filter(assignment => !filter || filter(assignment))
						.map(assignment => (
							<option value={assignment.id} key={assignment.id}>{assignment.name}</option>
						))
				)}
			</BetterSelect>
		</>
	)
}