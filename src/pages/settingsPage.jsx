import { FaRegSave } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { SlQuestion } from "react-icons/sl";
import Divisor from "../components/Divisor/Divisor";
import Header from "../components/Header/Header";
import SettingsOption from "../components/SettingsOption/SettingsOption";
import { writeConfig } from "../functions/writeConfig";
import { useConfig } from "../hooks/useConfig";
import { useUnsavedSettings } from "../hooks/useUnsavedSettings";
import styles from "../styles/SettingsPage.module.css";
import { clearConfig, clearThumbnails } from "../utils/configUtils";

function SettingsPage() {
	const { commandValue, setCommandValue, checkboxValue, setCheckboxValue } =
		useConfig();
	const { unsavedSettings, setUnsavedSettings } = useUnsavedSettings(
		commandValue,
		checkboxValue,
	);

	const handleSaveButton = async () => {
		await writeConfig("command", commandValue);
		await writeConfig("autoFindWallpapers", checkboxValue);
		setUnsavedSettings(false);
	};

	return (
		<>
			<Header
				leftIcon={FaRegSave}
				rightIcon={GrClose}
				inputPlaceholder="Settings"
				linkToRight="/"
				leftOnClick={handleSaveButton}
			/>
			<div className={styles.settingsContainer}>
				{unsavedSettings && <p className={styles.warn}>Unsaved Settings!</p>}
				<SettingsOption
					Name="Command"
					HintIcon={<SlQuestion size={20} />}
					type="textfield"
					Hint={
						<>
							Enter the command you want to use to change your wallpaper. Use
							the <span className={styles.span}>$VP</span> placeholder, which
							will be replaced by the actual video path when you select a
							thumbnail. For example, <span className={styles.span}>$VP</span>{" "}
							will be replaced with{" "}
							<span className={styles.span}>
								"/home/$USER/Pictures/wallpapers/wallpaper_01.mp4"
							</span>
							. This is typically used with{" "}
							<span className={styles.span}>mpvpaper</span>, but you can adapt
							it for your own needs or scripts.
						</>
					}
					placeholderText="Enter your command here using $VP for the video path"
					value={commandValue}
					onValueChange={setCommandValue}
				/>
				<Divisor />
				<SettingsOption
					Name="Search for New Wallpapers"
					HintIcon={<SlQuestion size={20} />}
					type="checkbox"
					Hint={
						<>
							Enable this option to automatically search for and load new
							wallpapers from the selected folder. If disabled, the app may run
							faster because it won’t spend time searching for new files and
							generating new thumbnails.
						</>
					}
					checked={checkboxValue}
					onCheckedChange={setCheckboxValue}
				/>
				<Divisor />
				<SettingsOption
					Name="Clear Thumbnails"
					HintIcon={<SlQuestion size={20} />}
					type="button"
					Hint={
						<>
							This option will delete all generated thumbnails, usually located
							at{" "}
							<span className={styles.span}>
								"/home/$USER/.local/share/wallpaper_picker"
							</span>
							. Use this if you have thumbnails that no longer match any videos.
							<br />
							<br />
							<span className={styles.span}>Note:</span> Thumbnails will need to
							be regenerated after clearing.
						</>
					}
					ButtonName="CLEAR"
					onButtonClick={clearThumbnails}
				/>
				<Divisor />
				<SettingsOption
					Name="Clear Config"
					HintIcon={<SlQuestion size={20} />}
					type="button"
					Hint={
						<>
							This option will delete the configuration file, usually located at{" "}
							<span className={styles.span}>
								"/home/$USER/.config/wallpaper_picker"
							</span>
							. Use this if you want to reset all settings to their defaults.
						</>
					}
					ButtonName="CLEAR"
					onButtonClick={clearConfig}
				/>
			</div>
		</>
	);
}

export default SettingsPage;
