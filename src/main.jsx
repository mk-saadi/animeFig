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
import Products from "./component/prouducts/Products";
import AllToys from "./component/figure/AllToys";
import MyToys from "./component/figure/MyToys";
import AddToys from "./component/figure/AddToys";
import FigD from "./component/figure/FigD";
import EditMyToys from "./component/figure/EditMyToys";
import ErrorPage from "./component/errorPage/ErrorPage";
import Categories from "./component/category/Categories";
import Exp from "./component/hooks/Exp";
import { CartProvider } from "./component/provider/CartProvider";
// import { ToastProvider } from "./component/hooks/ToastProvider";
import { ToastProvider } from "react-toast-master";
import AuthContainer from "./component/auth/AuthContainer";
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
				// loader: () => fetch(`${import.meta.env.VITE_URL}/figures`),
				loader: () => fetch("http://localhost:3000/figures"),
			},

			{
				path: "/:id",
				element: (
					<PrivateRoute>
						<FiguresD />
					</PrivateRoute>
				),
				loader: ({ params }) => fetch(`${import.meta.env.VITE_URL}/figures/${params.id}`),
			},
			{
				path: "/allToys",
				element: <AllToys />,
				loader: () => fetch(`${import.meta.env.VITE_URL}/addedFigure`),
			},
			{
				path: "/figDetails/:id",
				element: (
					<PrivateRoute>
						<FigD />
					</PrivateRoute>
				),
				loader: ({ params }) => fetch(`${import.meta.env.VITE_URL}/addedFigure/${params.id}`),
			},
			{
				path: "/myToys",
				element: (
					<PrivateRoute>
						<MyToys />
					</PrivateRoute>
				),
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
				// loader: ({ params }) => fetch(`${import.meta.env.VITE_URL}/addedFigure/${params.id}`),
			},
			{
				path: "/categories/:category",
				element: <Categories />,
			},
			{
				path: "/exp",
				element: <Exp />,
				// loader: () => fetch("http://localhost:3000/totalAddedFigure"),
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
