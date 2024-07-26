import { X } from "lucide-react";

const FilterButtonGroup = ({
	title,
	filterType,
	filterValues,
	selectedFilter,
	filterCounts,
	handleFilterChange,
}) => {
	return (
		<div className="relative flex flex-col pb-3 border-b border-ash/30">
			<h4 className="mb-1 text-lg font-medium text-kala">{title}:</h4>
			<div className="max-h-[20rem] ml-4 justify-start focus:outline-none text-sm items-start overflow-y-auto flex flex-col gap-y-3">
				{filterValues.map((value) => (
					<button
						key={value}
						className={`hover:text-laal focus:outline-0 duration-300 text-start ${
							selectedFilter === value ? " text-laal" : " text-kala"
						}`}
						onClick={() => handleFilterChange(filterType, value)}
					>
						{value} <span className="mx-2.5">-</span>
						{filterCounts[value]}
					</button>
				))}
				{selectedFilter && (
					<button
						className="absolute top-0 right-0 p-1 duration-300 rounded-md hover:text-laal text-ash bg-ash/5 hover:bg-ash/10"
						// className="absolute top-0 right-0 p-1 duration-300 rounded text-ash bg-laal/5 hover:bg-laal/10 hover:text-laal"
						onClick={() => handleFilterChange(filterType, "")}
					>
						<X size={20} />
					</button>
				)}
			</div>
		</div>
	);
};

export default FilterButtonGroup;
