import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Products from "../prouducts/Products";

const All = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [figures, setFigures] = useState([]);
	const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchFigures = async (params) => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_URL}/figures/all`, {
				params,
			});
			setFigures(response.data.figures);
			console.log("response: ", response);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error("Error fetching figures:", error);
		}
	};

	useEffect(() => {
		const params = Object.fromEntries([...searchParams]);
		fetchFigures(params);
	}, [searchParams]);

	const handlePageChange = (page) => {
		setSearchParams({ ...Object.fromEntries([...searchParams]), page });
		setCurrentPage(page);
	};

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setSearchParams({ ...Object.fromEntries([...searchParams]), [name]: value });
	};

	return (
		<div>
			<div className="filter-controls">
				<input
					type="text"
					name="name"
					placeholder="Search by name"
					onChange={handleFilterChange}
				/>
				<input
					type="text"
					name="category"
					placeholder="Filter by category"
					onChange={handleFilterChange}
				/>
				<input
					type="text"
					name="series"
					placeholder="Filter by series"
					onChange={handleFilterChange}
				/>
				<input
					type="text"
					name="character"
					placeholder="Filter by character"
					onChange={handleFilterChange}
				/>
				<select
					name="sort"
					onChange={handleFilterChange}
				>
					<option value="">Sort by</option>
					<option value="price">Price</option>
					<option value="label">Label</option>
				</select>
			</div>
			<div className="figures">
				<div className="min-h-screen">
					<div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
						{figures.map(
							(fig) => (
								console.log("figures: ", figures),
								(
									<Products
										key={fig._id}
										fig={fig}
									></Products>
								)
							)
						)}
					</div>
				</div>
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

export default All;
