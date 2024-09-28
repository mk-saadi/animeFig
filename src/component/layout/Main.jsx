import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useEffect } from "react";

const Main = () => {
	const location = useLocation();

	useEffect(() => {
		if (!location.pathname.startsWith("/auth/")) {
			sessionStorage.setItem("previousLocation", JSON.stringify(location));
		}
	}, [location]);

	return (
		<div className="w-full bg-white">
			<Navbar />

			<div className="w-full px-1 pt-40 pb-20 overflow-x-hidden overflow-y-auto lg:px-8 will-change-scroll">
				<Outlet />
			</div>
			<Footer />
			<ScrollRestoration />
		</div>
	);
};

export default Main;
