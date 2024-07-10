import { useAddedFigures, useFigures } from "../hooks/APIS";
import { Link, useParams } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import useTitle from "../hooks/useWebTitle";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../provider/CartProvider";
import { useEffect, useState } from "react";
import axios from "axios";

// http://localhost:3000/figures/search?category=Scale%20Figures&series=Fate%20Series&page=1&limit=2

const Categories = () => {
	const { category } = useParams();
	const { addToCart, isItemInCart } = useCart();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [figures, setFigures] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// useScrollToTop();
	useTitle("Category: " + category);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(`${import.meta.env.VITE_URL}/figures/search`, {
					params: {
						category,
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
	}, [category, currentPage]);

	const addFigToCart = (id, name, img, price) => {
		const figName = name;
		const figImg = img;
		const figId = id;
		const figPrice = price;

		const selectedFig = {
			figName,
			figImg,
			figId,
			figPrice,
		};

		addToCart(selectedFig);
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
	};

	useEffect(() => {
		handlePageChange(1);
	}, [category]);

	return (
		<div className="min-h-screen bg-white">
			<h1>Category: {category}</h1>
			{isLoading && <p>Loading figures...</p>}
			{error && <p>Error fetching figures: {error.message}</p>}

			<div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-6">
				{figures.map((figure) => (
					<div
						key={figure?._id}
						className="relative duration-300 rounded-md hover:shadow-lg group"
					>
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
							<Link to={`/${figure?.link}`}>
								<div className="relative overflow-hidden rounded-md h-fit">
									<img
										src={figure?.images[0]}
										alt={figure?.name}
										className="object-cover w-full h-56 duration-300 group-hover:scale-105"
									/>
									<img
										src={figure?.images[1]}
										alt={figure?.name}
										className="absolute top-0 left-0 object-cover w-full h-56 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
									/>
								</div>
								<h2 className="text-base font-medium group-hover:underline line-clamp-2 text-ash">
									{figure?.name}
								</h2>
								<p className="text-sm text-ash/70 line-clamp-2">{figure?.series}</p>
								<p className="mt-1 text-sm">{figure?.category}</p>
							</Link>
						</div>
						<div className="absolute bottom-0 left-0 w-full">
							<div className="flex flex-col justify-between p-3 gap-y-2">
								<Link
									to={`/${figure?.link}`}
									className="flex flex-col items-center justify-center w-full py-1 text-white rounded-md shadow-xl bg-laal"
								>
									<span className="text-xs">New Arrival</span>
									<span className="text-base font-semibold">$ {figure?.price}</span>
								</Link>
								<button
									className={`flex items-center justify-center w-full p-2 text-sm rounded-md shadow-md gap-x-1 ${
										isItemInCart(figure?._id)
											? "bg-holud/70 cursor-not-allowed text-ash"
											: "bg-holud cursor-pointer text-white"
									}`}
									onClick={() =>
										addFigToCart(
											figure?._id,
											figure?.name,
											figure?.images[0],
											figure?.price,
											figure?.link
										)
									}
									disabled={isItemInCart(figure?._id)}
								>
									<ShoppingCart size={18} />
									<span>{isItemInCart(figure?._id) ? "Added" : "Add to cart"}</span>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex items-center justify-center w-full">
				<div className="flex items-center justify-center p-2 text-white rounded-md shadow-md w-fit bg-ash/50 gap-x-3">
					<button
						onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
						className="px-2"
					>
						Previous
					</button>
					<span className="mx-2.5 w-px lg:block hidden h-[15px] py-px bg-ash/70 " />
					{Array.from({ length: totalPages }, (_, i) => (
						<button
							key={i + 1}
							onClick={() => handlePageChange(i + 1)}
							className={`px-2 rounded-md ${currentPage === i + 1 ? "bg-holud " : ""}`}
						>
							{i + 1}
						</button>
					))}
					<span className="mx-2.5 w-px lg:block hidden h-[15px] py-px bg-ash/70 " />
					<button
						className="px-2"
						onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Categories;
