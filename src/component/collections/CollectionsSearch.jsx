import { useAddedFigures, useFigures } from "../hooks/APIS";
import { Link, useParams } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import useTitle from "../hooks/useWebTitle";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../provider/CartProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import Products from "../prouducts/Products";

// http://localhost:3000/figures/search?category=Scale%20Figures&series=Fate%20Series&page=1&limit=2

const CollectionsSearch = () => {
	const { series } = useParams();
	const { addToCart, isItemInCart } = useCart();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [figures, setFigures] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useScrollToTop();
	useTitle("Series: " + series);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(`${import.meta.env.VITE_URL}/figures/search_api`, {
					params: {
						series,
						page: currentPage,
						limit: 12,
					},
				});
				setFigures(response.data.figures);
				setTotalPages(Math.ceil(response.data.totalMatchingFigures / 12));
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching figures:", error);
				setError(error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [series, currentPage]);

	const addFigToCart = (id, name, img, price, link) => {
		const figName = name;
		const figImg = img;
		const figId = id;
		const figPrice = price;
		const figLink = link;

		const selectedFig = {
			figName,
			figImg,
			figId,
			figPrice,
			figLink,
		};

		addToCart(selectedFig);
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
	};

	useEffect(() => {
		handlePageChange(1);
	}, [series]);

	return (
		<div className="min-h-screen bg-white">
			<h1>Series: {series}</h1>
			{/* {isLoading && <p>Loading figures...</p>} */}
			{error && <p>Error fetching figures: {error.message}</p>}

			<div className="grid grid-cols-4 gap-x-4">
				<div className="col-span-1">
					<p>first col</p>
				</div>

				<div className="col-span-3">
					<div className="min-h-screen">
						<div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
							{figures.map((fig) => (
								<Products
									key={fig._id}
									fig={fig}
									isLoading={isLoading}
								></Products>
							))}
						</div>
					</div>
					{/* Pagination buttons */}
					<div className="flex items-center justify-center w-full mt-4 overflow-hidden">
						<div className="flex items-center justify-center p-2 w-fit gap-x-3">
							<button
								onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
								disabled={currentPage === 1}
								className={`p-1 rounded-full shadow-md shadow-ash/25 text-ash
									${currentPage === 1 ? "bg-[#e9e9e9]" : "bg-holud"}
									`}
							>
								<ChevronLeft />
							</button>
							<div className="bg-[#e9e9e9] p-1 rounded-md shadow-inner flex justify-center items-center text-ash">
								{Array.from({ length: totalPages }, (_, i) => (
									<button
										key={i + 1}
										onClick={() => handlePageChange(i + 1)}
										className={`px-2.5 mx-1.5 rounded-md duration-300 ${
											currentPage === i + 1
												? "bg-holud shadow-md shadow-laal/40 text-laal"
												: "hover:bg-white/50"
										}`}
									>
										{i + 1}
									</button>
								))}
							</div>
							<button
								className={`p-1 rounded-full shadow-md shadow-ash/25 text-ash
									${currentPage === totalPages ? "bg-[#e9e9e9]" : "bg-holud"}
									`}
								disabled={currentPage === totalPages}
								onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
							>
								<ChevronRight />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CollectionsSearch;
