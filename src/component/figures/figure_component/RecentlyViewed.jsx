import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const RecentlyViewed = ({ visitedFigures, setVisitedFigures }) => {
	const removeItem = (link) => {
		const updatedFigures = visitedFigures.filter((fig) => fig.link !== link);
		setVisitedFigures(updatedFigures);
		localStorage.setItem("visitedFigures", JSON.stringify(updatedFigures));
	};

	const removeAll = () => {
		setVisitedFigures([]);
		localStorage.removeItem("visitedFigures");
	};

	return (
		<div className="max-w-5xl product-slider-container">
			<div className="flex justify-between w-full mb-3">
				<h2 className="text-base font-medium lg:text-xl text-kala">Recently Viewed</h2>
				<button
					onClick={removeAll}
					className="text-xs lg:text-sm text-ash hover:text-ash/70"
				>
					Remove All
				</button>
			</div>
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
						slidesPerView: 5,
						spaceBetween: 2,
					},
					640: {
						slidesPerView: 5,
						spaceBetween: 2,
					},
					768: {
						slidesPerView: 6,
						spaceBetween: 10,
					},
					1024: {
						slidesPerView: 6,
						spaceBetween: 20,
					},
					1280: {
						slidesPerView: 10,
						spaceBetween: 2,
					},
				}}
			>
				{visitedFigures.length > 0 ? (
					visitedFigures.map((fig) => (
						<SwiperSlide key={fig?.link}>
							<Items
								fig={fig}
								removeItem={removeItem}
							/>
						</SwiperSlide>
					))
				) : (
					<p>No other viewed items yet.</p>
				)}
			</Swiper>
		</div>
	);
};

const Items = ({ fig, removeItem }) => {
	return (
		<div className="pb-5 duration-300 product-card">
			<div className="relative flex items-center justify-center w-full mb-1 rounded-md">
				<Link
					className="group w-[65px] rounded-md overflow-hidden h-[80px] "
					to={`/collections/${fig?.link}`}
					title={fig?.name}
				>
					<img
						src={fig?.images}
						alt={fig?.name}
						className="object-cover w-full h-full duration-300 group-hover:scale-105"
					/>
					{/* remove this item */}
				</Link>
				<button
					className="absolute top-0 z-20 duration-200 opacity-100 right-[2px] lg:right-4 bg-white/70 text-ash"
					onClick={() => removeItem(fig.link)}
				>
					<X size={18} />
				</button>
			</div>
		</div>
	);
};

export default RecentlyViewed;
