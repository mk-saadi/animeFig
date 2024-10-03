import { Link } from "react-router-dom";
// import { useFigures } from "../../hooks/APIS";
import Products from "../../prouducts/Products";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "../../hooks/Loader";
import axios from "axios";

const NewArrival = () => {
	// const { figure, isLoading, error } = useFigures(`/figures/latest_figures`);
	const [figure, setFigure] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchFigures = async () => {
			setIsLoading(true);
			try {
				const res = await axios.get(`${import.meta.env.VITE_URL}/figures/latest_figures`);
				const data = res.data;
				const fig = data.detailedFigures;
				setFigure(fig);
				setIsLoading(false);
			} catch (error) {
				console.error("Failed to fetch figures:", error);
			}
		};
		fetchFigures();
	}, []);

	// const figs = figure?.detailedFigures || [];

	return (
		<div>
			<div className="flex justify-between w-full">
				<h2 className="text-xl lg:text-2xl flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
					<div className="w-8 lg:w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
					New Arrivals
				</h2>
				<Link
					className="gap-x-1.5 hover:gap-x-4 flex items-center justify-center text-sm lg:text-base duration-300 hover:text-laal hover:underline text-ash"
					to={`/collections?order=asc&page=1`}
				>
					Browse Collections
					<ArrowRight size={18} />
				</Link>
			</div>
			<div className="overflow-hidden">
				{figure.length > 0 && (
					<div className="relative w-full">
						<ProductSlider figures={figure} />
					</div>
				)}
			</div>
			{isLoading && (
				<div className="flex items-center justify-between">
					<Loader />
					<Loader />
					<Loader />
					<Loader />
					<Loader />
				</div>
			)}
		</div>
	);
};

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

export default NewArrival;
