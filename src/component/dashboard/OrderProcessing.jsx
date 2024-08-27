import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const OrderProcessing = () => {
	const [order, setOrder] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_URL}/payments/userPayments/${user?.email}`);
				const data = await res.json();
				setOrder(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchOrder();
	}, []);

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
