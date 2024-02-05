import { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import CategoryD from "./CategoryD";

const Categories = () => {
	const [figures, setFigures] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		fetch(`https://server-anime-fig.vercel.app/addedFigure`)
			.then((res) => res.json())
			.then((data) => {
				setFigures(data);
				setSelectedCategory(data.length > 0 ? data[0].category : null);
			});
	}, []);

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
	};

	const filteredFigures = selectedCategory
		? figures.filter((fig) => fig.category === selectedCategory)
		: figures;

	const numberOfEntriesToShow = 6; // For example, show the latest 5 entries

	// Slice the array to show only the latest entries
	const latestFigures = filteredFigures.slice(0, numberOfEntriesToShow);

	return (
		<>
			<div className="mt-20">
				<h3 className="pl-4 mt-20 ml-4 -mb-12 text-xl font-bold border-l-2 md:text-2xl sm:ml-20 text-info border-sky-400">
					Shop Merch By Sub-category
				</h3>

				<CategoryList
					figures={figures}
					selectedCategory={selectedCategory}
					onCategorySelect={handleCategorySelect}
				/>

				<div className="grid grid-cols-2 mx-4 bg-gray-900 gap-x-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:mx-20">
					{latestFigures.map((figS) => (
						<CategoryD
							key={figS._id}
							figS={figS}
						></CategoryD>
					))}
				</div>
			</div>
		</>
	);
};

export default Categories;
