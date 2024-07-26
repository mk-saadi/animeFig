import { SearchIcon } from "lucide-react";
import { searchFigures } from "../../hooks/APIS";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SearchBox = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const searchResultsRef = useRef(null);

	const handleSearchChange = async (event) => {
		const query = event.target.value;
		setSearchQuery(query);

		if (query.trim() !== "") {
			const results = await searchFigures(query);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
				setSearchQuery("");
				setSearchResults([]);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [searchResultsRef]);

	return (
		<>
			<div className="hidden md:block w-[24rem]">
				<div className="relative">
					<input
						type="text"
						placeholder="Search figure"
						value={searchQuery}
						onChange={handleSearchChange}
						className="w-full pl-3 font-[200] text-white font-sans bg-transparent border-b border-white placeholder:text-white focus:outline-none text-base"
					/>
					<button className="absolute right-0 flex items-center pr-3 text-white transform -translate-y-1/2 cursor-default top-1/2">
						<SearchIcon size={20} />
					</button>
					{searchResults?.length > 0 && (
						<div
							className="absolute border z-[9999] top-9 shadow-ash/30 max-h-64 overflow-y-auto w-full mt-1 bg-white rounded-md shadow-lg"
							ref={searchResultsRef}
						>
							{searchResults?.map((item) => (
								<Link
									key={item._id}
									to={`/collections/${item?.link}`}
									onClick={() => searchQuery(null)}
									className="flex flex-col px-4 py-2 text-sm duration-300 cursor-pointer line-clamp-2 text-ash gap-y-3 hover:text-laal"
								>
									<span className="line-clamp-2">{item.name}</span>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default SearchBox;
