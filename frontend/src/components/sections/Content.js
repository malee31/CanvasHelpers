import CourseCard from "../parts/Main/CourseCard";
import CourseActions from "../parts/Main/CourseActions";
import "./Content.css";
import GroupCategoryCard from "../parts/Main/GroupCategoryCard";

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