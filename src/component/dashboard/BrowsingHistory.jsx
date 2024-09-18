import { useState } from "react";
import ProductSlider from "../figures/figure_component/SlideCard";
import Breadcrumbs from "../hooks/BreadCrumbs";

const BrowsingHistory = () => {
	const [visitedFigures, setVisitedFigures] = useState(() => {
		return JSON.parse(sessionStorage.getItem("visitedFigures")) || [];
	});

	return (
		<>
			<div className="flex flex-col w-full min-h-screen overflow-x-hidden">
				<>
					<Breadcrumbs />
				</>
				<h2 className="my-4 text-2xl flex justify-start items-center gap-x-2.5 font-medium text-center text-kala">
					<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
					Browsing History
				</h2>
				{visitedFigures.length > 0 && (
					<div className="w-full">
						<ProductSlider figures={visitedFigures} />
					</div>
				)}
			</div>
		</>
	);
};

export default BrowsingHistory;
