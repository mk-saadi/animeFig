import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import useTitle from "../hooks/useWebTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import { useCart } from "../provider/CartProvider";
import { useFigures } from "../hooks/APIS";
import ImageZoom from "../hooks/ImageZoom";
import Breadcrumbs from "../hooks/BreadCrumbs";
import { Facebook, Frown, Gem, InfoIcon, Mail, MessageCircle, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

const FiguresD = () => {
	const { link } = useParams();

	const { figure: fig, isLoading, error } = useFigures(`/figures/${link}`);
	const navigate = useNavigate();

	const { addToCart, isItemInCart } = useCart();

	useScrollToTop();
	useTitle("Collections | " + fig?.name);

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

	const [finalPrice, setFinalPrice] = useState(fig?.price || 0);
	useEffect(() => {
		if (fig) {
			const calculatedFinalPrice = fig?.offer
				? (fig?.price * (1 - fig?.offer / 100)).toFixed(2)
				: fig?.price;
			setFinalPrice(calculatedFinalPrice);
		}
	}, [fig]);

	const today = new Date();
	const releaseDate = new Date(fig?.release);
	const diffInMs = releaseDate - today;
	const finalDays = Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));

	return (
		<div className="min-h-screen">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-6">
				{/* figure image */}
				<div>
					{fig?.images && (
						<>
							<div className="flex flex-col items-center justify-start gap-y-2">
								<div className="w-[480px] h-fit">
									<ImageZoom src={fig?.images[0]} />
								</div>
								{fig?.images[1] && (
									<div className="flex flex-col items-start justify-center w-full gap-x-2 h-fit">
										<ImageZoom src={fig?.images[1]} />
										{fig?.images[2] && <ImageZoom src={fig?.images[2]} />}
									</div>
								)}
							</div>
						</>
					)}
				</div>
				{/* info div */}
				<div className="">
					<>
						<Breadcrumbs />
					</>
					<div className="flex flex-col items-start justify-start mt-2">
						<p
							className="mb-4 text-kala"
							style={{
								fontSize: "24px",
								fontWeight: "400",
								lineHeight: "29px",
								letterSpacing: "0px",
							}}
						>
							{fig?.name}
						</p>
						{/* figure buy/add to cart button/link */}
						<div className="flex flex-row items-center justify-center w-full gap-4">
							<div
								className={`${
									fig?.label === "Out Of Stock"
										? "overflow-hidden w-full relative cursor-auto"
										: "w-full"
								}`}
							>
								{fig ? (
									<div
										className={`flex relative items-center p-3 cursor-pointer rounded-md justify-start w-full ${
											{
												Limited: "bg-red-500 hover:scale-105 duration-300",
												"Coming Soon": "bg-blue-500 hover:scale-105 duration-300",
												"Pre Owned": "bg-yellow-500 hover:scale-105 duration-300",
												"Brand New": "bg-green-500 hover:scale-105 duration-300",
												"Re-Release": "bg-purple-500 hover:scale-105 duration-300",
												"Out Of Stock":
													"bg-[#f3f5f9] cursor-auto hover:scale-100 duration-0",
											}[fig?.label] || ""
										}`}
									>
										{fig.label === "Limited" ||
										fig.label === "Brand New" ||
										fig.label === "Re-Release" ? (
											<button>Buy Now</button>
										) : fig.label === "Coming Soon" ? (
											<Link className="flex justify-between w-full font-serif text-base font-bold text-white">
												<div className="flex flex-col justify-center">
													<p>Pre-Order Now</p>
													<p className="text-xs font-normal text-white">
														Will ship on release
													</p>
												</div>
												<div className="flex flex-col items-end justify-end h-full">
													{fig?.offer && (
														<p className="text-sm line-through text-white/60">
															${fig?.price}
														</p>
													)}
													<p className="text-lg">${finalPrice}</p>
												</div>
											</Link>
										) : (
											<div className="font-serif text-base font-bold cursor-auto text-ash/60">
												<p>Out Of Stock</p>
												<p className="text-xs font-medium cursor-auto text-ash/50">
													This item has been sold out
												</p>
											</div>
										)}
										{/* sale absolute div */}
										{fig.label === "Coming Soon" && fig?.offer && (
											<div className="absolute bg-white text-laal text-[10px] font-semibold uppercase shadow-equal shadow-ash/40 rounded-md p-1 -top-4 -right-2.5">
												Sale {fig?.offer}% off
											</div>
										)}
									</div>
								) : null}
								{fig.label === "Out Of Stock" && (
									<Frown
										size={75}
										strokeWidth={1.2}
										className="absolute text-[#dadee6] z-10 top-0 right-0"
									/>
								)}
							</div>
							{/* second button */}
							<div
								className={`${
									fig?.label === "Out Of Stock"
										? "overflow-hidden w-full relative"
										: "w-full"
								}`}
							>
								{fig ? (
									<div
										className={`flex relative items-center overflow-hidden p-3 rounded-md justify-start w-full ${
											{
												Limited: "bg-red-500",
												"Coming Soon": "bg-holud",
												"Pre Owned": "bg-yellow-500",
												"Brand New": "bg-green-500",
												"Re-Release": "bg-purple-500",
												"Out Of Stock": "bg-[#f3f5f9]",
											}[fig?.label] || ""
										}`}
									>
										{fig.label === "Limited" ||
										fig.label === "Brand New" ||
										fig.label === "Re-Release" ? (
											<button>Buy Now</button>
										) : fig.label === "Coming Soon" ? (
											<div className="flex justify-between w-full font-serif text-base font-bold text-white">
												<div className="flex flex-col justify-center">
													<p>{fig?.release}</p>
													<p className="text-xs font-normal text-white">
														Official release data
													</p>
												</div>
												<div className="flex flex-col items-end justify-end h-full">
													<p className="text-lg">{finalDays}</p>
													<p className="text-sm text-white/70">days left</p>
												</div>
											</div>
										) : (
											<div className="font-serif text-base font-bold text-ash/60">
												<p>Out Of Stock</p>
												<p className="text-xs font-medium text-ash/50">
													Can&apos;t add item to cart
												</p>
											</div>
										)}
									</div>
								) : null}
								{fig.label === "Out Of Stock" && (
									<Frown
										size={75}
										strokeWidth={1.2}
										className="absolute text-[#dadee6] top-0 right-0"
									/>
								)}
							</div>
						</div>
						{fig?.label === "Coming Soon" && (
							<div className="w-full p-2 mt-4 text-[#1071a6] rounded-md bg-[#e0f2fe]">
								<div className="flex items-center justify-center gap-x-3">
									<InfoIcon size={30} />
									<p className="text-xs font-normal">
										The shipping weight/price and release date are based on manufacturer
										estimates and can change.{" "}
										<span className="font-semibold">Pre-order bonuses</span> are{" "}
										<span className="font-semibold">not guaranteed</span> to be included.
									</p>
								</div>
							</div>
						)}
					</div>
					{/* share figure */}
					<div className="w-full flex p-[1px] justify-center items-center border mt-4 rounded-md  bg-gradient-to-r from-[#e7230d] to-[#f4ae18]">
						<div className="p-[12px] bg-white rounded-[0.29rem] w-full text-ash">
							<div className="flex items-center justify-between">
								<div className="flex items-center justify-start gap-x-2">
									<Gem
										className="text-laal"
										size={24}
									/>
									<div className="flex flex-col items-start justify-start">
										<p className="text-[14px] text-kala">Refer a friend</p>
										<p className="text-[12px] -mt-[3px] text-ash">
											Get 500 points when they make their first purchase!
										</p>
									</div>
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
