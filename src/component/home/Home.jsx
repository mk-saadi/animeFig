import { Link, useLoaderData } from "react-router-dom";
import Banner from "./Banner";
import image from "../../assets/background.jpg";
import Products from "../prouducts/Products";
import { useEffect, useState } from "react";
import ShowFig from "../showFig/ShowFig";
// import Categories from "../category/Categories";
import useTitle from "../hooks/useWebTitle";
import axios from "axios";
import useScrollToTop from "../hooks/useScrollToTop";

const Home = () => {
	const figures = useLoaderData();
	console.log("figures: ", figures);
	const [showFig, setFig] = useState([]);
	const [banner, setBanner] = useState([]);

	useTitle("Home");
	useScrollToTop();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`${import.meta.env.VITE_URL}/addedFigure/pagination`);
				if (res.status === 200) {
					const data = res.data;
					setFig(data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		const fetchBanner = async () => {
			try {
				const res = await axios.get(`${import.meta.env.VITE_URL}/addedFigure/latest`);
				if (res.status === 200) {
					const data = res.data;
					setBanner(data);
				}
			} catch (error) {
				console.log();
			}
		};

		fetchData();
		fetchBanner();
	}, []);

	return (
		<>
			<header className="relative h-[36rem] mx-3 sm:mx-20 mt-14">
				<img
					src={image}
					alt=""
					className="object-cover w-full rounded-md shadow-lg h-5/6 sm:h-[36rem]"
				/>
				<div className="flex justify-center gap-2 absolute bottom-0 w-full rounded-md bg-gradient-to-t from-[#000] to-[rgba(21,21,21,0)] shadow-lg">
					{banner.map((banner) => (
						<Banner
							key={banner._id}
							banner={banner}
						></Banner>
					))}
				</div>
			</header>

			<main className="mt-20">
				{/* shop section */}
				<h3 className="pl-4 mt-20 ml-4 -mb-12 text-xl font-bold border-l-2 md:text-2xl sm:ml-20 text-info border-sky-400">
					Best Selling Merch
				</h3>
				<div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-6">
					{figures.map((figure) => (
						<Products
							key={figure._id}
							figure={figure}
						></Products>
					))}
				</div>

				{/* latest merch */}
				<h3 className="pl-4 mt-20 mb-4 ml-4 text-xl font-bold border-l-2 md:text-2xl sm:ml-20 text-info border-sky-400">
					Discover Latest Merch
				</h3>
				<div className="grid grid-cols-2 gap-4 mx-4 sm:grid-cols-3 md:grid-cols-6 sm:mx-20">
					{showFig.slice(0, 6).map((fi) => (
						<ShowFig
							key={fi._id}
							fi={fi}
						></ShowFig>
					))}
				</div>
				<div className="flex justify-end mt-4 mb-20 mr-4 md:mr-28">
					<Link to="/allToys">
						<button className="px-6 text-white rounded-sm btn btn-sm btn-accent">Show All</button>
					</Link>
				</div>
			</main>
		</>
	);
};

export default Home;
