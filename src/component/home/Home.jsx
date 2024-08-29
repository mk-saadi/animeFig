import Products from "../prouducts/Products";
import useTitle from "../hooks/useWebTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import { useFigures } from "../hooks/APIS";
import FirstRow from "./home_component/FirstRow";

const Home = () => {
	const {
		figure: figures,
		isLoading: isLoadingFormValues,
		error: errorFormValues,
	} = useFigures(`/figures/card`);
	console.log("figures: ", figures);

	useTitle("Home");
	useScrollToTop();

	return (
		<>
			<div className="mb-10">
				<FirstRow />
			</div>

			<main className="mt-20">
				{/* shop section */}
				<h3 className="pl-4 ml-4 text-xl font-bold border-l-2 md:text-2xl sm:ml-20 text-info border-sky-400">
					Best Selling Merch
				</h3>
				<div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
					{figures.map((fig) => (
						<Products
							key={fig._id}
							fig={fig}
						></Products>
					))}
				</div>
			</main>
		</>
	);
};

export default Home;
