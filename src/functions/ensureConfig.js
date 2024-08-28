import {
	exists,
	BaseDirectory,
	create,
	open,
	writeTextFile,
	readTextFile,
	mkdir,
} from "@tauri-apps/plugin-fs";

export async function ensureConfig() {
	const configFilePath = "config.json";
	const defaultConfig = {
		command: "",
		autoFindWallpapers: true,
		wallpapers_path: "",
		thumbnails: {},
	};

	try {
        await mkdir("wallpaper-picker", { baseDir: BaseDirectory.Config })
		console.log("Did");
	} catch (error) {
		console.error("Failed to create AppConfig directory:", error);
		return;
	}

	if (!(await exists(configFilePath, { baseDir: BaseDirectory.AppConfig }))) {
		const file = await create(configFilePath, {
			baseDir: BaseDirectory.AppConfig,
		});
		await writeTextFile(
			configFilePath,
			JSON.stringify(defaultConfig, null, 4),
			{
				baseDir: BaseDirectory.AppConfig,
			},
		);
		await file.close();
	} else {
		const configFile = await open(configFilePath, {
			baseDir: BaseDirectory.AppConfig,
			read: true,
			write: true,
		});
		const fileContent = await readTextFile(configFilePath, {
			baseDir: BaseDirectory.AppConfig,
		});
		const configData = JSON.parse(fileContent);

		for (const [key, value] of Object.entries(defaultConfig)) {
			if (!(key in configData)) {
				configData[key] = value;
			}
		}

		await writeTextFile(configFilePath, JSON.stringify(configData, null, 4), {
			baseDir: BaseDirectory.AppConfig,
		});
		await configFile.close();
	}
}
