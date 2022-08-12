import CourseCard from "./Main/CourseCard";
import CourseActions from "../parts/CourseActions";
import "./Content.css";
import GroupCategoryCard from "./Main/GroupCategoryCard";
import QualtricsSyncStudentCard from "./Main/QualtricsSyncStudentCard";
import QualtricsSyncSurveyCard from "./Main/QualtricsSyncSurveyCard";
import CreateKudos from "./Main/CreateKudos";
import ScoreKudos from "./Main/ScoreKudos";

export default function Content() {
	return (
		<main>
			<div className="main-content">
				<CourseCard/>
				<CourseActions/>
				<QualtricsSyncStudentCard/>
				<QualtricsSyncSurveyCard/>
				<GroupCategoryCard/>
				<CreateKudos/>
				<ScoreKudos/>
			</div>
		</main>
	)
}