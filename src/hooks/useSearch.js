import { useState, useEffect } from "react";

const useSearch = (thumbnails, searchQuery) => {
	const [filteredThumbnails, setFilteredThumbnails] = useState({});

	useEffect(() => {
		const filtered = Object.keys(thumbnails)
			.filter((key) => key.toLowerCase().includes(searchQuery.toLowerCase()))
			.reduce((result, key) => {
				result[key] = thumbnails[key];
				return result;
			}, {});

		setFilteredThumbnails(filtered);
	}, [searchQuery, thumbnails]);

	return filteredThumbnails;
};

export default useSearch;
