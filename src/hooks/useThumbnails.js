import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { appDataDir } from "@tauri-apps/api/path";
import { readConfig } from "../functions/readConfig";
import { writeConfig } from "../functions/writeConfig";

const useThumbnails = () => {
	const [thumbnails, setThumbnails] = useState({});
	// const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchConfig = async () => {
			try {
				// setLoading(true);
				const configFile = await readConfig();
				const wallpapers_path = configFile.wallpapers_path;
				const autoFindWallpapers = configFile.autoFindWallpapers;
				const savedThumbnails = configFile.thumbnails;

				if (autoFindWallpapers) {
					if (wallpapers_path) {
						const [thumbnailsJson, _] = await invoke("get_wallpapers", {
							appDataDirPath: await appDataDir(),
							path: wallpapers_path,
						});

						let thumbnailsData = JSON.parse(thumbnailsJson);
						thumbnailsData = Object.keys(thumbnailsData)
							.sort()
							.reduce((sortedObj, key) => {
								sortedObj[key] = thumbnailsData[key];
								return sortedObj;
							}, {});

						setThumbnails(thumbnailsData);
						await writeConfig("thumbnails", thumbnailsData);
					} else {
						console.warn("Wallpapers path is not available.");
					}
				} else {
					if (savedThumbnails) {
						const sortedThumbnails = Object.keys(savedThumbnails)
							.sort()
							.reduce((sortedObj, key) => {
								sortedObj[key] = savedThumbnails[key];
								return sortedObj;
							}, {});

						setThumbnails(sortedThumbnails);
					} else {
						console.warn("No thumbnails found in the configuration.");
					}
				}
			} catch (error) {
				console.error("Failed to fetch configuration or thumbnails:", error);
			}
			//          finally {
			// 	setLoading(false);
			// }
		};

		fetchConfig();
	}, []);

	return { thumbnails, setThumbnails };
};

export default useThumbnails;
