import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./component/layout/Main";
import Home from "./component/home/Home";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import AuthProvider from "./component/provider/AuthProvider";
import FiguresD from "./component/figures/FiguresD";
import PrivateRoute from "./component/private/PrivateRoute";
import AddToys from "./component/figure/AddToys";
import EditMyToys from "./component/figure/EditMyToys";
import ErrorPage from "./component/errorPage/ErrorPage";
import Exp from "./component/hooks/Exp";
import { CartProvider } from "./component/provider/CartProvider";
// import { ToastProvider } from "./component/hooks/ToastProvider";
import { ToastProvider } from "react-toast-master";
import AuthContainer from "./component/auth/AuthContainer";
import Collections from "./component/collections/Collections";
// import { ToastProvider } from "../../../../npm package/react-toast-master-demo/src/ToastProvider";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <ErrorPage />,
		element: <Main />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/collections",
				element: <Collections />,
			},
			{
				path: "/addAToys",
				element: (
					<PrivateRoute>
						<AddToys />
					</PrivateRoute>
				),
			},
			{
				path: "/editMyToys/:id",
				element: (
					<PrivateRoute>
						<EditMyToys />
					</PrivateRoute>
				),
			},
			{
				path: "/exp",
				element: <Exp />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthContainer />,
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
		],
	},
	// individual figure details page
	{
		path: "/collections/:link",
		element: <FiguresD />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<CartProvider>
				<ToastProvider>
					<RouterProvider router={router} />
				</ToastProvider>
			</CartProvider>
		</AuthProvider>
	</React.StrictMode>
);
