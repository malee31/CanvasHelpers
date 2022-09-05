import { createContext, useContext, useState } from "react";

const savedAPIKey = localStorage.getItem("CANVAS_API_KEY") || "";

const environmentTemplate = {
	apiKey: savedAPIKey,
	apiHeader: savedAPIKey ? { "Authorization": `Bearer ${savedAPIKey}` } : {},
	SERVER_URL: "http://localhost:8000",
	saveAPIKey: () => {},
	update: () => {}
};

const displayTemplate = {
	leftNavOpen: false,
	rightNavOpen: false,
	logEvents: [],
	addLog: () => {},
	update: () => {}
};

const courseTemplate = {
	course: {
		name: "",
		id: null,
		assignments: {
			groups: null,
			all: null
		},
		userGroups: null
	},
	courseCache: {},
	setCourse: () => {},
	clear: () => {},
	update: () => {}
};

const environmentContext = createContext(environmentTemplate);
const displayContext = createContext(displayTemplate);
const courseContext = createContext(courseTemplate);

function GenerateContext(context, contextTemplate, helperGenerator) {
	return ({ children }) => {
		const [data, setData] = useState({ ...contextTemplate });

		const update = newVal => {
			setData(oldVal => {
				return {
					...oldVal,
					...newVal
				};
			});
		};

		const helpers = typeof helperGenerator === "function" ? helperGenerator({ data, setData, update }) : {};

		const value = {
			...data,
			...helpers,
			update
		};

		return (
			<context.Provider value={value}>
				{children}
			</context.Provider>
		);
	}
}

const EnvironmentContext = GenerateContext(environmentContext, environmentTemplate, ({ update }) => {
	return {
		saveAPIKey: newAPIKey => {
			if(!newAPIKey) localStorage.removeItem("CANVAS_API_KEY");
			else localStorage.setItem("CANVAS_API_KEY", newAPIKey);
			update({
				apiKey: newAPIKey,
				apiHeader: {
					"Authorization": `Bearer ${newAPIKey}`
				}
			});
		}
	}
});
const DisplayContext = GenerateContext(displayContext, displayTemplate, ({ data, update }) => {
	return {
		addLog: (newLog, action) => {
			update({
				rightNavOpen: true,
				logEvents: [
					...data.logEvents,
					{
						...newLog,
						fire: action
					}
				]
			});
		}
	}
});
const CourseContext = GenerateContext(courseContext, courseTemplate, ({ data, update }) => {
	return {
		setCourse: (courseID, courseName) => {
			const cached = data.courseCache[courseID];
			if(cached) {
				update({ course: cached });
				return;
			}

			const newCourse = {
				name: courseName,
				id: courseID,
				assignments: {
					groups: null,
					all: null
				},
				userGroups: null
			};

			update({
				course: newCourse,
				courseCache: {
					...data.courseCache,
					[courseID]: newCourse
				}
			});
			// TODO: Load assignments and userGroups
		},
		clear: () => {
			update({
				course: courseTemplate.course,
				courseCache: courseTemplate.courseCache
			});
		}
	}
});

export const useEnvironment = () => useContext(environmentContext);
export const useDisplay = () => useContext(displayContext);
export const useCourse = () => useContext(courseContext);

export function GlobalContexts({ children }) {
	return (
		<DisplayContext>
			<EnvironmentContext>
				<CourseContext>
					{children}
				</CourseContext>
			</EnvironmentContext>
		</DisplayContext>
	);
}