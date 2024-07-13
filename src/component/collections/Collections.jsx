import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const Collections = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [figures, setFigures] = useState([]);
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
			extractFilters(response.data.figures);
		} catch (error) {
			console.error("Error fetching figures:", error);
		}
	};

	const extractFilters = (figures) => {
		const categories = [...new Set(figures.map((fig) => fig.category))];
		const series = [...new Set(figures.map((fig) => fig.series))];
		const characters = [...new Set(figures.map((fig) => fig.character))];
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
		const updatedParams = { ...filters, [name]: value };
		setFilters(updatedParams);
		setSearchParams(updatedParams);
	};

	const handleSortChange = (sort) => {
		const newOrder = filters.order === "asc" ? "desc" : "asc";
		setFilters({ ...filters, sort, order: newOrder });
		setSearchParams({ ...filters, sort, order: newOrder });
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
							className={filters.category === category ? "active" : ""}
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
			<div className="figures">
				{figures.map((figure) => (
					<div key={figure._id}>
						<Link to={`/collections/${figure.link}`}>
							<p>{figure.name}</p>
							{/* Render other figure details */}
						</Link>
					</div>
				))}
			</div>
			<div className="pagination">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i + 1}
						onClick={() => handlePageChange(i + 1)}
						className={currentPage === i + 1 ? "active" : ""}
					>
						{i + 1}
					</button>
				))}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Collections;
