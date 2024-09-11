import { useEffect, useState } from "react";
import UseAxiosHook from "../hooks/useAxiosHook";
import { Link } from "react-router-dom";

const OrderTracking = () => {
	const items = localStorage.getItem("ordered");
	const item = JSON.parse(items);
	const _id = item.id;

	const [order, setOrder] = useState([]);
	console.log(
		"order: ",
		order.map((item) => item.zoneDetail)
	);
	// const { user } = useContext(AuthContext);
	const [axiosSecure] = UseAxiosHook();
	const [loading, setLoading] = useState(false);

	const zoneDetails = order.map((item) => item.zoneDetail);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		if (isNaN(date)) {
			return "Invalid date";
		}

		const options = { day: "2-digit", month: "short", year: "numeric" };
		return new Intl.DateTimeFormat("en-GB", options).format(date).replace(/ /g, ". ");
	};

	useEffect(() => {
		const fetchUserPurchases = async () => {
			setLoading(true);
			if (_id) {
				try {
					const response = await axiosSecure.get(`/payments/user_payment?_id=${_id}`);
					setOrder(response.data);
					setLoading(false);
				} catch (error) {
					setLoading(false);
					console.error("Error fetching user purchases:", error);
				}
			}
		};

		fetchUserPurchases();
	}, [_id, axiosSecure]);

	return (
		<div>
			<p>OrderTracking</p>
			<div className="grid grid-cols-2 gap-x-4">
				<div>
					{loading ? (
						<p>Loading...</p>
					) : (
						order.map((item) => (
							<div key={item._id}>
								<p>Order ID: {item._id}</p>
								<p>Status: {item.orderStatus}</p>
								<div>
									<ul className="steps">
										<li
											className={`step ${
												item.orderStatus === "Pending" ? "step-primary" : ""
											}`}
										>
											Pending
										</li>
										<li
											className={`step ${
												item.orderStatus === "Approved" ? "step-primary" : ""
											}`}
										>
											Approved
										</li>
										<li
											className={`step ${
												item.orderStatus === "Shipped" ? "step-primary" : ""
											}`}
										>
											Shipped
										</li>
										<li
											className={`step ${
												item.orderStatus === "Received" ? "step-primary" : ""
											}`}
										>
											Received
										</li>
									</ul>
								</div>
								<p>Amount: {item.grandTotal}</p>
								<p>Date: {formatDate(item.date)}</p>
								<p>Ordered Figures: {item.orderedFigs.length}</p>
								<div>
									{/* {item?.zoneDetail?.map((index, fig) => (
										<div key={index}>
											<p>{fig.address}</p>
										</div>
									))} */}
									<p>
										Zone Details:{" "}
										{zoneDetails.map((z) => (
											<div key={z.zip}>
												<p>{z?.address}</p>
												<p>{z?.zip}</p>
												<p>{z?.city}</p>
												<p>{z?.country}</p>
												<p>{z?.state}</p>
												<p>{z?.phone}</p>
												<p>{z?.deliveryName}</p>
												<p>{z?.deliveryEmail}</p>
												<p>{z?.apartment}</p>
											</div>
										))}
									</p>
								</div>
							</div>
						))
					)}
				</div>
				<div>
					{order?.map((item) => (
						<div key={item._id}>
							{item.orderedFigs.map((fig) => (
								<div key={fig.figId}>
									<div className="flex items-center py-2.5 justify-between gap-x-4">
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
													<p className="px-2 py-[2px] text-xs text-white rounded-sm w-fit bg-blue-500">
														{item?.figLabel}
													</p>
													<Link
														to={`/collections/${fig.figLink}`}
														className="text-base hover:underline text-kala"
													>
														{fig.figName}
													</Link>
												</div>
											</div>
										</div>
										<div className="mr-10">
											<p className="text-base text-kala">
												<span className="text-lg">$</span>
												{fig.figPrice}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default OrderTracking;
