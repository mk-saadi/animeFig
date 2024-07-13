import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import Products from "../prouducts/Products";
import Pagination from "../hooks/Pagination";

const Collections = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [figures, setFigures] = useState([]);
	const [allFigures, setAllFigures] = useState([]); // State for all figures
	const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
	const [totalPages, setTotalPages] = useState(1);
	const [filters, setFilters] = useState({
		name: "",
		category: "",
		series: "",
		character: "",
		sort: "",
		order: "asc",
	});
	const [categories, setCategories] = useState([]);
	const [series, setSeries] = useState([]);
	const [characters, setCharacters] = useState([]);

	const fetchFigures = async (params) => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_URL}/figures/all`, { params });
			setFigures(response.data.figures);
			setTotalPages(response.data.totalPages);

			// Only set all figures when fetching the first page
			if (currentPage === 1) {
				setAllFigures(response.data.figures);
				extractFilters(response.data.figures);
			}
		} catch (error) {
			console.error("Error fetching figures:", error);
		}
	};

	const extractFilters = () => {
		const categories = [...new Set(allFigures.map((fig) => fig.category))];
		const series = [...new Set(allFigures.map((fig) => fig.series))];
		const characters = [...new Set(allFigures.map((fig) => fig.character))];
		setCategories(categories);
		setSeries(series);
		setCharacters(characters);
	};

	useEffect(() => {
		const params = Object.fromEntries([...searchParams]);
		fetchFigures(params);
	}, [searchParams]);

	const handlePageChange = (page) => {
		setSearchParams({ ...Object.fromEntries([...searchParams]), page });
		setCurrentPage(page);
	};

	const handleFilterChange = (name, value) => {
		const updatedParams = { ...filters, [name]: value, page: 1 }; // Reset to page 1 on filter change
		setFilters(updatedParams);
		setSearchParams(updatedParams);
	};

	const handleSortChange = (sort) => {
		const newOrder = filters.order === "asc" ? "desc" : "asc";
		const updatedParams = { ...filters, sort, order: newOrder, page: 1 }; // Reset to page 1 on sort change
		setFilters(updatedParams);
		setSearchParams(updatedParams);
	};

	return (
		<div>
			<div className="filter-controls">
				<input
					type="text"
					name="name"
					placeholder="Search by name"
					value={filters.name}
					onChange={(e) => handleFilterChange("name", e.target.value)}
				/>
				<div className="filter-options">
					<h4>Categories:</h4>
					{categories.map((category) => (
						<button
							key={category}
							className={` px-3 ${filters.category === category ? "active" : ""}`}
							onClick={() => handleFilterChange("category", category)}
						>
							{category}
						</button>
					))}
					<h4>Series:</h4>
					{series.map((serie) => (
						<button
							key={serie}
							className={filters.series === serie ? "active" : ""}
							onClick={() => handleFilterChange("series", serie)}
						>
							{serie}
						</button>
					))}
					<h4>Characters:</h4>
					{characters.map((character) => (
						<button
							key={character}
							className={filters.character === character ? "active" : ""}
							onClick={() => handleFilterChange("character", character)}
						>
							{character}
						</button>
					))}
					<h4>Sort by price:</h4>
					<button onClick={() => handleSortChange("price")}>
						Price {filters.order === "asc" ? "High to Low" : "Low to High"}
					</button>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
				{figures.map((fig) => (
					<Products
						key={fig._id}
						fig={fig}
					/>
				))}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				handlePageChange={handlePageChange}
			/>
		</div>
	);
};

export default Collections;
