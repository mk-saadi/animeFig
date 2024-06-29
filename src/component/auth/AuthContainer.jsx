import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useEffect } from "react";

const AuthContainer = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (window.location.pathname === "/auth") {
			navigate("/auth/login");
		}
	}, []);

	return (
		<>
			<div>
				<Navbar />
			</div>
			<div className="flex items-center justify-center min-h-screen">
				<div className="flex flex-col items-center justify-center">
					<div className="space-x-3 text-lg font-semibold text-gray-500">
						<NavLink to="login">Login</NavLink>
						<NavLink to="register">Register</NavLink>
					</div>
					{location.pathname === "/auth" && (
						<Navigate
							to="/auth/login"
							replace
						/>
					)}
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default AuthContainer;
