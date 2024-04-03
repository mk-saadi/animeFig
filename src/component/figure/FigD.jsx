import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useScrollToTop from "../hooks/useScrollToTop";
import { useCart } from "../provider/CartProvider";

const FigD = () => {
	const fig = useLoaderData();
	useScrollToTop();
	const { addToCart } = useCart();

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className="mx-2 my-16">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
				{/* figure image column */}
				<div className="mx-4">
					<img
						src={fig?.img}
						alt=""
						className="h-[350px] sm:h-[500px] sm:w-auto object-cover rounded-lg mx-auto"
					/>
					<p className="text-xs italic text-center">{fig.name}</p>
				</div>

				{/* figure detail column */}
				<div className="col-span-2 sm:mr-10 md:mr-36">
					<div className="grid grid-cols-4">
						<div className="col-span-3">
							<div>
								<p className="mb-4 text-xl font-semibold sm:text-2xl text-slate-200">
									{fig.name}
								</p>
								<p className="font-semibold text-red-600">
									US <span className="text-xl">${fig.price}</span>
								</p>
								<p>0.62% cash back</p>
								<div className="my-3">
									<Rating
										style={{ maxWidth: 150 }}
										value={Math.round(fig.rating)}
									/>
								</div>
							</div>
							<div className="mt-10 text-slate-300">
								<p>
									<span className="font-semibold">Product Name:</span> {fig.name}
								</p>
								<p>
									<span className="font-semibold">Manufacturer:</span> {fig.Manufacturer}
								</p>
								<p>
									<span className="font-semibold">Seller:</span> {fig.seller}
								</p>
								<p className="my-3 text-gray-400">Order Limit: 3 per person</p>
								<p
									style={{ whiteSpace: "pre-line" }}
									className="mt-10"
								>
									{fig.description}
								</p>
							</div>
						</div>

						<div>
							<p className="text-2xl text-white">buy</p>
						</div>
					</div>
				</div>
			</div>
			<button
				onClick={handleGoBack}
				className="flex items-center justify-center gap-2 px-10 mt-10 text-white rounded-sm btn btn-accent sm:mx-10"
			>
				<BsFillArrowLeftSquareFill className="text-xl "></BsFillArrowLeftSquareFill> Go Back
			</button>
		</div>
	);
};

export default FigD;
