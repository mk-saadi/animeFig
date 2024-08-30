import useTitle from "../hooks/useWebTitle";
import useScrollToTop from "../hooks/useScrollToTop";
import FirstRow from "./home_component/FirstRow";
import NewArrival from "./home_component/NewArrival";
import ComingSoon from "./home_component/ComingSoon";
import Offer from "./home_component/Offer";
import PreOwned from "./home_component/PreOwned";

const Home = () => {
	useTitle("Home");
	useScrollToTop();

	return (
		<>
			<header className="mb-10">
				<FirstRow />
			</header>

			<main className="mt-20">
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
			</main>
		</>
	);
};

export default Home;
