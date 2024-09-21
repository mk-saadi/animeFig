import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import UseAxiosHook from "../hooks/useAxiosHook";
import { useToast } from "react-toast-master";
import { Link } from "react-router-dom";
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
	console.log("orderId: ", orderId);

	const handleTrackOrder = () => {
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
			{/* <div className="grid grid-cols-1 w-fit items-start justify-start gap-y-1.5">
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
			</div> */}
			<div className="w-full ">
				<div className="flex flex-col items-center justify-center w-full">
					<p className="mb-4 text-xl font-semibold text-kala ">Enter ID to track your order</p>
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
							<div className="p-4 mt-8 border rounded-md border-dhusor">
								{/* top row */}
								<div className="mb-4">
									<div className="flex flex-col items-center justify-center w-full mb-4">
										<h2 className="text-2xl flex mt-4 mb-1 justify-center items-center gap-x-2.5 font-medium text-center text-kala">
											<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
											Order Status for ID{" "}
											<span className="font-bold">{filteredOrder?._id}</span>
										</h2>
										<p className="mb-2 text-base font-normal text-ash">
											Please note that these are accurate but not guaranteed estimates.
											Delivery dates are subject to change without advance notice.
										</p>
									</div>
									<div className="w-full mb-10 border rounded-md border-dhusor">
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
								{/* track steps */}
								<div className="w-full mb-12">
									<ul className="w-full text-sm font-medium steps text-ash">
										<li
											className={`step  ${
												filteredOrder.orderStatus === "Ordered"
													? "step-primary text-blue-500"
													: ""
											}`}
										>
											<span className="flex justify-center items-center gap-x-1.5">
												Ordered
												<Package size={20} />
											</span>
										</li>
										<li
											className={`step  ${
												filteredOrder.orderStatus === "Preparing"
													? "step-primary text-blue-500"
													: ""
											}`}
										>
											<span className="flex justify-center items-center gap-x-1.5">
												Preparing
												<Settings size={20} />
											</span>
										</li>
										<li
											className={`step  ${
												filteredOrder.orderStatus === "Shipped"
													? "step-primary text-blue-500"
													: ""
											}`}
										>
											<span className="flex justify-center items-center gap-x-1.5">
												Shipped
												<Truck size={20} />
											</span>
										</li>
										<li
											className={`step  ${
												filteredOrder.orderStatus === "Received"
													? "step-primary text-blue-500"
													: ""
											}`}
											data-content="✔"
										>
											<span className="flex justify-center items-center gap-x-1.5">
												Received
												<PackageCheck size={20} />
											</span>
										</li>
									</ul>
								</div>
								{/* top row end */}
								<div className="grid w-full grid-cols-3 gap-3">
									{filteredOrder?.orderedFigs?.map((fig) => (
										<div
											className="flex items-center py-2.5 justify-between gap-x-4"
											key={fig._id}
										>
											<div className="flex h-full items-start gap-x-1.5 justify-start">
												<Link
													to={`/collections/${fig.figLink}`}
													className="flex-shrink-0 h-32 overflow-hidden rounded-md w-28"
												>
													<img
														src={fig.figImage}
														className="object-cover object-center w-full h-full"
													/>
												</Link>
												<div className="flex flex-col h-full py-1.5">
													<div className="flex flex-col flex-1 gap-y-1">
														<Link
															to={`/collections/${fig.figLink}`}
															className="text-base line-clamp-2 h-max hover:underline text-kala"
														>
															{fig.figName}
														</Link>
														<p className="flex items-center justify-start text-ash gap-x-3">
															Quantity {fig.quantity}
														</p>
														<p className="text-base font-medium text-kala">
															<span className="text-lg">$</span>
															{fig.figPrice}
														</p>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						) : (
							orderId && (
								<div className="flex flex-col items-center justify-center w-full mt-16">
									<p className="text-lg font-medium text-laal">
										No order found with this ID
									</p>
									<p className="text-sm text-ash">Please enter a valid ID</p>
								</div>
							)
						)}
						{filteredOrder === null && <p className="mt-4 text-ash">Enter ID to find order</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrdersTracking;
