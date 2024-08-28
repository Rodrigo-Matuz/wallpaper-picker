import styles from "./Header.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({
	leftIcon: LeftIcon = null,
	rightIcon: RightIcon = null,
	leftOnClick = () => {},
	inputPlaceholder = "Search Wallpapers...",
	showInput = true,
	linkToRight = "/settings",
	onInputChange = () => {},
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleRightClick = () => {
		navigate(linkToRight);
	};

	const isSettingsPage = location.pathname === "/settings";

	return (
		<div className={styles.div}>
			{LeftIcon && (
				<button className={styles.button} onClick={leftOnClick}>
					<LeftIcon size={25} />
				</button>
			)}
			{showInput && (
				<input
					className={styles.input}
					placeholder={inputPlaceholder}
					autoFocus
					disabled={isSettingsPage}
					onChange={onInputChange}
				/>
			)}
			{RightIcon && (
				<button className={styles.button} onClick={handleRightClick}>
					<RightIcon size={25} />
				</button>
			)}
		</div>
	);
};

export default Header;
