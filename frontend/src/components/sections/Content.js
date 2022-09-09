import APIKeyCard from "./Main/APIKeyCard";
import CourseCard from "./Main/CourseCard";
import CourseActions from "../parts/CourseActions";
import "./Content.css";
import GroupCategoryCard from "./Main/GroupCategoryCard";
import QualtricsSyncStudentCard from "./Main/QualtricsSyncStudentCard";
import QualtricsSyncSurveyCard from "./Main/QualtricsSyncSurveyCard";
import CreateKudos from "./Main/CreateKudos";
import ScoreKudos from "./Main/ScoreKudos";
import { useEffect, useState } from "react";

function shouldPad() {
	return window.location.hash && window.location.hash.length > 1;
}

export default function Content() {
	const [extraPadding, setExtraPadding] = useState(shouldPad());

	useEffect(() => {
		const listener = e => {
			const padState = shouldPad();
			if(padState !== extraPadding) setExtraPadding(padState);
		};

		window.addEventListener("hashchange", listener);
		return () => window.removeEventListener("hashchange", listener);
	}, []);

	return (
		<main>
			<div
				className="main-content"
				style={{
					paddingBottom: extraPadding ? "20rem" : ""
				}}
			>
				<APIKeyCard/>
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