import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Toaster } from "react-hot-toast";
import Navbar1 from "../hooks/Exp3";

const Main = () => {
	return (
		<div className="bg-gray-100">
			{/* <Navbar /> */}
			<Navbar1 />

			<div className="pt-16">
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
