import { Link } from "react-router-dom";
import { useFigures } from "../../hooks/APIS";
import { ArrowRight } from "lucide-react";
import { Fade } from "react-awesome-reveal";

const Series = () => {
	const { figure, isLoading, error } = useFigures(`/figures/series_home`);

	return (
		<>
			<div className="flex justify-between w-full">
				<h2 className=" text-2xl flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
					<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
					By Series
				</h2>
				<Link
					className="gap-x-1.5 hover:gap-x-4 flex items-center justify-center text-base duration-300 hover:text-laal hover:underline text-ash"
					to={`/collections?order=asc&page=1`}
				>
					Browse Collections
					<ArrowRight size={18} />
				</Link>
			</div>
			<div className="grid grid-cols-4 gap-4 sm:grid-cols-5 lg:grid-cols-6">
				{figure.map((fig) => (
					<Fade
						key={fig._id}
						triggerOnce
					>
						<Link
							to={`/collections?series=${fig.series}&sort=&page=1`}
							className="flex flex-col items-center justify-center group"
						>
							<div className="relative w-24 h-24 rounded-full shadow-md lg:w-44 lg:h-44 overflow-none">
								<img
									src={fig.images}
									alt=""
									className="object-cover w-full h-full duration-150 rounded-full hover:opacity-70"
								/>
								<div className="absolute inset-0 z-30 flex items-center justify-center duration-300 rounded-full opacity-0 bg-ash backdrop-blur-sm bg-opacity-30 group-hover:opacity-100 ">
									<p className="text-sm font-normal text-center text-white">
										Browse
										<br />
										Collection
									</p>
								</div>
							</div>
							<p className="text-sm text-center line-clamp-2 text-ash group-hover:text-gray-500">
								{fig.series}
							</p>
						</Link>
					</Fade>
				))}
			</div>
		</>
	);
};

export default Series;
