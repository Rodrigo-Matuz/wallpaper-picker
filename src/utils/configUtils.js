import { BaseDirectory, remove } from "@tauri-apps/plugin-fs";

export const clearConfig = async () => {
	try {
		const configFilePath = "config.json";
		await remove(configFilePath, { baseDir: BaseDirectory.AppConfig });
		console.log("Configuration file deleted successfully.");
	} catch (error) {
		console.error("Failed to delete the configuration file.", error);
	}
};

export const clearThumbnails = async () => {
	try {
		const thumbnailsPath = "thumbnails";
		await remove(thumbnailsPath, {
			baseDir: BaseDirectory.AppLocalData,
			recursive: true,
		});
		console.log("All thumbnails deleted successfully.");
	} catch (error) {
		console.error("Failed to delete thumbnails.", error);
	}
};
