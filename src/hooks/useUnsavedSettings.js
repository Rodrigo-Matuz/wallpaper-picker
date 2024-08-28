import { useState, useEffect } from "react";

export const useUnsavedSettings = (commandValue, checkboxValue) => {
	const [unsavedSettings, setUnsavedSettings] = useState(false);
	const [lazyCount, setLazyCount] = useState(0);

	useEffect(() => {
		setLazyCount((prev) => prev + 1);
		if (lazyCount > 1) {
			setUnsavedSettings(true);
		}
	}, [commandValue, checkboxValue]);

	return { unsavedSettings, setUnsavedSettings };
};
