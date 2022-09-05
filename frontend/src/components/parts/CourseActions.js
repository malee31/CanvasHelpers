import { useCourse, useEnvironment } from "./GlobalData";
import BetterButton from "./BetterButton";
import "./CourseActions.css";

function downloadBlob(blob, fileName) {
	const assignmentsCSV = new File([blob], fileName);
	const downloadURL = window.URL.createObjectURL(assignmentsCSV);
	let tempLink = document.createElement('a');
	tempLink.style.display = "none";
	tempLink.href = downloadURL;
	tempLink.download = fileName;
	document.body.appendChild(tempLink);
	tempLink.click();
	tempLink.parentElement.removeChild(tempLink);
}

export default function CourseActions() {
	const environment = useEnvironment();
	const { course } = useCourse();
	const { SERVER_URL, apiHeader } = environment;
	if(!course.id) return null;

	const exportUsers = () => {
		console.log("Export users");
		// TODO: Have the server return a CSV with a download header
		fetch(`${SERVER_URL}/course/${course.id}/users`, {
			headers: apiHeader
		}).then(res => {
			if(res.status === 200) {
				return res.blob();
			}
			console.log(res);
			throw new Error(`Unexpected Response: HTTP ${res.status} ${res.statusText}`);
		}).then(blob => {
			downloadBlob(blob, `Users-${course.name}-${course.id}.csv`);
		});
	};

	const exportAssignments = () => {
		console.log("Exporting assignments");
		fetch(`${SERVER_URL}/course/${course.id}/assignments/csv`, {
			headers: apiHeader
		}).then(res => {
			if(res.status === 200) {
				return res.blob();
			}
			console.log(res);
			throw new Error(`Unexpected Response: HTTP ${res.status} ${res.statusText}`);
		}).then(blob => {
			downloadBlob(blob, `Assignments-${course.name}-${course.id}.csv`);
		});
	};

	const openCanvas = () => {
		window.open(`https://canvas.ucdavis.edu/courses/${course.id}`, "_blank");
	}

	return (
		<div className="course-actions">
			<BetterButton
				className="course-action-button"
				onClick={openCanvas}
			>
				Open on Canvas
			</BetterButton>
			<BetterButton
				className="course-action-button"
				onClick={exportUsers}
			>
				Export Users as CSV
			</BetterButton>
			<BetterButton
				className="course-action-button"
				onClick={exportAssignments}
			>
				Export Assignments as CSV
			</BetterButton>
		</div>
	);
}