/* -------------------------------------------------------------------------- */
//                     !!! DO NOT TOUCH THIS COMPONENT !!!                    //
/* -------------------------------------------------------------------------- */

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Products from "../prouducts/Products";
import Pagination from "../hooks/Pagination";
import useScrollToTop from "../hooks/useScrollToTop";
import useTitle from "../hooks/useWebTitle";
import Loader from "../hooks/Loader";
import { Fade } from "react-awesome-reveal";
import Filter from "./collections_component/Filter";
import { SearchX } from "lucide-react";

const Collections = () => {
	useScrollToTop();
	useTitle("Collections");

	const [searchParams, setSearchParams] = useSearchParams();
	const [figures, setFigures] = useState([]);
	// const [allFigures, setAllFigures] = useState([]);
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
			const response = await axios.get(`${import.meta.env.VITE_URL}/figures/collections`);
			// setAllFigures(response.data.figures);
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
			const response = await axios.get(`${import.meta.env.VITE_URL}/figures/collections`, { params });
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

	const [showNothingFound, setShowNothingFound] = useState(false);

	useEffect(() => {
		if (!isLoading) {
			const timer = setTimeout(() => {
				setShowNothingFound(true);
			}, 1000); // 1 second delay

			// Clean up the timer when the component unmounts or isLoading changes
			return () => clearTimeout(timer);
		} else {
			// Reset the state if loading starts again
			setShowNothingFound(false);
		}
	}, [isLoading]);

	return (
		<>
			<Fade triggerOnce>
				<section className="relative grid min-h-screen grid-cols-1 bg-white lg:grid-cols-4 gap-y-0 lg:gap-x-4">
					{/* Filter/sort column */}
					<div className="w-full col-span-1 overflow-y-auto">
						<Filter
							handleFilterChange={handleFilterChange}
							filters={filters}
							handleSortChange={handleSortChange}
							categories={categories}
							series={series}
							characters={characters}
							categoryCounts={categoryCounts}
							seriesCounts={seriesCounts}
							chaCounts={chaCounts}
						/>
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
							{figures?.length === 0 && showNothingFound && (
								<div className="flex items-center justify-center flex-col h-[80vh] text-ash text-center">
									<SearchX size={120} />
									<span className="mt-4 text-lg font-semibold text-kala">
										No figure found for {filters?.name}
									</span>
								</div>
							)}
							{/* render figures */}
							<div className="py-4 overflow-hidden">
								{figures?.length > 0 && (
									<div className="grid grid-cols-2 transition duration-500 transform gap-x-2 gap-y-4 lg:grid-cols-4">
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
						</div>
						{/* pagination component */}
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							handlePageChange={handlePageChange}
						/>
					</div>
				</section>
			</Fade>
		</>
	);
};

export default Collections;
