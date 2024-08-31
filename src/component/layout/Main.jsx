import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Toaster } from "react-hot-toast";
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

			<div className="w-full px-8 pt-40 pb-20 overflow-x-hidden overflow-y-auto will-change-scroll">
				<Outlet />
			</div>
			<Footer />
			<Toaster
				toastOptions={{
					className: "",
					style: {
						border: "1px solid #713200",
						padding: "16px",
						color: "#713200",
						fontWeight: "bolder",
					},
					success: {
						duration: 3000,
						theme: {
							primary: "green",
							secondary: "blue",
						},
					},
				}}
			/>
			<ScrollRestoration />
		</div>
	);
};

export default Main;
