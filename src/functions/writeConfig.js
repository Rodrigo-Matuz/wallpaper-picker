import {
	exists,
	BaseDirectory,
	create,
	open,
	writeTextFile,
	readTextFile,
} from "@tauri-apps/plugin-fs";

export async function writeConfig(key, value) {
	const configFilePath = "config.json";
	let configData = {};

	if (await exists(configFilePath, { baseDir: BaseDirectory.AppConfig })) {
		const configFile = await open(configFilePath, {
			baseDir: BaseDirectory.AppConfig,
			read: true,
			write: true,
		});

		const fileContent = await readTextFile(configFilePath, {
			baseDir: BaseDirectory.AppConfig,
		});
		configData = JSON.parse(fileContent);

		await configFile.close();
	} else {
		const file = await create(configFilePath, {
			baseDir: BaseDirectory.AppConfig,
		});
		await file.close();
	}

	configData[key] = value;

	await writeTextFile(configFilePath, JSON.stringify(configData, null, 4), {
		baseDir: BaseDirectory.AppConfig,
	});
}
