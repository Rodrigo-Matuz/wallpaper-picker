import { invoke } from "@tauri-apps/api/core";
import { readConfig } from "./readConfig";
import { writeConfig } from "./writeConfig";

export async function handleThumbnailClick(videoPath) {
	const configFile = await readConfig();
	const command = configFile.command;
	if (!command) {
		writeConfig("command", "echo $USER");
	} else {
		await invoke("call_command", { command: command, path: videoPath });
	}
}
