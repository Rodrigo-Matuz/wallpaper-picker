import { appDataDir } from "@tauri-apps/api/path";
import { readFile } from "@tauri-apps/plugin-fs";
import React, { useState, useEffect } from "react";
import styles from "./Display.module.css";

const Display = ({ thumbnails, onThumbnailClick }) => {
	const [imageData, setImageData] = useState({});

	// When thumbnails receive the JSON
	useEffect(() => {
		const loadImages = async () => {
			const appDataDirPath = await appDataDir();
			const newImageData = {};

			for (const [thumbName, videoPath] of Object.entries(thumbnails)) {
				try {
					const thumbPath = `${appDataDirPath}/thumbnails/${thumbName}`;
					const fileData = await readFile(thumbPath);
					const blob = new Blob([fileData]);
					const imageUrl = URL.createObjectURL(blob);
					newImageData[thumbName] = imageUrl;
				} catch (error) {
					console.error(`Failed to load image at ${thumbName}`, error);
				}
			}
			setImageData(newImageData);
		};

		loadImages();
	}, [thumbnails]);

	// Handle click and keyboard events
	const handleInteraction = (videoPath) => {
		onThumbnailClick(videoPath);
	};

	// Handle key down events for accessibility
	const handleKeyDown = (event, videoPath) => {
		if (event.key === "Enter" || event.key === " ") {
			handleInteraction(videoPath);
		}
	};

	return (
		<div className={styles.div}>
			{Object.entries(thumbnails).map(([thumbName, videoPath]) => (
				<div
					key={thumbName}
					className={styles.thumbnailContainer}
					tabIndex={0}
					role="button"
					onClick={() => handleInteraction(videoPath)}
					onKeyDown={(event) => handleKeyDown(event, videoPath)}
				>
					{/* biome-ignore lint/a11y/useAltText: I don't want to put an alt text >:( */}
					<img src={imageData[thumbName]} className={styles.thumbnail} />
				</div>
			))}
		</div>
	);
};

export default Display;
