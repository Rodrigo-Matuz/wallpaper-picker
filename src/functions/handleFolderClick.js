import { invoke } from "@tauri-apps/api/core";
import { appDataDir } from "@tauri-apps/api/path";
import { writeConfig } from "./writeConfig";

export async function handleFolderClick(
	// setLoading,
	setThumbnails,
	path = null,
) {
	// setLoading(true);
	try {
		const appDataDirPath = await appDataDir();

		const [thumbnailsJson, selectedPath] = await invoke("get_wallpapers", {
			appDataDirPath,
			path,
		});

        // console.log("Wallpaper Clicked");

		const thumbnailsData = JSON.parse(thumbnailsJson);

		setThumbnails(thumbnailsData);

		await writeConfig("wallpapers_path", selectedPath);
	} catch {
        console.log("Error")
    }
    // finally {
		// setLoading(false);
	// }
}
