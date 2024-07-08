import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import useTitle from "../hooks/useWebTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import { useCart } from "../provider/CartProvider";
import { useFigures } from "../hooks/APIS";

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

	console.log(fig?.images);

	return (
		<div className="mx-2 my-16">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				{/* Assuming fig.images is an array of image URLs */}
				<div className="flex flex-wrap justify-center">
					{fig?.images.map((imageUrl, index) => (
						<img
							key={index} // Use a unique key (e.g., index) for each image
							src={imageUrl}
							alt={`Image ${index + 1}`}
							className="h-[350px] sm:h-[500px] sm:w-auto object-cover rounded-lg mx-auto m-2"
						/>
					))}
				</div>

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
							<span className="font-semibold">Manufacturer:</span> {fig?.Manufacturer}
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
