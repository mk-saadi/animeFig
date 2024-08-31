import { Link } from "react-router-dom";
import { useFigures } from "../../hooks/APIS";
import { useEffect, useState } from "react";
// import Products from "../../prouducts/Products";
import { ArrowRight } from "lucide-react";
// import ProductSlider from "../../figures/figure_component/SlideCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const NewArrival = () => {
	const { figure, isLoading, error } = useFigures(`/figures/latest_figures`);

	const figs = figure?.detailedFigures || [];
	const add = figure?.additionalFigures || [];
	console.log("figure: ", figure);

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
					View more
					<ArrowRight size={18} />
				</Link>
			</div>
			<div className="py-4 overflow-hidden">
				{/* {figs?.length > 0 && (
					<div className="grid grid-cols-1 transition duration-500 transform gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
						{figs.map((fig) => (
							<Products
								key={fig._id}
								fig={fig}
							/>
						))}
						<div className="relative grid items-center justify-center grid-cols-2 mx-2 group">
							{add.map((fig) => (
								<div key={fig._id}>
									<div className="w-[4.8rem] overflow-hidden rounded-md shadow-lg shadow-ash/25 h-[8.5rem]">
										<img
											src={fig.images}
											alt=""
											className="object-cover w-full h-full duration-300 group-hover:opacity-80"
										/>
									</div>
								</div>
							))}
							<Link
								className="absolute gap-x-1.5 group-hover:gap-x-4 inset-0 flex items-center justify-center w-full h-full text-sm duration-300 group-hover:text-laal group-hover:underline text-ash"
								to={`/collections?name=&category=&series=&character=&sort=&label=Pre+Owned&order=asc&page=1`}
							>
								View more
								<ArrowRight size={18} />
							</Link>
						</div>
					</div>
				)} */}
				{figs.length > 0 && (
					<div className="relative w-full">
						<ProductSlider
							figures={figs}
							isLoading={isLoading}
						/>
					</div>
				)}
				{/* <div className="relative grid items-center justify-center grid-cols-2 mx-2 group">
					{add.map((fig) => (
						<div key={fig._id}>
							<div className="w-[4.8rem] overflow-hidden rounded-md shadow-lg shadow-ash/25 h-[8.5rem]">
								<img
									src={fig.images}
									alt=""
									className="object-cover w-full h-full duration-300 group-hover:opacity-80"
								/>
							</div>
						</div>
					))}
					<Link
						className="absolute gap-x-1.5 group-hover:gap-x-4 inset-0 flex items-center justify-center w-full h-full text-sm duration-300 group-hover:text-laal group-hover:underline text-ash"
						to={`/collections?name=&category=&series=&character=&sort=&label=Pre+Owned&order=asc&page=1`}
					>
						View more
						<ArrowRight size={18} />
					</Link>
				</div> */}
			</div>
		</div>
	);
};

const ProductSlider = ({ figures, isLoading }) => {
	return (
		<div className="product-slider-container">
			<Swiper
				modules={[Pagination]}
				spaceBetween={50}
				pagination={{
					dynamicBullets: true,
				}}
				scrollbar={{ draggable: true }}
				className="select-none product-slider"
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
						slidesPerView: 5,
						spaceBetween: 20,
					},
				}}
			>
				{figures.length > 0 ? (
					figures.map((fig) => (
						<SwiperSlide key={fig?._id}>
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

export default NewArrival;
