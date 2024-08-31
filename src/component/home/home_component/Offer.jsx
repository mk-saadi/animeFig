import { Link } from "react-router-dom";
import { useFigures } from "../../hooks/APIS";
import { useEffect, useState } from "react";
import Products from "../../prouducts/Products";

const Offer = () => {
	const { figure: offer, isLoading: offer_loading, error: offer_error } = useFigures(`/figures/with_offer`);

	return (
		<div>
			<h2 className=" text-2xl flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
				<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
				On Sale
			</h2>
			<div className="py-4 overflow-hidden">
				{offer?.length > 0 && (
					<div className="grid grid-cols-1 transition duration-500 transform gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
						{offer.map((fig) => (
							<Products
								key={fig._id}
								fig={fig}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Offer;
