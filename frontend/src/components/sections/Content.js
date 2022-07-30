import Dropdown from "../mechanisms/Dropdown";
import CourseCard from "../parts/Main/CourseCard";
import "./Content.css";

const testData = [
	{
		text: "ECS 36A",
		value: "999"
	},
	{
		text: "ECS 36A",
		value: "99"
	},
	{
		text: "ECS 36A",
		value: "9"
	},
];

export default function Content() {

	return (
		<main>
			<div className="main-content">
				<CourseCard/>
				<Dropdown
					title="Classes"
					items={testData}
					type="select"
				/>
			</div>
		</main>
	)
}