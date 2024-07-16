import { Frown, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../../provider/CartProvider";
import { Link } from "react-router-dom";

const ButtonComponent = ({ fig }) => {
	const { addToCart, isItemInCart } = useCart();

	const today = new Date();
	const releaseDate = new Date(fig?.release);
	const diffInMs = releaseDate - today;
	const finalDays = Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));

	const [finalPrice, setFinalPrice] = useState(fig?.price || 0);
	useEffect(() => {
		if (fig) {
			const calculatedFinalPrice = fig?.offer
				? (fig?.price * (1 - fig?.offer / 100)).toFixed(2)
				: fig?.price;
			setFinalPrice(calculatedFinalPrice);
		}
	}, [fig]);

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
			<div className="grid w-full grid-cols-2 gap-4">
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
									Limited: "bg-laal hover:scale-105 duration-300",
									"Coming Soon": "bg-laal hover:scale-105 duration-300",
									"Pre Owned": "bg-laal hover:scale-105 duration-300",
									"Brand New": "bg-laal hover:scale-105 duration-300",
									"Re-Release": "bg-laal hover:scale-105 duration-300",
									"Out Of Stock": "bg-[#f3f5f9] cursor-auto hover:scale-100 duration-0",
								}[fig?.label] || ""
							}`}
						>
							{fig.label === "Limited" ||
							fig.label === "Brand New" ||
							fig.label === "Pre Owned" ||
							fig.label === "Re-Release" ? (
								<Link className="flex justify-between w-full font-serif text-base font-bold text-white">
									<div className="flex flex-col justify-center">
										<p>Buy {fig.label} Figure</p>
										<p className="text-xs font-normal text-white">
											Usually ships in 72hrs
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
							) : fig.label === "Coming Soon" ? (
								<Link className="flex justify-between w-full font-serif text-base font-bold text-white">
									<div className="flex flex-col justify-center">
										<p>Pre-Order Now</p>
										<p className="text-xs font-normal text-white">Will ship on release</p>
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
							{fig?.offer && (
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
						fig?.label === "Out Of Stock" ? "overflow-hidden w-full relative" : "w-full"
					}`}
				>
					{fig ? (
						<div
							className={`flex focus:outline-0 h-full relative items-center overflow-hidden px-3 rounded-md justify-start w-full 
													${
														{
															Limited: "bg-holud hover:scale-105 duration-300",
															"Coming Soon":
																"bg-holud hover:scale-105 duration-300",
															"Pre Owned":
																"bg-holud hover:scale-105 duration-300",
															"Brand New":
																"bg-holud hover:scale-105 duration-300",
															"Re-Release":
																"bg-holud hover:scale-105 duration-300",
															"Out Of Stock": "bg-[#f3f5f9]",
														}[fig?.label] || ""
													}`}
						>
							{fig.label === "Limited" ||
							fig.label === "Brand New" ||
							fig.label === "Re-Release" ? (
								<button
									className="flex focus:outline-0 justify-center gap-x-1.5 w-full font-serif text-lg h-full font-semibold items-center text-white"
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
									<ShoppingCart size={24} />
									Add to cart
								</button>
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
				{/* second button end */}
			</div>
		</>
	);
};

export default ButtonComponent;
