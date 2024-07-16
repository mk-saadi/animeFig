import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import useTitle from "../hooks/useWebTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import { useCart } from "../provider/CartProvider";
import ImageZoom from "../hooks/ImageZoom";
import Breadcrumbs from "../hooks/BreadCrumbs";
import { Facebook, Frown, Gem, InfoIcon, Mail, MessageCircle, ShoppingCart, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import useScroll from "../hooks/Scroll";
import axios from "axios";
import useFetchSimilarCharacters from "../hooks/APIS";
import { useFigures, useFetchSimilarItems } from "../hooks/APIS";
import ImageComponent from "./figure_component/ImageComponent";
import ButtonComponent from "./figure_component/ButtonComponent";
import ShareComponent from "./figure_component/ShareComponent";

const FiguresD = () => {
	const { link } = useParams();
	const isScrolled = useScroll("top-navbar");
	const navigate = useNavigate();

	// fetch current figure
	const { figure: fig, isLoading, error } = useFigures(`/figures/${link}`);
	// fetch similar figures
	const {
		items: simCharacters,
		isLoading: simCharIsLoading,
		error: simCharError,
	} = useFetchSimilarItems("/similar_characters", link);
	// fetch similar series
	const {
		items: simSeries,
		isLoading: simSerIsLoading,
		error: simSerError,
	} = useFetchSimilarItems("/similar_series", link);

	useScrollToTop();
	useTitle("Collections | " + fig?.name);

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div>
			<>
				<Navbar />
			</>
			<div
				className={`flex flex-col overflow-visible items-center justify-center bg-white 
				${isScrolled ? "pt-40" : "pt-40"}
				`}
			>
				<div className="flex justify-between gap-x-4">
					{/* image component */}
					<>
						<ImageComponent fig={fig} />
					</>
					{/* info component */}
					<div
						className={`top-[5%] pr-8 pl-4 h-full w-full min-h-screen overflow-visible duration-500
						${isScrolled ? "pt-10" : "pt-0"}
						`}
						id="position_sticky"
					>
						<div className="">
							<>
								<Breadcrumbs />
							</>
							<div className="flex flex-col items-start justify-start mt-2">
								<p
									className="mb-4 text-kala"
									style={{
										fontSize: "24px",
										fontWeight: "400",
										lineHeight: "29px",
										letterSpacing: "0px",
									}}
								>
									{fig?.name}
								</p>
								{/* figure buy/add to cart button/link */}
								<>
									<ButtonComponent fig={fig} />
								</>
								{fig?.label === "Coming Soon" && (
									<div className="w-full p-2 mt-4 text-[#1071a6] rounded-md bg-[#e0f2fe]">
										<div className="flex items-center justify-center gap-x-3">
											<InfoIcon size={30} />
											<p className="text-xs font-normal">
												The shipping weight/price and release date are based on
												manufacturer estimates and can change.{" "}
												<span className="font-semibold">Pre-order bonuses</span> are{" "}
												<span className="font-semibold">not guaranteed</span> to be
												included.
											</p>
										</div>
									</div>
								)}
							</div>
							{/* share figure */}
							<>
								<ShareComponent />
							</>
							<div className="mt-10 text-slate-300">
								<p>
									<span className="font-semibold">Product Name:</span> {fig?.name}
								</p>
								<p>
									<span className="font-semibold">Manufacturer:</span> {fig?.brand}
								</p>
								<p>
									<span className="font-semibold">Dimension:</span> {fig?.dimension}
								</p>
								<p>
									<span className="font-semibold">Seller:</span> {fig?.seller}
								</p>
								<p>
									<span className="font-semibold">character:</span> {fig?.character}
								</p>
								<p className="my-3 text-gray-400">Order Limit: 3 per person</p>
								<p
									style={{ whiteSpace: "pre-line" }}
									className="mt-10"
								>
									{fig?.description}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="h-screen">
					<p>hello</p>
				</div>
			</div>

			<>
				<Footer />
			</>
		</div>
	);
};

export default FiguresD;
