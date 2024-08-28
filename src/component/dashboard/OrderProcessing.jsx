import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import UseAxiosHook from "../hooks/useAxiosHook";

const OrderProcessing = () => {
	const [orders, setOrders] = useState([]);
	console.log("orders: ", orders);
	const { user } = useContext(AuthContext);
	const [axiosSecure] = UseAxiosHook();

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const res = await axiosSecure(`/payments`);
				const data = res.data;
				const foundOrder = data?.filter((order) => order?.email === user?.email);
				setOrders(foundOrder);
			} catch (error) {
				console.error(error);
			}
		};

		fetchOrders();
	}, [axiosSecure, user?.email]);

	return (
		<div className="flex flex-col w-full min-h-screen bg-white">
			<p>order_progress</p>
			<ul className="steps">
				<li className="step step-primary">Register</li>
				<li className="step step-primary">Choose plan</li>
				<li className="step">Purchase</li>
				<li className="step">Receive Product</li>
			</ul>
		</div>
	);
};

export default OrderProcessing;
