import {
	exists,
	BaseDirectory,
	open,
	readTextFile,
} from "@tauri-apps/plugin-fs";

export async function readConfig() {
	const configFilePath = "config.json";
	let configData = {};

	if (await exists(configFilePath, { baseDir: BaseDirectory.AppConfig })) {
		const configFile = await open(configFilePath, {
			baseDir: BaseDirectory.AppConfig,
			read: true,
		});

		const fileContent = await readTextFile(configFilePath, {
			baseDir: BaseDirectory.AppConfig,
		});
		configData = JSON.parse(fileContent);

		await configFile.close();
	} else {
		configData = {};
	}

	return configData;
}
