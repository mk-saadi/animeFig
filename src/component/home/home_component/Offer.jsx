import { Link } from "react-router-dom";
import { useFigures } from "../../hooks/APIS";
import Products from "../../prouducts/Products";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
	// const { figure, isLoading, error } = useFigures(`/figures/with_offer`);
	const [figure, setFigure] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchFigures = async () => {
			setIsLoading(true);
			try {
				const res = await axios.get(`${import.meta.env.VITE_URL}/figures/with_offer`);
				const data = res.data;
				setFigure(data);
				setIsLoading(false);
			} catch (error) {
				console.error("Failed to fetch figures:", error);
			}
		};
		fetchFigures();
	}, []);

	const figs = figure?.figuresWithOffer || [];
	const add = figure?.additionalFigures || [];

	return (
		<div>
			<h2 className="text-xl lg:text-2xl flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
				<div className="w-8 lg:w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
				On Sale
			</h2>
			<div className="overflow-hidden">
				{figs?.length > 0 && (
					<div className="grid grid-cols-2 transition duration-500 transform sm:grid-cols-3 gap-x-2 gap-y-4 md:grid-cols-4 lg:grid-cols-5">
						{figs.map((fig) => (
							<Products
								key={fig._id}
								fig={fig}
								isLoading={isLoading}
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
								to={`/collections?name=&category=&series=&character=&sort=&label=Coming+Soon&order=asc&page=1`}
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

export default Offer;
