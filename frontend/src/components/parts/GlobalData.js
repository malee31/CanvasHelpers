import { createContext, useContext, useState } from "react";

const savedAPIKey = localStorage.getItem("CANVAS_API_KEY") || "";
const defaultContextValue = {
	data: {
		apiKey: savedAPIKey,
		apiHeader: savedAPIKey ? { "Authorization": `Bearer ${savedAPIKey}` } : {},
		SERVER_URL: "http://localhost:8000",
		course: {
			name: "",
			id: null
		},
		leftNavOpen: false,
		rightNavOpen: false,
		logEvents: []
	},
	update: () => {},
	addLog: () => {}
};

const globalDataContext = createContext(defaultContextValue);

export function GlobalContext({ children }) {
	const [globals, setGlobals] = useState({ ...defaultContextValue.data });

	const updateGlobal = newVal => {
		setGlobals(oldVal => {
			return {
				...oldVal,
				...newVal
			};
		});
	};

	const globalValue = {
		data: globals,
		update: updateGlobal,
		addLog: (newLog, action) => {
			if(action) action();

			updateGlobal({
				rightNavOpen: true,
				logEvents: [
					...globals.logEvents,
					{
						...newLog,
						fire: action
					}
				]
			});
		}
	};

	return (
		<globalDataContext.Provider value={globalValue}>
			{children}
		</globalDataContext.Provider>
	);
}

export function saveAPIKey(global, newAPIKey) {
	if(!newAPIKey) localStorage.removeItem("CANVAS_API_KEY");
	else localStorage.setItem("CANVAS_API_KEY", newAPIKey);
	global.update({
		apiKey: newAPIKey,
		apiHeader: {
			"Authorization": `Bearer ${newAPIKey}`
		}
	});
}

export default function useGlobal() {
	return useContext(globalDataContext);
}