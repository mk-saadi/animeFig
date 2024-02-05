import { useLoaderData } from "react-router-dom";
import AllToysD from "./AllToysD";
import { useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import useTitle from "../hooks/useWebTitle";

const AllToys = () => {
	const figs = useLoaderData();
	console.log("figs: ", figs);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	useTitle("allFigures");

	const filteredFigs = figs.filter((fig) => fig.name.toLowerCase().includes(searchQuery.toLowerCase()));

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSort = () => {
		const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
		setSortOrder(newSortOrder);
	};

	const sortedFigs = filteredFigs.sort((a, b) => {
		const sortFactor = sortOrder === "asc" ? 1 : -1;
		return sortFactor * (a.price - b.price);
	});

	return (
		<>
			{/* search */}
			<div className="px-4 sm:px-10 py-2 bg-blue-400 flex flex-nowrap">
				<input
					type="text"
					placeholder="Search by name..."
					value={searchQuery}
					onChange={handleSearch}
					className="input input-bordered input-accent w-full rounded-none rounded-l-sm"
				/>
				<button className="btn btn-accent rounded-r-sm rounded-none no-animation">
					<FaSearch />
				</button>
			</div>
			{/* sort */}
			<div className="mb-0 mt-16 flex justify-end">
				<button
					onClick={handleSort}
					className="btn btn-accent rounded-sm sm:btn-sm btn-xs flex gap-1 mr-1 sm:mr-2 md:mr-2  items-center no-animation"
				>
					Sort By Price
					<TbArrowsSort className="text-lg" /> {sortOrder === "asc" ? "" : ""}
				</button>
			</div>
			<div
				style={{ width: "98vw" }}
				className="mb-16 overflow-x-auto min-h-screen mx-auto"
				data-aos="fade-up"
				data-aos-offset="100"
				data-aos-duration="300"
			>
				<table className="table table-zebra w-full">
					<thead>
						<tr>
							<th>Image</th>
							<th>Seller</th>
							<th>Figure Name</th>
							<th>Sub-Category</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>
						{sortedFigs
							.map((fig) => (
								<AllToysD
									key={fig._id}
									fig={fig}
								></AllToysD>
							))
							.reverse()}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default AllToys;
