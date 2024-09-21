import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import UseAxiosHook from "../hooks/useAxiosHook";
import { useToast } from "react-toast-master";
import { Package, PackageCheck, Settings, Truck } from "lucide-react";

const OrdersTracking = () => {
	const [orders, setOrders] = useState([]);
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

	const [orderId, setOrderId] = useState("");
	const [filteredOrder, setFilteredOrder] = useState(null);

	const handleTrackOrder = () => {
		// Find the order that matches the entered order ID
		const matchingOrder = orders.find((order) => order._id === orderId);
		setFilteredOrder(matchingOrder);
	};

	const zoneDetails = orders.map((item) => item.zoneDetail);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		if (isNaN(date)) {
			return "Invalid date";
		}

		const options = { day: "2-digit", month: "short", year: "numeric" };
		return new Intl.DateTimeFormat("en-GB", options).format(date).replace(/ /g, ". ");
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-white">
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
						className="w-full px-3 py-2 bg-transparent border rounded-md shadow-lg border-dhusor shadow-gray-700/10 text-ash focus:outline-none focus:ring-2 focus:ring-ash placeholder:text-sm placeholder:text-ash/70 placeholder:font-normal"
						onFocus={async (e) => {
							e.target.select();
							try {
								const text = await navigator.clipboard.readText();
								setOrderId(text);
							} catch (err) {
								console.error("Failed to read clipboard: ", err);
							}
						}}
						onClick={handleTrackOrder}
					/>
					{/* Display the matched order if found */}
					<div>
						{filteredOrder ? (
							<div className="p-4 mt-4 border">
								{/* top row */}
								<div className="mb-12">
									<div className="flex flex-col items-center justify-center w-full mb-4">
										<h2 className="text-2xl mb-4 flex justify-center items-center gap-x-2.5 font-medium text-center text-kala">
											<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
											Order Status for ID{" "}
											<span className="font-bold">{filteredOrder?._id}</span>
										</h2>
										<p className="text-base font-normal text-ash">
											Please note that these are accurate but not guaranteed estimates.
											Delivery dates are subject to change without advance notice.
										</p>
									</div>
									<div className="w-full mb-16 border rounded-md border-dhusor">
										<div className="w-full">
											<div className="flex items-center justify-around p-4">
												<p className="flex flex-col items-center justify-center text-base font-medium text-kala">
													Order Date{" "}
													<span className="text-sm font-normal text-ash">
														{formatDate(filteredOrder?.date)}
													</span>
												</p>
												<p className="flex flex-col items-center justify-center text-base font-medium text-kala">
													Total{" "}
													<span className="text-sm font-normal text-ash">
														${filteredOrder?.grandTotal}
													</span>
												</p>
												<p className="flex flex-col items-center justify-center text-base font-medium text-kala">
													Ship to{" "}
													<span className="text-sm font-normal text-ash">
														{zoneDetails.map((item) => (
															<p key={item?.zip}>
																{item?.address}, {item?.city}
															</p>
														))}
													</span>
												</p>
												<p className="flex flex-col items-center justify-center text-base font-medium text-kala">
													ZIP{" "}
													<span className="text-sm font-normal text-ash">
														{zoneDetails?.map((item) => (
															<div key={item?.zip}>
																<p>{item?.zip}</p>
															</div>
														))}
													</span>
												</p>
												<p className="flex flex-col items-center justify-center text-base font-medium text-kala">
													Order ID{" "}
													<span className="text-sm font-normal text-ash">
														{filteredOrder?._id}
													</span>
												</p>
											</div>
										</div>
									</div>
									<div className="flex flex-col items-center justify-center w-full gap-y-1">
										<p className="flex gap-x-1.5 text-xl font-semibold text-ash">
											Order Status
											{orders.map((item) => (
												<span
													key={item._id}
													className="text-blue-500"
												>
													{item.orderStatus}
												</span>
											))}
										</p>
										<p>
											{
												<p className="flex gap-x-1.5 text-base font-medium text-ash">
													Estimated Delivery Date{" "}
													<span>
														{new Date(
															new Date(filteredOrder.date).setDate(
																new Date(filteredOrder.date).getDate() + 7
															)
														).toLocaleDateString()}
													</span>
												</p>
											}
										</p>
									</div>
								</div>
								{/* top row end */}
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
