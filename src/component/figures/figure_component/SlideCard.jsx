import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useEffect } from "react";

const ProductSlider = ({ figures }) => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);
	const [swiper, setSwiper] = useState(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (swiper) {
			const updateNavigation = () => {
				if (swiper.params && swiper.navigation) {
					swiper.params.navigation.prevEl = prevRef.current;
					swiper.params.navigation.nextEl = nextRef.current;
					swiper.navigation.destroy();
					swiper.navigation.init();
					swiper.navigation.update();
				}
			};

			updateNavigation();

			if (document.readyState === "complete") {
				updateNavigation();
			} else {
				window.addEventListener("load", updateNavigation);
				return () => window.removeEventListener("load", updateNavigation);
			}
		}
	}, [swiper]);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	return (
		<div
			className="relative product-slider-container"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				"--button-bg-opacity": isHovered ? "1" : "0.5",
				"--button-hover-bg": isHovered ? "rgba(96, 165, 250, 1)" : "rgba(255, 255, 255, 0.5)",
				"--button-hover-text": isHovered ? "white" : "#6B7280",
			}}
		>
			<Swiper
				modules={[Pagination, Navigation]}
				onSwiper={setSwiper}
				onSlideChange={(swiper) => {
					setIsBeginning(swiper.isBeginning);
					setIsEnd(swiper.isEnd);
				}}
				spaceBetween={50}
				pagination={{
					dynamicBullets: true,
				}}
				scrollbar={{ draggable: true }}
				className="select-none product-slider"
				breakpoints={{
					320: { slidesPerView: 2, spaceBetween: 6 },
					480: { slidesPerView: 3, spaceBetween: 20 },
					1280: { slidesPerView: 5, spaceBetween: 20 },
				}}
			>
				{figures?.length > 0 ? (
					figures?.map((fig) => (
						<SwiperSlide
							key={fig?._id}
							className="pb-8"
						>
							<Products fig={fig} />
						</SwiperSlide>
					))
				) : (
					<p>No products available</p>
				)}
			</Swiper>
			<button
				ref={prevRef}
				className={`absolute focus:outline-0 backdrop-blur-sm left-0 z-10 px-2 py-3 duration-300 transform -translate-y-3/4 rounded-sm shadow-md top-1/2 
          ${isBeginning ? "cursor-not-allowed  backdrop-blur-sm" : "hover:px-3 hover:py-5"}
          transition-all`}
				disabled={isBeginning}
				style={{
					backgroundColor: "var(--button-hover-bg)",
					color: "var(--button-hover-text)",
				}}
			>
				<ArrowLeft className="w-6 h-6" />
			</button>
			<button
				ref={nextRef}
				className={`absolute focus:outline-0 backdrop-blur-sm right-0 z-10 px-2 py-3 duration-300 transform -translate-y-3/4 rounded-sm shadow-md top-1/2 
          ${isEnd ? "cursor-not-allowed backdrop-blur-sm" : "hover:px-3 hover:py-5"}
          transition-all`}
				disabled={isEnd}
				style={{
					backgroundColor: "var(--button-hover-bg)",
					color: "var(--button-hover-text)",
				}}
			>
				<ArrowRight className="w-6 h-6" />
			</button>
		</div>
	);
};

const Products = ({ fig }) => {
	return (
		<div className="pb-8 product-card">
			<Link
				to={`/collections/${fig?.link}`}
				className="group"
			>
				<div className="flex items-center justify-center w-full mb-1 rounded-md">
					<div className="overflow-hidden rounded-md md:w-48 h-52 md:h-72">
						<img
							src={fig?.images}
							alt={fig?.name}
							className="object-cover w-full h-full duration-300 rounded-md shadow-md group-hover:scale-110"
						/>
					</div>
				</div>
				<div className="product-info">
					<h3 className="text-sm md:text-base text-kala line-clamp-2 group-hover:underline">
						{fig?.name}
					</h3>
				</div>
				<div className="mt-[1.4rem]">
					<Link
						to={`/collections/${fig?.link}`}
						className={`relative flex flex-col items-center justify-center w-full py-1.5 text-white rounded-md shadow-md ${
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
						{fig?.label === "Coming Soon" ? (
							<span className="text-xs">Pre Order Now</span>
						) : fig?.label === "Out Of Stock" ? (
							<span className="text-xs">Out Of Stock</span>
						) : (
							<span className="text-xs">{fig?.label}</span>
						)}
						<span className="text-sm font-semibold md:text-base">$ {fig?.price}</span>
						{fig?.offer && (
							<span className="absolute bg-white text-laal text-[10px] font-semibold uppercase shadow-equal shadow-ash/35 rounded-md p-1 -top-4 md:-right-2.5 -right-1">
								sale {fig?.offer}% off
							</span>
						)}
					</Link>
				</div>
			</Link>
		</div>
	);
};

export default ProductSlider;
