import React, { useState, useEffect } from "react";
// import { collectionsFigures } from "../hooks/APIS";
import Products from "../prouducts/Products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const Collections = () => {
	const [figures, setFigures] = useState([]);
	const [filteredFigures, setFilteredFigures] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFigures = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(`${import.meta.env.VITE_URL}/figures/collections`);
				setFigures(response.data.figures);
				setFilteredFigures(response.data.figures);
				setIsLoading(false);
			} catch (error) {
				setError(error);
				setIsLoading(false);
			}
		};

		fetchFigures();
	}, []);

	useEffect(() => {
		const lowercasedFilter = searchQuery.toLowerCase();
		const filteredData = figures.filter((item) => {
			return Object.keys(item).some(
				(key) => typeof item[key] === "string" && item[key].toLowerCase().includes(lowercasedFilter)
			);
		});
		setFilteredFigures(filteredData);
	}, [searchQuery, figures]);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<div className="flex px-4 py-2 bg-blue-400 sm:px-10 flex-nowrap">
				<input
					type="text"
					placeholder="Search figures"
					onChange={handleSearchChange}
					value={searchQuery}
					className="w-full rounded-none rounded-l-sm input input-bordered input-accent"
				/>
			</div>

			<div className="min-h-screen">
				<div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
					{filteredFigures.map((fig) => (
						<Products
							key={fig._id}
							fig={fig}
							isLoading={isLoading}
						></Products>
					))}
				</div>
			</div>
		</div>
	);
};

export default Collections;
