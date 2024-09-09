import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import UseAxiosHook from "../hooks/useAxiosHook";
import { useToast } from "react-toast-master";

const OrdersTracking = () => {
	const [orders, setOrders] = useState([]);
	console.log("orders: ", orders);
	const { user } = useContext(AuthContext);
	const [axiosSecure] = UseAxiosHook();
	const { toastMaster } = useToast();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchUserPurchases = async () => {
			setLoading(true);
			if (user?.email) {
				try {
					const response = await axiosSecure.get(`/payments/user_payments?email=${user.email}`);
					setOrders(response.data);
					setLoading(false);
				} catch (error) {
					setLoading(false);
					console.error("Error fetching user purchases:", error);
				}
			}
		};

		fetchUserPurchases();
	}, [user, axiosSecure]);

	// const pending = orders?.filter((order) => order?.orderStatus === "Pending");
	// const approved = orders?.filter((order) => order?.orderStatus === "Approved");
	// const shipped = orders?.filter((order) => order?.orderStatus === "Shipped");
	// const received = orders?.filter((order) => order?.orderStatus === "Received");

	const [orderId, setOrderId] = useState("");
	const [filteredOrder, setFilteredOrder] = useState(null);

	const handleTrackOrder = () => {
		// Find the order that matches the entered order ID
		const matchingOrder = orders.find((order) => order._id === orderId);
		setFilteredOrder(matchingOrder);
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-white">
			<p>order_progress</p>
			<div className="grid grid-cols-1 w-fit items-start justify-start gap-y-1.5">
				{loading ? (
					<div>loading</div>
				) : (
					orders.map((order) => (
						<div
							key={order._id}
							className="flex flex-col items-center justify-start"
						>
							<p className="px-4 py-1 text-laal/70 text-center flex justify-start gap-x-1.5 items-center rounded-md bg-holud/15 w-full">
								Order ID:
								<span
									className="font-semibold cursor-pointer"
									onClick={() => {
										if (order?._id) {
											navigator.clipboard.writeText(order._id);
											toastMaster({
												type: "success",
												message: "Order ID copied to clipboard!",
												position: "bottomLeft",
												transition: "top",
												bg: "white",
											});
										}
									}}
								>
									{order?._id}
								</span>
							</p>
						</div>
					))
				)}
			</div>
			<div>
				<div>
					<input
						type="text"
						placeholder="Enter Order ID"
						value={orderId}
						onChange={(e) => setOrderId(e.target.value)}
						className="p-2 mb-4 border"
						// onFocus={(e) => e.target.select()}
						onFocus={async (e) => {
							e.target.select(); // Select the text in the input field
							// Read the clipboard contents
							try {
								const text = await navigator.clipboard.readText();
								setOrderId(text); // Set the clipboard text as the input value
							} catch (err) {
								console.error("Failed to read clipboard: ", err);
							}
						}}
					/>
					<button
						onClick={handleTrackOrder}
						className="px-4 py-2 text-white bg-yellow-500"
					>
						Track
					</button>
					{/* Display the matched order if found */}
					<div>
						{filteredOrder ? (
							<div className="p-4 mt-4 border">
								<p>Order ID: {filteredOrder._id}</p>
								<p>Status: {filteredOrder.orderStatus}</p>
								<p>Price: {filteredOrder.grandTotal}</p>
								<div>
									{filteredOrder?.orderedFigs?.map((item) => (
										<div key={item.figId}>
											<p>{item.figName}</p>
											<p>{item.figPrice}</p>
										</div>
									))}
								</div>
							</div>
						) : (
							orderId && <p className="mt-4 text-red-500">No order found with this ID</p>
						)}
					</div>
				</div>
			</div>
			{/* <ul className="steps">
				<li className={`step ${pending?.length > 0 ? "step-primary" : ""}`}>Pending</li>
				<li className={`step ${approved?.length > 0 ? "step-primary" : ""}`}>Approved</li>
				<li className={`step ${shipped?.length > 0 ? "step-primary" : ""}`}>Shipped</li>
				<li className={`step ${received?.length > 0 ? "step-primary" : ""}`}>Received</li>
			</ul> */}
		</div>
	);
};

export default OrdersTracking;
