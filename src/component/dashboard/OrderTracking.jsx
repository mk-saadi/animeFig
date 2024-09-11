import { useEffect, useState } from "react";
import UseAxiosHook from "../hooks/useAxiosHook";
import { Link } from "react-router-dom";
import { Package, PackageCheck, Settings, Truck } from "lucide-react";

const OrderTracking = () => {
	const items = localStorage.getItem("ordered");
	const item = JSON.parse(items);
	const _id = item.id;

	const [order, setOrder] = useState([]);
	console.log("order: ", order);
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
		<>
			<div className="mb-4">
				<div className="flex flex-col items-center justify-center w-full mb-4">
					<h2 className="text-2xl mb-2 flex justify-center items-center gap-x-2.5 font-medium text-center text-kala">
						<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
						Order Tracking Page
					</h2>
					<p className="text-base font-normal text-ash">
						Please note that these are accurate but not guaranteed estimates. Delivery dates are
						subject to change without advance notice.
					</p>
				</div>
				<div className="w-full mb-5 border rounded-md border-dhusor">
					{order.map((item) => (
						<div
							key={item._id}
							className="w-full"
						>
							<div className="flex items-center justify-around p-4">
								<p className="flex flex-col items-center justify-center text-base font-medium text-kala">
									Order Date{" "}
									<span className="text-sm font-normal text-ash">
										{formatDate(item.date)}
									</span>
								</p>
								<p className="flex flex-col items-center justify-center text-base font-medium text-kala">
									Total{" "}
									<span className="text-sm font-normal text-ash">${item.grandTotal}</span>
								</p>
								<p className="flex flex-col items-center justify-center text-base font-medium text-kala">
									Ship to{" "}
									<span className="text-sm font-normal text-ash">
										{zoneDetails.map((item) => (
											<p key={item.zip}>
												{item.address}, {item.city}
											</p>
										))}
									</span>
								</p>
								<p className="flex flex-col items-center justify-center text-base font-medium text-kala">
									ZIP{" "}
									<span className="text-sm font-normal text-ash">
										{zoneDetails.map((item) => (
											<div key={item.zip}>
												<p>{item.zip}</p>
											</div>
										))}
									</span>
								</p>
								<p className="flex flex-col items-center justify-center text-base font-medium text-kala">
									Order ID <span className="text-sm font-normal text-ash">{item._id}</span>
								</p>
							</div>
						</div>
					))}
				</div>
				<div className="w-full flex flex-col justify-center items-center gap-y-1.5">
					<p className="flex gap-x-1.5 text-xl font-semibold text-ash">
						Order Status
						{order.map((item) => (
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
							<p className="flex text-kala">
								Order Date{" "}
								<span className="text-sm font-normal text-ash">
									{new Date(
										new Date(item.date).setDate(new Date(item.date).getDate() + 7)
									).toLocaleDateString()}
								</span>
							</p>
						}
					</p>
				</div>
			</div>
			{/* second section */}
			<div className="grid grid-cols-2 gap-x-4">
				<div className="w-full col-span-1">
					{loading ? (
						<p>Loading...</p>
					) : (
						order.map((item) => (
							<div
								key={item._id}
								className="w-full"
							>
								<div className="w-full">
									<ul className="w-full text-sm font-medium steps text-ash">
										<li
											className={`step  ${
												item.orderStatus === "Ordered"
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
												item.orderStatus === "Preparing"
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
												item.orderStatus === "Shipped"
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
												item.orderStatus === "Received"
													? "step-primary text-blue-500"
													: ""
											}`}
										>
											<span className="flex justify-center items-center gap-x-1.5">
												Received
												<PackageCheck size={20} />
											</span>
										</li>
									</ul>
								</div>
								<div className="w-full pt-3 mt-8 border-t border-dhusor">
									<div className="">
										{zoneDetails.map((z) => (
											<div
												className="grid w-full grid-cols-3 gap-4 text-ash"
												key={z.zip}
											>
												<div className="flex flex-col justify-start">
													<p className="font-medium text-kala">Name:</p>
													<p className="text-sm font-normal">{z?.deliverName}</p>
												</div>
												<div className="flex flex-col justify-start">
													<p className="font-medium text-kala">Email:</p>
													<p className="text-sm font-normal">{z?.deliverEmail}</p>
												</div>
												{z?.apartment && (
													<div className="flex flex-col justify-start">
														<p className="font-medium text-kala">Apartment:</p>
														<p className="text-sm font-normal">{z?.apartment}</p>
													</div>
												)}
												<div className="flex flex-col justify-start">
													<p className="font-medium text-kala">Address:</p>
													<p className="text-sm font-normal">
														{z?.address}, {z?.city}, {z?.state}
													</p>
												</div>
												<div className="flex flex-col justify-start">
													<p className="font-medium text-kala">ZIP:</p>
													<p className="text-sm font-normal">{z?.zip}</p>
												</div>
												<div className="flex flex-col justify-start">
													<p className="font-medium text-kala">Country:</p>
													<p className="text-sm font-normal">{z?.country}</p>
												</div>
												<div className="flex flex-col justify-start">
													<p className="font-medium text-kala">Phone Number:</p>
													<p className="text-sm font-normal">{z?.phone}</p>
												</div>
											</div>
										))}
									</div>
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
		</>
	);
};

export default OrderTracking;
