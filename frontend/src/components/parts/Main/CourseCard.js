import DeskGeometricIcon from "../../../static/desk.svg";
import CardButton from "../Cards/CardButton";
import useGlobal from "../GlobalData";
import "./CourseCard.css";

export default function CourseCard() {
	const global = useGlobal();
	const course = global.data.course;

	return (
		<CardButton Icon={DeskGeometricIcon}>
			<div className="course-card-content">
				<h2 className="course-card-label">{course.name || "No Course Selected"}</h2>
			</div>
		</CardButton>
	);
}