import { Button, Checkbox } from "@mui/material";
import React, { useState } from "react";
import styles from "../SettingsOption/SettingsOption.module.css";

const SettingsOption = ({
	Name,
	HintIcon,
	type,
	Hint,
	placeholderText,
	value,
	onValueChange,
	checked,
	onCheckedChange,
	onButtonClick,
	ButtonName,
}) => {
	const [displayHint, setDisplayHint] = useState(false);

	function hintButtonClick() {
		setDisplayHint((prevDisplayHint) => !prevDisplayHint);
	}

	const handleChange = (event) => {
		if (type === "checkbox") {
			onCheckedChange(event.target.checked);
		} else if (type === "textfield") {
			onValueChange(event.target.value);
		}
	};

	return (
		<>
			<div className={styles.TitleContainer}>
				<button
					type="button"
					className={styles.HintIcon}
					onClick={hintButtonClick}
				>
					{HintIcon}
				</button>
				<h2 className={styles.Name}>{Name}</h2>
				<div className={styles.Line} />
				{type === "checkbox" ? (
					<Checkbox
						checked={checked}
						onChange={handleChange}
						size="large"
						sx={{
							color: "var(--primary-accent-color)",
							"&.Mui-checked": {
								color: "var(--primary-accent-color)",
							},
						}}
					/>
				) : type === "textfield" ? (
					<input
						className={styles.Input}
						type="text"
						value={value}
						onChange={handleChange}
						placeholder={placeholderText}
					/>
				) : type === "button" ? (
					<Button
						variant="contained"
						onClick={onButtonClick}
						sx={{
							backgroundColor: "var(--primary-accent-color)",
						}}
					>
						{ButtonName}
					</Button>
				) : null}
			</div>
			{displayHint && <p className={styles.Hint}>{Hint}</p>}
		</>
	);
};

export default SettingsOption;
