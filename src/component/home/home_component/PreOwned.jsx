import { Link } from "react-router-dom";
import { useFigures } from "../../hooks/APIS";
import { useEffect, useState } from "react";
import Products from "../../prouducts/Products";

const PreOwned = () => {
	const { figure: pre, isLoading: pre_loading, error: pre_error } = useFigures(`/figures/pre_owned`);

	return (
		<div>
			<h2>New Arrivals</h2>
			<div className="py-4 overflow-hidden">
				{pre?.length > 0 && (
					<div className="grid grid-cols-1 transition duration-500 transform gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
						{pre.map((fig) => (
							<Products
								key={fig._id}
								fig={fig}
								isLoading={pre_loading}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default PreOwned;
