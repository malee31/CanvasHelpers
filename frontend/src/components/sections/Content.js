import CourseCard from "../mechanisms/Main/CourseCard";
import CourseActions from "../parts/CourseActions";
import "./Content.css";
import GroupCategoryCard from "../mechanisms/Main/GroupCategoryCard";

export default function Content() {
	return (
		<main>
			<div className="main-content">
				<CourseCard/>
				<CourseActions/>
				<GroupCategoryCard/>
			</div>
		</main>
	)
}