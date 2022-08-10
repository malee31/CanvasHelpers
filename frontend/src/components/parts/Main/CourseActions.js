import useGlobal from "../GlobalData";
import "./CourseActions.css";

export default function CourseActions() {
	const global = useGlobal();
	const course = global.data.course;
	if(!course.id) return null;

	const exportUsers = () => {
		console.log("Export users");
		// TODO: Have the server return a CSV with a download header
		// window.open(`${global.data.SERVER_URL}/course/${course.id}/users`, "_blank");
	};

	const openCanvas = () => {
		window.open(`https://canvas.ucdavis.edu/courses/${course.id}`, "_blank");
	}

	return (
		<div className="course-actions">
			<button
				className="course-action-button"
				onClick={exportUsers}
			>
				Export Users as CSV
			</button>
			<button
				className="course-action-button"
				onClick={openCanvas}
			>
				Open on Canvas
			</button>
		</div>
	);
}