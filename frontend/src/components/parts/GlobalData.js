import { createContext, useContext, useEffect, useState } from "react";

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

function GenerateContext(context, contextTemplate, helperGenerator, useDataSync) {
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
		const useSync = typeof useDataSync === "function" ? useDataSync : () => {};

		const value = {
			...data,
			...helpers,
			update
		};

		useSync(value);

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
		},
		clear: () => {
			update({
				course: courseTemplate.course,
				courseCache: courseTemplate.courseCache
			});
		}
	}
}, data => {
	const { SERVER_URL, apiHeader } = useEnvironment();

	// TODO: Add error handling
	useEffect(() => {
		if(!data.course.id) return;

		console.log("Regenerating course data...");
		// TODO: Regenerate data and cache the course
		// NOTE: Both fetches are fire and forget

		Promise.all([
			// Regenerate group categories (userGroups)
			fetch(`${SERVER_URL}/course/${data.course.id}/groups/categories`, {
				headers: apiHeader
			}).then(async res => {
				if(res.status !== 200) throw new Error("HTTP Status not 200");

				return await res.json();
			}),

			// Regenerate assignments
			fetch(`${SERVER_URL}/course/${data.course.id}/assignments`, {
				headers: apiHeader
			})
				.then(async res => {
					if(res.status !== 200) throw new Error("HTTP Status not 200");

					const assignmentsList = await res.json();
					const sortedAssignmentsList = assignmentsList.sort((assignmentA, assignmentB) => {
						if(assignmentA.group !== assignmentB.group) {
							return assignmentA.group - assignmentB.group;
						}
						return assignmentA.group_position - assignmentB.group_position;
					});

					const newGroups = [];
					for(const assignment of assignmentsList) {
						if(!newGroups.find(group => group.id === assignment.group)) {
							newGroups.push({ name: assignment.group_name, id: assignment.group });
						}
					}

					return {
						groups: newGroups,
						all: sortedAssignmentsList
					};
				})
		]).then(([newUserGroups, newAssignments]) => {
			console.log([newUserGroups, newAssignments])
			data.update({
				course: {
					...data.course,
					assignments: newAssignments,
					userGroups: newUserGroups
				}
			});
			console.log("Successfully fetched course data")
		});
	}, [data.course.id, SERVER_URL, apiHeader]);
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