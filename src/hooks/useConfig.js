import { useState, useEffect } from "react";
import { readConfig } from "../functions/readConfig";

export const useConfig = () => {
	const [commandValue, setCommandValue] = useState("");
	const [checkboxValue, setCheckboxValue] = useState(true);

	useEffect(() => {
		const fetchConfig = async () => {
			try {
				const configFile = await readConfig();
				const currentCommand = configFile.command;
				const autoFindWallpapers = configFile.autoFindWallpapers ?? true;
				if (currentCommand) {
					setCommandValue(currentCommand);
				}
				setCheckboxValue(autoFindWallpapers);
			} catch (error) {
				console.error("Failed to fetch configuration at input settings", error);
			}
		};
		fetchConfig();
	}, []);

	return {
		commandValue,
		setCommandValue,
		checkboxValue,
		setCheckboxValue,
	};
};
