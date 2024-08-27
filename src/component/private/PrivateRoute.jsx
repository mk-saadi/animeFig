// import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../provider/AuthProvider";
// import { useContext } from "react";

// const PrivateRoute = ({ children }) => {
// 	const { user, loading } = useContext(AuthContext);

// 	const location = useLocation();

// 	if (loading) {
// 		return <div>Loading...</div>;
// 	}

// 	if (user) {
// 		return children;
// 	}

// 	return (
// 		<Navigate
// 			state={{ from: location }}
// 			to="/auth/login"
// 			replace
// 		></Navigate>
// 	);
// };

// export default PrivateRoute;

/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useUser from "../hooks/useUser";

const UserRoutes = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const [isUser, isUserLoading] = useUser();
	const location = useLocation();

	if (loading || isUserLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<span className="w-32 h-32 loading loading-bars md:h-52 md:w-52"></span>
			</div>
		);
	}

	if (user && isUser) {
		return children;
	}

	return (
		<Navigate
			to="/auth/login"
			state={{ from: location }}
			replace
		></Navigate>
	);
};

export default UserRoutes;
