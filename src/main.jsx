import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./component/provider/AuthProvider";
import { CartProvider } from "./component/provider/CartProvider";
import { ToastProvider } from "react-toast-master";
import Routes from "./component/layout/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<CartProvider>
				<ToastProvider>
					<Routes />
				</ToastProvider>
			</CartProvider>
		</AuthProvider>
	</React.StrictMode>
);
