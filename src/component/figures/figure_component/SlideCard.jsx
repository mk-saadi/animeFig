import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Scrollbar } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

const ProductSlider = ({ figures, isLoading }) => {
	return (
		<div className="product-slider-container">
			<Swiper
				modules={[Pagination, Scrollbar]}
				spaceBetween={50}
				scrollbar={{ draggable: true }}
				className="product-slider"
				breakpoints={{
					320: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					640: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 20,
					},
					1280: {
						slidesPerView: 4,
						spaceBetween: 20,
					},
				}}
			>
				{figures.length > 0 ? (
					figures.map((fig) => (
						<SwiperSlide key={fig._id}>
							<Products
								fig={fig}
								isLoading={isLoading}
							/>
						</SwiperSlide>
					))
				) : (
					<p>No products available</p>
				)}
			</Swiper>
		</div>
	);
};

const Products = ({ fig, isLoading }) => {
	return (
		<div className="pb-3 product-card">
			<Link
				to={`/collections/${fig?.link}`}
				className="group"
			>
				<div className="flex items-center justify-center w-full mb-1 rounded-md">
					<div className="w-48 overflow-hidden rounded-md h-72">
						<img
							src={fig.images}
							alt={fig.name}
							className="object-cover w-full h-full duration-300 rounded-md shadow-md group-hover:scale-110"
						/>
					</div>
				</div>
				<div className="product-info">
					<h3 className="text-base text-kala line-clamp-2 group-hover:underline">{fig.name}</h3>
				</div>
				<div className="mt-2">
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
						{fig.label === "Coming Soon" ? (
							<span className="text-xs">Pre Order Now</span>
						) : fig.label === "Out Of Stock" ? (
							<span className="text-xs">Out Of Stock</span>
						) : (
							<span className="text-xs">{fig.label}</span>
						)}
						<span className="text-base font-semibold">$ {fig.price}</span>
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
