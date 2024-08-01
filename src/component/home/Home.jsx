import image from "../../assets/background.jpg";
import Products from "../prouducts/Products";
import useTitle from "../hooks/useWebTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import { useFigures } from "../hooks/APIS";

const Home = () => {
	const {
		figure: figures,
		isLoading: isLoadingFormValues,
		error: errorFormValues,
	} = useFigures(`/figures/card`);

	useTitle("Home");
	useScrollToTop();

	return (
		<>
			<header className="relative h-[36rem]">
				<img
					src={image}
					alt=""
					className="object-cover w-full rounded-md shadow-lg h-5/6 sm:h-[36rem]"
				/>
			</header>

			<main className="mt-20">
				{/* shop section */}
				<h3 className="pl-4 mt-20 ml-4 -mb-12 text-xl font-bold border-l-2 md:text-2xl sm:ml-20 text-info border-sky-400">
					Best Selling Merch
				</h3>
				<div className="grid grid-cols-1 mt-8 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
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
