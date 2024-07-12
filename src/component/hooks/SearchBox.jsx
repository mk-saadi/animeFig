import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigation } from "react-router-dom";

const SearchBox = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const history = useNavigation();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_URL}/figures/search_box`, {
					params: {
						name: searchQuery,
						category: searchQuery,
						series: searchQuery,
					},
				});
				setSearchResults(response.data);
			} catch (error) {
				console.error("Error fetching search results:", error);
				setSearchResults([]);
			}
		};

		if (searchQuery.trim() !== "") {
			fetchData();
		} else {
			setSearchResults([]);
		}
	}, [searchQuery]);

	const handleResultClick = (item) => {
		history.push(`/collections?id=${item._id}`);
	};

	return (
		<div className="relative min-h-screen">
			<input
				type="text"
				placeholder="Search by name, category, or series..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			/>
			{searchResults.length > 0 && (
				<div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
					{searchResults.map((item) => (
						<Link
							key={item._id}
							className="p-2 cursor-pointer hover:bg-gray-100"
							onClick={() => handleResultClick(item)}
							to={`/collections/${item.link}`}
						>
							<p className="text-sm font-medium text-gray-900">{item.name}</p>
							<p className="text-xs text-gray-500">{item.link}</p>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchBox;
