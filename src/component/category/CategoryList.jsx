/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const CategoryList = ({ figures, onCategorySelect }) => {
	const categoryNames = Array.from(new Set(figures.map((fig) => fig.category)));
	const [selectedCategory, setSelectedCategory] = useState(categoryNames[0]);

	useEffect(() => {
		onCategorySelect(selectedCategory);
	}, [selectedCategory, onCategorySelect]);

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	useEffect(() => {
		if (!selectedCategory) {
			const initialCategory = categoryNames[0];
			setSelectedCategory(initialCategory);
		}
	}, [selectedCategory, categoryNames]);

	return (
		<div className="grid grid-cols-2 gap-2 mt-16 border-b-2 border-gray-950 md:grid-cols-4 lg:grid-cols-5 md:gap-4 md:mr-40 lg:mr-72 md:ml-24 sm:mx-20">
			{categoryNames.map((category) => (
				// <div
				// 	key={category}
				// 	className={`btn-xs text-xs sm:text-sm md:text-base cursor-pointer border border-b-0 border-t-4 border-x-0 flex flex-nowrap mb-4  ${
				// 		selectedCategory === category
				// 			? "border-info text-info"
				// 			: "border-transparent text-accent"
				// 	}`}
				// 	onClick={() => handleCategoryClick(category)}
				// >
				// 	{category}
				// </div>
				<div
					key={category}
					className={`bg-transparent font-semibold px-2 py-1 rounded-t-lg select-none ${
						selectedCategory === category
							? "border-info text-info bg-gray-950 cursor-default"
							: "border-transparent text-white cursor-pointer"
					}`}
					onClick={() => handleCategoryClick(category)}
				>
					{category}
				</div>
				// <button
				//     key={category}
				//     className={`btn text-white btn-xs text-xs sm:text-sm md:btn-md rounded-sm no-animation ${
				//         selectedCategory === category ? "btn-accent text-white" : "btn-info"
				//     }`}
				//     onClick={() => handleCategoryClick(category)}
				// >
				//     {category}
				// </button>
			))}
		</div>
	);
};

export default CategoryList;
