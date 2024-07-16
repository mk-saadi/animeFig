import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Toaster } from "react-hot-toast";

const Main = () => {
	return (
		<div className="w-full bg-white">
			<Navbar />

			<div className="w-full px-8 pt-40 pb-10 overflow-x-hidden overflow-y-auto will-change-scroll">
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
