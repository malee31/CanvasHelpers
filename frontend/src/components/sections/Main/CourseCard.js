import DeskGeometricIcon from "../../../static/desk.svg";
import CardButton from "../../parts/Cards/CardButton";
import useGlobal from "../../parts/GlobalData";
import "./CourseCard.css";
import { useEffect, useState } from "react";

export default function CourseCard() {
	const global = useGlobal();
	const { apiHeader, course } = global.data;
	const [open, setOpen] = useState(true);
	const [courses, setCourses] = useState(null);
	const [errorMessage, setErrorMessage] = useState("Loading...");
	const changeCourse = course => {
		global.update({
			course: {
				name: course.name,
				id: course.id
			}
		});
		setOpen(false);
	};

	useEffect(() => {
		fetch(`${global.data.SERVER_URL}/courses`, {
			headers: apiHeader
		})
			.then(async res => {
				if(res.status === 200) {
					const newCourses = await res.json();
					setCourses(newCourses);
					return;
				}
				if(courses) setCourses(null);
				setErrorMessage(`${res.status}: ${res.statusText} (Check API Key)`);
			})
			.catch(err => setErrorMessage(`${err.code}: ${err.message}`));
	}, [apiHeader]);

	return (
		<>
			<CardButton
				className="course-card-display"
				Icon={DeskGeometricIcon}
				onClick={() => setOpen(!open)}
			>
				<div className="course-card-content">
					<div className="course-card-label">{course.name || "No Course Selected"}</div>
					<div>Course ID: {course.id || "N/A"}</div>
				</div>
			</CardButton>
			<div className={`course-card-select-wrapper ${!course.id || open ? "course-card-select-wrapper-open" : ""}`}>
				<div className="course-card-select">
					{!Array.isArray(courses) && (
						<p className="course-card-error-message">{errorMessage}</p>
					)}
					{Array.isArray(courses) && courses.map(course => (
						<div
							className="course-card-option"
							key={course.id}
							onClick={() => changeCourse(course)}
						>
							{course.name}
						</div>
					))}
				</div>
			</div>
		</>
	);
}