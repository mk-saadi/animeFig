import { Link } from "react-router-dom";
import { useFigures } from "../../hooks/APIS";
import { ArrowRight } from "lucide-react";

const Series = () => {
	const { figure, isLoading, error } = useFigures(`/figures/series`);

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
			<div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-6">
				{figure.map((fig) => (
					<Link
						key={fig._id}
						to={`/collections?series=${fig.series}&sort=&page=1`}
						className="flex flex-col items-center justify-center"
					>
						<div className="w-44 h-44 overflow-none">
							<img
								src={fig.images}
								alt=""
								className="object-cover w-full h-full duration-300 rounded-full hover:opacity-80"
							/>
						</div>
						<p className="text-sm text-center text-ash">{fig.series}</p>
					</Link>
				))}
			</div>
		</>
	);
};

export default Series;
