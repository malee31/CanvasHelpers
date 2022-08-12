import CourseCard from "../mechanisms/Main/CourseCard";
import CourseActions from "../parts/CourseActions";
import "./Content.css";
import GroupCategoryCard from "../mechanisms/Main/GroupCategoryCard";
import QualtricsSyncStudentCard from "../mechanisms/Main/QualtricsSyncStudentCard";
import QualtricsSyncSurveyCard from "../mechanisms/Main/QualtricsSyncSurveyCard";

export default function Content() {
	return (
		<main>
			<div className="main-content">
				<CourseCard/>
				<CourseActions/>
				<QualtricsSyncStudentCard/>
				<QualtricsSyncSurveyCard/>
				<GroupCategoryCard/>
			</div>
		</main>
	)
}