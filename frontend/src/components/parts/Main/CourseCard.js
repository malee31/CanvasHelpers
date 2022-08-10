import DeskGeometricIcon from "../../../static/desk.svg";
import CardButton from "../Cards/CardButton";
import useGlobal from "../GlobalData";
import "./CourseCard.css";
import { useEffect, useState } from "react";

export default function CourseCard() {
	const global = useGlobal();
	const course = global.data.course;
	const [open, setOpen] = useState(true);
	const [courses, setCourses] = useState(null);
	const changeCourse = course => {
		global.update({
			course: {
				name: course.name,
				id: course.id
			}
		});
		setOpen(false);
	};

	const API_KEY = global.data.apiKey;
	useEffect(() => {
		fetch("http://localhost:8000/courses", API_KEY ? {
			headers: {
				"Authorization": `Bearer ${API_KEY}`
			}
		} : undefined)
			.then(res => res.json())
			.then(newCourses => setCourses(newCourses))
			.catch(console.error);
	}, [API_KEY]);

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
			<div className={`course-card-select-wrapper ${open ? "course-card-select-wrapper-open" : ""}`}>
				<div className="course-card-select">
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