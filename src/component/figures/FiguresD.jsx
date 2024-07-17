import { useNavigate, useParams } from "react-router-dom";
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
import { Fade, Slide } from "react-awesome-reveal";
import ProductSlider from "./figure_component/SlideCard";
import Comment from "./figure_component/CommentComponent";

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
		<>
			<>
				<Navbar />
			</>
			<Fade triggerOnce>
				<div
					className={`flex px-12 flex-col overflow-visible items-center justify-center bg-white 
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
							className={`top-[5%] pl-4 h-full w-full min-h-screen overflow-visible duration-500
						${isScrolled ? "pt-10" : "pt-0"}
						`}
							id="position_sticky"
						>
							<div className="">
								<>
									<Breadcrumbs />
								</>
								<div className="flex flex-col items-start justify-start mt-4">
									<h1
										className="mb-8 text-kala"
										style={{
											fontSize: "24px",
											fontWeight: "400",
											lineHeight: "29px",
											letterSpacing: "0px",
										}}
									>
										{fig?.name}
									</h1>
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
													<span className="font-semibold">Pre-order bonuses</span>{" "}
													are <span className="font-semibold">not guaranteed</span>{" "}
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
					<div className="flex flex-col w-full min-h-screen my-20">
						<Comment fig={fig} />
					</div>
					<div className="flex flex-col w-full min-h-screen my-20 overflow-x-hidden gap-y-10">
						{simCharacters.length > 0 && (
							<div className="w-full">
								<h2 className="mb-4 text-2xl font-medium text-center text-kala">
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
								<h2 className="mb-4 text-2xl font-medium text-center text-kala">
									More from {fig.series}
								</h2>
								<ProductSlider
									figures={simSeries}
									isLoading={simSerIsLoading}
								/>
							</div>
						)}
					</div>
				</div>
			</Fade>

			<>
				<Footer />
			</>
		</>
	);
};

export default FiguresD;
