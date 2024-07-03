import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Toaster } from "react-hot-toast";

const Main = () => {
	return (
		<div className="w-full bg-white">
			<Navbar />

			<div className="w-full overflow-x-hidden overflow-y-auto pt-28 will-change-scroll">
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
		</div>
	);
};

export default Main;
