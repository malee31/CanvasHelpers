import useGlobal from "../parts/GlobalData";
import CourseCard from "../parts/Main/CourseCard";
import CourseActions from "../parts/Main/CourseActions";
import "./Content.css";

export default function Content() {
	const global = useGlobal();
	const { course } = global.data;

	return (
		<main>
			<div className="main-content">
				<CourseCard/>
				<CourseActions/>
			</div>
		</main>
	)
}