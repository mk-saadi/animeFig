import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import Products from "../prouducts/Products";
import Pagination from "../hooks/Pagination";

const Collections = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [figures, setFigures] = useState([]);
	const [allFigures, setAllFigures] = useState([]);
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

	const fetchAllFigures = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_URL}/figures/all`);
			setAllFigures(response.data.figures);
			// console.log("response : ", response.data.figures);
			extractFilters(response.data.figures);
		} catch (error) {
			console.error("Error fetching all figures:", error);
		}
	};

	const fetchFigures = async (params) => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_URL}/figures/all`, { params });
			setFigures(response.data.figures);
			setTotalPages(response.data.totalPages);
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
		fetchAllFigures();
	}, []);

	useEffect(() => {
		const params = Object.fromEntries([...searchParams]);
		fetchFigures(params);
	}, [searchParams]);

	const handlePageChange = (page) => {
		setSearchParams({ ...Object.fromEntries([...searchParams]), page });
		setCurrentPage(page);
	};

	// const handleFilterChange = (name, value) => {
	// 	const updatedParams = { ...filters, [name]: value, page: 1 }; // Reset page to 1
	// 	setFilters(updatedParams);
	// 	setSearchParams(updatedParams);
	// };
	// useEffect(() => {
	// 	const params = Object.fromEntries([...searchParams]);
	// 	fetchFigures(params);

	// 	const initialCategory = searchParams.get("category");
	// 	if (initialCategory) {
	// 		setFilters({ ...filters, category: initialCategory });
	// 	}
	// }, [searchParams]);
	// ! good code
	// const handleFilterChange = (name, value) => {
	// 	const updatedParams = { ...filters, [name]: value, page: 1 }; // Reset page to 1
	// 	setFilters(updatedParams);
	// 	setSearchParams(updatedParams);
	// };

	// useEffect(() => {
	// 	const params = Object.fromEntries([...searchParams]);
	// 	fetchFigures(params);

	// 	const initialCategory = searchParams.get("category");
	// 	const initialSeries = searchParams.get("series");
	// 	const initialCharacter = searchParams.get("character");

	// 	const newFilters = { ...filters };
	// 	if (initialCategory) newFilters.category = initialCategory;
	// 	if (initialSeries) newFilters.series = initialSeries;
	// 	if (initialCharacter) newFilters.character = initialCharacter;

	// 	setFilters(newFilters);
	// }, [searchParams]);
	const handleFilterChange = (name, value) => {
		const updatedParams = { ...filters, [name]: value, page: 1 }; // Reset page to 1

		// Remove the parameter if the value is empty
		if (value === "") {
			delete updatedParams[name];
		}

		setFilters(updatedParams);
		setSearchParams(updatedParams);
	};

	useEffect(() => {
		const params = Object.fromEntries([...searchParams]);
		fetchFigures(params);

		const initialCategory = searchParams.get("category");
		const initialSeries = searchParams.get("series");
		const initialCharacter = searchParams.get("character");

		const newFilters = { ...filters };
		if (initialCategory) newFilters.category = initialCategory;
		if (initialSeries) newFilters.series = initialSeries;
		if (initialCharacter) newFilters.character = initialCharacter;

		setFilters(newFilters);
	}, [searchParams]);

	const handleSortChange = (sort) => {
		const newOrder = filters.order === "asc" ? "desc" : "asc";
		const updatedParams = { ...filters, sort, order: newOrder, page: 1 }; // Reset to page 1 on sort change
		setFilters(updatedParams);
		setSearchParams(updatedParams);
	};

	return (
		<section>
			<div className="relative grid min-h-screen grid-cols-4 bg-white">
				<div className="col-span-1 ">
					<div className="filter-controls">
						<input
							type="text"
							name="name"
							placeholder="Search by name"
							value={filters.name}
							onChange={(e) => handleFilterChange("name", e.target.value)}
						/>
						<div className="filter-options">
							{/* <h4>Categories:</h4>
							<div className="flex flex-wrap">
								{categories.map((category) => (
									<button
										key={category}
										className={`m-2 px-4 py-2 border ${
											filters.category === category
												? "bg-blue-500 text-white"
												: "bg-white text-black"
										}`}
										onClick={() => handleFilterChange("category", category)}
									>
										{category}
									</button>
								))}
							</div>
							<h4>Series:</h4>
							<div className="flex flex-wrap">
								{series.map((serie) => (
									<button
										key={serie}
										className={`m-2 px-4 py-2 border ${
											filters.series === serie
												? "bg-blue-500 text-white"
												: "bg-white text-black"
										}`}
										onClick={() => handleFilterChange("series", serie)}
									>
										{serie}
									</button>
								))}
							</div>
							<h4>Characters:</h4>
							<div className="flex flex-wrap">
								{characters.map((character) => (
									<button
										key={character}
										className={`m-2 px-4 py-2 border ${
											filters.character === character
												? "bg-blue-500 text-white"
												: "bg-white text-black"
										}`}
										onClick={() => handleFilterChange("character", character)}
									>
										{character}
									</button>
								))}
							</div> */}
							<div>
								<h4>Categories:</h4>
								<div className="flex flex-wrap items-center">
									{categories.map((category) => (
										<button
											key={category}
											className={`m-2 px-4 py-2 border ${
												filters.category === category
													? "bg-blue-500 text-white"
													: "bg-white text-black"
											}`}
											onClick={() => handleFilterChange("category", category)}
										>
											{category}
										</button>
									))}
									{filters.category && (
										<button
											className="px-4 py-2 m-2 text-white bg-red-500 border"
											onClick={() => handleFilterChange("category", "")}
										>
											Cancel
										</button>
									)}
								</div>

								<h4>Series:</h4>
								<div className="flex flex-wrap items-center">
									{series.map((seriesItem) => (
										<button
											key={seriesItem}
											className={`m-2 px-4 py-2 border ${
												filters.series === seriesItem
													? "bg-blue-500 text-white"
													: "bg-white text-black"
											}`}
											onClick={() => handleFilterChange("series", seriesItem)}
										>
											{seriesItem}
										</button>
									))}
									{filters.series && (
										<button
											className="px-4 py-2 m-2 text-white bg-red-500 border"
											onClick={() => handleFilterChange("series", "")}
										>
											Cancel
										</button>
									)}
								</div>

								<h4>Characters:</h4>
								<div className="flex flex-wrap items-center">
									{characters.map((character) => (
										<button
											key={character}
											className={`m-2 px-4 py-2 border ${
												filters.character === character
													? "bg-blue-500 text-white"
													: "bg-white text-black"
											}`}
											onClick={() => handleFilterChange("character", character)}
										>
											{character}
										</button>
									))}
									{filters.character && (
										<button
											className="px-4 py-2 m-2 text-white bg-red-500 border"
											onClick={() => handleFilterChange("character", "")}
										>
											Cancel
										</button>
									)}
								</div>
							</div>
							<h4>Sort by price:</h4>
							<button
								className="px-4 py-2 m-2 text-black bg-white border"
								onClick={() => handleSortChange("price")}
							>
								Price {filters.order === "asc" ? "High to Low" : "Low to High"}
							</button>
						</div>
					</div>
				</div>
				{/* render figures */}
				<div className="col-span-3">
					{figures.length === 0 && (
						<div className="flex items-center justify-center h-[100vh] text-center">
							Nothing found
						</div>
					)}
					{figures.length > 0 && (
						<div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
							{figures.map((fig) => (
								<Products
									key={fig._id}
									fig={fig}
								/>
							))}
						</div>
					)}
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						handlePageChange={handlePageChange}
					/>
				</div>
			</div>
		</section>
	);
};

export default Collections;
