import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoriesState } from "../../hooks/APIS";

const Popovers = () => {
	const [categories] = useCategoriesState();
	const [hoveredCategory, setHoveredCategory] = useState(null);
	const [initialImage, setInitialImage] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenSeries, setIsOpenSeries] = useState(false);

	useEffect(() => {
		// Find the category with the name "Figma" and set it as the initial image
		const figmaCategory = categories.find((category) => category.name === "Figma");
		if (figmaCategory) {
			setInitialImage(figmaCategory.img);
		}
	}, [categories]);

	const handleMouseEnter = (categoryId) => {
		setHoveredCategory(categoryId);
	};

	const handleMouseLeave = () => {
		setHoveredCategory(null);
	};

	return (
		<div className="hidden md:block">
			<div className="flex items-center justify-center gap-x-2.5">
				{/* TODO: dropdown will go here */}
				<div className="relative w-full">
					<button
						className="flex items-center justify-center p-0 text-white duration-300 gap-x-[2px] focus:outline-none"
						onMouseEnter={() => setIsOpen(true)}
						onMouseLeave={() => setIsOpen(false)}
					>
						Figures
						<ChevronDownIcon className={`w-5 h-5 duration-300 ${isOpen ? "mt-1" : ""}`} />
					</button>
					<div
						className={`absolute w-full left-0 origin-top-left transition-all duration-300 ease-in-out ${
							isOpen
								? "opacity-100 transform translate-y-0"
								: "opacity-0 transform -translate-y-2 pointer-events-none"
						}`}
						onMouseEnter={() => setIsOpen(true)}
						onMouseLeave={() => setIsOpen(false)}
					>
						<div className="grid justify-between items-start grid-cols-5 mt-4 bg-white border px-6 h-[22rem] border-gray-200 rounded-md shadow-lg w-[55rem]">
							{/* category list component */}
							<div className="col-span-2">
								{categories.map((category) => (
									<div
										key={category._id}
										onMouseEnter={() => handleMouseEnter(category._id)}
										onMouseLeave={handleMouseLeave}
										className="flex flex-col h-full text-sm"
									>
										<Link
											to={`/collections/figures/${category.name}`}
											className="block px-4 py-2 duration-300 text-ash hover:text-laal"
											onClick={() => setIsOpen(false)}
										>
											{category.name}
										</Link>
									</div>
								))}
							</div>
							{/* image component */}
							<div className="col-span-3 border w-60 h-80 border-laal">
								{hoveredCategory
									? categories.map(
											(category) =>
												category._id === hoveredCategory && (
													<img
														key={category._id}
														src={category.img}
														alt={category.name}
														className="object-cover w-full h-full"
													/>
												)
									  )
									: initialImage && (
											<img
												src={initialImage}
												alt="Figma"
												className="object-cover w-full h-full"
											/>
									  )}
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
	);
};

export default Popovers;
