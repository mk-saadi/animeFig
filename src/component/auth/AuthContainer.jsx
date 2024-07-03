import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import image from "../../assets/background.jpg";
import Footer from "../shared/Footer";

const AuthContainer = () => {
	return (
		<>
			<>
				<Navbar />
			</>

			<div
				className="relative flex items-start justify-center min-h-screen pb-20 bg-fixed bg-white bg-center bg-cover pt-44"
				style={{ backgroundImage: `url(${image})` }}
			>
				<div className="absolute inset-0 z-10 w-full h-full bg-gray-500 bg-opacity-65 backdrop-blur-sm" />
				<div className="z-20 flex flex-col items-center justify-center overflow-hidden rounded-md shadow-xl">
					<div className="flex items-center justify-center w-full text-lg bg-gray-200 border-t border-dhusor  rounded-tl-lg rounded-tr-lg py-2.5 border-x text-ash loginActive font-serif font-[900] uppercase">
						<NavLink
							className="flex justify-center w-full"
							to="login"
						>
							Login
						</NavLink>
						<span className="mx-2.5 w-px h-[30px] py-px bg-dhusor " />
						<NavLink
							className="flex justify-center w-full"
							to="register"
						>
							Register
						</NavLink>
					</div>
					<div className="flex items-center justify-center w-full bg-white border rounded-b-lg border-dhusor h-fit">
						<Outlet />
					</div>
				</div>
			</div>

			<>
				<Footer />
			</>
		</>
	);
};

export default AuthContainer;
