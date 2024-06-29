import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";

const AuthContainer = () => {
	return (
		<>
			<div>
				<Navbar />
			</div>

			<div className="flex items-start justify-center min-h-screen mt-16">
				<div className="flex flex-col items-center justify-center overflow-hidden rounded-md shadow-md">
					<div className="flex items-center justify-center w-full text-lg font-semibold text-gray-500 bg-gray-700 loginActive">
						<NavLink
							className="flex justify-center w-full"
							to="login"
						>
							Login
						</NavLink>
						<NavLink
							className="flex justify-center w-full"
							to="register"
						>
							Register
						</NavLink>
					</div>
					<div className="flex items-center justify-center w-full bg-gray-800 h-fit">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthContainer;
