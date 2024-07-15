/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useCart } from "../provider/CartProvider";
import { ShoppingCart, X, Calendar } from "lucide-react";
import Loader from "../hooks/Loader";

const Products = ({ fig, isLoading }) => {
	const { addToCart, isItemInCart } = useCart();

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

	return (
		<>
			{/* {isLoading && <Loader />} */}

			<div
				key={fig?._id}
				className="relative duration-300 rounded-md shadow-lg bg-[#ffffff] shadow-ash/15 hover:shadow-ash/25 group"
			>
				<div className="p-4 h-[28.8rem]">
					<Link to={`/collections/${fig?.link}`}>
						<div
							className={`relative overflow-hidden mb-1.5 rounded-md h-fit ${
								fig?.label === "Out Of Stock" ? "grayscale relative" : "grayscale-0"
							}`}
						>
							{isLoading ? (
								<div className="absolute inset-0 bg-gray-300 rounded-md animate-pulse dark:bg-gray-700" />
							) : (
								<img
									src={fig?.images}
									alt={fig?.name}
									className="object-cover w-full h-56 duration-300 group-hover:scale-110"
								/>
							)}
							{fig?.label === "Out Of Stock" && (
								<p className="absolute -left-2.5 flex justify-center w-[110%] p-2 text-xl font-semibold text-white uppercase -translate-y-1/2 bg-ash/50 -rotate-12 top-1/2">
									Out Of Stock
								</p>
							)}
						</div>
						<h2 className="text-base font-medium group-hover:underline line-clamp-2 text-kala">
							{fig?.name}
						</h2>
						<p className="text-sm text-ash/70">{fig?.series}</p>
					</Link>
				</div>
				{/* button component */}
				<div className="absolute bottom-0 left-0 w-full">
					<div className="flex flex-col justify-between p-3 gap-y-2">
						<Link
							to={`/collections/${fig?.link}`}
							className={`relative flex flex-col items-center justify-center w-full py-1 text-white rounded-md shadow-md ${
								{
									Limited: "bg-blue-500",
									"Coming Soon": "bg-blue-500",
									"Pre Owned": "bg-blue-500",
									"Brand New": "bg-blue-500",
									"Re-Release": "bg-blue-500",
									"Out Of Stock": "bg-ash/60 line-through",
								}[fig?.label] || ""
							}`}
						>
							{fig.label === "Coming Soon" ? (
								<span className="text-xs">Pre Order Now</span>
							) : fig.label === "Out Of Stock" ? (
								<span className="text-xs">Out Of Stock</span>
							) : (
								<span className="text-xs">{fig.label}</span>
							)}
							<span className="text-base font-semibold">$ {fig.price}</span>
							{fig?.offer && (
								<span className="absolute bg-white text-laal text-[10px] font-semibold uppercase shadow-lg shadow-ash/50 rounded-md p-1 -top-4 -right-2.5">
									sale {fig?.offer}% off
								</span>
							)}
						</Link>
						<button
							className={`flex items-center justify-center w-full p-2 rounded-md shadow-md gap-x-1 ${
								isItemInCart(fig?._id)
									? "bg-holud/70 cursor-not-allowed text-ash"
									: "bg-holud cursor-pointer text-white"
							}`}
							disabled={isItemInCart(fig?._id)}
						>
							{fig?.label === "Coming Soon" ? (
								<p className="flex flex-col items-center justify-center text-sm text-white">
									<span className="text-xs">Release</span>
									<span className="text-sm flex gap-x-1.5 flex-row justify-center items-center font-semibold">
										<Calendar size={18} />
										{fig?.release}
									</span>
								</p>
							) : fig?.label === "Out Of Stock" ? (
								<span className="flex flex-row items-center justify-center text-sm font-semibold cursor-auto text-laal gap-x-1">
									<X size={18} />
									Sold Out
								</span>
							) : (
								<>
									<ShoppingCart size={18} />
									<span
										className="text-sm"
										onClick={() =>
											addFigToCart(
												fig?._id,
												fig?.name,
												fig?.images[0],
												fig?.price,
												fig?.link
											)
										}
									>
										{isItemInCart(fig?._id) ? "Added" : "Add to cart"}
									</span>
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Products;
