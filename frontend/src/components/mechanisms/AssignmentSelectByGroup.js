import AssignmentGroupSelect from "./AssignmentGroupSelect";
import AssignmentSelect from "./AssignmentSelect";
import { useState } from "react";

export default function AssignmentSelectByGroup(props) {
	const {
		placeholderText,
		onChange,
		...args
	} = props;
	const [groupFilter, setGroupFilter] = useState("");

	return (
		<>
			<AssignmentGroupSelect
				placeholderText="Filter by Group"
				defaultValue=""
				setSelectedAssignmentGroup={setGroupFilter}
			>
				<option value="">Any Assignment Group</option>
			</AssignmentGroupSelect>
			<AssignmentSelect
				filter={assignment => !groupFilter || assignment.group.toString() === groupFilter}
				{...args}
			/>
		</>
	);
}