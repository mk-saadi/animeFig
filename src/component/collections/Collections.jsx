// ! DO NOT TOUCH THIS COMPONENT !!!

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
		label: "",
		order: "asc",
	});
	const [categories, setCategories] = useState([]);
	const [series, setSeries] = useState([]);
	const [characters, setCharacters] = useState([]);
	const [label, setLabel] = useState([]);

	const fetchAllFigures = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_URL}/figures/all`);
			setAllFigures(response.data.figures);
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

	const [categoryCounts, setCategoryCounts] = useState({});
	const [seriesCounts, setSeriesCounts] = useState({});
	const [chaCounts, setChaCounts] = useState({});

	const fetchAllFilters = async () => {
		const response = await fetch(`${import.meta.env.VITE_URL}/figures/all-filters`);
		const data = await response.json();

		const categoryCounts = data.figures.reduce((acc, fig) => {
			acc[fig.category] = (acc[fig.category] || 0) + 1;
			return acc;
		}, {});
		setCategoryCounts(categoryCounts);

		const seriesCounts = data.figures.reduce((acc, fig) => {
			acc[fig.series] = (acc[fig.series] || 0) + 1;
			return acc;
		}, {});
		setSeriesCounts(seriesCounts);

		const chaCounts = data.figures.reduce((acc, fig) => {
			acc[fig.character] = (acc[fig.character] || 0) + 1;
			return acc;
		}, {});
		setChaCounts(chaCounts);

		return data.figures;
	};

	useEffect(() => {
		fetchAllFilters().then((fetchedFigures) => {
			extractFilters(fetchedFigures);
		});

		fetchFigures({ page: 1, limit: 12 }).then((fetchedFigures) => {
			setFigures(fetchedFigures);
		});
	}, []);

	const extractFilters = (figures) => {
		const categories = [...new Set(figures.map((fig) => fig.category))];
		const series = [...new Set(figures.map((fig) => fig.series))];
		const characters = [...new Set(figures.map((fig) => fig.character))];
		const label = [...new Set(figures.map((fig) => fig.label))];
		setCategories(categories);
		setSeries(series);
		setCharacters(characters);
		setLabel(label);
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
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleFilterChange = (name, value) => {
		const updatedParams = { ...filters, [name]: value, page: 1 };

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
		const initialLabel = searchParams.get("label");

		const newFilters = { ...filters };
		if (initialCategory) newFilters.category = initialCategory;
		if (initialSeries) newFilters.series = initialSeries;
		if (initialCharacter) newFilters.character = initialCharacter;
		if (initialLabel) newFilters.label = initialLabel;

		setFilters(newFilters);
	}, [searchParams]);

	const handleSortChange = (sort) => {
		const newOrder = filters.order === "asc" ? "desc" : "asc";
		const updatedParams = { ...filters, sort, order: newOrder, page: 1 };
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
											{category} {category.length}
											{/* {filters.category === category ? "✓" : ""} */}
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
								<h4>Label:</h4>
								<div className="flex flex-wrap items-center">
									{label.map((label) => (
										<button
											key={label}
											className={`m-2 px-4 py-2 border ${
												filters.label === label
													? "bg-blue-500 text-white"
													: "bg-white text-black"
											}`}
											onClick={() => handleFilterChange("label", label)}
										>
											{label} {label.length}
											{/* {filters.label === label ? "✓" : ""} */}
										</button>
									))}
									{filters.label && (
										<button
											className="px-4 py-2 m-2 text-white bg-red-500 border"
											onClick={() => handleFilterChange("label", "")}
										>
											Cancel
										</button>
									)}
								</div>

								<h4>Series:</h4>
								<div className="flex flex-wrap items-center h-[18rem] overflow-y-auto">
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
					{figures?.length === 0 && (
						<div className="flex items-center justify-center h-[100vh] text-center">
							Nothing found
						</div>
					)}
					{figures?.length > 0 && (
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
