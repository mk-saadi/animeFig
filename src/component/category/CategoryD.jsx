/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useCart } from "../provider/CartProvider";

const CategoryD = ({ figS }) => {
	const { addToCart } = useCart();

	const handleSubmit = () => {
		// e.preventDefault();

		const figName = figS.name;
		const figImg = figS.img;
		const figId = figS._id;
		const figPrice = figS.price;

		const selectedFig = {
			figName,
			figImg,
			figId,
			figPrice,
		};
		console.log("selectedFig: ", selectedFig.figId); // result: selectedFig:  646a0f39f47845f4286a8f9a

		addToCart(selectedFig);
	};

	return (
		<Link
			// to={`/figDetails/${figS._id}`}
			className="relative flex flex-col group"
		>
			<div className="overflow-hidden">
				<img
					src={figS.img}
					alt=""
					className="rounded-sm h-[260px] group-hover:scale-110 duration-700 object-cover w-full block mx-auto"
				/>
			</div>
			<p className="px-2 text-sm text-left mb-28 group-hover:underline">{figS.name.slice(0, 28)}...</p>

			<div className="absolute bottom-0 w-full">
				<Rating
					style={{ maxWidth: 80 }}
					value={Math.round(figS.rating)}
					readOnly
					className="h-5"
				/>
				<p className="my-2 text-xl text-error">${figS.price}</p>

				<div>
					<button
						className="flex items-center justify-center w-full gap-2 px-6 text-xs text-white rounded-sm btn btn-sm btn-info flex-nowrap"
						onClick={handleSubmit}
					>
						Add to
						<RiShoppingCart2Fill className="text-lg" />
					</button>
				</div>
			</div>
		</Link>
	);
};

export default CategoryD;
