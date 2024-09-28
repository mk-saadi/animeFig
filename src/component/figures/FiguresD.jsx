import { useLocation, useParams } from "react-router-dom";
import useTitle from "../hooks/useWebTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import Breadcrumbs from "../hooks/BreadCrumbs";
import { InfoIcon } from "lucide-react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import useScroll from "../hooks/Scroll";
import { useFigures, useFetchSimilarItems } from "../hooks/APIS";
import ImageComponent from "./figure_component/ImageComponent";
import ButtonComponent from "./figure_component/ButtonComponent";
import ShareComponent from "./figure_component/ShareComponent";
import InfoComponent from "./figure_component/InfoComponent";
import { Fade } from "react-awesome-reveal";
import ProductSlider from "./figure_component/SlideCard";
import Comment from "./figure_component/CommentComponent";
import { useEffect, useState } from "react";
import RecentlyViewed from "./figure_component/RecentlyViewed";

const FiguresD = () => {
	const { link } = useParams();
	const isScrolled = useScroll("top-navbar");

	const location = useLocation();

	useEffect(() => {
		if (!location.pathname.startsWith("/auth/")) {
			sessionStorage.setItem("previousLocation", JSON.stringify(location));
		}
	}, [location]);

	/* -------------------------- fetch current figure -------------------------- */
	const { figure: fig, isLoading, error } = useFigures(`/figures/${link}`);

	/* -------------------------- fetch similar figures ------------------------- */
	const {
		items: simCharacters,
		isLoading: simCharIsLoading,
		error: simCharError,
	} = useFetchSimilarItems("/similar_characters", link);

	/* -------------------------- fetch similar series -------------------------- */
	const {
		items: simSeries,
		isLoading: simSerIsLoading,
		error: simSerError,
	} = useFetchSimilarItems("/similar_series", link);

	useScrollToTop();
	useTitle("Collections | " + fig?.name);

	const [visitedFigures, setVisitedFigures] = useState(() => {
		return JSON.parse(sessionStorage.getItem("visitedFigures")) || [];
	});

	useEffect(() => {
		if (fig.images) {
			const figureDetails = {
				name: fig.name,
				images: fig.images[0],
				link: fig.link,
				price: fig.price,
				label: fig.label,
			};

			const isFigureVisited = visitedFigures.some((item) => item.link === figureDetails.link);

			if (!isFigureVisited) {
				const updatedVisitedFigures = [...visitedFigures, figureDetails];

				setVisitedFigures(updatedVisitedFigures);

				sessionStorage.setItem("visitedFigures", JSON.stringify(updatedVisitedFigures));
			}
		}
	}, [fig, isLoading, error, visitedFigures]);

	return (
		<>
			{isLoading ? (
				<Fade>
					<div className="grid h-screen grid-cols-5 px-12 pt-16 pb-12 bg-white gap-x-8">
						{/* Product Image Placeholder */}
						<div className="w-full col-span-2 overflow-hidden bg-gray-300 rounded-lg aspect-w-1 aspect-h-1">
							<div className="flex items-center justify-center h-full">
								<svg
									className="w-12 h-12 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									></path>
								</svg>
							</div>
						</div>
						<div className="flex flex-col col-span-3 gap-y-8">
							{/* Product Info Placeholder */}
							<div className="w-3/4 h-8 bg-gray-300 rounded" />
							<div className="flex items-center justify-center gap-x-4">
								<div className="w-3/4 h-16 mt-4 bg-gray-300 rounded" />
								<div className="w-3/4 h-16 mt-4 bg-gray-300 rounded" />
							</div>
							<div className="h-32 bg-gray-300 rounded " />
						</div>
					</div>
				</Fade>
			) : (
				<>
					<>
						<Navbar />
					</>
					<Fade>
						<section
							className={`flex px-1 lg:px-12 flex-col overflow-visible items-center justify-center bg-white 
										${isScrolled ? "pt-40" : "pt-40"}`}
						>
							<div className="flex flex-col justify-between w-full lg:flex-row lg:gap-x-4">
								<div className="block mb-2 lg:hidden">
									<Breadcrumbs />
								</div>
								{/* image component */}
								<>
									<ImageComponent fig={fig} />
								</>
								{/* info component */}
								<div
									className={`top-[5%] lg:pl-4 h-full w-full min-h-screen overflow-visible duration-500
						${isScrolled ? "pt-10" : "pt-0"}
						`}
									id="position_sticky"
								>
									<div className="">
										<div className="hidden lg:block">
											<Breadcrumbs />
										</div>
										<div className="flex flex-col items-start justify-start mt-4">
											<h1
												className="mb-8 text-kala text-lg lg:text-[24px]"
												style={{
													fontWeight: "400",
													lineHeight: "29px",
													letterSpacing: "0px",
												}}
											>
												{fig?.name}
											</h1>
											{/* figure buy/add to cart buttons/links */}
											<>
												<ButtonComponent fig={fig} />
											</>
											{fig?.label === "Coming Soon" && (
												<div className="w-full p-2 mt-4 text-[#1071a6] rounded-md bg-[#dbeffc]">
													<div className="flex items-center justify-center gap-x-3">
														<InfoIcon size={30} />
														<p className="text-xs font-normal">
															The shipping weight/price and release date are
															based on manufacturer estimates and can change.{" "}
															<span className="font-semibold">
																Pre-order bonuses
															</span>{" "}
															are{" "}
															<span className="font-semibold">
																not guaranteed
															</span>{" "}
															to be included.
														</p>
													</div>
												</div>
											)}
										</div>
										{/* share figure */}
										<>
											<ShareComponent />
										</>
										<div className="mt-4 text-slate-300">
											<InfoComponent fig={fig} />
										</div>
									</div>
								</div>
							</div>
							{/* comment section */}
							<div className="flex flex-col w-full my-20">
								<Comment fig={fig} />
							</div>
							<div className="flex flex-col w-full my-4">
								<RecentlyViewed
									visitedFigures={visitedFigures}
									setVisitedFigures={setVisitedFigures}
								/>
							</div>
							<div className="flex flex-col w-full my-20 overflow-x-hidden gap-y-10">
								{simCharacters.length > 0 && (
									<div className="w-full">
										<h2 className="mb-1 lg:mb-4 text-lg lg:text-2xl flex justify-center items-center gap-x-2.5 font-medium text-center text-kala">
											<div className="w-6 lg:w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
											More from {fig.character}
										</h2>
										<ProductSlider
											figures={simCharacters}
											isLoading={simCharIsLoading}
										/>
									</div>
								)}
								{simSeries.length > 0 && (
									<div className="w-full">
										<h2 className="mb-1 lg:mb-4 text-lg lg:text-2xl flex justify-center items-center gap-x-2.5 font-medium text-center text-kala">
											<div className="w-6 lg:w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
											More from {fig.series}
										</h2>
										<ProductSlider
											figures={simSeries}
											isLoading={simSerIsLoading}
										/>
									</div>
								)}
							</div>
						</section>
					</Fade>
					{/* footer section */}
					<>
						<Footer />
					</>
				</>
			)}
		</>
	);
};

export default FiguresD;
