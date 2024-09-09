import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../errorPage/ErrorPage";
import Main from "./Main";
import Home from "../home/Home";
import Collections from "../collections/Collections";
import CheckOut from "../Checkout/CheckOut";
import AddToys from "../figure/AddToys";
import EditMyToys from "../figure/EditMyToys";
import Exp from "../hooks/Exp";
import AuthContainer from "../auth/AuthContainer";
import Login from "../auth/Login";
import Register from "../auth/Register";
import FiguresD from "../figures/FiguresD";
import Payment from "../Checkout/checkout-component/Payment";
import OrdersTracking from "../dashboard/OrdersTracking";
// import UserRoutes from "../private/PrivateRoute";
import PrivateRoute from "../private/PrivateRoute";
import ConfirmedPayment from "../Checkout/checkout-component/ConfirmedPayment";
import OrderTracking from "../dashboard/OrderTracking";

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
				path: "/checkout",
				element: <CheckOut />,
			},
			{
				path: "/addAToys",
				element: <AddToys />,
			},
			{
				path: "/editMyToys/:id",
				element: <EditMyToys />,
			},
			{
				path: "/exp",
				element: <Exp />,
			},
			{
				path: "/orders_progress",
				element: (
					// <UserRoutes>
					<PrivateRoute>
						<OrdersTracking />
					</PrivateRoute>
				),
			},
			{
				path: "/order_progress",
				element: (
					// <UserRoutes>
					<PrivateRoute>
						<OrderTracking />
					</PrivateRoute>
				),
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
	{
		path: "/payment",
		element: (
			// <UserRoutes>
			<PrivateRoute>
				<Payment />
			</PrivateRoute>
		),
	},
	{
		path: "/checkout/order_confirmed",
		element: (
			<PrivateRoute>
				<ConfirmedPayment />
			</PrivateRoute>
		),
	},
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
