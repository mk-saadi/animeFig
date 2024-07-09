import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import useTitle from "../hooks/useWebTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import { useCart } from "../provider/CartProvider";
import { useFigures } from "../hooks/APIS";
import ImageZoom from "../hooks/ImageZoom";
import ZoomImage from "../hooks/ImageZoom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FiguresD = () => {
	const { id } = useParams();

	const {
		figure: fig,
		isLoading: isLoadingFormValues,
		error: errorFormValues,
	} = useFigures(`/figures/${id}`);

	const navigate = useNavigate();
	const { addToCart, isItemInCart } = useCart();

	useScrollToTop();
	useTitle("figure: " + fig?.name);

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

	const handleGoBack = () => {
		navigate(-1);
	};
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % fig?.images.length);
	};

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + fig?.images.length) % fig?.images.length);
	};

	return (
		<div className="min-h-screen mx-2 my-16">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				{fig?.images && (
					<>
						<div className="relative rounded-md flex justify-center overflow-hidden w-[480px] h-fit ">
							<div
								className="flex transition-transform duration-300 ease-linear rounded-md"
								style={{ transform: `translateX(-${currentIndex * 100}%)` }}
							>
								{fig?.images.map((imageUrl, index) => (
									<div
										key={index}
										className="flex-shrink-0 w-full rounded-md"
									>
										<ZoomImage
											src={imageUrl}
											alt={`Image ${index + 1}`}
										/>
									</div>
								))}
							</div>
							<div className="absolute right-0 flex flex-col items-center justify-center -translate-y-1/2 top-1/2 gap-y-2">
								<button
									className="px-1 py-3 duration-300 rounded-lg text-ash focus:outline-0 bg-white/20 hover:bg-white/30"
									type="button"
									onClick={handlePrev}
									aria-label="Previous image"
								>
									<ChevronLeft />
								</button>
								<button
									className="px-1 py-3 duration-300 rounded-lg text-ash focus:outline-0 bg-white/20 hover:bg-white/30"
									type="button"
									onClick={handleNext}
									aria-label="Next image"
								>
									<ChevronRight />
								</button>
							</div>
						</div>
					</>
				)}

				{/* <p className="text-xs italic text-center">{fig?.name}</p> */}
				<div className="sm:mr-10 md:mr-36">
					<div>
						<p className="mb-4 text-xl font-semibold sm:text-2xl text-slate-200">{fig?.name}</p>
						<p className="font-semibold text-red-600">
							US <span className="text-xl">{fig?.price}</span>
						</p>
						<p>0.62% cash back</p>
					</div>
					<div className="mt-10 text-slate-300">
						<p>
							<span className="font-semibold">Product Name:</span> {fig?.name}
						</p>
						<p>
							<span className="font-semibold">Manufacturer:</span> {fig?.brand}
						</p>
						<p>
							<span className="font-semibold">Manufacturer:</span> {fig?.dimension}
						</p>
						<p>
							<span className="font-semibold">Seller:</span> {fig?.seller}
						</p>
						<p className="my-3 text-gray-400">Order Limit: 3 per person</p>
						<p
							style={{ whiteSpace: "pre-line" }}
							className="mt-10"
						>
							{fig?.description}
						</p>
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

export default FiguresD;
