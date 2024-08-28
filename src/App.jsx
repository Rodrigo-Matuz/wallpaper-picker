import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Display from "./components/Display/Display";
import { LuFolderSearch2 } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
import useThumbnails from "./hooks/useThumbnails";
import useSearch from "./hooks/useSearch";
import styles from "./styles/RootPage.module.css";
import { handleFolderClick } from "./functions/handleFolderClick";
import { handleThumbnailClick } from "./functions/handleThumbnailClick";
import { ensureConfig } from "./functions/ensureConfig"

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const { thumbnails, setThumbnails } = useThumbnails();
	const filteredThumbnails = useSearch(thumbnails, searchQuery);

	useEffect(() => {
		ensureConfig()
	}, []) 
	

	return (
		<div className={styles.container}>
			<div className={styles.mainContent}>
				<Header
					leftIcon={LuFolderSearch2}
					rightIcon={IoSettingsSharp}
					leftOnClick={() => handleFolderClick(setThumbnails)}
					inputPlaceholder="Search Wallpapers..."
					onInputChange={(e) => setSearchQuery(e.target.value)}
					linkToRight="/settings"
				/>
				<Display
					thumbnails={filteredThumbnails}
					onThumbnailClick={handleThumbnailClick}
				/>
			</div>
			<footer className={styles.footer}>Thank you for using the app :3</footer>
		</div>
	);
}

// {loading && <Loading />}
export default App;
