import { Link } from "react-router-dom";
import { useFigures } from "../../hooks/APIS";
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
import { useRef, useState } from "react";
import Loader from "../../hooks/Loader";

const NewArrival = () => {
	const { figure, isLoading, error } = useFigures(`/figures/latest_figures`);

	const figs = figure?.detailedFigures || [];

	return (
		<div>
			<div className="flex justify-between w-full">
				<h2 className=" text-2xl flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
					<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
					New Arrivals
				</h2>
				<Link
					className="gap-x-1.5 hover:gap-x-4 flex items-center justify-center text-base duration-300 hover:text-laal hover:underline text-ash"
					to={`/collections?order=asc&page=1`}
				>
					Browse Collections
					<ArrowRight size={18} />
				</Link>
			</div>
			<div className="overflow-hidden">
				{figs.length > 0 && (
					<div className="relative w-full">
						<ProductSlider figures={figs} />
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
	const [isStart, setIsStart] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	return (
		<div className="relative product-slider-container hover:bg-white">
			<Swiper
				modules={[Pagination, Navigation]}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				onBeforeInit={(swiper) => {
					swiper.params.navigation.prevEl = prevRef.current;
					swiper.params.navigation.nextEl = nextRef.current;
				}}
				onSlideChange={(swiper) => {
					setIsStart(swiper.isStart);
					setIsEnd(swiper.isEnd);
				}}
				spaceBetween={50}
				pagination={{
					dynamicBullets: true,
				}}
				scrollbar={{ draggable: true }}
				className="select-none product-slider"
				breakpoints={{
					480: {
						slidesPerView: 4,
						spaceBetween: 20,
					},
					1280: {
						slidesPerView: 5,
						spaceBetween: 20,
					},
				}}
			>
				{figures.length > 0 ? (
					figures.map((fig) => (
						<SwiperSlide
							key={fig?._id}
							className="mb-7"
						>
							<Products fig={fig} />
						</SwiperSlide>
					))
				) : (
					<p>No products available</p>
				)}
			</Swiper>
			{/* navigation button */}
			<button
				ref={prevRef}
				className={`absolute left-0 z-10 px-2 py-3 duration-300 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-sm shadow-md top-1/2 ${
					isStart
						? "cursor-not-allowed opacity-50"
						: "[.hover\\:bg-white:hover_&]:px-3 [.hover\\:bg-white:hover_&]:py-5 [.hover\\:bg-white:hover_&]:text-white [.hover\\:bg-white:hover_&]:bg-blue-400"
				}`}
				disabled={isStart}
			>
				<ArrowLeft className="w-6 h-6" />
			</button>
			<button
				ref={nextRef}
				className={`absolute right-0 z-10 px-2 py-3 duration-300 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-sm shadow-md top-1/2 ${
					isEnd
						? "cursor-not-allowed opacity-50"
						: "[.hover\\:bg-white:hover_&]:px-3 [.hover\\:bg-white:hover_&]:py-5 [.hover\\:bg-white:hover_&]:text-white [.hover\\:bg-white:hover_&]:bg-blue-400"
				}`}
				disabled={isEnd}
			>
				<ArrowRight className="w-6 h-6" />
			</button>
		</div>
	);
};

export default NewArrival;