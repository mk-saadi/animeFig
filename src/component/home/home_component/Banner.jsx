/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = ({ banner }) => {
	const [charLimit, setCharLimit] = useState(40);

	useEffect(() => {}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1024) {
				setCharLimit(20);
			} else {
				setCharLimit(40);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Link
			className="relative hidden mx-2 mb-10 duration-200 border border-gray-700 rounded-lg shadow-lg sm:block hover:border-gray-400 group"
			to={`/figDetails/${banner._id}`}
		>
			<div className="overflow-hidden rounded-lg">
				<img
					className="hidden object-cover duration-700 rounded-none shadow-xl sm:block sm:w-32 sm:h-44 md:w-36 lg:h-64 lg:w-52 drop-shadow-xl group-hover:scale-125"
					src={banner.img}
					alt=""
				/>
			</div>
			<div className="text-dhusor  absolute bottom-0 h-full w-full rounded-lg bg-gradient-to-t from-[#0c0c0c] to-[rgba(21,21,21,0)] shadow-lg">
				<p className="absolute w-full font-normal text-center transition-opacity duration-300 md:text-sm lg:text-base sm:text-base bottom-14 md:bottom-8 lg:bottom-14 xl:bottom-8 btn-xs opacity-1 group-hover:opacity-0">
					{banner?.name.slice(0, charLimit)}
					{banner?.name.length > charLimit ? "..." : ""}
				</p>
				<button className="absolute w-full font-normal transition-opacity duration-300 opacity-0 sm:text-base bottom-8 btn-xs group-hover:opacity-100">
					View Product
				</button>
			</div>
		</Link>
	);
};

export default Banner;
