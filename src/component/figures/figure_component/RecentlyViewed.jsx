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
				<h2 className="text-xl font-medium text-kala">Recently Viewed</h2>
				<button
					onClick={removeAll}
					className="text-sm text-ash hover:text-ash/70"
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
		<div className="pb-5 product-card">
			<div className="flex items-center justify-center w-full mb-1 rounded-md">
				<Link
					className="group w-[65px] overflow-hidden h-[80px] relative"
					to={`/collections/${fig?.link}`}
					title={fig?.name}
				>
					<img
						src={fig?.image}
						alt={fig?.name}
						className="object-cover w-full h-full duration-300 group-hover:scale-105"
					/>
					{/* remove this item */}
					<button
						className="absolute top-0 right-0 duration-200 opacity-0 group-hover:opacity-100 bg-white/50 text-ash"
						onClick={() => removeItem(fig.link)}
					>
						<X size={18} />
					</button>
				</Link>
			</div>
		</div>
	);
};

export default RecentlyViewed;
