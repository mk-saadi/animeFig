// ! DO NOT TOUCH THIS COMPONENT !!!

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Products from "../prouducts/Products";
import Pagination from "../hooks/Pagination";
import FilterButtonGroup from "../hooks/FilterButtonGroup";
import useScrollToTop from "../hooks/useScrollToTop";
import useTitle from "../hooks/useWebTitle";
import { ArrowDownUp } from "lucide-react";
import Loader from "../hooks/Loader";

const Collections = () => {
	useScrollToTop();
	useTitle("Collections");
	const [searchParams, setSearchParams] = useSearchParams();
	const [figures, setFigures] = useState([]);
	const [allFigures, setAllFigures] = useState([]);
	const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
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

	const fetchAllFigures = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`${import.meta.env.VITE_URL}/figures/all`);
			setAllFigures(response.data.figures);
			extractFilters(response.data.figures);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching all figures:", error);
			setIsLoading(false);
		}
	};

	const fetchFigures = async (params) => {
		setIsLoading(true);
		try {
			const response = await axios.get(`${import.meta.env.VITE_URL}/figures/all`, { params });
			setFigures(response.data.figures);
			setIsLoading(false);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			setIsLoading(false);
			console.error("Error fetching figures:", error);
		}
	};

	const [categoryCounts, setCategoryCounts] = useState({});
	const [seriesCounts, setSeriesCounts] = useState({});
	const [chaCounts, setChaCounts] = useState({});

	const fetchAllFilters = async () => {
		const response = await fetch(`${import.meta.env.VITE_URL}/figures/all-filters`);
		const data = await response.json();

		const categoryCounts = {};
		const seriesCounts = {};
		const chaCounts = {};
		const uniqueCategories = new Set();
		const uniqueSeries = new Set();
		const uniqueCharacters = new Set();

		data.figures.forEach((fig) => {
			categoryCounts[fig.category] = (categoryCounts[fig.category] || 0) + 1;
			uniqueCategories.add(fig.category);
			seriesCounts[fig.series] = (seriesCounts[fig.series] || 0) + 1;
			uniqueSeries.add(fig.series);
			chaCounts[fig.character] = (chaCounts[fig.character] || 0) + 1;
			uniqueCharacters.add(fig.character);
		});

		setCategoryCounts(categoryCounts);
		setSeriesCounts(seriesCounts);
		setChaCounts(chaCounts);
		setCategories([...uniqueCategories]);
		setSeries([...uniqueSeries]);
		setCharacters([...uniqueCharacters]);

		return data.figures;
	};

	useEffect(() => {
		fetchAllFilters();
	}, []);

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
		<section className="relative grid min-h-screen grid-cols-4 bg-white gap-x-4">
			{/* Filter/sort column */}
			<div className="col-span-1 overflow-y-auto ">
				<div className="filter-controls">
					<div className="flex flex-col w-full gap-y-1.5 mb-6">
						<label
							htmlFor="searchName"
							className="mb-1 text-lg font-medium text-kala"
						>
							Search figure
						</label>
						<input
							id="searchName"
							type="text"
							name="name"
							className="w-full px-3 py-2 bg-transparent border rounded-md border-dhusor text-ash focus:outline-none"
							value={filters.name}
							onChange={(e) => handleFilterChange("name", e.target.value)}
						/>
					</div>
					<div className="">
						<div className="flex flex-col gap-y-6">
							<div>
								<h4 className="mb-1 text-lg font-medium text-kala">Sort by price:</h4>
								<button
									className="flex hover:text-laal duration-300 flex-row gap-x-1.5 items-center justify-start ml-4 text-sm text-start text-kala"
									onClick={() => handleSortChange("price")}
								>
									Price {filters.order === "asc" ? "High to Low" : "Low to High"}{" "}
									<ArrowDownUp size={20} />
								</button>
							</div>
							<FilterButtonGroup
								title="Categories"
								filterType="category"
								filterValues={categories}
								selectedFilter={filters.category}
								filterCounts={categoryCounts}
								handleFilterChange={handleFilterChange}
							/>
							<FilterButtonGroup
								title="Series"
								filterType="series"
								filterValues={series}
								selectedFilter={filters.series}
								filterCounts={seriesCounts}
								handleFilterChange={handleFilterChange}
							/>
							<FilterButtonGroup
								title="Characters"
								filterType="character"
								filterValues={characters}
								selectedFilter={filters.character}
								filterCounts={chaCounts}
								handleFilterChange={handleFilterChange}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* render figures column */}
			<div className="col-span-3">
				<div className="flex flex-col min-h-screen">
					{/* skeleton loader */}
					{isLoading && (
						<div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
							<Loader />
							<Loader />
							<Loader />
							<Loader />
							<Loader />
							<Loader />
							<Loader />
							<Loader />
						</div>
					)}
					{/* if no figures found */}
					{figures?.length === 0 && (
						<div className="flex items-center justify-center h-[100vh] text-center">
							Nothing found
						</div>
					)}
					{/* render figures */}
					{figures?.length > 0 && (
						<div className="grid grid-cols-1 transition duration-500 transform gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
							{figures.map((fig) => (
								<Products
									key={fig._id}
									fig={fig}
									isLoading={isLoading}
								/>
							))}
						</div>
					)}
				</div>
				{/* pagination component */}
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					handlePageChange={handlePageChange}
				/>
			</div>
		</section>
	);
};

export default Collections;
