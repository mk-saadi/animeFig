import { useState } from "react";
import FilterButtonGroup from "../../hooks/FilterButtonGroup";
import { ArrowDownUp, FilterIcon } from "lucide-react";

const Filter = ({
	handleFilterChange,
	filters,
	handleSortChange,
	categories,
	series,
	characters,
	categoryCounts,
	seriesCounts,
	chaCounts,
}) => {
	const [isFilterVisible, setIsFilterVisible] = useState(false);

	const toggleFilterVisibility = () => {
		setIsFilterVisible(!isFilterVisible);
	};

	return (
		<>
			<button
				className="lg:hidden flex items-center my-4 justify-center w-full py-1.5 text-base font-semibold text-white rounded-md shadow-lg shadow-ash/25 gap-x-1 bg-holud"
				onClick={toggleFilterVisibility}
			>
				{isFilterVisible ? "Hide Filters" : "Show Filters"}
				<FilterIcon
					className="inline-block ml-2"
					size={20}
				/>
			</button>
			<div className={`filter-controls ${isFilterVisible ? "block" : "hidden"} lg:block`}>
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
						value={filters?.name}
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
								Price {filters?.order === "asc" ? "High to Low" : "Low to High"}{" "}
								<ArrowDownUp size={20} />
							</button>
						</div>
						<FilterButtonGroup
							title="Categories"
							filterType="category"
							filterValues={categories}
							selectedFilter={filters?.category}
							filterCounts={categoryCounts}
							handleFilterChange={handleFilterChange}
						/>
						<FilterButtonGroup
							title="Series"
							filterType="series"
							filterValues={series}
							selectedFilter={filters?.series}
							filterCounts={seriesCounts}
							handleFilterChange={handleFilterChange}
						/>
						<FilterButtonGroup
							title="Characters"
							filterType="character"
							filterValues={characters}
							selectedFilter={filters?.character}
							filterCounts={chaCounts}
							handleFilterChange={handleFilterChange}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Filter;
