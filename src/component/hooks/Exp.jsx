import { Link, useLoaderData } from "react-router-dom";
import Banner from "../home/Banner";
import image from "../../assets/background.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import useTitle from "./useWebTitle";
import Categories from "../category/Categories";
import CategoryD from "../category/CategoryD";
import ShowFig from "../showFig/ShowFig";
import useScrollToTop from "./useScrollToTop";
import Products from "../prouducts/Products";
import { useToast } from "./ToastProvider";
// import useToast from "./ToastProvider";

const Exp = () => {
	// const [figures, setData] = useState([]);
	// const [page, setPage] = useState(0);
	// const [total, setTotal] = useState(0);
	// const limit = 6;
	const { showToast, showConfirmToast } = useToast();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const result = await axios.get(
	// 			`${import.meta.env.VITE_URL}/addedFigure?page=${page}&limit=${limit}`
	// 		);
	// 		setData(result.data);
	// 	};

	// 	const fetchTotal = async () => {
	// 		const result = await axios.get(`${import.meta.env.VITE_URL}/totalAddedFigure`);
	// 		setTotal(result.data.totalAddedFigure);
	// 	};

	// 	fetchData();
	// 	fetchTotal();
	// }, [page]);

	// const totalPages = Math.ceil(total / limit);

	// const handleNext = () => {
	// 	if (page < totalPages - 1) {
	// 		setPage((prevPage) => prevPage + 1);
	// 	}
	// };

	// const handlePrev = () => {
	// 	setPage((prevPage) => Math.max(prevPage - 1, 0));
	// };

	// const handlePageClick = (pageNumber) => {
	// 	setPage(pageNumber);
	// };

	// showToast("info", "loading");
	// const handleCheck = () => {
	// 	showToast("confirm", "Are you sure?", () => window.location.reload(true));
	// };

	const handleCheck = async () => {
		const isClickedConfirm = await showToast("confirm", "Are you sure you want to delete this user?");
		console.log("confirm: ", isClickedConfirm);
		if (isClickedConfirm) {
			showToast("success", "user deleted!");
		}
		// showToast("success", "true");
	};

	return (
		<>
			<button onClick={handleCheck}>load</button>
			{/* <div className="mt-20">
				<div
					className="grid grid-cols-2 gap-4 mx-4 mt-16 sm:grid-cols-3 md:grid-cols-6 sm:mx-20"
					data-aos="fade-up"
					data-aos-offset="100"
					data-aos-duration="300"
				>
					{figures.map((figS) => (
						<Products
							key={figS._id}
							figS={figS}
						></Products>
					))}
				</div>
				<div className="flex gap-8">
					<p>You are currently on page {page + 1}</p>
					<button
						onClick={handlePrev}
						disabled={page === 0}
					>
						Previous
					</button>

					<div className="flex gap-8">
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index}
								onClick={() => handlePageClick(index)}
								disabled={page === index}
							>
								{index + 1}
							</button>
						))}
					</div>
					<button
						onClick={handleNext}
						disabled={page >= totalPages - 1}
					>
						Next
					</button>
				</div>
			</div> */}
		</>
	);
};

export default Exp;
