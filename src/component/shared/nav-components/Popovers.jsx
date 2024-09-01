import { ArrowRight, ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoriesState, useFigures } from "../../hooks/APIS";

const Popovers = () => {
	const [categories] = useCategoriesState();
	const { figure, isLoading, error } = useFigures(`/figures/series`);
	console.log(
		"figure: ",
		figure.map((fig) => fig?.series)
	);
	const [initialImage, setInitialImage] = useState(null);
	const [isOpenFigure, setIsOpenFigure] = useState(false);
	const [isOpenSeries, setIsOpenSeries] = useState(false);

	return (
		<div className="hidden md:block">
			<div className="flex items-center justify-center gap-x-2.5">
				{/* TODO: dropdown will go here */}
				{/* figures */}
				<div className="relative w-full">
					<button
						className="flex items-center justify-center p-0 text-white duration-300 gap-x-[2px] focus:outline-none"
						onMouseEnter={() => setIsOpenFigure(true)}
						onMouseLeave={() => setIsOpenFigure(false)}
					>
						Figure
						<ChevronDownIcon className={`w-5 h-5 duration-300 ${isOpenFigure ? "mt-1" : ""}`} />
					</button>
					<div
						className={`absolute w-full left-0 origin-top-left transition-all duration-300 ease-in-out ${
							isOpenFigure
								? "opacity-100 transform translate-y-0"
								: "opacity-0 transform -translate-y-2 pointer-events-none"
						}`}
						onMouseEnter={() => setIsOpenFigure(true)}
						onMouseLeave={() => setIsOpenFigure(false)}
					>
						<div className="flex flex-row items-start justify-center px-6 py-5 mt-4 bg-white border border-gray-200 rounded-md shadow-lg gap-x-12 w-fit h-fit ">
							{/* first row */}
							<div className="flex flex-col">
								<h2 className="mb-2 text-lg flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
									<div className="w-5 h-[2px] rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
									Categories
								</h2>
								<div className="flex flex-col gap-y-2">
									{categories?.map((category) => (
										<Link
											to={`/collections?category=${category.name}&sort=&page=1`}
											key={category.id}
											onClick={() => setIsOpenFigure(false)}
											className="flex items-center justify-start gap-x-1.5 duration-200 ml-8 text-sm group whitespace-nowrap text-ash hover:text-laal"
										>
											{category.name}
											<ArrowRight
												size={18}
												className="duration-300 opacity-0 group-hover:opacity-100"
											/>
										</Link>
									))}
								</div>
							</div>
							{/* second row */}
							<div className="flex flex-col">
								<h2 className="mb-2 text-lg flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
									<div className="w-5 h-[2px] rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
									Popular Series
								</h2>

								<div className="flex justify-start items-center gap-x-2.5">
									{figure?.slice(0, 5)?.map((category) => (
										<div
											key={category?.id}
											className="flex flex-col items-start justify-center"
										>
											<Link
												to={`/collections?category=${category?.name}&sort=&page=1`}
												onClick={() => setIsOpenFigure(false)}
												className="w-32 overflow-hidden h-52"
											>
												<img
													src={category?.images}
													alt=""
													className="object-cover w-full h-full duration-150 rounded-sm hover:opacity-70"
												/>
											</Link>
											<p className="text-sm text-center line-clamp-1 text-ash group-hover:text-gray-500">
												{category?.series}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* series */}
				<div className="relative w-full">
					<button
						className="flex items-center justify-center p-0 text-white duration-300 gap-x-[2px] focus:outline-none"
						onMouseEnter={() => setIsOpenSeries(true)}
						onMouseLeave={() => setIsOpenSeries(false)}
					>
						Series
						<ChevronDownIcon className={`w-5 h-5 duration-300 ${isOpenSeries ? "mt-1" : ""}`} />
					</button>
					<div
						className={`absolute w-full left-0 origin-top-left transition-all duration-300 ease-in-out ${
							isOpenSeries
								? "opacity-100 transform translate-y-0"
								: "opacity-0 transform -translate-y-2 pointer-events-none"
						}`}
						onMouseEnter={() => setIsOpenSeries(true)}
						onMouseLeave={() => setIsOpenSeries(false)}
					>
						<div className="mt-4 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg w-96 h-fit ">
							<a
								href="#"
								className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
							>
								Option 1
							</a>
							<a
								href="#"
								className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
							>
								Option 2
							</a>
							<a
								href="#"
								className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
							>
								Option 3
							</a>
						</div>
					</div>
				</div>
				{/* trending */}
				<div className="relative w-full">
					<div className="text-white duration-300 cursor-pointer hover:underline">
						<p>Trending</p>
					</div>
				</div>
				{/* contacts */}
				<div className="relative w-full">
					<div className="text-white duration-300 cursor-pointer hover:underline">
						<p>Contacts</p>
					</div>
				</div>
			</div>
		</div>
		// <div>
		// 	<p>Popovers</p>
		// </div>
	);
};

export default Popovers;
