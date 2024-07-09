import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import useTitle from "../hooks/useWebTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import { useCart } from "../provider/CartProvider";
import { useFigures } from "../hooks/APIS";
import ImageZoom from "../hooks/ImageZoom";
import Breadcrumbs from "../hooks/BreadCrumbs";
import { Facebook, Mail, MessageCircle, Twitter } from "lucide-react";

const FiguresD = () => {
	const { link } = useParams();
	const {
		figure: fig,
		isLoading: isLoadingFormValues,
		error: errorFormValues,
	} = useFigures(`/figures/${link}`);

	const navigate = useNavigate();

	const { addToCart, isItemInCart } = useCart();

	useScrollToTop();
	useTitle("figure: " + fig?.name);

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

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className="min-h-screen">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-6">
				{fig?.images && (
					<>
						<div className="flex flex-col items-center justify-start gap-y-2">
							<div className="w-[480px] h-fit">
								<ImageZoom src={fig?.images[0]} />
							</div>
							<div className="flex items-start justify-center w-full gap-x-2 h-fit">
								<ImageZoom src={fig?.images[1]} />
								<ImageZoom src={fig?.images[2]} />
							</div>
						</div>
					</>
				)}

				{/* <p className="text-xs italic text-center">{fig?.name}</p> */}
				<div className="">
					<>
						<Breadcrumbs />
					</>
					<div className="flex flex-col items-start justify-start mt-2">
						<p className="mb-4 text-lg font-normal sm:text-2xl text-ash">{fig?.name}</p>
						<div className="flex flex-row items-center justify-center w-full gap-4">
							<button className="flex items-center justify-center w-full py-1.5 text-base font-semibold font-serif text-white duration-300 rounded-md shadow-md gap-x-1 bg-holud">
								Buy now
							</button>
							<button className="flex items-center justify-center w-full py-1.5 text-base font-semibold font-serif text-white duration-300 rounded-md shadow-md gap-x-1 bg-holud">
								Add to cart
							</button>
						</div>
					</div>
					{/* share figure */}
					<div className="w-full flex p-[1px] justify-center items-center border mt-4 rounded-md  bg-gradient-to-r from-[#e7230d] to-[#f4ae18]">
						<div className="p-[11px] bg-white rounded-[0.29rem] w-full text-ash">
							<div className="flex items-center justify-between">
								<div className="flex flex-col items-start justify-start">
									<p className="text-sm text-ash">Share This Figure With Friends</p>
									<p className="text-[15px] -mt-[3px] text-ash">
										<small>Earn upto 10% commission</small>
									</p>
								</div>
								<div className="flex gap-x-2.5">
									<Twitter size={18} />
									<Facebook size={18} />
									<Mail size={18} />
									<MessageCircle size={18} />
								</div>
							</div>
						</div>
					</div>
					<div className="mt-10 text-slate-300">
						<p>
							<span className="font-semibold">Product Name:</span> {fig?.name}
						</p>
						<p>
							<span className="font-semibold">Manufacturer:</span> {fig?.brand}
						</p>
						<p>
							<span className="font-semibold">Dimension:</span> {fig?.dimension}
						</p>
						<p>
							<span className="font-semibold">Seller:</span> {fig?.seller}
						</p>
						<p>
							<span className="font-semibold">character:</span> {fig?.character}
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
