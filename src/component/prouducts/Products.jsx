/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useCart } from "../provider/CartProvider";
import { ShoppingCart } from "lucide-react";

const Products = ({ figure }) => {
	const { addToCart, isItemInCart } = useCart();

	// const { figureData, isLoading, error } = useAddedFigures({ category: category });

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

	return (
		<div
			key={figure._id}
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
					}[figure.label] || ""
				}`}
			>
				<p>{figure.label}</p>
			</div>
			<div className="p-4 h-[30rem]">
				<Link to={`/figures/${figure._id}`}>
					<div className="relative overflow-hidden rounded-md h-fit">
						{/* First image */}
						<img
							src={figure?.images}
							alt={figure.name}
							className="object-cover w-full h-64 duration-300 group-hover:scale-105"
						/>

						{/* Second image (hidden by default) */}
						{/* <img
							src={figure?.images[1]}
							alt={figure.name}
							className="absolute top-0 left-0 object-cover w-full h-64 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
						/> */}
					</div>

					<h2 className="text-base font-medium group-hover:underline line-clamp-2 text-ash">
						{figure.name}
					</h2>
					<p className="mt-1 text-sm">{figure.category}</p>
				</Link>
			</div>
			{/* button component */}
			<div className="absolute bottom-0 left-0 w-full">
				<div className="flex flex-col justify-between p-3 gap-y-2">
					<Link
						to={`/figures/${figure._id}`}
						className="flex flex-col items-center justify-center w-full py-1 text-white rounded-md shadow-xl bg-laal"
					>
						<span className="text-xs">New Arrival</span>
						<span className="text-base font-semibold">$ {figure.price}</span>
					</Link>
					<button
						className={`flex items-center justify-center w-full p-2 text-sm rounded-md shadow-md gap-x-1 ${
							isItemInCart(figure._id)
								? "bg-holud/70 cursor-not-allowed text-ash"
								: "bg-holud cursor-pointer text-white"
						}`}
						onClick={() => addFigToCart(figure._id, figure.name, figure.images[0], figure.price)}
						disabled={isItemInCart(figure._id)}
					>
						<ShoppingCart size={18} />
						<span>{isItemInCart(figure._id) ? "Added" : "Add to cart"}</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Products;
