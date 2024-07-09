// import { Link, useLoaderData } from "react-router-dom";
// import Banner from "../home/Banner";
// import image from "../../assets/background.jpg";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import useTitle from "./useWebTitle";
// import Categories from "../category/Categories";
// import CategoryD from "../category/CategoryD";
// import ShowFig from "../showFig/ShowFig";
// // import useScrollToTop from "./useScrollToTop";
// import Products from "../prouducts/Products";
// // import { useToast } from "../../../../../react-toast-master-demo/src/ToastProvider";
// // import { useToast } from "../../../../../../npm package/react-toast-master-demo/src/ToastProvider";
// import { BiLoaderCircle } from "react-icons/bi";
// import { useToast } from "./ToastProvider";
// import { Facebook, Twitter, Instagram } from "lucide-react";

// const Exp = () => {
// 	const [figures, setData] = useState([]);
// 	const [page, setPage] = useState(0);
// 	const [loading, setLoading] = useState(false);
// 	const [total, setTotal] = useState(0);
// 	const limit = 6;

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			const result = await axios.get(
// 				`${import.meta.env.VITE_URL}/addedFigure?page=${page}&limit=${limit}`
// 			);
// 			setData(result.data);
// 		};

// 		const fetchTotal = async () => {
// 			const result = await axios.get(`${import.meta.env.VITE_URL}/totalAddedFigure`);
// 			setTotal(result.data.totalAddedFigure);
// 		};

// 		fetchData();
// 		fetchTotal();
// 	}, [page]);

// 	const totalPages = Math.ceil(total / limit);

// 	const handleNext = () => {
// 		if (page < totalPages - 1) {
// 			setPage((prevPage) => prevPage + 1);
// 		}
// 	};

// 	const handlePrev = () => {
// 		setPage((prevPage) => Math.max(prevPage - 1, 0));
// 	};

// 	const handlePageClick = (pageNumber) => {
// 		setPage(pageNumber);
// 	};

// 	return (
// 		<div className="flex items-center justify-center min-h-screen">
// 			<div className="mt-20">
// 				<div
// 					className="grid grid-cols-2 gap-4 mx-4 mt-16 sm:grid-cols-3 md:grid-cols-6 sm:mx-20"
// 					data-aos="fade-up"
// 					data-aos-offset="100"
// 					data-aos-duration="300"
// 				>
// 					{figures.map((figS) => (
// 						<div key={figS._id}>
// 							<img
// 								src={figS.img}
// 								alt=""
// 							/>
// 							<p className="text-center">{figS.name}</p>
// 						</div>
// 					))}
// 				</div>
// 				<div className="flex gap-8">
// 					<p>You are currently on page {page + 1}</p>
// 					<button
// 						onClick={handlePrev}
// 						disabled={page === 0}
// 					>
// 						Previous
// 					</button>

// 					<div className="flex gap-8">
// 						{Array.from({ length: totalPages }, (_, index) => (
// 							<button
// 								key={index}
// 								onClick={() => handlePageClick(index)}
// 								disabled={page === index}
// 							>
// 								{index + 1}
// 							</button>
// 						))}
// 					</div>
// 					<button
// 						onClick={handleNext}
// 						disabled={page >= totalPages - 1}
// 					>
// 						Next
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Exp;

// src/components/Pagination.jsx

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// http://localhost:3000/figures/search?category=Scale%20Figures&series=Fate%20Series&page=1&limit=2

const Exp = () => {
	const [figures, setFigures] = useState([]);
	console.log("figures: ", figures);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const itemsPerPage = 6;

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await axios.get(
					`${import.meta.env.VITE_URL}/figures/pagination?page=${currentPage}&limit=${itemsPerPage}`
				);
				setFigures(response.data);

				const totalFiguresResponse = await axios.get(
					`${import.meta.env.VITE_URL}/figures/totalFigure`
				);
				const totalFigures = totalFiguresResponse.data.totalFigure;
				setTotalPages(Math.ceil(totalFigures / itemsPerPage));
			} catch (error) {
				console.error(error);
				setError("Error fetching figures");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [currentPage, itemsPerPage]);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// ... (render logic for figures and pagination UI)

	return (
		<div>
			{isLoading && <p>Loading figures...</p>}
			{error && <p className="error">{error}</p>}
			{figures.length > 0 && (
				<div className="grid grid-cols-1 mt-8 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-6">
					{/* Render your figure data here */}
					{figures.map((figure) => (
						<div key={figure._id}>
							<div
								key={figure?._id}
								className="relative duration-300 rounded-md hover:shadow-lg group"
							>
								{/* className="absolute duration-300 group-hover:top-0 border-b-2 border-white border-s-2 -top-2 -right-2 group-hover:right-0 z-[1] px-2 py-px text-sm text-white rounded-md shadow-xl shadow-ash/50 bg-holud opacity-0 group-hover:opacity-100" */}
								<div
									className={`absolute duration-300 group-hover:top-0 border-2 border-white -top-2 -right-2 group-hover:right-0 z-[1] px-2 py-px text-sm text-white rounded-md opacity-0 group-hover:opacity-100 ${
										{
											Limited: "bg-red-500",
											"Coming Soon": "bg-blue-500",
											"Pre Owned": "bg-yellow-500",
											"In Stock": "bg-green-500",
											"Re-Release": "bg-purple-500",
											"Out Of Stock": "bg-ash",
										}[figure?.label] || ""
									}`}
								>
									<p>{figure?.label}</p>
								</div>
								<div className="p-4 h-[27.8rem]">
									<Link to={`/figures/${figure?._id}`}>
										<div className="relative overflow-hidden rounded-md h-fit">
											{/* First image */}
											<img
												src={figure?.images[0]}
												alt={figure?.name}
												className="object-cover w-full h-56 duration-300 group-hover:scale-105"
											/>

											{/* Second image (hidden by default) */}
											<img
												src={figure?.images[1]}
												alt={figure?.name}
												className="absolute top-0 left-0 object-cover w-full h-56 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
											/>
										</div>
										<h2 className="text-base font-medium group-hover:underline line-clamp-2 text-ash">
											{figure?.name}
										</h2>
										<p className="text-sm text-ash/70">{figure?.series}</p>
										<p className="mt-1 text-sm">{figure?.category}</p>
									</Link>
								</div>
								{/* button component */}
								<div className="absolute bottom-0 left-0 w-full">
									<div className="flex flex-col justify-between p-3 gap-y-2">
										<Link
											to={`/figures/${figure?._id}`}
											className="flex flex-col items-center justify-center w-full py-1 text-white rounded-md shadow-xl bg-laal"
										>
											<span className="text-xs">New Arrival</span>
											<span className="text-base font-semibold">$ {figure?.price}</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
					{/* Pagination UI (buttons, page numbers) */}

					<div className="flex items-center justify-center gap-x-7">
						<button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}>
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
						<button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Exp;
