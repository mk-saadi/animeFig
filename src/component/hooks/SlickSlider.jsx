import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Products from "../prouducts/Products";
import { Pagination, Scrollbar } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProductSliders = ({ figures, isLoading }) => {
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
						slidesPerView: 5,
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

export default ProductSliders;
