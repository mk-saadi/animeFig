import useTitle from "../hooks/useWebTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import FirstRow from "./home_component/FirstRow";
import NewArrival from "./home_component/NewArrival";
import ComingSoon from "./home_component/ComingSoon";
import Offer from "./home_component/Offer";
import PreOwned from "./home_component/PreOwned";
import Series from "./home_component/Series";

const Home = () => {
	useTitle("Home");
	useScrollToTop();

	return (
		<>
			<header className="mb-10">
				<FirstRow />
			</header>

			<main className="flex flex-col mt-20 bg-white gap-y-12">
				<>
					<NewArrival />
				</>
				<>
					<ComingSoon />
				</>
				<>
					<Offer />
				</>
				<>
					<PreOwned />
				</>
				<>
					<Series />
				</>
			</main>
		</>
	);
};

export default Home;
