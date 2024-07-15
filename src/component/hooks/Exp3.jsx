import React from "react";

const ProductDetail = ({ fig, isLoading }) => {
	return (
		<div>
			{/* {isLoading && <Loader />} */}

			{isLoading ? (
				<div className="h-[224px] animate-pulse rounded-md dark:bg-gray-300" />
			) : (
				<img
					src={fig?.images}
					alt={fig?.name}
					className="object-cover w-full h-56 duration-300 group-hover:scale-110"
				/>
			)}

			<p className="text-sm text-ash/70">{fig?.name}</p>
		</div>
	);
};

export default ProductDetail;
