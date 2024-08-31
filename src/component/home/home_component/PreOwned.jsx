import { Link } from "react-router-dom";
import { useFigures } from "../../hooks/APIS";
import { useEffect, useState } from "react";
import Products from "../../prouducts/Products";
import { ArrowRight } from "lucide-react";

const PreOwned = () => {
	const { figure, isLoading: pre_loading, error: pre_error } = useFigures(`/figures/pre_owned`);

	const figs = figure?.detailedFigures || [];
	const add = figure?.additionalFigures || [];

	return (
		<div>
			<h2 className=" text-2xl flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
				<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
				Pre Owned
			</h2>
			<div className="py-4 overflow-hidden">
				{figs?.length > 0 && (
					<div className="grid grid-cols-1 transition duration-500 transform gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
						{figs.map((fig) => (
							<Products
								key={fig._id}
								fig={fig}
								isLoading={pre_loading}
							/>
						))}
						<div className="relative grid items-center justify-center grid-cols-2 mx-2 group">
							{add.map((fig) => (
								<div key={fig._id}>
									<div className="w-[4.8rem] overflow-hidden rounded-md shadow-lg shadow-ash/25 h-[8.5rem]">
										<img
											src={fig.images}
											alt=""
											className="object-cover w-full h-full duration-300 group-hover:opacity-80"
										/>
									</div>
								</div>
							))}
							<Link
								className="absolute gap-x-1.5 group-hover:gap-x-4 inset-0 flex items-center justify-center w-full h-full text-sm duration-300 group-hover:text-laal group-hover:underline text-ash"
								to={`/collections?name=&category=&series=&character=&sort=&label=Pre+Owned&order=asc&page=1`}
							>
								View more
								<ArrowRight size={18} />
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PreOwned;
