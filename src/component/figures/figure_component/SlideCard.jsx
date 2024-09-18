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

const ProductSlider = ({ figures }) => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const [isBeginning, setIsStart] = useState(true);
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
					setIsStart(swiper.isBeginning);
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
						<SwiperSlide key={fig?._id}>
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
				className={`absolute left-0 z-10 px-2 py-3 duration-300 transform text-ash backdrop-blur-sm -translate-y-3/4 bg-white bg-opacity-60 rounded-sm shadow-md top-1/2 ${
					isBeginning
						? "cursor-not-allowed text-ash bg-opacity-50 backdrop-blur-sm"
						: "[.hover\\:bg-white:hover_&]:px-3 [.hover\\:bg-white:hover_&]:py-5 [.hover\\:bg-white:hover_&]:text-white [.hover\\:bg-white:hover_&]:bg-blue-400"
				}`}
				disabled={isBeginning}
			>
				<ArrowLeft className="w-6 h-6" />
			</button>
			<button
				ref={nextRef}
				className={`absolute right-0 z-10 px-2 py-3 duration-300 transform text-ash backdrop-blur-sm -translate-y-3/4 bg-white bg-opacity-60 rounded-sm shadow-md top-1/2 ${
					isEnd
						? "cursor-not-allowed text-ash bg-opacity-50 backdrop-blur-sm"
						: "[.hover\\:bg-white:hover_&]:px-3 [.hover\\:bg-white:hover_&]:py-5 [.hover\\:bg-white:hover_&]:text-white [.hover\\:bg-white:hover_&]:bg-blue-400"
				}`}
				disabled={isEnd}
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
					<div className="w-48 overflow-hidden rounded-md h-72">
						<img
							src={fig?.images}
							alt={fig?.name}
							className="object-cover w-full h-full duration-300 rounded-md shadow-md group-hover:scale-110"
						/>
					</div>
				</div>
				<div className="product-info">
					<h3 className="text-base text-kala line-clamp-2 group-hover:underline">{fig?.name}</h3>
				</div>
				<div className="mt-[1.2rem]">
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
						<span className="text-base font-semibold">$ {fig?.price}</span>
						{fig?.offer && (
							<span className="absolute bg-white text-laal text-[10px] font-semibold uppercase shadow-equal shadow-ash/35 rounded-md p-1 -top-4 -right-2.5">
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
